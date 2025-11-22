import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: any) {
  const userId = Number(req.cookies.get("userId")?.value);

  if (!userId) return NextResponse.json([]);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.discordId) return NextResponse.json([]);

  // Rollen aus der DB laden
  const roles = await prisma.discordRole.findMany({
    where: {
      users: {
        some: { discordId: user.discordId }
      }
    }
  });

  return NextResponse.json(roles);
}
