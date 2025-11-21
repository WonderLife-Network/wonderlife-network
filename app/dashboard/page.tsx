"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <p className="text-white text-center mt-20 text-xl opacity-50">
        Dashboard wird geladen…
      </p>
    );

  return (
    <div className="flex min-h-screen text-white">

      {/* SIDEBAR – nur Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0e0f17] border-r border-purple-800/40 px-6 py-10 space-y-8">

        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-wide mb-2">WonderLife</h2>
          <p className="opacity-50 text-sm">User Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4 text-lg">
          <Link href="/dashboard" className="block hover:text-purple-400">
            🏠 Übersicht
          </Link>
          <Link href="/dashboard/profile" className="block hover:text-purple-400">
            👤 Mein Profil
          </Link>
          <Link href="/dashboard/accounts" className="block hover:text-purple-400">
            🔗 Verknüpfte Konten
          </Link>
          <Link href="/dashboard/content" className="block hover:text-purple-400">
            📄 Meine Inhalte
          </Link>
          <Link href="/dashboard/roles" className="block hover:text-purple-400">
            🛡 Rollen & Rechte
          </Link>
          <Link href="/dashboard/security" className="block hover:text-purple-400">
            🔒 Sicherheit
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-purple-800/40">
          <Link href="/auth/logout" className="block text-red-400 hover:text-red-300">
            🚪 Logout
          </Link>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP BAR – nur Mobile */}
        <div className="lg:hidden w-full px-4 py-4 bg-[#0e0f17] border-b border-purple-800/40 flex justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <Link href="/dashboard/profile">
            <img
              src={
                user.discordAvatar
                  ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
                  : "/default-avatar.png"
              }
              className="w-10 h-10 rounded-full border border-purple-500"
            />
          </Link>
        </div>

        {/* PAGE BODY */}
        <div className="px-6 py-10 max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center gap-6 mb-12">

            {/* AVATAR */}
            <img
              src={
                user.discordAvatar
                  ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
                  : "/default-avatar.png"
              }
              className="w-28 h-28 rounded-full border-4 border-purple-600 shadow-lg"
            />

            <div>
              <h1 className="text-4xl font-bold mb-2">{user.username}</h1>

              {/* ROLES */}
              <div className="flex flex-wrap gap-3 mt-2">

                {user.role === "USER" && (
                  <span className="px-3 py-1 rounded-lg bg-gray-700 text-sm">
                    USER
                  </span>
                )}

                {user.role === "SUPPORT" && (
                  <span className="px-3 py-1 rounded-lg bg-blue-700 text-sm">
                    SUPPORT
                  </span>
                )}

                {user.role === "ADMIN" && (
                  <span className="px-3 py-1 rounded-lg bg-red-700 text-sm">
                    ADMIN
                  </span>
                )}

                {user.role === "OWNER" && (
                  <span className="px-3 py-1 rounded-lg bg-purple-700 text-sm">
                    OWNER
                  </span>
                )}

              </div>
            </div>
          </div>

          {/* CONTENT SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* QUICK LINKS */}
            <div className="lg:col-span-1 p-6 rounded-xl bg-[#0e0f17] border border-purple-800/40 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Schnellzugriff</h2>
              <div className="space-y-3">

                <Link href="/dashboard/profile" className="block hover:text-purple-400">
                  👤 Profil bearbeiten
                </Link>

                <Link href="/dashboard/accounts" className="block hover:text-purple-400">
                  🔗 Discord verknüpfen
                </Link>

                <Link href="/forum" className="block hover:text-purple-400">
                  💬 Forum öffnen
                </Link>

                <Link href="/gallery" className="block hover:text-purple-400">
                  🖼 Galerie öffnen
                </Link>

              </div>
            </div>

            {/* ACTIVITY */}
            <div className="lg:col-span-2 p-6 rounded-xl bg-[#0e0f17] border border-purple-800/40 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Letzte Aktivitäten</h2>

              <p className="opacity-60">
                (Hier werden später Forum-Beiträge, Uploads, Logins, etc. angezeigt.)
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
