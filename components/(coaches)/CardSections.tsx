import BuyCard from "@/components/(coaches)/BuyCard";
import SingleSessionCard from "@/components/(coaches)/SingleSessionCard";

export const Inquiry = ({
  firstTimeLink,
  single30MinLink,
  single60MinLink,
}: {
  firstTimeLink: string;
  single30MinLink: string;
  single60MinLink: string;
}) => {
  return (
    <div className="bg-coaching-blue pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-2 mb-20 max-w-[1024px] mx-auto px-5">
        <div className="col-span-1 md:col-span-3">
          <h1 className="text-white pb-5 pt-10" id="inquiry">
            Single Sessions
          </h1>
        </div>
        <SingleSessionCard
          description="First Time Only - 30 Minutes"
          title="Free Consultation"
          href={firstTimeLink}
          indented={true}
          bg="white"
        />
        <SingleSessionCard
          description="Single Session"
          title="30 Minutes"
          price="$109"
          href={single30MinLink}
          indented={false}
          bg="white"
        />
        <SingleSessionCard
          description="Single Session"
          title="60 Minutes"
          price="$219"
          href={single60MinLink}
          indented={true}
          bg="white"
        />
      </div>
    </div>
  );
};

export const Packages = ({
  starterLink,
  premiumLink,
  liteLink,
}: {
  starterLink: string;
  premiumLink: string;
  liteLink: string;
}) => {
  return (
    <div className="bg-coaching-blue pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-2 mb-20 max-w-[1024px] mx-auto px-5">
        <div className="col-span-1 md:col-span-3">
          <h1 className="text-white pb-5 pt-10" id="packages">
            Packages
          </h1>
          <p className="text-white mb-10 max-w-[620px] mx-auto">
            At Coaching, we offer packages for booking multiple sessions
            upfront. Packages are a great option if you are looking for regular
            check ins and long term support. Check out which package is best for
            you.
          </p>
        </div>
        <BuyCard
          title="Starter Package"
          href={starterLink}
          indented={true}
          bg="white"
          price="$788"
          priceEntice="$197/session"
          details={[
            "4 x 60 minutes video conferencing",
            "Great for quarterly meetings or short-term collaboration",
            "Unlimited support via email",
          ]}
          highlight={"10% OFF"}
          highlightLevel={1}
          listType="star"
          label="Select"
        />
        <BuyCard
          details={[
            "12 x 60 minutes video conferencing",
            "Perfect for weekly, bi-weekly or monthly deep collaboration",
            "First priority support via email or messaging",
          ]}
          title="Premium Package"
          price="$2,148"
          priceEntice="$179/session"
          href={premiumLink}
          indented={false}
          bg="white"
          listType="star"
          bestValue
          label="Select"
        />
        <BuyCard
          details={[
            "12 x 30 minutes video conferencing",
            "Great for weekly, bi-weekly or monthly check-ins",
            "Unlimited support via email or messaging",
          ]}
          title="Lite Package"
          href={liteLink}
          indented={true}
          bg="white"
          price="$1,128"
          priceEntice="$94/session"
          highlight={"14% OFF"}
          highlightLevel={1}
          listType="star"
          label="Select"
        />
      </div>
    </div>
  );
};
