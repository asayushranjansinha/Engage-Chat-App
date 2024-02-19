import { Lock, Mail, SquareUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShimmerButton from "../ui/shimmer-button";

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
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
        <form className="form">
          {type === "register" && (
            <div className="input">
              <input type="email" placeholder="Email" className="input-field" />
              <Mail color="#737373" />
            </div>
          )}
          <div className="input">
            <input type="text" placeholder="Username" className="input-field" />
            <SquareUserRound color="#737373" />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <Lock color="#737373" />
          </div>

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
