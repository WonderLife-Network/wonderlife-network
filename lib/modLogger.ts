import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

const logDir = path.join(process.cwd(), "storage/logs");
const logFile = path.join(logDir, "mod.log");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

function writeToFile(message: string) {
    fs.appendFileSync(logFile, message + "\n");
}

export async function modLog(
    moderatorId: string,
    targetId: string,
    action: string,
    reason?: string,
    extra: any = {}
) {
    const timestamp = new Date().toISOString();
    const msg = `[MOD] ${timestamp} | Moderator=${moderatorId} → Target=${targetId} | Action=${action} | Reason=${reason || "-"} | Extra=${JSON.stringify(extra)}`;

    // Datei-Log
    writeToFile(msg);

    // Prisma
    await prisma.modLog.create({
        data: {
            moderatorId,
            targetId,
            action,
            reason,
            extra,
            createdAt: new Date()
        }
    });

    // Konsole (neon blau)
    console.log("\x1b[36m[ModLog]\x1b[0m", msg);
}
