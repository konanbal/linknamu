type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function Profile({ name, bio, imageUrl }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          className="h-36 w-36rounded-full object-cover shadow-md ring-4 ring-white dark:ring-slate-800 sm:h-40 sm:w-40"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-36 w-36items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-4xl font-bold text-white shadow-md ring-4 ring-white dark:ring-slate-800 sm:h-40 sm:w-40"
        >
          {name.slice(0, 1)}
        </div>
      )}
      <h1 className="mt-5 text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{bio}</p>
    </section>
  );
}
