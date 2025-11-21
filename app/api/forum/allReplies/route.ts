import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const replies = await prisma.forumReply.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      thread: {
        include: {
          category: true
        }
      }
    }
  });

  return NextResponse.json(replies);
}
