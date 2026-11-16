"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // null이면 클릭 집계 비활성화(DB 미설정) 상태
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => res.json())
      .then((data) => {
        if (data.enabled) setCounts(data.counts);
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
    setCounts((prev) =>
      prev ? { ...prev, [linkId]: (prev[linkId] ?? 0) + 1 } : prev
    );
  };

  return (
    <ul className="flex w-full flex-col gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={counts ? counts[link.id] ?? 0 : undefined}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
