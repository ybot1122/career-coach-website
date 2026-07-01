"use server";

import stripe from "@/lib/stripe";

export type PurchaseInfo = {
  productName: string;
  purchaseDate: string; // ISO string
  consultantUid: string;
};

export async function getPurchaseInfo(
  items: { stripeProductId: string; stripeCheckoutSessionId: string }[]
): Promise<Record<string, PurchaseInfo>> {
  try {
    // Retrieve the product and checkout session in parallel
    const promises = items.map((item) => {
      return Promise.all([
        stripe.products.retrieve(item.stripeProductId),
        stripe.checkout.sessions.retrieve(item.stripeCheckoutSessionId),
      ]);
    });

    const results = await Promise.all(promises);

    const purchaseInfo: Record<string, PurchaseInfo> = {};

    results.forEach((result, index) => {
      const [product, session] = result;

      if (!product || !session) {
        throw new Error("Product or session not found");
      }

      if (!product.name) {
        throw new Error("Product name not found");
      }

      console.log(product.metadata);

      purchaseInfo[items[index].stripeCheckoutSessionId] = {
        productName: product.name,
        purchaseDate: (() => {
          const d = new Date(session.created * 1000);
          const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          return d.toLocaleDateString("en-US", options);
        })(),
        consultantUid: product.metadata.consultant_uid,
      };
    });

    return purchaseInfo;
  } catch (error) {
    // Optionally log error
    return {};
  }
}
