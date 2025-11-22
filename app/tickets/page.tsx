"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tickets/list")
      .then((r) => r.json())
      .then((d) => {
        setTickets(d.tickets);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* BANNER */}
      <div className="w-full h-56 rounded-xl overflow-hidden border border-purple-600/30 mb-10 relative">
        <img
          src="/team/team-banner.png"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70 flex items-end px-8 pb-6">
          <h1 className="text-3xl font-bold">Ticket-System</h1>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Alle Tickets</h2>
        <Link
          href="/tickets/create"
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          + Neues Ticket
        </Link>
      </div>

      {/* TICKETS */}
      {loading ? (
        <p className="opacity-60">Lade Tickets…</p>
      ) : tickets.length === 0 ? (
        <p className="opacity-60">Keine Tickets vorhanden.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((t) => (
            <Link
              key={t.id}
              href={`/tickets/${t.id}`}
              className="p-5 bg-[#0d0f18] border border-purple-700/30 rounded-lg hover:border-purple-500 transition"
            >
              <h3 className="text-xl font-bold mb-2">{t.title}</h3>

              <div className="flex gap-3 text-sm opacity-70">
                <p>#{t.id}</p>
                <p>|</p>
                <p>Kategorie: {t.category}</p>
                <p>|</p>
                <p>Status: {t.status}</p>
              </div>

              <p className="mt-2 opacity-50 text-sm">
                Erstellt am: {new Date(t.createdAt).toLocaleString("de-DE")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
