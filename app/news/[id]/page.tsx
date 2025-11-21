"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function NewsArticle({ params }: any) {
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/news/${params.id}`)
      .then(res => res.json())
      .then(data => setNews(data));
  }, []);

  if (!news) return <p className="text-center text-white mt-20">Laden…</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">

      {news.coverImage && (
        <Image
          src={news.coverImage}
          width={1200}
          height={600}
          alt="Cover"
          className="rounded-xl mb-10 shadow-xl"
        />
      )}

      <h1 className="text-5xl font-bold mb-6">{news.title}</h1>

      <p className="opacity-70 mb-6">
        {new Date(news.createdAt).toLocaleDateString("de-DE")}
      </p>

      <div className="text-lg leading-relaxed">
        {news.content}
      </div>

    </div>
  );
}
