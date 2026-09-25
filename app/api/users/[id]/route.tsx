
export const runtime = 'edge'

// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type User = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse> {

  const { id } = await context.params;
  const BASE_URL = `${process.env.USERS_API_BASE_URL ?? "http://localhost:8080"}/users/${id}`;
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
  
  // ⚠️ res.headers.get() คืนค่าเป็น string | null ต้องเช็ค null ก่อน cast
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNoYXJhbiIsImlhdCI6MTUxNjIzOTAyMn0.AfVwQvdThe7YydcAUrSTIwuzoONbUCDnTbxXg7VJpM4"; // ตัวอย่าง token (JWT)
  const users = (await res.json()) as User;

  
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