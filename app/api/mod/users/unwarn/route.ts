import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request) {
    try {
        const { warningId, targetId } = await req.json();

        if (!warningId || !targetId)
            return NextResponse.json(
                { error: "warningId oder targetId fehlt" },
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

        await prisma.userWarnings.delete({
            where: { id: warningId },
        });

        await modLog(moderatorId, targetId, "UNWARN", "Warnung entfernt", {
            warningId,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return handleApiError("/api/mod/users/unwarn", "POST", error);
    }
}
