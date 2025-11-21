"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ForumCategoryPage({ params }: any) {
  const [category, setCategory] = useState<any>(null);
  const [threads, setThreads] = useState([]);

  // Kategorie laden (Name, Beschreibung)
  useEffect(() => {
    fetch("/api/forum")
      .then(res => res.json())
      .then(data => {
        const found = data.find((c: any) => c.id === Number(params.id));
        setCategory(found || null);
      });
  }, [params.id]);

  // Threads laden
  useEffect(() => {
    fetch(`/api/forum/category/${params.id}`)
      .then(res => res.json())
      .then(data => setThreads(data));
  }, [params.id]);

  if (!category)
    return (
      <p className="text-white text-center mt-20 opacity-50">
        Kategorie wird geladen…
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-white">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-3 text-center">
        {category.name}
      </h1>
      {category.description && (
        <p className="text-center opacity-70 mb-8">{category.description}</p>
      )}

      {/* Button neues Thema */}
      <div className="flex justify-center mb-10">
        <Link href={`/forum/thread/create?category=${category.id}`}>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-800 rounded-lg shadow-lg shadow-purple-500/40">
            Neues Thema erstellen
          </button>
        </Link>
      </div>

      {/* Threads Liste */}
      <div className="space-y-6">
        {threads.length === 0 && (
          <div className="text-center opacity-60 py-10">
            Noch keine Themen vorhanden.
          </div>
        )}

        {threads.map((thread: any) => (
          <Link key={thread.id} href={`/forum/thread/${thread.id}`}>
            <div className="p-6 bg-[#0d0f18] border border-purple-800/40 rounded-xl hover:scale-[1.02] transition cursor-pointer shadow-lg hover:shadow-purple-500/30">
              <h2 className="text-2xl font-bold">{thread.title}</h2>

              <p className="opacity-60 line-clamp-2 mt-2">
                {thread.content.slice(0, 150)}…
              </p>

              <div className="flex justify-between mt-4 opacity-70 text-sm">
                <span>
                  {new Date(thread.createdAt).toLocaleDateString("de-DE")}
                </span>

                <span>{thread._count.replies} Antworten</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
