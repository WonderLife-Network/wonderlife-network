"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ForumThreadPage({ params }: any) {
  const [thread, setThread] = useState<any>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Thread + Antworten laden
  useEffect(() => {
    fetch(`/api/forum/thread/${params.id}`)
      .then(res => res.json())
      .then(data => setThread(data));
  }, [params.id]);

  async function postReply(e: any) {
    e.preventDefault();
    if (!reply.trim()) return;

    setLoading(true);

    const res = await fetch("/api/forum/reply/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: reply,
        threadId: Number(params.id),
        authorId: 1 // später session.user.id
      })
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) return alert(data.error);

    setReply("");

    // neu laden
    fetch(`/api/forum/thread/${params.id}`)
      .then(res => res.json())
      .then(data => setThread(data));
  }

  if (!thread)
    return (
      <p className="text-white text-center mt-20 opacity-50">
        Thema wird geladen…
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">

      {/* Titel */}
      <h1 className="text-4xl font-bold mb-4">{thread.title}</h1>
      
      <p className="opacity-70 mb-10">
        {new Date(thread.createdAt).toLocaleString("de-DE")}
      </p>

      {/* Inhalt */}
      <div className="bg-[#0d0f18] border border-purple-700/40 p-6 rounded-xl shadow-lg">
        <div className="leading-relaxed text-lg whitespace-pre-line">
          {thread.content}
        </div>
      </div>

      {/* Antworten */}
      <h2 className="text-3xl font-bold mt-16 mb-6">
        Antworten ({thread.replies.length})
      </h2>

      <div className="space-y-6">

        {thread.replies.length === 0 && (
          <p className="opacity-60">Noch keine Antworten vorhanden.</p>
        )}

        {thread.replies.map((r: any, i: number) => (
          <div
            key={i}
            className="bg-[#0d0f18] border border-purple-700/40 p-5 rounded-xl"
          >
            <p className="text-lg whitespace-pre-line">{r.content}</p>

            <p className="opacity-60 text-sm mt-3">
              {new Date(r.createdAt).toLocaleString("de-DE")}
            </p>
          </div>
        ))}

      </div>

      {/* Antwort erstellen */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-4">Antwort schreiben</h3>

        <form onSubmit={postReply} className="space-y-4">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full h-32 bg-[#0d0f18] border border-purple-700/40 rounded-xl p-4 resize-none"
            placeholder="Antwort eingeben…"
          />

          <button
            disabled={loading}
            className="px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/40 disabled:opacity-50"
          >
            {loading ? "Senden…" : "Antwort senden"}
          </button>
        </form>
      </div>
    </div>
  );
}
