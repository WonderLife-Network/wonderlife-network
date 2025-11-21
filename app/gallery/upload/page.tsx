"use client";

import { useState } from "react";

export default function GalleryUploadPage() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    async function uploadHandler(e) {
        e.preventDefault();

        const form = new FormData();
        form.append("title", title);
        form.append("authorId", "1"); // später session.user.id
        form.append("file", file);

        const res = await fetch("/api/gallery/upload", {
            method: "POST",
            body: form
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        alert("Bild erfolgreich hochgeladen!");
        window.location.href = "/gallery";
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
                    type="file"
                    onChange={(e)=>setFile(e.target.files[0])}
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
