import Link from 'next/link';

const links = [
  { href: '/arfid', label: 'About ARFID' },
  { href: '/supplements', label: 'Vitamins' },
  { href: '/nutrition-support', label: 'Sip feeds' },
  { href: '/resources', label: 'UK resources' },
  { href: '/notes', label: 'Notes for clinic' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg text-ink">
          ARFID Wellness
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-white hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
