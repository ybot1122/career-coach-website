"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFirebase } from "@/context/FirebaseApp";
import MemberProfile from "@/components/members/(auth_required)/dashboard/MemberProfile";
import MeetingsView from "@/components/members/(auth_required)/dashboard/MeetingsView";
import { UserRole } from "@/types/UserRole";
import ConsultantMeetingsView from "@/components/members/(auth_required)/dashboard/ConsultantMeetingsView";

export default function DashboardPage() {
  const { user, userProfile } = useFirebase();

  if (!user) {
    return (
      <div className="text-center">
        <LoadingSpinner color="text-coaching-blue" />
      </div>
    );
  }

  return (
    <>
      <MemberProfile />
      {userProfile?.role === UserRole.Consultant ? (
        <ConsultantMeetingsView />
      ) : (
        <MeetingsView />
      )}
    </>
  );
}
