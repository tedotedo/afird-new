import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'UK resources' };

const resources = [
  {
    name: 'Beat — ARFID',
    url: 'https://www.beateatingdisorders.org.uk/types/arfid',
    org: 'Beat',
    blurb: "UK eating-disorder charity: information, support, and helplines.",
  },
  {
    name: 'ARFID Awareness UK',
    url: 'https://www.arfidawarenessuk.org/',
    org: 'ARFID Awareness UK',
    blurb: 'Charity focused on awareness and support for ARFID.',
  },
  {
    name: 'CNTW NHS ARFID resources',
    url: 'https://www.cntw.nhs.uk/resource-library/support-for-avoidant-restrictive-food-intake-disorder-arfid/',
    org: 'CNTW NHS',
    blurb: 'NHS resource library co-produced with experts and lived experience.',
  },
  {
    name: 'NHS Inform Scotland — ARFID',
    url: 'https://www.nhsinform.scot/illnesses-and-conditions/mental-health/eating-disorders/avoidant-restrictive-food-intake-disorder-arfid/',
    org: 'NHS Inform',
    blurb: 'Scottish NHS guide to symptoms, diagnosis, and when to seek help.',
  },
];

const helplines = [
  { name: 'Beat Helpline', detail: '0808 801 0677 — 9am–8pm weekdays, 4pm–8pm weekends' },
  { name: 'Beat Youthline (under 18)', detail: '0808 801 0711 — same hours' },
  { name: 'NHS 111', detail: '111 — 24/7' },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">UK resources</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">Trusted starting points. Always use local NHS pathways for clinical care.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resources.map((r) => (
          <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-rule bg-paper-card p-5 hover:border-ink/20">
            <p className="text-xs uppercase tracking-wide text-ink-faint">{r.org}</p>
            <h2 className="mt-1 font-display text-xl text-ink">{r.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.blurb}</p>
          </a>
        ))}
      </div>
      <h2 className="mt-12 font-display text-2xl text-ink">Helplines</h2>
      <ul className="mt-4 space-y-3">
        {helplines.map((h) => (
          <li key={h.name} className="rounded-md border border-rule bg-paper-card px-4 py-3 text-sm">
            <span className="font-medium text-ink">{h.name}</span>
            <span className="mt-1 block text-ink-muted">{h.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
