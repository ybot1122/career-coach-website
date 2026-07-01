import Link from "next/link";
import Carousel from "@/components/services/Carousel";
import { CoachEnum, CoachFreeConsultationLinks } from "@/types/Coaches";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Coaching - Services",
  description:
    "Explore Coaching's consulting services for individuals and businesses. Discover customized solutions to help you achieve your goals.",
  keywords: [
    "services",
    "Coaching",
    "consulting",
    "business solutions",
    "individual coaching",
    "customized consulting",
    "digital transformation",
    "STEM education",
    "non-profit development",
    "product management",
  ],
  openGraph: {
    title: "Coaching - Services",
    description:
      "Explore Coaching's consulting services for individuals and businesses. Discover customized solutions to help you achieve your goals.",
    url: "https://www.coaching.com/services",
    siteName: "Coaching",
  },
  twitter: {
    title: "Coaching - Services",
    description:
      "Explore Coaching's consulting services for individuals and businesses. Discover customized solutions to help you achieve your goals.",
    card: "summary",
  },
};

export default function Services() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="Coaching offers a wide range of consulting services for individuals and businesses."
        description="Don't see what you're looking for? We also customize offerings to match your needs."
      />

      <div className="bg-coaching-blue w-full text-white px-5 mt-20">
        <h2 className="text-center pb-5 pt-10">For Businesses</h2>
        <div className="max-w-[725px] mx-auto">
          <p>
            Coaching develops customized business and technical solutions from
            small businesses to academic institutions, nonprofits and
            corporations.
          </p>
          <p className="mt-5">
            To get started, schedule a{" "}
            <Link
              href={CoachFreeConsultationLinks[CoachEnum.Toby]}
              className="underline"
            >
              free 30 minute consultation
            </Link>{" "}
            or send an{" "}
            <Link href="/contact" className="underline">
              inquiry message
            </Link>
            .
          </p>
        </div>

        <div className="w-[90%] pb-20 pt-10 px-15 mx-auto">
          <Carousel
            items={[
              "Small Business Planning & Launch",
              "Digital Transformation",
              "Website Design & Development",
              "Product Management",
              "STEM Education & Curriculum development",
              "Non-profit development",
              "Event Speaking",
              "Customized Solutions",
            ]}
            isBlueButton={false}
          />
        </div>
      </div>

      <div className="bg-coaching-gray w-full px-5 text-coaching-blue">
        <h2 className="text-center pb-5 pt-10">For Individuals</h2>
        <div className="max-w-[725px] mx-auto">
          <p>
            From discovering your career path to job searching, transitioning
            roles, growing within your field or starting a new business,
            Coaching has got you covered.
          </p>
          <p className="mt-5">
            Although we offer specific services, our goal is to partner with you
            as you navigate different phases of your journey.
          </p>
          <p className="mt-5">
            First time here?{" "}
            <Link
              href={CoachFreeConsultationLinks[CoachEnum.Toby]}
              className="underline"
            >
              Book a free consultation
            </Link>
          </p>
        </div>

        <div className="w-[90%] pb-20 pt-10 px-15 mx-auto">
          <Carousel
            isBlueButton={true}
            items={[
              "Job Application Strategies",
              "Resume Development",
              "Interviewing",
              "Offer Negotiations",
              "Career Development & Transitions",
              "Growth & Leadership",
              "Lifestyle changes",
              "Accountability",
            ]}
          />
        </div>
      </div>
    </>
  );
}
