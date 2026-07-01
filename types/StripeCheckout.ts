export type StripeCheckoutSessionMetadata = {
  product: string;
  product_id: string;
  price: string;
  customer_uid: string;
};

export type StripeProductMetadata = {
  calendly_event_type: string;
  meeting_count: string;
  consultant_uid: string;
};
