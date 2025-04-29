// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/", "/sign-in", "/users/:path*"], // หรือ path อื่นที่ต้องการ
};

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl;

  console.log("middleware token:", token);
  console.log("middleware url:", url);

  // ตรวจสอบเฉพาะหน้า '/' และ '/dashboard/*'
  const shouldCheckAuth = url.pathname === "/" || url.pathname.startsWith("/users");

  console.log("shouldCheckAuth:", shouldCheckAuth);
  console.log("url.pathname:", url.pathname);

  if (shouldCheckAuth && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
