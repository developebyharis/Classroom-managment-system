import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/sessionProviderWrapper";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/options";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "cmsuet",
  description: "Classroom management system for UET Peshawar",
};

  
export default async function RootLayout({ children }) {
  const session = await getServerSession(authOption);
// console.log(session, "data in layout.js");
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper>
          <Navbar user={session?.user} />
          {children}
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}