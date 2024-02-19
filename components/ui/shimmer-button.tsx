import { cn } from "@/lib/utils";
import React from "react";

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  title,
  icon,
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex animate-shimmer items-center justify-center rounded-md border dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 bg-[length:200%_100%] px-6 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {title}
      {icon}
      {children}
    </button>
  );
};

export default ShimmerButton;
