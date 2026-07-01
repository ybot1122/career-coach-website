import Image, { StaticImageData } from "next/image";
import { CoachFullEnum } from "@/types/Coaches";

export default function CoachCard({
  name,
  imageSrc,
  small = false,
}: {
  name: CoachFullEnum;
  imageSrc: StaticImageData;
  small?: boolean;
}) {
  const w = small ? "w-[125px]" : "w-[200px]";
  const h = small ? "h-[125px]" : "h-[200px]";
  return (
    <div className="max-w-[725px] my-2 sm:mx-5">
      <div className={`${w} ${h} overflow-hidden relative`}>
        <Image
          src={imageSrc}
          placeholder="blur"
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
