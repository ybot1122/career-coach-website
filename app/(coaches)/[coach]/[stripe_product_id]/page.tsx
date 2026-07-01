import { CoachEnum } from "@/types/Coaches";
import Breadcrumb from "@/components/(coaches)/Breadcrumb";
import MemberPurchase from "@/components/(coaches)/MemberPurchase";
import stripe from "@/lib/stripe";

interface CoachProductPageProps {
  params: Promise<{
    coach: string;
    stripe_product_id: string;
  }>;
}

export default async function CoachProductPage({
  params,
}: CoachProductPageProps) {
  const { coach, stripe_product_id } = await params;

  let product: any = null;
  try {
    product = await stripe.products.retrieve(stripe_product_id);
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-coaching-blue mb-4">Product Not Found</h1>
        </div>
      </div>
    );
  }

  if (!stripe_product_id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-coaching-blue mb-4">
            The product ID provided is invalid.
          </h1>
        </div>
      </div>
    );
  }

  const defaultPriceId = product.default_price;

  // Get coach from product metadata
  const coachName = product.metadata?.coach || coach;
  const coachKey = Object.values(CoachEnum).find(
    (c) => c.toLowerCase() === coachName.toLowerCase()
  ) as CoachEnum | undefined;

  if (!coachKey) {
    return <div>Coach not found. Product is misconfigured.</div>;
  }

  return (
    <div className="min-h-screen bg-primary-background">
      <Breadcrumb
        coach={CoachEnum[coachKey]}
        product_id={stripe_product_id}
        purchase={true}
      />
      <div className="max-w-6xl mx-auto px-5 pb-10">
        <MemberPurchase
          price_id={defaultPriceId}
          product_name={product.name}
          product_id={stripe_product_id}
        />
      </div>
    </div>
  );
}
