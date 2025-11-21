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

    const originalName = file.name.toLowerCase();
    const ext = originalName.split(".").pop();

    const uploadsDir = "public/uploads";
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filepath = `${uploadsDir}/${filename}`;

    const videoFormats = ["mp4", "mov", "webm", "mkv", "avi", "m4v"];

    // 🔥 VIDEO UPLOAD
    if (videoFormats.includes(ext)) {
        await fs.promises.writeFile(filepath, buffer);

        const media = await prisma.galleryMedia.create({
            data: {
                title,
                url: `/uploads/${filename}`,
                type: "video",
                authorId
            }
        });

        return NextResponse.json({ success: true, media });
    }

    // 🔥 BILD-UPLOAD (wie vorher)
    const resized = await sharp(buffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();

    await fs.promises.writeFile(filepath.replace(`.${ext}`, ".jpg"), resized);

    const image = await prisma.galleryMedia.create({
        data: {
            title,
            url: `/uploads/${filename.replace(ext, "jpg")}`,
            type: "image",
            authorId
        }
    });

    return NextResponse.json({ success: true, media: image });
}
