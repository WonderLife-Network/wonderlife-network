import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

const logDir = path.join(process.cwd(), "storage/logs");
const logFile = path.join(logDir, "system.log");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

function writeToFile(message: string) {
    fs.appendFileSync(logFile, message + "\n");
}

export async function systemLog(action: string, details: any = {}, userId?: string) {
    const timestamp = new Date().toISOString();
    const msg = `[SYSTEM] ${timestamp} | ${action} | ${JSON.stringify(details)}`;

    // Datei-Log
    writeToFile(msg);

    // Prisma-Log
    await prisma.systemLog.create({
        data: {
            action,
            details,
            userId: userId || null,
            createdAt: new Date()
        }
    });

    // Console im WonderLife Neon Style
    console.log("\x1b[35m[SystemLog]\x1b[0m", msg);
}
