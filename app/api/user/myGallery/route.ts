import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: any) {
  const userId = Number(req.cookies.get("userId")?.value);
  if (!userId) return NextResponse.json([]);

  const media = await prisma.galleryMedia.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(media);
}
