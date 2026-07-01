"use client";

import { useFirebase } from "@/context/FirebaseApp";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInitialized, error: firebaseError, user } = useFirebase();

  // Show loading state while Firebase initializes
  if (!isInitialized || user === undefined) {
    return (
      <div className="text-center">
        <LoadingSpinner color="text-coaching-blue" />
      </div>
    );
  }

  // Show error state if Firebase failed to initialize
  if (firebaseError) {
    return (
      <div className="text-center">
        <p className="text-coaching-blue mb-4">
          Something went wrong. Please refresh the page or contact us.
        </p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }

  // Render children if Firebase is ready
  return children;
}
