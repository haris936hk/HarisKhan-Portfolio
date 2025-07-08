"use client";
import Player from "lottie-react";
import animationData from "@/data/confetti.json";

export default function LottieConfetti({ autoplay, loop }: { autoplay: boolean, loop: boolean }) {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      animationData={animationData}
      style={{ height: 200, width: 400 }}
    />
  );
} 