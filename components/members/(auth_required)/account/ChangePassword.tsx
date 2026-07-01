import Button from "@/components/common/Button";
import PasswordInput from "@/components/common/PasswordInput";
import { useFirebase } from "@/context/FirebaseApp";
import { EmailAuthProvider, updatePassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { reauthenticateWithCredential } from "firebase/auth";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function () {
  const { auth, user } = useFirebase();
  const [passwordState, setPasswordState] = useState<{
    password: string;
    isValid: boolean;
    isConfirmed: boolean;
  }>({
    password: "",
    isValid: false,
    isConfirmed: false,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onPasswordUpdate = useCallback(
    (p: string, isValid: boolean, isConfirmed: boolean) => {
      setPasswordState({
        password: p,
        isValid,
        isConfirmed,
      });
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setFormError(null);
      setIsLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);
      const currentPassword = formData.get("currentPassword") as string;
      const newPassword = passwordState.password;

      if (!passwordState.isValid || !passwordState.isConfirmed) {
        setFormError("New password is not valid.");
      }

      // validate current password
      const credential = EmailAuthProvider.credential(
        user!.email!,
        currentPassword
      );

      try {
        const reauth = await reauthenticateWithCredential(user!, credential);
        console.log(reauth);

        const update = await updatePassword(user!, newPassword);
        console.log(update);

        setSuccess(true);
      } catch (e) {
        console.log(e);
        setFormError("The password you provided is incorrect.");
      } finally {
        setIsLoading(false);
      }
    },
    [passwordState]
  );

  return (
    <>
      <div className="flex items-center mb-6">
        <h3 className="text-coaching-blue">Change Password</h3>
      </div>
      {success ? (
        <div>Password updated successfully.</div>
      ) : (
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-coaching-blue mb-2"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 border border-coaching-dark-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent transition-colors duration-200"
              placeholder="Enter your password"
            />
          </div>
          <PasswordInput onPasswordUpdate={onPasswordUpdate} />
          <div className="pt-4">
            <Button
              type="submit"
              disabled={
                !passwordState.isConfirmed ||
                !passwordState.isValid ||
                isLoading
              }
            >
              {isLoading ? <LoadingSpinner /> : "Update Password"}
            </Button>
          </div>
          {formError && <div className="text-coaching-red">{formError}</div>}
        </form>
      )}
    </>
  );
}
