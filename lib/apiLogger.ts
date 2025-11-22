import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

const logDir = path.join(process.cwd(), "storage/logs");
const logFile = path.join(logDir, "api.log");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

function writeToFile(message: string) {
    fs.appendFileSync(logFile, message + "\n");
}

export async function apiLog(
    route: string,
    method: string,
    status: number,
    userId?: string,
    ip?: string,
    details: any = {}
) {
    const timestamp = new Date().toISOString();
    const msg = `[API] ${timestamp} | ${method} ${route} | Status=${status} | User=${userId || "guest"} | IP=${ip || "-"} | Details=${JSON.stringify(details)}`;

    // Datei-Log
    writeToFile(msg);

    // Prisma
    await prisma.apiLog.create({
        data: {
            route,
            method,
            status,
            details,
            userId: userId || null,
            ip: ip || null,
            createdAt: new Date()
        }
    });

    console.log("\x1b[32m[ApiLog]\x1b[0m", msg);
}
