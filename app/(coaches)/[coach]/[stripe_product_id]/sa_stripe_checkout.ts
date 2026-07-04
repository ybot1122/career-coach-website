"use server";

import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import { adminAuth } from "@/lib/firebase-admin";
import Stripe from "stripe";
import { admins } from "@/types/AdminEmails";
import { StripeCheckoutSessionMetadata } from "@/types/StripeCheckout";

export async function fetchClientSecret({
  price_id,
  product_id,
  customer_email,
  id_token,
}: {
  price_id: string;
  product_id: string;
  customer_email: string;
  id_token: string;
}): Promise<string> {
  const origin = (await headers()).get("origin");

  const [product, decodedToken] = await Promise.all([
    stripe.products.retrieve(product_id),
    adminAuth.verifyIdToken(id_token),
  ]);

  // Confirm that the user is the one trying to purchase the product
  if (decodedToken.email !== customer_email) {
    throw new Error("Invalid email");
  }

  // Admin accounts get 100% discount coupon for testing purposes
  let coupon: Stripe.Coupon | null = null;
  let afterSubmitMessage =
    "Your meetings will appear in your dashboard after purchase.";
  if (admins.includes(customer_email)) {
    coupon = await stripe.coupons.create({
      percent_off: 100,
      duration: "once",
      max_redemptions: 1,
      redeem_by: Math.floor(Date.now() / 1000) + 10 * 60, // 10 minutes from now
    });
    afterSubmitMessage =
      "As an admin, you have a 100% coupon for testing purposes.";
  }

  const metadata: StripeCheckoutSessionMetadata = {
    product: product.name,
    product_id: product_id,
    price: price_id,
    customer_uid: decodedToken.uid,
  };

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${origin}/members/order_complete?session_id={CHECKOUT_SESSION_ID}`,
    customer_email: customer_email,
    ...(coupon
      ? { discounts: [{ coupon: coupon.id }] }
      : { allow_promotion_codes: true }),
    custom_text: {
      after_submit: {
        message: afterSubmitMessage,
      },
    },
    metadata,
  });

  if (!session.client_secret) {
    throw new Error("Failed to create checkout session");
  }

  return session.client_secret;
}
