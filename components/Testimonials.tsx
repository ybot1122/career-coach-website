import { CoachEnum } from "@/types/Coaches";

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
              className="flex flex-col p-5 m-5 lg:p-10 lg:m-10 bg-coaching-gray items-center justify-center text-coaching-blue"
              key={t.id}
            >
              <div className="flex mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-yellow-500"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
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
