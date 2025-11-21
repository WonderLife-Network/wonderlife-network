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
