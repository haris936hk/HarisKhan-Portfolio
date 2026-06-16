"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FaLocationArrow } from "react-icons/fa6";
import { certificates } from "@/data";
import { PinContainer } from "./ui/Pin";

const PDFThumbnail = dynamic(() => import("./PDFThumbnail"), { ssr: false });

const Certificates = () => {
  return (
    <div className="py-20" id="certificates">
      <h1 className="heading">
        My <span className="text-purple">certificates</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-x-16 gap-y-6 mt-10">
        {certificates.map((item) => (
          <div
            className="lg:min-h-[22rem] h-[20rem] flex items-center justify-center sm:w-80 w-[80vw] cursor-pointer"
            key={item.id}
            onClick={() => window.open(item.img, "_blank", "noopener,noreferrer")}
          >
            <PinContainer
              title="View Certificate"
              href={item.link}
              className="w-64 sm:w-72"
            >
              {/* PDF thumbnail rendered client-side via pdfjs-dist */}
              <div
                className="w-full rounded-xl mb-4 overflow-hidden"
                style={{ height: "9rem" }}
              >
                <PDFThumbnail url={item.img} />
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
