import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: any) {
  const query = req.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (!query) return NextResponse.json([]);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { discordId: { contains: query } },
        { id: Number(query) || -1 }
      ]
    },
    select: {
      id: true,
      username: true,
      email: true,
      discordId: true
    }
  });

  return NextResponse.json(users);
}
