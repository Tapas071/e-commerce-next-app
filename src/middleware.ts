import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
const { auth } = NextAuth(authConfig);

import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from "@/constants/routes";

export async function middleware(request :NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  if (!session && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  const isAuthenticated = !!session?.user;
const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route))) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));


if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
}
return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
