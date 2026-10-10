"use client";

import type { ReactNode } from "react";

export default function CertificateCard({
  sourceUrl,
  children,
}: {
  sourceUrl: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label="View certificate"
      className="lg:min-h-[22rem] h-[20rem] flex-shrink-0 sm:flex-shrink flex items-center justify-center sm:w-80 w-[80vw] cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple rounded-2xl text-left bg-transparent p-0 border-0"
      style={{ scrollSnapAlign: "start" }}
      onClick={() => window.open(sourceUrl, "_blank", "noopener,noreferrer")}
    >
      {children}
    </button>
  );
}
