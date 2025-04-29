"use client";

export const runtime = 'edge'

import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "../../loading";
import { use } from "react";
import "../page.css";

type User = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

type UsersResponse = {
  user: User;
  newAccessToken: string;
};

// services/userService.ts
async function fetchUserById(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json(); // คาดว่าเป็น UsersResponse
}

export default function UsersPageClient({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params); // ✅ ใช้ use() เพื่อ unwrap params
  const [res, setRes] = useState<UsersResponse>({
    user: {
      id: "",
      name: "",
      avatar: "",
      createdAt: "",
    },
    newAccessToken: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchUserById(id)
      .then(setRes)
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) return Loading();

  return (
    <div className="user-wrap">
      <div className="users-container">
        <h2 className="heading">Users Detail</h2>
        <div key={res.user.id} className="user-card">
          <div className="avatar-container">
            <Image
              src={res.user.avatar}
              alt="user"
              width={100}
              height={100}
              className="avatar"
            />
          </div>
          <div className="user-info">
            <div className="user-name">
              {res.user.id} : {res.user.name}
            </div>
            <div className="user-date">{res.user.createdAt}</div>
             <p className="token">Token: { res.newAccessToken }</p>
          </div>
        </div>
      </div>
    </div>
  );
}
