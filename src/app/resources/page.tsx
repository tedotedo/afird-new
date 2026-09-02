import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'UK resources' };

const resources = [
  {
    name: 'Beat — ARFID',
    url: 'https://www.beateatingdisorders.org.uk/types/arfid',
    org: 'Beat',
    blurb: 'UK eating-disorder charity: clear information, support, and helplines.',
  },
  {
    name: 'ARFID Awareness UK',
    url: 'https://www.arfidawarenessuk.org/',
    org: 'ARFID Awareness UK',
    blurb: 'Charity focused on awareness and practical support for ARFID.',
  },
  {
    name: 'CNTW NHS ARFID resources',
    url: 'https://www.cntw.nhs.uk/resource-library/support-for-avoidant-restrictive-food-intake-disorder-arfid/',
    org: 'CNTW NHS',
    blurb: 'NHS resource library co-produced with clinicians and families.',
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
  { name: 'NHS 111', detail: '111 — 24/7 for urgent advice when you are unsure' },
];

const gpQuestions = [
  'Could this be ARFID rather than picky eating?',
  'Can we check growth and basic bloods?',
  'Who locally deals with restricted eating — paediatrics, dietetics, CAMHS, or an eating-disorder team?',
  'Is there a waiting list, and what should we do while we wait?',
  'When should we come back sooner or go to A&E?',
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">UK resources</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Useful starting points. Clinical care still goes through your GP and local NHS pathway.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resources.map((r) => (
          <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-rule bg-paper-card p-5 hover:border-ink/20">
            <p className="text-xs uppercase tracking-wide text-ink-faint">{r.org}</p>
            <h2 className="mt-1 font-display text-xl text-ink">{r.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.blurb}</p>
          </a>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl text-ink">What to ask your GP</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Take a written list of accepted foods (include brands). It saves time and stops you
        forgetting under pressure. Draft it in{' '}
        <Link href="/notes" className="underline decoration-rule underline-offset-2 hover:text-ink">
          Notes for clinic
        </Link>{' '}
        if that helps.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
        {gpQuestions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>

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
