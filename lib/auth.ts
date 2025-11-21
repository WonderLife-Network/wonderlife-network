import prisma from "@/lib/prisma";

export async function getUser(serverId: number) {
  const user = await prisma.user.findUnique({
    where: { id: serverId }
  });

  return user;
}

export async function checkRole(user: any, allowed: string[]) {
  return user && allowed.includes(user.role);
}
