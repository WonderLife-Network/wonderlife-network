import prisma from "@/lib/prisma";

export async function systemLog(message: string) {
  try {
    await prisma.log.create({
      data: {
        type: "SYSTEM",
        message
      }
    });
  } catch (err) {
    console.error("Log Fehler:", err);
  }
}
