import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Dark mode is opt-in here, not the default: bright/high-contrast reads
// better outdoors in direct sun (screen glare washes out dark surfaces
// faster), so the job-site-usable default stays light. This toggle gives
// the tactical/indoor dark option without forcing it on everyone.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fieldtrade-theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("fieldtrade-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="shrink-0 flex items-center gap-1.5 text-bone/60 hover:text-safety text-xs px-3 py-3.5 transition-colors"
      title={dark ? "Switch to light mode" : "Switch to tactical dark mode"}
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
