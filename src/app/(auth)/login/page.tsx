"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const schema = z.object({
  email: z.string().email("Input Valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        toast.error(err?.message || "Login failed");
        return;
      }

      toast.success("Logged in successfully");
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <section className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Owner Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-md rounded-2xl p-6 flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2 rounded"
        />

        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          disabled={isSubmitting}
          className="bg-indigo-600 text-white py-2 rounded"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
