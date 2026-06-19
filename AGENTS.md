<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# What Happened Here? - AI Context

## Project Overview

**城市时间线档案馆** - A static history exploration website with two main features:

1. **城市时间线 (Primary)** - Help users understand how cities formed through interactive timelines
2. **世界地标 (Secondary)** - Famous landmarks history

**Core insight:** World-famous landmarks are well-documented everywhere, but local city history (like Tangshan, Baoding) is hard to find unless you visit a museum. This site fills that gap.

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
│   │   ├── cities/                # City data files
│   │   │   ├── tangshan.json
│   │   │   ├── baoding.json
│   │   │   └── tianjin.json
│   │   ├── locations.json         # Landmarks index
│   │   ├── tokyo-station.json     # Individual landmark data
│   │   └── ...
│   └── images/
│       ├── cities/                # City cover images
│       └── ...                    # Landmark images
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Homepage (cities + landmarks)
│   │   ├── city/[id]/page.tsx     # City detail (SSG)
│   │   ├── location/[id]/page.tsx # Landmark detail (SSG)
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── Header.tsx             # Navigation with city/landmark tabs
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx        # Homepage hero with tab switcher
│   │   ├── CitySearchBar.tsx      # City search
│   │   ├── CityCard.tsx           # City preview card
│   │   ├── FeaturedCities.tsx     # City grid section
│   │   ├── CityHero.tsx           # City detail header
│   │   ├── CityTimeline.tsx       # City timeline with era filter
│   │   ├── RelatedCities.tsx      # Related cities
│   │   ├── SearchBar.tsx          # Landmark search
│   │   ├── LocationCard.tsx       # Landmark preview card
│   │   ├── FeaturedLocations.tsx  # Landmark grid section
│   │   ├── LocationHero.tsx       # Landmark detail header
│   │   ├── Timeline.tsx           # Landmark timeline
│   │   ├── TimelineEvent.tsx      # Single timeline entry
│   │   ├── ImageGallery.tsx       # Photo gallery with lightbox
│   │   ├── MapView.tsx            # Leaflet map component
│   │   └── RelatedLocations.tsx   # Related locations section
│   ├── lib/
│   │   ├── city-data.ts           # Client-side city data fetching
│   │   ├── server-city-data.ts    # Server-side city data (for SSG)
│   │   ├── data.ts                # Client-side landmark data fetching
│   │   └── server-data.ts         # Server-side landmark data (for SSG)
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
  "relatedCities": ["baoding", "tianjin"],
  "relatedLocations": ["forbidden-city"]
}
```

**Era types:** `ancient` (古代), `modern` (近代 1800-1949), `contemporary` (现代 1949+)

### Landmark Index (`public/data/locations.json`)

```json
[
  {
    "id": "tokyo-station",
    "name": "Tokyo Station",
    "nameLocal": "東京駅",
    "country": "Japan",
    "city": "Tokyo",
    "coverImage": "/images/tokyo-station.jpg",
    "summary": "Brief description..."
  }
]
```

## Key Implementation Details

### City Navigation

- City detail pages have left/right navigation arrows to switch between cities
- Navigation follows the order in `cities-index.json` (circular: first ↔ last)
- Only visible on medium screens and above (`hidden md:block`)
- Uses `getAdjacentCities()` from `server-city-data.ts`

### Static Site Generation (SSG)

- Uses `output: 'export'` in `next.config.ts`
- `generateStaticParams()` in `location/[id]/page.tsx` pre-generates all location pages
- Server-side data loading uses `fs.readFileSync` in `server-data.ts`
- Client-side data loading uses `fetch` in `data.ts`

### Image Handling

- All images stored in `public/images/`
- Images are from Unsplash (free commercial use)
- Cover images: `{location-id}.jpg`
- Timeline images: `{location-id}-{year}.jpg`

### Map Integration

- Uses Leaflet + OpenStreetMap (no API key required)
- Dynamic import to avoid SSR issues
- Default marker icons from unpkg CDN

### Search

- Client-side fuzzy matching
- Searches: name, nameLocal, country, city, summary
- Debounced input (300ms)

## Adding New Cities

1. Create JSON file in `public/data/cities/{city-id}.json`
2. Add entry to `public/data/cities-index.json`
3. Add cover image to `public/images/cities/`
4. Rebuild: `npm run build`

## Adding New Landmarks

1. Create JSON file in `public/data/{location-id}.json`
2. Add entry to `public/data/locations.json`
3. Add images to `public/images/`
4. Rebuild: `npm run build`

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build static site to out/
npm run lint     # Run ESLint
```

## Important Notes

- **BasePath:** Development mode uses empty basePath (`http://localhost:3000/`), production uses `/WhatHappenedHere`. This is controlled by `NODE_ENV` in `next.config.ts`, `src/lib/fetch.ts`, and `src/lib/utils.ts`.
- **Image paths:** All image paths in JSON data files are relative (e.g., `/images/xxx.jpg`), components use `getPath()` from `@/lib/utils` to add the basePath prefix.
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

## Current Landmarks (30 total)

### Asia (7)
- `tokyo-station` - Tokyo Station, Japan (東京駅)
- `great-wall` - Great Wall of China, China (长城)
- `taj-mahal` - Taj Mahal, India (泰姬陵)
- `angkor-wat` - Angkor Wat, Cambodia (吴哥窟)
- `mount-fuji` - Mount Fuji, Japan (富士山)
- `petronas-towers` - Petronas Towers, Malaysia (双子塔)
- `merlion` - Merlion Park, Singapore (鱼尾狮)

### Europe (11)
- `eiffel-tower` - Eiffel Tower, France (Tour Eiffel)
- `forbidden-city` - Forbidden City, China (紫禁城) - *Note: Beijing is in Asia*
- `big-ben` - Big Ben, UK (大本钟)
- `colosseum` - Colosseum, Italy (罗马斗兽场)
- `acropolis` - Acropolis, Greece (雅典卫城)
- `brandenburg-gate` - Brandenburg Gate, Germany (勃兰登堡门)
- `sagrada-familia` - Sagrada Familia, Spain (圣家堂)
- `stonehenge` - Stonehenge, UK (巨石阵)
- `tower-bridge` - Tower Bridge, UK (伦敦塔桥)
- `versailles` - Palace of Versailles, France (凡尔赛宫)
- `mont-saint-michel` - Mont Saint-Michel, France (圣米歇尔山)

### Americas (6)
- `times-square` - Times Square, USA (时代广场)
- `statue-of-liberty` - Statue of Liberty, USA (自由女神像)
- `machu-picchu` - Machu Picchu, Peru (马丘比丘)
- `christ-redeemer` - Christ the Redeemer, Brazil (基督救世主雕像)
- `golden-gate-bridge` - Golden Gate Bridge, USA (金门大桥)
- `mount-rushmore` - Mount Rushmore, USA (拉什莫尔山)

### Africa & Middle East (4)
- `pyramids-of-giza` - Pyramids of Giza, Egypt (吉萨金字塔)
- `table-mountain` - Table Mountain, South Africa (桌山)
- `petra` - Petra, Jordan (佩特拉古城)
- `burj-khalifa` - Burj Khalifa, UAE (哈利法塔)

### Oceania (1)
- `sydney-opera-house` - Sydney Opera House, Australia (悉尼歌剧院)

### Special
- `vesuvius` - Mount Vesuvius/Pompeii, Italy (维苏威火山/庞贝)

## Privacy Rule

Assume AGENTS.md may be published publicly.

Never add information from conversations unless the user explicitly requests that it be documented in AGENTS.md.

## Notes for AI

- All data is pre-generated JSON, no database or API
- Images are static files, not dynamically loaded
- The site is fully static, works offline after first load
- Chinese and English are used together (bilingual UI)
- When adding new locations, follow the existing data structure exactly
- The `nameLocal` field is optional (for non-Latin script names)
