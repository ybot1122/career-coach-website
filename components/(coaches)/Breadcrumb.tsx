import { CoachEnum } from "@/types/Coaches";
import Link from "next/link";
import Arrow from "@/components/common/Arrow";

export default function Breadcrumb({
  coach,
  testimonial = false,
  product_id,
}: {
  coach: CoachEnum;
  testimonial?: boolean;
  product_id?: string;
  purchase?: boolean;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-row items-center w-full max-w-[1024px] px-[70px] py-5 text-coaching-blue justify-center md:justify-start">
        <Link href="/appointments" className="underline">
          Appointments
        </Link>
        <Arrow />{" "}
        <Link href={`/${coach.toLowerCase()}`} className="underline">
          {coach}
        </Link>
        {product_id && (
          <>
            <Arrow />{" "}
            <Link
              href={`/${coach.toLowerCase()}/${product_id}`}
              className="underline"
            >
              Purchase
            </Link>
          </>
        )}
        {testimonial && (
          <>
            <Arrow />{" "}
            <Link
              href={`/${coach.toLowerCase()}/testimonials`}
              className="underline"
            >
              Testimonials
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
