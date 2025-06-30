import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  { path: "/admin", role: "Admin" },
  { path: "/teacher", role: "Teacher" },
];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const matched = protectedRoutes.find((route) =>
    pathname.startsWith(route.path)
  );
  if (!matched) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token.role !== matched.role) {
    const unauthorizedUrl = new URL("/login", req.url);
    return NextResponse.redirect(unauthorizedUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*"],
};