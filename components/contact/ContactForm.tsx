"use client";

import { useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Button from "@/components/common/Button";
import { submitContactForm } from "@/app/contact/sa_submitContactForm";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  services?: string;
  generic?: string;
}

interface ServiceCheckboxProps {
  name: string;
  label: string;
}

function ServiceCheckbox({ name, label }: ServiceCheckboxProps) {
  return (
    <label className="cursor-pointer flex items-center mb-5 text-coaching-blue">
      <input
        type="checkbox"
        name={name}
        className="w-[16px] h-[16px] mr-3 align-middle border border-coaching-dark-gray"
      />
      <span className="align-middle">{label}</span>
    </label>
  );
}

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
  error?: string;
}

function TextInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  error,
}: TextInputProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent";
  const errorClasses = "border-coaching-red focus:ring-coaching-red";
  const normalClasses = "border-coaching-dark-gray";

  const inputClassName = `${baseClasses} ${
    error ? errorClasses : normalClasses
  }`;

  return (
    <div>
      <label htmlFor={id} className="block font-medium text-coaching-blue mb-2">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={inputClassName}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};

    // Validate required fields
    if (!formData.get("firstName")?.toString().trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.get("lastName")?.toString().trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.get("email")?.toString().trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.get("email")?.toString() || ""
      )
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.get("message")?.toString().trim()) {
      newErrors.message = "Message is required";
    }

    // Validate that at least one service is selected
    const hasServiceSelected =
      formData.get("coachingServices") ||
      formData.get("consulting") ||
      formData.get("speakingRequest") ||
      formData.get("collaborations") ||
      formData.get("somethingElse");

    if (!hasServiceSelected) {
      newErrors.services = "Please select at least one service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);

    if (validateForm(formDataObj)) {
      const result = await submitContactForm(formDataObj);

      if (result.success) {
        setIsSuccess(true);
        setErrors({});
      } else {
        setErrors({
          generic: result.error || "An error occurred. Please try again.",
        });
      }
    }

    setIsSubmitted(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
      {isSuccess ? (
        <h3 className="text-coaching-blue mb-6 text-center">
          Thank you for your message! We'll get back to you soon.
        </h3>
      ) : (
        <>
          <h3 className="text-coaching-blue mb-6">Send us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="Your first name"
                required
                error={errors.firstName}
              />
              <TextInput
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Your last name"
                required
                error={errors.lastName}
              />
            </div>

            <TextInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              required
              error={errors.email}
            />

            <TextInput
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
            />

            <div
              className={
                errors.services
                  ? "border border-coaching-red rounded-lg p-4"
                  : ""
              }
            >
              <legend className="text-coaching-blue font-medium mb-5">
                Inquiring About *{" "}
                <span className="text-coaching-light-blue italic">
                  (select at least one)
                </span>
              </legend>
              <ServiceCheckbox
                name="coachingServices"
                label="Coaching Services"
              />
              <ServiceCheckbox name="consulting" label="Consulting" />
              <ServiceCheckbox
                name="speakingRequest"
                label="Speaking Request"
              />
              <ServiceCheckbox name="collaborations" label="Collaborations" />
              <ServiceCheckbox name="somethingElse" label="Something Else" />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-medium text-coaching-blue mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coaching-blue focus:border-transparent ${
                  errors.message
                    ? "border-coaching-red focus:ring-coaching-red"
                    : "border-coaching-dark-gray"
                }`}
                placeholder="Tell us about your goals and how we can help..."
              ></textarea>
            </div>

            <Button type="submit" variant="primary" disabled={isSubmitted}>
              {isSubmitted ? (
                <span>
                  <LoadingSpinner />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
            {Object.keys(errors).length > 0 && (
              <div className="rounded-lg p-4 text-coaching-red">
                <ul className="list-disc list-inside">
                  {errors.firstName && <li>{errors.firstName}</li>}
                  {errors.lastName && <li>{errors.lastName}</li>}
                  {errors.email && <li>{errors.email}</li>}
                  {errors.message && <li>{errors.message}</li>}
                  {errors.services && <li>{errors.services}</li>}
                </ul>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
