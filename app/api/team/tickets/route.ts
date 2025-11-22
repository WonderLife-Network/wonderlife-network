import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/apiError";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ tickets });
  } catch (error) {
    return handleApiError("/api/team/tickets", "GET", error);
  }
}
