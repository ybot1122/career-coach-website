import Button from "@/components/common/Button";
import LoginForm from "@/components/common/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-primary-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-coaching-blue mb-2">Welcome</h1>
          <p className="text-coaching-light-blue">
            Sign in to your Coaching account
          </p>
        </div>
        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
          <LoginForm />
          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-coaching-dark-gray" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-coaching-light-blue">
                  New to Coaching?
                </span>
              </div>
            </div>
          </div>
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <Button type="submit" href="/members/join" variant="secondary">
              Create an Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
