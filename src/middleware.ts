import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const segment = segments[1] ?? "";
  if (isLocale(segment)) {
    return NextResponse.next();
  }

  const rest = segment === "tr" ? segments.slice(2).join("/") : segments.slice(1).join("/");
  const url = request.nextUrl.clone();
  url.pathname = rest ? `/${defaultLocale}/${rest}` : `/${defaultLocale}`;
  return NextResponse.redirect(url, segment === "tr" ? 308 : 307);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
