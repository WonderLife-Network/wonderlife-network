import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { id, role } = await req.json();

  if (role !== "ADMIN" && role !== "OWNER" && role !== "SUPPORT") {
    return NextResponse.json({ error: "Keine Berechtigung" });
  }

  await prisma.forumReply.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ success: true });
}
