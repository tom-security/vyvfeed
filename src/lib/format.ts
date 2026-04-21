const DATE_FMT = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const FULL_FMT = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatShortDate(iso: string): string {
  return DATE_FMT.format(new Date(iso));
}

export function formatFullDate(iso: string): string {
  return FULL_FMT.format(new Date(iso));
}
