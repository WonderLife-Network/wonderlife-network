"use client";

export function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    open: "bg-green-600 border-green-500",
    closed: "bg-red-600 border-red-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-bold border ${colors[status] || "bg-gray-600 border-gray-500"}`}
    >
      {status === "open" ? "Offen" : "Geschlossen"}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const colors: any = {
    high: "bg-yellow-600 border-yellow-500",
    normal: "bg-purple-600 border-purple-500",
    low: "bg-blue-600 border-blue-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-bold border ${colors[priority] || "bg-gray-600 border-gray-500"}`}
    >
      Priorität: {priority}
    </span>
  );
}

export function AssignBadge({ assignedTo }: { assignedTo: number | null }) {
  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
        assignedTo
          ? "bg-pink-600 border-pink-500"
          : "bg-gray-600 border-gray-500"
      }`}
    >
      {assignedTo ? `Zugewiesen (#${assignedTo})` : "Nicht zugewiesen"}
    </span>
  );
}
