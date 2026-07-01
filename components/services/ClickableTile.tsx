export default function ClickableTile({ title }: { title: string }) {
  return (
    <div className="text-center h-[340px] px-2 md:px-5">
      <div className="h-full flex justify-center flex-wrap bg-white">
        <div className="text-center self-start w-full mt-5">
          <PlusIcon />
          <PlusIcon />
          <PlusIcon />
        </div>
        <h3 className={`text-coaching-blue text-center self-center px-2`}>
          {title}
        </h3>
        <div className="text-center self-end w-full mb-5">
          <PlusIcon />
          <PlusIcon />
          <PlusIcon />
        </div>
      </div>
    </div>
  );
}

const PlusIcon = () => (
  <svg
    width="25"
    height="25"
    className="inline-block"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <g clipPath="url(#clip0_116_139)">
      {" "}
      <path
        d="M100 0L105.94 94.0603L200 100L105.94 105.94L100 200L94.0603 105.94L0 100L94.0603 94.0603L100 0Z"
        fill="url(#paint0_linear_116_139)"
      />{" "}
    </g>{" "}
    <defs>
      {" "}
      <linearGradient
        id="paint0_linear_116_139"
        x1="20.5"
        y1="16"
        x2="100"
        y2="200"
        gradientUnits="userSpaceOnUse"
      >
        {" "}
        <stop stopColor="#ACAAFF" /> <stop offset="1" stopColor="#C0E8FF" />{" "}
      </linearGradient>{" "}
      <clipPath id="clip0_116_139">
        {" "}
        <rect width="200" height="200" fill="white" />{" "}
      </clipPath>{" "}
    </defs>{" "}
  </svg>
);
