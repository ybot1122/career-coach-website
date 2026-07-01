import Link from "next/link";
import Image from "next/image";
import {
  CoachAppointmentsPage,
  CoachEnum,
  CoachFullEnum,
  CoachImages,
} from "@/types/Coaches";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ({
  linkLabel,
  useFullName = false,
  textColor = "text-coaching-blue",
}: {
  linkLabel: string;
  useFullName?: boolean;
  textColor?: "text-coaching-blue" | "text-white";
}) {
  return (
    <div
      className={`${textColor} flex flex-col sm:flex-row justify-center items-center text-center`}
    >
      <_AppointmentsCard
        href={CoachAppointmentsPage[CoachEnum.Toby]}
        imgSrc={CoachImages[CoachEnum.Toby]}
        coachName={useFullName ? CoachFullEnum.Toby : CoachEnum.Toby}
        linkLabel={linkLabel}
      />
      <_AppointmentsCard
        href={CoachAppointmentsPage[CoachEnum.Tom]}
        imgSrc={CoachImages[CoachEnum.Tom]}
        coachName={useFullName ? CoachFullEnum.Tom : CoachEnum.Tom}
        linkLabel={linkLabel}
      />
      <_AppointmentsCard
        href={CoachAppointmentsPage[CoachEnum.David]}
        imgSrc={CoachImages[CoachEnum.David]}
        coachName={useFullName ? CoachFullEnum.David : CoachEnum.David}
        linkLabel={linkLabel}
      />
    </div>
  );
}

const _AppointmentsCard = ({
  href,
  imgSrc,
  coachName,
  linkLabel,
}: {
  href: string;
  imgSrc: StaticImport;
  coachName: CoachEnum | CoachFullEnum;
  linkLabel: string;
}) => {
  return (
    <div className="flex flex-col items-center max-w-[725px] my-5 sm:mx-5">
      <div className="w-[200px] h-[200px] overflow-hidden relative rounded-lg bg-coaching-gray">
        <Link href={href} className="block group w-full h-full">
          <Image
            src={imgSrc}
            placeholder="blur"
            alt={coachName}
            className="transition-transform duration-300 group-hover:scale-105 w-full h-full"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            fill
          />
        </Link>
      </div>
      <h3 className="mt-5">
        <Link
          href={href}
          className="hover:text-coaching-light-blue transition-colors duration-200 font-medium"
        >
          {linkLabel} {coachName}
        </Link>
      </h3>
    </div>
  );
};
