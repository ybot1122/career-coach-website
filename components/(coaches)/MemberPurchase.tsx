"use client";

import { useFirebase } from "@/context/FirebaseApp";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { fetchClientSecret } from "@/app/(coaches)/[coach]/[stripe_product_id]/sa_stripe_checkout";
import LoginForm from "@/components/common/LoginForm";
import RegisterForm from "@/components/common/RegisterForm";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface MemberPurchaseProps {
  price_id: string;
  product_name: string;
  product_id: string;
}

export default function MemberPurchase({
  price_id,
  product_name,
  product_id,
}: MemberPurchaseProps) {
  const { user, userProfile } = useFirebase();
  const [activeTab, setActiveTab] = useState("login");

  if (user === undefined) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner color="text-coaching-blue" />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-coaching-blue mb-4">
        {userProfile?.displayName
          ? `Hello, ${userProfile.displayName}!`
          : "Hello"}
      </h2>
      <h3 className="mb-4">
        Thank you for your interest in{" "}
        <span className="font-bold">{product_name}</span>.
      </h3>
      {user ? (
        <h3>
          Please continue to checkout with Stripe. Your meeting links will
          appear in your dashboard after purchase.
        </h3>
      ) : (
        <h3>
          Please sign in or create an account to continue checking out. Your
          meeting links will appear in your Coaching dashboard after purchase.
        </h3>
      )}

      {user && (
        <div className="my-6 bg-coaching-blue p-4" id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{
              fetchClientSecret: async () =>
                fetchClientSecret({
                  price_id,
                  customer_email: user.email!,
                  id_token: await user.getIdToken(),
                  product_id,
                }),
            }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )}

      {!user && (
        <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
          <div className="flex justify-center mb-6 gap-2">
            <Button
              variant={activeTab === "login" ? "primary" : "white"}
              onClick={() => setActiveTab("login")}
              type="button"
            >
              Sign In
            </Button>
            <Button
              variant={activeTab === "register" ? "primary" : "white"}
              onClick={() => setActiveTab("register")}
              type="button"
            >
              Create Account
            </Button>
          </div>
          <div>{activeTab === "login" ? <LoginForm /> : <RegisterForm />}</div>
        </div>
      )}
    </>
  );
}
