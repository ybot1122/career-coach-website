import { CoachEnum, CoachFullEnum, CoachImages } from "@/types/Coaches";
import CoachCard from "@/components/(coaches)/CoachCard";
import Link from "next/link";
import Image from "next/image";
import linkedInIcon from "@/public/social/linkedin.svg";
import Button from "../common/Button";

export default function CoachBio({
  fullName,
  name,
  linkedIn,
  bio,
}: {
  fullName: CoachFullEnum;
  name: CoachEnum;
  linkedIn: string;
  bio: string[];
}) {
  return (
    <section className="bg-gray w-full px-10 py-5 flex justify-center">
      <article className="flex flex-col md:flex-row items-center md:items-start max-w-[925px] mx-auto">
        <div className="flex flex-col items-center">
          <CoachCard name={fullName} imageSrc={CoachImages[name]} />
          <Link href={linkedIn} target="_blank" className="mt-2">
            <Image
              src={linkedInIcon}
              alt="LinkedIn"
              width="25"
              height="25"
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        <div className="mt-5 md:mt-0 md:ml-8">
          <h1 className="text-coaching-blue font-bold text-center md:text-left">
            Hi, I&apos;m {name}!
          </h1>

          <div className="mt-4">
            {bio.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
            <p className="mb-4">Interested? Schedule a free discovery call!</p>
          </div>

          <div className="mt-10 mb-5 text-center md:text-left">
            <Button
              href={`/${name.toLowerCase()}/testimonials`}
              variant="primary"
            >
              Client Testimonials
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}
