"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.json())
      .then(data => setNews(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-white">
      <h1 className="text-5xl font-bold mb-12 text-center">Neuigkeiten</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {news.map((n: any) => (
          <Link key={n.id} href={`/news/${n.id}`}>
            <div className="bg-[#0d0f18] border border-purple-800/40 rounded-xl p-4 hover:scale-[1.02] transition shadow-lg hover:shadow-purple-500/40 cursor-pointer">
              
              {n.coverImage && (
                <Image
                  src={n.coverImage}
                  width={800}
                  height={400}
                  alt="Cover"
                  className="rounded-lg mb-4"
                />
              )}

              <h2 className="text-2xl font-bold">{n.title}</h2>
              <p className="opacity-70 mt-2 line-clamp-2">{n.content}</p>

              <p className="mt-3 text-purple-400 text-sm">
                {new Date(n.createdAt).toLocaleDateString("de-DE")}
              </p>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
