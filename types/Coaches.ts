import toby from "@/public/coaches/toby.png";
import tom from "@/public/coaches/tom.jpg";
import david from "@/public/coaches/david.jpg";
import { StaticImageData } from "next/image";

export enum CoachEnum {
  Toby = "Toby",
  Tom = "Tom",
  David = "David",
}

export enum CoachFullEnum {
  Toby = "Toby Liu",
  Tom = "Tom Brady",
  David = "David Beckham",
}

export const CoachImages: Record<CoachEnum, StaticImageData> = {
  [CoachEnum.Toby]: toby,
  [CoachEnum.Tom]: tom,
  [CoachEnum.David]: david,
};

export const CoachAppointmentsPage: Record<CoachEnum, string> = {
  [CoachEnum.Toby]: "/toby",
  [CoachEnum.Tom]: "/tom",
  [CoachEnum.David]: "/david",
};

export const CoachEmails: Record<CoachEnum, string> = {
  [CoachEnum.Toby]: "ybot1122@gmail.com",
  [CoachEnum.Tom]: "tom.brady@gmail.com",
  [CoachEnum.David]: "david.beckham@gmail.com",
};

export const CoachFreeConsultationLinks: Record<CoachEnum, string> = {
  [CoachEnum.Toby]: "tbd",
  [CoachEnum.Tom]: "tbd",
  [CoachEnum.David]: "tbd",
};
