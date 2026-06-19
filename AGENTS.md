<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# What Happened Here? - AI Context

## Project Overview

**城市时间线档案馆** - 5分钟，了解一座城。

**Core value:** 来到一座陌生城市，为什么这里叫这个名字？这座城市经历了什么才变成今天这样？用5分钟时间线看懂它的前世今生。

**Core flow:** Search city → View timeline (ancient → modern) → Understand city formation

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Map:** Leaflet + OpenStreetMap (free, no API key needed)
- **Deployment:** GitHub Pages (static export via `next export`)

## Directory Structure

```
what-happened-here/
├── .github/workflows/deploy.yml   # GitHub Pages auto-deploy
├── public/
│   ├── data/
│   │   ├── cities-index.json      # Cities index
│   │   └── cities/                # City data files
│   │       ├── tangshan.json
│   │       ├── baoding.json
│   │       └── ...
│   └── images/
│       └── cities/                # City cover images
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Homepage
│   │   ├── city/[id]/page.tsx     # City detail (SSG)
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── Header.tsx             # Navigation
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx        # Homepage hero with search
│   │   ├── CitySearchBar.tsx      # City search
│   │   ├── CityCard.tsx           # City preview card
│   │   ├── FeaturedCities.tsx     # City grid section
│   │   ├── CityHero.tsx           # City detail header
│   │   ├── CityTimeline.tsx       # City timeline with era filter
│   │   ├── CityNavigation.tsx     # Left/right city navigation
│   │   ├── RelatedCities.tsx      # Related cities
│   │   ├── ImageGallery.tsx       # Photo gallery with lightbox
│   │   └── MapView.tsx            # Leaflet map component
│   ├── lib/
│   │   ├── city-data.ts           # Client-side city data fetching
│   │   ├── server-city-data.ts    # Server-side city data (for SSG)
│   │   ├── fetch.ts               # Base path helper
│   │   └── utils.ts               # Path utility + BASE_PATH
│   └── types/
│       └── index.ts               # TypeScript interfaces
├── next.config.ts                 # Static export config
├── package.json
└── AGENTS.md                      # This file
```

## Data Format

### City Index (`public/data/cities-index.json`)

```json
[
  {
    "id": "tangshan",
    "name": "Tangshan",
    "nameLocal": "唐山",
    "province": "河北",
    "coverImage": "/images/cities/tangshan.jpg",
    "summary": "Brief description..."
  }
]
```

### City Detail (`public/data/cities/{id}.json`)

```json
{
  "id": "tangshan",
  "name": "Tangshan",
  "nameLocal": "唐山",
  "province": "河北",
  "lat": 39.6292,
  "lng": 118.1802,
  "summary": "Brief summary...",
  "description": "Detailed description...",
  "coverImage": "/images/cities/tangshan.jpg",
  "timeline": [
    {
      "year": "645",
      "era": "ancient",
      "title": "唐太宗东征驻跸",
      "description": "Detailed description...",
      "image": "/images/cities/tangshan-645.jpg"
    }
  ],
  "images": [...],
  "relatedCities": ["baoding", "tianjin"]
}
```

**Era types:** `ancient` (古代), `modern` (近代 1800-1949), `contemporary` (现代 1949+)

## Key Implementation Details

### City Navigation

- City detail pages have left/right navigation to switch between cities
- Navigation follows the order in `cities-index.json` (circular: first ↔ last)
- Only visible on medium screens and above (`hidden md:block`)
- Shows when hovering over bottom-left/right corners
- Uses `getAdjacentCities()` from `server-city-data.ts`

### Static Site Generation (SSG)

- Uses `output: 'export'` in `next.config.ts`
- `generateStaticParams()` in `city/[id]/page.tsx` pre-generates all city pages
- Server-side data loading uses `fs.readFileSync` in `server-city-data.ts`
- Client-side data loading uses `fetch` in `city-data.ts`

### Image Handling

- All images stored in `public/images/cities/`
- Cover images: `{city-id}.jpg`
- Timeline images: `{city-id}-{year}.jpg`

### Map Integration

- Uses Leaflet + OpenStreetMap (no API key required)
- Dynamic import to avoid SSR issues
- Default marker icons from unpkg CDN

### Search

- Client-side fuzzy matching
- Searches: name, nameLocal, province, summary
- Debounced input (300ms)

## Adding New Cities

1. Create JSON file in `public/data/cities/{city-id}.json`
2. Add entry to `public/data/cities-index.json`
3. Add cover image to `public/images/cities/`
4. Rebuild: `npm run build`

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build static site to out/
npm run lint     # Run ESLint
```

## Important Notes

- **BasePath:** Development mode uses empty basePath (`http://localhost:3000/`), production uses `/WhatHappenedHere`. This is controlled by `NODE_ENV` in `next.config.ts`, `src/lib/fetch.ts`, and `src/lib/utils.ts`.
- **Image paths:** All image paths in JSON data files are relative (e.g., `/images/cities/xxx.jpg`), components use `getPath()` from `@/lib/utils` to add the basePath prefix.
- **JSON format:** City JSON files contain Chinese text. Ensure Chinese quotes use proper Unicode characters (`"..."`) not ASCII double quotes (`"..."`) inside string values.

## Current Cities (13 total)

- `tangshan` - 唐山, 河北 (30 events: ancient → modern)
- `baoding` - 保定, 河北 (30 events: ancient → modern)
- `tianjin` - 天津, 天津 (30 events: ancient → modern)
- `xian` - 西安, 陕西 (30 events: ancient → modern)
- `nanjing` - 南京, 江苏 (30 events: ancient → modern)
- `chengdu` - 成都, 四川 (30 events: ancient → modern)
- `hangzhou` - 杭州, 浙江 (30 events: ancient → modern)
- `luoyang` - 洛阳, 河南 (30 events: ancient → modern)
- `beijing` - 北京, 北京 (30 events: ancient → modern)
- `shanghai` - 上海, 上海 (30 events: ancient → modern)
- `guangzhou` - 广州, 广东 (30 events: ancient → modern)
- `shenzhen` - 深圳, 广东 (30 events: ancient → modern)
- `chongqing` - 重庆, 重庆 (30 events: ancient → modern)

## Privacy Rule

Assume AGENTS.md may be published publicly.

Never add information from conversations unless the user explicitly requests that it be documented in AGENTS.md.

## Notes for AI

- All data is pre-generated JSON, no database or API
- Images are static files, not dynamically loaded
- The site is fully static, works offline after first load
- Chinese and English are used together (bilingual UI)
- When adding new cities, follow the existing data structure exactly
- The `nameLocal` field is optional (for non-Latin script names)
