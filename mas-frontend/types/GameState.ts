export interface GameState {
  turn: number;
  current_market_cap: number;
  green_team_profit: number;
  green_team_inventory: number;
  green_team_price: number;
  green_team_profit_this_turn: number;
  green_team_projected_demand: number;
  green_team_last_production_target: number; // For charting
  green_team_last_marketing_spend: number; // For charting
  green_team_total_production: number; // New: cumulative
  green_team_total_sales: number;      // New: cumulative
  blue_team_profit: number;
  blue_team_inventory: number;
  blue_team_price: number;
  blue_team_profit_this_turn: number;
  blue_team_projected_demand: number;
  blue_team_last_production_target: number; // For charting
  blue_team_last_marketing_spend: number; // For charting
  blue_team_total_production: number;  // New: cumulative
  blue_team_total_sales: number;       // New: cumulative
  event_log: string[];
  turn_history: { // For charts to access historical data
    turn: number;
    green_team_price: number;
    green_team_marketing_spend: number;
    green_team_production_target: number;
    green_team_sales: number;
    green_team_profit_this_turn: number;
    blue_team_price: number;
    blue_team_marketing_spend: number;
    blue_team_production_target: number;
    blue_team_sales: number;
    blue_team_profit_this_turn: number;
  }[];
}