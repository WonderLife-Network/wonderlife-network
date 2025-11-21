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

    if (!file) return NextResponse.json({ error: "Keine Datei hochgeladen." });

    // Datei lesen
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dateiendung herausfinden
    const originalName = file.name.toLowerCase();
    const extension = originalName.split(".").pop();

    // Zielverzeichnis
    const uploadsDir = "public/uploads";
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    let filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
    let filepath = `${uploadsDir}/${filename}`;

    // HEIC / HEIF → JPG konvertieren
    if (extension === "heic" || extension === "heif") {
        const converted = await sharp(buffer)
            .jpeg({ quality: 85 })
            .toBuffer();

        fs.writeFileSync(filepath, converted);
    } 
    else {
        // Normale Bilder konvertieren / optimieren
        const converted = await sharp(buffer)
            .jpeg({ quality: 85 })
            .toBuffer();

        fs.writeFileSync(filepath, converted);
    }

    // Öffentliche URL
    const url = `/uploads/${filename}`;

    // Datenbank Eintrag
    const dbImage = await prisma.galleryImage.create({
        data: {
            title,
            url,
            authorId
        }
    });

    return NextResponse.json({
        success: true,
        url,
        image: dbImage
    });
}
