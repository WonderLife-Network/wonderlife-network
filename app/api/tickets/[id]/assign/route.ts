import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);
    const { staffId } = await req.json();

    const cookies = req.headers.get("cookie") || "";
    const authorId = cookies
      .split(";")
      .find((c) => c.trim().startsWith("userId="))
      ?.split("=")[1];

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { assignedTo: Number(staffId) },
    });

    await prisma.ticketLog.create({
      data: {
        ticketId,
        action: `Ticket zugewiesen an Staff ${staffId}`,
      },
    });

    await modLog(authorId, staffId, "TICKET_ASSIGN");

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError("/api/tickets/[id]/assign", "POST", error);
  }
}
