import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GameState } from '../types/GameState';

interface PriceChartProps {
  history: GameState['turn_history'];
}

export default function PriceChart({ history }: PriceChartProps) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-semibold mb-2">Prices Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="turn" />
          <YAxis domain={[0, 20]}/> {/* Adjust Y-axis domain for typical price range */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="blue_team_price" stroke="#8884d8" name="MAS Price" />
          <Line type="monotone" dataKey="green_team_price" stroke="#82ca9d" name="Human Price" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}