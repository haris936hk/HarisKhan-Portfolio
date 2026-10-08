"use client";
import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { certificates } from "@/data";
import { PinContainer } from "./ui/Pin";
import CertificatePreview from "./CertificatePreview";
import CertificateCard from "./CertificateCard";
import MagicButton from "./MagicButton";

const INITIAL_VISIBLE_COUNT = 8;

const Certificates = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll
    ? certificates
    : certificates.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div className="py-20 section-visibility" id="certificates">
      <h1 className="heading">
        My <span className="text-purple">certificates</span>
      </h1>

      <div
        className="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-x-visible sm:items-center sm:justify-center pl-4 pr-0 sm:p-4 gap-4 sm:gap-x-16 sm:gap-y-6 mt-10 [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        } as React.CSSProperties}
      >
        {visibleCertificates.map((item) => (
          <CertificateCard key={item.id} sourceUrl={item.img}>
            <PinContainer
              title="View Certificate"
              href={item.link}
              className="w-64 sm:w-72"
            >
              <div
                className="w-full rounded-xl mb-4 overflow-hidden"
                style={{ height: "9rem" }}
              >
                <CertificatePreview key={item.preview} src={item.preview} title={item.title} />
              </div>

              {/* Title */}
              <h1 className="font-bold lg:text-xl md:text-lg text-base leading-snug">
                {item.title}
              </h1>

              {/* Issuer — purple accent matching the design system */}
              <p className="text-purple text-sm font-medium mt-1 mb-4">
                {item.issuer}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/[0.1] mb-4" />

              {/* Footer: date + verify link */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-light"
                  style={{ color: "#BEC1DD" }}
                >
                  {item.date}
                </span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-medium transition-colors duration-200 hover:text-white"
                  style={{ color: "#BEC1DD" }}
                >
                  Verify <FaLocationArrow size={10} />
                </a>
              </div>
            </PinContainer>
          </CertificateCard>
        ))}
      </div>

      {certificates.length > INITIAL_VISIBLE_COUNT && (
        <div className="flex justify-center mt-12">
          <MagicButton
            title={
              showAll
                ? "Show Less"
                : `View All Certificates (${certificates.length})`
            }
            icon={<FaLocationArrow />}
            position="right"
            handleClick={() => setShowAll(!showAll)}
            otherClasses="!bg-[#161A31]"
          />
        </div>
      )}
    </div>
  );
};

export default Certificates;
