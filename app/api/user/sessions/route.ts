import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: any) {
  const userId = Number(req.cookies.get("userId")?.value);

  if (!userId) return NextResponse.json([]);

  const sessions = await prisma.session.findMany({
    where: { userId },
    orderBy: { lastUsedAt: "desc" }
  });

  return NextResponse.json(sessions);
}
