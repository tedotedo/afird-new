import Link from 'next/link';

const topics = [
  {
    href: '/arfid',
    title: 'About ARFID',
    body: 'What it is in plain English, signs at the table, and how it differs from picky eating.',
  },
  {
    href: '/supplements',
    title: 'Vitamins & textures',
    body: "UK children's liquids, sprays, gummies and powders compared by flavour and mouthfeel — options to discuss with a dietitian, not a shopping list.",
  },
  {
    href: '/nutrition-support',
    title: 'Sip feeds & fortifiers',
    body: 'Paediatric ONS, smoothie and pudding-style feeds, and calorie fortifiers — forms and textures to discuss with a dietitian.',
  },
  {
    href: '/resources',
    title: 'UK resources',
    body: 'Beat, ARFID Awareness UK, NHS links, helplines — plus what to ask your GP.',
  },
  {
    href: '/notes',
    title: 'Notes for clinic',
    body: 'Jot accepted foods, feared foods, and questions before your appointment. Stays in this browser only.',
  },
  {
    href: '/about',
    title: 'About',
    body: 'Why this site exists. Written by Dr Mark Aszkenasy, consultant community paediatrician.',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-rule bg-paper-card">
        <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-ink-faint">For parents and carers</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-5xl">Practical ARFID</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Your child eats a handful of foods. Mealtimes feel like a battle. You worry about growth,
            choking, or whether this is autism-related sensory stuff. That is the problem this site
            is for.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
            Plain UK information on Avoidant/Restrictive Food Intake Disorder. No accounts.
            No food photos uploaded. No growth charts on our servers. Optional notes stay in
            your browser only.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/arfid" className="rounded-md bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover">
              Read about ARFID
            </Link>
            <Link href="/resources" className="rounded-md border border-rule bg-paper-card px-4 py-2.5 text-sm text-ink hover:border-accent/40">
              UK resources
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl text-ink">On this site</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {topics.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-xl border border-rule bg-paper-card p-5 shadow-card transition hover:border-accent/30">
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
            General information only — not a substitute for professional advice. Talk to your GP,
            paediatrician, or dietitian about feeding and nutrition.
          </p>
        </div>
      </section>
    </div>
  );
}
