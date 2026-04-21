"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import {
  BookmarkIcon,
  FlameIcon,
  LayersIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/ui/Icons";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  match?: (pathname: string) => boolean;
  accent?: string;
};

const PRIMARY: NavItem[] = [
  {
    href: "/",
    label: "Tous les articles",
    icon: FlameIcon,
    match: (p) => p === "/",
  },
  {
    href: "/search",
    label: "Recherche",
    icon: SearchIcon,
  },
  {
    href: "/saved",
    label: "Favoris",
    icon: BookmarkIcon,
  },
  {
    href: "/digest",
    label: "Digest",
    icon: MailIcon,
  },
];

const BOARDS: { href: string; label: string; color: string }[] = [
  { href: "/tech", label: "Tech", color: "var(--color-vyvfeed-tech)" },
  { href: "/ia", label: "IA", color: "var(--color-vyvfeed-ia)" },
  { href: "/cyber", label: "Cyber", color: "var(--color-vyvfeed-cyber)" },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.match) return item.match(pathname);
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Sidebar() {
  const pathname = usePathname() ?? "/";

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-vyvfeed-border bg-vyvfeed-surface md:flex md:sticky md:top-0 md:h-screen">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 pb-6">
        <div>
          <ul className="flex flex-col gap-0.5">
            {PRIMARY.map((item) => {
              const active = isActive(pathname, item);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-white text-vyvfeed-text shadow-sm ring-1 ring-vyvfeed-border"
                        : "text-vyvfeed-muted hover:bg-white/60 hover:text-vyvfeed-text"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-vyvfeed-muted">
              Boards
            </span>
            <button
              type="button"
              aria-label="Ajouter un board"
              className="inline-flex h-6 w-6 items-center justify-center rounded text-vyvfeed-muted transition-colors hover:bg-white hover:text-vyvfeed-text"
            >
              <PlusIcon size={14} />
            </button>
          </div>
          <ul className="flex flex-col gap-0.5">
            {BOARDS.map((board) => {
              const active = pathname === board.href;
              return (
                <li key={board.href}>
                  <Link
                    href={board.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-white text-vyvfeed-text shadow-sm ring-1 ring-vyvfeed-border"
                        : "text-vyvfeed-muted hover:bg-white/60 hover:text-vyvfeed-text"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: board.color }}
                    />
                    <span className="font-medium">{board.label}</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-vyvfeed-muted transition-colors hover:bg-white/60 hover:text-vyvfeed-text"
              >
                <LayersIcon size={14} />
                <span>Ajouter un board</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="border-t border-vyvfeed-border px-6 py-4 text-xs text-vyvfeed-muted">
        Un produit{" "}
        <a
          href="https://vyvox.fr"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-vyvfeed-text hover:text-vyvfeed-accent"
        >
          VYVOX
        </a>
      </div>
    </aside>
  );
}
