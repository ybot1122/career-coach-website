"use client";

import {
  AccordionItem,
  AccordionItemList,
} from "@ybot1122/toby-ui/AccordionItem";
import { CONTACT_EMAIL } from "@/lib/constants";

const faqs = [
  {
    q: "What can I expect during a coaching session?",
    a: [
      "You can choose to meet with any of our coaches to create a unique plan for your individual background and situation, measure progress and ensure that you're thriving within your strengths while also growing in each season.",
      "A free 30-minute discovery call is always offered to ensure we're the right fit for you! When you are ready to take the next steps, you can schedule incremental sessions or take advantage of our package offerings.",
    ],
  },
  {
    q: "I have a business consultation request. What should I do?",
    a: [
      "Coaching coaching & consulting provides a wide array of professional services for businesses, non-profits and individuals. The first step is to schedule a free consultation to ensure we're a right fit.",
      "If you would like to proceed, Coaching would provide a proposal and quote before we proceed to contract. The proposal will include expectations of the service, rates and method of payments, possible mileage or travel fees.",
    ],
  },

  {
    q: "Are there discounts for students?",
    a: [
      `Yes, students get an additional 15% off all packages! Email ${CONTACT_EMAIL} from your .edu email address to request student discounts.`,
    ],
  },

  {
    q: "Do you offer pro bono services?",
    a: [
      `On a case by case basis we offer pro bono services. At this time the capacity for pro bono services is full but feel free to email ${CONTACT_EMAIL} or fill out the contact form on the website to inquire about future opportunities.`,
    ],
  },
  {
    q: "Do you offer refunds?",
    a: [
      "No refunds for services are offered. But we understand that life happens. If you can no longer make a scheduled time, you are welcome to reschedule as many times as you would like using the reschedule link at the bottom of your booking confirmation email.",
    ],
  },
  {
    q: "I still have more questions, how do I reach out?",
    a: [`Don't be shy, email ${CONTACT_EMAIL} with further questions!`],
  },
];

export default function FAQ() {
  return (
    <div className="bg-white w-full px-10 lg:p-24">
      <div className="w-full lg:grid lg:grid-cols-3">
        <h2 className="text-coaching-blue lg:text-center lg:col-span-1 my-10">
          FAQs
        </h2>

        <div className="lg:col-span-2">
          <AccordionItemList>
            {faqs.map(({ q, a }) => (
              <AccordionItem
                question={q}
                key={q}
                questionFontColor="text-coaching-blue"
                fillColor="fill-coaching-blue"
                borderColor="border-coaching-dark-gray"
              >
                {a.map((ans) => (
                  <p key={ans} className="mb-5 last:mb-0">
                    {ans}
                  </p>
                ))}
              </AccordionItem>
            ))}
          </AccordionItemList>
        </div>
      </div>
    </div>
  );
}
