import prisma from "@/lib/prisma";

export default async function GalleryMediaPage({ params }: any) {
    const media = await prisma.galleryMedia.findUnique({
        where: { id: Number(params.id) },
        include: { author: true }
    });

    if (!media) return <div>Media nicht gefunden.</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl font-bold text-glow mb-6">
                {media.title}
            </h1>

            {media.type === "image" && (
                <img 
                    src={media.url}
                    className="rounded-xl shadow-xl mx-auto mb-8"
                />
            )}

            {media.type === "video" && (
                <video 
                    src={media.url}
                    controls
                    autoPlay
                    className="rounded-xl shadow-xl mx-auto mb-8"
                    style={{ maxWidth: "100%" }}
                />
            )}

            <p className="opacity-60 text-sm">
                Hochgeladen von {media.author.username}  
                am {new Date(media.createdAt).toLocaleString()}
            </p>
        </div>
    );
}
