import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function GalleryPage() {
    const media = await prisma.galleryMedia.findMany({
        orderBy: { id: "desc" }
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl font-bold text-glow mb-12 text-center">
                WonderLife Galerie
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {media.map(item => (
                    <Link
                        href={`/gallery/${item.id}`}
                        key={item.id}
                        className="block group"
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
                        
                        <p className="mt-2 text-sm opacity-70">
                            {item.title}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
