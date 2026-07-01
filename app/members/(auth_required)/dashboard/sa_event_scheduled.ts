"use server";
import {
  GetMeetingData,
  GetMeetingVariables,
} from "@/dataconnect/connector/generated";
import { adminAuth, dataConnect } from "@/lib/firebase-admin";
import stripe from "@/lib/stripe";
import { MeetingStatus } from "@/types/MeetingStatus";

const CALENDLY_CREDENTIALS = JSON.parse(process.env.CALENDLY_CREDENTIALS!);
if (!CALENDLY_CREDENTIALS.apiKey) {
  throw new Error("Calendly API key not set in environment variables");
}

const getCalendlyEvent = async (eventUri: string) => {
  const response = await fetch(eventUri, {
    headers: {
      Authorization: `Bearer ${CALENDLY_CREDENTIALS.apiKey}`,
    },
  });
  const data = await response.json();
  return data;
};

export async function sa_event_scheduled({
  eventUri,
  firebaseToken,
  meetingId,
  stripeProductId,
}: {
  eventUri: string;
  firebaseToken: string;
  meetingId: string;
  stripeProductId: string;
}) {
  // in parallel: get meeting info, get user info from token, get calendly event info, get calendly event type
  const [meeting, user, event, stripeProduct] = await Promise.all([
    dataConnect.executeGraphqlRead<GetMeetingData, GetMeetingVariables>(
      `
        query GetMeeting($meetingId: UUID!) {
          meeting(id: $meetingId) {
            id
            member {
              id
            }
          }
        }
      `,
      { variables: { meetingId } }
    ),
    adminAuth.verifyIdToken(firebaseToken),
    getCalendlyEvent(eventUri),
    stripe.products.retrieve(stripeProductId),
  ]);

  // check meeting member id matches user id
  if (meeting.data?.meeting?.member?.id !== user.uid) {
    throw new Error("Meeting member id does not match user id");
  }

  // check meeting event_type matches calendly event type
  if (
    event?.resource?.event_type !== stripeProduct.metadata.calendly_event_type
  ) {
    throw new Error(
      "Calendly event type does not match stripe product metadata"
    );
  }

  const startTime = new Date(event?.resource?.start_time).toISOString();
  const endTime = new Date(event?.resource?.end_time).toISOString();

  // update meeting status, start time, and end time
  await dataConnect.executeGraphql(
    `
      mutation UpdateMeetingStatus($meetingId: UUID!, $status: String!, $startTime: Timestamp!, $endTime: Timestamp!, $calendlyEventUri: String!) {
        meeting_update(id: $meetingId, data: { status: $status, startTime: $startTime, endTime: $endTime, calendlyEventUri: $calendlyEventUri })
      }
    `,
    {
      variables: {
        meetingId,
        status: MeetingStatus.Scheduled,
        startTime,
        endTime,
        calendlyEventUri: eventUri,
      },
    }
  );

  return {
    meetingId,
    startTime,
    endTime,
  };
}
