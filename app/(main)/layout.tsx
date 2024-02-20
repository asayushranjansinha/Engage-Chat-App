import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/theme-toggle";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthSessionProvider from "@/components/auth/auth-session-provider";
import NavbarSection from "@/components/navbar-section";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <AuthSessionProvider>
            <div>
              <NavbarSection />
            </div>
            {children}
            <div className="fixed bottom-4 right-4">
              <ModeToggle />
            </div>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
