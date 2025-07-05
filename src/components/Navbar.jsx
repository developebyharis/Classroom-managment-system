"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Admin", href: "/admin" },
  { name: "Teacher", href: "/teacher" },
];

export default function Navbar({user}) {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  // const router = useRouter();
// console.log(user, "user in navbar");
 
  // Close mobile menu on navigation
  const handleNav = () => setOpen(false);

  // Determine which links to show
  let filteredLinks = [{ name: "Home", href: "/" }];
  if (user && user?.role === "Admin") {
    filteredLinks.push({ name: "Admin", href: "/admin" });
  } else if (user && user?.role === "Teacher") {
    filteredLinks.push({ name: "Teacher", href: "/teacher" });
  }

  return (
    <>
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close login modal"
              type="button"
            >
              &times;
            </button>
            <div className="w-full">
              <LoginForm />
            </div>
          </div>
        </div>
      )}
      <nav className="bg-white/90 backdrop-blur border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            tabIndex={0}
            aria-label="Go to home page"
          >
            <Image
              src="/window.svg"
              alt="CMS Logo"
              width={32}
              height={32}
              priority
            />
            <span className="hidden sm:inline">CMS</span>
          </Link>
          <div className="hidden md:flex gap-2 items-center">
            {filteredLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                tabIndex={0}
                aria-label={`Go to ${link.name}`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open profile menu"
                    className="ml-2"
                  >
                    <User className="w-6 h-6 text-blue-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-2 border"
                >
                  <div className="px-3 py-2 border-b mb-2">
                    <div className="font-semibold text-blue-900">
                      {user.username}
                    </div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-white bg-red-500 mt-2 rounded-lg"
                      aria-label="Sign out"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => setShowLogin(true)}
                aria-label="Sign in"
              >
                Login
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    {open ? (
                      <path
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    )}
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-2 border"
              >
                {filteredLinks.map((link) => (
                  <DropdownMenuItem asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="block w-full py-3 px-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      tabIndex={0}
                      aria-label={`Go to ${link.name}`}
                      onClick={handleNav}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {!user && (
                  <DropdownMenuItem asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start mt-2 rounded-lg"
                      aria-label="Sign in"
                      onClick={() => {
                        setOpen(false);
                        setShowLogin(true);
                      }}
                    >
                      Login
                    </Button>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start mt-2 rounded-lg"
                    aria-label="Sign out"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                  >
                    Sign Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
