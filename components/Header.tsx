"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full border-b border-purple-700/30 backdrop-blur-xl bg-[#05060a]/70 sticky top-0 z-50">
            
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logos/network.png" className="w-10 h-10" />
                    <span className="text-xl font-bold text-glow">WonderLife Network</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="hover:text-purple-400 transition">Startseite</Link>
                    <Link href="/forum" className="hover:text-purple-400 transition">Forum</Link>
                    <Link href="/gallery" className="hover:text-purple-400 transition">Galerie</Link>
                    <Link href="/projects" className="hover:text-purple-400 transition">Projekte</Link>
                    <Link href="/discord" className="hover:text-purple-400 transition">Discord</Link>
                    <Link href="/team" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-800 transition shadow-lg shadow-purple-500/30">
                        Team Bereich
                    </Link>
                    <Link href="/login" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition shadow-lg shadow-blue-500/30">
                        Login
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-3xl text-purple-300"
                >
                    {open ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Navigation */}
            {open && (
                <div className="md:hidden bg-[#08090f] border-t border-purple-700/30 px-6 py-4 space-y-4">
                    <Link href="/" className="block hover:text-purple-400">Startseite</Link>
                    <Link href="/forum" className="block hover:text-purple-400">Forum</Link>
                    <Link href="/gallery" className="block hover:text-purple-400">Galerie</Link>
                    <Link href="/projects" className="block hover:text-purple-400">Projekte</Link>
                    <Link href="/discord" className="block hover:text-purple-400">Discord</Link>
                    <Link href="/team" className="block px-4 py-2 bg-purple-600 rounded-lg shadow-purple-500/30 shadow-lg">
                        Team Bereich
                    </Link>
                    <Link href="/login" className="block px-4 py-2 bg-blue-600 rounded-lg shadow-blue-500/30 shadow-lg">
                        Login
                    </Link>
                </div>
            )}
        </header>
    );
}
