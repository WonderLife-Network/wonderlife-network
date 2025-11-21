"use client";

import { useEffect, useState } from "react";

export default function AdminForumReplies() {
  const [replies, setReplies] = useState([]);

  function load() {
    fetch("/api/forum/allReplies")
      .then(res => res.json())
      .then(data => setReplies(data));
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteReply(id: number) {
    if (!confirm("Soll diese Antwort gelöscht werden?")) return;

    await fetch("/api/forum/reply/delete", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id })
    });

    load();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-white">
      
      <h1 className="text-4xl font-bold mb-10">Antworten verwalten</h1>

      <div className="space-y-6">
        {replies.map((r: any) => (
          <div
            key={r.id}
            className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 shadow-lg flex justify-between"
          >
            {/* Reply Content */}
            <div className="w-3/4">
              <p className="text-lg whitespace-pre-line">{r.content}</p>

              <p className="opacity-50 text-sm mt-3">
                {new Date(r.createdAt).toLocaleString("de-DE")}
              </p>

              <p className="text-purple-400 text-sm mt-2">
                Thread: {r.thread?.title}
              </p>

              <p className="text-blue-400 text-sm">
                Kategorie: {r.thread?.category?.name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-4">
              <button
                onClick={() => deleteReply(r.id)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-800 shadow-lg shadow-red-500/40"
              >
                Löschen
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
