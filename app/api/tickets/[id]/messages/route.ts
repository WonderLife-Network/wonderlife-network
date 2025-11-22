import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  const messages = await prisma.ticketMessage.findMany({
    where: { ticketId: Number(params.id) },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json({ messages });
}
