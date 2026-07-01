import WannaChat from "@/components/common/WannaChat";
import type { Metadata } from "next";
import toby from "@/public/coaches/toby.png";
import Link from "next/link";
import Image from "next/image";
import FAQ from "@/components/about/FAQ";
import CoachesGrid from "@/components/common/CoachesGrid";

export const metadata: Metadata = {
  title: "Coaching - About",
  description:
    "Learn about Coaching, a consulting firm that provides personalized coaching and consulting services to individuals and businesses.",
  keywords: [
    "Coaching",
    "consulting",
    "coaching",
    "personalized solutions",
    "business consulting",
    "individual coaching",
    "career development",
    "life coaching",
    "professional development",
  ],
  openGraph: {
    title: "Coaching - About",
    description:
      "Learn about Coaching, a consulting firm that provides personalized coaching and consulting services to individuals and businesses.",
    url: "https://www.coaching.com/about",
    siteName: "Coaching",
  },
  twitter: {
    title: "Coaching - About",
    description:
      "Learn about Coaching, a consulting firm that provides personalized coaching and consulting services to individuals and businesses.",
    card: "summary",
  },
};

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-coaching-gray w-full p-5 md:p-10 xl:p-15 flex justify-center flex-wrap md:flex-row-reverse">
        <div className="bg-coaching-gray w-full p-5 md:p-10 xl:p-15 flex justify-center flex-wrap md:flex-row-reverse">
          <div className="w-full md:w-1/2 max-w-[620px] h-[50vw] max-h-[420px]">
            <div className="relative w-full h-full">
              <Image
                src={toby}
                alt="Toby"
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>
          </div>
          <div className="bg-white p-10 text-coaching-blue w-full md:w-1/2 lg:p-20 max-w-[620px]">
            <h1 className="mb-5">Welcome!</h1>
            <p className="mb-3 leading-8">
              I founded Coaching with a simple intention: to be the steady
              partner people and organizations can turn to when they need
              clarity, momentum, and thoughtful guidance.
            </p>
            <p className="mb-3 leading-8">
              Our team brings together coaches and consultants who care deeply
              about helping others grow, whether that means navigating a career
              transition, strengthening a team, or building a business with
              purpose.
            </p>
            <p className="mb-3 leading-8">
              We believe strong relationships start with listening. Every
              engagement is shaped around the people involved, with practical
              insight, genuine care, and a commitment to results that feel
              meaningful and lasting.
            </p>
            <p className="mb-3 leading-8">
              Thanks for stopping by. If you&apos;re looking for support,
              perspective, or a fresh start, I&apos;d love to connect.
            </p>
            <p className="mb-3 leading-8">
              <Link href="/toby">— Toby</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-coaching-blue text-white w-full p-10 md:pt-10 md:pb-10 flex justify-center flex-row items-center flex-wrap">
        <h2 className="text-white text-center my-10 w-full flex-grow">
          The Coaching Team
        </h2>
        <CoachesGrid linkLabel="" useFullName textColor="text-white" />
      </div>
      <FAQ />
      <WannaChat />{" "}
    </div>
  );
}
