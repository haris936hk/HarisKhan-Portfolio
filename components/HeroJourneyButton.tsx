"use client";

import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";

export default function HeroJourneyButton() {
  const scrollToAbout = () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const navbarHeight = 120;
        const elementTop = aboutSection.offsetTop;
        const scrollPosition = elementTop - navbarHeight;
        const heroHeight = window.innerHeight;
        const finalScrollPosition = scrollPosition + heroHeight * 0.2;
        window.scrollTo({ top: finalScrollPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <MagicButton
      title="Show my journey"
      icon={<FaLocationArrow />}
      position="right"
      handleClick={scrollToAbout}
    />
  );
}
