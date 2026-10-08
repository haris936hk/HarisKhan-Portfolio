"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import MagicButton from "./MagicButton";

const LottieConfetti = dynamic(() => import("./LottieConfetti"), {
  ssr: false,
  loading: () => null,
});

export default function EmailCopyButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = "hariskhan936.hk@gmail.com";
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  return (
    <div className="mt-5 relative">
      <div className="absolute -bottom-5 right-0 block">
        {copied && <LottieConfetti autoplay={copied} loop={copied} />}
      </div>
      <MagicButton
        title={copied ? "Email is Copied!" : "Copy my email address"}
        icon={<IoCopyOutline />}
        position="left"
        handleClick={handleCopy}
        otherClasses="!bg-[#161A31]"
      />
    </div>
  );
}
