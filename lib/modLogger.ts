import prisma from "@/lib/prisma";

export async function modLog(userId: number, action: string) {
  try {
    await prisma.modLog.create({
      data: {
        userId,
        action,
      }
    });

    // Zusätzlich: User History erweitern
    await prisma.userHistory.create({
      data: {
        userId,
        text: action
      }
    });

  } catch (err) {
    console.error("ModLog Fehler:", err);
  }
}
