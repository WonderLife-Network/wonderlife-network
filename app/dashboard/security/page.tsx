"use client";

import { useEffect, useState } from "react";

export default function SecurityPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [pwOld, setPwOld] = useState("");
  const [pwNew, setPwNew] = useState("");

  useEffect(() => {
    fetch("/api/user/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  const deleteSession = async (id: number) => {
    await fetch("/api/user/sessions/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: id })
    });
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const deleteAll = async () => {
    await fetch("/api/user/sessions/deleteAll", {
      method: "POST"
    });
    setSessions([]);
  };

  const changePassword = async () => {
    const res = await fetch("/api/user/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: pwOld,
        newPassword: pwNew
      })
    });

    const data = await res.json();
    alert(data.success ? "Passwort geändert!" : data.error);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">Sicherheit & Sessions</h1>

      {/* AKTIVE SESSIONS */}
      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-6">Aktive Sessions</h2>

        {sessions.length === 0 ? (
          <p className="opacity-60">Keine aktiven Sessions.</p>
        ) : (
          <div className="space-y-6">
            {sessions.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between bg-[#151822] p-6 rounded-lg border border-purple-700/30 shadow-lg">
                
                <div>
                  <p className="font-bold">{s.userAgent}</p>
                  <p className="opacity-60 text-sm">
                    Letzte Aktivität:{" "}
                    {new Date(s.lastUsedAt).toLocaleString("de-DE")}
                  </p>
                  {s.ip && (
                    <p className="opacity-50 text-sm">IP: {s.ip}</p>
                  )}
                </div>

                <button
                  onClick={() => deleteSession(s.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded-lg"
                >
                  Entfernen
                </button>
              </div>
            ))}
          </div>
        )}

        {sessions.length > 1 && (
          <button
            onClick={deleteAll}
            className="mt-8 px-6 py-3 bg-red-700 hover:bg-red-900 rounded-lg"
          >
            Alle Sessions entfernen
          </button>
        )}
      </div>

      {/* PASSWORT ÄNDERN */}
      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Passwort ändern</h2>

        <div className="space-y-6">

          <div>
            <label className="opacity-60 text-sm">Altes Passwort</label>
            <input
              type="password"
              value={pwOld}
              onChange={(e) => setPwOld(e.target.value)}
              className="w-full px-4 py-3 bg-[#151822] border border-purple-700/30 rounded-lg"
            />
          </div>

          <div>
            <label className="opacity-60 text-sm">Neues Passwort</label>
            <input
              type="password"
              value={pwNew}
              onChange={(e) => setPwNew(e.target.value)}
              className="w-full px-4 py-3 bg-[#151822] border border-purple-700/30 rounded-lg"
            />
          </div>

          <button
            onClick={changePassword}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-800 rounded-lg shadow-lg shadow-purple-500/40"
          >
            Passwort speichern
          </button>

        </div>
      </div>

    </div>
  );
}
