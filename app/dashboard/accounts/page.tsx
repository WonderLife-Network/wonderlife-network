"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <p className="text-white text-center mt-20 opacity-50">
        Konten werden geladen…
      </p>
    );

  const discordAvatar = user.discordAvatar
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
    : null;

  const discordBanner = user.discordBanner
    ? `https://cdn.discordapp.com/banners/${user.discordId}/${user.discordBanner}.png?size=600`
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">Verknüpfte Konten</h1>

      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg">

        <h2 className="text-2xl font-bold mb-6">Discord Konto</h2>

        {/* Wenn Discord verknüpft ist */}
        {user.discordId ? (
          <div className="space-y-6">

            {/* Banner */}
            {discordBanner && (
              <div
                className="h-40 w-full rounded-xl bg-cover bg-center shadow-lg border border-purple-700/40"
                style={{ backgroundImage: `url(${discordBanner})` }}
              />
            )}

            {/* Avatar + Info */}
            <div className="flex items-center gap-6">
              {discordAvatar ? (
                <img
                  src={discordAvatar}
                  className="w-24 h-24 rounded-full border-4 border-purple-600 shadow-xl"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-purple-600" />
              )}

              <div>
                <p className="text-xl font-bold">
                  Verbunden mit Discord-ID:
                </p>
                <p className="opacity-70">{user.discordId}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Link
                href="/api/auth/discord"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-800 rounded-lg shadow-lg shadow-blue-500/40"
              >
                Neu verbinden
              </Link>

              <Link
                href="/api/auth/discord/unlink"
                className="px-6 py-3 bg-red-600 hover:bg-red-800 rounded-lg shadow-lg shadow-red-500/40"
              >
                Verbindung trennen
              </Link>
            </div>

          </div>
        ) : (
          // Wenn Discord NICHT verknüpft ist
          <div className="text-center py-16">

            <p className="text-lg opacity-70 mb-6">
              Du hast noch kein Discord-Konto verknüpft.
            </p>

            <Link
              href="/api/auth/discord"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-800 rounded-lg shadow-lg shadow-purple-500/40 text-xl"
            >
              🔗 Mit Discord verbinden
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}
