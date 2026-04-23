"use client";

import { MoonIcon, SunIcon, TypeIcon } from "@/components/ui/Icons";

export type FontLevel = 0 | 1 | 2;

type Props = {
  level: FontLevel;
  onLevelChange: (next: FontLevel) => void;
  dark: boolean;
  onToggleDark: () => void;
};

export function ReaderControls({
  level,
  onLevelChange,
  dark,
  onToggleDark,
}: Props) {
  function bump(delta: number) {
    const next = Math.min(2, Math.max(0, level + delta)) as FontLevel;
    if (next !== level) onLevelChange(next);
  }

  const wrapper = dark
    ? "border-white/15 bg-[#0F172A]/95 text-white backdrop-blur"
    : "border-vyvfeed-border bg-white/95 text-vyvfeed-text backdrop-blur";

  const button = dark ? "hover:bg-white/10" : "hover:bg-vyvfeed-surface";

  const labels = ["Petit", "Moyen", "Grand"];

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-40 -translate-x-1/2 mb-16 md:mb-0 flex w-fit items-center gap-1 rounded-full border px-1 py-1 shadow-lg ${wrapper}`}
      role="toolbar"
      aria-label="Options de lecture"
    >
      <button
        type="button"
        onClick={() => bump(-1)}
        disabled={level === 0}
        aria-label="Diminuer la taille du texte"
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors disabled:opacity-30 ${button}`}
      >
        A-
      </button>
      <span
        className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs ${
          dark ? "text-white/60" : "text-vyvfeed-muted"
        }`}
      >
        <TypeIcon size={13} />
        {labels[level]}
      </span>
      <button
        type="button"
        onClick={() => bump(1)}
        disabled={level === 2}
        aria-label="Augmenter la taille du texte"
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors disabled:opacity-30 ${button}`}
      >
        A+
      </button>
      <span
        aria-hidden="true"
        className={`mx-1 h-5 w-px ${dark ? "bg-white/15" : "bg-vyvfeed-border"}`}
      />
      <button
        type="button"
        onClick={onToggleDark}
        aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${button}`}
      >
        {dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
      </button>
    </div>
  );
}
