"use client";

import Button from "@/components/common/Button";
import { useState, useTransition } from "react";
import { registerUser } from "@/app/members/(no_auth)/join/registerUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "@/context/FirebaseApp";
import Link from "next/link";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { auth, dataConnect, loadUserProfile } = useFirebase();

  const handleAction = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await registerUser(formData, auth!, dataConnect);
      if (result?.error) {
        setError(result.error);
      } else {
        await signInWithEmailAndPassword(
          auth!,
          result.email!,
          result.password!
        );
        await loadUserProfile?.();
      }
    });
  };

  return (
    <form className="space-y-6" action={handleAction}>
      <div>
        <label
          htmlFor="name"
          className="block font-medium text-coaching-blue mb-2"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="w-full px-4 py-3 border border-coaching-dark-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent transition-colors duration-200"
          placeholder="Enter your full name"
          disabled={isPending}
        />
      </div>
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
      <PasswordInput
        disabled={isPending}
        onPasswordUpdate={(p: string, isValid: boolean, isConfirmed) => {
          setPassword(p);
          setIsPasswordValid(isValid && isConfirmed);
        }}
      />
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-coaching-blue focus:ring-coaching-blue border-coaching-dark-gray rounded"
          disabled={isPending}
        />
        <label htmlFor="terms" className="ml-2 block text-coaching-blue">
          I agree to the
          <Link
            href="/termsofservice"
            className="text-coaching-blue underline ml-1"
          >
            Terms of Service
          </Link>{" "}
          and
          <Link
            href="/privacypolicy"
            className="text-coaching-blue underline ml-1"
          >
            Privacy Policy
          </Link>
        </label>
      </div>
      {error && (
        <p className="border border-coaching-red rounded-lg p-3">{error}</p>
      )}
      <div>
        <Button
          type="submit"
          variant="primary"
          disabled={isPending || Boolean(password && !isPasswordValid)}
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
