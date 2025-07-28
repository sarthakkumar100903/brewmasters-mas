export interface GameState {
  turn: number;
  current_market_cap: number; // New
  green_team_profit: number;
  green_team_inventory: number;
  green_team_price: number;
  green_team_profit_this_turn: number; // New
  green_team_projected_demand: number; // New
  green_team_last_production_target: number; // New
  blue_team_profit: number;
  blue_team_inventory: number;
  blue_team_price: number;
  blue_team_profit_this_turn: number; // New
  blue_team_projected_demand: number; // New
  blue_team_last_production_target: number; // New
  event_log: string[];
}