import { useEffect, useRef, useState } from "react";
import ControlsPanel from "../components/ControlsPanel";
import Dashboard from "../components/Dashboard";
import EventLog from "../components/EventLog";
import { GameState } from "../types/GameState";

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
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

  return (
    <div className="min-h-screen bg-white text-black p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">BrewMasters CEO Challenge</h1>
      <Dashboard data={gameState} />
      <ControlsPanel onSubmit={sendTurn} />
      <EventLog log={gameState.event_log} />
    </div>
  );
}
