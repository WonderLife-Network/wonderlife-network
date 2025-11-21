import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { id } = await req.json();

  await prisma.forumReply.deleteMany({
    where: { threadId: Number(id) }
  });

  await prisma.forumThread.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ success: true });
}
