"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Music } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic input validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      setIsAlertOpen(true);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages from backend
        setError(data.error || "Login failed");
        setIsAlertOpen(true);
        return;
      }

      // Determine redirect based on user role
      const redirectPath = data.user.role === 'artist' 
        ? '/artist/dashboard' 
        : '/dashboard';

      // Redirect to appropriate page
      router.push(redirectPath);
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
      setIsAlertOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <Link href="/" className="inline-block">
              <Music className="h-10 w-10 text-primary" />
            </Link>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
          
          {/* Error Alert Dialog */}
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Login Error</AlertDialogTitle>
                <AlertDialogDescription>
                  {error}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
                Close
              </AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}