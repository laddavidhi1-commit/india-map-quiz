# India Encyclopedia — Illustrated

A Chumbak-style interactive encyclopedia of India with D3-powered zoomable map.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features

- Real India GeoJSON map with accurate state boundaries
- Click any state → sidebar reveals Geography, History, Weather, Demographics, Cities
- Scroll/pinch to zoom in · Double-click a state to auto-zoom
- Click a city dot on the map (or in the city list) → city detail panel
- Breadcrumb navigation: India › State › City
- ↺ Reset button returns to full India view
- Chumbak-inspired design: Playfair Display + Caveat fonts, saffron/cream palette, hand-drawn dotted borders

## States with full data (16 of 36)
Rajasthan, Maharashtra, Karnataka, Kerala, Tamil Nadu, Gujarat,
Uttar Pradesh, West Bengal, Madhya Pradesh, Punjab, Assam,
Telangana, Andhra Pradesh, Bihar, Odisha, Delhi, Goa

## To add more state data
Edit `src/data/states.js` — add an entry to `stateInfo` following the existing pattern.

## Tech stack
- D3.js v7 — map rendering, zoom, projections
- Vite — dev server & bundler
- Google Fonts: Playfair Display + Caveat
- GeoJSON from india-geojson npm package (loaded via CDN at runtime)
