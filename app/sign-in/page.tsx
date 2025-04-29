"use client";
import { useState } from "react";
import "./sign-in.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sing-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("✅ Sign-in successful");
        window.location.href = "/"; // 🔄 redirect แล้ว reload หน้าใหม่
        // router.push("/");
      } else {
        const data = await response.json();
        setError(data.message || "❌ Invalid credentials");
      }
    } catch (error) {
      console.error("Sign-in error", error);
      setError("❌ Error occurred during sign-in.");
    }
  };

  return (
    <div className="sign-in-container">
      <br />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="sign-in-button sign-in" type="submit">
          Sign In
        </button>
      </form>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      <div className="sign-in-image">
      <p className="sign-in-cloudflare">Server By</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cloudflare_Logo.svg/1024px-Cloudflare_Logo.svg.png?20220519022010"
          alt="user"
          width={100}
          height={100}
          className=""
        />
      </div>
      <div className="sign-in-developer-name">
        <p>Developer By D.Charan & API Mock By mockapi.io</p>
        </div>
      <br />
    </div>
  );

}