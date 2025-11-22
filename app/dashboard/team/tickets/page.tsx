"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TicketListPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filter, setFilter] = useState("OPEN");

  useEffect(() => {
    fetch("/api/tickets/list")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* HEADER BANNER */}
      <div className="w-full h-48 mb-10 rounded-xl overflow-hidden border border-purple-700/40 shadow-lg relative">
        <img
          src="/team/tickets-banner.png"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 flex items-end px-8 pb-6">
          <h1 className="text-3xl font-bold">Support Tickets</h1>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-10">
        <button
          onClick={() => setFilter("OPEN")}
          className={`px-5 py-3 rounded-lg ${
            filter === "OPEN"
              ? "bg-purple-600"
              : "bg-[#1a1c27] hover:bg-[#232634]"
          }`}
        >
          Offene Tickets
        </button>

        <button
          onClick={() => setFilter("CLOSED")}
          className={`px-5 py-3 rounded-lg ${
            filter === "CLOSED"
              ? "bg-purple-600"
              : "bg-[#1a1c27] hover:bg-[#232634]"
          }`}
        >
          Geschlossene Tickets
        </button>

        <Link
          href="/dashboard/team/tickets/new"
          className="ml-auto px-5 py-3 bg-green-600 hover:bg-green-800 rounded-lg"
        >
          + Neues Ticket
        </Link>
      </div>

      {/* TICKET LISTE */}
      <div className="space-y-6">
        {tickets
          .filter((t) => t.status === filter)
          .map((ticket: any) => (
            <Link key={ticket.id} href={`/dashboard/team/tickets/${ticket.id}`}>
              <div className="p-6 rounded-xl bg-[#0e0f17] border border-purple-700/40 hover:scale-[1.02] transition shadow-lg cursor-pointer">
                <h2 className="text-2xl font-bold">{ticket.title}</h2>
                <p className="opacity-60 mt-1">{ticket.category}</p>

                <div className="flex gap-3 mt-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      ticket.priority === "HIGH"
                        ? "bg-red-700"
                        : ticket.priority === "LOW"
                        ? "bg-blue-700"
                        : "bg-gray-700"
                    }`}
                  >
                    {ticket.priority}
                  </span>

                  <span className="px-3 py-1 rounded-lg bg-purple-700 text-sm">
                    {ticket.status}
                  </span>
                </div>

                <p className="opacity-50 text-sm mt-4">
                  Erstellt am:{" "}
                  {new Date(ticket.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
