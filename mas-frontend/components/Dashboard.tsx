import { GameState } from "../types/GameState";

interface DashboardProps {
  data: GameState;
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Shared Market Cap */}
      <div className="col-span-1 md:col-span-2 text-center bg-gray-100 p-5 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold text-gray-800">Current Market Cap: <span className="text-blue-600">{data.current_market_cap} Customers</span></h2>
      </div>

      {/* Green Team */}
      <div className="p-6 bg-green-50 rounded-lg shadow-md border border-green-200">
        <h2 className="text-xl font-bold text-green-700 mb-3">Green Team (Human)</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Total Profit:</span> <span className="text-lg font-semibold text-green-800">${data.green_team_profit.toFixed(2)}</span></p>
          <p><span className="font-medium">Profit this Turn:</span> <span className="text-lg font-semibold text-green-600">${data.green_team_profit_this_turn.toFixed(2)}</span></p>
          <p><span className="font-medium">Inventory:</span> {data.green_team_inventory} units</p>
          <p><span className="font-medium">Price:</span> ${data.green_team_price.toFixed(2)}</p>
          <p><span className="font-medium">Projected Demand (Last Turn Sales):</span> {data.green_team_projected_demand.toFixed(0)} customers</p>
          <p><span className="font-medium">Last Production Target:</span> {data.green_team_last_production_target} units</p>
          <p><span className="font-medium">Last Marketing Spend:</span> ${data.green_team_last_marketing_spend}</p>
          <p><span className="font-medium">Total Production:</span> {data.green_team_total_production} units</p>
          <p><span className="font-medium">Total Sales:</span> {data.green_team_total_sales} units</p>
        </div>
      </div>

      {/* Blue Team */}
      <div className="p-6 bg-blue-50 rounded-lg shadow-md border border-blue-200">
        <h2 className="text-xl font-bold text-blue-700 mb-3">Blue Team (MAS)</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Total Profit:</span> <span className="text-lg font-semibold text-blue-800">${data.blue_team_profit.toFixed(2)}</span></p>
          <p><span className="font-medium">Profit this Turn:</span> <span className="text-lg font-semibold text-blue-600">${data.blue_team_profit_this_turn.toFixed(2)}</span></p>
          <p><span className="font-medium">Inventory:</span> {data.blue_team_inventory} units</p>
          <p><span className="font-medium">Price:</span> ${data.blue_team_price.toFixed(2)}</p>
          <p><span className="font-medium">Projected Demand (MAS Forecast):</span> <span className="font-bold text-blue-700">{data.blue_team_projected_demand.toFixed(0)}</span> customers</p>
          <p><span className="font-medium">Last Production Target:</span> {data.blue_team_last_production_target} units</p>
          <p><span className="font-medium">Last Marketing Spend:</span> ${data.blue_team_last_marketing_spend}</p>
          <p><span className="font-medium">Total Production:</span> {data.blue_team_total_production} units</p>
          <p><span className="font-medium">Total Sales:</span> {data.blue_team_total_sales} units</p>
        </div>
      </div>
    </div>
  );
}