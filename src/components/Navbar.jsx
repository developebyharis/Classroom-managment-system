"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Admin", href: "/admin" },
  { name: "Teacher", href: "/teacher" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-blue-700">
          CMS
        </Link>
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>
          Sign Out
        </Button>
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-700 font-medium transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="material-icons">{open ? "close" : "menu"}</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 px-2 rounded hover:bg-blue-50 text-gray-700 font-medium"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
