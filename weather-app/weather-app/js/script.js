/* ---------- weather code -> description / icon / palette ---------- */
const WMO = {
  0: { label: "Clear sky", icon: "sun" },
  1: { label: "Mainly clear", icon: "sun" },
  2: { label: "Partly cloudy", icon: "cloud" },
  3: { label: "Overcast", icon: "cloud" },
  45: { label: "Fog", icon: "fog" },
  48: { label: "Rime fog", icon: "fog" },
  51: { label: "Light drizzle", icon: "drizzle" },
  53: { label: "Drizzle", icon: "drizzle" },
  55: { label: "Dense drizzle", icon: "drizzle" },
  56: { label: "Freezing drizzle", icon: "drizzle" },
  57: { label: "Freezing drizzle", icon: "drizzle" },
  61: { label: "Light rain", icon: "rain" },
  63: { label: "Rain", icon: "rain" },
  65: { label: "Heavy rain", icon: "rain" },
  66: { label: "Freezing rain", icon: "rain" },
  67: { label: "Freezing rain", icon: "rain" },
  71: { label: "Light snow", icon: "snow" },
  73: { label: "Snow", icon: "snow" },
  75: { label: "Heavy snow", icon: "snow" },
  77: { label: "Snow grains", icon: "snow" },
  80: { label: "Rain showers", icon: "rain" },
  81: { label: "Rain showers", icon: "rain" },
  82: { label: "Violent showers", icon: "rain" },
  85: { label: "Snow showers", icon: "snow" },
  86: { label: "Snow showers", icon: "snow" },
  95: { label: "Thunderstorm", icon: "storm" },
  96: { label: "Thunderstorm, hail", icon: "storm" },
  99: { label: "Thunderstorm, hail", icon: "storm" },
};

const PALETTES = {
  sun_day: ["#5AA9E6", "#1E6FB8"],
  sun_night: ["#101B3A", "#2A3A6B"],
  cloud_day: ["#8FA3B3", "#5C7188"],
  cloud_night: ["#232C3D", "#3A465C"],
  fog_day: ["#A8AFB5", "#7C8590"],
  fog_night: ["#252B33", "#3D4650"],
  drizzle_day: ["#6E8AA6", "#3F5A78"],
  drizzle_night: ["#1B2438", "#2E3B57"],
  rain_day: ["#4E6478", "#2E4256"],
  rain_night: ["#151E2E", "#26324A"],
  snow_day: ["#C9D6E3", "#9AAFC4"],
  snow_night: ["#2A3446", "#455270"],
  storm_day: ["#4A4E6E", "#2A2C45"],
  storm_night: ["#14152A", "#262A48"],
};

/* simple inline icon paths, drawn at runtime */
const ICON_PATHS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9Z"/>',
  fog: '<path d="M17.5 15H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9Z"/><path d="M4 19h16M6 22h12"/>',
  drizzle: '<path d="M16.5 12H8a6 6 0 1 1 5.71-7.8h.79a4 4 0 1 1 0 7.8Z"/><path d="M8 18v2M12 18v2M16 18v2"/>',
  rain: '<path d="M16.5 12H8a6 6 0 1 1 5.71-7.8h.79a4 4 0 1 1 0 7.8Z"/><path d="M8 19l-1 2M13 19l-1 2M18 19l-1 2"/>',
  snow: '<path d="M16.5 12H8a6 6 0 1 1 5.71-7.8h.79a4 4 0 1 1 0 7.8Z"/><path d="M8 19v.01M12 19v.01M16 19v.01M8 22v.01M12 22v.01M16 22v.01"/>',
  storm: '<path d="M16.5 12H8a6 6 0 1 1 5.71-7.8h.79a4 4 0 1 1 0 7.8Z"/><path d="M13 13l-3 5h3l-2 4"/>',
};

function iconSVG(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name] || ICON_PATHS.cloud}</svg>`;
}

function weatherIconName(icon, isDay) {
  if (icon === "sun") return isDay ? "sun" : "moon";
  return icon;
}

function paletteFor(icon, isDay) {
  return PALETTES[`${icon}_${isDay ? "day" : "night"}`] || PALETTES.cloud_day;
}

function dayLabel(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, { weekday: "short" });
}

/* ---------- state ---------- */
let unit = "c"; // c | f
let currentCity = null;
let currentWeather = null;
let debounceTimer = null;

const card = document.getElementById("card");
const input = document.getElementById("city-input");
const suggestBox = document.getElementById("suggestions");
const suggestSpinner = document.getElementById("suggest-spinner");
const placeholderEl = document.getElementById("placeholder");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const resultsEl = document.getElementById("results");

function showOnly(el) {
  [placeholderEl, loadingEl, errorEl, resultsEl].forEach(e => e.classList.add("hidden"));
  el.classList.remove("hidden");
}

/* ---------- geocoding suggestions ---------- */
input.addEventListener("input", () => {
  const q = input.value.trim();
  clearTimeout(debounceTimer);
  if (q.length < 2) {
    suggestBox.style.display = "none";
    suggestBox.innerHTML = "";
    return;
  }
  debounceTimer = setTimeout(() => fetchSuggestions(q), 350);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrap")) {
    suggestBox.style.display = "none";
  }
});

async function fetchSuggestions(q) {
  suggestSpinner.style.display = "block";
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`);
    const data = await res.json();
    renderSuggestions(data.results || []);
  } catch (e) {
    renderSuggestions([]);
  } finally {
    suggestSpinner.style.display = "none";
  }
}

function renderSuggestions(list) {
  if (list.length === 0) {
    suggestBox.style.display = "none";
    suggestBox.innerHTML = "";
    return;
  }
  suggestBox.innerHTML = list.map((s, i) => `
    <button type="button" class="suggestion-item" data-index="${i}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;opacity:0.7;flex-shrink:0;"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>
      <span>${s.name}${s.admin1 ? ", " + s.admin1 : ""}${s.country ? ", " + s.country : ""}</span>
    </button>
  `).join("");
  suggestBox.style.display = "block";
  suggestBox._data = list;
  suggestBox.querySelectorAll(".suggestion-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const place = suggestBox._data[Number(btn.dataset.index)];
      selectCity(place);
    });
  });
}

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (suggestBox._data && suggestBox._data.length > 0) {
    selectCity(suggestBox._data[0]);
  }
});

function selectCity(place) {
  currentCity = place;
  input.value = "";
  suggestBox.style.display = "none";
  suggestBox.innerHTML = "";
  fetchWeather(place);
}

/* ---------- weather fetch ---------- */
async function fetchWeather(place) {
  showOnly(loadingEl);
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=auto&temperature_unit=celsius&wind_speed_unit=kmh`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    currentWeather = data;
    renderWeather();
  } catch (e) {
    showOnly(errorEl);
  }
}

function toDisplay(celsius) {
  const v = unit === "c" ? celsius : (celsius * 9) / 5 + 32;
  return Math.round(v);
}

function renderWeather() {
  const w = currentWeather;
  const c = currentCity;
  const isDay = !!w.current.is_day;
  const iconKey = WMO[w.current.weather_code]?.icon || "cloud";
  const [top, bottom] = paletteFor(iconKey, isDay);
  card.style.background = `linear-gradient(160deg, ${top}, ${bottom})`;

  document.getElementById("location-line").innerHTML =
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:16px;height:16px;opacity:0.8;"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>` +
    `<span>${c.name}${c.admin1 ? ", " + c.admin1 : ""}</span>`;
  document.getElementById("country-line").textContent = c.country || "";

  document.getElementById("icon-area").innerHTML = iconSVG(weatherIconName(iconKey, isDay));

  document.getElementById("temp-line").innerHTML =
    `${toDisplay(w.current.temperature_2m)}&deg;<button id="unit-toggle">${unit === "c" ? "C" : "F"}</button>`;
  document.getElementById("unit-toggle").addEventListener("click", () => {
    unit = unit === "c" ? "f" : "c";
    renderWeather();
  });

  document.getElementById("condition-line").textContent = WMO[w.current.weather_code]?.label || "—";
  document.getElementById("feels-line").textContent = `Feels like ${toDisplay(w.current.apparent_temperature)}°`;

  document.getElementById("humidity-val").textContent = `${Math.round(w.current.relative_humidity_2m)}%`;
  document.getElementById("wind-val").textContent = `${Math.round(w.current.wind_speed_10m)} km/h`;

  const forecastEl = document.getElementById("forecast");
  forecastEl.innerHTML = w.daily.time.slice(0, 5).map((t, i) => {
    const dIcon = WMO[w.daily.weather_code[i]]?.icon || "cloud";
    const label = i === 0 ? "Today" : dayLabel(t);
    return `
      <div class="forecast-day">
        <div class="day-label">${label}</div>
        <div class="day-icon">${iconSVG(weatherIconName(dIcon, true))}</div>
        <div class="day-temps">
          <span class="max">${toDisplay(w.daily.temperature_2m_max[i])}°</span>
          <span class="min"> / ${toDisplay(w.daily.temperature_2m_min[i])}°</span>
        </div>
      </div>`;
  }).join("");

  showOnly(resultsEl);
}
