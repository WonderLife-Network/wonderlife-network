import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const { email, pass } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) return NextResponse.json({ error: "Benutzer nicht gefunden." });

    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) return NextResponse.json({ error: "Falsches Passwort." });

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return NextResponse.json({ token });
}
