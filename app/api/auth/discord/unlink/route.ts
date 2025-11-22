import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: any) {
  const userId = req.cookies.get("userId")?.value;

  if (!userId) {
    return NextResponse.redirect("/dashboard/accounts");
  }

  await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      discordId: null,
      discordAvatar: null,
      discordBanner: null,
    },
  });

  return NextResponse.redirect("/dashboard/accounts");
}
