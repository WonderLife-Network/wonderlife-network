import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const media = await prisma.galleryMedia.findMany({
        orderBy: { id: "desc" }
    });

    return NextResponse.json(media);
}
