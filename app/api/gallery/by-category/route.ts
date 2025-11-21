import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const { categoryId } = await req.json();

    const media = await prisma.galleryMedia.findMany({
        where: { categoryId: Number(categoryId) },
        orderBy: { id: "desc" }
    });

    return NextResponse.json(media);
}
