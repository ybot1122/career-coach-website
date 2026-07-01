"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFirebase } from "@/context/FirebaseApp";
import ProfileCircle from "@/components/common/ProfileCircle";
import Button from "@/components/common/Button";
import { useState } from "react";
import ChangePassword from "@/components/members/(auth_required)/account/ChangePassword";
import ChangeProfilePic from "@/components/members/(auth_required)/account/ChangeProfilePic";

type View = "main" | "pic" | "password";

export default function AccountPage() {
  const { user, userProfile } = useFirebase();
  const [view, setView] = useState<View>("main");

  if (!user || !userProfile) {
    return (
      <div className="text-center">
        <LoadingSpinner color="text-coaching-blue" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto m-4 lg:m-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
        <div className="mb-6">
          <Button href="/members/dashboard">← Dashboard</Button>
        </div>
        <div className="flex flex-col items-center justify-center mb-6">
          <ProfileCircle />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button
            onClick={() => setView("password")}
            disabled={view === "password"}
          >
            Change Password
          </Button>
          <Button onClick={() => setView("pic")} disabled={view === "pic"}>
            Change Profile Picture
          </Button>
        </div>
      </div>
      {view !== "main" && (
        <div className="mx-auto m-4 lg:m-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
          {view === "password" && <ChangePassword />}
          {view === "pic" && <ChangeProfilePic />}
          {/* TODO: verify email */}
        </div>
      )}
    </>
  );
}
