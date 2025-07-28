import { GameState } from "../types/GameState";

interface DashboardProps {
  data: GameState;
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      {/* Green Team */}
      <div className="p-4 bg-green-50 rounded shadow">
        <h2 className="text-lg font-bold text-green-700">Green Team (Human)</h2>
        <p>Total Profit: ${data.green_team_profit.toFixed(2)}</p>
        <p>Inventory: {data.green_team_inventory}</p>
        <p>Price: ${data.green_team_price}</p>
      </div>

      {/* Blue Team */}
      <div className="p-4 bg-blue-50 rounded shadow">
        <h2 className="text-lg font-bold text-blue-700">Blue Team (MAS)</h2>
        <p>Total Profit: ${data.blue_team_profit.toFixed(2)}</p>
        <p>Inventory: {data.blue_team_inventory}</p>
        <p>Price: ${data.blue_team_price}</p>
      </div>
    </div>
  );
}
