# DevHQ : Personal Portfolio Website

<div align="center">
  
  ![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)
  ![Three.js](https://img.shields.io/badge/Three.js-r128-black?logo=three.js)
  ![GSAP](https://img.shields.io/badge/GSAP-3.12.2-88CE02?logo=greensock)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
  ![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?logo=vercel&logoColor=white)
  ![Resend](https://img.shields.io/badge/Resend-Email_API-white?logo=minutemailer)
  
  <p><strong>Professional Portfolio with 3D WebGL Starfield, GSAP Scroll Animations, and Secure Serverless Architecture!</strong></p>
  
</div>

---

## Overview

A cutting-edge personal portfolio featuring a **3D animated starfield background** built with Three.js and professional **scroll-triggered animations** powered by GSAP. This portfolio showcases advanced web technologies including WebGL rendering, custom particle systems, and sophisticated motion design. 

Beyond the frontend, it features a highly secure, **Vercel Serverless Backend** integrated with the **Resend API** to process contact form submissions without exposing sensitive API keys to the browser.

Portfolio project content is sourced from `Docs/Haris_Khan_Projects (1).pdf`:
13 case studies in PDF order, comprising 11 freelance projects and 2 hobby projects.
Cards reflect the document's project names, statuses, scope, and technology stacks.
The existing layout, styles, animation logic, and interactions are retained.
Each Case Study button opens its project's individual PDF from
`Docs/Project Case Studies/` in a new tab; GitHub links are not shown on project cards.
Other portfolio content includes Haris Khan's resume, 30 certificate PDFs,
profile links, and professional portrait.
The work-experience timeline follows `Docs/Haris_Khan_Resume.pdf`, with roles,
employers, dates, and descriptions shown in reverse chronological order.
Company logos are stored locally from the websites of
[Nexus](https://nexus.pk/), [InoTech](https://www.inotechsoln.com/),
[Eziline](https://www.eziline.com/), and [Samhan](https://samhantech.com/).
Certificate previews are rendered from the supplied PDFs, with credential links
opening the originals.
Certificate previews use resized WebP assets and load as they approach the viewport;
their original PDF credentials remain available through the links. The profile
portrait and company logos are also lazy-loaded. The startup animation waits for
page readiness rather than offscreen images or analytics, and uses a shorter
intro so the homepage is visible sooner.


The **View Resume** button opens `Docs/Haris%20Resume.pdf` in a new browser tab.
The **Let's Connect** button scrolls to the contact form on the same page.
Certificates named in `Docs/Haris_Khan_Resume.pdf` appear first in resume order;
the remaining certificates follow in their existing order.

### Project video demos

To enable a project video, add
`data-drive-video-id="DRIVE_FILE_ID"` to its `.experience-card` in `#projects`
in `index.html`. Use the file ID from the Drive sharing URL, not the whole URL,
and allow visitors to view the file without signing in. All 13 projects have video
mappings extracted from the embedded hyperlinks on their corresponding pages in
`Docs/Haris_Khan_Projects (1).pdf`.

Configured cards gain a **Watch Demo** button; clicking the card itself also opens
the video. On screens up to 768px wide and devices with a coarse primary pointer,
the video opens in a new Google Drive tab. On other devices it opens in a shared
dialog, which requests autoplay with a muted playback hint; Google Drive may still
require pressing Play. Close the dialog using Escape, the close button, or the
backdrop. Closing removes the player and restores scrolling and focus. PDF links
remain independent. Playback depends on Drive permissions and the browser.

Contact delivery still requires `RESEND_API_KEY` and `RECEIVER_EMAIL` in the deployment
environment; set the recipient to `hariskhan936.hk@gmail.com`.

---

## Key Features

- **3D WebGL Starfield** - 3,200 interactive particles with mouse parallax  
- **Premium GSAP Animations** - High-end scroll-triggered staggers and cascading reveals  
- **Dynamic Typing Animation** - Auto-cycling professional roles  
- **Custom Cursor System** - Magnetic hover effects with smooth tracking  
- **3D Card Tilt Effects** - Perspective-based magnetic interactions  
- **Timeline Progress Indicator** - Scroll-synced project timeline  
- **Serverless Email Backend** - Custom Node.js Vercel function using the Resend API  
- **Advanced SEO** - Fully configured Open Graph & Twitter Cards for social sharing previews  
- **Glassmorphism Design** - Modern backdrop blur aesthetics  
- **Fully Responsive** - Optimized for all screen sizes  
- **Hardware Accelerated** - GPU-powered animations and rendering  

---

## Advanced Architecture

### Three.js 3D Background System
**Particle Starfield:**
- 3,200 procedurally generated stars
- Custom radial gradient texture for realistic glow
- Hardware-accelerated WebGL rendering
- Responsive canvas sizing with pixel ratio optimization
- Smooth auto-rotation with configurable speed

**Interactive Parallax:**
- Mouse-tracking rotation on X and Y axes
- Subtle movement for depth perception

### GSAP Animation System
**Hero Intro & ScrollTriggers:**
- Sequenced timeline animations with overlapping tweens (Power2.out easing)
- **Timeline Items:** Reveal vertically at widths up to 1024px. Wider layouts slide in from their respective sides, with travel limited to the available viewport gutter and recalculated on resize.
- **Projects/Skills Grids:** Staggered reveals with a subtle bounce (`back.out`) and wave-like ripple effects
- **Dynamic Replays:** Uses `toggleActions: "play none none reverse"` to smoothly replay animations when scrolling back up.

### Mobile layout

- At widths up to 768px, the animated hero heading scales with the viewport so the longest role, `PROGRAMMER`, fits without clipping.
- The bottom navigation scrolls horizontally when its seven items do not fit. The active tab scrolls into view, and its highlight stays aligned within the scroller.
- Mobile experience cards share consistent padding; dates remain in normal flow below their cards. Company tags wrap within the card.
- Hero buttons enter vertically, and decorative icons keep their horizontal positions during entrance animations to avoid expanding the viewport during startup.
- For responsive QA, check 320px, 390px, and 430px portrait widths, 844px landscape, and the 768px/1024px breakpoints. Watch startup and a full typing cycle, swipe the navigation to Contact, and resize without reloading. The document width should stay equal to the viewport width; pinch zoom remains enabled.

### Secure Backend Architecture
Instead of exposing API keys in client-side JavaScript, this portfolio employs a **Vercel Serverless Function** (`api/submit.js`). 
- **Hidden Keys:** The frontend sends a clean POST request to `/api/submit`. The serverless function securely injects the `RESEND_API_KEY` from the Vercel Environment Variables, formats the email using HTML, and forwards it to the Resend API.
- **Node.js Native:** Built using the native `https` module to guarantee runtime stability across all Vercel Node.js environments.

---

## Technologies

### Core Stack
- **HTML5 & CSS3** - Semantic markup, Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6+)** - Core interactivity
- **Node.js (CommonJS)** - Vercel serverless backend logic

### Animation & 3D Libraries
- **Three.js r128** - 3D WebGL rendering engine
- **GSAP 3.12.2 & ScrollTrigger** - Professional animation framework

### External Services
- [Resend API](https://resend.com/) - Secure transactional email backend
- [Vercel](https://vercel.com/) - Serverless hosting & analytics
- [Google Fonts](https://fonts.google.com/) - Inter typography
- [Font Awesome 6.4.0](https://fontawesome.com/) & [Devicon](https://devicon.dev/) - Icon libraries

---

## Performance Metrics

### Benchmark Results
- **Lighthouse Performance:** 95+
- **First Contentful Paint:** < 1.5s
- **WebGL FPS:** Consistent 60fps
- **Total Bundle Size:** ~50KB (excluding CDN)

### Optimization Techniques
- **WebGL Rendering** - GPU-accelerated graphics  
- **BufferGeometry** - Efficient vertex handling  
- **Pixel Ratio Capping** - Prevents mobile over-rendering  
- **Lazy ScrollTrigger** - On-demand, highly-performant animations  

---

## File Structure

```text
portfolio/
│
├── index.html                 # Main markup, SEO tags, and Canvas target
├── style.css                  # Advanced styling, grids, glassmorphism
├── script.js                  # Intersection observers, typing fx, form logic
├── 3d_background.js           # Three.js starfield + GSAP timelines
├── api/
│   └── submit.js              # Vercel Serverless Function (Resend Backend)
├── package.json               # Dependencies & Vercel configuration
├── .env                       # Local environment variables (git-ignored)
├── .gitignore                 # Repo security rules
└── portfolio_assests/         # Optimized images and PDFs
```

---

## Portfolio Owner

**Haris Khan**  
Full-Stack Software Engineer | Bachelor's in Software Engineering, Riphah International University

- LinkedIn: [@haris936hk](https://www.linkedin.com/in/haris936hk/)
- GitHub: [@haris936hk](http://github.com/haris936hk)
- Portfolio: [hariskhan-portfolio.netlify.app](https://hariskhan-portfolio.netlify.app/)
- Email: [hariskhan936.hk@gmail.com](mailto:hariskhan936.hk@gmail.com)

---

## Acknowledgments

- **Three.js Team** - 3D graphics library
- **GreenSock (GSAP)** - Animation framework
- **Resend** - Email backend infrastructure
- **Font Awesome & Devicon** - Icon libraries

---

<div align="center">
  
  **Star this repo if you found the 3D effects impressive!**
  
  Original portfolio template by Aakarsh Bibhaw; content customized for Haris Khan.
  
  © 2026 All Rights Reserved
  
</div>
