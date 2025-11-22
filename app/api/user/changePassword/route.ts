import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { oldPassword, newPassword } = await req.json();

  const userId = Number(req.headers.get("x-user-id"));

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) return NextResponse.json({ error: "User existiert nicht." });

  const valid = await bcrypt.compare(oldPassword, user.password);

  if (!valid)
    return NextResponse.json({ error: "Altes Passwort ist falsch." });

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed }
  });

  return NextResponse.json({ success: true });
}
