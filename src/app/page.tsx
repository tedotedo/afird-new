import Link from 'next/link';

const topics = [
  {
    href: '/arfid',
    title: 'About ARFID',
    body: 'What Avoidant/Restrictive Food Intake Disorder is, common signs, and why it is not “just picky eating”.',
  },
  {
    href: '/resources',
    title: 'UK resources',
    body: 'NHS and charity links, helplines, and places families can turn for support.',
  },
  {
    href: '/notes',
    title: 'Private notes',
    body: 'Optional notes that stay in your browser only. Nothing is uploaded to us.',
  },
  {
    href: '/about',
    title: 'About',
    body: 'Written by Dr Mark Aszkenasy, consultant community paediatrician.',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-rule bg-paper-card">
        <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-ink-faint">For families</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-5xl">ARFID Wellness</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Quiet information for parents and carers supporting a child with
            Avoidant/Restrictive Food Intake Disorder. No accounts. No food photos uploaded.
            No growth charts stored on our servers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/arfid" className="rounded-md bg-ink px-4 py-2.5 text-sm text-white hover:bg-ink-muted">
              Read about ARFID
            </Link>
            <Link href="/resources" className="rounded-md border border-rule bg-paper px-4 py-2.5 text-sm text-ink hover:bg-white">
              UK resources
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl text-ink">Topics</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {topics.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-lg border border-rule bg-paper-card p-5 hover:border-ink/20">
              <h3 className="font-display text-xl text-ink">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-rule bg-paper-card">
        <div className="mx-auto max-w-site px-4 py-10 sm:px-6">
          <h2 className="font-display text-lg text-ink">Medical disclaimer</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
            General information only — not a substitute for professional medical advice.
            Always consult your GP, paediatrician, dietitian, or healthcare team about feeding
            and nutrition.
          </p>
        </div>
      </section>
    </div>
  );
}
