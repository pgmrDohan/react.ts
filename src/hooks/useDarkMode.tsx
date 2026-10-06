import {useSyncExternalStore} from "react";

type Theme = "light" | "dark";

const THEME_KEY = "data-theme";

// Must stay self-contained: it is also stringified into an inline <script>.
export const applyTheme = (key = "data-theme") => {
  let theme;
  try {
    theme = localStorage.getItem(key);
  } catch {
    theme = null;
  }
  theme ??= matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  document.documentElement.setAttribute(key, theme);
};

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {attributeFilter: [THEME_KEY]});
  return () => observer.disconnect();
};

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute(THEME_KEY) === "dark"
    ? "dark"
    : "light";

const getServerSnapshot = (): Theme => "light";

export const useDarkMode = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (next: Theme) => {
    document.documentElement.setAttribute(THEME_KEY, next);
    localStorage.setItem(THEME_KEY, next);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return {theme, isDarkMode: theme === "dark", toggleTheme};
};
