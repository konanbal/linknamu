"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // 서버 렌더링 시에는 테마를 알 수 없으므로 null로 시작
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg shadow-sm transition hover:scale-105 dark:border-slate-700 dark:bg-slate-900"
    >
      <span aria-hidden>{dark === null ? "" : dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
