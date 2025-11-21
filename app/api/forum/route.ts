import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.forumCategory.findMany({
    include: {
      _count: {
        select: { threads: true }
      }
    },
    orderBy: { id: "asc" }
  });

  return NextResponse.json(categories);
}
