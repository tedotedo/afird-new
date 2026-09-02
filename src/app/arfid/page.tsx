import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About ARFID' };

export default function ArfidPage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Understanding ARFID</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">
        Avoidant/Restrictive Food Intake Disorder — information for families.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">What is ARFID?</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        ARFID is an eating disorder where someone avoids certain foods or restricts intake
        (or both). Unlike anorexia or bulimia, it is not driven by body image, weight, or shape
        concerns. Children and adults may have a limited accepted range, sensory sensitivities
        to texture or taste, fear of choking or vomiting, or little interest in food.
      </p>
      <p className="mt-4 rounded-md border border-rule bg-paper-card p-4 text-sm leading-relaxed text-ink-muted">
        ARFID is a recognised medical condition, not just &ldquo;picky eating&rdquo; or a phase. With proper
        support, many families see meaningful improvement.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">Common signs</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
        <li>Limited range of foods accepted</li>
        <li>Avoidance based on colour, texture, smell, or brand</li>
        <li>Anxiety around new foods or mealtimes</li>
        <li>Fear of choking, gagging, or being sick</li>
        <li>Weight loss, poor growth, or nutritional gaps — or normal weight with a very narrow diet</li>
        <li>Social withdrawal around eating</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl text-ink">Getting help in the UK</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Start with your GP. They can refer to community paediatrics, dietetics, CAMHS, or specialist
        eating-disorder services depending on local pathways. See our{' '}
        <Link href="/resources" className="underline decoration-rule underline-offset-2 hover:text-ink">UK resources</Link>
        {' '}page for charity and NHS links.
      </p>
    </article>
  );
}
