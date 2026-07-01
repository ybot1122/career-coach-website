import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CALENDLY_CREDENTIALS = JSON.parse(process.env.CALENDLY_CREDENTIALS!);
if (!CALENDLY_CREDENTIALS.webhookSigningKey) {
  throw new Error(
    "Calendly Webhook Signature key not set in environment variables"
  );
}

export async function POST(req: NextRequest) {
  // Parse the incoming Calendly webhook payload
  let payload;
  try {
    payload = await req.json();
  } catch (error) {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  // Verify the webhook signature
  const calendlySignature = req.headers.get("Calendly-Webhook-Signature");
  if (!calendlySignature) {
    return new NextResponse("Calendly-Webhook-Signature is required", {
      status: 400,
    });
  }

  console.log("calendlySignature", calendlySignature);

  const webhookSigningKey = CALENDLY_CREDENTIALS.webhookSigningKey;

  const { t, signature } = calendlySignature.split(",").reduce(
    (acc, currentValue) => {
      const [key, value] = currentValue.split("=");

      if (key === "t") {
        // UNIX timestamp
        acc.t = value;
      }

      if (key === "v1") {
        acc.signature = value;
      }

      return acc;
    },
    {
      t: "",
      signature: "",
    }
  );

  if (!t || !signature) throw new Error("Invalid Signature during reduce step");

  // Create the signed payload by concatenating the timestamp (t), the character '.' and the request body's JSON payload.
  const data = t + "." + JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", webhookSigningKey)
    .update(data, "utf8")
    .digest("hex");

  // Determine the expected signature by computing an HMAC with the SHA256 hash function.
  if (expectedSignature !== signature) {
    // Signature is invalid!
    throw new Error("Invalid Signature after crypto step");
  }

  /*
   * Prevent replay attacks
   *
   * If an attacker intercepts the webhook's payload and signature, they could
   * potentially re-transmit the request. This is known as a replay attack. This
   * type of attack can be mitigated by utilizing the timestamp in the
   * Calendly-Webhook-Signature header. In the example below, we set the
   * application's tolerance zone to 3 minutes. This helps mitigate replay attacks
   * by ensuring that requests that have timestamps that are more than 3 minutes old will
   * not be considered valid.
   */
  const threeMinutes = 180000;
  const tolerance = threeMinutes;
  const timestampMilliseconds = Number(t) * 1000;

  if (timestampMilliseconds < Date.now() - tolerance) {
    // Signature is invalid!
    // The signature's timestamp is outside of the tolerance zone defined above.
    throw new Error(
      "Invalid Signature. The signature's timestamp is outside of the tolerance zone."
    );
  }

  // Signature Verification Complete

  // Log the event for debugging
  console.log("Received Calendly webhook:", payload);

  // Respond with 200 OK to acknowledge receipt
  return NextResponse.json({ received: true });
}
