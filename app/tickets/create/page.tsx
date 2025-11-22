"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTicket() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Support");
  const [priority, setPriority] = useState("normal");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitTicket() {
    setLoading(true);

    const res = await fetch("/api/tickets/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        priority,
        message,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) router.push(`/tickets/${data.ticket.id}`);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-white">
      
      <h1 className="text-3xl font-bold mb-8">Neues Ticket erstellen</h1>

      <div className="space-y-6 bg-[#0d0f18] p-6 rounded-xl border border-purple-600/30">

        {/* Titel */}
        <div>
          <label className="block font-semibold mb-2">Titel</label>
          <input
            className="w-full p-3 rounded-lg bg-black/40 border border-purple-700/40"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Kategorie */}
        <div>
          <label className="block font-semibold mb-2">Kategorie</label>
          <select
            className="w-full p-3 rounded-lg bg-black/40 border border-purple-700/40"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Support</option>
            <option>Entbannung</option>
            <option>Technik</option>
            <option>Bug Report</option>
            <option>Fragen</option>
            <option>Roleplay</option>
          </select>
        </div>

        {/* Priorität */}
        <div>
          <label className="block font-semibold mb-2">Priorität</label>
          <select
            className="w-full p-3 rounded-lg bg-black/40 border border-purple-700/40"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Niedrig</option>
            <option value="normal">Normal</option>
            <option value="high">Hoch</option>
          </select>
        </div>

        {/* Nachricht */}
        <div>
          <label className="block font-semibold mb-2">Nachricht</label>
          <textarea
            rows={5}
            className="w-full p-3 rounded-lg bg-black/40 border border-purple-700/40"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          onClick={submitTicket}
          disabled={loading}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          {loading ? "Erstelle Ticket…" : "Ticket erstellen"}
        </button>
      </div>
    </div>
  );
}
