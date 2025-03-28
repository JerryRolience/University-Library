import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const authRoutes = ["/sign-in", "/sign-up"];
  const protectedRoutes = ["/my-profile"];
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);

  // Call the backend API to validate token
  const response = await fetch("http://localhost:4000/api/auth/validate", {
    credentials: "include",
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  const isAuthenticated = response.status === 200;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage
  }

  // Redirect unauthenticated users from protected routes to sign-in
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/my-profile",
    "/profile/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
