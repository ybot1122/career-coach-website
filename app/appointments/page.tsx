import CoachesGrid from "@/components/common/CoachesGrid";
import { Metadata } from "next";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Coaching - Appointments",
  description:
    "Schedule an appointment with Coaching for coaching and consulting services.",
  keywords: ["appointments", "Coaching", "coaching", "consulting"],
  openGraph: {
    title: "Coaching - Appointments",
    description:
      "Schedule an appointment with Coaching for coaching and consulting services.",
    url: "https://www.coaching.com/appointments",
    siteName: "Coaching",
  },
  twitter: {
    title: "Coaching - Appointments",
    description:
      "Schedule an appointment with Coaching for coaching and consulting services.",
    card: "summary",
  },
};

export default function Appointments() {
  return (
    <>
      <PageHero
        title="Appointments"
        subtitle="Thank you for your interest in working with Coaching!"
        description="Please select the consultant you would like to work with. New here? Get started with a free 30 minute consultation."
      />

      <div className="bg-coaching-blue w-full p-10 md:pt-10 md:pb-10 flex justify-center flex-row items-center mt-20">
        <CoachesGrid linkLabel="Schedule With" textColor="text-white" />
      </div>
    </>
  );
}
