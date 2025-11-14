import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? request.nextUrl.host;
  const domains = host.split(".");
  if (domains.length !== 3) return;
  const schoolSlug = domains[0];
  const rewriteTo = new URL(
    `/school/${schoolSlug}${request.nextUrl.pathname}`,
    request.url,
  );
  return NextResponse.rewrite(rewriteTo);
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
