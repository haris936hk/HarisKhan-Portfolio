import { projects } from "@/data";

const RecentProjects = () => {
  return (
    <div className="py-20 section-visibility" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div
        className="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-x-visible sm:items-center sm:justify-center pl-4 pr-0 sm:p-4 gap-4 sm:gap-x-16 sm:gap-y-6 mt-10 [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        } as React.CSSProperties}
      >
        {projects.map((item) => (
          <div
            className="w-[83vw] flex-shrink-0 sm:flex-shrink sm:w-72 md:w-80 p-4 rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1]"
            key={item.id}
            style={{
              background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              scrollSnapAlign: "start",
            }}
          >
            <h1 className="font-bold lg:text-2xl md:text-xl text-base">
              {item.title}
            </h1>

            <p
              className="lg:text-xl lg:font-normal font-light text-sm"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
            >
              {item.des}
            </p>

            <div className="flex items-center justify-between mt-7 mb-3">
              <div className="flex items-center">
                {item.iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    style={{
                      transform: `translateX(-${5 * index + 2}px)`,
                    }}
                  >
                    <img
                      src={icon}
                      alt="tech stack icon"
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="p-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
