"use client";

import React from "react";

export default function Lightbox({ media, onClose }: any) {
    if (!media) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative max-w-5xl w-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white text-3xl hover:text-purple-400 transition"
                >
                    ✖
                </button>

                {/* Media Display */}
                {media.type === "image" && (
                    <img
                        src={media.url}
                        className="rounded-xl shadow-[0_0_25px_rgba(180,0,255,0.8)] max-h-[80vh] mx-auto"
                    />
                )}

                {media.type === "video" && (
                    <video
                        src={media.url}
                        controls
                        autoPlay
                        className="rounded-xl shadow-[0_0_25px_rgba(180,0,255,0.8)] max-h-[80vh] mx-auto"
                        style={{ maxWidth: "100%" }}
                    />
                )}
            </div>
        </div>
    );
}
