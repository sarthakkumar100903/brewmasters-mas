import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  // History now needs to contain production targets for both teams per turn
  history: {
    turn: number;
    blue_team_production_target: number;
    green_team_production_target: number;
  }[];
}

export default function ProductionChart({ history }: ChartProps) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-semibold mb-2">Production Targets Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="turn" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="blue_team_production_target" stroke="#8884d8" name="MAS Production" />
          <Line type="monotone" dataKey="green_team_production_target" stroke="#82ca9d" name="Human Production" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}