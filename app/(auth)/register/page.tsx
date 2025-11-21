"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, pass })
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        window.location.href = "/login";
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#08090F]">
            
            <form 
                onSubmit={handleRegister}
                className="w-full max-w-md bg-[#0b0d13] p-8 rounded-xl border border-purple-700/40 shadow-xl"
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-glow">
                    Registrieren
                </h1>

                <input 
                    type="email" 
                    placeholder="E-Mail"
                    className="w-full p-3 rounded-lg bg-[#131620] border border-purple-700/30 mb-4"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />

                <input 
                    type="text" 
                    placeholder="Benutzername"
                    className="w-full p-3 rounded-lg bg-[#131620] border border-purple-700/30 mb-4"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                />

                <input 
                    type="password" 
                    placeholder="Passwort"
                    className="w-full p-3 rounded-lg bg-[#131620] border border-purple-700/30 mb-4"
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}
                    required
                />

                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-800 p-3 rounded-lg font-semibold mt-2 shadow-lg shadow-blue-500/30"
                >
                    Account erstellen
                </button>

                <p className="text-center text-sm mt-4 opacity-70">
                    Bereits registriert?{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-200">Login</Link>
                </p>
            </form>
        </div>
    );
}
