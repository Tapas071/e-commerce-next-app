// pages/register.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { createUser } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const formattedData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

      try {
        const response = await createUser(formattedData);
        if(response && response.statusCode === 200){
          router.push('/');
        }

      } catch (error) {
        console.error("An error occurred during registration", error);
        // Handle error, show error message
      }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="bg-card p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-border rounded bg-input text-foreground"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-destructive text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-border rounded bg-input text-foreground"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-border rounded bg-input text-foreground"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border border-border rounded bg-input text-foreground"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary-hover transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
