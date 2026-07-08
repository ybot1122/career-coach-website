"use client";

import { useFirebase } from "@/context/FirebaseApp";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userProfile, loadUserProfile } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/members");
    }
  }, [user, userProfile, router, loadUserProfile]);

  useEffect(() => {
    loadUserProfile?.();
  }, [loadUserProfile]);

  if (user === null || user === undefined || userProfile === undefined) {
    return (
      <div className="text-center">
        <LoadingSpinner color="text-coaching-blue" />
      </div>
    );
  }

  if (userProfile === null) {
    return (
      <div className="text-center">
        Failed to load user profile. Try reloading.
      </div>
    );
  }

  // Render children if Firebase is ready
  return <>{children}</>;
}
