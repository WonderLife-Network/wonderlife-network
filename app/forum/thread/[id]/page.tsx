import prisma from "@/lib/prisma";

export default async function ThreadPage({ params }) {
    const thread = await prisma.forumThread.findUnique({
        where: { id: Number(params.id) },
        include: {
            author: true,
            replies: { include: { author: true } }
        }
    });

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">

            <h1 className="text-4xl font-bold text-glow mb-4">
                {thread?.title}
            </h1>

            <p className="opacity-70 mb-6">
                Erstellt von {thread?.author.username}  
                am {new Date(thread.createdAt).toLocaleString()}
            </p>

            <div className="p-6 bg-[#0d0f18] border border-purple-800/40 rounded-xl shadow-xl mb-10">
                {thread?.content}
            </div>

            <h2 className="text-2xl font-bold mb-4">Antworten</h2>

            <div className="space-y-4">
                {thread?.replies.map(rep => (
                    <div key={rep.id} className="p-4 bg-[#151822] rounded-lg border border-purple-700/20">
                        <p className="text-sm opacity-70 mb-2">
                            {rep.author.username} – {new Date(rep.createdAt).toLocaleString()}
                        </p>
                        <p>{rep.content}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
