import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  const { message } = await req.json();
  const userId = Number(req.headers.get("x-user-id"));

  const msg = await prisma.ticketMessage.create({
    data: {
      ticketId: Number(params.id),
      authorId: userId,
      message,
    },
  });

  return NextResponse.json({ success: true, message: msg });
}
