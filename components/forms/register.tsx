"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ShimmerButton from "@/components/ui/shimmer-button";
import { IRegisterFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { Mail, SquareUserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthModal } from "../hooks/authmodal-store";

const formSchema = z.object({
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

/**
 * Register form component.
 * This component renders a form for users to register.
 * Users can provide their email, username, and password to create a new account.
 * The form submission is handled asynchronously, with loading state and error handling.
 * @param {Object} props - Component props
 * @param {Function} props.switchTab - Function to switch between tabs (e.g., login and registration)
 *
 * @returns {JSX.Element} RegisterForm component
 */
const RegisterForm: React.FC<IRegisterFormProps> = (props: {
  switchTab: Function;
}): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [showPassword, setShowPassword] = useState<boolean>();
  const modal = useAuthModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  /**
   * Handles form submission for user registration.
   * This function is responsible for sending a registration request to the server
   * with the provided form data. It sets loading state, sends a POST request to the
   * registration API endpoint, handles server response (success or error), and updates UI accordingly.
   * @param {z.infer<typeof formSchema>} values - Form data to be submitted
   */
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const apiEndPoint = "/api/auth/register";
      try {
        setIsSubmitting(true);
        toast.loading("Signing up... Please wait a moment.");
        const serverResponse = await fetch(apiEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        let responseJson = await serverResponse.json();
        if (!serverResponse.ok) {
          toast.error(responseJson.message);
          return;
        }
        toast.success("Account created successfully! You can now log in.");
        props.switchTab();
        // modal.onClose();
      } catch (error) {
        console.log("Error during signup: ", error);
        toast.error("Oops! Something went wrong. Please try again later.");
      } finally {
        toast.dismiss();
        setIsSubmitting(false);
        form.reset();
      }
    },
    [form, setIsSubmitting,props]
  );
  

  /**
   * Initiates the sign-in process using Google authentication.
   * This function triggers the sign-in flow with Google OAuth provider,
   * allowing users to authenticate using their Google accounts.
   * Upon successful authentication, users are redirected to the specified callback URL.
   */
  const signInWithGoogle = async () => {
    signIn("google", { redirect: false, callbackUrl: "/" });
  };

  // Memoize the form component to prevent unnecessary re-renders
  const MemoizedForm = useMemo(
    () => (
      <Form {...form}>
        <Link href="/" className="w-full flex items-center justify-center">
          <h2 className="text-3xl font-semibold antialiased text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500">
            Engage
          </h2>
        </Link>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-[2rem] space-y-2 flex flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <div
                    className={`group border-b bg-slate-300 dark:bg-black rounded-md px-2 flex gap-1 items-center focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
                  >
                    <Input
                      placeholder="Email"
                      {...field}
                      type="email"
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    />
                    <Mail className="text-gray-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Username</FormLabel>
                <FormControl>
                  <div
                    className={`group border-b bg-slate-300 dark:bg-black rounded-md px-2 flex gap-1 items-center focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
                  >
                    <Input
                      placeholder="Username"
                      {...field}
                      type="text"
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    />
                    <SquareUserRound className="text-gray-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <div
                    className={`group border-b bg-slate-300 dark:bg-black rounded-md px-2 flex gap-1 items-center focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
                  >
                    <Input
                      placeholder="Password"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    />
                    {showPassword ? (
                      <IconEye
                        onClick={(event) => {
                          event.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}
                        className="text-gray-500 cursor-pointer"
                      />
                    ) : (
                      <IconEyeClosed
                        onClick={(event) => {
                          event.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}
                        className="text-gray-500 cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    ),
    [form, isSubmitting, showPassword, onSubmit]
  );
  return (
    <div className="w-full flex flex-col items-center">
      {MemoizedForm}
      <ShimmerButton
        title="Sign in with Google"
        onClick={signInWithGoogle}
        className="mt-2"
        disabled={isSubmitting}
      />
    </div>
  );
};

export default RegisterForm;
