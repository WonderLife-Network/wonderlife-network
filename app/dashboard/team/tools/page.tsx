"use client";

import { useState } from "react";
import Link from "next/link";

export default function SupportToolsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(`/api/tools/user/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* HEADER BANNER */}
      <div className="w-full h-48 mb-10 rounded-xl overflow-hidden border border-purple-700/40 shadow-lg relative">
        <img
          src="/team/ticket-detail-banner.png"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 flex items-end px-8 pb-6">
          <h1 className="text-3xl font-bold">Support Tools</h1>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-[#0d0f18] p-8 rounded-xl border border-purple-700/40 shadow-lg mb-12">
        <h2 className="text-xl font-bold mb-4">Benutzer suchen</h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name, Email, Discord ID, User ID…"
            className="flex-1 px-4 py-3 rounded-lg bg-[#151822] border border-purple-700/40"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            disabled={loading}
            onClick={search}
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/40"
          >
            {loading ? "Suche..." : "Suchen"}
          </button>
        </div>

        <p className="opacity-60 mt-3">
          🔍 Suche nach: Name, Email, Discord ID, User ID
        </p>
      </div>

      {/* RESULTS */}
      <div className="space-y-6">
        {results.map((u: any) => (
          <Link key={u.id} href={`/dashboard/team/tools/user/${u.id}`}>
            <div className="p-6 bg-[#0e0f17] border border-purple-700/40 rounded-xl hover:scale-[1.02] transition shadow-lg cursor-pointer">
              <h3 className="text-2xl font-bold">{u.username}</h3>
              <p className="opacity-60">{u.email}</p>
              {u.discordId && (
                <p className="opacity-60">Discord: {u.discordId}</p>
              )}
            </div>
          </Link>
        ))}

        {results.length === 0 && (
          <p className="opacity-50 text-center">Keine Ergebnisse</p>
        )}
      </div>
    </div>
  );
}
