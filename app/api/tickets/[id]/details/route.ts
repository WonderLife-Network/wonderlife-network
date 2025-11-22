import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleApiError } from "@/lib/apiError";

export async function GET(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { messages: true },
    });

    return NextResponse.json({ ticket });
  } catch (error) {
    return handleApiError("/api/tickets/[id]/details", "GET", error);
  }
}
