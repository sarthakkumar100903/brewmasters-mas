import { useEffect, useRef, useState } from "react";
import ControlsPanel from "../components/ControlsPanel";
import Dashboard from "../components/Dashboard";
import EventLog from "../components/EventLog";
import ProductionChart from "../components/ProductionChart";
import PriceChart from "../components/PriceChart";
import ProfitChart from "../components/ProfitChart";
import TotalProfitChart from "../components/TotalProfitChart";
import CurrentTurnDetails from "../components/CurrentTurnDetails";
import { GameState } from "../types/GameState";

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      const data: GameState = JSON.parse(event.data);
      setGameState(data);
    };

    socket.onerror = (err) => console.error("WebSocket error", err);
    socket.onclose = () => console.warn("WebSocket closed");

    return () => socket.close();
  }, []);

  const sendTurn = (decisions: {
    price: number;
    marketingSpend: number;
    productionTarget: number;
  }) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(decisions));
    }
  };

  if (!gameState) return <div className="p-6">Loading game...</div>;

  const chartHistory = gameState.turn_history.filter((entry) => entry.turn > 0);

  return (
    <div className="min-h-screen bg-white text-black p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">BrewMasters CEO Challenge</h1>

      <Dashboard data={gameState} />

      {/* Controls and Event Log side-by-side */}
      <div className="flex flex-col md:flex-row gap-6 w-full items-stretch">
        <div className="flex-grow basis-1/2 h-full">
          <div className="h-full flex flex-col bg-gray-50 rounded-lg p-4 shadow">
            <ControlsPanel onSubmit={sendTurn} />
          </div>
        </div>
        <div className="flex-grow basis-1/2 h-full">
          <div className="h-full flex flex-col bg-gray-50 rounded-lg p-4 shadow">
            <EventLog log={gameState.event_log} />
          </div>
        </div>
      </div>

      <CurrentTurnDetails data={gameState} />

      {chartHistory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PriceChart history={chartHistory} />
          <ProductionChart history={chartHistory} />
          <ProfitChart history={chartHistory} />
          <TotalProfitChart history={chartHistory} />
        </div>
      )}
    </div>
  );
}
