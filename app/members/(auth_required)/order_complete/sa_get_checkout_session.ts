"use server";

import stripe from "@/lib/stripe";
import { adminAuth } from "@/lib/firebase-admin";
import { StripeCheckoutSessionMetadata } from "@/types/StripeCheckout";

/**
 * Gets a Stripe Checkout Session by its ID, verifying the user by Firebase ID token.
 * @param session_id The ID of the Stripe Checkout Session.
 * @param id_token The Firebase ID token for authentication.
 * @returns The Stripe Checkout Session object, or throws if not authorized.
 */
export async function getCheckoutSession(
  session_id: string,
  id_token: string
): Promise<StripeCheckoutSessionMetadata> {
  if (!session_id) {
    throw new Error("Session ID is required");
  }
  if (!id_token) {
    throw new Error("Firebase ID token is required");
  }
  let decodedToken;
  try {
    decodedToken = await adminAuth.verifyIdToken(id_token);
  } catch (error) {
    throw new Error("Invalid Firebase ID token");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session.customer_email) {
      throw new Error("Stripe session does not have a customer email");
    }

    if (decodedToken.email !== session.customer_email) {
      throw new Error("Authenticated user does not match order email");
    }

    if (!session.metadata) {
      throw new Error("Stripe session does not have metadata");
    }

    return { ...session.metadata } as StripeCheckoutSessionMetadata;
  } catch (error) {
    // Optionally log error here
    throw error;
  }
}
