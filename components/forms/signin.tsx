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
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { SquareUserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthModal } from "../hooks/authmodal-store";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

/**
 * SignIn form component.
 * This component renders a form for users to signin.
 * Users can provide their username, and password to sign in to the account.
 * The form submission is handled asynchronously, with loading state and error handling.
 */
const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [showPassword, setShowPassword] = useState<boolean>();
  const modal = useAuthModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /**
   * Handles form submission.
   * This function is responsible for signing in the user using provided form data.
   * It sets loading state, sends a sign-in request to the server,
   * handles server response, and updates UI accordingly.
   * @param {z.infer<typeof formSchema>} values - Form data to be submitted
   */
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setIsSubmitting(true);
        toast.loading("Signing in... Please wait a moment.");
        const serverResponse = await signIn("credentials", {
          ...values,
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
        setIsSubmitting(false);
        form.reset();
      }
    },
    [form, router]
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
        {/* Company Logo */}
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
                      type="username"
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
    [form, isSubmitting, onSubmit, showPassword]
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

export default SignInForm;
