import { useEffect, useRef } from "react";

interface EventLogProps {
  log: string[];
}

export default function EventLog({ log }: EventLogProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the top when new logs arrive, since newest entries will be rendered at the top
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0; // Set scroll position to the very top
    }
  }, [log]);

  return (
    <div className="bg-gray-100 p-4 rounded overflow-y-auto max-h-64 text-sm"> {/* max-h and overflow-y-auto for scrollbar */}
      <h2 className="font-semibold mb-2">Event Log</h2>
      <div ref={logContainerRef} className="flex-grow"> {/* This inner div will contain the scrollable content */}
        <ul className="space-y-1">
          {/* CRITICAL FIX: Reverse the log array to show most recent entries first (at the top) */}
          {log.slice().reverse().map((line, idx) => {
            const isTurnHeader = line.startsWith("--- Turn ") && line.endsWith(" ---");
            return (
              <li key={idx} className={isTurnHeader ? "font-bold mt-2" : ""}>
                {isTurnHeader ? line : `• ${line}`}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}