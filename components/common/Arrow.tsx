export default function Arrow({ pointLeft = false }: { pointLeft?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      className={pointLeft ? "rotate-180" : ""}
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  );
}
