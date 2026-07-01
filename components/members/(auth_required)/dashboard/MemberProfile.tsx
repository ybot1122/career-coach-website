import Button from "@/components/common/Button";
import ProfileCircle from "@/components/common/ProfileCircle";
import { useFirebase } from "@/context/FirebaseApp";
import { UserRole } from "@/types/UserRole";
import { useRouter } from "next/navigation";

export default function MemberProfile() {
  const { userProfile, auth } = useFirebase();
  const router = useRouter();

  return (
    <div className="mx-auto m-4 lg:m-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
      <h1 className="text-coaching-blue mb-4">
        {userProfile?.displayName}'s Dashboard
      </h1>
      <div className="flex flex-col items-center justify-center mb-6">
        <ProfileCircle />

        {userProfile?.role === UserRole.Consultant && (
          <p className="text-coaching-blue font-semibold">CONSULTANT</p>
        )}
        <p className="text-coaching-blue">{userProfile?.email}</p>
        <div className="flex gap-2 mt-5">
          <Button
            onClick={async () => {
              if (auth) {
                await auth.signOut();
                router.push("/members");
              }
            }}
          >
            Log Out
          </Button>
          <Button href="/members/account">Update Account</Button>
        </div>
      </div>
    </div>
  );
}
