import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: any) {
  const id = Number(params.id);

  const thread = await prisma.forumThread.findUnique({
    where: { id },
    include: {
      replies: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  return NextResponse.json(thread);
}
