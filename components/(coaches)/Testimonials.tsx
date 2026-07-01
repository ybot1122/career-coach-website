import { CoachEnum } from "@/types/Coaches";
import Star from "../common/Star";

interface Testimonial {
  id: string;
  from: string;
  message: string[];
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  name: CoachEnum;
}

export default function Testimonials({
  testimonials,
  name,
}: TestimonialsProps) {
  return (
    <>
      <div className={"max-w-[1020px] block mx-auto"}>
        {testimonials.map((t, ind) => {
          return (
            <div
              className="flex flex-col p-5 m-5 lg:p-10 lg:m-10 bg-white items-center justify-center text-coaching-blue"
              key={t.id}
            >
              <div className="flex mb-5">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              {t.message.map((msg, index) => (
                <p className="w-full my-5 text-center" key={index}>
                  {index === 0 ? "“" : ""}
                  {msg}
                  {index === t.message.length - 1 ? "”" : ""}
                </p>
              ))}
              {t.from ? <p className="mt-5">{t.from}</p> : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
