const TITLES = [
  "uninspired",
  "burnt-out",
  "disillusioned",
  "unmotivated",
  "apathetic",
  "disengaged",
  "jaded",
  "demoralized",
  "deflated",
  "listless",
  "stagnant",
  "directionless",
  "unfulfilled",
  "overwhelmed",
  "mechanical",
  "routine-bound",
  "checked-out",
  "bored",
];

const THEMES = ["vintage", "dark", ""];

const TITLE_CLASS = ".title";
const STORAGE_KEY = "siteTitle";
const THEME_KEY = "theme";
const DEFAULT_TITLE = "uninspired.xyz";

const applyTitle = (text) => {
  const titleEl = document.querySelector(TITLE_CLASS);
  if (!titleEl) return;

  titleEl.textContent = text;
  document.title = text;
};

const getRandomTitle = () => {
  const random = TITLES[Math.floor(Math.random() * TITLES.length)];
  const fullTitle = `${random}.xyz`;

  applyTitle(fullTitle);
  localStorage.setItem(STORAGE_KEY, fullTitle);
};

const applyTheme = (themeClass) => {
  document.body.classList.remove("theme-dark", "theme-playful");
  if (themeClass) document.body.classList.add(themeClass);
};

const initThemeSelector = () => {
  const select = document.getElementById("theme-select");
  const savedTheme = localStorage.getItem(THEME_KEY) || "";

  applyTheme(savedTheme);
  select.value = savedTheme;

  select.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
    applyTheme(selectedTheme);
    localStorage.setItem(THEME_KEY, selectedTheme);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  initThemeSelector();
  const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_TITLE;
  applyTitle(saved);
});
