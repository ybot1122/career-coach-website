import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "white";
  target?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  target,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-block py-3 px-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer";

  const variantClasses = {
    primary: "bg-coaching-blue text-white hover:bg-coaching-light-blue",
    secondary:
      "bg-coaching-gray text-coaching-blue hover:bg-coaching-dark-gray",
    white: "bg-white text-coaching-blue hover:bg-coaching-light-blue",
  };

  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabledClasses}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} target={target}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
