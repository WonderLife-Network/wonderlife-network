import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { id, name } = await req.json();

        // Validierung
        if (!id) {
            return NextResponse.json({ error: "Kategorie-ID fehlt." });
        }

        if (!name || name.trim().length === 0) {
            return NextResponse.json({ error: "Neuer Kategoriename fehlt." });
        }

        // prüfen ob Kategorie existiert
        const category = await prisma.galleryCategory.findUnique({
            where: { id: Number(id) }
        });

        if (!category) {
            return NextResponse.json({ error: "Kategorie nicht gefunden." });
        }

        // prüfen ob neuer Name schon existiert
        const duplicate = await prisma.galleryCategory.findFirst({
            where: {
                name: name,
                NOT: { id: Number(id) }
            }
        });

        if (duplicate) {
            return NextResponse.json({ error: "Eine andere Kategorie hat bereits diesen Namen." });
        }

        // Kategorie bearbeiten
        const updated = await prisma.galleryCategory.update({
            where: { id: Number(id) },
            data: { name }
        });

        return NextResponse.json({
            success: true,
            message: "Kategorie wurde erfolgreich geändert.",
            category: updated
        });

    } catch (err) {
        console.error("CATEGORY EDIT ERROR:", err);
        return NextResponse.json({ error: "Serverfehler beim Bearbeiten." });
    }
}
