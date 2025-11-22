import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: any) {
  const userId = Number(req.cookies.get("userId")?.value);
  if (!userId) return NextResponse.json([]);

  const replies = await prisma.forumReply.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(replies);
}
