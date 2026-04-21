type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: number;
};

export function FeedHeader({ eyebrow, title, description, count }: Props) {
  return (
    <header className="flex flex-col gap-2 border-b border-vyvfeed-border px-8 pb-6 pt-10">
      {eyebrow ? (
        <span className="text-[11px] font-semibold uppercase tracking-wider text-vyvfeed-accent">
          {eyebrow}
        </span>
      ) : null}
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-vyvfeed-text">
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
