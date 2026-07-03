// @ts-ignore
import "./globals.css";

import { EB_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { FirebaseProvider } from "@/context/FirebaseApp";

const font = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "Navigate your journey. Your first meeting is on us.",
  keywords: ["Coaching", "coaching", "consulting", "software engineering"],
  openGraph: {
    title: "Coaching",
    description:
      "Navigate your journey. Your first meeting is on us.",
    url: "https://www.coaching.com",
    siteName: "Coaching",
  },
  twitter: {
    title: "Coaching",
    description:
      "Navigate your journey with finesse. Your first meeting is on us.",
    card: "summary",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-primary-background`}>
        <FirebaseProvider>
          <Header />
          <main>{children}</main>
        </FirebaseProvider>
        <Footer />
      </body>
    </html>
  );
}
