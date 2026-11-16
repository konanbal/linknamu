export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

// TODO: 아래는 보여 주기용 더미 값입니다. 실제 내용으로 바꿔 주세요.
export const profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  // 실제 사진은 public/ 폴더에 넣고 "/profile.jpg"처럼 지정하세요.
  imageUrl: "/profile-placeholder.svg",
};

// TODO: 더미 링크입니다. 실제 주소로 바꿔 주세요.
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://velog.io" },
];
