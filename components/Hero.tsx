import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      // Scroll to the about section with proper offset for the navbar
      const navbarHeight = 120; // Increased offset to ensure button is hidden
      
      const elementTop = aboutSection.offsetTop;
      const scrollPosition = elementTop - navbarHeight;
      
      // Add additional offset to ensure Hero component is completely out of view
      const heroHeight = window.innerHeight; // Full viewport height
      const finalScrollPosition = scrollPosition + heroHeight * 0.2; // Add 20% of viewport height
      
      window.scrollTo({
        top: finalScrollPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 pt-20">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center space-y-6">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dynamic Web Magic with Full Stack Expertise
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="Transforming Concepts into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Haris, a Software Engineer based in Pakistan.
          </p>

          <MagicButton
            title="Show my journey"
            icon={<FaLocationArrow />}
            position="right"
            handleClick={scrollToAbout}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
