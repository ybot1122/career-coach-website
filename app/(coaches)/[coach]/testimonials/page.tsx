import Breadcrumb from "@/components/(coaches)/Breadcrumb";
import CoachCard from "@/components/(coaches)/CoachCard";
import Testimonials from "@/components/Testimonials";
import { CoachEnum, CoachFullEnum, CoachImages } from "@/types/Coaches";
import Button from "@/components/common/Button";
import { notFound } from "next/navigation";
import React from "react";

// Testimonial data for each coach
const testimonialsData = {
  toby: [
    {
      id: "e",
      message: [
        "Within 15 minutes of our conversation he understood my past work experience and pointed out how it wasn't well represented on my resume. The experience was overall great!",
      ],
      from: "Francis Segbe",
    },
    {
      id: "a",
      from: "Steve",
      message: [
        "Just wanted to thank you so much for your help in working on my resume and offering feedback and support. I just accepted a job that I'm excited about and I just wanted to express my gratitude!",
      ],
    },
    {
      id: "b",
      message: [
        "Thank you so much, Toby! You gave me really PRACTICAL things I could change!",
      ],
      from: "Linda",
    },
    {
      id: "c",
      from: "Amina",
      message: [
        "I had the best time chatting with Toby during my consultation. I've talked with other coaches but I felt seen and right at home.",
      ],
    },
    {
      id: "d",
      message: ["Toby, you are a valuable resource!"],
      from: "Mercer",
    },
  ],
  tom: [
    {
      id: "a",
      from: "Lam Pham",
      message: [
        "Tom is brilliant—he provided me with invaluable career advice in the software industry. I attended three sessions with him to learn more about the Senior/Staff track, and I gained a wealth of knowledge from his lessons.",
      ],
    },
    {
      id: "b",
      from: "Qianshu Wang",
      message: [
        "It was great getting a chance to chat with Tom and receive his advice regarding professional objectives and career development. We talked about decision making frameworks (1-way vs. 2-way doors), gaining confidence through running mini-experiments and iterating, journaling, and considering the people management path. It was very useful getting his feedback and developing a strategy for achieving my goals",
        "Tom was an attentive and active listener. I really enjoyed hearing about his own experiences and drawing connections from there to my own journey. I'm grateful I had the chance to spend this time with him and support his growing coaching service!",
      ],
    },
    {
      id: "c",
      from: "Rachel Yu",
      message: [
        "Tom opened his calendar for folks to connect around professional objectives. I took the opportunity to connect with Tom and we covered some of my career objectives and plans for how to achieve those alongside my personal objectives in life.",
        "Tom took the time to really understand my aspirations and current challenges and provided great advice towards my professional and personal goals. I also really enjoyed learning about Tom's experiences and career decisions that have led him to where he is today, and drawing those tangents to my own experiences. Tom is working on building up his coaching/support gig and I wholeheartedly support it based on the time I spent with him.",
      ],
    },
    {
      id: "cc",
      from: "Addison Schiller",
      message: [
        "Tom stepped in during a time when strong leadership and a clear vision were needed, and that is exactly what he brought. I've worked on countless projects with him where unexpected needs would come up, and he was always the first one ready to step in and help drive any issues to a successful outcome.",
        "Tom is also a great mentor and someone who takes the professional development of those around him to heart. He was my manager for over four years and he propelled me and others to be our best while cultivating collaboration, learning, and keeping the end goal in mind.",
        "Wherever Tom ends up next he is sure to make great impact, and I look forward to seeing what’s next for him.",
      ],
    },
    {
      id: "e",
      from: "Benny Nguyen",
      message: [
        "Tom knows how to easily connect with others to understand where he can make the most impact. I admire that he truly tries to get to know someone, making it feel like I'm not just another engineer in the hive. His ability to switch and translate between technical, business, and casual language made seamless communication across teams and projects. When my manager left, he stepped in and led my team while continuing his duties as a Director (my manager's manager!) Tom is sure to make huge strides wherever he ends up next!",
      ],
    },
    {
      id: "f",
      from: "Whitney Souders",
      message: [
        "Tom is a highly skilled manager and mentor. Working as a part of his team was a pleasure. He helps everyone achieve their full potential by providing helpful support and respectful guidance. He is dedicated and knowledgeable, and would make a strong addition to any team.",
      ],
    },
    {
      id: "g",
      from: "Hari Prabowo",
      message: [
        "Tom was my manager, leader, and mentor for close to three years. Throughout that time, Tom was regarded as a problem solver, always hands-on and involved in many projects. In addition, he always made himself available to give advice and direction whenever needed. He listened to what I wanted to achieve career-wise and made sure I had the opportunities I needed to grow. And when he moved on, he had handed off his responsibilities and provided his team the knowledge and experience to keep things moving smoothly, so there were no gaps left behind. I'm sure Tom will be able to help lead and improve any organization he decides to join next.",
      ],
    },
    {
      id: "i",
      from: "Adam Estela",
      message: [
        "Tom is an exceptional team lead and mentor and was a joy to work with. He confidently led the group by creating opportunities for us to grow and encouraging us down paths where we could push ourselves forward. I was most impressed by his transparency and passion, not only to challenge himself and the work we were doing, but to grow everyone around him by taking a genuine interest in others and helping them push further or learn from him. He oversaw our technical decisions, led the way for growth by taking action, motivated others around cultural changes, and was always a friend I could talk to about anything. I would happily work with him again and I highly recommend him to any team looking for a strong leader, innovator, and talented programmer.",
      ],
    },
    {
      id: "j",
      from: "Eric Y.",
      message: [
        "Tom was my mentor during a summer internship, and I believe a large portion of my success during that experience was due to his assistance and availability throughout the course of my project. Tom is extremely helpful and outgoing, both traits that I observed during the last three months, and despite having a lot of work on his plate, he stepped up to take on the challenge of mentoring an intern during one of the busiest times for the team.",
        "Overall I would say that Tom was an excellent representative of his team and I would be very excited for an opportunity to work with him again in the future.",
      ],
    },
  ],
  david: [
    {
      id: "1",
      from: "Ji-Young S.",
      message: [
        "I had the privilege of being mentored by David during the early stages of my career, where he provided invaluable guidance as I navigated my early career as a new grad engineer. With his experience as a PM, engineer, and engineering manager, David offered unique insights and solutions during challenging moments. His thoughtful mentorship and career advice have had a lasting impact on my professional growth. I highly recommend David as both a mentor and a colleague.",
      ],
    },
    {
      id: "2",
      from: "Yibing C.",
      message: [
        "I have been so fortunate to have David as my mentor in my early career as a product manager. His sincere guidance brings clarity to my work, providing actionable strategies to help me navigate my product management career with greater confidence. Beyond career advice, David takes a holistic approach to mentorship, candidly sharing insights on financial planning which helped me prepare for long-term success and start to build my life in addition to my career. His thoughtful and practical advice has been invaluable in shaping my professional and personal growth. He is truly one of the best mentors I could ever have!",
      ],
    },
    {
      id: "23",
      from: "Ava G.",
      message: [
        "David was incredibly helpful throughout my internship search journey. His 1:1 coaching gave me the confidence and preparation I needed to tackle interviews with ease. With his years of experience in the tech industry, I was able to ask candid questions about the field and gain insight about the transition from university to full time work.",
        "David is incredibly knowledgeable and experienced in the tech industry, while also being supportive and understanding. His advice helped me feel more prepared with internships, interviews, and my future career. I highly recommend David if you are seeking mentorship in the tech world!",
      ],
    },
    {
      id: "3",
      from: "Xuening L.",
      message: [
        "I had the privilege of working under David's management for nearly two years, and his guidance made my transition from college to the professional world so much smoother.",
        "David leads with integrity and unwavering support. When incidents occur or deadlines are missed, he never shifts blame. Instead, he takes responsibility while helping us learn and improve. His approach creates an environment where we can take risks, refine our skills, and continuously grow.",
        "What truly sets David apart is his commitment to personal and professional growth. He actively coaches those around him, ensures we have the space to develop, and even curated a reading list to encourage learning from multiple perspectives. He regularly checks in on progress, offers help, and tailors opportunities to align with our individual career goals. Even when my contributions were valuable, he encouraged me to expand my scope and prioritize my growth over immediate needs.",
        "Even after he moved on, David remained a mentor I could turn to for career advice. His industry insights and guidance on navigating workplace challenges have been invaluable.",
        "David is an exceptional leader and mentor who prioritizes the growth of those around him. He fosters a supportive, learning-driven environment and continues to be a trusted source of guidance even beyond the workplace. Anyone would be fortunate to receive his guidance and build a connection with him.",
      ],
    },
  ],
};

// Coach mapping for testimonials page
const coachMapping = {
  toby: {
    enum: CoachEnum.Toby,
    fullEnum: CoachFullEnum.Toby,
  },
  tom: {
    enum: CoachEnum.Tom,
    fullEnum: CoachFullEnum.Tom,
  },
  david: {
    enum: CoachEnum.David,
    fullEnum: CoachFullEnum.David,
  },
};

interface CoachTestimonialsPageProps {
  params: Promise<{
    coach: string;
  }>;
}

export default async function CoachTestimonialsPage({
  params,
}: CoachTestimonialsPageProps) {
  const resolvedParams = await params;
  const coachKey =
    resolvedParams.coach.toLowerCase() as keyof typeof coachMapping;
  const coach = coachMapping[coachKey];
  const testimonials = testimonialsData[coachKey];

  if (!coach || !testimonials) {
    notFound();
  }

  return (
    <>
      <Breadcrumb coach={coach.enum} testimonial />
      <div className="flex items-center justify-center py-5 sticky top-0 bg-coaching-blue z-10">
        <CoachCard
          name={coach.fullEnum}
          imageSrc={CoachImages[coach.enum]}
          small
        />
        <div className="ml-5">
          <h2 className="text-3xl text-white mb-5">
            Ready to book with {coach.enum}?
          </h2>
          <Button href={`/${coach.enum.toLowerCase()}`} variant="white">
            Book Now
          </Button>
        </div>
      </div>
      <Testimonials testimonials={testimonials} name={coach.enum} />
    </>
  );
}
