"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContentDashboard() {
  const [threads, setThreads] = useState([]);
  const [replies, setReplies] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [activeTab, setActiveTab] = useState("threads");

  useEffect(() => {
    fetch("/api/user/myThreads")
      .then((res) => res.json())
      .then((data) => setThreads(data));

    fetch("/api/user/myReplies")
      .then((res) => res.json())
      .then((data) => setReplies(data));

    fetch("/api/user/myGallery")
      .then((res) => res.json())
      .then((data) => setGallery(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">Meine Inhalte</h1>

      {/* TABS */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setActiveTab("threads")}
          className={`px-6 py-3 rounded-lg ${
            activeTab === "threads"
              ? "bg-purple-600"
              : "bg-[#1a1c27] hover:bg-[#232634]"
          }`}
        >
          Forum Threads
        </button>

        <button
          onClick={() => setActiveTab("replies")}
          className={`px-6 py-3 rounded-lg ${
            activeTab === "replies"
              ? "bg-purple-600"
              : "bg-[#1a1c27] hover:bg-[#232634]"
          }`}
        >
          Antworten
        </button>

        <button
          onClick={() => setActiveTab("gallery")}
          className={`px-6 py-3 rounded-lg ${
            activeTab === "gallery"
              ? "bg-purple-600"
              : "bg-[#1a1c27] hover:bg-[#232634]"
          }`}
        >
          Galerie Uploads
        </button>
      </div>

      {/* CONTENT */}

      {/* THREADS */}
      {activeTab === "threads" && (
        <div className="space-y-6">
          {threads.length === 0 && (
            <p className="opacity-60">Du hast noch keine Forum-Themen erstellt.</p>
          )}

          {threads.map((t: any) => (
            <Link key={t.id} href={`/forum/thread/${t.id}`}>
              <div className="p-6 rounded-xl bg-[#0e0f17] border border-purple-700/40 hover:scale-[1.02] transition shadow-lg">
                <h2 className="text-2xl font-bold">{t.title}</h2>
                <p className="opacity-60 mt-1">
                  {new Date(t.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* REPLIES */}
      {activeTab === "replies" && (
        <div className="space-y-6">
          {replies.length === 0 && (
            <p className="opacity-60">Du hast noch keine Antworten geschrieben.</p>
          )}

          {replies.map((r: any) => (
            <Link key={r.id} href={`/forum/thread/${r.threadId}`}>
              <div className="p-6 rounded-xl bg-[#0e0f17] border border-purple-700/40 hover:scale-[1.02] transition shadow-lg">
                <p className="opacity-80">{r.content.slice(0, 200)}...</p>

                <p className="opacity-50 text-sm mt-4">
                  {new Date(r.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* GALLERY */}
      {activeTab === "gallery" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {gallery.length === 0 && (
            <p className="opacity-60 col-span-full">
              Du hast noch keine Bilder/Videos hochgeladen.
            </p>
          )}

          {gallery.map((m: any) => (
            <Link key={m.id} href={`/gallery/${m.id}`}>
              <div className="rounded-xl overflow-hidden shadow-lg border border-purple-700/40 hover:scale-[1.03] transition">

                {m.type === "image" ? (
                  <img src={m.url} className="w-full h-48 object-cover" />
                ) : (
                  <video src={m.url} className="w-full h-48 object-cover" />
                )}

                <div className="px-4 py-3 bg-[#0e0f17] border-t border-purple-700/40">
                  <p className="opacity-70 text-sm">
                    {new Date(m.createdAt).toLocaleDateString("de-DE")}
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}
