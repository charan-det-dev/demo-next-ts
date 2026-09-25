"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "../loading";
import styles from "./page.module.css";

type Users = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

type UsersResponse = {
  user: Users[];
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
    <div className={styles.usersWrap}>
      <div className={styles.usersContainer}>
        {res.user.length !== 0 && <h2 className={styles.heading}>Users List</h2>}
        {res.user.length === 0 ? (
          <p className={styles.errorMessage}>
            🚨 ไม่สามารถโหลดข้อมูลผู้ใช้ได้ หรือไม่มีข้อมูล
          </p>
        ) : (
          res.user.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.avatarContainer}>
                <Image
                  src={user.avatar}
                  alt="user"
                  width={100}
                  height={100}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>
                  {user.id} : {user.name}
                </div>
                <div className={styles.userDate}>{user.createdAt}</div>
              </div>
              <button
                className={styles.userButton}
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
