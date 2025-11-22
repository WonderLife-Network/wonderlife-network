import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { systemLog } from "@/lib/logger";

export async function POST(req) {
  const { email, pass } = await req.json();

  // USER SUCHE
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    await systemLog(`🚫 Login fehlgeschlagen – Benutzer '${email}' nicht gefunden.`);
    return NextResponse.json({ error: "Benutzer nicht gefunden." });
  }

  // PASSWORT CHECK
  const valid = await bcrypt.compare(pass, user.password);
  if (!valid) {
    await systemLog(`🚫 Login fehlgeschlagen – Falsches Passwort für '${email}'.`);
    return NextResponse.json({ error: "Falsches Passwort." });
  }

  // TOKEN GENERIEREN
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // SYSTEM LOG: erfolgreicher Login
  await systemLog(`🔐 Login: Benutzer '${user.username}' hat sich eingeloggt.`);

  // COOKIE SETZEN
  const response = NextResponse.json({ success: true });

  response.cookies.set("userId", user.id.toString());
  response.cookies.set("role", user.role);
  response.cookies.set("token", token);

  return response;
}
