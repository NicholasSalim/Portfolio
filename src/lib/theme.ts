// The one place that knows how the chosen theme is stored and applied. Shared
// by the pre-paint script in the root layout and by the theme toggle. (The
// colours for each theme live in globals.css under the same attribute.)

export const THEMES = ["dark", "light"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "dark";
export const THEME_KEY = "theme";
export const THEME_ATTRIBUTE = "data-theme";

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

// Runs before paint so a visitor who chose light mode never sees a dark flash.
// Storage can throw (private mode, blocked site data); the page then keeps the default.
export const themeScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(${JSON.stringify(THEMES)}.indexOf(t)>-1)document.documentElement.setAttribute(${JSON.stringify(THEME_ATTRIBUTE)},t)}catch(e){}`;
