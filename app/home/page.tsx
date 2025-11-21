"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [gallery, setGallery] = useState([]);
  const [forum, setForum] = useState([]);
  const [news, setNews] = useState([]);
  const [team, setTeam] = useState([]);

  // Daten laden (News, Forum, Galerie, Team)
  useEffect(() => {
    loadGallery();
    loadNews();
    loadForum();
    loadTeam();
  }, []);

  async function loadGallery() {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGallery(data.slice(0, 6));
    } catch {}
  }

  async function loadNews() {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data.slice(0, 3));
    } catch {}
  }

  async function loadForum() {
    try {
      const res = await fetch("/api/forum");
      const data = await res.json();
      setForum(data.slice(0, 4));
    } catch {}
  }

  async function loadTeam() {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setTeam(data);
    } catch {}
  }

  return (
    <div className="text-white">

      {/* HERO / HEADER */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/home/hero.png"
          alt="WonderLife Hero"
          fill
          className="object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-[0_0_15px_rgba(255,0,255,0.6)]">
            WonderLife Network
          </h1>

          <p className="text-xl opacity-80 max-w-2xl mb-8">
            One Vision. One Community. Infinite Stories.
          </p>

          <div className="flex gap-4">
            <Link href="/auth/login">
              <button className="px-8 py-3 bg-purple-600 hover:bg-purple-800 rounded-xl shadow-lg shadow-purple-500/40">
                Login
              </button>
            </Link>

            <Link href="/network">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-800 rounded-xl shadow-lg shadow-blue-500/40">
                Netzwerk ansehen
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* PROJEKTE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Unsere Projekte</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "WonderLife City", img: "/covers/city.png", link: "/city" },
            { title: "WonderLife FM", img: "/covers/fm.png", link: "/fm" },
            { title: "WonderLife Studios", img: "/covers/studios.png", link: "/studios" },
            { title: "WonderLife Logs", img: "/covers/logs.png", link: "/logs" },
            { title: "WonderLife City Routes", img: "/covers/routes.png", link: "/routes" },
            { title: "WonderLife Development", img: "/covers/dev.png", link: "/development" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
            >
              <div className="bg-[#0d0f18] border border-purple-800/40 rounded-xl p-4 hover:scale-[1.03] transition cursor-pointer shadow-lg hover:shadow-purple-500/30">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={340}
                  className="rounded-lg"
                />
                <h3 className="text-xl font-bold mt-4">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DISCORD SERVER */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Unsere Discord Server
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "WonderLife Network", icon: "/discord.png", id: "1438177248678121615" },
            { title: "WonderLife City", icon: "/discord.png", id: "1329371549035135037" },
            { title: "WonderLife Studios", icon: "/discord.png", id: "1438324009929543694" },
            { title: "WonderLife FM", icon: "/discord.png", id: "1438326396677263463" },
            { title: "WonderLife Logs", icon: "/discord.png", id: "1438574264126144595" },
            { title: "WonderLife Routes", icon: "/discord.png", id: "1438476402277220364" },
          ].map((d, i) => (
            <div
              key={i}
              className="p-5 bg-[#0d0f18] border border-purple-800/40 rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4">
                <Image src={d.icon} width={48} height={48} alt="icon" />
                <div>
                  <h3 className="text-xl font-bold">{d.title}</h3>
                  <p className="text-sm opacity-60">{d.id}</p>
                </div>
              </div>

              <Link href={`https://discord.gg/${d.id}`}>
                <button className="mt-4 w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-md shadow-purple-500/30">
                  Beitreten
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Neuigkeiten</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {news.map((n: any, i) => (
            <div key={i} className="bg-[#0d0f18] p-5 rounded-xl border border-purple-800/30">
              <h3 className="text-xl font-bold">{n.title}</h3>
              <p className="opacity-70 mt-2">{n.description}</p>
              <Link href={`/news/${n.id}`}>
                <button className="mt-3 text-purple-400 hover:text-purple-200">
                  Weiterlesen →
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-black/40 text-center opacity-80">
        <p>Made with ♥ by WonderLife Development</p>
      </footer>
    </div>
  );
}
