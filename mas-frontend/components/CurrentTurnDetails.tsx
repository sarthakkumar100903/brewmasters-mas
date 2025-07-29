import { GameState } from "../types/GameState";

interface CurrentTurnDetailsProps {
  data: GameState;
}

export default function CurrentTurnDetails({ data }: CurrentTurnDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center border-b pb-3 mb-4">Current Turn Decisions (Turn {data.turn})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Green Team Decisions */}
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm">
          <h3 className="font-semibold text-green-800 text-lg mb-2">Green Team (Human)</h3>
          <p className="text-gray-700">Price: <span className="font-medium">${data.green_team_price.toFixed(2)}</span></p>
          <p className="text-gray-700">Production Target: <span className="font-medium">{data.green_team_last_production_target} units</span></p>
          <p className="text-gray-700">Marketing Spend: <span className="font-medium">${data.green_team_last_marketing_spend}</span></p>
        </div>

        {/* Blue Team Decisions */}
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm">
          <h3 className="font-semibold text-blue-800 text-lg mb-2">Blue Team (MAS)</h3>
          <p className="text-gray-700">Price: <span className="font-medium">${data.blue_team_price.toFixed(2)}</span></p>
          <p className="text-gray-700">Production Target: <span className="font-medium">{data.blue_team_last_production_target} units</span></p>
          <p className="text-gray-700">Marketing Spend: <span className="font-medium">${data.blue_team_last_marketing_spend}</span></p>
        </div>
      </div>
    </div>
  );
}