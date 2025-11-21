export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import sharp from "sharp";
import fs from "fs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string | null;
        const categoryId = formData.get("categoryId")
            ? Number(formData.get("categoryId"))
            : null;

        const authorId = Number(formData.get("authorId") || 1);

        if (!file)
            return NextResponse.json({ error: "Keine Datei hochgeladen." });

        if (!title)
            return NextResponse.json({ error: "Titel ist erforderlich." });

        // Datei einlesen
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Dateiendung bestimmen
        const originalName = file.name.toLowerCase();
        const ext = originalName.split(".").pop();

        // Upload-Verzeichnis
        const uploadsDir = "public/uploads";
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Video-Erweiterungen
        const videoFormats = ["mp4", "mov", "webm", "mkv", "avi", "m4v"];

        // Dateiname vorbereiten
        let finalFilename = "";
        let finalFilepath = "";

        // 🔥 VIDEO UPLOAD
        if (videoFormats.includes(ext!)) {
            finalFilename = `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}.${ext}`;
            finalFilepath = `${uploadsDir}/${finalFilename}`;

            await fs.promises.writeFile(finalFilepath, buffer);

            const media = await prisma.galleryMedia.create({
                data: {
                    title,
                    url: `/uploads/${finalFilename}`,
                    type: "video",
                    authorId,
                    categoryId,
                },
            });

            return NextResponse.json({ success: true, media });
        }

        // 🔥 BILD-UPLOAD (inkl. HEIC → JPG, Resize 1920px, JPG export)
        finalFilename = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.jpg`;
        finalFilepath = `${uploadsDir}/${finalFilename}`;

        let img = sharp(buffer);

        // HEIC / HEIF → konvertieren
        if (ext === "heic" || ext === "heif") {
            img = img.toFormat("jpeg");
        }

        const resized = await img
            .resize({
                width: 1920,
                withoutEnlargement: true,
            })
            .jpeg({
                quality: 85,
                chromaSubsampling: "4:4:4",
            })
            .toBuffer();

        await fs.promises.writeFile(finalFilepath, resized);

        const image = await prisma.galleryMedia.create({
            data: {
                title,
                url: `/uploads/${finalFilename}`,
                type: "image",
                authorId,
                categoryId,
            },
        });

        return NextResponse.json({ success: true, media: image });

    } catch (err: any) {
        console.error("UPLOAD ERROR:", err);
        return NextResponse.json({ error: "Serverfehler beim Upload." });
    }
}
