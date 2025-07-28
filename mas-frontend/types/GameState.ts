export interface GameState {
  turn: number;
  green_team_profit: number;
  green_team_inventory: number;
  green_team_price: number;
  blue_team_profit: number;
  blue_team_inventory: number;
  blue_team_price: number;
  event_log: string[];
}
