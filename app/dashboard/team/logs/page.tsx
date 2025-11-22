"use client";

import { useEffect, useState } from "react";

export default function LogsDashboard() {
  const [tab, setTab] = useState("system");
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/logs/list?type=${tab}`)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, [tab]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* BANNER */}
      <div className="w-full h-48 mb-10 rounded-xl overflow-hidden border border-purple-700/40 relative">
        <img
          src="/team/ticket-detail-banner.png"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 flex items-end px-8 pb-6">
          <h1 className="text-3xl font-bold">Logs-Zentrale</h1>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setTab("system")}
          className={`px-6 py-3 rounded-lg ${
            tab === "system" ? "bg-purple-600" : "bg-[#1a1c27]"
          }`}
        >
          System-Logs
        </button>

        <button
          onClick={() => setTab("mod")}
          className={`px-6 py-3 rounded-lg ${
            tab === "mod" ? "bg-purple-600" : "bg-[#1a1c27]"
          }`}
        >
          Moderation
        </button>

        <button
          onClick={() => setTab("api")}
          className={`px-6 py-3 rounded-lg ${
            tab === "api" ? "bg-purple-600" : "bg-[#1a1c27]"
          }`}
        >
          API Requests
        </button>

        <button
          onClick={() => setTab("ticket")}
          className={`px-6 py-3 rounded-lg ${
            tab === "ticket" ? "bg-purple-600" : "bg-[#1a1c27]"
          }`}
        >
          Ticket Logs
        </button>
      </div>

      {/* LOG LISTE */}
      <div className="space-y-4">
        {logs.map((log: any) => (
          <div
            key={log.id}
            className="p-5 bg-[#0d0f18] border border-purple-700/40 rounded-lg shadow-lg hover:scale-[1.01] transition"
          >
            <p className="font-bold">{log.message}</p>

            <p className="opacity-60 mt-1 text-sm">
              {new Date(log.createdAt).toLocaleString("de-DE")}
            </p>

            {log.route && (
              <p className="opacity-60 text-sm mt-2">
                Route: {log.route} | {log.method} | {log.status}
              </p>
            )}

            {log.action && (
              <p className="opacity-60 text-sm mt-2">Aktion: {log.action}</p>
            )}
          </div>
        ))}

        {logs.length === 0 && (
          <p className="text-center opacity-50">Keine Logs vorhanden.</p>
        )}
      </div>
    </div>
  );
}
