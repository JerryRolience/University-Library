import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const authRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];
  const protectedRoutes = ["/my-profile", "/library", "/settings"];
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];

  let isAuthenticated = false;

  if (token) {
    try {
      // Simple client-side expiration check
      // JWT structure consists of three parts separated by dots that is header.payload.signature
      // header: Encodes metadata about the token.payload: Contains claims such as exp (expiration time).signature: Ensures token integrity (not decoded here).
      //atob() decodes the Base64-encoded payload into a readable string. and JSON.parse() converts the decoded payload string into a JavaScript object.

      const payload = JSON.parse(atob(token.split(".")[1]));
      isAuthenticated = Date.now() < payload.exp * 1000;

      if (!isAuthenticated) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("session", "expired");
        return NextResponse.redirect(signInUrl);
      }

      // Verify with backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/validate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      isAuthenticated = response.status === 200;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(req.nextUrl.searchParams.get("redirect") || "/", req.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
