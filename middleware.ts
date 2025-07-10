import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    if (pathname === "/login") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (pathname === "/signup") {
        return NextResponse.redirect(new URL("/auth/signup", request.url));
    }

    if (pathname === "/dashboard") {
        try {
            const response = await fetch(new URL("/api/subscription/check", request.url), {
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error checking subscription:", data.error);
                return NextResponse.redirect(new URL("/", request.url));
            }

            if (!data.isSubscribed) {
                return NextResponse.redirect(new URL("/onboarding", request.url));
            }
        } catch (error) {
            console.error("Error fetching subscription status:", error);
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login", "/signup"],
};