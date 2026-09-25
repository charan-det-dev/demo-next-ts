
export const runtime = 'edge'

import { NextRequest, NextResponse } from "next/server";

type Users = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export async function GET(req: NextRequest): Promise<NextResponse> {

  const BASE_URL = `${process.env.USERS_API_BASE_URL ?? "http://localhost:8080"}/users`;
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNoYXJhbi1kZXQtZGV2IiwiaWF0IjoxNTE2MjM5MDIyfQ.jjn8BTBTth_WPPXnzRHCEqf56YF4p70DSqACmhAIMSo"; // ตัวอย่าง token (JWT)
  const users = (await res.json()) as Users[];

  const response = NextResponse.json({
    user: users,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure:
      process.env.COOKIE_SECURE === "true" || req.nextUrl.protocol === "https:",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}