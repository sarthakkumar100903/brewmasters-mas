import { useState } from "react";

interface ControlsProps {
  onSubmit: (decisions: {
    price: number;
    marketingSpend: number;
    productionTarget: number;
  }) => void;
}

export default function ControlsPanel({ onSubmit }: ControlsProps) {
  const [price, setPrice] = useState(10);
  const [marketingSpend, setMarketingSpend] = useState(0);
  const [productionTarget, setProductionTarget] = useState(50);

  const handleSubmit = () => {
    onSubmit({ price, marketingSpend, productionTarget });
  };

  return (
    <div className="space-y-4 p-4 bg-green-100 rounded-xl shadow">
      <h2 className="text-lg font-semibold">Green Team Controls</h2>
      <label className="block">
        Price: ${price.toFixed(2)} {/* Display current value */}
        <input
          type="range" // Changed to range slider
          min="8"      // Minimum price
          max="15"     // Maximum price
          step="0.1"   // Step for price adjustment
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </label>
      <label className="block">
        Production Target:
        <input
          type="number"
          value={productionTarget}
          onChange={(e) => setProductionTarget(Number(e.target.value))}
          className="w-full border rounded p-1"
        />
      </label>
      <label className="block">
        Marketing Spend:
        <select
          value={marketingSpend}
          onChange={(e) => setMarketingSpend(Number(e.target.value))}
          className="w-full border rounded p-1"
        >
          <option value={0}>$0</option>
          <option value={500}>$500</option>
          <option value={2000}>$2000</option>
        </select>
      </label>
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        End Turn
      </button>
    </div>
  );
}