"use client";

import { useState } from "react";

export default function CreateNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState<any>(null);

  async function submit(e: any) {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("category", category);
    if (cover) form.append("cover", cover);

    const res = await fetch("/api/news/create", {
      method: "POST",
      body: form
    });

    const data = await res.json();
    if (data.error) return alert(data.error);

    alert("News erstellt!");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">News erstellen</h1>

      <form onSubmit={submit} className="space-y-6">

        <input
          className="w-full p-3 rounded-lg bg-[#0d0f18] border border-purple-700/40"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full h-48 p-3 rounded-lg bg-[#0d0f18] border border-purple-700/40"
          placeholder="Inhalt"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          className="w-full p-3 rounded-lg bg-[#0d0f18] border border-purple-700/40"
          placeholder="Kategorie (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files?.[0] || null)}
          className="w-full p-3 rounded-lg bg-[#0d0f18] border border-purple-700/40"
        />

        <button className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-800 shadow-lg shadow-purple-500/40">
          Erstellen
        </button>

      </form>
    </div>
  );
}
