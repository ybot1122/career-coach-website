import Breadcrumb from "@/components/(coaches)/Breadcrumb";
import { Inquiry, Packages } from "@/components/(coaches)/CardSections";
import {
  CoachEnum,
  CoachFreeConsultationLinks,
  CoachFullEnum,
} from "@/types/Coaches";
import {
  DAVID_4_SESSION,
  DAVID_12_SESSION,
  DAVID_12_SESSION_LITE,
  TOM_4_SESSION,
  TOM_12_SESSION,
  TOM_12_SESSION_LITE,
  TOBY_4_SESSION,
  TOBY_12_SESSION,
  TOBY_12_SESSION_LITE,
  TOBY_SINGLE_60M_SESSION,
  TOBY_SINGLE_30M_SESSION,
  DAVID_SINGLE_30M_SESSION,
  DAVID_SINGLE_60M_SESSION,
  TOM_SINGLE_30M_SESSION,
  TOM_SINGLE_60M_SESSION,
} from "@/types/StripeProducts";
import CoachBio from "@/components/(coaches)/CoachBio";
import Tabs from "@/components/(coaches)/Tabs";
import { notFound } from "next/navigation";

// Coach data mappings
const coachData = {
  toby: {
    enum: CoachEnum.Toby,
    fullEnum: CoachFullEnum.Toby,
    linkedIn: "https://www.linkedin.com/",
    bio: [
      "I started Coaching with a simple goal: to help people and organizations move through work and life with more clarity, confidence, and intention.",
      "Over the years, I’ve worked across business, nonprofit, and technology settings, guiding clients through career growth, leadership development, small business strategy, and education-focused support.",
      "My approach is grounded in listening closely, asking thoughtful questions, and creating practical next steps that feel both meaningful and achievable.",
    ],
    inquiryLinks: {
      firstTimeLink: CoachFreeConsultationLinks[CoachEnum.Toby],
      single30MinLink: `/toby/${TOBY_SINGLE_30M_SESSION}`,
      single60MinLink: `/toby/${TOBY_SINGLE_60M_SESSION}`,
    },
    packageLinks: {
      starterLink: `/toby/${TOBY_4_SESSION}`,
      premiumLink: `/toby/${TOBY_12_SESSION}`,
      liteLink: `/toby/${TOBY_12_SESSION_LITE}`,
    },
  },
  tom: {
    enum: CoachEnum.Tom,
    fullEnum: CoachFullEnum.Tom,
    linkedIn: "https://www.linkedin.com/",
    bio: [
      "Tom Brady is known for a career built on discipline, preparation, and staying calm under pressure.",
      "He has spent years mastering the habits that turn talent into lasting performance, from consistent practice to focused recovery and resilient leadership.",
      "His story is a reminder that excellence is rarely accidental—it comes from deliberate effort, strong habits, and the courage to keep showing up.",
    ],
    inquiryLinks: {
      firstTimeLink: CoachFreeConsultationLinks[CoachEnum.Tom],
      single30MinLink: `/tom/${TOM_SINGLE_30M_SESSION}`,
      single60MinLink: `/tom/${TOM_SINGLE_60M_SESSION}`,
    },
    packageLinks: {
      starterLink: `/tom/${TOM_4_SESSION}`,
      premiumLink: `/tom/${TOM_12_SESSION}`,
      liteLink: `/tom/${TOM_12_SESSION_LITE}`,
    },
  },
  david: {
    enum: CoachEnum.David,
    fullEnum: CoachFullEnum.David,
    linkedIn: "https://www.linkedin.com",
    bio: [
      "David Beckham is widely recognized for combining elite performance with a global mindset and a natural ability to inspire others.",
      "His career has been shaped by adaptability, teamwork, and the discipline to grow through both success and setbacks.",
      "He represents the kind of leadership that blends confidence, humility, and a long-term view of personal and professional growth.",
    ],
    inquiryLinks: {
      firstTimeLink: CoachFreeConsultationLinks[CoachEnum.David],
      single30MinLink: `/david/${DAVID_SINGLE_30M_SESSION}`,
      single60MinLink: `/david/${DAVID_SINGLE_60M_SESSION}`,
    },
    packageLinks: {
      starterLink: `/david/${DAVID_4_SESSION}`,
      premiumLink: `/david/${DAVID_12_SESSION}`,
      liteLink: `/david/${DAVID_12_SESSION_LITE}`,
    },
  },
};

interface CoachPageProps {
  params: Promise<{
    coach: string;
  }>;
}

export default async function CoachPage({ params }: CoachPageProps) {
  const resolvedParams = await params;
  const coachKey = resolvedParams.coach.toLowerCase() as keyof typeof coachData;
  const coach = coachData[coachKey];

  if (!coach) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Breadcrumb coach={coach.enum} />
      <CoachBio
        name={coach.enum}
        fullName={coach.fullEnum}
        linkedIn={coach.linkedIn}
        bio={coach.bio}
      />
      <Tabs
        InquiryComponent={
          <Inquiry
            firstTimeLink={coach.inquiryLinks.firstTimeLink}
            single30MinLink={coach.inquiryLinks.single30MinLink}
            single60MinLink={coach.inquiryLinks.single60MinLink}
          />
        }
        PackagesComponent={
          <Packages
            starterLink={coach.packageLinks.starterLink}
            premiumLink={coach.packageLinks.premiumLink}
            liteLink={coach.packageLinks.liteLink}
          />
        }
      />
    </main>
  );
}
