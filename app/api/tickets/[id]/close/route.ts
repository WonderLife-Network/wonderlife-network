import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);

    const cookies = req.headers.get("cookie") || "";
    const staffId = cookies
      .split(";")
      .find((c) => c.trim().startsWith("userId="))
      ?.split("=")[1];

    if (!staffId)
      return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: "closed" },
    });

    await prisma.ticketLog.create({
      data: {
        ticketId,
        action: `Ticket geschlossen von ${staffId}`,
      },
    });

    await modLog(staffId, ticketId.toString(), "TICKET_CLOSE");

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError("/api/tickets/[id]/close", "POST", error);
  }
}
