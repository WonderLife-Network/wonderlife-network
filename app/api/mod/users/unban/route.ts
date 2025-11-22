import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request) {
    try {
        const { targetId } = await req.json();

        if (!targetId)
            return NextResponse.json({ error: "targetId fehlt" }, { status: 400 });

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

        await prisma.user.update({
            where: { id: targetId },
            data: { banned: false },
        });

        await modLog(moderatorId, targetId, "UNBAN", "Benutzer entbannt");

        return NextResponse.json({ success: true });
    } catch (error) {
        return handleApiError("/api/mod/users/unban", "POST", error);
    }
}
