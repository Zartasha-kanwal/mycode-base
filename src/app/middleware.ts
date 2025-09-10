import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || req.headers.get("authorization") || null;

  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  // If not authenticated, block access to /dashboard
  if (!isAuth && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated, block access to login/signup
  if (isAuth && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Match these routes
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};
