import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Kategorie-ID fehlt." });
        }

        // prüfen ob Kategorie existiert
        const category = await prisma.galleryCategory.findUnique({
            where: { id: Number(id) }
        });

        if (!category) {
            return NextResponse.json({ error: "Kategorie nicht gefunden." });
        }

        // Medien, die in dieser Kategorie sind → Kategorie entfernen
        await prisma.galleryMedia.updateMany({
            where: { categoryId: Number(id) },
            data: { categoryId: null }
        });

        // Kategorie löschen
        await prisma.galleryCategory.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({
            success: true,
            message: "Kategorie erfolgreich gelöscht."
        });

    } catch (err) {
        console.error("CATEGORY DELETE ERROR:", err);
        return NextResponse.json({ error: "Serverfehler beim Löschen." });
    }
}
