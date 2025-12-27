import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
const tokenRoutes = ["/dashboard"];
const notAllowedPage = ["/", "/auth"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const path = request.nextUrl.pathname;

  /* ------------------------------- authRoutes ------------------------------- */
  if (authRoutes.includes(path)) {
    if (token) return NextResponse.redirect(new URL(`/dashboard`, request.nextUrl.origin));
  }

  /* ------------------------------- tokenRoutes ------------------------------ */
  const isProtected = tokenRoutes.some((route) => path.startsWith(`${route}/`));
  if (isProtected) {
    if (!token) return NextResponse.redirect(new URL(`/auth/login`, request.nextUrl.origin));
  }

  /* ----------------------------- notAllowedPage ----------------------------- */
  const isNotAllowedPage = notAllowedPage.some((route) => path == route);
  if (isNotAllowedPage) {
    if (!token) return NextResponse.redirect(new URL(`/auth/login`, request.nextUrl.origin));
    if (token) return NextResponse.redirect(new URL(`/dashboard`, request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/upload|favicon.ico).*)"],
};
