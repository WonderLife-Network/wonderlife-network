"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Ticket + Messages laden
  useEffect(() => {
    fetch(`/api/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => setTicket(data.ticket));

    fetch(`/api/tickets/${id}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  }, [id]);

  // Chat nach unten scrollen
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Chat senden
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const res = await fetch(`/api/tickets/${id}/messages/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage }),
    });

    const data = await res.json();

    if (data.success) {
      setMessages((prev) => [...prev, data.message]);
      setNewMessage("");
    }
  };

  // Ticket Status ändern
  const updateStatus = async (status: string) => {
    await fetch(`/api/tickets/${id}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setTicket({ ...ticket, status });
  };

  // Priorität setzen
  const updatePriority = async (priority: string) => {
    await fetch(`/api/tickets/${id}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority }),
    });

    setTicket({ ...ticket, priority });
  };

  if (!ticket)
    return (
      <p className="text-white text-center mt-20 opacity-50">
        Ticket wird geladen…
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* BANNER */}
      <div className="w-full h-40 rounded-xl overflow-hidden mb-10 border border-purple-700/40 relative">
        <img
          src="/team/ticket-detail-banner.png"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 flex items-end px-6 pb-5">
          <h1 className="text-3xl font-bold">Ticket #{ticket.id}</h1>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* TICKET INFO */}
        <div className="lg:col-span-1 p-6 bg-[#0e0f17] border border-purple-700/40 rounded-xl shadow-lg">

          <h2 className="text-xl font-bold mb-4">Ticket Info</h2>

          <p><span className="opacity-60">Titel:</span> {ticket.title}</p>
          <p><span className="opacity-60">Kategorie:</span> {ticket.category}</p>
          <p><span className="opacity-60">Erstellt:</span> {new Date(ticket.createdAt).toLocaleString("de-DE")}</p>

          {ticket.fileUrl && (
            <p className="mt-3">
              📎 <a href={ticket.fileUrl} className="text-purple-400" target="_blank">Anhang öffnen</a>
            </p>
          )}

          {/* PRIORITÄT */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Priorität</h3>

            <select
              className="bg-[#151822] rounded-lg px-4 py-2 border border-purple-700/40"
              value={ticket.priority}
              onChange={(e) => updatePriority(e.target.value)}
            >
              <option value="LOW">Niedrig</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">Hoch</option>
            </select>
          </div>

          {/* STATUS */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Status</h3>

            <select
              className="bg-[#151822] rounded-lg px-4 py-2 border border-purple-700/40"
              value={ticket.status}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="OPEN">Offen</option>
              <option value="IN_PROGRESS">In Bearbeitung</option>
              <option value="CLOSED">Geschlossen</option>
            </select>
          </div>

        </div>

        {/* CHAT */}
        <div className="lg:col-span-2 p-6 bg-[#0e0f17] border border-purple-700/40 rounded-xl shadow-lg flex flex-col">

          <h2 className="text-xl font-bold mb-4">Ticket Chat</h2>

          {/* CHAT VERLAUF */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 mb-6 bg-[#151822] rounded-lg border border-purple-700/40"
          >
            {messages.map((msg: any) => (
              <div
                key={msg.id}
                className={`mb-4 p-3 rounded-xl max-w-[75%] ${
                  msg.isTeam
                    ? "bg-purple-700 self-end text-right"
                    : "bg-blue-700 self-start"
                }`}
              >
                <p className="whitespace-pre-line">{msg.message}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString("de-DE")}
                </p>
              </div>
            ))}
          </div>

          {/* CHAT EINGABE */}
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 bg-[#151822] border border-purple-700/40 rounded-lg"
              placeholder="Nachricht schreiben…"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-800 rounded-lg shadow-lg shadow-purple-500/40"
            >
              Senden
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
