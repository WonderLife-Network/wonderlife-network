"use client";

//
// ICONS (inline SVG für maximale Schärfe & Kontrolle)
//
const IconCheck = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M9.7 17.3 4.4 12l1.4-1.4 3.9 3.9 8.5-8.5L20.6 7l-10.9 10.3z" />
  </svg>
);

const IconX = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="m7.05 7.05 9.9 9.9m-9.9 0 9.9-9.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconFire = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M13.5 2c0 3-2.5 3.5-2.5 6 0 1.8 1.3 3 3 3s3-1.3 3-3c0-4-3.5-6-3.5-6Zm-7 13.4c0 3.6 3 6.6 6.6 6.6s6.6-3 6.6-6.6c0-1.9-.8-3.6-2.1-4.8-1.4 3.4-4.7 4-6.4 2.3-1.7-1.7-1.1-5-2.3-6.4a6.6 6.6 0 0 0-2.4 4.9Z"
    />
  </svg>
);

const IconLow = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IconUser = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 12c2.7 0 4.9-2.5 4.9-5.6C16.9 3.2 14.7 1 12 1S7.1 3.2 7.1 6.4C7.1 9.5 9.3 12 12 12Zm0 2c-4 0-8 2.1-8 5v2h16v-2c0-2.9-4-5-8-5Z"
    />
  </svg>
);

//
// BADGES MIT ICONS
//

export function StatusBadge({ status }: { status: string }) {
  const isOpen = status === "open";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold border
        ${isOpen ? "bg-green-600/20 border-green-500 text-green-300" : "bg-red-600/20 border-red-500 text-red-300"}
      `}
    >
      {isOpen ? <IconCheck /> : <IconX />}
      {isOpen ? "Offen" : "Geschlossen"}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const isHigh = priority === "high";
  const isLow = priority === "low";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold border
        ${
          isHigh
            ? "bg-yellow-600/20 border-yellow-500 text-yellow-300"
            : isLow
            ? "bg-blue-600/20 border-blue-500 text-blue-300"
            : "bg-purple-600/20 border-purple-500 text-purple-300"
        }
      `}
    >
      {isHigh ? <IconFire /> : isLow ? <IconLow /> : <IconCheck />}
      {priority === "high" ? "Hoch" : priority === "low" ? "Niedrig" : "Normal"}
    </span>
  );
}

export function AssignBadge({ assignedTo }: { assignedTo: number | null }) {
  const isAssigned = Boolean(assignedTo);

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold border
        ${
          isAssigned
            ? "bg-pink-600/20 border-pink-500 text-pink-300"
            : "bg-gray-600/20 border-gray-500 text-gray-300"
        }
      `}
    >
      <IconUser />
      {isAssigned ? `Zugewiesen (#${assignedTo})` : "Nicht zugewiesen"}
    </span>
  );
}
