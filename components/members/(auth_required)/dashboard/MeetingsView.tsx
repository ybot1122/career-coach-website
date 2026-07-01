import {
  getPurchaseInfo,
  PurchaseInfo,
} from "@/app/members/(auth_required)/dashboard/sa_get_purchase";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFirebase } from "@/context/FirebaseApp";
import { MeetingsForCurrentUserData } from "@/dataconnect/connector/generated";
import { useCallback, useEffect, useState } from "react";
import MemberMeetingsTable from "@/components/members/(auth_required)/dashboard/MemberMeetingsTable";
import ScheduleMeeting from "./ScheduleMeeting";
import Arrow from "@/components/common/Arrow";

export default function MeetingsView() {
  const { dataConnect, userProfile } = useFirebase();
  const [meetings, setMeetings] = useState<
    | {
        [key: string]: MeetingsForCurrentUserData["meetings"];
      }
    | undefined
  >(undefined);
  const [purchaseInfo, setPurchaseInfo] = useState<
    | {
        [key: string]: PurchaseInfo;
      }
    | undefined
  >(undefined);
  const [meetingInfo, setMeetingInfo] = useState<
    | {
        calendlyUrl: string;
        meetingId: string;
        stripeProductId: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    if (!meetings) {
      return;
    }

    const items = Object.keys(meetings).map((checkoutSessionId) => ({
      stripeProductId: meetings[checkoutSessionId][0].stripeProductId,
      stripeCheckoutSessionId: checkoutSessionId,
    }));

    // TODO: combine purchase info and data connect in a single call
    getPurchaseInfo(items).then((purchaseInfo) => {
      setPurchaseInfo(purchaseInfo);
    });
  }, [meetings]);

  const fetchMeetings = useCallback(async () => {
    const meetings = await dataConnect.meetingsForCurrentUser();

    // Group meetings by stripeCheckoutSessionId
    let meetingsByCheckoutSessionId: {
      [key: string]: MeetingsForCurrentUserData["meetings"];
    } = {};
    if (meetings.data && meetings.data.meetings) {
      meetings.data.meetings.forEach((meeting: any) => {
        const checkoutSessionId = meeting.stripeCheckoutSessionId;
        if (!meetingsByCheckoutSessionId[checkoutSessionId]) {
          meetingsByCheckoutSessionId[checkoutSessionId] = [];
        }

        meetingsByCheckoutSessionId[checkoutSessionId].push(meeting);
      });
    }

    setMeetings(meetingsByCheckoutSessionId);
  }, [dataConnect, userProfile]);

  useEffect(() => {
    fetchMeetings();
  }, [meetingInfo]);

  return (
    <div className="mx-auto m-4 lg:m-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
      {meetings && purchaseInfo ? (
        meetingInfo ? null : (
          <MemberMeetingsTable
            meetings={meetings}
            purchaseInfo={purchaseInfo}
            setMeetingInfo={setMeetingInfo}
            fetchMeetings={fetchMeetings}
          />
        )
      ) : (
        <LoadingSpinner color="text-coaching-blue" />
      )}
      {meetingInfo && (
        <div className="mt-8">
          <button
            className="flex items-center text-coaching-blue hover:underline mb-4 cursor-pointer"
            onClick={() => setMeetingInfo(undefined)}
            type="button"
          >
            <Arrow pointLeft />
            Go back to meetings list
          </button>
          <h3 className="text-coaching-blue mb-4">Schedule Meeting</h3>
          <ScheduleMeeting
            calendlyUrl={meetingInfo.calendlyUrl}
            meetingId={meetingInfo.meetingId}
            stripeProductId={meetingInfo.stripeProductId}
            fetchMeetings={fetchMeetings}
          />
        </div>
      )}
    </div>
  );
}
