"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookmarkIcon, FlameIcon } from "@/components/ui/Icons";

type IconEntry = {
  href: string;
  label: string;
  kind: "icon";
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  match?: (pathname: string) => boolean;
};

type DotEntry = {
  href: string;
  label: string;
  kind: "dot";
  color: string;
};

type NavEntry = IconEntry | DotEntry;

const NAV: NavEntry[] = [
  {
    href: "/",
    label: "Accueil",
    kind: "icon",
    Icon: FlameIcon,
    match: (p) => p === "/",
  },
  {
    href: "/tech",
    label: "Tech",
    kind: "dot",
    color: "var(--color-vyvfeed-tech)",
  },
  {
    href: "/ia",
    label: "IA",
    kind: "dot",
    color: "var(--color-vyvfeed-ia)",
  },
  {
    href: "/cyber",
    label: "Cyber",
    kind: "dot",
    color: "var(--color-vyvfeed-cyber)",
  },
  {
    href: "/saved",
    label: "Favoris",
    kind: "icon",
    Icon: BookmarkIcon,
  },
];

function isActive(pathname: string, entry: NavEntry): boolean {
  if (entry.kind === "icon" && entry.match) return entry.match(pathname);
  return pathname === entry.href || pathname.startsWith(`${entry.href}/`);
}

export function BottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-vyvfeed-border bg-vyvfeed-surface md:hidden"
      // paddingBottom covers the iOS home-indicator safe area so the bar is
      // never hidden behind it. Falls back to 0px on non-iOS devices.
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-16 items-stretch">
        {NAV.map((entry) => {
          const active = isActive(pathname, entry);
          return (
            <Link
              key={entry.href}
              href={entry.href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-wide transition-colors ${
                active ? "text-vyvfeed-accent" : "text-vyvfeed-muted"
              }`}
            >
              {entry.kind === "icon" ? (
                <entry.Icon size={19} />
              ) : (
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full transition-opacity"
                  style={{
                    backgroundColor: entry.color,
                    opacity: active ? 1 : 0.4,
                  }}
                />
              )}
              <span>{entry.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
