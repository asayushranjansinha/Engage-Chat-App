"use client";
// External package imports
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

import { Lock, Mail, SquareUserRound } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Local imports
import ShimmerButton from "@/components/ui/shimmer-button";
import { IRegisterFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthModal } from "../hooks/authmodal-store";

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

/**
 * Register form component.
 * This component renders a form for users to register.
 * Users can provide their email, username, and password to create a new account.
 * The form submission is handled asynchronously, with loading state and error handling.
 * @param {IRegisterFormProps} props - Props containing default form values
 */
const RegisterForm: React.FC<IRegisterFormProps> = (
  props: IRegisterFormProps
) => {
  const modal = useAuthModal();
  const [loading, setLoading] = useState(false);
  const { defaultValues } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  /**
   * Handles form submission for user registration.
   * This function is responsible for sending a registration request to the server
   * with the provided form data. It sets loading state, sends a POST request to the
   * registration API endpoint, handles server response (success or error), and updates UI accordingly.
   * @param {ValidationSchemaType} data - Form data to be submitted
   */
  const onSubmit: SubmitHandler<ValidationSchemaType> = async (
    data: ValidationSchemaType
  ) => {
    const apiEndPoint = "/api/auth/register";
    try {
      setLoading(true);
      toast.loading("Signing up... Please wait a moment.");
      const serverResponse = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let responseJson = await serverResponse.json();
      if (!serverResponse.ok) {
        toast.error(responseJson.message);
        return;
      }
      toast.success("Account created successfully! You can now log in.");
      modal.onClose();
    } catch (error) {
      console.log("Error during signup: ", error);
      toast.error("Oops! Something went wrong. Please try again later.");
    } finally {
      toast.dismiss();
      setLoading(false);
      reset();
    }
  };

  /**
   * Initiates the sign-in process using Google authentication.
   * This function triggers the sign-in flow with Google OAuth provider,
   * allowing users to authenticate using their Google accounts.
   * Upon successful authentication, users are redirected to the specified callback URL.
   */
  const signInWithGoogle = async () => {
    signIn("google", { redirect: false, callbackUrl: "/" });
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {/* Company Logo */}
      <Link href="/">
        <h2 className="text-3xl font-semibold antialiased text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500">
          Engage
        </h2>
      </Link>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default RegisterForm;
