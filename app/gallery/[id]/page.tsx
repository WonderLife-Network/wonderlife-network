import prisma from "@/lib/prisma";

export default async function GalleryImagePage({ params }) {
    const img = await prisma.galleryImage.findUnique({
        where: { id: Number(params.id) },
        include: { author: true }
    });

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl font-bold text-glow mb-6">
                {img?.title}
            </h1>

            <img 
                src={img?.url}
                className="rounded-xl shadow-2xl mx-auto mb-8"
            />

            <p className="opacity-60 text-sm">
                Hochgeladen von {img?.author.username}  
                am {new Date(img.createdAt).toLocaleString()}
            </p>
        </div>
    );
}
