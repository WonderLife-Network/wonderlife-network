import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { systemLog } from "@/lib/systemLogger";
import { handleApiError } from "@/lib/apiError";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: any) {
  try {
    const ticketId = Number(params.id);

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json(
        { error: "Keine Datei hochgeladen" },
        { status: 400 }
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dateiname
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "tickets");

    // Ordner erzeugen wenn nicht vorhanden
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await fs.promises.writeFile(filePath, buffer);

    const fileUrl = `/uploads/tickets/${fileName}`;

    // Typ bestimmen
    const type = file.type.startsWith("video") ? "video" : "image";

    // DB speichern
    const uploadEntry = await prisma.ticketUpload.create({
      data: {
        ticketId,
        url: fileUrl,
        type,
      },
    });

    // LOGS
    await prisma.ticketLog.create({
      data: {
        ticketId,
        action: `Datei hochgeladen (${file.name})`,
      },
    });

    await modLog("system", String(ticketId), "TICKET_UPLOAD", file.name);
    await systemLog("Ticket Upload", { ticketId, fileName: file.name });

    return NextResponse.json({
      success: true,
      upload: uploadEntry,
    });
  } catch (error) {
    return handleApiError("/api/tickets/[id]/upload", "POST", error);
  }
}
