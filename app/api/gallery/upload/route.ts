import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { title, url, authorId } = await req.json();

    const image = await prisma.galleryImage.create({
        data: {
            title,
            url,
            authorId,
        }
    });

    return NextResponse.json(image);
}
