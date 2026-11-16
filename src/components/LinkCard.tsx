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
      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md active:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
    >
      <span className="truncate">{title}</span>
      {typeof count === "number" && (
        <span className="ml-3 shrink-0 text-xs text-slate-500 dark:text-slate-400">
          {count.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
