import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { modLog } from "@/lib/modLogger";
import { handleApiError } from "@/lib/apiError";

export async function POST(req: Request) {
    try {
        const { targetId, reason } = await req.json();

        if (!targetId || !reason)
            return NextResponse.json(
                { error: "targetId oder reason fehlt" },
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

        await prisma.userWarnings.create({
            data: {
                userId: targetId,
                moderatorId,
                reason,
            },
        });

        await modLog(moderatorId, targetId, "WARN", reason);

        return NextResponse.json({ success: true });
    } catch (error) {
        return handleApiError("/api/mod/users/warn", "POST", error);
    }
}
