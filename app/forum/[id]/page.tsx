import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CategoryPage({ params }) {
    const category = await prisma.forumCategory.findUnique({
        where: { id: Number(params.id) }
    });

    const threads = await prisma.forumThread.findMany({
        where: { categoryId: Number(params.id) },
        include: { author: true },
        orderBy: { id: "desc" }
    });

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">

            <h1 className="text-4xl font-bold text-glow mb-8">
                {category?.title}
            </h1>

            <div className="space-y-4">
                {threads.map(thread => (
                    <Link 
                        key={thread.id}
                        href={`/forum/thread/${thread.id}`}
                        className="block bg-[#0d0f18] p-5 rounded-xl border border-purple-800/30 hover:border-purple-500/60 transition"
                    >
                        <h2 className="text-xl font-semibold">{thread.title}</h2>
                        <p className="text-sm opacity-60">
                            Erstellt von {thread.author.username} · {new Date(thread.createdAt).toLocaleString()}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
