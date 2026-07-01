"use server";
import { adminAuth, dataConnect } from "@/lib/firebase-admin";
import stripe from "@/lib/stripe";

type CalendlySchedulingLinkResponse = {
  resource: {
    booking_url: string;
    owner: string;
    owner_type: string;
  };
};

const CALENDLY_CREDENTIALS = JSON.parse(process.env.CALENDLY_CREDENTIALS!);
if (!CALENDLY_CREDENTIALS.clientSecret || !CALENDLY_CREDENTIALS.apiKey) {
  throw new Error("Calendly API key not set in environment variables");
}

export async function sa_get_calendly_link({
  meetingId,
  firebaseToken,
  stripeProductId,
}: {
  meetingId: string;
  firebaseToken: string;
  stripeProductId: string;
}): Promise<CalendlySchedulingLinkResponse["resource"]["booking_url"]> {
  // decode user token
  const decodedToken = await adminAuth.verifyIdToken(firebaseToken);

  // fetch meeting by meeting id, and ensuring the member id equals the decoded token user id
  const meeting = await dataConnect.executeGraphqlRead<
    {
      meetings: {
        id: string;
        memberId: string;
        consultantId: string;
        calendlyScheduleUrl: string | null;
      }[];
    },
    { id: string; memberId: string }
  >(
    `
      query GetMeetingByIdAndMemberId($id: UUID!, $memberId: String!) @auth(level: USER) {
        meetings(limit: 1, where: {id: {eq: $id}, memberId: {eq: $memberId}}) {
          id
          consultantId
          memberId
          calendlyScheduleUrl
        }
      }
    `,
    {
      variables: {
        id: meetingId,
        memberId: decodedToken.uid,
      },
    }
  );

  if (
    !meeting ||
    !meeting.data.meetings ||
    meeting.data.meetings.length === 0
  ) {
    throw new Error("Meeting not found");
  }
  const meetingInfo = meeting.data.meetings[0];

  if (meetingInfo.memberId !== decodedToken.uid) {
    throw new Error("Unauthorized: Invalid Firebase token");
  }

  if (meetingInfo.calendlyScheduleUrl) {
    return meetingInfo.calendlyScheduleUrl;
  }

  // fetch stripe product to get calendly event_type url
  const stripeProduct = await stripe.products.retrieve(stripeProductId);
  const eventTypeUrl = stripeProduct.metadata.calendly_event_type;

  const payload = {
    max_event_count: 1,
    owner: eventTypeUrl,
    owner_type: "EventType",
  };

  // call calendly to generate single user schedule link
  try {
    const res = await fetch("https://api.calendly.com/scheduling_links", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALENDLY_CREDENTIALS.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(res);
      throw new Error("Failed to get Calendly scheduling link");
    }

    const data = await res.json();

    const bookingUrl = data.resource.booking_url;

    // save single use schedule link to database
    await dataConnect.executeGraphql(
      `
        mutation UpdateMeetingCalendlyScheduleUrl($id: UUID!, $calendlyScheduleUrl: String!) @auth(level: USER) {
          meeting_update(id: $id, data: { calendlyScheduleUrl: $calendlyScheduleUrl })
        }
      `,
      {
        variables: {
          id: meetingInfo.id,
          calendlyScheduleUrl: bookingUrl,
        },
      }
    );

    return bookingUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Calendly scheduling link");
  }
}
