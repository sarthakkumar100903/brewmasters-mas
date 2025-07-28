import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GameState } from '../types/GameState';

interface ProfitChartProps {
  history: GameState['turn_history'];
}

export default function ProfitChart({ history }: ProfitChartProps) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-semibold mb-2">Profit This Turn Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="turn" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="blue_team_profit_this_turn" stroke="#8884d8" name="MAS Profit" />
          <Line type="monotone" dataKey="green_team_profit_this_turn" stroke="#82ca9d" name="Human Profit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}