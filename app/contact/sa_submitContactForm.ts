"use server";

import { sendTransactionalEmail } from "@ybot1122/toby-ui/Sdk/Brevo/sendTransactionalEmail";
import { revalidatePath } from "next/cache";
import { CONTACT_EMAIL } from "@/lib/constants";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  coachingServices: boolean;
  consulting: boolean;
  speakingRequest: boolean;
  collaborations: boolean;
  somethingElse: boolean;
}

const BREVO_API_KEY = process.env.BREVO_API_KEY! as string;
const templateId = 1;

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const contactData: ContactFormData = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      coachingServices: !!formData.get("coachingServices"),
      consulting: !!formData.get("consulting"),
      speakingRequest: !!formData.get("speakingRequest"),
      collaborations: !!formData.get("collaborations"),
      somethingElse: !!formData.get("somethingElse"),
    };

    // Validate required fields
    if (!contactData.firstName.trim()) {
      return { success: false, error: "First name is required" };
    }

    if (!contactData.lastName.trim()) {
      return { success: false, error: "Last name is required" };
    }

    if (!contactData.email.trim()) {
      return { success: false, error: "Email is required" };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    if (!contactData.message.trim()) {
      return { success: false, error: "Message is required" };
    }

    // Validate that at least one service is selected
    const hasServiceSelected =
      contactData.coachingServices ||
      contactData.consulting ||
      contactData.speakingRequest ||
      contactData.collaborations ||
      contactData.somethingElse;

    if (!hasServiceSelected) {
      return { success: false, error: "Please select at least one service" };
    }

    const topics = [
      ...(contactData.coachingServices ? ["Coaching Services"] : []),
      ...(contactData.consulting ? ["Consulting"] : []),
      ...(contactData.speakingRequest ? ["Speaking Request"] : []),
      ...(contactData.collaborations ? ["Collaborations"] : []),
      ...(contactData.somethingElse ? ["Something Else"] : []),
    ];

    // Construct params for Brevo API
    const name = contactData.firstName + " " + contactData.lastName;
    const emailParams = {
      name,
      email: contactData.email,
      message:
        contactData.message +
        (contactData.phone ? `\n\nPhone: ${contactData.phone}` : ""),
      topics: topics.join(", "),
    };

    const response = await sendTransactionalEmail({
      brevoApiKey: BREVO_API_KEY,
      senderName: "Coaching",
      senderEmail: CONTACT_EMAIL,
      recipientEmail: CONTACT_EMAIL,
      recipientName: "Coaching",
      replyTo: {
        name: name,
        email: contactData.email,
      },
      templateId,
      params: emailParams,
    });

    if (response) {
      return { success: true };
    }

    throw new Error("Failed to send email");
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
