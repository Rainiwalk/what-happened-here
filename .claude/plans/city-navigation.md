# Plan: Add City Navigation (Left/Right Arrows)

## Goal
Add left/right navigation buttons on city detail pages to quickly jump to adjacent cities.

## Design
- Fixed position arrows on left and right sides of the screen
- Show city name on hover or always visible
- Cycle through cities (last city → first city, first city → last city)
- Use cities-index.json order for navigation sequence

## Implementation

### 1. Modify `src/app/city/[id]/page.tsx`
- Import cities index data (use `getAllCitiesSync` from server-city-data)
- Find current city index in the list
- Calculate prev/next city IDs
- Pass prev/next city info to CityNavigation component

### 2. Create `src/components/CityNavigation.tsx`
- Client component with Link buttons
- Left arrow: previous city
- Right arrow: next city
- Show city name (nameLocal) as tooltip or label
- Fixed positioning, responsive design
- Use Framer Motion for hover effects

## Navigation Order (from cities-index.json)
tangshan → baoding → tianjin → xian → nanjing → chengdu → hangzhou → luoyang → beijing → shanghai → guangzhou → shenzhen → chongqing → (back to tangshan)
