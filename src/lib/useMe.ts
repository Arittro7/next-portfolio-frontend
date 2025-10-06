"use client";

import { useEffect, useState } from "react";

export interface Me {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

export default function useMe() {
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
          {
            credentials: "include", 
            cache: "no-store",
          }
        );

        if (!res.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const json = await res.json();
        setUser(json.data || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, loading, setUser };
}
