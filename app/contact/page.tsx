import { CoachEnum, CoachFreeConsultationLinks } from "@/types/Coaches";
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import Button from "@/components/common/Button";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Coaching - Contact Us",
  description:
    "Get in touch with Coaching for coaching and consulting services. We're here to help you navigate your journey with finesse.",
  keywords: ["contact", "Coaching", "coaching", "consulting", "get in touch"],
  openGraph: {
    title: "Coaching - Contact Us",
    description:
      "Get in touch with Coaching for coaching and consulting services.",
    url: "https://www.coaching.com/contact",
    siteName: "Coaching",
  },
  twitter: {
    title: "Coaching - Contact Us",
    description:
      "Get in touch with Coaching for coaching and consulting services.",
    card: "summary",
  },
};

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Get in Touch"
        subtitle="Ready to navigate your journey with finesse?"
        description="Whether you have questions about our services, want to schedule a consultation, or just want to learn more about how we can help, we'd love to hear from you."
      />

      {/* Contact Form Section */}
      <div className="bg-coaching-blue py-20 px-5 md:px-10 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>

      {/* Additional Contact Options */}
      <div className="bg-primary-background py-[5vmax] px-5 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-coaching-blue mb-12">Other Ways to Connect</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-coaching-dark-gray rounded-lg">
              <h3 className="text-coaching-blue mb-4">
                Schedule a Consultation
              </h3>
              <p className="mb-4">
                Book your first meeting with us - it's on us!
              </p>
              <Button href="/appointments" variant="primary">
                Book Appointment
              </Button>
            </div>

            <div className="p-6 border border-coaching-dark-gray rounded-lg">
              <h3 className="text-coaching-blue mb-4">Learn More</h3>
              <p className="mb-4">
                Discover our services and how we can help you succeed.
              </p>
              <Button href="/services" variant="primary">
                View Services
              </Button>
            </div>

            <div className="p-6 border border-coaching-dark-gray rounded-lg">
              <h3 className="text-coaching-blue mb-4">About Us</h3>
              <p className="mb-4">
                Get to know our team and our approach to coaching.
              </p>
              <Button href="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
