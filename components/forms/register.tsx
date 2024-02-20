"use client";
// External package imports
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Lock, Mail, SquareUserRound } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

// Local imports
import { IRegisterFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ShimmerButton from "@/components/ui/shimmer-button";


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

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { defaultValues } = props;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    const apiEndPoint = "/api/auth/register";
    try {
      // Set Loading state to true
      setLoading(true);
      toast.loading("Signing up... This might take a few seconds");
      //   Create a fetch request
      const serverResponse = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let responseJson = await serverResponse.json();
      //   Check for failure
      if (!serverResponse.ok) {
        toast.error(responseJson.message);
        return;
      }

      //   Successful request
      toast.success(responseJson.message);
      router.push("/auth/login");
    } catch (error) {
      console.log("Error during signup: ", error);
      toast.error("Signup Failed!");
    } finally {
      toast.dismiss();
      setLoading(false);
      reset();
    }
  };

  const signInWithGoogle = async () => {
    signIn("google", { redirect: false, callbackUrl: "/" });
  };
  return (
    <main className="auth">
      <div className="content">
        {/* Company Logo */}
        <Link href="/">
          <h2 className="text-3xl font-semibold antialiased text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500">
            Engage
          </h2>
        </Link>

        {/* Form */}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
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
              <span className="text-red-800 ml-2">{errors.email?.message}</span>
            )}
          </>

          {/* Username */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <button type="submit" className="button" disabled={loading}>
            Register
          </button>
        </form>

        <ShimmerButton title="Sign in with Google" onClick={signInWithGoogle} />

        <Link href="/auth/login" className="link">
          <p className="text-center">Already have an account? Sign In Here</p>
        </Link>
      </div>
    </main>
  );
};

export default RegisterForm;
