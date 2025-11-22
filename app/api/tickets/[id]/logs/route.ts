import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/apiError";

export async function GET(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);

    const logs = await prisma.ticketLog.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" }
    });

    return NextResponse.json({ logs });
  } catch (error) {
    return handleApiError("/api/tickets/[id]/logs", "GET", error);
  }
}
