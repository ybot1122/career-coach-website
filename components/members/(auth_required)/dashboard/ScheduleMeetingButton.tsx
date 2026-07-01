"use client";

import { sa_get_calendly_link } from "@/app/members/(auth_required)/dashboard/sa_get_calendly_link";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFirebase } from "@/context/FirebaseApp";
import { useState } from "react";

export default function ({
  meetingId,
  stripeProductId,
  calendlyScheduleUrl,
  setMeetingInfo,
}: {
  meetingId: string;
  stripeProductId: string;
  calendlyScheduleUrl: string | null;
  setMeetingInfo: ({
    calendlyUrl,
    meetingId,
    stripeProductId,
  }: {
    calendlyUrl: string;
    meetingId: string;
    stripeProductId: string;
  }) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useFirebase();

  return (
    <Button
      onClick={async () => {
        if (!calendlyScheduleUrl) {
          setIsLoading(true);
          const firebaseToken = await user?.getIdToken()!;
          const scheduleUrl = await sa_get_calendly_link({
            meetingId,
            firebaseToken,
            stripeProductId,
          });
          setIsLoading(false);
          setMeetingInfo({
            calendlyUrl: scheduleUrl,
            meetingId: meetingId,
            stripeProductId: stripeProductId,
          });
        } else {
          setMeetingInfo({
            calendlyUrl: calendlyScheduleUrl,
            meetingId: meetingId,
            stripeProductId: stripeProductId,
          });
        }
      }}
    >
      {isLoading ? <LoadingSpinner /> : "Schedule"}
    </Button>
  );
}
