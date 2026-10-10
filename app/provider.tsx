"use client";

import "@/lib/react-shim";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { MotionConfig, LazyMotion, domMax } from "framer-motion";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domMax}>{children}</LazyMotion>
      </MotionConfig>
    </NextThemesProvider>
  );
}
