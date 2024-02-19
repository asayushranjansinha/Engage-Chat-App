"use client";

import { Lock, Mail, SquareUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ShimmerButton from "../ui/shimmer-button";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
type ValidationSchemaType = z.infer<typeof schema>;

const AuthForm: React.FC<AuthFormProps> = ({ type, userData }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: userData,
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (res.ok) {
        const json = await res.json();
        console.log(json)
        router.push("/");  
      }
  
      if (!res.ok) { 
        console.log("Signup Failed");
      }
    }
  };
  
  return (
    <div className="auth">
      <div className="content">
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="Company Logo"
            className=""
            fill
            priority
          />
        </Link>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <>
              <div className="input">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                <Mail color="#737373" />
              </div>
              {errors.email && (
                <span className="text-red-800 ml-2">
                  {errors.email?.message}
                </span>
              )}
            </>
          )}
          <>
            <div className="input">
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="input-field"
              />
              <SquareUserRound color="#737373" />
            </div>
            {errors.username && (
              <span className="text-red-800 ml-2">
                {errors.username?.message}
              </span>
            )}
          </>
          <>
            <div className="input">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="input-field"
              />
              <Lock color="#737373" />
            </div>
            {errors.password && (
              <span className="text-red-800 ml-2">
                {errors.password?.message}
              </span>
            )}
          </>
          <button type="submit" className="button">
            {type === "register" ? "Join Us" : "Let's Chat"}
          </button>
        </form>

        <ShimmerButton title="Sign in with Google" />

        {type === "register" ? (
          <Link href="/auth/login" className="link">
            <p className="text-center">Already have an account? Sign In Here</p>
          </Link>
        ) : (
          <Link href="/auth/register" className="link">
            <p className="text-center">
              Don&apos;t have an account? Register Here
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
