import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const type = req.nextUrl.searchParams.get("type");

  let logs = [];

  if (type === "system") {
    logs = await prisma.log.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }

  if (type === "mod") {
    logs = await prisma.modLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }

  if (type === "api") {
    logs = await prisma.apiLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }

  if (type === "ticket") {
    logs = await prisma.ticketLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }

  return NextResponse.json({ logs });
}
