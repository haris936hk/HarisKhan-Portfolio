"use client";

import { useState } from "react";
import Image from "next/image";

export default function CertificatePreview({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full h-full">
      {failed ? (
        <div className="flex items-center justify-center w-full h-full text-sm" style={{ color: "#BEC1DD" }}>
          Preview unavailable
        </div>
      ) : (
        <Image
          src={src}
          alt={`${title} certificate preview`}
          fill
          sizes="(min-width: 640px) 288px, 256px"
          loading="lazy"
          className="object-contain rounded-lg"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
