import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { systemLog } from "@/lib/systemLogger";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);
    const { message } = await req.json();

    const cookies = req.headers.get("cookie") || "";
    const authorId = cookies
      .split(";")
      .find((c) => c.trim().startsWith("userId="))
      ?.split("=")[1];

    if (!authorId)
      return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

    const msg = await prisma.ticketMessage.create({
      data: {
        ticketId,
        authorId: Number(authorId),
        message,
      },
    });

    await prisma.ticketLog.create({
      data: {
        ticketId,
        action: `Nachricht von User ${authorId}`,
      },
    });

    await systemLog("Ticket Nachricht", { ticketId }, authorId);

    return NextResponse.json({ success: true, msg });
  } catch (error) {
    return handleApiError("/api/tickets/[id]/message", "POST", error);
  }
}
