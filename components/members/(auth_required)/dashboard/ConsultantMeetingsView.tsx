import {
  getPurchaseInfo,
  PurchaseInfo,
} from "@/app/members/(auth_required)/dashboard/sa_get_purchase";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFirebase } from "@/context/FirebaseApp";
import { MeetingsByConsultantIdData } from "@/dataconnect/connector/generated";
import { useCallback, useEffect, useState } from "react";
import ActiveClients from "./ActiveClients";
import ConsultantMeetingsTable from "./ConsultantMeetingsTable";

export default function ConsultantMeetingsView() {
  const { dataConnect, userProfile } = useFirebase();
  const [meetings, setMeetings] = useState<
    | {
        [key: string]: MeetingsByConsultantIdData["meetings"];
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

    getPurchaseInfo(items).then((purchaseInfo) => {
      setPurchaseInfo(purchaseInfo);
    });
  }, [meetings]);

  const fetchMeetings = useCallback(async () => {
    const meetings = await dataConnect.meetingsByConsultantId({
      consultantId: userProfile?.id!,
    });

    // Group meetings by stripeCheckoutSessionId
    let meetingsByCheckoutSessionId: {
      [key: string]: MeetingsByConsultantIdData["meetings"];
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
    <>
      <div className="mx-auto m-4 lg:m-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
        {meetings && purchaseInfo ? (
          meetingInfo ? null : (
            <ConsultantMeetingsTable
              meetings={meetings}
              purchaseInfo={purchaseInfo}
              fetchMeetings={fetchMeetings}
            />
          )
        ) : (
          <LoadingSpinner color="text-coaching-blue" />
        )}
      </div>
      {meetings && purchaseInfo ? (
        <ActiveClients meetings={meetings} purchaseInfo={purchaseInfo} />
      ) : (
        <LoadingSpinner color="text-coaching-blue" />
      )}
    </>
  );
}
