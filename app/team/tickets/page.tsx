"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Badge-Icons importieren
import { 
  StatusBadge, 
  PriorityBadge, 
  AssignBadge 
} from "@/components/TicketBadges";

export default function TeamTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------
  // ALLE TICKETS LADEN
  // --------------------------------------------------------------------
  async function loadTickets() {
    const res = await fetch("/api/team/tickets");
    const data = await res.json();

    setTickets(data.tickets);
    setFiltered(data.tickets);
    setLoading(false);
  }

  // --------------------------------------------------------------------
  // FILTER
  // --------------------------------------------------------------------
  function applyFilter(type: string) {
    setFilter(type);

    if (type === "all") return setFiltered(tickets);
    if (type === "open") return setFiltered(tickets.filter((t) => t.status === "open"));
    if (type === "closed") return setFiltered(tickets.filter((t) => t.status === "closed"));
    if (type === "high") return setFiltered(tickets.filter((t) => t.priority === "high"));
    if (type === "assigned") return setFiltered(tickets.filter((t) => t.assignedTo));
    if (type === "unassigned") return setFiltered(tickets.filter((t) => !t.assignedTo));
  }

  // --------------------------------------------------------------------
  // MOUNT
  // --------------------------------------------------------------------
  useEffect(() => {
    loadTickets();
  }, []);

  // --------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* BANNER */}
      <div className="w-full h-48 rounded-xl overflow-hidden border border-purple-600/30 mb-10 relative">
        <img
          src="/team/team-banner.png"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 flex items-end px-8 pb-5">
          <h1 className="text-3xl font-bold">Support – Ticket Dashboard</h1>
        </div>
      </div>

      {/* TITEL */}
      <h2 className="text-2xl font-bold mb-6">Alle Tickets</h2>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          ["all", "Alle", "purple"],
          ["open", "Offen", "green"],
          ["closed", "Geschlossen", "red"],
          ["high", "Hohe Priorität", "yellow"],
          ["assigned", "Zugewiesen", "pink"],
          ["unassigned", "Unzugewiesen", "gray"]
        ].map(([value, label, color]) => (
          <button
            key={value}
            onClick={() => applyFilter(value)}
            className={`px-4 py-2 rounded-lg border border-${color}-600/40 ${
              filter === value ? `bg-${color}-600` : "bg-[#141726]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* TICKET LISTE */}
      {loading ? (
        <p className="opacity-60">Tickets werden geladen…</p>
      ) : filtered.length === 0 ? (
        <p className="opacity-60">Keine Tickets gefunden.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {filtered.map((t) => (
            <Link
              key={t.id}
              href={`/tickets/${t.id}`}
              className="bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6 hover:border-purple-400 transition shadow-lg"
            >
              {/* TITEL + STATUS */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">#{t.id} – {t.title}</h3>

                {/* StatusBadge */}
                <StatusBadge status={t.status} />
              </div>

              {/* KATEGORIE */}
              <p className="opacity-80 mb-2">
                Kategorie: {t.category}
              </p>

              {/* PRIORITÄTS-BADGE */}
              <PriorityBadge priority={t.priority} />

              {/* ASSIGN BADGE */}
              <div className="mt-3">
                <AssignBadge assignedTo={t.assignedTo} />
              </div>

              {/* DATUM */}
              <div className="mt-4 text-sm opacity-50">
                Erstellt: {new Date(t.createdAt).toLocaleString("de-DE")}
              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}
