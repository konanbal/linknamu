export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export const profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  imageUrl: "https://placehold.co/150x150/orange/white",
};

export const links: LinkItem[] = [
  { id: "github", title: "💻 깃허브", url: "https://github.com/konanbal" },
  { id: "blog", title: "✍️ 블로그", url: "https://blog.naver.com/konanbal" },
  { id: "email", title: "📧 이메일", url: "mailto:konanbal@naver.com" },
];
