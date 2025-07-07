import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(pathname);
    
    if (pathname === "/login") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (pathname === "/signup") {
        return NextResponse.redirect(new URL("/auth/signup", request.url));
    }

    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login", "/signup"],
};