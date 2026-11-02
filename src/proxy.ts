import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    if (request.cookies.has("token")) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/overview/:path*", "/monitors/:path*", "/notifiers/:path*"]
};
