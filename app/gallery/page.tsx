"use client";

import { useState, useEffect } from "react";
import Lightbox from "@/components/Lightbox";

export default function GalleryPage() {
    const [mediaList, setMediaList] = useState<any[]>([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch("/api/gallery/list")
            .then(res => res.json())
            .then(data => setMediaList(data));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl font-bold text-glow mb-12 text-center">
                WonderLife Galerie
            </h1>

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
