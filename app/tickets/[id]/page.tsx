"use client";

import { useEffect, useState } from "react";

export default function TicketDetail({ params }) {
  const ticketId = params.id;

  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [ticketLogs, setTicketLogs] = useState<any[]>([]);
  const [uploads, setUploads] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<any[]>([]);

  // TICKET LADEN
  async function loadTicket() {
    const res = await fetch(`/api/tickets/${ticketId}/details`);
    const data = await res.json();
    setTicket(data.ticket);
    setMessages(data.ticket?.messages || []);
    setLoading(false);
  }

  // TEAM LADEN
  async function loadTeam() {
    const res = await fetch("/api/team/list");
    const data = await res.json();
    setTeam(data.team);
  }

  // LOGS LADEN
  async function loadLogs() {
    const res = await fetch(`/api/tickets/${ticketId}/logs`);
    const data = await res.json();
    setTicketLogs(data.logs);
  }

  // UPLOADS LADEN
  async function loadUploads() {
    const res = await fetch(`/api/tickets/${ticketId}/uploads`);
    const data = await res.json();
    setUploads(data.uploads);
  }

  useEffect(() => {
    loadTicket();
    loadTeam();
    loadLogs();
    loadUploads();
  }, []);

  // NACHRICHT SENDEN
  async function sendMessage() {
    if (!reply.trim()) return;

    const res = await fetch(`/api/tickets/${ticketId}/message`, {
      method: "POST",
      body: JSON.stringify({ message: reply }),
    });

    const data = await res.json();
    if (data.success) {
      setReply("");
      loadTicket();
      loadLogs();
    }
  }

  // TICKET SCHLIESSEN
  async function closeTicket() {
    const res = await fetch(`/api/tickets/${ticketId}/close`, {
      method: "POST",
    });

    const data = await res.json();
    if (data.success) {
      loadTicket();
      loadLogs();
    }
  }

  // PRIORITÄT ÄNDERN
  async function changePriority(newPriority: string) {
    const res = await fetch(`/api/tickets/${ticketId}/priority`, {
      method: "POST",
      body: JSON.stringify({ priority: newPriority }),
    });

    const data = await res.json();
    if (data.success) {
      loadTicket();
      loadLogs();
    }
  }

  // TICKET ZUWEISEN
  async function assignTicket(staffId: string) {
    const res = await fetch(`/api/tickets/${ticketId}/assign`, {
      method: "POST",
      body: JSON.stringify({ staffId }),
    });

    const data = await res.json();
    if (data.success) {
      loadTicket();
      loadLogs();
    }
  }

  // DATEI HOCHLADEN
  async function upload() {
    if (!uploadFile) return;

    const form = new FormData();
    form.append("file", uploadFile);

    const res = await fetch(`/api/tickets/${ticketId}/upload`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.success) {
      setUploadFile(null);
      loadUploads();
      loadLogs();
    }
  }

  if (loading) {
    return <div className="text-white p-10">Ticket wird geladen…</div>;
  }

  if (!ticket) {
    return <div className="text-white p-10">Ticket nicht gefunden.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">

      {/* BANNER */}
      <div className="w-full h-56 rounded-xl overflow-hidden border border-purple-600/30 mb-10 relative">
        <img
          src="/team/team-banner.png"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70 flex items-end px-8 pb-6">
          <h1 className="text-3xl font-bold">Ticket #{ticketId}</h1>
        </div>
      </div>

      {/* HEADER */}
      <div className="bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6 mb-10">
        <h2 className="text-3xl font-bold mb-3">{ticket.title}</h2>

        <div className="flex flex-wrap gap-4 text-sm opacity-75">
          <p><b>Kategorie:</b> {ticket.category}</p>
          <p>|</p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={
                ticket.status === "open" ? "text-green-400" : "text-red-400"
              }
            >
              {ticket.status}
            </span>
          </p>
          <p>|</p>
          <p><b>Priorität:</b> {ticket.priority}</p>
          <p>|</p>
          <p>
            <b>Erstellt:</b>{" "}
            {new Date(ticket.createdAt).toLocaleString("de-DE")}
          </p>
        </div>

        {ticket.status === "open" && (
          <button
            onClick={closeTicket}
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            Ticket schließen
          </button>
        )}
      </div>

      {/* PRIORITÄT ÄNDERN */}
      <div className="mt-10 bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-3">Priorität ändern</h3>

        <select
          className="w-full p-3 bg-black/40 border border-purple-700/40 rounded-lg"
          value={ticket.priority}
          onChange={(e) => changePriority(e.target.value)}
        >
          <option value="low">Niedrig</option>
          <option value="normal">Normal</option>
          <option value="high">Hoch</option>
        </select>
      </div>

      {/* TICKET ZUWEISEN */}
      <div className="mt-10 bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-3">Ticket zuweisen</h3>

        <select
          className="w-full p-3 bg-black/40 border border-purple-700/40 rounded-lg"
          value={ticket.assignedTo || ""}
          onChange={(e) => assignTicket(e.target.value)}
        >
          <option value="">Nicht zugewiesen</option>

          {team.map((t) => (
            <option key={t.id} value={t.id}>
              {t.username} (#{t.id})
            </option>
          ))}
        </select>
      </div>

      {/* DATEI-UPLOAD */}
      <div className="mt-10 bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Datei hochladen</h3>

        <input
          type="file"
          onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
          className="w-full p-3 rounded-lg bg-black/40 border border-purple-700/40"
        />

        <button
          onClick={upload}
          className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          Hochladen
        </button>
      </div>

      {/* GALERIE (3-Spalten Raster) */}
      <div className="mt-10 bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Dateien im Ticket</h3>

        {uploads.length === 0 ? (
          <p className="opacity-50">Noch keine Dateien hochgeladen.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {uploads.map((file) => (
              <div
                key={file.id}
                className="bg-[#141726] rounded-xl border border-purple-600/20 overflow-hidden shadow-lg"
              >
                {file.type === "image" ? (
                  <img
                    src={file.url}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <video
                    src={file.url}
                    controls
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-3 text-xs opacity-60">
                  {file.url.split("/").pop()}
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* NACHRICHTEN */}
      <div className="space-y-4 my-10">
        {messages.length === 0 ? (
          <p className="opacity-50">Keine Nachrichten vorhanden.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-[#141726] border border-purple-600/20 rounded-xl"
            >
              <p className="font-semibold mb-1">
                User #{m.authorId}
              </p>
              {m.message && <p className="opacity-90">{m.message}</p>}
              <p className="text-xs opacity-50 mt-2">
                {new Date(m.createdAt).toLocaleString("de-DE")}
              </p>
            </div>
          ))
        )}
      </div>

      {/* LOGS */}
      <div className="my-10 bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Ticket-Verlauf</h3>

        {ticketLogs.length === 0 ? (
          <p className="opacity-50">Keine Log-Einträge vorhanden.</p>
        ) : (
          <div className="space-y-4">
            {ticketLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-[#141726] border border-purple-600/20 rounded-lg"
              >
                <p className="font-semibold text-purple-300">
                  {log.action}
                </p>
                <p className="text-xs opacity-50 mt-1">
                  {new Date(log.createdAt).toLocaleString("de-DE")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ANTWORT */}
      {ticket.status === "open" && (
        <div className="bg-[#0d0f18] border border-purple-600/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Antworten</h3>

          <textarea
            rows={4}
            className="w-full p-3 rounded-lg bg-black/40 border border-purple-700/40"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            Abschicken
          </button>
        </div>
      )}
    </div>
  );
}
