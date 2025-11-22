import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { sessionId } = await req.json();
  const userId =  Number(req.headers.get("x-user-id"));

  await prisma.session.deleteMany({
    where: {
      id: Number(sessionId),
      userId
    }
  });

  return NextResponse.json({ success: true });
}
