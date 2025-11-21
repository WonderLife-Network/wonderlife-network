import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { title, content, categoryId, authorId } = await req.json();

    const thread = await prisma.forumThread.create({
        data: { title, content, categoryId, authorId }
    });

    return NextResponse.json(thread);
}
