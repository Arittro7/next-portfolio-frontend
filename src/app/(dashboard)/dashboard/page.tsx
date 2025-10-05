"use client";

import LogoutButton from "@/components/share/LogoutButton";
import useMe from "@/lib/useMe";


export default function DashboardPage() {
  const { user, loading } = useMe();

  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== "admin") return <p>Unauthorized</p>;

  return (
    <section className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      <p>Welcome {user.name}</p>
    </section>
  );
}
