# India Encyclopedia — Project Context for Claude

## What this is
An interactive illustrated encyclopedia of India built with D3.js + Vite. Users see a zoomable map of India; clicking a state zooms in and reveals a sidebar with Geography, History, Weather, Demographics, and Cities. Clicking a city zooms further and shows city-level detail.

## Design brief
- **Style**: Chumbak-inspired (Indian lifestyle brand — bold, flat, illustrated, playful but editorial)
- **Fonts**: Lalezar (headings — retro bold display) + Montserrat (body — clean geometric)
- **Color palette**: Each Indian state gets a distinct bold flat color (coral, teal, mustard, cobalt, olive, berry etc.) — NOT a political atlas palette. White borders between states.
- **Background**: Cream `#FBF3E4` / paper `#F5ECD6`, saffron accent `#D4541A`
- **Ocean**: Teal `#6AAEC8` or `#B8D8E8`
- **NO**: gradients, shadows, handwritten fonts, generic political map colors

## Tech stack
- **D3.js v7** — map rendering, geoMercator projection, zoom/pan
- **Vite v5** — dev server and bundler
- **GeoJSON** — bundled locally at `public/india.geo.json` (from @highcharts/map-collection)
- **Google Fonts** — Lalezar + Montserrat (loaded via CDN in index.html)
- No framework — vanilla JS + D3 only

## File structure
```
india-encyclopedia/
├── index.html              # Full app shell + all CSS
├── vite.config.js          # Vite config (root: '.', port: 5173)
├── package.json
├── public/
│   └── india.geo.json      # Bundled India GeoJSON (36 states/UTs, property key: 'name')
└── src/
    ├── main.js             # All D3 map logic — projection, zoom, draw, click handlers
    └── data/
        └── states.js       # State data + city data + color map
```

## GeoJSON details
- Source: `@highcharts/map-collection/countries/in/in-all.geo.json`
- 36 features (states + UTs)
- Property key for state name: `feature.properties.name` (lowercase)
- All state names exactly as they appear:
  Tamil Nadu, Puducherry, Himachal Pradesh, Sikkim, Delhi, Uttar Pradesh, Haryana,
  Punjab, Chandigarh, Rajasthan, Jammu and Kashmir, Gujarat, Madhya Pradesh,
  Maharashtra, Dadra and Nagar Haveli and Daman and Diu, Bihar, West Bengal,
  Jharkhand, Chhattisgarh, Odisha, Kerala, Karnataka, Andhra Pradesh,
  Andaman and Nicobar Islands, Assam, Tripura, Arunachal Pradesh, Lakshadweep,
  Meghalaya, Manipur, Nagaland, Mizoram, Telangana, Ladakh, Uttarakhand, Goa

## Key functions in main.js
- `init()` — entry point, loads GeoJSON, calls setupSVG + drawMap
- `setupSVG()` — creates SVG, sets up projection + zoom behavior
- `drawMap(features)` — renders state paths, labels, sea text
- `drawCities(stateName)` — places city dots + labels on map after state click
- `selectState(feature, name)` — handles state click: zoom + sidebar + cities
- `zoomToFeature(feature)` — D3 zoom transition to fit a feature in viewport
- `renderSidebar(stateName)` — populates right sidebar with state data
- `showCityPanel(city, stateName)` — city detail view in sidebar + zoom to city
- `resetView()` — returns to full India view
- `updateBreadcrumb(state, city)` — updates header breadcrumb trail
- `window.encyclopediaApp` — exposes resetView, zoomBy, openCity, backToState globally

## Known issues being worked on
1. **Map not rendering** — state path shapes not appearing, only ocean background + jumbled labels. Suspected cause: SVG dimensions not being read correctly at init time (col.clientWidth returning 0). Fix: use window.innerWidth - 300 as fallback, or defer init to after layout paint.
2. **Label overlap** — all state labels stacking in top-left. Same root cause as above — projection translates to wrong center when W/H=0.

## How to debug map rendering
In browser console:
```js
// Check if SVG has dimensions
document.getElementById('map-svg').getAttribute('width')

// Check if features loaded
// Should log 36
document.querySelectorAll('.state-path').length

// Check projection is working
// Should return pixel coords, not NaN
```

## States with full sidebar data (16 states)
Rajasthan, Maharashtra, Karnataka, Kerala, Tamil Nadu, Gujarat, Uttar Pradesh,
West Bengal, Madhya Pradesh, Punjab, Assam, Telangana, Andhra Pradesh, Bihar, Odisha, Delhi, Goa

## States needing data added (20 remaining)
Jammu and Kashmir, Ladakh, Himachal Pradesh, Uttarakhand, Haryana, Sikkim,
Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Jharkhand,
Chhattisgarh, Gujarat (partial), Chandigarh, Puducherry, Lakshadweep,
Andaman and Nicobar Islands, Dadra and Nagar Haveli and Daman and Diu

## stateInfo object structure (in src/data/states.js)
```js
"State Name": {
  icon: "🏯",           // emoji representing the state
  capital: "City",
  pop: "60M",
  area: "191,791 km²",
  lang: "Kannada",
  region: "South India",
  geo: "...",           // 2-3 sentence geography description
  history: "...",       // 2-3 sentence history
  weather: {
    summer: "35°C",
    winter: "15°C",
    rain: "800–3000mm",
    best: "Oct – Feb"
  },
  demog: "...",         // demographics paragraph
  tags: ["tag1", "tag2", ...],   // 4-6 highlight tags
  cities: [
    { name: "Bengaluru", pop: "12.3M", capital: true, lat: 12.97, lng: 77.59, icon: "💻" },
    ...
  ]
}
```

## stateColors object (in src/data/states.js)
Maps state name → hex color. Each state has a distinct bold flat color.
Must use exact GeoJSON state name as the key.

## How to run
```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

## Immediate next tasks
1. Fix map rendering (state paths not showing, label overlap)
2. Add sidebar data for remaining 20 states
3. Add illustrated SVG icons/doodles on the map (elephants, camels, temples etc. at geographic coordinates)
4. Add a legend showing region groupings
5. Mobile responsiveness
