"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "cd-theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  return saved === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function getMountedSnapshot(): boolean {
  return typeof window !== "undefined";
}

function getServerMountedSnapshot(): boolean {
  return false;
}

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  if (theme === "light") {
    document.documentElement.classList.add("light-theme");
  } else {
    document.documentElement.classList.remove("light-theme");
  }
}

function persistTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, theme);
  applyThemeClass(theme);
  emitChange();
}

if (typeof window !== "undefined") {
  applyThemeClass(getThemeSnapshot());
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  /** False on the server — use to avoid theme-driven branches that cause hydration mismatches. */
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const mounted = useSyncExternalStore(
    subscribe,
    getMountedSnapshot,
    getServerMountedSnapshot
  );

  const toggleTheme = useCallback(() => {
    persistTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
