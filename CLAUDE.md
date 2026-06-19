# What Happened Here? - AI Context

## Project Overview

A static history exploration website where users discover historical events at famous landmarks through interactive timelines.

**Core flow:** Select location → View timeline → Browse historical photos → See map position

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
│   ├── data/                      # Location JSON data files
│   │   ├── locations.json         # Index of all locations
│   │   ├── tokyo-station.json     # Individual location data
│   │   ├── eiffel-tower.json
│   │   └── forbidden-city.json
│   └── images/                    # Historical photos
│       ├── tokyo-station.jpg      # Cover images
│       ├── tokyo-station-1914.jpg # Timeline event images
│       └── ...
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Header/Footer
│   │   ├── page.tsx               # Homepage
│   │   ├── not-found.tsx          # 404 page
│   │   └── location/[id]/page.tsx # Location detail (SSG)
│   ├── components/
│   │   ├── Header.tsx             # Fixed navigation bar
│   │   ├── Footer.tsx             # Site footer
│   │   ├── HeroSection.tsx        # Homepage hero with search
│   │   ├── SearchBar.tsx          # Fuzzy search component
│   │   ├── LocationCard.tsx       # Location preview card
│   │   ├── FeaturedLocations.tsx  # Location grid section
│   │   ├── LocationHero.tsx       # Location detail header
│   │   ├── Timeline.tsx           # Historical timeline container
│   │   ├── TimelineEvent.tsx      # Single timeline entry
│   │   ├── ImageGallery.tsx       # Photo gallery with lightbox
│   │   ├── MapView.tsx            # Leaflet map component
│   │   └── RelatedLocations.tsx   # Related locations section
│   ├── lib/
│   │   ├── data.ts                # Client-side data fetching
│   │   └── server-data.ts         # Server-side data (for SSG)
│   └── types/
│       └── index.ts               # TypeScript interfaces
├── next.config.ts                 # Static export config
├── package.json
└── CLAUDE.md                      # This file
```

## Data Format

### Location Index (`public/data/locations.json`)

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

### Location Detail (`public/data/{id}.json`)

```json
{
  "id": "tokyo-station",
  "name": "Tokyo Station",
  "nameLocal": "東京駅",
  "country": "Japan",
  "city": "Tokyo",
  "lat": 35.681236,
  "lng": 139.767125,
  "summary": "Full description...",
  "coverImage": "/images/tokyo-station.jpg",
  "timeline": [
    {
      "year": "1914",
      "title": "Station Opens",
      "description": "Detailed event description...",
      "image": "/images/tokyo-station-1914.jpg"
    }
  ],
  "images": [
    {
      "url": "/images/tokyo-station-1914.jpg",
      "year": "1914",
      "caption": "Photo description..."
    }
  ],
  "relatedLocations": ["forbidden-city", "big-ben"]
}
```

## Key Implementation Details

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

## Adding New Locations

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

## Current Locations

- `tokyo-station` - Tokyo Station, Japan
- `eiffel-tower` - Eiffel Tower, France
- `forbidden-city` - Forbidden City, China
- `times-square` - Times Square, USA
- `big-ben` - Big Ben, UK

## Future Plans (from PDF)

- **V2:** Historical map comparison (slider to switch between eras)
- **V3:** "Time Travel Mode" - "If you stood here in 1900, what would you see?"

## Notes for AI

- All data is pre-generated JSON, no database or API
- Images are static files, not dynamically loaded
- The site is fully static, works offline after first load
- Chinese and English are used together (bilingual UI)
- When adding new locations, follow the existing data structure exactly
- The `nameLocal` field is optional (for non-Latin script names)
