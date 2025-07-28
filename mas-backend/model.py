import json
from mesa import Model
from mesa.time import BaseScheduler
from agent import PricingAgent, MarketingAgent, ProductionAgent, CEOAgent, SharedKnowledgeBase
import numpy as np

# Global Constants for Market Dynamics
INITIAL_MARKET_CAP = 1000
MARKET_CRISIS_REDUCTION_FACTOR = 0.5 # e.g., market drops to 50% during crisis
PRICE_ATTRACTIVENESS_SCALE = 5 # Impact of price on attractiveness (from original price_elasticity)
MARKETING_ATTRACTIVENESS_SCALE = 15 / 500 # Impact of marketing on attractiveness (from original marketing_boost)
MAX_PRICE_FOR_ATTRACTIVENESS = 15 # Price point where attractiveness starts to scale down (e.g., higher prices are less attractive)


class BrewMastersModel(Model):
    def __init__(self):
        super().__init__()
        self.schedule = BaseScheduler(self)
        self.turn = 0
        self.turn_history = []
        self.knowledge_base = None

        self.initial_market_cap = INITIAL_MARKET_CAP
        self.current_market_cap = self.initial_market_cap
        self.financial_crisis_active = False

        self.cumulative_event_log = ["Game Started!"] # New: Store all logs cumulatively

        self.game_state = {
            "turn": 0,
            "current_market_cap": self.current_market_cap,
            "green_team_profit": 100000,
            "green_team_inventory": 100,
            "green_team_price": 10,
            "green_team_profit_this_turn": 0,
            "green_team_projected_demand": 0,
            "green_team_last_production_target": 50,
            "green_team_last_marketing_spend": 0,
            "green_team_total_production": 0,
            "green_team_total_sales": 0,
            "blue_team_profit": 100000,
            "blue_team_inventory": 100,
            "blue_team_price": 10,
            "blue_team_profit_this_turn": 0,
            "blue_team_projected_demand": 0,
            "blue_team_last_production_target": 50,
            "blue_team_last_marketing_spend": 0,
            "blue_team_total_production": 0,
            "blue_team_total_sales": 0,
            "event_log": self.cumulative_event_log # Link game_state to the cumulative log
        }

        self.ceo_agent = CEOAgent(1, self)
        self.specialist_agents = [
            PricingAgent(2, self),
            MarketingAgent(3, self),
            ProductionAgent(4, self)
        ]
        for agent in self.specialist_agents:
            self.schedule.add(agent)

    def calculate_outcome(self, team_prefix, price, marketing_spend, production_target, allocated_demand_from_market):
        """Calculates sales and profit for one turn for one team based on allocated market demand."""
        
        inventory_key = f"{team_prefix}_inventory"
        profit_key = f"{team_prefix}_profit"
        profit_this_turn_key = f"{team_prefix}_profit_this_turn"
        price_key = f"{team_prefix}_price"

        sales = min(int(allocated_demand_from_market), self.game_state[inventory_key])
        revenue = sales * price
        production_cost = production_target * 3
        inventory_cost = self.game_state[inventory_key] * 0.5
        profit_this_turn = revenue - production_cost - inventory_cost - marketing_spend

        # Update state
        self.game_state[profit_key] += profit_this_turn
        self.game_state[profit_this_turn_key] = profit_this_turn
        self.game_state[inventory_key] -= sales
        self.game_state[inventory_key] += production_target
        self.game_state[price_key] = price
        
        return {'sales': sales, 'profit_this_turn': profit_this_turn, 'final_price': price, 'final_marketing_spend': marketing_spend, 'final_production_target': production_target}


    def get_state_as_json(self):
        """Serializes the current game state to JSON."""
        state_to_serialize = self.game_state.copy()
        state_to_serialize['turn_history'] = self.turn_history 
        return json.dumps(state_to_serialize, indent=2)

    def toggle_financial_crisis(self, active: bool):
        """Toggles the financial crisis mode."""
        self.financial_crisis_active = active
        self.cumulative_event_log.append(f"Market: Financial crisis {'ACTIVATED' if active else 'DEACTIVATED'}!")


    def step(self, human_decisions):
        """Processes one full turn of the game with the new MAS logic and shared market."""
        self.turn += 1
        self.game_state['turn'] = self.turn
        
        # Append turn start message to the cumulative log
        self.cumulative_event_log.append(f"--- Turn {self.turn} ---")

        # Update current market cap based on crisis status
        self.current_market_cap = self.initial_market_cap * (MARKET_CRISIS_REDUCTION_FACTOR if self.financial_crisis_active else 1.0)
        self.game_state['current_market_cap'] = self.current_market_cap
        self.cumulative_event_log.append(f"Market: Current Market Cap is {int(self.current_market_cap)} customers.")

        # Get human decisions
        human_price = float(human_decisions.get('price', 10))
        human_marketing = float(human_decisions.get('marketingSpend', 0))
        human_production = int(human_decisions.get('productionTarget', 50))
        
        # --- Process Blue Team (MAS) decisions ---
        # 1. Update the shared knowledge base with the results of the *last* turn (including new market cap).
        self.knowledge_base = SharedKnowledgeBase(self)
        
        # 2. Specialist agents generate proposals based on the new knowledge.
        self.schedule.step()
        
        # 3. Collect proposals for the CEO.
        proposals = {agent.type: agent.proposal for agent in self.specialist_agents}
        
        # 4. CEO agent makes the final, coordinated decision.
        self.ceo_agent.step(proposals)
        mas_decisions = self.ceo_agent.final_decisions

        # --- Calculate Market Share / Allocated Demand for both teams ---
        # Attractiveness considers price (lower is better) and marketing spend (higher is better)
        green_attractiveness = max(0, (MAX_PRICE_FOR_ATTRACTIVENESS - human_price) * PRICE_ATTRACTIVENESS_SCALE + human_marketing * MARKETING_ATTRACTIVENESS_SCALE)
        blue_attractiveness = max(0, (MAX_PRICE_FOR_ATTRACTIVENESS - mas_decisions['price']) * PRICE_ATTRACTIVENESS_SCALE + mas_decisions['marketing_spend'] * MARKETING_ATTRACTIVENESS_SCALE)

        total_attractiveness = green_attractiveness + blue_attractiveness

        # Handle cases where total attractiveness is zero to avoid division by zero
        if total_attractiveness == 0:
            allocated_demand_green = self.current_market_cap / 2 if self.current_market_cap > 0 else 0
            allocated_demand_blue = self.current_market_cap / 2 if self.current_market_cap > 0 else 0
            self.cumulative_event_log.append("Market: Both teams equally unattractive. Market split.")
        else:
            allocated_demand_green = (green_attractiveness / total_attractiveness) * self.current_market_cap
            allocated_demand_blue = (blue_attractiveness / total_attractiveness) * self.current_market_cap

        # Ensure demand is not negative
        allocated_demand_green = max(0, int(allocated_demand_green))
        allocated_demand_blue = max(0, int(allocated_demand_blue))


        # --- Process Green Team (Human) outcome ---
        human_outcome = self.calculate_outcome("green_team", human_price, human_marketing, human_production, allocated_demand_green)
        self.cumulative_event_log.append(f"Human decision processed. Sales: {human_outcome['sales']}, Profit: {human_outcome['profit_this_turn']:.2f}")
        self.game_state['green_team_projected_demand'] = allocated_demand_green
        self.game_state['green_team_last_production_target'] = human_production
        self.game_state['green_team_last_marketing_spend'] = human_marketing
        self.game_state['green_team_total_production'] += human_production
        self.game_state['green_team_total_sales'] += human_outcome['sales']

        # --- Process Blue Team (MAS) outcome ---
        mas_outcome = self.calculate_outcome(
            "blue_team",
            mas_decisions['price'],
            mas_decisions['marketing_spend'],
            mas_decisions['production_target'],
            allocated_demand_blue
        )
        self.cumulative_event_log.append(
            f"MAS decision processed. Sales: {mas_outcome['sales']}, Profit: {mas_outcome['profit_this_turn']:.2f}"
        )
        self.game_state['blue_team_projected_demand'] = self.knowledge_base.demand_forecast
        self.game_state['blue_team_last_production_target'] = mas_decisions['production_target']
        self.game_state['blue_team_last_marketing_spend'] = mas_decisions['marketing_spend']
        self.game_state['blue_team_total_production'] += mas_decisions['production_target']
        self.game_state['blue_team_total_sales'] += mas_outcome['sales']


        # Record both teams' results for the next turn's analysis
        history_entry = {
            "turn": self.turn,
            # Human (Green Team) decisions and outcomes
            "green_team_price": human_price,
            "green_team_marketing_spend": human_marketing,
            "green_team_production_target": human_production,
            "green_team_sales": human_outcome['sales'],
            "green_team_profit_this_turn": human_outcome['profit_this_turn'],
            "green_team_total_profit": self.game_state['green_team_profit'], # Add total profit to history
            # MAS (Blue Team) decisions and outcomes
            "blue_team_price": mas_decisions['price'],
            "blue_team_marketing_spend": mas_decisions['marketing_spend'],
            "blue_team_production_target": mas_decisions['production_target'],
            "blue_team_sales": mas_outcome['sales'],
            "blue_team_profit_this_turn": mas_outcome['profit_this_turn'],
            "blue_team_total_profit": self.game_state['blue_team_profit'] # Add total profit to history
        }
        self.turn_history.append(history_entry)