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
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-800 text-center mb-4">Green Team Controls</h2>
      
      {/* Price Control */}
      <div className="control-group">
        <label className="block text-gray-700 font-medium mb-2">
          Set Price: <span className="font-bold text-green-700">${price.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="8"
          max="15"
          step="0.1"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer thumb-green"
        />
      </div>

      {/* Production Target Control */}
      <div className="control-group">
        <label className="block text-gray-700 font-medium mb-2">
          Production Target: <span className="font-bold text-green-700">{productionTarget} units</span>
        </label>
        <input
          type="range"
          min="0"
          max="200"
          step="10"
          value={productionTarget}
          onChange={(e) => setProductionTarget(Number(e.target.value))}
          className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer thumb-green"
        />
      </div>

      {/* Marketing Spend Control */}
      <div className="control-group">
        <label className="block text-gray-700 font-medium mb-2">
          Marketing Spend: <span className="font-bold text-green-700">${marketingSpend}</span>
        </label>
        <input
          type="range"
          min="0"
          max="12000" // Set max to 12000
          step="500"  // Set intervals to 500
          value={marketingSpend}
          onChange={(e) => setMarketingSpend(Number(e.target.value))}
          className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer thumb-green"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>$0</span>
          <span>$12000</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        End Turn
      </button>
    </div>
  );
}