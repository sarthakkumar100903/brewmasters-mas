import { GameState } from "../types/GameState";

interface DashboardProps {
  data: GameState;
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      {/* Shared Market Cap */}
      <div className="col-span-2 text-center bg-gray-50 p-4 rounded shadow">
        <h2 className="text-lg font-bold">Current Market Cap: {data.current_market_cap} Customers</h2>
      </div>

      {/* Green Team */}
      <div className="p-4 bg-green-50 rounded shadow">
        <h2 className="text-lg font-bold text-green-700">Green Team (Human)</h2>
        <p>Total Profit: ${data.green_team_profit.toFixed(2)}</p>
        <p>Profit this Turn: ${data.green_team_profit_this_turn.toFixed(2)}</p>
        <p>Inventory: {data.green_team_inventory}</p>
        <p>Price: ${data.green_team_price}</p>
        <p>Projected Demand (Last Turn Sales): {data.green_team_projected_demand.toFixed(0)}</p>
        <p>Total Production: {data.green_team_total_production}</p>
        <p>Total Sales: {data.green_team_total_sales}</p>
      </div>

      {/* Blue Team */}
      <div className="p-4 bg-blue-50 rounded shadow">
        <h2 className="text-lg font-bold text-blue-700">Blue Team (MAS)</h2>
        <p>Total Profit: ${data.blue_team_profit.toFixed(2)}</p>
        <p>Profit this Turn: ${data.blue_team_profit_this_turn.toFixed(2)}</p>
        <p>Inventory: {data.blue_team_inventory}</p>
        <p>Price: ${data.blue_team_price}</p>
        <p>Projected Demand (MAS Forecast): {data.blue_team_projected_demand.toFixed(0)}</p>
        <p>Total Production: {data.blue_team_total_production}</p>
        <p>Total Sales: {data.blue_team_total_sales}</p>
      </div>
    </div>
  );
}