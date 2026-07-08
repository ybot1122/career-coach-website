## Career Coaching Website

In Stripe: Create a product for each meeting type (single 30m, single 60m, package, etc). For each product, also include in the metadata the Calendly event type URL. This will be used to generate scheduling links.

User flow:

1. Click on Coach.
2. Click on desired session to start purchase flow
3. If not logged in, create account or login
4. Begin embedded Stripe checkout flow 
5. Stripe sends webhook event, and we create meetings for the user in the database. These will now show up in their dashboard.
6. When the user wants to use a meeting, they click on it. We generate a one-time Calendly link for them to schedule their meeting. 