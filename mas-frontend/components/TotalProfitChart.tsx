import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GameState } from '../types/GameState';

interface TotalProfitChartProps {
  history: GameState['turn_history'];
}

export default function TotalProfitChart({ history }: TotalProfitChartProps) {
  // Function to generate ticks for the Y-axis. This function is placed within the same file.
  const generateTicks = (min: number, max: number, interval: number) => {
    const ticks = [];
    for (let i = min; i <= max; i += interval) {
      ticks.push(i);
    }
    return ticks;
  };

  // Generate ticks for the Y-axis with a 5000 interval from 70000 to 150000
  const yAxisTicks = generateTicks(70000, 150000, 5000);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-semibold mb-2">Total Profit Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="turn" />
          {/* Apply the specified domain and the generated ticks to the YAxis */}
          <YAxis domain={[70000, 150000]} ticks={yAxisTicks} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="blue_team_total_profit" stroke="#8884d8" name="MAS Total Profit" />
          <Line type="monotone" dataKey="green_team_total_profit" stroke="#82ca9d" name="Human Total Profit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}