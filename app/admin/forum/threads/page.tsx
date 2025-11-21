"use client";

import { useEffect, useState } from "react";

export default function AdminForumThreads() {
  const [threads, setThreads] = useState([]);
  const [categories, setCategories] = useState([]);

  function load() {
    fetch("/api/forum/allThreads")
      .then(res => res.json())
      .then(data => setThreads(data));

    fetch("/api/forum")
      .then(res => res.json())
      .then(data => setCategories(data));
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteThread(id: number) {
    if (!confirm("Soll dieser Thread wirklich gelöscht werden?")) return;

    const res = await fetch("/api/forum/thread/delete", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id })
    });

    load();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">Threads verwalten</h1>

      <div className="space-y-6">
        {threads.map((thread: any) => (
          <div
            key={thread.id}
            className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 shadow-lg flex justify-between"
          >
            {/* Thread Info */}
            <div className="w-3/4">
              <h2 className="text-2xl font-bold">{thread.title}</h2>
              <p className="opacity-70 mt-1 line-clamp-2">{thread.content}</p>

              <p className="text-purple-400 text-sm mt-3">
                Kategorie:{" "}
                {categories.find((c: any) => c.id === thread.categoryId)?.name ||
                  "Unbekannt"}
              </p>

              <p className="opacity-70 text-sm">
                Antworten: {thread._count.replies}
              </p>

              <p className="opacity-50 text-sm mt-1">
                {new Date(thread.createdAt).toLocaleString("de-DE")}
              </p>
            </div>

            {/* Admin Actions */}
            <div className="flex flex-col justify-center gap-3">
              {/* später verschieben */}
              {/* <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800">
                Verschieben
              </button> */}

              <button
                onClick={() => deleteThread(thread.id)}
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
