import Button from "./Button";

export default function ({
  bg = "bg-coaching-blue",
}: {
  bg?: "bg-coaching-blue" | "bg-coaching-gray";
}) {
  const fontcolor =
    bg === "bg-coaching-blue" ? "text-white" : "text-coaching-blue";
  return (
    <div
      className={`flex ${bg} w-full pt-10 pb-20 items-center flex-wrap justify-center`}
    >
      <h3 className={`${fontcolor} text-center my-10 w-full px-20`}>
        Have questions or just want to chat?
      </h3>

      <Button href="/contact" variant="white">
        Drop a Message
      </Button>
    </div>
  );
}
