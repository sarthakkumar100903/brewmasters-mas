import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GameState } from '../types/GameState';

interface TotalProfitChartProps {
  history: GameState['turn_history'];
}

export default function TotalProfitChart({ history }: TotalProfitChartProps) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-semibold mb-2">Total Profit Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="turn" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="blue_team_total_profit" stroke="#8884d8" name="MAS Total Profit" />
          <Line type="monotone" dataKey="green_team_total_profit" stroke="#82ca9d" name="Human Total Profit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}