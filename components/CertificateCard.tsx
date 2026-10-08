"use client";

import type { ReactNode } from "react";

export default function CertificateCard({ sourceUrl, children }: { sourceUrl: string; children: ReactNode }) {
  return (
    <div
      className="lg:min-h-[22rem] h-[20rem] flex-shrink-0 sm:flex-shrink flex items-center justify-center sm:w-80 w-[80vw] cursor-pointer"
      style={{ scrollSnapAlign: "start" }}
      onClick={() => window.open(sourceUrl, "_blank", "noopener,noreferrer")}
    >
      {children}
    </div>
  );
}
