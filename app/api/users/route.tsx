
export const runtime = 'edge'

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Users = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export async function GET(): Promise<NextResponse> {

  const BASE_URL = "https://67eb8588aa794fb3222a8a27.mockapi.io/api/d-charan/users";
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // ตัวอย่าง token (JWT)
  const users = (await res.json()) as Users[];

    // (await cookies()).set("token", token, {
    //   httpOnly: false,
    //   secure: true,
    //   sameSite: "strict",
    //   path: "/",
    //   maxAge: 60 * 60 * 24, // 1 วัน
    // });

      // ตั้ง cookie ด้วย header แทน cookies() function
      res.headers.set(
        "Set-Cookie",
        `token=${token}; Path=/; Max-Age=${60 * 60 * 24}; HttpOnly; Secure; SameSite=Strict`
      );

  return NextResponse.json({
    user: users,
    newAccessToken: token,
  });
}