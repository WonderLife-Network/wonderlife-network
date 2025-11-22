import { NextResponse } from "next/server";
import { systemLog } from "@/lib/logger";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Cookies löschen
  response.cookies.set("userId", "", { maxAge: 0 });
  response.cookies.set("role", "", { maxAge: 0 });
  response.cookies.set("token", "", { maxAge: 0 });

  // SYSTEM LOG – Logout
  await systemLog("🔓 Logout: Benutzer hat sich ausgeloggt.");

  return response;
}
