# 🚀 Modern Portfolio Website

A stunning, interactive portfolio website built with Next.js, featuring modern UI components, 3D animations, and responsive design. This portfolio showcases my projects, experience, and skills through an engaging user experience.

## ✨ Features

- **🎨 Modern Design**: Clean, professional design with dark theme and purple accents
- **🎭 Interactive Animations**: Smooth animations powered by Framer Motion
- **🌐 3D Elements**: Three.js integration for immersive visual effects
- **📱 Fully Responsive**: Optimized for all device sizes
- **⚡ Performance Optimized**: Fast loading with Next.js optimization
- **🎯 Interactive Components**: Hover effects, reveal animations, and dynamic content
- **📧 Contact Integration**: Direct email functionality with copy-to-clipboard

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js & React Three Fiber
- **UI Components**: Custom components with Aceternity UI inspiration
- **Icons**: React Icons & Lucide React
- **Deployment**: Vercel (recommended)

## 🎯 Key Sections

### 🏠 Hero Section
- Animated spotlight effects
- Type-writer text animation
- Interactive call-to-action button
- Smooth scroll navigation

### 👨‍💻 About Section
- Bento grid layout
- Interactive globe visualization
- Tech stack showcase
- Personal information cards

### 💼 Projects Showcase
- 3D pin container effects
- Project thumbnails and descriptions
- Technology stack indicators
- Live demo links

### 🏢 Experience Timeline
- Moving border animations
- Company logos and descriptions
- Responsive card layout
- Professional experience highlights

### 🎓 Qualifications
- Infinite scrolling carousel
- Educational background
- Institution details and images
- Smooth animations

### 📞 Contact Section
- Email copy functionality
- Social media links
- Animated background effects
- Professional call-to-action

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── components/
│   ├── ui/                 # UI components
│   │   ├── BentoGrid.tsx
│   │   ├── FloatingNavbar.tsx
│   │   ├── Globe.tsx
│   │   ├── MovingBorders.tsx
│   │   └── ...
│   ├── Approach.tsx        # Approach section
│   ├── Clients.tsx         # Qualifications section
│   ├── Experience.tsx      # Work experience
│   ├── Footer.tsx          # Footer component
│   ├── Grid.tsx            # About section grid
│   ├── Hero.tsx            # Hero section
│   └── RecentProjects.tsx  # Projects showcase
├── data/
│   ├── index.ts           # Static data and content
│   ├── confetti.json      # Lottie animation data
│   └── globe.json         # Globe coordinates
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── app/                   # Next.js app directory
```

## 🎨 Customization

### 📝 Content Updates
Update your personal information in `data/index.ts`:

```typescript
export const projects = [
  {
    id: 1,
    title: "Your Project Title",
    des: "Project description",
    img: "/project-image.png",
    iconLists: ["/tech1.svg", "/tech2.svg"],
    link: "https://your-project-link.com",
  },
  // Add more projects...
];
```

### 🎨 Styling
- Modify Tailwind classes in components
- Update color scheme in `globals.css`
- Customize animations in component files

### 🖼️ Assets
- Replace images in the `public/` directory
- Update social media links in `data/index.ts`
- Add your resume PDF to `public/`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📲 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Other Platforms
- **Netlify**: Build command: `npm run build`
- **GitHub Pages**: Use `next export` for static export
- **AWS/Google Cloud**: Follow Next.js deployment guides

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Aceternity UI](https://ui.aceternity.com/) for UI component inspiration
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Three.js](https://threejs.org/) for 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

**Haris Khan** - Software Engineer

- 📧 Email: hariskhan936.hk@gmail.com
- 💼 LinkedIn: [linkedin.com/in/haris936hk](https://www.linkedin.com/in/haris936hk/)
- 🐙 GitHub: [github.com/haris936hk](https://github.com/haris936hk)
- 📸 Instagram: [instagram.com/haris936.hk](https://www.instagram.com/haris936.hk/)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

---

*Built with ❤️ by Haris Khan*