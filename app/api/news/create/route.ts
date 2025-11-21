import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = form.get("title")?.toString();
    const content = form.get("content")?.toString();
    const category = form.get("category")?.toString() || null;
    const authorId = Number(form.get("authorId")) || 1;

    if (!title || !content)
      return NextResponse.json({ error: "Titel und Inhalt sind erforderlich." });

    // COVER-BILD
    let coverImage = null;
    const file = form.get("cover") as File | null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const dir = "public/news";
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const filename = Date.now() + "-" + file.name.replace(/\s/g, "_");
      const path = `${dir}/${filename}`;
      fs.writeFileSync(path, buffer);
      coverImage = `/news/${filename}`;
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        category,
        coverImage,
        authorId,
      },
    });

    return NextResponse.json({ success: true, news });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Fehler beim Erstellen der News." });
  }
}
