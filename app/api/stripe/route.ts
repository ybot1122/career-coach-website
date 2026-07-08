import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { admins } from "@/types/AdminEmails";
import {
  StripeCheckoutSessionMetadata,
  StripeProductMetadata,
} from "@/types/StripeCheckout";
import { dataConnect } from "@/lib/firebase-admin";
import { MeetingStatus } from "@/types/MeetingStatus";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.arrayBuffer();
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig!,
      endpointSecret
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type !== "checkout.session.completed") {
    return new NextResponse(
      `This endpoint doesn't handle ${event.type} events`,
      { status: 400 }
    );
  }

  const session = event.data.object;
  const sessionMetadata = session.metadata as StripeCheckoutSessionMetadata;
  console.log("Checkout session completed");

  const productMetadata = (
    await stripe.products.retrieve(sessionMetadata.product_id)
  ).metadata as StripeProductMetadata;
  const consultant_uid = productMetadata.consultant_uid;

  console.log(productMetadata);

  const promises = [];
  for (let i = 0; i < parseInt(productMetadata.meeting_count); i++) {
    promises.push(
      dataConnect.insert("Meeting", {
        memberId: sessionMetadata.customer_uid,
        consultantId: consultant_uid,
        stripeCheckoutSessionId: session.id,
        stripeProductId: sessionMetadata.product_id,
        status: MeetingStatus.Unscheduled,
      })

    );
  }

  await Promise.all(promises);

  // Delete coupons that were generated for an admin
  if (
    admins.includes(session.customer_email ?? "") &&
    session.discounts &&
    session.discounts.length > 0
  ) {
    for (const discount of session.discounts) {
      if (
        typeof discount === "object" &&
        "coupon" in discount &&
        discount.coupon
      ) {
        try {
          if (typeof discount.coupon === "string") {
            await stripe.coupons.del(discount.coupon);
          } else {
            await stripe.coupons.del(discount.coupon.id);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
