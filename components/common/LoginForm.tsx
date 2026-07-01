"use client";

import { useState, useTransition } from "react";
import Button from "@/components/common/Button";
import { useFirebase } from "@/context/FirebaseApp";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { auth } = useFirebase();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!auth) {
      setError(`Something went wrong. Please refresh the page or contact us.`);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        if (onSuccess) onSuccess();
      } catch (e: any) {
        let errorMessage = "An error occurred during sign in.";
        if (e.code === "auth/user-not-found") {
          errorMessage = "No account found with this email address.";
        } else if (e.code === "auth/wrong-password") {
          errorMessage = "Incorrect password.";
        } else if (e.code === "auth/invalid-credential") {
          errorMessage = "Invalid email or password.";
        } else if (e.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        } else if (e.code === "auth/too-many-requests") {
          errorMessage = "Too many failed attempts. Please try again later.";
        } else if (e.code === "auth/configuration-not-found") {
          errorMessage =
            "Authentication service is not properly configured. Please contact support.";
        } else if (e.message) {
          errorMessage =
            "Something went wrong. Please refresh the page or contact us.";
        }
        setError(errorMessage);
      }
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block font-medium text-coaching-blue mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 border border-coaching-dark-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent transition-colors duration-200"
          placeholder="Enter your email"
          disabled={isPending}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block font-medium text-coaching-blue mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 border border-coaching-dark-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent transition-colors duration-200"
          placeholder="Enter your password"
          disabled={isPending}
        />
      </div>
      {error && <div className="text-coaching-red text-center">{error}</div>}
      <div>
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </div>
      {/* TODO: forgot password */}
    </form>
  );
}
