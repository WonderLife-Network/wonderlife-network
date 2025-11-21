import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { email, username, pass } = await req.json();

    // Prüfen ob E-Mail bereits existiert
    const exists = await prisma.user.findUnique({
        where: { email }
    });

    if (exists) return NextResponse.json({ error: "E-Mail bereits vergeben." });

    const hashed = await bcrypt.hash(pass, 10);

    await prisma.user.create({
        data: {
            email,
            username,
            password: hashed
        }
    });

    return NextResponse.json({ success: true });
}
