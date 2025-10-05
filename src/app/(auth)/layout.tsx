

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] mx-auto  my-5">
      <main className="min-h-dvh">{children}</main>
    </div>
  );
}