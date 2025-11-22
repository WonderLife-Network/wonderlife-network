"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTicketPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technik");
  const [priority, setPriority] = useState("NORMAL");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submitTicket = async () => {
    setLoading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", category);
    form.append("priority", priority);
    if (file) form.append("file", file);

    const res = await fetch("/api/tickets/create", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/dashboard/team/tickets");
    } else {
      alert("Fehler: " + data.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">

      <h1 className="text-3xl font-bold mb-10">Neues Ticket erstellen</h1>

      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg">

        {/* Title */}
        <div className="mb-6">
          <label className="block mb-2 opacity-60">Titel</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-[#151822] border border-purple-700/40"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Kurze Zusammenfassung des Problems..."
          />
        </div>

        {/* Beschreibung */}
        <div className="mb-6">
          <label className="block mb-2 opacity-60">Beschreibung</label>
          <textarea
            rows={6}
            className="w-full px-4 py-3 rounded-lg bg-[#151822] border border-purple-700/40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beschreibe dein Problem so genau wie möglich..."
          ></textarea>
        </div>

        {/* Kategorie */}
        <div className="mb-6">
          <label className="block mb-2 opacity-60">Kategorie</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-[#151822] border border-purple-700/40"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Technik</option>
            <option>Gameplay</option>
            <option>Account</option>
            <option>Whitelist</option>
            <option>Bugmeldung</option>
            <option>Sonstiges</option>
          </select>
        </div>

        {/* Priorität */}
        <div className="mb-6">
          <label className="block mb-2 opacity-60">Priorität</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-[#151822] border border-purple-700/40"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Niedrig</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">Hoch</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block mb-2 opacity-60">Datei anhängen (optional)</label>
          <input
            type="file"
            className="w-full text-sm"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          onClick={submitTicket}
          className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/40"
        >
          {loading ? "Wird erstellt…" : "Ticket erstellen"}
        </button>

      </div>
    </div>
  );
}
