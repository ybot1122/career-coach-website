"use client";

import { useEffect, useState } from "react";

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
}

export default function ({
  onPasswordUpdate,
  disabled = false,
}: {
  onPasswordUpdate: (p: string, isValid: boolean, isConfirmed: boolean) => void;
  disabled?: boolean;
}) {
  const [password, setPassword] = useState("");
  const [pCheck, setPCheck] = useState("");
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
    });
  const [isValid, setIsValid] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  useEffect(() => {
    setIsConfirmed(password === pCheck);
  }, [password, pCheck]);

  useEffect(() => {
    const isPasswordValid =
      passwordValidation.length &&
      passwordValidation.uppercase &&
      passwordValidation.lowercase &&
      passwordValidation.number;
    setIsValid(isPasswordValid);
    onPasswordUpdate(password, isPasswordValid, isConfirmed);
  }, [password, passwordValidation, isConfirmed]);

  return (
    <>
      <div>
        <label
          htmlFor="password"
          className="block font-medium text-coaching-blue mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={handlePasswordChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent transition-colors duration-200 ${
            password && !isValid
              ? "border-coaching-red"
              : "border-coaching-dark-gray"
          }`}
          placeholder="Create a password"
          disabled={disabled}
        />
        {password && (
          <ul className="mt-2 ml-5 space-y-1 list-disc">
            <li
              className={`flex items-center text-sm ${
                passwordValidation.length
                  ? "text-coaching-blue"
                  : "text-coaching-red"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  passwordValidation.length
                    ? "bg-coaching-blue"
                    : "bg-coaching-red"
                }`}
              ></span>
              At least 8 characters
            </li>
            <li
              className={`flex items-center text-sm ${
                passwordValidation.uppercase
                  ? "text-coaching-blue"
                  : "text-coaching-red"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  passwordValidation.uppercase
                    ? "bg-coaching-blue"
                    : "bg-coaching-red"
                }`}
              ></span>
              At least one uppercase character
            </li>
            <li
              className={`flex items-center text-sm ${
                passwordValidation.lowercase
                  ? "text-coaching-blue"
                  : "text-coaching-red"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  passwordValidation.lowercase
                    ? "bg-coaching-blue"
                    : "bg-coaching-red"
                }`}
              ></span>
              At least one lowercase character
            </li>
            <li
              className={`flex items-center text-sm ${
                passwordValidation.number
                  ? "text-coaching-blue"
                  : "text-coaching-red"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  passwordValidation.number
                    ? "bg-coaching-blue"
                    : "bg-coaching-red"
                }`}
              ></span>
              At least one number
            </li>
          </ul>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block font-medium text-coaching-blue mb-2"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={pCheck}
          onChange={(e) => setPCheck(e.target.value)}
          required
          className={`w-full px-4 py-3 border ${
            !isConfirmed ? "border-coaching-red" : "border-coaching-dark-gray"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent transition-colors duration-200`}
          placeholder="Re-enter your password"
          disabled={disabled}
        />
        {!isConfirmed && (
          <ul className="mt-2 ml-5 space-y-1 list-disc">
            <li className={`flex items-center text-sm text-coaching-red`}>
              <span
                className={`w-2 h-2 rounded-full mr-2 bg-coaching-red`}
              ></span>
              Passwords Do Not Match
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
