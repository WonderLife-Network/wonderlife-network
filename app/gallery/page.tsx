"use client";

import { useState, useEffect } from "react";
import Lightbox from "@/components/Lightbox";

export default function GalleryPage() {
    const [mediaList, setMediaList] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch("/api/gallery/categories")
            .then(r=>r.json())
            .then(d=>setCategories(d));

        fetch("/api/gallery/list")
            .then(r=>r.json())
            .then(d=>setMediaList(d));
    }, []);

    async function loadByCategory(id: number | null) {
        setSelectedCategory(id);

        if (!id) {
            const all = await fetch("/api/gallery/list").then(r=>r.json());
            setMediaList(all);
            return;
        }

        const res = await fetch("/api/gallery/by-category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryId: id })
        });

        setMediaList(await res.json());
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl font-bold text-glow mb-12 text-center">
                WonderLife Galerie
            </h1>

            {/* Kategorien */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
                <button
                    onClick={()=>loadByCategory(null)}
                    className={`px-4 py-2 rounded-lg border ${
                        selectedCategory === null 
                        ? "bg-purple-600 border-purple-400" 
                        : "bg-[#11141d] border-purple-700/40"
                    }`}
                >
                    Alle
                </button>

                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={()=>loadByCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg border ${
                            selectedCategory === cat.id
                            ? "bg-purple-600 border-purple-400"
                            : "bg-[#11141d] border-purple-700/40"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Medien */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mediaList.map(item => (
                    <div
                        key={item.id}
                        className="group cursor-pointer"
                        onClick={() => setSelected(item)}
                    >
                        {item.type === "image" ? (
                            <img 
                                src={item.url}
                                className="rounded-xl shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300"
                            />
                        ) : (
                            <video
                                src={item.url}
                                className="rounded-xl shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300"
                                style={{ maxHeight: "300px" }}
                                muted
                            />
                        )}
                        
                        <p className="mt-2 text-sm opacity-70">{item.title}</p>
                    </div>
                ))}
            </div>

            <Lightbox media={selected} onClose={() => setSelected(null)} />
        </div>
    );
}
