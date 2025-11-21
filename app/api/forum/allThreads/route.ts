import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const threads = await prisma.forumThread.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { replies: true } }
    }
  });

  return NextResponse.json(threads);
}
