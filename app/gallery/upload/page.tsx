"use client";

import { useState } from "react";

export default function GalleryUploadPage() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    async function uploadHandler(e) {
        e.preventDefault();

        const res = await fetch("/api/gallery/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                url,
                authorId: 1  // später ersetzen mit: session.user.id
            })
        });

        const data = await res.json();
        alert("Bild erfolgreich hochgeladen!");
    }

    return (
        <div className="max-w-md mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-glow text-center mb-8">
                Bild hochladen
            </h1>

            <form 
                onSubmit={uploadHandler}
                className="p-6 bg-[#0c0e16] rounded-xl border border-purple-700/30"
            >
                <input
                    placeholder="Titel"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#141722] border border-purple-700/30 mb-4"
                    required
                />

                <input
                    placeholder="Bild-URL"
                    value={url}
                    onChange={(e)=>setUrl(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#141722] border border-purple-700/30 mb-4"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-800 p-3 rounded-lg shadow-lg shadow-purple-500/30"
                >
                    Hochladen
                </button>
            </form>
        </div>
    );
}
