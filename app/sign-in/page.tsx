"use client";
import { useState } from "react";
import styles from "./sign-in.module.css";

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
    <div className={styles.signInContainer}>
      <br />
      <h2 className={styles.title}>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.signInButton} type="submit">
          Sign In
        </button>
      </form>
      <br />
      {error && <p className={styles.error}>{error}</p>}
      <br />
      <div className={styles.developerName}>
        <p>Developer By D.Charan & API Mock By mockapi.io</p>
      </div>
      <br />
    </div>
  );
}