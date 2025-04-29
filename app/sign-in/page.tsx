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
        <button className="sign-in-button sign-in" type="submit">Sign In</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
