"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pass })
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        window.location.href = "/dashboard";
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#08090F]">
            
            <form 
                onSubmit={handleLogin}
                className="w-full max-w-md bg-[#0b0d13] p-8 rounded-xl border border-purple-700/40 shadow-xl"
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-glow">
                    Login
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
                    type="password" 
                    placeholder="Passwort"
                    className="w-full p-3 rounded-lg bg-[#131620] border border-purple-700/30 mb-4"
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}
                    required
                />

                <button 
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-800 p-3 rounded-lg font-semibold mt-2 shadow-lg shadow-purple-500/30"
                >
                    Einloggen
                </button>

                <p className="text-center text-sm mt-4 opacity-70">
                    Noch keinen Account?{" "}
                    <Link href="/register" className="text-purple-400 hover:text-purple-200">Registrieren</Link>
                </p>
            </form>
        </div>
    );
}
