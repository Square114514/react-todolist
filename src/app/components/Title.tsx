"use client";

import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Title() {
  const [darkMode, setDarkMode] = useLocalStorage("theme", false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="flex justify-between">
      <h1 className="text-5xl font-bold mb-4 text-emerald-900 dark:text-emerald-500">
        TodoList
      </h1>
      <button
        className="dark:bg-emerald-600 bg-amber-200 h-10 w-10 rounded-4xl text-amber-400 shadow-lg transition"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "🌙" : "☀"}
      </button>
    </div>
  );
}
