
export const runtime = "edge";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {

  const cookieStore = cookies(); // <-- ทำงานได้ใน Edge/Server
  (await cookieStore).delete("token");

  return NextResponse.json({message: "Sign out successfully"});
}