"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CreateThreadPage() {
  const params = useSearchParams();
  const defaultCategory = Number(params.get("category")) || null;

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(defaultCategory);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/forum")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  async function submit(e: any) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Titel und Inhalt sind erforderlich.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/forum/thread/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        categoryId,
        authorId: 1 // später session.user.id
      })
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) return alert(data.error);

    window.location.href = `/forum/thread/${data.thread.id}`;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">
      
      <h1 className="text-4xl font-bold mb-10">
        Neues Thema erstellen
      </h1>

      <form onSubmit={submit} className="space-y-6">

        {/* Kategorie */}
        <div>
          <label className="block mb-2 opacity-80">Kategorie</label>
          <select
            value={categoryId || ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full bg-[#0d0f18] border border-purple-700/40 p-3 rounded-xl"
            required
          >
            <option value="" disabled>Bitte auswählen…</option>

            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Titel */}
        <div>
          <label className="block mb-2 opacity-80">Titel</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titel eingeben…"
            className="w-full bg-[#0d0f18] border border-purple-700/40 p-3 rounded-xl"
            required
          />
        </div>

        {/* Inhalt */}
        <div>
          <label className="block mb-2 opacity-80">Inhalt</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Text eingeben…"
            className="w-full bg-[#0d0f18] border border-purple-700/40 p-4 rounded-xl h-56 resize-none"
            required
          />
        </div>

        {/* Senden */}
        <button
          disabled={loading}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-800 rounded-lg shadow-lg shadow-purple-500/40 disabled:opacity-50"
        >
          {loading ? "Wird erstellt…" : "Thema erstellen"}
        </button>
      </form>
    </div>
  );
}
