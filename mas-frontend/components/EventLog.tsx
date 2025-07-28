import { useEffect, useRef } from "react";

interface EventLogProps {
  log: string[];
}

export default function EventLog({ log }: EventLogProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0; // Set scroll position to the very top
    }
  }, [log]);

  // Processes the raw log to group entries by turn and reverse the turn order.
  // Entries within each turn remain in their original chronological order.
  const processLogForDisplay = (rawLog: string[]) => {
    const turns: string[][] = [];
    let currentTurnEntries: string[] = [];

    // Iterate through the raw log in chronological order
    for (const entry of rawLog) {
      if (entry.startsWith("--- Turn ") && entry.endsWith(" ---")) {
        // If it's a new turn header and we have accumulated entries for a previous turn,
        // push the completed turn's entries to the 'turns' array.
        if (currentTurnEntries.length > 0) {
          turns.push(currentTurnEntries);
        }
        // Start a new turn's entries with the current turn header.
        currentTurnEntries = [entry];
      } else {
        // For regular log entries, prepend a bullet point and add to the current turn's entries.
        currentTurnEntries.push(`• ${entry}`);
      }
    }
    // After the loop, add the very last set of accumulated entries (which could be
    // the initial "Game Started!" entry or the final turn's entries).
    if (currentTurnEntries.length > 0) {
      turns.push(currentTurnEntries);
    }

    // Now, reverse the order of the turns themselves.
    // The internal order of entries within each turn is preserved.
    return turns.reverse().flat(); // Flatten the array of arrays back into a single array for rendering
  };

  const displayLog = processLogForDisplay(log);

  return (
    <div className="bg-gray-100 p-4 rounded overflow-y-auto max-h-64 text-sm">
      <h2 className="font-semibold mb-2">Event Log</h2>
      <div ref={logContainerRef} className="flex-grow">
        <ul className="space-y-1">
          {displayLog.map((line, idx) => {
            // Check if the line is a turn header to apply specific styling.
            const isTurnHeader = line.startsWith("--- Turn ") && line.endsWith(" ---");
            return (
              <li key={idx} className={isTurnHeader ? "font-bold mt-2" : ""}>
                {line} {/* Render the line as is, as it's already formatted by processLogForDisplay */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}