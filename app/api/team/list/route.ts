import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const team = await prisma.user.findMany({
    where: {
      role: {
        in: ["ADMIN", "MOD", "SUPPORT"]
      }
    },
    select: {
      id: true,
      username: true,
      role: true
    }
  });

  return NextResponse.json({ team });
}
