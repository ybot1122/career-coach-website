"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";

interface AppointmentsProps {
  InquiryComponent: React.ReactElement;
  PackagesComponent: React.ReactElement;
  tabLabels?: {
    inquiry: string;
    packages: string;
  };
}

export default function Tabs({
  InquiryComponent,
  PackagesComponent,
  tabLabels,
}: AppointmentsProps) {
  const [activeTab, setActiveTab] = useState<"inquiry" | "packages">("inquiry");

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "packages" || hash === "inquiry") {
      setActiveTab(hash as "inquiry" | "packages");
    }
  }, []);

  return (
    <>
      <div className="text-white flex justify-center border-b border-coaching-blue pt-10 gap-2">
        <Tab
          onClick={() => setActiveTab("inquiry")}
          activeTab={activeTab === "inquiry"}
          text={tabLabels?.inquiry || "Single Sessions"}
        />
        <Tab
          onClick={() => setActiveTab("packages")}
          activeTab={activeTab === "packages"}
          text={tabLabels?.packages || "Packages"}
        />
      </div>

      <div className="tab-content bg-coaching-blue">
        {activeTab === "inquiry" ? InquiryComponent : PackagesComponent}
      </div>
    </>
  );
}

const Tab = ({
  onClick,
  activeTab,
  text,
}: {
  onClick: () => void;
  activeTab: boolean;
  text: string;
}) => (
  <button
    onClick={onClick}
    className={`${
      activeTab ? "bg-coaching-blue text-white" : "hover-2 text-coaching-blue"
    } text-2xl px-6 py-4 cursor-pointer flex items-center justify-center transition rounded-t-md border-l-2 border-t-2 border-r-2 border-coaching-blue`}
  >
    {text}
  </button>
);
