"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFirebase } from "@/context/FirebaseApp";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getCheckoutSession } from "./sa_get_checkout_session";
import Button from "@/components/common/Button";
import { StripeCheckoutSessionMetadata } from "@/types/StripeCheckout";

export default function OrderCompletePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id")!;
  const { user, userProfile } = useFirebase();
  const [metadata, setMetadata] = useState<
    StripeCheckoutSessionMetadata | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetails() {
      setLoading(true);
      const token = await user!.getIdToken();
      const session = await getCheckoutSession(sessionId, token);
      setMetadata(session);
      setLoading(false);
    }

    try {
      if (sessionId) {
        fetchOrderDetails();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMetadata(null);
    }
  }, [sessionId]);

  if (loading || metadata === undefined || userProfile === undefined) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner color="text-coaching-blue" />
      </div>
    );
  }

  if (metadata === null) {
    return (
      <div className="max-w-xl mx-auto mt-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray text-center">
        <h1 className="font-bold text-coaching-blue mb-4">Order Not Found</h1>
        <p className="mb-2 text-coaching-blue">
          No order session was found. Please check your link or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray text-center">
      <h1 className="font-bold text-coaching-blue mb-4">Order Complete!</h1>
      <p className="mb-4 text-coaching-blue">
        Thank you,{" "}
        <span className="font-semibold">{userProfile?.displayName}</span>!
      </p>
      <p className="mb-4 text-coaching-blue">
        Your purchase of {metadata.product} is complete.
      </p>
      <p className="mb-6 text-coaching-blue">
        You can now access your meeting links and details in your dashboard.
      </p>
      <div className="flex justify-center">
        <Button href="/members/dashboard" variant="primary">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
