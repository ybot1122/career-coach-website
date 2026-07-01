import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  subtitleLink?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  subtitleLink,
  description,
}: PageHeroProps) {
  return (
    <div
      className={`text-center text-coaching-blue pt-20 pb-5 px-5 w-[75%] mx-auto`}
    >
      <h1 className="tracking-normal animate-slide-up-fade-in">{title}</h1>

      {subtitle && (
        <h2 className="mt-10 mb-10 text-coaching-light-blue italic font-medium animate-slide-right-fade-in">
          {subtitleLink ? (
            <Link href={subtitleLink}>{subtitle}</Link>
          ) : (
            subtitle
          )}
        </h2>
      )}

      {description && <p className="max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}
