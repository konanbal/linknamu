"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옴
  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.enabled) return;
        // 응답 전에 누른 클릭이 덮어써지지 않도록 큰 값을 유지
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, n] of Object.entries(prev)) next[id] = Math.max(next[id] ?? 0, n);
          return next;
        });
      })
      .catch(() => {});
  }, []);

  const handleClick = (linkId: string) => {
    // 새 탭 이동과 무관하게 요청이 끝까지 전송되도록 keepalive 사용
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId }),
      keepalive: true,
    }).catch(() => {});
    // 화면에는 즉시 +1 반영
    setCounts((prev) => ({ ...prev, [linkId]: (prev[linkId] ?? 0) + 1 }));
  };

  return (
    <ul className="flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
