"use client";

import { MoonIcon, SunIcon, TypeIcon } from "@/components/ui/Icons";

type Props = {
  fontSize: number;
  onFontSize: (next: number) => void;
  dark: boolean;
  onToggleDark: () => void;
};

export function ReaderControls({ fontSize, onFontSize, dark, onToggleDark }: Props) {
  function bump(delta: number) {
    const next = Math.min(22, Math.max(14, fontSize + delta));
    onFontSize(next);
  }

  const wrapper = dark
    ? "border-white/15 bg-white/5 text-white"
    : "border-vyvfeed-border bg-white text-vyvfeed-text";

  const button = dark
    ? "hover:bg-white/10"
    : "hover:bg-vyvfeed-surface";

  return (
    <div
      className={`sticky top-4 z-10 mx-auto mb-8 flex w-fit items-center gap-1 rounded-full border px-1 py-1 shadow-sm ${wrapper}`}
    >
      <button
        type="button"
        onClick={() => bump(-1)}
        aria-label="Diminuer la taille du texte"
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${button}`}
      >
        A-
      </button>
      <span
        className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs ${
          dark ? "text-white/60" : "text-vyvfeed-muted"
        }`}
      >
        <TypeIcon size={13} />
        {fontSize}
      </span>
      <button
        type="button"
        onClick={() => bump(1)}
        aria-label="Augmenter la taille du texte"
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${button}`}
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
