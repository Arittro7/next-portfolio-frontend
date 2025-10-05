"use client"

import Footer from "@/components/share/footer";
import Navbar from "@/components/share/Navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] mx-auto  my-5">
        <Navbar />
        <main className="min-h-dvh">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
