// pages/login.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { doCredentialLogin, loginUser } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   try{
  //     e.preventDefault();
          
  //         //  const response = await loginUser(data);
  //         //  if(response && response.statusCode ==200){
  //         //    router.push('/');
  //         //  }
  //         const response = await doCredentialLogin(e)
  //   }
  //   catch(error){
  //     console.error("An error occurred during login", error);
  //     // Handle error, show error message
  //   }


  // }; 

       const formOnSubmitHandler = async (
         event: React.FormEvent<HTMLFormElement>
       ) => {
         event.preventDefault();
           if (typeof window === "undefined") {
             // Skip if window is undefined, meaning it's running on the server
             console.error("Cannot execute form submission on the server.");
             return;
           }
         try {
           const form = event.currentTarget;
           console.log("onclick btn has been clicked");
           const formData = new FormData(form);
           console.log(formData)
           const response = await doCredentialLogin(formData);
          //  if (!!response.error) {
          //    console.error(response.error);
          //    setError(response.error);
          //  } else {
          //    router.push("/dashboard");
          //  }
         } catch (e: unknown) {
           console.error(e);
           const error = e as Error;
          //  setError("wrong credentials");
           // throw new Error("Wrong  credentials")
         }
       };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="bg-card p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Login
        </h2>
        <form onSubmit={formOnSubmitHandler} >
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary-hover transition"
          >
            Login
          </button>
        </form>

        {/* Link to Register Page */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
