export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Qualifications", link: "#qualifications" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a Open Source project",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Text Cipher Application",
    des: " A modern Python GUI app for encrypting and decrypting text using various ciphers. Real-time decryption, light/dark mode, tabbed UI, input validation.",
    img: "/p1.png",
    iconLists: ["/python.svg", "/flutter.svg", "/encryption.svg"],
    link: "/ui.earth.com",
  },
  {
    id: 2,
    title: "Weather Monitoring System",
    des: "A Java Swing application demonstrating the Observer Design Pattern with real-time weather updates via OpenWeatherMap APIs.",
    img: "/p2.png",
    iconLists: ["/java.png", "/api.svg"],
    link: "/ui.yoom.com",
  },
  {
    id: 3,
    title: "Task & Performance Management System",
    des: "Designed to streamline task workflows, performance tracking, and employee development within organizations..",
    img: "/p3.png",
    iconLists: ["/php2.svg", "/html.svg", "/css.svg", "/javascript.svg", "/mysql.svg"],
    link: "/ui.aiimg.com",
  },
  {
    id: 4,
    title: "Cognitive Assessment Games Suite",
    des: "A suite of engaging games designed to assess cognitive abilities and promote mental agility.",
    img: "/p4.png",
    iconLists: ["/python.svg", "/pygame.png"],
    link: "/ui.apple.com",
  },
];

export const qualifications = [
  {
    quote:
      "Riphah International University is a prestigious institution recognized by the Higher Education Commission of Pakistan. The university's Software Engineering program is accredited and follows international standards, providing comprehensive education in software development, system design, and modern programming technologies.",
    name: "Bachelor of Science in Software Engineering",
    title: "Riphah International University",
    image: "/Riphah.jpg",
  },
  {
    quote:
      "I.M.C.B F-11/3 is a well-established educational institution known for its academic excellence in computer science education. The intermediate program provides a strong foundation in programming fundamentals, data structures, and computer systems, preparing students for advanced studies in technology.",
    name: "Intermediate in Computer Science",
    title: "I.M.C.B F-11/3",
    image: "/F-11.png",
  },
  {
    quote:
      "I.M.C.B F-7/3 offers a comprehensive computer science curriculum at the matriculation level, focusing on developing strong analytical and problem-solving skills. The institution emphasizes practical learning and modern computing concepts, setting a solid foundation for future academic pursuits.",
    name: "Metriculation in Computer Science",
    title: "I.M.C.B F-7/3",
    image: "/F-7.png",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern - PTCL",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Machine Learning Intern - InoTech Solutions",
    desc: "Designed and developed ChatBot for both iOS & Android platforms using Chatbase.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Full Stack Intern - SAMHAN Technologies",
    desc: "Developed a website for task and employee management, from initial concept to deployment in the organization.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Web Developer Intern - Eziline Software House",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/haris936hk"
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/haris936hk/"
  },
  {
    id: 3,
    img: "/insta.svg",
    link: "https://www.instagram.com/haris936.hk/"
  },
];
