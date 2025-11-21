"use client";

import Link from "next/link";

export default function ForumAdminHome() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">
      
      <h1 className="text-4xl font-bold mb-10 text-center">
        Forum Administration
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Kategorien */}
        <Link href="/admin/forum/categories">
          <div className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 hover:scale-[1.02] transition cursor-pointer shadow-lg hover:shadow-purple-500/40">
            <h2 className="text-2xl font-bold mb-2">Kategorien verwalten</h2>
            <p className="opacity-70">Erstellen, bearbeiten oder löschen.</p>
          </div>
        </Link>

        {/* Threads */}
        <Link href="/admin/forum/threads">
          <div className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 hover:scale-[1.02] transition cursor-pointer shadow-lg hover:shadow-purple-500/40">
            <h2 className="text-2xl font-bold mb-2">Threads verwalten</h2>
            <p className="opacity-70">Themen löschen oder verschieben.</p>
          </div>
        </Link>

        {/* Antworten */}
        <Link href="/admin/forum/replies">
          <div className="p-6 rounded-xl bg-[#0d0f18] border border-purple-700/40 hover:scale-[1.02] transition cursor-pointer shadow-lg hover:shadow-purple-500/40">
            <h2 className="text-2xl font-bold mb-2">Antworten verwalten</h2>
            <p className="opacity-70">Einzelne Antworten löschen.</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
