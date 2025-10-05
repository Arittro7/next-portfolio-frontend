import Navbar from '@/components/share/Navbar';
import React from 'react';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] mx-auto  my-5">
      <Navbar/>
      <main className="min-h-dvh">
        {children}
      </main>
      {/* footer will add here */}
    </div>
  );
}