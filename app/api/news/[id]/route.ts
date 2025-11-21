import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: any) {
  const id = Number(params.id);

  const news = await prisma.news.findUnique({ where: { id } });

  return NextResponse.json(news || {});
}
