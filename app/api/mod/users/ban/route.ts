import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request) {
    try {
        const { targetId, reason } = await req.json();

        if (!targetId)
            return NextResponse.json({ error: "targetId fehlt" }, { status: 400 });

        // Moderationsberechtigung prüfen
        const cookies = req.headers.get("cookie") || "";
        const moderatorId = cookies
            .split(";")
            .find((c) => c.trim().startsWith("userId="))
            ?.split("=")[1];

        if (!moderatorId)
            return NextResponse.json(
                { error: "Keine Berechtigung" },
                { status: 403 }
            );

        // Benutzer als banned markieren
        await prisma.user.update({
            where: { id: targetId },
            data: { banned: true },
        });

        // Log speichern
        await modLog(
            moderatorId,
            targetId,
            "BAN",
            reason || "Kein Grund angegeben"
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return handleApiError("/api/mod/users/ban", "POST", error);
    }
}
