export const runtime = "edge";

import { NextResponse, NextRequest } from "next/server";
// import { cookies } from "next/headers";

// API Route สำหรับ Sign-in
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // ตรวจสอบข้อมูล เช่น ทำการเปรียบเทียบกับฐานข้อมูล
  if (email === "user@example.com" && password === "password123") {
    const newAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // ตัวอย่าง token (JWT)

    // สร้าง response ก่อน
    const response = NextResponse.json({ message: "sign in successfully." }, { status: 200 });

    // ตั้ง cookie บน response นี้
    response.headers.set(
      "Set-Cookie",
      `token=${newAccessToken}; Path=/; Max-Age=${
        60 * 60 * 24
      }; HttpOnly; Secure; SameSite=Strict`
    );

    return response;
  }

  // หากข้อมูลไม่ถูกต้อง
  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
