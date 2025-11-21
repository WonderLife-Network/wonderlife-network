export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import sharp from "sharp";
import fs from "fs";

export async function POST(req) {
    const formData = await req.formData();

    const file = formData.get("file");
    const title = formData.get("title");
    const authorId = Number(formData.get("authorId") || 1);

    if (!file)
        return NextResponse.json({ error: "Keine Datei hochgeladen." });

    // Datei lesen
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dateiendung erkennen
    const originalName = file.name.toLowerCase();
    const extension = originalName.split(".").pop();

    // Ziel-Verzeichnis
    const uploadsDir = "public/uploads";
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Dateiname
    const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.jpg`;

    const filepath = `${uploadsDir}/${filename}`;

    // Sharp Pipeline
    let sharpInstance = sharp(buffer);

    // HEIC / HEIF → JPG
    if (extension === "heic" || extension === "heif") {
        sharpInstance = sharpInstance.toFormat("jpeg");
    }

    // Bild auf max. 1920px Breite verkleinern (falls größer)
    const resized = await sharpInstance
        .resize({
            width: 1920, // maximale Breite
            withoutEnlargement: true, // Bild nicht vergrößern, wenn kleiner
        })
        .jpeg({
            quality: 85, // 80–85% = gute Webqualität
            chromaSubsampling: "4:4:4",
        })
        .toBuffer();

    // Datei speichern
    await fs.promises.writeFile(filepath, resized);

    // Öffentliche URL
    const url = `/uploads/${filename}`;

    // DB Eintrag
    const dbImage = await prisma.galleryImage.create({
        data: {
            title,
            url,
            authorId,
        },
    });

    return NextResponse.json({
        success: true,
        url,
        image: dbImage,
    });
}
