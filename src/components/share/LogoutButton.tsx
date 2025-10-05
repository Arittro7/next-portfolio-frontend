"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      toast.error("Logout failed");
      return;
    }

    toast.success("Logged out");
    router.push("/login");
    router.refresh();
  };

  return (
    <button onClick={onLogout} className="bg-gray-700 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
}
