import { GameState } from "../types/GameState";

interface CurrentTurnDetailsProps {
  data: GameState;
}

export default function CurrentTurnDetails({ data }: CurrentTurnDetailsProps) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold text-center">Current Turn Decisions (Turn {data.turn})</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Green Team Decisions */}
        <div className="bg-green-100 p-3 rounded">
          <h3 className="font-medium text-green-800">Green Team (Human)</h3>
          <p>Price: ${data.green_team_price.toFixed(2)}</p>
          <p>Production Target: {data.green_team_last_production_target} units</p>
          <p>Marketing Spend: ${data.green_team_last_marketing_spend}</p>
        </div>

        {/* Blue Team Decisions */}
        <div className="bg-blue-100 p-3 rounded">
          <h3 className="font-medium text-blue-800">Blue Team (MAS)</h3>
          <p>Price: ${data.blue_team_price.toFixed(2)}</p>
          <p>Production Target: {data.blue_team_last_production_target} units</p>
          <p>Marketing Spend: ${data.blue_team_last_marketing_spend}</p>
        </div>
      </div>
    </div>
  );
}