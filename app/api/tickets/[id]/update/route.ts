import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  const data = await req.json();

  await prisma.ticket.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json({ success: true });
}
