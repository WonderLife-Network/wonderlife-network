import { NextResponse } from "next/server";

export function middleware(req: any) {
  const url = req.nextUrl.pathname;

  // ADMIN-Bereich sichern
  if (url.startsWith("/admin")) {
    const role = req.cookies.get("role")?.value;

    if (!role) return NextResponse.redirect(new URL("/auth/login", req.url));

    if (role !== "ADMIN" && role !== "OWNER")
      return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
