"use client";

import { useFirebase } from "@/context/FirebaseApp";
import React, { useEffect, useState } from "react";
import { sa_event_scheduled } from "@/app/members/(auth_required)/dashboard/sa_event_scheduled";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface ScheduleMeetingProps {
  calendlyUrl?: string;
  meetingId: string;
  stripeProductId: string;
  fetchMeetings: () => Promise<void>;
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({
  calendlyUrl,
  meetingId,
  stripeProductId,
  fetchMeetings,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [viewed, setViewed] = useState(false);
  const { user, userProfile } = useFirebase();

  useEffect(() => {
    async function handleCalendlyEvent(e: MessageEvent) {
      if (
        e.origin === "https://calendly.com" &&
        e.data.event?.startsWith("calendly.")
      ) {
        if (e.data.event === "calendly.page_height") {
          setViewed(true);
        }
        if (e.data.event === "calendly.event_scheduled") {
          const token = await user?.getIdToken();
          if (token) {
            await sa_event_scheduled({
              eventUri: e.data.payload.event.uri,
              firebaseToken: token,
              meetingId,
              stripeProductId,
            });
            fetchMeetings();
          } else {
            throw new Error(
              "No token found, not able to persist calendar event update."
            );
          }
        }
      }
    }
    window.addEventListener("message", handleCalendlyEvent);
    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
    };
  }, [fetchMeetings]);

  useEffect(() => {
    // Check if Calendly script is already loaded
    const scriptId = "calendly-inline-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    const Calendly = (window as any).Calendly;
    if (calendlyUrl && scriptLoaded && Calendly) {
      Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: document.getElementById("calendly-inline-widget"),
        prefill: {
          name: userProfile?.displayName,
          email: userProfile?.email,
        },
        utm: {},
      });
    }
  }, [calendlyUrl, scriptLoaded]);

  if (!calendlyUrl) {
    return null;
  }

  return (
    <>
      {!viewed || !scriptLoaded ? (
        <p className="text-center h-[50px]">
          Calendly is loading... <LoadingSpinner color="text-coaching-blue" />
        </p>
      ) : null}
      <div
        id="calendly-inline-widget"
        className={`w-full h-[600px] overflow-hidden`}
      ></div>
    </>
  );
};

export default ScheduleMeeting;
