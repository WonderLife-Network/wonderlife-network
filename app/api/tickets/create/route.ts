import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { systemLog } from "@/lib/systemLogger";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request) {
  try {
    const { title, category, message, priority } = await req.json();

    const cookies = req.headers.get("cookie") || "";
    const authorId = cookies
      .split(";")
      .find((c) => c.trim().startsWith("userId="))
      ?.split("=")[1];

    if (!authorId)
      return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

    const ticket = await prisma.ticket.create({
      data: {
        title,
        category,
        priority: priority || "normal",
        authorId: Number(authorId),
      },
    });

    if (message) {
      await prisma.ticketMessage.create({
        data: {
          ticketId: ticket.id,
          authorId: Number(authorId),
          message,
        },
      });
    }

    await prisma.ticketLog.create({
      data: {
        ticketId: ticket.id,
        action: `Ticket erstellt von User ${authorId}`,
      },
    });

    await systemLog("Ticket erstellt", { ticketId: ticket.id }, authorId);

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return handleApiError("/api/tickets/create", "POST", error);
  }
}
