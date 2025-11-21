import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { content, threadId, authorId } = await req.json();

  if (!content)
    return NextResponse.json({ error: "Inhalt fehlt." });

  const reply = await prisma.forumReply.create({
    data: {
      content,
      threadId: Number(threadId),
      authorId: Number(authorId)
    }
  });

  return NextResponse.json({ success: true, reply });
}
