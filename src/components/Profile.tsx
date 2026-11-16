type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

// 사진 아래로 따뜻한 색의 그림자를 깔아 살짝 떠 있는 느낌을 줌
const photoClass =
  "h-28 w-28 rounded-full ring-4 ring-white/80 shadow-[0_12px_32px_-8px_rgba(190,110,70,0.45)] dark:ring-white/10 dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] sm:h-32 sm:w-32";

export default function Profile({ name, bio, imageUrl }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={`${name} 프로필 사진`} className={`${photoClass} object-cover`} />
      ) : (
        <div
          aria-hidden
          className={`${photoClass} flex items-center justify-center bg-gradient-to-br from-orange-300 to-rose-400 text-4xl font-bold text-white`}
        >
          {name.slice(0, 1)}
        </div>
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
        {bio}
      </p>
    </section>
  );
}
