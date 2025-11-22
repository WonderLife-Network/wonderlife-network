"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <p className="text-white text-center mt-20 opacity-50">
        Profil wird geladen…
      </p>
    );

  // Discord Avatar oder WonderLife Logo
  const avatarUrl = user.discordAvatar
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
    : "/avatars/wonderlife.png";

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">Mein Profil</h1>

      <div className="bg-[#0d0f18] border border-purple-700/40 rounded-xl p-10 shadow-lg">

        {/* AVATAR */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src={avatarUrl}
            className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-xl object-cover bg-black"
          />

          <div>
            <h2 className="text-3xl font-bold">{user.username}</h2>

            {/* Rollen Badge */}
            <div className="mt-3">
              {user.role === "USER" && (
                <span className="px-3 py-1 bg-gray-700 text-sm rounded-lg">USER</span>
              )}
              {user.role === "SUPPORT" && (
                <span className="px-3 py-1 bg-blue-700 text-sm rounded-lg">SUPPORT</span>
              )}
              {user.role === "ADMIN" && (
                <span className="px-3 py-1 bg-red-700 text-sm rounded-lg">ADMIN</span>
              )}
              {user.role === "OWNER" && (
                <span className="px-3 py-1 bg-purple-700 text-sm rounded-lg">OWNER</span>
              )}
            </div>
          </div>
        </div>

        {/* PROFILFELDER */}
        <div className="space-y-8">

          {/* USERNAME */}
          <div>
            <label className="block mb-2 opacity-70">Benutzername</label>
            <input
              className="w-full bg-[#151822] border border-purple-700/40 rounded-lg px-4 py-3"
              type="text"
              defaultValue={user.username}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-2 opacity-70">Email</label>
            <input
              className="w-full bg-[#151822] border border-purple-700/40 rounded-lg px-4 py-3"
              type="email"
              defaultValue={user.email}
            />
          </div>

          {/* DISCORD LINK / UNLINK */}
          <div className="pt-4 border-t border-purple-800/20">
            <h3 className="text-xl font-bold mb-4">Discord Konto</h3>

            {user.discordId ? (
              <div className="flex items-center gap-4">
                <p className="opacity-70">
                  Verknüpft als: <span className="text-purple-400">{user.discordId}</span>
                </p>

                <Link
                  href="/api/auth/discord/unlink"
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-800"
                >
                  Trennen
                </Link>
              </div>
            ) : (
              <Link
                href="/api/auth/discord"
                className="px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/40"
              >
                Discord verbinden
              </Link>
            )}
          </div>

        </div>

        {/* SPEICHERN BUTTON */}
        <div className="mt-10">
          <button class
