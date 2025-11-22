"use client";

import { useEffect, useState } from "react";

export default function RolesPage() {
  const [user, setUser] = useState<any>(null);
  const [discordRoles, setDiscordRoles] = useState<any[]>([]);

  useEffect(() => {
    // EIGENE DATEN LADEN
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => setUser(data));

    // DISCORD ROLLEN LADEN
    fetch("/api/user/discordRoles")
      .then((res) => res.json())
      .then((data) => setDiscordRoles(data));
  }, []);

  if (!user)
    return (
      <p className="text-white text-center mt-20 opacity-50">
        Rollen werden geladen…
      </p>
    );

  // WEBSITE ROLLEN TEXTE
  const websiteRoleLabels: any = {
    USER: "Standard Benutzer",
    SUPPORT: "Support Team",
    ADMIN: "Administrator",
    OWNER: "Server Inhaber",
  };

  // TEAM-BEREICHE BASIEREND AUF WEBSITE-ROLLE
  const accessibleAreas = {
    USER: ["Forum", "Galerie", "Profil"],
    SUPPORT: ["Forum", "Galerie", "Support Dashboard", "Tickets"],
    ADMIN: ["Forum", "Galerie", "Admin Panel", "Server Logs", "Tickets"],
    OWNER: ["Alle Bereiche", "System Einstellungen", "Team Verwaltung"],
  };

  // RECHTE BASIEREND AUF WEBSITE-ROLLE
  const permissions = {
    USER: ["Kann Forum nutzen", "Kann Galerie nutzen"],
    SUPPORT: [
      "Kann Tickets sehen",
      "Kann Support Tools nutzen",
      "Kann Team Logs sehen",
    ],
    ADMIN: [
      "Kann Benutzer verwalten",
      "Kann Logs sehen",
      "Kann Support & Admin Tools nutzen",
      "Kann Server-Funktionen nutzen",
    ],
    OWNER: [
      "Voller Zugriff",
      "Kann Team verwalten",
      "Kann System Einstellungen ändern",
      "Über alle Admin-Bereiche",
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">Rollen & Rechte</h1>

      {/* WEBSITE ROLLE */}
      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">Deine Website Rolle</h2>

        <p className="text-xl font-bold text-purple-300 mb-2">{user.role}</p>
        <p className="opacity-60">{websiteRoleLabels[user.role]}</p>
      </div>

      {/* DISCORD ROLLEN */}
      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-6">Deine Discord Rollen</h2>

        {discordRoles.length === 0 && (
          <p className="opacity-60">Du hast keine Discord Rollen oder Discord ist nicht verbunden.</p>
        )}

        <div className="flex flex-wrap gap-3">
          {discordRoles.map((role) => (
            <span
              key={role.id}
              className="px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
              style={{
                backgroundColor: role.color ? `#${role.color.toString(16)}` : "#2a2a3b",
              }}
            >
              {role.name}
            </span>
          ))}
        </div>
      </div>

      {/* TEAM BEREICHE */}
      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-6">Zugängliche Bereiche</h2>

        <ul className="list-disc ml-6 space-y-3">
          {accessibleAreas[user.role].map((area: string, index: number) => (
            <li key={index} className="opacity-80">
              {area}
            </li>
          ))}
        </ul>
      </div>

      {/* RECHTE */}
      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Deine Rechte</h2>

        <ul className="list-disc ml-6 space-y-3">
          {permissions[user.role].map((perm: string, index: number) => (
            <li key={index} className="opacity-80">
              {perm}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
