"use client";

import Button from "@/components/common/Button";
import RegisterForm from "@/components/common/RegisterForm";

export default function JoinPage() {
  return (
    <div className="bg-primary-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-coaching-blue mb-2">Join Coaching</h1>
          <p className="text-coaching-light-blue">
            Create your account to start your journey
          </p>
        </div>
        {/* Sign Up Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
          <RegisterForm />
          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-coaching-dark-gray" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-coaching-light-blue">
                  Already have an account?
                </span>
              </div>
            </div>
          </div>
          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <Button href="/members" variant="secondary">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
