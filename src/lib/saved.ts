"use client";

const KEY = "vyvfeed:saved";
const EVENT = "vyvfeed:saved-changed";

export function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function isSaved(id: string): boolean {
  return readSaved().includes(id);
}

export function toggleSaved(id: string): boolean {
  const current = readSaved();
  const exists = current.includes(id);
  const next = exists ? current.filter((v) => v !== id) : [...current, id];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT));
  return !exists;
}

export function subscribeSaved(handler: () => void): () => void {
  const listener = () => handler();
  window.addEventListener(EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}
