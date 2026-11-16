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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-base shadow-[0_4px_16px_-8px_rgba(140,80,40,0.3)] backdrop-blur-xl transition duration-300 hover:bg-white/65 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
    >
      <span aria-hidden>{dark === null ? "" : dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
