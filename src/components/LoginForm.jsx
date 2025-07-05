"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSonnerToast } from "@/hooks/useSonnerToast";

export function LoginForm({ className }) {
  const [error, setError] = useState("");
  const router = useRouter();
  const { success, error: showError, loading: showLoading } = useSonnerToast();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      showLoading("Signing in...");
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res.ok) {
        success("Login successful");
        router.push("/"); 
      } else {
        setError("Invalid username or password");
        showError("Invalid username or password");
      }
    } catch (err) {
      showError("Login failed");
    }
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}