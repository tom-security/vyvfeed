"use client";

import { useEffect, useState } from "react";
import { BookmarkFilledIcon, BookmarkIcon } from "./Icons";
import { isSaved, subscribeSaved, toggleSaved } from "@/lib/saved";

type Props = {
  articleId: string;
  size?: number;
  className?: string;
};

export function BookmarkButton({ articleId, size = 18, className }: Props) {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(isSaved(articleId));
    return subscribeSaved(() => setSaved(isSaved(articleId)));
  }, [articleId]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleSaved(articleId);
    setSaved(next);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-pressed={saved}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-vyvfeed-surface ${
        mounted && saved ? "text-vyvfeed-saved" : "text-vyvfeed-muted"
      } ${className ?? ""}`}
    >
      {mounted && saved ? (
        <BookmarkFilledIcon size={size} />
      ) : (
        <BookmarkIcon size={size} />
      )}
    </button>
  );
}
