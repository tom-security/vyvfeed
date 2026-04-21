import type { CategorySlug } from "@/lib/constants";

const STYLES: Record<CategorySlug, { label: string; bg: string; text: string }> = {
  tech: {
    label: "Tech",
    bg: "bg-vyvfeed-tech/10",
    text: "text-vyvfeed-tech",
  },
  ia: {
    label: "IA",
    bg: "bg-vyvfeed-ia/10",
    text: "text-vyvfeed-ia",
  },
  cyber: {
    label: "Cyber",
    bg: "bg-vyvfeed-cyber/10",
    text: "text-vyvfeed-cyber",
  },
};

type Props = {
  category: CategorySlug;
  className?: string;
};

export function CategoryBadge({ category, className }: Props) {
  const s = STYLES[category];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${s.bg} ${s.text} ${className ?? ""}`}
    >
      {s.label}
    </span>
  );
}
