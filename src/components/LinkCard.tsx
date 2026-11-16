type Props = {
  title: string;
  url: string;
  count?: number;
  onClick: () => void;
};

export default function LinkCard({ title, url, count, onClick }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative flex w-full items-center justify-center rounded-3xl border border-white/70 bg-white/45 px-14 py-[1.125rem] font-semibold shadow-[0_6px_24px_-12px_rgba(140,80,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_10px_28px_-12px_rgba(140,80,40,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/[0.1]"
    >
      <span className="truncate">{title}</span>
      {typeof count === "number" && (
        <span className="absolute right-5 text-xs font-normal tabular-nums text-stone-400 dark:text-stone-500">
          {count.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
