import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";

export async function POST(req: Request) {
  const form = await req.formData();

  const title = form.get("title")?.toString() || "";
  const description = form.get("description")?.toString() || "";
  const category = form.get("category")?.toString() || "";
  const priority = form.get("priority")?.toString() || "NORMAL";
  const file = form.get("file") as unknown as File | null;

  const userId = Number((req.headers as any).get("x-user-id"));

  let fileUrl = null;

  // Datei speichern
  if (file && file.name) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + file.name;
    const path = `./public/tickets/${fileName}`;

    await writeFile(path, buffer);
    fileUrl = `/tickets/${fileName}`;
  }

  // Ticket speichern
  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      category,
      priority,
      creatorId: userId,
      status: "OPEN",
    },
  });

  return NextResponse.json({ success: true, ticket });
}
