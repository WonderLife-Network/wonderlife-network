import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: any) {
  const categoryId = Number(params.id);

  const threads = await prisma.forumThread.findMany({
    where: { categoryId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { replies: true } }
    }
  });

  return NextResponse.json(threads);
}
