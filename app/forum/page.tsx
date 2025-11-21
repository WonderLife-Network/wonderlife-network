"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ForumHome() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/forum")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-white">
      <h1 className="text-5xl font-bold mb-10 text-center">
        WonderLife Forum
      </h1>

      <div className="space-y-6">
        {categories.map((cat: any) => (
          <Link key={cat.id} href={`/forum/category/${cat.id}`}>
            <div className="p-6 rounded-xl bg-[#0d0f18] border border-purple-800/40 hover:scale-[1.02] transition cursor-pointer">
              <h2 className="text-2xl font-bold">{cat.name}</h2>
              <p className="opacity-70">{cat.description}</p>
              <p className="mt-2 text-purple-400">
                {cat._count.threads} Themen
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
