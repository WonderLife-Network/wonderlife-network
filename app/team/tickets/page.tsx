"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeamTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Lade alle Tickets
  async function loadTickets() {
    const res = await fetch("/api/team/tickets");
    const data = await res.json();

    setTickets(data.tickets);
    setFiltered(data.tickets);
    setLoading(false);
  }

  // Filter anwenden
  function applyFilter(type: string) {
    setFilter(type);

    if (type === "all") return setFiltered(tickets);
    if (type === "open") return setFiltered(tickets.filter((t) => t.status === "open"));
    if (type === "closed") return setFiltered(tickets.filter((t) => t.status === "closed"));
    if (type === "high") return setFiltered(tickets.filter((t) => t.priority === "high"));
    if (type === "assigned") return setFiltered(tickets.filter((t) => t.assignedTo));
    if (type === "unassigned") return setFiltered(tickets.filter((t) => !t.assignedTo));
  }

  useEffect(() => {
    loadTickets();
  }, []);

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

      <h2 className="text-2xl font-bold mb-6">Alle Tickets</h2>

      {/* FILTER */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => applyFilter("all")}
          className={`px-4 py-2 rounded-lg border border-purple-600/40 ${filter === "all" ? "bg-purple-600" : "bg-[#141726]"}`}
        >
          Alle
        </button>

        <button
          onClick={() => applyFilter("open")}
          className={`px-4 py-2 rounded-lg border border-green-600/40 ${filter === "open" ? "bg-green-600" : "bg-[#141726]"}`}
        >
          Offen
        </button>

        <button
          onClick={() => applyFilter("closed")}
          className={`px-4 py-2 rounded-lg border border-red-600/40 ${filter === "closed" ? "bg-red-600" : "bg-[#141726]"}`}
        >
          Geschlossen
        </button>

        <button
          onClick={() => applyFilter("high")}
          className={`px-4 py-2 rounded-lg border border-yellow-600/40 ${filter === "high" ? "bg-yellow-600" : "bg-[#141726]"}`}
        >
          Hoch
        </button>

        <button
          onClick={() => applyFilter("assigned")}
          className={`px-4 py-2 rounded-lg border border-blue-600/40 ${filter === "assigned" ? "bg-blue-600" : "bg-[#141726]"}`}
        >
          Zugewiesen
        </button>

        <button
          onClick={() => applyFilter("unassigned")}
          className={`px-4 py-2 rounded-lg border border-gray-600/40 ${filter === "unassigned" ? "bg-gray-600" : "bg-[#141726]"}`}
        >
          Unzugewiesen
        </button>
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
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">#{t.id} – {t.title}</h3>

                {/* STATUS BADGE */}
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    t.status === "open"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <p className="opacity-80 mb-2">
                Kategorie: {t.category}
              </p>

              {/* PRIORITY BADGE */}
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  t.priority === "high"
                    ? "bg-yellow-600"
                    : t.priority === "low"
                    ? "bg-blue-600"
                    : "bg-purple-600"
                }`}
              >
                Priorität: {t.priority}
              </span>

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
