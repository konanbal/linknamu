import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

// wireframe.png 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 목록(세로)
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-10 pt-5 sm:pt-10">
      <header className="flex justify-end">
        <ThemeToggle />
      </header>

      <div className="mt-6 sm:mt-8">
        <Profile name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
      </div>

      <nav aria-label="링크 목록" className="mt-10 sm:mt-12">
        <LinkList links={links} />
      </nav>

      <footer className="mt-auto pt-16 text-center text-xs tracking-wide text-stone-400 dark:text-stone-600">
        🌳 링크나무
      </footer>
    </main>
  );
}
