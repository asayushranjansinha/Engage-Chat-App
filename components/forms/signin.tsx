"use client";
// React-related Imports
import React, { useState } from "react";

// Form-related Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Next.js-related Imports
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// UI Component-related Imports
import ShimmerButton from "@/components/ui/shimmer-button";
import { Lock, SquareUserRound } from "lucide-react";

// Notification-related Imports
import { toast } from "sonner";

// Custom Types or Interfaces
import { ILoginFormProps } from "@/types";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type ValidationSchemaType = z.infer<typeof schema>;

/**
 * Sign-in form component.
 * This component renders a form for users to sign in.
 * Users can provide their username and password to authenticate,
 * or use the "Sign in with Google" button to authenticate using their Google account.
 * The form submission is handled asynchronously, with loading state and error handling.
 * @param {ILoginFormProps} props - Props containing default form values and validation schema
 */
const SignInForm: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
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

  /**
   * Handles form submission.
   * This function is responsible for signing in the user using provided form data.
   * It sets loading state, sends a sign-in request to the server,
   * handles server response, and updates UI accordingly.
   * @param {ValidationSchemaType} data - Form data to be submitted
   */
  const onSubmit: SubmitHandler<ValidationSchemaType> = async (
    data: ValidationSchemaType
  ) => {
    try {
      setLoading(true);
      toast.loading("Signing in... Please wait a moment.");
      const serverResponse = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!serverResponse?.ok) {
        toast.error(serverResponse?.error);
      } else {
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch (error) {
      console.log("Error during sign in: ", error);
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
          Let&apos;s Chat
        </button>
      </form>

      {/* Sign in with Google */}
      <ShimmerButton title="Sign in with Google" onClick={signInWithGoogle} />
    </div>
  );
};

export default SignInForm;
