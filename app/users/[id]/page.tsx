"use client";

export const runtime = 'edge'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Loading from "../../loading";
import { use } from "react";
import styles from "./page.module.css";

type User = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

type UsersResponse = {
  user: User;
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
  const fetchedId = useRef<string | null>(null);
  const [res, setRes] = useState<UsersResponse>({
    user: {
      id: "",
      name: "",
      avatar: "",
      createdAt: "",
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fetchedId.current === id) {
      return;
    }

    fetchedId.current = id;
    setLoading(true);

    fetchUserById(id)
      .then(setRes)
      .catch((err) => {
        fetchedId.current = null;
        console.error("Fetch error:", err);
      })
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) return Loading();

  return (
    <div className={styles.userWrap}>
      <div className={styles.usersContainer}>
        <h2 className={styles.heading}>User Detail</h2>
        <div key={res.user.id} className={styles.userCard}>
          <div className={styles.avatarContainer}>
            <Image
              src={res.user.avatar}
              alt="user"
              width={100}
              height={100}
              className={styles.avatar}
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {res.user.id} : {res.user.name}
            </div>
            <div className={styles.userDate}>{res.user.createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
