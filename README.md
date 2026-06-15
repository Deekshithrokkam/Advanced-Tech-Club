# Advanced Tech Club — ATC Website

A world-class, premium website for the **Advanced Tech Club (ATC)**, the Robotics & IoT Club of NxtWave Institute of Advanced Technologies (NIAT).

---

## 🚀 Quick Start

```bash
# 1. Navigate to the project folder
cd atc-website

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📁 File Structure

```
atc-website/
├── public/
│   └── favicon.svg              # ATC shield favicon
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx    # Cinematic intro screen
│   │   ├── Navbar.jsx           # Sticky nav with mobile menu
│   │   ├── Hero.jsx             # Full-screen hero + circuit animation
│   │   ├── About.jsx            # Split-layout about section
│   │   ├── WhyJoin.jsx          # 4-card benefits section
│   │   ├── Domains.jsx          # Robotics & IoT feature cards
│   │   ├── Events.jsx           # Upcoming + past events with tabs
│   │   ├── Leadership.jsx       # Team glass cards
│   │   ├── Gallery.jsx          # Masonry gallery + lightbox
│   │   ├── Achievements.jsx     # Animated counters + timeline
│   │   ├── Vision.jsx           # Cinematic vision quote section
│   │   ├── Contact.jsx          # Email + Instagram CTA
│   │   ├── Footer.jsx           # Premium footer
│   │   └── ScrollToTop.jsx      # Floating scroll-to-top button
│   ├── hooks/
│   │   └── useScrollReveal.js   # IntersectionObserver + counter hooks
│   ├── utils/
│   │   └── constants.js         # All site data (team, events, etc.)
│   ├── App.jsx                  # Root component + loading gate
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles + Tailwind layers
├── index.html                   # HTML shell
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ✏️ Customization

### Update Team Members
Edit `src/utils/constants.js` → `TEAM` array.

### Update Events
Edit `src/utils/constants.js` → `UPCOMING_EVENTS` and `PAST_EVENTS`.

### Update Stats / Milestones
Edit `src/utils/constants.js` → `STATS` and `MILESTONES`.

### Update Contact Info
Edit `src/utils/constants.js` → `CONTACT`.

### Add Real Gallery Images
In `src/components/Gallery.jsx`, replace the `PlaceholderImage` component with an `<img>` tag:
```jsx
<img src={item.src} alt={item.label} loading="lazy" className="w-full rounded-xl" />
```
Then add `src` paths to `GALLERY_ITEMS` in constants.

---

## 🎨 Design System

| Token         | Value       |
|---------------|-------------|
| Primary red   | `#DC2626`   |
| Dark red      | `#991B1B`   |
| Background    | `#09090B`   |
| Surface       | `#171717`   |
| Text          | `#FAFAFA`   |
| Muted text    | `#A1A1AA`   |
| Font          | Inter       |

---

## 🛠 Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** — utility styling
- **Framer Motion 11** — all animations
- **Lucide React** — icons

---

## 📦 Deployment

Works with Vercel, Netlify, or any static host.

```bash
npm run build
# Upload the `dist/` folder
```

For Vercel: connect the GitHub repo and it auto-deploys on push.
