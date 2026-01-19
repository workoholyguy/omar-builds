# OMAR SWE PORTFOLIO — Source of Truth

> Last updated: 2026-01-18

---

## 1. Project Identity

### Positioning Statement
**"I build production web apps and data/ML systems that turn messy problems into working software."**

### Target Roles
- Junior Software Engineer
- Front End Developer
- Full Stack Developer
- Data Analyst
- Data Scientist
- Data Engineer
- ML Engineer / ML Researcher

### Voice & Tone
- Use: "I build", "I ship", "I analyze", "I deploy"
- Avoid: "I'm passionate about...", motivational fluff, fake metrics
- Short sentences, active voice, specific claims
- Show tradeoffs and constraints

---

## 2. Design Philosophy

### Core Principles
1. **Minimalist** — High signal, no fluff
2. **Recruiter-first** — Readable in 15 seconds, hooks in 5
3. **Professional** — Must not look like a template
4. **Fast** — Performance is a feature
5. **Honest** — No fake metrics, awards, users, or results

### Theme
- **Mode**: Dark-clean (committed choice)
- **Accent**: One color only (no rainbow gradients)
- **Typography**: Strong hierarchy (big headline, clear section titles)
- **Spacing**: High whitespace, consistent spacing
- **Cards**: Simple border, subtle hover, no heavy shadows

---

## 3. Technical Stack

```
Framework:      Next.js 16.x (App Router)
Language:       TypeScript 5
Styling:        Tailwind CSS 4
Content:        MDX + Frontmatter (content collections)
Deployment:     Netlify (static) or Vercel
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 4. Site Architecture

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — recruiter-first landing |
| `/projects` | All projects (filterable) |
| `/projects/[slug]` | Project case study |
| `/resume` | Embedded PDF + download |
| `/about` | Short, professional bio |
| `/writing` | Blog posts (3–5 max) |
| `/contact` | Contact form/links |

### Optional Routes (only if strong content)
| Route | Purpose |
|-------|---------|
| `/research` | Papers or serious writeups |
| `/playground` | Interactive demo area |

---

## 5. Content Model

### Directory Structure
```
content/
├── projects/
│   ├── project-slug.mdx
│   └── ...
├── writing/
│   ├── post-slug.mdx
│   └── ...
└── resume/
    └── metadata.json
```

### Project Frontmatter Standard

```yaml
---
title: "Project Title"
slug: "project-slug"
type: "web" # web | fullstack | data | ml | research | devops
roles:
  - frontend
  - backend
  # Options: frontend, backend, data, ml, infra
status: "live" # live | demo | private | archived
featured: true # true | false
stack:
  - Next.js
  - TypeScript
  - PostgreSQL
highlights:
  - "Reduced API latency by 40%"
  - "Processed 10K daily transactions"
  - "Integrated 3 external APIs"
links:
  github: "https://github.com/..."
  live: "https://..."
  paper: "" # optional
  video: "" # optional
dates:
  start: "2024-01"
  end: "2024-06" # or "present"
metrics: # ONLY if true and verifiable
  users: 500
  latency: "200ms"
  accuracy: "94%"
screens:
  hero: "/images/projects/project-slug/hero.png"
  gallery:
    - "/images/projects/project-slug/screen1.png"
    - "/images/projects/project-slug/screen2.png"
tags:
  - react
  - nextjs
  - postgres
  - typescript
---
```

### Project Story Format (Case Study Layout)

Every project page follows this structure:

1. **One-line summary** — What it is
2. **Problem** — 2–4 lines
3. **Solution** — 2–4 lines
4. **My contributions** — Bullets, concrete
5. **Architecture / Data flow** — Simple diagram or pseudo-diagram
6. **Tech stack** — Listed with context
7. **Challenges + Tradeoffs** — What hiring managers love
8. **Results** — Only if real
9. **Links** — GitHub, live, demo

**For ML/Data projects, also include:**
- Dataset description
- Evaluation methodology
- Limitations and assumptions

---

## 6. Homepage Structure

### Above the Fold (Must Include)
```
┌─────────────────────────────────────────────┐
│  Omar Adjei                                 │
│  Software Engineer                          │
│                                             │
│  "I build production web apps and data      │
│   systems."                                 │
│                                             │
│  • React/Next/Node  • Python/SQL            │
│  • Deployed Apps    • ML/Data Projects      │
│                                             │
│  [Resume] [GitHub] [LinkedIn] [Email]       │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  Featured Work                              │
│  ┌─────┐ ┌─────┐ ┌─────┐                   │
│  │ P1  │ │ P2  │ │ P3  │                   │
│  └─────┘ └─────┘ └─────┘                   │
└─────────────────────────────────────────────┘
```

### Sections (in order)
1. Hero + Value Statement + CTAs
2. Featured Projects (3–6 cards)
3. Skills (categorized: Web, Backend, Data, ML, DevOps)
4. Experience (if applicable)
5. Education (GSU, expected graduation)
6. Writing (optional, if posts exist)
7. Contact

---

## 7. Projects Page

### Default View
- Featured projects first (3–6)
- All projects below

### Filter System
```
Role:   [ All ] [ SWE ] [ Frontend ] [ Fullstack ] [ Data ] [ ML ] [ DE ]
Tech:   [ React ] [ Next ] [ Node ] [ Python ] [ SQL ] [ Docker ] ...
Type:   [ Web Apps ] [ APIs ] [ Analytics ] [ ML Models ] [ Research ]
Search: [ 🔍 keyword search ]
```

### Project Tracks (Grouping)
- **Track A**: Production Web Apps
- **Track B**: Data + Analytics Systems
- **Track C**: ML / Research

---

## 8. Component Library

### Core Components
```
Container     — Max-width wrapper with responsive padding
Section       — Page section with consistent spacing
Button        — Primary, secondary, ghost variants
Card          — Simple border, subtle hover
Badge         — Tech tags, status indicators
TagList       — Horizontal scrollable tags
```

### Project Components
```
ProjectCard   — Compact project preview
ProjectGrid   — Responsive grid layout
FilterBar     — Role/tech/type filters
SearchInput   — Keyboard-accessible search (Cmd+K optional)
ProjectHero   — Case study hero section
```

### Layout Components
```
Header        — Navigation + CTAs
Footer        — Links + copyright
Sidebar       — Optional for case studies
```

---

## 9. Recruiter Hook Feature

**Chosen Option: Project Explorer**

A fast, filterable panel that feels like a mini product:
- Instant filter response
- Keyboard navigation
- Optional: Cmd+K quick search
- Clean, minimal animation

**Implementation Notes:**
- Client component (requires interactivity)
- Islands architecture (minimal JS elsewhere)
- Graceful degradation without JS

---

## 10. Quality Standards

### Performance Targets
- Lighthouse Performance: 90+
- Lighthouse SEO: 90+
- Lighthouse Accessibility: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

### Accessibility Requirements
- Semantic HTML throughout
- WCAG 2.1 AA contrast ratios
- Full keyboard navigation
- Reduced motion support
- ARIA labels where needed
- Skip links

### SEO Checklist
- [ ] Clean meta titles/descriptions
- [ ] OG images for all pages
- [ ] Canonical URLs
- [ ] XML sitemap
- [ ] robots.txt
- [ ] Schema: Person + WebSite + Breadcrumbs

---

## 11. Asset Requirements

### Directory Structure
```
public/
├── images/
│   ├── projects/
│   │   └── [slug]/
│   │       ├── hero.png
│   │       └── gallery/
│   ├── og/
│   │   └── default.png
│   └── avatar.png
├── resume.pdf
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
└── site.webmanifest
```

---

## 12. Implementation Roadmap

### Phase 1: Foundation
- [x] Create Next.js project + Tailwind
- [ ] Configure content collections (MDX)
- [ ] Set up path aliases and project structure
- [ ] Create base layout (Header, Footer)

### Phase 2: Design System
- [ ] Build Container, Section, Button components
- [ ] Build Card, Badge, TagList components
- [ ] Establish typography scale
- [ ] Define color tokens
- [ ] Dark mode implementation

### Phase 3: Content Infrastructure
- [ ] Create project content collection schema
- [ ] Create writing content collection schema
- [ ] Add sample project entries
- [ ] Build ProjectCard component

### Phase 4: Pages
- [ ] Build Home page with featured selection
- [ ] Build /projects with filtering + search
- [ ] Build project detail layout [slug]
- [ ] Build /resume page
- [ ] Build /about page
- [ ] Build /contact page

### Phase 5: Polish
- [ ] Add "Project Explorer" hook feature
- [ ] Implement SEO (meta, OG, sitemap)
- [ ] Optimize images
- [ ] Accessibility audit
- [ ] Performance audit

### Phase 6: Launch
- [ ] Final content review
- [ ] Deploy to Netlify/Vercel
- [ ] Test all routes
- [ ] Verify analytics (if added)

---

## 13. Content Status

### Projects to Add
| Project | Type | Status | Featured |
|---------|------|--------|----------|
| TBD | web | - | - |
| TBD | data | - | - |
| TBD | ml | - | - |

*To be populated with actual project data*

### Writing Posts
| Title | Status | Published |
|-------|--------|-----------|
| TBD | - | - |

*Optional — only add if high-quality content exists*

---

## 14. Environment Variables

```env
# .env.local (if needed)
NEXT_PUBLIC_SITE_URL=https://omaradjei.com

# Optional: HuggingFace demo (if implemented)
HF_API_TOKEN=your_token_here
```

---

## 15. Deployment

### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Domain
- Primary: TBD (e.g., omaradjei.com)
- Preview: Auto-generated Netlify URLs

---

## 16. Quick Reference

### Adding a New Project
1. Create `/content/projects/project-slug.mdx`
2. Fill in frontmatter (see template above)
3. Write case study content
4. Add images to `/public/images/projects/project-slug/`
5. Set `featured: true` if it should appear on homepage

### Controlling Featured Projects
- Set `featured: true` in project frontmatter
- Limit to 3–6 featured projects
- Order by quality/relevance, not recency

### File Locations
| Content | Location |
|---------|----------|
| Projects | `/content/projects/*.mdx` |
| Writing | `/content/writing/*.mdx` |
| Resume | `/public/resume.pdf` |
| Images | `/public/images/` |
| Components | `/components/` |
| Pages | `/app/` |

---

## 17. Do Not Do

- ❌ Add fake metrics or achievements
- ❌ Use template-looking designs
- ❌ Add multiple flashy gimmicks
- ❌ Include "I'm passionate about..." copy
- ❌ Over-engineer or add unnecessary features
- ❌ Create chatbots on homepage
- ❌ Use rainbow gradients or multiple accent colors
- ❌ Sacrifice performance for visual effects

---

## 18. Must Do

- ✅ Make it scannable in 15 seconds
- ✅ Hook recruiters in 5 seconds
- ✅ Show real, verifiable work
- ✅ Include GitHub links and live demos
- ✅ Maintain Lighthouse 90+ scores
- ✅ Use semantic HTML
- ✅ Support keyboard navigation
- ✅ Keep copy short and specific

---

*This document is the single source of truth for the Omar SWE Portfolio project. Update it as decisions are made and features are implemented.*
