"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserDetailPage() {
  const { id } = useParams();

  const [user, setUser] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");

  // Nutzer laden
  useEffect(() => {
    fetch(`/api/tools/user/details?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setTickets(data.tickets);
        setNotes(data.notes);
        setHistory(data.history);
      });
  }, [id]);

  const addNote = async () => {
    if (!newNote.trim()) return;

    const res = await fetch("/api/tools/user/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: newNote }),
    });

    const data = await res.json();
    if (data.success) {
      setNotes((prev) => [...prev, data.note]);
      setNewNote("");
    }
  };

  if (!user)
    return (
      <p className="text-white text-center mt-20 opacity-50">Lade Daten…</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* BANNER */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-10 border border-purple-700/40 relative">
        <img
          src="/team/ticket-detail-banner.png"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 flex items-end px-8 pb-6">
          <h1 className="text-3xl font-bold">Benutzerprofil: {user.username}</h1>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* USER INFO */}
        <div className="bg-[#0e0f17] border border-purple-700/40 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Benutzerinformationen</h2>

          <p><span className="opacity-60">Username:</span> {user.username}</p>
          <p><span className="opacity-60">Email:</span> {user.email}</p>

          <p>
            <span className="opacity-60">Account erstellt:</span>{" "}
            {new Date(user.createdAt).toLocaleString("de-DE")}
          </p>

          {/* Rollen */}
          <div className="mt-5">
            <h3 className="text-lg font-bold mb-2">Rollen</h3>
            <ul className="space-y-2">
              {user.roles.map((r: any, i: number) => (
                <li
                  key={i}
                  className="px-3 py-1 bg-purple-700/30 rounded-lg border border-purple-700/40"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* DISCORD */}
          {user.discord && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Discord Profil</h3>
              <div className="flex items-center gap-4">
                <img
                  src={user.discord.avatar}
                  className="w-14 h-14 rounded-full border border-purple-500"
                />
                <div>
                  <p>{user.discord.username}</p>
                  <p className="opacity-60">{user.discord.id}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* NOTES */}
        <div className="bg-[#0e0f17] border border-purple-700/40 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Team-Notizen</h2>

          <div className="space-y-4 max-h-72 overflow-y-auto">
            {notes.map((note: any) => (
              <div
                key={note.id}
                className="p-3 bg-[#151822] rounded-lg border border-purple-700/40"
              >
                <p>{note.text}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(note.createdAt).toLocaleString("de-DE")}
                </p>
              </div>
            ))}

            {notes.length === 0 && (
              <p className="opacity-50">Noch keine Notizen</p>
            )}
          </div>

          {/* ADD NOTE */}
          <div className="mt-6">
            <textarea
              rows={3}
              placeholder="Neue Notiz schreiben…"
              className="w-full px-4 py-3 rounded-lg bg-[#151822] border border-purple-700/40"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            ></textarea>

            <button
              onClick={addNote}
              className="mt-3 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/40"
            >
              Notiz hinzufügen
            </button>
          </div>
        </div>

        {/* HISTORY */}
        <div className="bg-[#0e0f17] border border-purple-700/40 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Historie</h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {history.map((h: any) => (
              <div
                key={h.id}
                className="p-3 bg-[#151822] rounded-lg border border-purple-700/40"
              >
                <p>{h.text}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(h.createdAt).toLocaleString("de-DE")}
                </p>
              </div>
            ))}

            {history.length === 0 && (
              <p className="opacity-50">Keine Einträge vorhanden</p>
            )}
          </div>
        </div>
      </div>

      {/* USER TICKETS */}
      <div className="mt-14 bg-[#0e0f17] border border-purple-700/40 p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Tickets des Nutzers</h2>

        <div className="space-y-4">
          {tickets.map((t: any) => (
            <a
              key={t.id}
              href={`/dashboard/team/tickets/${t.id}`}
              className="block p-5 bg-[#151822] rounded-lg border border-purple-700/40 hover:scale-[1.02] transition shadow-lg"
            >
              <h3 className="text-lg font-bold">#{t.id} – {t.title}</h3>
              <p className="opacity-60">
                {new Date(t.createdAt).toLocaleString("de-DE")}
              </p>
              <p className="mt-1 opacity-70">Status: {t.status}</p>
            </a>
          ))}

          {tickets.length === 0 && (
            <p className="opacity-50">Keine Tickets zu diesem Nutzer.</p>
          )}
        </div>
      </div>
    </div>
  );
}
