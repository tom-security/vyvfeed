type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: number;
};

export function FeedHeader({ eyebrow, title, description, count }: Props) {
  return (
    <header className="flex flex-col gap-2 border-b border-vyvfeed-border px-4 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-10">
      {eyebrow ? (
        <span className="text-[11px] font-semibold uppercase tracking-wider text-vyvfeed-accent">
          {eyebrow}
        </span>
      ) : null}
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-vyvfeed-text sm:text-3xl">
          {title}
        </h1>
        {typeof count === "number" ? (
          <span className="pb-1.5 text-sm text-vyvfeed-muted">
            {count} article{count > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-2xl text-sm text-vyvfeed-muted">{description}</p>
      ) : null}
    </header>
  );
}
