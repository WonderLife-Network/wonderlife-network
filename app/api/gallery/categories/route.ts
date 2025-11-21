import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.galleryCategory.findMany({
        orderBy: { name: "asc" }
    });

    return NextResponse.json(categories);
}
