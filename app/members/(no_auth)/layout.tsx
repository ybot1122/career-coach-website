"use client";

import { useFirebase } from "@/context/FirebaseApp";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/members/dashboard");
    }
  }, [user, router]);

  if (user !== undefined && user !== null) {
    return (
      <div className="text-center">
        <LoadingSpinner color="text-coaching-blue" />
      </div>
    );
  }

  return <>{children}</>;
}
