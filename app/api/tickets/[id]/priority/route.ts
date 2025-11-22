import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { systemLog } from "@/lib/systemLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);
    const { priority } = await req.json();

    if (!priority)
      return NextResponse.json(
        { error: "priority fehlt" },
        { status: 400 }
      );

    const cookies = req.headers.get("cookie") || "";
    const staffId = cookies
      .split(";")
      .find((c) => c.trim().startsWith("userId="))
      ?.split("=")[1];

    if (!staffId)
      return NextResponse.json(
        { error: "Keine Berechtigung" },
        { status: 403 }
      );

    // Update der Priorität
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { priority },
    });

    // TicketLog
    await prisma.ticketLog.create({
      data: {
        ticketId,
        action: `Priorität geändert auf "${priority}" durch ${staffId}`,
      },
    });

    // ModLog
    await modLog(staffId, String(ticketId), "TICKET_PRIORITY", priority);

    // SystemLog
    await systemLog(
      "Ticket Priorität geändert",
      { ticketId, priority },
      staffId
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(
      "/api/tickets/[id]/priority",
      "POST",
      error
    );
  }
}
