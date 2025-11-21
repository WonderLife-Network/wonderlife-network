import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, content, categoryId, authorId } = await req.json();

  if (!title || !content)
    return NextResponse.json({ error: "Titel und Inhalt erforderlich." });

  const thread = await prisma.forumThread.create({
    data: {
      title,
      content,
      categoryId: Number(categoryId),
      authorId: Number(authorId)
    }
  });

  return NextResponse.json({ success: true, thread });
}
