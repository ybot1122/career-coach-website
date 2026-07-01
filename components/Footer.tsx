import Image from "next/image";
import Link from "next/link";

export default function () {
  return (
    <footer className="text-center my-5 py-5">
      <div className="mt-10 mb-5">
        <Link
          href="https://twitter.com"
          target="_blank"
          className="inline-block mr-5"
        >
          <Image
            src="/social/twitter.svg"
            alt="Twitter"
            width="25"
            height="25"
          />
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          className="inline-block mr-5"
        >
          <Image
            src="/social/instagram.svg"
            alt="Instagram"
            width="25"
            height="25"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/"
          target="_blank"
          className="inline-block"
        >
          <Image
            src="/social/linkedin.svg"
            alt="LinkedIn"
            width="25"
            height="25"
          />
        </Link>
      </div>
      <p className="mb-5">
        © {new Date().getFullYear()} Coaching LLC. All Rights Reserved
      </p>
      <p>
        <Link href="/termsofservice" className="underline">
          Terms of Service
        </Link>{" "}
        |{" "}
        <Link href="privacypolicy" className="underline">
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}
