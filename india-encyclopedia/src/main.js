import * as d3 from "d3";
import { stateInfo } from "./data/states.js";

// Chumbak bold flat palette — one distinct color per state
const stateColors = {
  "Jammu and Kashmir":  "#E8A838",
  "Ladakh":             "#C4793A",
  "Himachal Pradesh":   "#7BAF5A",
  "Punjab":             "#E8C840",
  "Chandigarh":         "#E8C840",
  "Uttarakhand":        "#5A9E7B",
  "Haryana":            "#E8A838",
  "Delhi":              "#D4541A",
  "Rajasthan":          "#E8882A",
  "Uttar Pradesh":      "#D4B84A",
  "Bihar":              "#C4A03A",
  "Sikkim":             "#5A8FAE",
  "West Bengal":        "#8E5AB0",
  "Jharkhand":          "#9E6A38",
  "Arunachal Pradesh":  "#4A9E88",
  "Assam":              "#5AAE7B",
  "Nagaland":           "#6A9E5A",
  "Manipur":            "#7AAE6A",
  "Mizoram":            "#5A9E6A",
  "Tripura":            "#8AAE5A",
  "Meghalaya":          "#4A8E7A",
  "Odisha":             "#C4783A",
  "Chhattisgarh":       "#A87A3A",
  "Madhya Pradesh":     "#C49A3A",
  "Gujarat":            "#E8903A",
  "Dadra and Nagar Haveli and Daman and Diu": "#E89A3A",
  "Maharashtra":        "#C4503A",
  "Goa":                "#5AAEC4",
  "Karnataka":          "#5A78C4",
  "Andhra Pradesh":     "#7AB04A",
  "Telangana":          "#9AC450",
  "Tamil Nadu":         "#C4504A",
  "Kerala":             "#3A9E7A",
  "Puducherry":         "#C4504A",
  "Lakshadweep":        "#3AAEC4",
  "Andaman and Nicobar Islands": "#3A8EAE",
};

let svgEl, mapG, projection, pathGen, zoomBehavior, currentK = 1;
let activeStateName = null;
let allFeatures = [];

function getStateName(p) {
  return p.name || p.NAME_1 || p.st_nm || p.NAME || "";
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

function setupSVG() {
  const col = document.getElementById("map-col");
  const W = col.clientWidth;
  const H = col.clientHeight;

  svgEl = d3.select("#map-svg").attr("width", W).attr("height", H);
  mapG = d3.select("#map-g");

  projection = d3.geoMercator()
    .center([82.5, 22.8])
    .scale(W * 1.7)
    .translate([W * 0.44, H * 0.52]);

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
    .attr("font-size", Math.max(6, Math.min(11, 10 / k)))
    .attr("stroke-width", 2.5 / k);
  d3.selectAll(".city-dot").each(function() {
    const base = +d3.select(this).attr("data-r");
    d3.select(this).attr("r", base / k);
  });
  d3.selectAll(".city-label")
    .attr("font-size", Math.max(5, 8 / k))
    .attr("stroke-width", 2 / k);
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
    .attr("fill", d => stateColors[getStateName(d.properties)] || "#C4A06A")
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
      .attr("font-size", "10")
      .attr("font-weight", "700")
      .attr("fill", "rgba(255,255,255,0.92)")
      .attr("stroke", "rgba(0,0,0,0.25)")
      .attr("stroke-width", "2.5")
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
  const info = stateInfo[stateName];
  if (!info?.cities) return;

  info.cities.forEach(city => {
    const [cx, cy] = projection([city.lng, city.lat]);
    const r = city.capital ? 5 : 3.5;

    mapG.append("circle")
      .attr("class", "city-dot")
      .attr("cx", cx).attr("cy", cy)
      .attr("r", r / currentK)
      .attr("data-r", r)
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
      .attr("fill", "#fff")
      .attr("stroke", "rgba(0,0,0,0.4)")
      .attr("stroke-width", 2 / currentK)
      .text(city.name + (city.capital ? " ★" : ""));
  });
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
  `;
}

function showCityPanel(city, stateName) {
  updateBreadcrumb(stateName, city.name);

  const cityBlurbs = {
    "Mumbai": "India's financial capital and maximum city. Home to the Bombay Stock Exchange, Bollywood, and some of the world's most expensive real estate beside Asia's largest slum (Dharavi). The city grew from seven islands connected through centuries of land reclamation.",
    "Bengaluru": "India's Silicon Valley at 920m elevation. Home to Infosys, Wipro, Flipkart, Ola and hundreds of global tech R&D centres. Its pleasant climate (15–28°C year-round) makes it uniquely liveable among Indian metros.",
    "Hyderabad": "The City of Pearls and Biryani. Once ruled by the Nizams — India's wealthiest royals — Hyderabad today hosts Microsoft, Amazon, Google and Apple India campuses in HITEC City. The Charminar (1591) remains its iconic landmark.",
    "Chennai": "Gateway to South India. India's fourth-largest city blends Dravidian temple culture with a thriving auto-manufacturing hub (India's Detroit), classical Carnatic music, and Marina Beach — the world's longest urban beach at 13km.",
    "Kolkata": "The City of Joy and intellectual capital of British India. Home to Nobel laureates Tagore and Mother Teresa. The Howrah Bridge (1943) is one of the world's busiest cantilever bridges. The Durga Puja festival transforms the city for five days every year.",
    "Jaipur": "The Pink City — buildings were painted terracotta pink to welcome Prince Albert in 1876, and the tradition was maintained. A UNESCO World Heritage City with Amber Fort, Hawa Mahal wind palace, and the Jantar Mantar astronomical observatory.",
    "Agra": "Home to the Taj Mahal — the world's greatest monument to love. Shah Jahan built it (1632–1653) for his wife Mumtaz Mahal using 20,000 workers. Agra Fort and Fatehpur Sikri complete the Mughal heritage triangle.",
    "Varanasi": "The world's oldest continuously inhabited city (3000 BCE). The 88 ghats along the Ganga are used for bathing, cremation, and prayer. Hindus believe dying here leads to moksha. Silk weaving and classical music are living traditions.",
    "Kochi": "Queen of the Arabian Sea — Kerala's commercial capital. Fort Kochi's colonial quarter, Chinese fishing nets, and the Mattancherry Jewish Quarter are living museums of 500 years of global trade. India's first metro built partly over backwaters.",
    "Ahmedabad": "India's first UNESCO World Heritage City. Founded by Ahmed Shah in 1411 with a remarkable medieval walled city of pol houses and ornate step-wells. Today it's India's textile capital and the world's diamond-cutting centre.",
    "Patna": "Capital of Bihar and one of the world's oldest cities. Ancient Pataliputra — capital of the Maurya and Gupta empires — lies beneath modern Patna. The Golghar granary (1786) was built to prevent famine but was never filled.",
    "Bhubaneswar": "India's temple city — with over 700 temples, it's called the 'Cathedral City of India'. The Lingaraj Temple (11th c.) and Mukteswara Temple are masterpieces of Kalinga architecture. A modern planned city built around the ancient sacred complex.",
  };

  const blurb = cityBlurbs[city.name] ||
    `${city.name} is one of the key cities of ${stateName}, with a population of ${city.pop}. ${city.capital ? `As the state capital, it serves as the administrative centre of ${stateName}.` : ""}`;

  document.getElementById("sidebar-inner").innerHTML = `
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
    </div>
    <hr class="divider"/>
    <div class="section-head">About ${city.name}</div>
    <div class="body-text">${blurb}</div>
  `;

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

function resetView() {
  activeStateName = null;
  d3.selectAll(".state-path").classed("active", false);
  mapG.selectAll(".city-dot, .city-label").remove();
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

export async function init() {
  const { W, H } = setupSVG();

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

  allFeatures = features;
  drawMap(features);

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

init();
