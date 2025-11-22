import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { id, text } = await req.json();

  const entry = await prisma.userHistory.create({
    data: {
      userId: Number(id),
      text
    }
  });

  return NextResponse.json({ success: true, entry });
}
