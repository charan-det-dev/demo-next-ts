"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./navbar-header.css";
import { CheckToken, DeleteCookie } from "./cookie";

export default function NavbarHeader() {
  const router = useRouter();
  const [isSignin, setIsSignin] = useState(true);

  useEffect(() => {
    if (!CheckToken()) {
      setIsSignin(false); // อัปเดตสถานะ sign-in ให้เป็น false
      router.push("/sign-in");
    }
  }, [router]);

  const handleSignOut = () => {
    DeleteCookie("token");
    setIsSignin(false); // อัปเดตสถานะ sign-in ให้เป็น false
    router.push("/sign-in");
  };

  return (
    <>
      {isSignin && (
        <nav className="navbar">
          <div className="navbar-container">
            <Link className="navLinks" href="/">
              Home
            </Link>
            <button className="navLinks" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </nav>
      )}
    </>
  );
}