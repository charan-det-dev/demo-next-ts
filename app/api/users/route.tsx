
export const runtime = 'edge'

// import { cookies } from "next/headers";
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

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNoYXJhbi1kZXQtZGV2IiwiaWF0IjoxNTE2MjM5MDIyfQ.jjn8BTBTth_WPPXnzRHCEqf56YF4p70DSqACmhAIMSo"; // ตัวอย่าง token (JWT)
  const users = (await res.json()) as Users[];

  const response = NextResponse.json({
    user: users,
  });
  
  // ตั้ง cookie ผ่าน header
  response.headers.set(
    "Set-Cookie",
    `token=${token}; Path=/; Max-Age=${60 * 60 * 24}; HttpOnly; Secure; SameSite=Strict`
  );
  
  return response;
}