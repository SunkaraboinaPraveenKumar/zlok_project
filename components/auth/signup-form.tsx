"use client";

import { useCallback, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const createUser = useMutation(api.auth.createUser);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password") as string;
      const email = formData.get("email") as string;
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;

      const hashedPassword = await bcrypt.hash(password, 10);

      await createUser({
        email,
        hashedPassword,
        name,
        phone,
        role: "user",
      });
      toast.success("Account created successfully!");
      router.push("/auth/signin");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }, [createUser, router]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <Input
        name="name"
        type="text"
        placeholder="Full Name"
        required
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Phone Number"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}