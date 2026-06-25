import * as d3 from "d3";
import { stateInfo } from "./data/states.js";
import { cityDetails } from "./data/cityDetails.js";


let svgEl, mapG, projection, pathGen, zoomBehavior, currentK = 1;
let activeStateName = null;
let allFeatures = [];
let allCitiesByState = {};  // GeoNames cities grouped by state
let tileLayerEl = null;     // tile layer DOM element

function getStateName(p) {
  return p.ST_NM || p.name || p.NAME_1 || p.st_nm || p.NAME || "";
}

async function loadGeoJSON() {
  // Load bundled local file first (most reliable)
  try {
    const res = await fetch("/india.geo.json");
    if (res.ok) {
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        console.log("Loaded local GeoJSON:", data.features.length, "features");
        return data.features;
      }
    }
  } catch (e) { console.warn("Local GeoJSON failed:", e); }

  // Fallbacks
  const urls = [
    "https://cdn.jsdelivr.net/npm/@highcharts/map-collection/countries/in/in-all.geo.json",
    "https://cdn.jsdelivr.net/gh/geohacker/india@master/state/india.geojson",
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.features?.length) return data.features;
    } catch { continue; }
  }
  return null;
}

function setupSVG(featureCollection) {
  const col = document.getElementById("map-col");
  const W = col.clientWidth || (window.innerWidth - 300);
  const H = col.clientHeight || (window.innerHeight - 52);
  svgEl = d3.select("#map-svg").attr("width", W).attr("height", H);
  mapG = d3.select("#map-g");

  projection = d3.geoMercator()
    .fitExtent([[20, 20], [W - 20, H - 20]], featureCollection);

  pathGen = d3.geoPath().projection(projection);

  zoomBehavior = d3.zoom()
    .scaleExtent([0.4, 20])
    .on("zoom", (event) => {
      currentK = event.transform.k;
      mapG.attr("transform", event.transform);
      updateScaledElements(currentK);
      if (currentK > 1.8) document.getElementById("zoom-hint").style.opacity = "0";
    });

  svgEl.call(zoomBehavior);
  return { W, H };
}

function updateScaledElements(k) {
  d3.selectAll(".state-path").attr("stroke-width", Math.max(0.3, 0.8 / k));
  d3.selectAll(".state-label")
    .attr("font-size", Math.max(4, Math.min(8, 7 / k)))
    .attr("stroke-width", 1.5 / k);
  d3.selectAll(".city-dot").each(function() {
    const base = +d3.select(this).attr("data-r");
    d3.select(this).attr("r", base / k);
  });
  d3.selectAll(".city-label")
    .attr("font-size", Math.max(5, 8 / k))
    .attr("stroke-width", 2 / k);
  updateCityLabelVisibility(k);
  updateTileLayer(k);
}

function drawMap(features) {
  const col = document.getElementById("map-col");
  const W = col.clientWidth;
  const H = col.clientHeight;

  // Ocean background
  mapG.append("rect")
    .attr("x", -5000).attr("y", -5000)
    .attr("width", 12000).attr("height", 12000)
    .attr("fill", "#6AAEC8");

  // Sea labels
  [
    { label: "ARABIAN SEA", lat: 15.5, lng: 69.5 },
    { label: "BAY OF BENGAL", lat: 13.5, lng: 88.5 },
    { label: "INDIAN OCEAN", lat: 6.5, lng: 78.5 },
  ].forEach(s => {
    const [px, py] = projection([s.lng, s.lat]);
    mapG.append("text")
      .attr("x", px).attr("y", py)
      .attr("class", "sea-text")
      .attr("text-anchor", "middle")
      .attr("font-size", "10")
      .attr("letter-spacing", "2")
      .text(s.label);
  });

  const tooltip = d3.select("#tooltip");

  // Draw states
  mapG.selectAll(".state-path")
    .data(features)
    .enter().append("path")
    .attr("class", "state-path")
    .attr("d", pathGen)
    .attr("fill", "#1A1A1A")
    .on("mouseover", function(event, d) {
      const name = getStateName(d.properties);
      tooltip.text(name).style("opacity", "1");
    })
    .on("mousemove", function(event) {
      const [mx, my] = d3.pointer(event, document.getElementById("map-col"));
      tooltip.style("left", (mx + 14) + "px").style("top", (my - 36) + "px");
    })
    .on("mouseout", () => tooltip.style("opacity", "0"))
    .on("click", function(event, d) {
      event.stopPropagation();
      const name = getStateName(d.properties);
      selectState(d, name);
    })
    .on("dblclick", function(event, d) {
      event.stopPropagation();
      const name = getStateName(d.properties);
      selectState(d, name, true);
    });

  // State labels
  features.forEach(d => {
    const name = getStateName(d.properties);
    const centroid = pathGen.centroid(d);
    if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return;

    const short = name
      .replace("Arunachal Pradesh", "Arunachal")
      .replace("Himachal Pradesh", "Himachal")
      .replace("Andaman and Nicobar Islands", "A & N")
      .replace("Dadra and Nagar Haveli and Daman and Diu", "DNHDD")
      .replace("Jammu and Kashmir", "J & K");

    mapG.append("text")
      .attr("class", "state-label")
      .attr("x", centroid[0]).attr("y", centroid[1])
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "7")
      .attr("font-weight", "500")
      .attr("fill", "#E53935")
      .attr("stroke", "rgba(0,0,0,0.7)")
      .attr("stroke-width", "1.5")
      .text(short);
  });
}

function zoomToFeature(feature, fast = false) {
  const col = document.getElementById("map-col");
  const W = col.clientWidth;
  const H = col.clientHeight;
  const [[x0, y0], [x1, y1]] = pathGen.bounds(feature);
  const dx = x1 - x0, dy = y1 - y0;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const scale = Math.max(1.2, Math.min(14, 0.72 / Math.max(dx / W, dy / H)));
  const tx = W / 2 - scale * cx;
  const ty = H / 2 - scale * cy;

  svgEl.transition().duration(fast ? 400 : 750)
    .call(zoomBehavior.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
}

function drawCities(stateName) {
  mapG.selectAll(".city-dot, .city-label").remove();

  // Merge stateInfo cities (with icons, capital flag) and GeoNames cities
  const info = stateInfo[stateName];
  const geoNamesCities = allCitiesByState[stateName] || [];
  const stateInfoNames = new Set((info?.cities || []).map(c => c.name));

  // Draw stateInfo cities first (these are clickable with rich data)
  if (info?.cities) {
    info.cities.forEach(city => {
      const pop = parsePopString(city.pop);
      const r = city.capital ? 5 : (pop > 1000000 ? 4.5 : 3.5);
      const [cx, cy] = projection([city.lng, city.lat]);

      mapG.append("circle")
        .attr("class", "city-dot")
        .attr("cx", cx).attr("cy", cy)
        .attr("r", r / currentK)
        .attr("data-r", r)
        .attr("data-pop", pop)
        .attr("fill", city.capital ? "#fff" : "rgba(255,255,255,0.85)")
        .attr("stroke", "#D4541A")
        .attr("stroke-width", (city.capital ? 2 : 1.5) / currentK)
        .on("click", e => { e.stopPropagation(); showCityPanel(city, stateName); })
        .on("mouseover", function() { d3.select(this).attr("r", (r + 2) / currentK); })
        .on("mouseout", function() { d3.select(this).attr("r", r / currentK); });

      mapG.append("text")
        .attr("class", "city-label")
        .attr("x", cx + 6 / currentK)
        .attr("y", cy + 3 / currentK)
        .attr("font-size", 8 / currentK)
        .attr("data-pop", pop)
        .attr("fill", "#fff")
        .attr("stroke", "rgba(0,0,0,0.4)")
        .attr("stroke-width", 2 / currentK)
        .text(city.name + (city.capital ? " ★" : ""))
        .on("click", e => { e.stopPropagation(); showCityPanel(city, stateName); });
    });
  }

  // Draw additional GeoNames cities (not in stateInfo)
  geoNamesCities.forEach(gc => {
    if (stateInfoNames.has(gc.name)) return; // skip duplicates
    const pop = gc.pop;
    // Tier sizing: metro (>1M) r=4.5, city (50K-1M) r=3, town (<50K) r=1.5
    const r = pop > 1000000 ? 4.5 : (pop > 50000 ? 3 : 1.5);
    const [cx, cy] = projection([gc.lng, gc.lat]);
    if (isNaN(cx) || isNaN(cy)) return;

    const cityObj = { name: gc.name, pop: formatPop(pop), lat: gc.lat, lng: gc.lng, capital: gc.capital || false };

    mapG.append("circle")
      .attr("class", "city-dot")
      .attr("cx", cx).attr("cy", cy)
      .attr("r", r / currentK)
      .attr("data-r", r)
      .attr("data-pop", pop)
      .attr("fill", pop > 1000000 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)")
      .attr("stroke", pop > 50000 ? "#D4541A" : "rgba(212,84,26,0.5)")
      .attr("stroke-width", (pop > 50000 ? 1.5 : 1) / currentK)
      .on("click", e => { e.stopPropagation(); showCityPanel(cityObj, stateName); })
      .on("mouseover", function() { d3.select(this).attr("r", (r + 1.5) / currentK); })
      .on("mouseout", function() { d3.select(this).attr("r", r / currentK); });

    mapG.append("text")
      .attr("class", "city-label")
      .attr("x", cx + 5 / currentK)
      .attr("y", cy + 2.5 / currentK)
      .attr("font-size", 7 / currentK)
      .attr("data-pop", pop)
      .attr("fill", "rgba(255,255,255,0.8)")
      .attr("stroke", "rgba(0,0,0,0.35)")
      .attr("stroke-width", 1.5 / currentK)
      .text(gc.name)
      .on("click", e => { e.stopPropagation(); showCityPanel(cityObj, stateName); });
  });

  // Apply initial visibility based on current zoom
  updateCityLabelVisibility(currentK);
}

function parsePopString(popStr) {
  if (typeof popStr === 'number') return popStr;
  const s = String(popStr).replace(/,/g, '');
  const m = s.match(/([\d.]+)\s*M/i);
  if (m) return parseFloat(m[1]) * 1000000;
  return parseFloat(s) || 0;
}

function formatPop(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return String(n);
}

function updateCityLabelVisibility(k) {
  d3.selectAll(".city-label").each(function() {
    const pop = +d3.select(this).attr("data-pop");
    let visible = false;
    if (k < 3) {
      // Country view: only metros
      visible = pop > 8000000;
    } else if (k < 5) {
      // State zoom: only top metros (>2M)
      visible = pop > 2000000;
    } else if (k < 8) {
      // Medium zoom: major cities (>500K)
      visible = pop > 500000;
    } else if (k < 12) {
      // Deep zoom: cities > 100K
      visible = pop > 100000;
    } else {
      // Very deep zoom: cities > 20K
      visible = pop > 20000;
    }
    d3.select(this).attr("display", visible ? null : "none");
  });

  // Also toggle small city dots visibility
  d3.selectAll(".city-dot").each(function() {
    const pop = +d3.select(this).attr("data-pop");
    let visible = true;
    if (k < 5) {
      visible = pop > 100000;
    } else if (k < 8) {
      visible = pop > 20000;
    }
    d3.select(this).attr("display", visible ? null : "none");
  });

  // Hide state labels when zoomed into a state with cities showing
  const hideStateLabels = activeStateName && k > 2;
  d3.selectAll(".state-label").attr("display", hideStateLabels ? "none" : null);
}

function selectState(feature, name, skipZoom = false) {
  d3.selectAll(".state-path").classed("active", false);
  d3.selectAll(".state-path")
    .filter(d => getStateName(d.properties) === name)
    .classed("active", true);

  activeStateName = name;
  drawCities(name);
  renderSidebar(name);
  updateBreadcrumb(name, null);
  zoomToFeature(feature);
}

function renderSidebar(stateName) {
  const info = stateInfo[stateName];
  const inner = document.getElementById("sidebar-inner");

  if (!info) {
    inner.innerHTML = `
      <div class="s-icon">🗺️</div>
      <div class="s-name">${stateName}</div>
      <div class="s-sub">Data coming soon</div>
    `;
    return;
  }

  inner.innerHTML = `
    <div>
      <div class="s-icon">${info.icon}</div>
      <div class="s-name">${stateName}</div>
      <div class="s-sub">${info.region} · ${info.lang}</div>
    </div>
    <hr class="divider"/>
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Population</div>
        <div class="stat-val">${info.pop}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Area</div>
        <div class="stat-val" style="font-size:13px">${info.area}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Capital</div>
        <div class="stat-val" style="font-size:13px">${info.capital}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Language</div>
        <div class="stat-val" style="font-size:12px">${info.lang}</div>
      </div>
    </div>
    <hr class="divider"/>
    <div class="section-head">Geography</div>
    <div class="body-text">${info.geo}</div>
    <hr class="divider"/>
    <div class="section-head">History</div>
    <div class="body-text">${info.history}</div>
    <hr class="divider"/>
    <div class="section-head">Weather</div>
    <div class="weather-row">
      <div class="weather-cell">
        <div class="weather-icon">☀️</div>
        <div class="weather-val">${info.weather.summer}</div>
        <div class="weather-label">Summer</div>
      </div>
      <div class="weather-cell">
        <div class="weather-icon">❄️</div>
        <div class="weather-val">${info.weather.winter}</div>
        <div class="weather-label">Winter</div>
      </div>
      <div class="weather-cell">
        <div class="weather-icon">🌧️</div>
        <div class="weather-val" style="font-size:11px">${info.weather.rain}</div>
        <div class="weather-label">Rainfall</div>
      </div>
      <div class="weather-cell">
        <div class="weather-icon">🌤️</div>
        <div class="weather-val" style="font-size:10px">${info.weather.best}</div>
        <div class="weather-label">Best time</div>
      </div>
    </div>
    <hr class="divider"/>
    <div class="section-head">People & Society</div>
    <div class="body-text">${info.demog}</div>
    <hr class="divider"/>
    <div class="section-head">Cities — click to explore</div>
    <div class="city-list">
      ${info.cities.map(c => `
        <div class="city-item" onclick="window.encyclopediaApp.openCity(${JSON.stringify(c).replace(/"/g,"&quot;")}, '${stateName}')">
          <div class="city-left">
            <div class="city-bullet" style="background:${c.capital ? '#D4541A' : '#9A6030'}"></div>
            <div class="city-name">${c.name}</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="city-pop">${c.pop}</div>
            ${c.capital ? '<span class="cap-badge">Capital</span>' : ''}
          </div>
        </div>
      `).join("")}
    </div>
    <hr class="divider"/>
    <div class="tag-row">
      ${info.tags.map(t => `<span class="tag">${t}</span>`).join("")}
    </div>
    <hr class="divider"/>
    <a class="wiki-link" href="https://en.wikipedia.org/wiki/${stateName.replace(/ /g, '_')}" target="_blank" rel="noopener">
      📖 Read more on Wikipedia →
    </a>
  `;
}

function showCityPanel(city, stateName) {
  updateBreadcrumb(stateName, city.name);

  const detail = cityDetails[city.name];
  const wikiUrl = detail?.wikipedia || `https://en.wikipedia.org/wiki/${city.name.replace(/ /g, '_')}`;

  let html = `
    <div style="display:flex;align-items:center;gap:8px">
      <button class="back-btn" onclick="window.encyclopediaApp.backToState()">← ${stateName}</button>
    </div>
    <div>
      <div class="s-icon">${city.icon || "🏙️"}</div>
      <div class="s-name">${city.name}</div>
      <div class="s-sub">${stateName}${city.capital ? " · State Capital" : ""}</div>
    </div>
    <hr class="divider"/>
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Population</div>
        <div class="stat-val">${city.pop}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Coordinates</div>
        <div class="stat-val" style="font-size:12px">${city.lat.toFixed(1)}°N ${city.lng.toFixed(1)}°E</div>
      </div>
      ${detail ? `
      <div class="stat-card">
        <div class="stat-label">Elevation</div>
        <div class="stat-val" style="font-size:13px">${detail.elevation}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Area</div>
        <div class="stat-val" style="font-size:11px">${detail.area}</div>
      </div>` : ''}
    </div>`;

  if (detail) {
    html += `
    <hr class="divider"/>
    <div class="section-head">Geography</div>
    <div class="body-text">${detail.geography}</div>
    <hr class="divider"/>
    <div class="section-head">Political Info</div>
    <div class="body-text">
      <strong>District:</strong> ${detail.district}<br/>
      <strong>Constituency:</strong> ${detail.constituency}
    </div>
    <hr class="divider"/>
    <div class="section-head">Demographics</div>
    <div class="body-text">${detail.demographics}</div>
    <hr class="divider"/>
    <div class="section-head">Economy</div>
    <div class="body-text">${detail.economy}</div>
    <hr class="divider"/>
    <div class="section-head">Landmarks</div>
    <div class="tag-row">
      ${detail.landmarks.map(l => `<span class="tag">${l}</span>`).join("")}
    </div>`;
  } else {
    const fallback = `${city.name} is one of the key cities of ${stateName}, with a population of ${city.pop}. ${city.capital ? `As the state capital, it serves as the administrative centre of ${stateName}.` : ""}`;
    html += `
    <hr class="divider"/>
    <div class="section-head">About ${city.name}</div>
    <div class="body-text">${fallback}</div>`;
  }

  html += `
    <hr class="divider"/>
    <a class="wiki-link" href="${wikiUrl}" target="_blank" rel="noopener">
      📖 Read more on Wikipedia →
    </a>
  `;

  document.getElementById("sidebar-inner").innerHTML = html;

  // Zoom to city
  const [cx, cy] = projection([city.lng, city.lat]);
  const col = document.getElementById("map-col");
  const W = col.clientWidth, H = col.clientHeight;
  const scale = 10;
  svgEl.transition().duration(650)
    .call(zoomBehavior.transform,
      d3.zoomIdentity.translate(W / 2 - scale * cx, H / 2 - scale * cy).scale(scale));
}

function updateBreadcrumb(state, city) {
  document.getElementById("bc-sep").style.display = state ? "inline" : "none";
  const bcs = document.getElementById("bc-state");
  bcs.style.display = state ? "inline" : "none";
  bcs.textContent = state || "";
  bcs.onclick = state ? () => {
    if (activeStateName) {
      renderSidebar(activeStateName);
      updateBreadcrumb(activeStateName, null);
    }
  } : null;
  document.getElementById("bc-sep2").style.display = city ? "inline" : "none";
  const bcc = document.getElementById("bc-city");
  bcc.style.display = city ? "inline" : "none";
  bcc.textContent = city || "";
}

// ====== Tile Layer (Roadway tiles) ======
function initTileLayer() {
  tileLayerEl = document.getElementById("tile-layer");
}

function updateTileLayer(k) {
  if (!tileLayerEl || !activeStateName) {
    hideTileLayer();
    return;
  }
  // Show tiles when zoomed into a state (k >= 3)
  if (k >= 3) {
    showTileLayer();
  } else {
    hideTileLayer();
  }
}

function showTileLayer() {
  if (!tileLayerEl || !projection) return;
  tileLayerEl.style.display = "block";

  // Make SVG ocean rect semi-transparent so tiles show through
  mapG.select("rect").attr("fill-opacity", 0.3);

  // Get current D3 transform
  const transform = d3.zoomTransform(svgEl.node());
  const k = transform.k;
  const tx = transform.x;
  const ty = transform.y;

  const col = document.getElementById("map-col");
  const W = col.clientWidth;
  const H = col.clientHeight;

  // Calculate the geographic bounds of the current viewport
  // Convert screen corners to geographic coordinates
  const topLeft = projection.invert([(0 - tx) / k, (0 - ty) / k]);
  const bottomRight = projection.invert([(W - tx) / k, (H - ty) / k]);

  if (!topLeft || !bottomRight || isNaN(topLeft[0]) || isNaN(bottomRight[0])) {
    return;
  }

  // Determine appropriate zoom level for tiles
  const tileZ = Math.max(4, Math.min(14, Math.floor(Math.log2(k) + 5)));

  // Convert lng/lat to tile coordinates
  const n = Math.pow(2, tileZ);
  const xMin = Math.floor((topLeft[0] + 180) / 360 * n);
  const xMax = Math.ceil((bottomRight[0] + 180) / 360 * n);
  const yMin = Math.floor((1 - Math.log(Math.tan(bottomRight[1] * Math.PI / 180) + 1 / Math.cos(bottomRight[1] * Math.PI / 180)) / Math.PI) / 2 * n);
  const yMax = Math.ceil((1 - Math.log(Math.tan(topLeft[1] * Math.PI / 180) + 1 / Math.cos(topLeft[1] * Math.PI / 180)) / Math.PI) / 2 * n);

  // Limit tile count to avoid overloading
  const maxTiles = 80;
  const tileCountX = Math.min(xMax - xMin + 1, 15);
  const tileCountY = Math.min(yMax - yMin + 1, 15);
  if (tileCountX * tileCountY > maxTiles) {
    return;
  }

  // Build tile set
  const tiles = [];
  const servers = ['a', 'b', 'c'];
  for (let x = xMin; x <= xMin + tileCountX - 1; x++) {
    for (let y = yMin; y <= yMin + tileCountY - 1; y++) {
      if (x < 0 || x >= n || y < 0 || y >= n) continue;
      const server = servers[(x + y) % 3];
      tiles.push({ x, y, z: tileZ, server });
    }
  }

  // Calculate tile positions in screen space
  // Each tile covers 360/2^z degrees of longitude and varies in lat
  const tileSize = 256;
  const existingKeys = new Set();

  tileLayerEl.innerHTML = ''; // Clear old tiles

  tiles.forEach(t => {
    const key = `${t.z}/${t.x}/${t.y}`;
    existingKeys.add(key);

    // Convert tile corner to geographic then to screen coordinates
    const tileLng = t.x / n * 360 - 180;
    const tileLatRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * t.y / n)));
    const tileLat = tileLatRad * 180 / Math.PI;

    const nextLng = (t.x + 1) / n * 360 - 180;
    const nextLatRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * (t.y + 1) / n)));
    const nextLat = nextLatRad * 180 / Math.PI;

    // Project to screen using D3 projection + transform
    const [px1, py1] = projection([tileLng, tileLat]);
    const [px2, py2] = projection([nextLng, nextLat]);

    const screenX = px1 * k + tx;
    const screenY = py1 * k + ty;
    const screenW = (px2 - px1) * k;
    const screenH = (py2 - py1) * k;

    const img = document.createElement('img');
    img.src = `https://cartodb-basemaps-${t.server}.global.ssl.fastly.net/dark_all/${t.z}/${t.x}/${t.y}.png`;
    img.style.left = screenX + 'px';
    img.style.top = screenY + 'px';
    img.style.width = screenW + 'px';
    img.style.height = screenH + 'px';
    img.style.opacity = '0.7';
    img.loading = 'lazy';
    img.alt = '';
    tileLayerEl.appendChild(img);
  });
}

function hideTileLayer() {
  if (!tileLayerEl) return;
  tileLayerEl.style.display = "none";
  tileLayerEl.innerHTML = '';
  // Restore ocean rect opacity
  if (mapG) mapG.select("rect").attr("fill-opacity", 1);
}

function resetView() {
  activeStateName = null;
  d3.selectAll(".state-path").classed("active", false);
  d3.selectAll(".state-label").attr("display", null); // restore state labels
  mapG.selectAll(".city-dot, .city-label").remove();
  hideTileLayer();
  updateBreadcrumb(null, null);
  svgEl.transition().duration(700).call(zoomBehavior.transform, d3.zoomIdentity);
  document.getElementById("zoom-hint").style.opacity = "1";
  document.getElementById("sidebar-inner").innerHTML = `
    <div class="sidebar-empty">
      <span class="big-icon">🗺️</span>
      Click any state on the map to explore its geography, history, weather &amp; people.<br><br>
      <span style="opacity:0.6; font-size:11px">Scroll to zoom · Double-click to zoom into a state</span>
    </div>
  `;
}

async function loadCities() {
  try {
    const res = await fetch("/india-cities.json");
    if (res.ok) {
      const cities = await res.json();
      // Group by state
      cities.forEach(c => {
        if (!allCitiesByState[c.state]) allCitiesByState[c.state] = [];
        allCitiesByState[c.state].push(c);
      });
      console.log("Loaded cities:", cities.length, "across", Object.keys(allCitiesByState).length, "states");
    }
  } catch (e) {
    console.warn("City data not available:", e);
  }
}

export async function init() {
  const features = await loadGeoJSON();
  if (!features || features.length === 0) {
    document.getElementById("sidebar-inner").innerHTML = `
      <div class="sidebar-empty">
        <span class="big-icon">⚠️</span>
        Could not load map data.<br>Check your internet connection and refresh.
      </div>
    `;
    return;
  }

  const fc = { type: "FeatureCollection", features };
  setupSVG(fc);

  allFeatures = features;
  drawMap(features);

  // Load city data in parallel (non-blocking)
  loadCities();

  // Initialize tile layer
  initTileLayer();

  window.encyclopediaApp = {
    resetView,
    zoomBy: (f) => svgEl.transition().duration(300).call(zoomBehavior.scaleBy, f),
    openCity: showCityPanel,
    backToState: () => {
      if (activeStateName) {
        renderSidebar(activeStateName);
        updateBreadcrumb(activeStateName, null);
        const f = allFeatures.find(d => getStateName(d.properties) === activeStateName);
        if (f) zoomToFeature(f);
      }
    }
  };
}

// Defer init until after layout paint so SVG dimensions are available
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(init));
} else {
  requestAnimationFrame(init);
}
