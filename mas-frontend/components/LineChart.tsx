import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ChartProps {
  history: {
    turn: number;
    production_target: number;
    price: number;
    marketing_spend: number;
  }[];
}

export default function ProductionChart({ history }: ChartProps) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-semibold mb-2">Production Targets Over Time</h2>
      <LineChart width={500} height={300} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="turn" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="production_target" stroke="#8884d8" name="MAS Production" />
      </LineChart>
    </div>
  );
}
