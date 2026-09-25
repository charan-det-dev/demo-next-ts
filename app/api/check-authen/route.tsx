
export const runtime = "edge";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    
  const cookieStore = cookies(); // <-- ทำงานได้ใน Edge/Server
  const token = (await cookieStore).get("token")?.value;

  if (token) {
    return NextResponse.json({ isAuthenticated: true });
  }

  return NextResponse.json({ isAuthenticated: false });
}
