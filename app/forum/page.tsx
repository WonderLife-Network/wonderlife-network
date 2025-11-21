import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function ForumPage() {
    const categories = await prisma.forumCategory.findMany({
        orderBy: { id: "asc" }
    });

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-5xl font-bold text-glow text-center mb-12">
                WonderLife Forum
            </h1>

            <div className="space-y-6">
                {categories.map(cat => (
                    <Link
                        key={cat.id}
                        href={`/forum/${cat.id}`}
                        className="block p-6 rounded-xl bg-[#0d0f18] border border-purple-800/40 hover:border-purple-500 transition shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold">{cat.title}</h2>
                        <p className="opacity-70">{cat.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
