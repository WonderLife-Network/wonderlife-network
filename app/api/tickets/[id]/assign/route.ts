import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { systemLog } from "@/lib/systemLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);
    const { staffId } = await req.json();

    if (!staffId)
      return NextResponse.json(
        { error: "staffId fehlt" },
        { status: 400 }
      );

    const cookies = req.headers.get("cookie") || "";
    const authorId = cookies
      .split(";")
      .find((c) => c.trim().startsWith("userId="))
      ?.split("=")[1];

    if (!authorId)
      return NextResponse.json(
        { error: "Keine Berechtigung" },
        { status: 403 }
      );

    // Update in Database
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { assignedTo: Number(staffId) },
    });

    // TicketLog
    await prisma.ticketLog.create({
      data: {
        ticketId,
        action: `Ticket zugewiesen an Staff ${staffId} durch ${authorId}`,
      },
    });

    // Moderations-Log
    await modLog(authorId, staffId, "TICKET_ASSIGN");

    // SystemLog
    await systemLog(
      "Ticket Zuweisung",
      { ticketId, assignedTo: staffId },
      authorId
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(
      "/api/tickets/[id]/assign",
      "POST",
      error
    );
  }
}
