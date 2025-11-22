import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request) {
    try {
        const { targetId, note } = await req.json();

        if (!targetId || !note)
            return NextResponse.json(
                { error: "targetId oder note fehlt" },
                { status: 400 }
            );

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

        await prisma.userNotes.create({
            data: {
                userId: targetId,
                moderatorId,
                note,
            },
        });

        await modLog(moderatorId, targetId, "NOTE", note);

        return NextResponse.json({ success: true });
    } catch (error) {
        return handleApiError("/api/mod/users/notes", "POST", error);
    }
}
