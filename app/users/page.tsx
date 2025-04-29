"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "../loading";
import "./page.css";

type Users = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

type UsersResponse = {
  user: Users[];
  newAccessToken: string;
};

// services/userService.ts
async function fetchUsers() {
  const res = await fetch(`/api/users/`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json(); // คาดว่าเป็น UsersResponse
}

export default function UsersPageClient() {
  const [res, setRes] = useState<UsersResponse>({
    user: [],
    newAccessToken: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    
    fetchUsers()
      .then(setRes)
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => setLoading(false));

  }, [router]);

  if (loading) return Loading();

  const handleViewUser = (id: string) => {
    router.push(`/users/${id}`);
  };

  return (
    <div className="users-wrap">
      <div className="users-container">
        {res.user.length !== 0 && <h2 className="heading">Users List</h2>}
        {res.user.length === 0 ? (
          <p className="error-message">
            🚨 ไม่สามารถโหลดข้อมูลผู้ใช้ได้ หรือไม่มีข้อมูล
          </p>
        ) : (
          res.user.map((user) => (
            <div key={user.id} className="user-card">
              <div className="avatar-container">
                <Image
                  src={user.avatar}
                  alt="user"
                  width={100}
                  height={100}
                  className="avatar"
                />
              </div>
              <div className="user-info">
                <div className="user-name">
                  {user.id} : {user.name}
                </div>
                <div className="user-date">{user.createdAt}</div>
                {res.newAccessToken === "" ? (
                  <p className="warning">⚠️ Token ไม่พบหรือหมดอายุ</p>
                ) : (
                  <p className="token">Token: {res.newAccessToken}</p>
                )}
              </div>
              <button
                className="user-btn"
                onClick={() => handleViewUser(user.id)}
              >
                View
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
