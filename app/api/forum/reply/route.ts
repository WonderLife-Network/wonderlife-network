import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { content, threadId, authorId } = await req.json();

    const reply = await prisma.forumReply.create({
        data: { content, threadId, authorId }
    });

    return NextResponse.json(reply);
}
