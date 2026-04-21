import { SparkleIcon } from "@/components/ui/Icons";

type Props = {
  bullets: string[];
  dark?: boolean;
};

export function SummaryBlock({ bullets, dark }: Props) {
  return (
    <aside
      className={`my-8 rounded-xl border-l-4 px-6 py-5 ${
        dark
          ? "border-vyvfeed-accent bg-white/5"
          : "border-vyvfeed-accent bg-vyvfeed-accent/[0.06]"
      }`}
    >
      <div
        className={`mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider ${
          dark ? "text-vyvfeed-accent" : "text-vyvfeed-accent"
        }`}
      >
        <SparkleIcon size={13} />
        <span>Résumé Claude — 3 points clés</span>
      </div>
      <ul className="flex flex-col gap-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vyvfeed-accent"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
