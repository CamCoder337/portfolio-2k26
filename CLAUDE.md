# Portfolio Project - Claude Guidelines

## Project Overview

A high-end creative portfolio for a **Backend Software Engineer** with strong creative sensibilities, built with the "2026 Kinetic Modernism" design philosophy. This portfolio aims to be Awwwards-winning quality, demonstrating that backend expertise and frontend craftsmanship can coexist beautifully.

### Developer Profile
- **Primary expertise**: Backend development (APIs, databases, system architecture, DevOps)
- **Secondary skills**: Modern frontend technologies, animation, creative coding
- **Position**: Available for freelance work
- **Tagline**: "Crafting high-end digital experiences through code, motion, and kinetic typography."

## Tech Stack

- **Framework**: Next.js 16.1.5 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **Animation**: GSAP 3.14.2
- **Package Manager**: pnpm

## Design System

### Color Palette

```css
/* Primary Accents */
--primary: #dd5608;           /* Deep Orange - Primary Accent (buttons, highlights) */
--electric-blue: #0000FF;     /* Electric Blue - Secondary Accent */

/* Backgrounds */
--bg-light: #f8f6f5;          /* Warm off-white background */
--bg-dark: #221610;           /* Dark mode background */
--bg-white: #FFFFFF;          /* Pure white for cards/overlays */
--bg-black: #000000;          /* High contrast sections */

/* Text */
--text-primary: #181311;      /* Near-black for headings */
--text-muted: rgba(0,0,0,0.4); /* Muted labels */
--text-body: rgba(24,19,17,0.8); /* Body text with slight transparency */

/* Mesh Gradient (Hero background) */
/* Radial gradients blending orange and blue at corners:
   - Top-left: rgba(222, 106, 8, 0.15)
   - Bottom-right: rgba(0, 0, 255, 0.1)
   - Top-right: rgba(222, 106, 8, 0.05)
   - Bottom-left: rgba(0, 0, 255, 0.08)
   Overlay with grain texture at 40% opacity */
```

### Typography

- **Primary Font**: Space Grotesk (Google Fonts) - all weights 300-700
- **Display/Headlines**: 72px mobile / 120px desktop, font-weight 700, line-height 0.85, letter-spacing -0.05em
- **Labels/Tags**: 10px uppercase, letter-spacing 0.2-0.3em, font-weight 700
- **Body Text**: 14px, font-weight 500, line-height relaxed
- **Special Treatment**: "DEV" in italic orange for contrast

```css
.kinetic-text {
  line-height: 0.85;
  letter-spacing: -0.05em;
}
```

### Design Philosophy: "2026 Kinetic Modernism"

- Flat, bold, high-contrast aesthetic
- Typography-driven layouts (no 3D objects)
- Motion and interaction as core differentiators
- Everything should feel "ready to animate"

## Page Structure

### 1. Hero Section
- **Layout**: Full-screen, centered content with vertical side text (desktop)
- **Header**: Logo (circular, black background) + "Available for freelance" badge + "Hire Me" CTA button
- **Typography**: "CREATIVE" in dark + "DEV" in orange italic on new line
- **Subheadline**: "Crafting high-end digital experiences through code, motion, and kinetic typography."
- **Background**: Mesh gradient with grain texture overlay (40% opacity)
- **Decorative**: Blurred colored circles (blue top-left, orange bottom-right)
- **Side Text** (desktop only): Vertical rotated labels ("Scroll to Explore — 2024 Portfolio" / "Creative Software Engineer")
- **Navigation**: Glassmorphism floating dock at bottom (see UI Components)

### 2. About Section (Bento Grid)
- Asymmetric "Bento Box" grid layout
- Large square: lifestyle photo (B&W or high contrast filter)
- **Backend Tech Stack blocks**:
  - Languages: Python, Go, Rust, Node.js
  - Databases: PostgreSQL, MongoDB, Redis
  - Infrastructure: Docker, Kubernetes, AWS/GCP
  - APIs: REST, GraphQL, gRPC
- **Frontend Tech Stack blocks** (secondary):
  - React, Next.js, GSAP, Tailwind CSS
- Text block: Short bio emphasizing backend expertise with creative frontend interest
- Style: 24px rounded corners (1rem default, 2rem lg, 3rem xl), subtle borders
- Hover states: scaling or color inversion effects

### 3. Projects Section
- Horizontal scroll gallery (GSAP ScrollTrigger)
- Large, immersive project thumbnails
- Custom cursor: "View Case" circle on hover
- Project tags as sleek pills (Python, Go, PostgreSQL, Docker, Kubernetes, etc.)
- Inertia and smooth scrolling feel
- **Project Types to Showcase**:
  - API architectures & microservices
  - Database optimization stories
  - DevOps/infrastructure projects
  - Full-stack applications (backend focus with polished frontend)
  - Open source contributions

### 4. Contact Section
- Full-screen minimal footer
- Giant, screen-width CTA text ("Let's Talk" or email)
- Gradient color shift on hover (Black to Orange/Blue)
- Social links columns (GitHub, LinkedIn, X)

## UI Components

### Glassmorphism Floating Dock
```css
.glass-dock {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px; /* full rounded */
}
```
- Fixed at bottom center, 90% width, max-width ~400px
- Icons: Material Symbols Outlined (home, folder_open, experiment, account_circle, alternate_email)
- Active state: Orange background with white icon + shadow
- Inactive state: 60% black opacity, hover reveals full black with white/50 bg

### Primary Button
```css
.btn-primary {
  background: var(--primary);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### Status Badge
- 10px font, bold, uppercase
- Letter-spacing: 0.2em
- Color: rgba(0,0,0,0.4)

## Interaction Patterns

- **Magnetic buttons**: Elements that follow/attract to cursor
- **Custom cursors**: Context-aware cursor states
- **Micro-interactions**: Subtle feedback on every interactive element
- **Smooth scrolling**: Inertia-based, buttery smooth
- **Hover states**: Color inversions, scaling, gradient shifts

## File Structure

```
app/
├── layout.tsx          # Root layout with fonts
├── page.tsx            # Homepage
├── globals.css         # Global styles, CSS variables
└── components/         # Reusable UI components
    ├── Hero/
    ├── About/
    ├── Projects/
    └── Contact/

design/                 # Stitch-generated design references (gitignored)
public/                 # Static assets
skills/                 # AI agent skills
```

## Development Guidelines

### Animation Best Practices
- Use GSAP for complex animations and scroll-triggered effects
- Prefer CSS animations for simple hover states and transitions
- Implement `will-change` for GPU-accelerated elements
- Use `ScrollTrigger` for section-based animations

### Performance Rules
- Follow Vercel React best practices (see `.claude/skills/vercel-react-best-practices/`)
- Lazy load heavy components
- Optimize images with Next.js Image component
- Minimize bundle size with dynamic imports

### Code Style
- Functional components with TypeScript
- Use `use client` directive only when necessary
- Prefer Server Components for static content
- CSS variables for theming consistency

## Design References

The `/design` folder contains Stitch-generated mockups following the "2026 Kinetic Modernism" concept. These serve as visual references for implementation.

**Note**: Design files are gitignored as they are generated assets.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Key Reminders

1. **Bold over safe**: Every design decision should lean towards memorable over conventional
2. **Motion is meaning**: Animations aren't decoration, they communicate hierarchy and interaction
3. **High contrast**: Embrace the tension between massive and tiny, white and black, static and kinetic
4. **No AI slop**: Avoid generic patterns (Inter font, purple gradients, predictable layouts)
5. **Intentionality**: Every pixel should feel deliberately placed
6. **Backend with flair**: The portfolio proves that backend developers can also deliver exceptional frontend experiences
7. **Substance over style**: Projects should demonstrate deep technical expertise, not just visual polish

## Content Strategy

### Messaging for Backend Developer
- Lead with "Creative Dev" but context reveals backend expertise
- Show that backend skills enable scalable, robust systems
- Demonstrate breadth: "I build the engines AND the interfaces"
- Freelance availability is prominent (header badge + CTA)

### Bio Suggestions
> Backend engineer who believes great software deserves great interfaces. I architect APIs, optimize databases, and occasionally craft the pixels that sit on top.

> Specializing in scalable backend systems. Obsessed with developer experience, API design, and proving that engineers can have taste.
