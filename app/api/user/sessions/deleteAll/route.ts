import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: any) {
  const userId = Number(req.cookies.get("userId")?.value);

  await prisma.session.deleteMany({
    where: { userId }
  });

  return NextResponse.json({ success: true });
}
