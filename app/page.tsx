import Link from "next/link";
import type { Metadata } from "next";
import handshake from "@/public/home/handshake.png";
import leadership from "@/public/home/leadership.png";
import ribbon from "@/public/home/ribbon.png";
import teamwork from "@/public/home/teamwork.png";
import Image from "next/image";
import WannaChat from "@/components/common/WannaChat";
import CoachesGrid from "@/components/common/CoachesGrid";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "Navigate your journey with finesse. Your first meeting is on us.",
  keywords: ["Coaching", "coaching", "consulting", "software engineering"],
  openGraph: {
    title: "Coaching",
    description:
      "Navigate your journey with finesse. Your first meeting is on us.",
    url: "https://www.coaching.com",
    siteName: "Coaching",
  },
  twitter: {
    title: "Coaching",
    description:
      "Navigate your journey with finesse. Your first meeting is on us.",
    card: "summary",
  },
};

export default async function Home() {
  return (
    <>
      <PageHero
        title="Navigate your journey with finesse"
        subtitle="Your first meeting is on us"
        subtitleLink="/appointments"
      />
      <CoachesGrid linkLabel="Meet " />

      <div className="md:flex bg-coaching-blue text-white py-20 px-10 mt-20 justify-center">
        <h2 className="md:pr-20 pb-10 text-center md:text-right md:w-[325px]">
          Consultation Specialties
        </h2>

        <div className="sectiontext">
          <div className="grid grid-cols-2">
            <h3 className="col-span-2 text-center mb-5 border-b border-t border-white py-5">
              For Individuals
            </h3>

            <div className="col-span-1">
              <p className="px-5 pb-5">Job Application Strategies</p>
              <p className="px-5 pb-5">Resume Development</p>
              <p className="px-5 pb-5">Interviewing</p>
              <p className="px-5">Offer Negotiations</p>
            </div>
            <div className="col-span-1">
              <p className="px-5 pb-5">Career Development &amp; Transitions</p>
              <p className="px-5 pb-5">Growth &amp; Leadership</p>
              <p className="px-5 pb-5">Lifestyle Changes</p>
              <p className="px-5">Accountability</p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <h3 className="col-span-2 text-center mt-10 mb-5 border-b border-t border-white py-5">
              For Businesses
            </h3>

            <div className="col-span-1">
              <p className="px-5 pb-5">Small Business Planning &amp; Launch</p>
              <p className="px-5 pb-5">Management Consulting</p>
              <p className="px-5 pb-5">Website Design &amp; Development</p>
              <p className="px-5">Events</p>
            </div>
            <div className="col-span-1">
              <p className="px-5 pb-5">STEM Education</p>
              <p className="px-5 pb-5">Non-Profit Development</p>
              <p className="px-5 pb-5">Product Management</p>
              <p className="px-5">Customized Solutions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-coaching-blue w-full p-10 md:p-24">
        <h2 className="pb-10  text-center md:w-[420px] mx-auto">
          Why Coaching?
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 text-center max-w-[1240px] mx-auto">
          <div className="col-span-1 p-5">
            <h3>Care</h3>
            <div className="relative w-[50px] mx-auto my-5">
              <Image src={handshake} alt="Care" />
            </div>
            <p>Every person and organization is cared for from day one</p>
          </div>
          <div className="col-span-1 p-5">
            <h3>Excellence</h3>
            <div className="relative w-[50px] mx-auto my-5">
              <Image src={teamwork} alt="Excellence" />
            </div>
            <p>
              We ensure a quality of experience and take pride in doing our work
              with excellence
            </p>
          </div>
          <div className="col-span-1 p-5">
            <h3>Empowerment</h3>
            <div className="relative w-[50px] mx-auto my-5">
              <Image src={leadership} alt="Empowerment" />
            </div>
            <p>
              Our commitment is to empower you and give you all the tools you
              need to succeed
            </p>
          </div>
          <div className="col-span-1 p-5">
            <h3>Authenticity</h3>
            <div className="relative w-[50px] mx-auto my-5">
              <Image src={ribbon} alt="Authenticity" />
            </div>
            <p>
              We take the time to understand every unique situation and provide
              authentic, personalized solutions
            </p>
          </div>
        </div>
      </div>

      <WannaChat />
    </>
  );
}
