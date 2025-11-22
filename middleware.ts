import { NextResponse } from "next/server";
import { apiLog } from "@/lib/apiLogger";

export async function middleware(req: Request) {
    const url = new URL(req.url);

    const route = url.pathname;
    const method = req.method;

    // IP-Get (funktioniert auf Webservern & Vercel)
    const ip =
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        "unknown";

    // User-ID aus Cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const userId = cookieHeader
        .split(";")
        .find((c) => c.trim().startsWith("userId="))
        ?.split("=")[1];

    // Wir loggen NICHT statische Dateien
    const skip = ["/_next", "/favicon", "/public", "/images", "/uploads"];

    if (!skip.some((s) => route.startsWith(s))) {
        // Erste Antwort wird als "200 – received" geloggt
        apiLog(route, method, 200, userId, ip);
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*",
};
