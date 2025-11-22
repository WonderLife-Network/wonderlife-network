"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TeamDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <p className="text-white text-center mt-20 opacity-50">
        Lade Team Dashboard…
      </p>
    );

  // Zugriff prüfen
  const allowedRoles = ["SUPPORT", "ADMIN", "OWNER"];
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="text-center text-white mt-24">
        <h1 className="text-3xl font-bold mb-4">⛔ Kein Zugang</h1>
        <p className="opacity-60">
          Dieser Bereich ist nur für das WonderLife Team.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* HEADER BANNER */}
      <div className="w-full h-64 mb-12 relative rounded-xl overflow-hidden border border-purple-700/40 shadow-lg">
        <Image
          src="/team/banner.png"
          alt="WonderLife Team Banner"
          fill
          className="object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 flex items-end p-8">
          <h1 className="text-4xl font-bold">WonderLife Team Dashboard</h1>
        </div>
      </div>

      {/* GRID – Team Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Tickets */}
        <Link
          href="/dashboard/team/tickets"
          className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 shadow-lg hover:scale-[1.03] transition block"
        >
          <h2 className="text-2xl font-bold mb-2">🎫 Tickets</h2>
          <p className="opacity-60">
            Öffne, bearbeite und verwalte Support Tickets.
          </p>
        </Link>

        {/* Support Tools */}
        <Link
          href="/dashboard/team/tools"
          className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 shadow-lg hover:scale-[1.03] transition block"
        >
          <h2 className="text-2xl font-bold mb-2">🛠 Support Tools</h2>
          <p className="opacity-60">
            Nutzerinformationen, Notizen & Schnellaktionen.
          </p>
        </Link>

        {/* Logs */}
        <Link
          href="/dashboard/team/logs"
          className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 shadow-lg hover:scale-[1.03] transition block"
        >
          <h2 className="text-2xl font-bold mb-2">📑 Logs</h2>
          <p className="opacity-60">
            System-, Moderations- und Team-Logs einsehen.
          </p>
        </Link>

        {/* Admin (nur ADMIN/OWNER) */}
        {(user.role === "ADMIN" || user.role === "OWNER") && (
          <Link
            href="/dashboard/team/admin"
            className="p-6 rounded-xl bg-[#0d0f18] border border-red-700/40 shadow-lg hover:scale-[1.03] transition block"
          >
            <h2 className="text-2xl font-bold mb-2">⚙️ Admin Bereich</h2>
            <p className="opacity-60">
              Benutzer, Rollen & Systemeinstellungen verwalten.
            </p>
          </Link>
        )}

        {/* Owner Panel */}
        {user.role === "OWNER" && (
          <Link
            href="/dashboard/team/owner"
            className="p-6 rounded-xl bg-[#0d0f18] border border-yellow-600/40 shadow-lg hover:scale-[1.03] transition block"
          >
            <h2 className="text-2xl font-bold mb-2">👑 Owner Panel</h2>
            <p className="opacity-60">
              Vollzugriff auf alle WonderLife Systeme & APIs.
            </p>
          </Link>
        )}

      </div>

    </div>
  );
}
