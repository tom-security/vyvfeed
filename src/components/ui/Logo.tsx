import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-baseline font-sans text-2xl font-black tracking-tight ${className ?? ""}`}
      aria-label="VYVFEED — retour à l'accueil"
    >
      <span className="text-vyvfeed-text">VYV</span>
      <span className="text-vyvfeed-accent">FEED</span>
    </Link>
  );
}
