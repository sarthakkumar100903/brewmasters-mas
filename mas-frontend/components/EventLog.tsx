interface EventLogProps {
  log: string[];
}

export default function EventLog({ log }: EventLogProps) {
  return (
    <div className="bg-gray-100 p-4 rounded overflow-y-auto max-h-48 text-sm">
      <h2 className="font-semibold mb-2">Event Log</h2>
      <ul className="space-y-1">
        {log.map((line, idx) => (
          <li key={idx}>• {line}</li>
        ))}
      </ul>
    </div>
  );
}
