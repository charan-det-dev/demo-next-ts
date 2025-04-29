
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    
  const cookieStore = cookies(); // <-- ทำงานได้ใน Edge/Server
  const token = (await cookieStore).get("token")?.value;
  console.log("check-authen token:", token);

  if (token) {
    return NextResponse.json({ isAuthenticated: true });
  }

  return NextResponse.json({ isAuthenticated: false });
}
