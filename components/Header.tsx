"use client";

import Link from "next/link";
import { NavBar, NavItem } from "@ybot1122/toby-ui/NavBar";

const navItems = [
  { text: "About", href: "/about" },
  { text: "Appointments", href: "/appointments" },
  { text: "Services", href: "/services" },
  { text: "Contact", href: "/contact" },
  { text: "Members", href: "/members" },
];

const member: { name: string } | null = null;

export default function () {
  return (
    <NavBar
      logo={
        <Link
          href="/"
          className="text-center inline-block text-xl lg:text-2xl text-coaching-blue"
        >
          Coaching
          <br />
          Coaching &amp; Consulting
        </Link>
      }
      iconFill="fill-black"
    >
      {navItems.map((i) => (
        <NavItem
          key={i.href}
          hoverBottomColor="bg-coaching-blue"
          backgroundColor="bg-primary-background"
        >
          <Link href={i.href} className="p-5 text-coaching-blue font-bold">
            {i.text}
          </Link>
        </NavItem>
      ))}
    </NavBar>
  );
}
