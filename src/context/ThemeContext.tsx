"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "cd-theme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  /** False on the server and during the first client paint — use to
   *  avoid theme-driven branches that would cause hydration mismatches. */
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with "dark" on both server *and* first client render so
  // the hydrated HTML matches the SSR HTML exactly.
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // After first paint: read the persisted preference and apply it.
  // This intentionally runs only on the client, after hydration is done.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const resolved: Theme = saved === "light" ? "light" : "dark";
    setTheme(resolved);
    setMounted(true);
  }, []);

  // Sync class on <html> and persist whenever theme changes.
  // Also runs only on the client (inside useEffect).
  useEffect(() => {
    if (!mounted) return;
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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
