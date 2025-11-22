import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ ticket });
}
