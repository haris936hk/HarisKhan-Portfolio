import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold", className)}>
      {/* mt-4 to my-4 */}
      <div className="my-4">
        {/* remove  text-2xl from the original */}
        <div className=" dark:text-white text-black leading-snug tracking-wide">
          <div className="hero-headline-enter">
            {wordsArray.map((word, idx) => {
              return (
                <span
                  key={word + idx}
                  // change here if idx is greater than 3, change the text color to #CBACF9
                  className={
                    idx > 3 ? "text-purple" : "dark:text-white text-black"
                  }
                >
                  {word}{" "}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
