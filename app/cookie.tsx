"use client";

export function GetCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
}

export const CheckToken = () => {

  const token = GetCookie("token"); // ค้นหา token จาก localStorage
  console.log("GetCookie => token:", !!token);
  console.log("GetCookie => token:", token);

  return !!token
};

export const DeleteCookie = (name: string) => {
  // ลบ cookie ที่ path "/"
  DeleteCookieForPath(name, "/");
  // ลบ cookie ที่ path "/users/*"
  DeleteCookieForPath(name, "/users");
};

const DeleteCookieForPath = (name: string, path: string) => {
  document.cookie = `${name}=; Max-Age=-1; path=${path};`;
};
