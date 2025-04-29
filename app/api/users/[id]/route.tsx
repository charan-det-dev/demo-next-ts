"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type User = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse> {

  const { id } = await context.params;
  const BASE_URL = `https://67eb8588aa794fb3222a8a27.mockapi.io/api/d-charan/users/${id}`;
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
  
  // ⚠️ res.headers.get() คืนค่าเป็น string | null ต้องเช็ค null ก่อน cast
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // ตัวอย่าง token (JWT)
  const users = (await res.json()) as User;

    (await cookies()).set("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 วัน
    });

  return NextResponse.json({
    user: users,
    newAccessToken: token,
  });
}