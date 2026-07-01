"use client";

import { useFirebase } from "@/context/FirebaseApp";
import Image from "next/image";

export default function ({
  photoUrl,
  displayName,
}: {
  photoUrl?: string | null;
  displayName?: string;
}) {
  const { userProfile } = useFirebase();
  const p = photoUrl === undefined ? userProfile?.photoUrl : photoUrl;
  const n = displayName ?? userProfile?.displayName;

  return (
    <div className="w-32 h-32 rounded-full bg-coaching-gray flex items-center justify-center overflow-hidden mb-2">
      {p ? (
        <Image
          src={p}
          alt={n + " Profile Image"}
          className="w-full h-full object-cover"
          width="256"
          height="256"
        />
      ) : (
        <span className="text-4xl text-coaching-blue">{n?.[0]}</span>
      )}
    </div>
  );
}
