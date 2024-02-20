"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, SquareUserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ShimmerButton from "@/components/ui/shimmer-button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
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

const SignInForm: React.FC<ILoginFormProps> = (props) => {
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
    try {
      // Set Loading state to true
      setLoading(true);
      toast.loading("Signing in... This might take a few seconds");
      //   Create a fetch request
      const serverResponse = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!serverResponse?.ok) {
        toast.error(serverResponse?.error);
      } else {
        toast.success("Sign In successfull");
        router.push("/");
      }
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

        <ShimmerButton title="Sign in with Google" onClick={signInWithGoogle} />

        <Link href="/auth/register" className="link">
          <p className="text-center">
            Don&apos;t have an account? Register Here
          </p>
        </Link>
      </div>
    </main>
  );
};

export default SignInForm;
