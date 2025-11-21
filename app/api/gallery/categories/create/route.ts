import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Kategorie-Name fehlt." });
        }

        // prüfen ob Kategorie existiert
        const exists = await prisma.galleryCategory.findFirst({
            where: { name: name }
        });

        if (exists) {
            return NextResponse.json({ error: "Kategorie existiert bereits." });
        }

        // Kategorie erstellen
        const category = await prisma.galleryCategory.create({
            data: {
                name: name
            }
        });

        return NextResponse.json({
            success: true,
            category
        });

    } catch (err) {
        console.error("CATEGORY CREATE ERROR:", err);
        return NextResponse.json({ error: "Serverfehler beim Erstellen." });
    }
}
