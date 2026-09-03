import type { Metadata } from 'next';
import Link from 'next/link';
import OnsExplorer from '@/components/OnsExplorer';

export const metadata: Metadata = {
  authors: [{ name: 'Dr Odet Mark Aszkenasy' }],
  title: 'Sip feeds & fortifiers',
  description:
    'UK paediatric sip feeds and fortifiers by form and texture for restricted diets and ARFID. Foods for Special Medical Purposes — not medical advice.',
};

export default function NutritionSupportPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Sip feeds &amp; fortifiers</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Paediatric sip feeds, smoothie and pudding-style products, and calorie fortifiers used in UK
        practice when intake is too low — compared by form, flavour and mouthfeel.
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
        If a sip feed is too sweet, milky or oily, many children with ARFID will not drink it. That
        is never because they are being difficult. Texture belongs in the conversation with the
        dietitian.
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
        We would rather leave a gap than guess.
      </p>

      <aside className="mt-8 max-w-2xl rounded-xl border border-rule bg-paper-card p-5 text-sm leading-relaxed text-ink-muted shadow-card">
        <p className="font-medium text-ink">Before you use this list</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-ink">These are not shop products.</strong> Most are
            Foods for Special Medical Purposes, used under medical supervision and often on ACBS
            prescription. What your GP or dietitian can prescribe also depends on your local area.
          </li>
          <li>
            <strong className="font-medium text-ink">Fortifiers are not feeds.</strong> Calogen,
            Pro-Cal and Duocal add energy but not balanced nutrition, and their age limits differ
            from the complete paediatric products. Dose comes from the dietitian.
          </li>
          <li>
            <strong className="font-medium text-ink">Allergens and labels.</strong> Check excipients
            as well as headline nutrients, and treat the current pack as the authority —
            formulations change.
          </li>
        </ul>
      </aside>

      <section className="mt-10 max-w-prose">
        <h2 className="font-display text-2xl text-ink">How this differs from vitamins</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Vitamins fill micronutrient gaps. These products are mainly about{' '}
          <strong className="font-medium text-ink">energy and protein</strong> (and sometimes fibre)
          when a child cannot eat enough food. See{' '}
          <Link href="/supplements" className="underline decoration-rule underline-offset-2 hover:text-ink">
            Vitamins &amp; textures
          </Link>{' '}
          for liquids, sprays, gummies and powders aimed at vitamins and minerals.
        </p>
      </section>

      <section className="mt-10 max-w-prose">
        <h2 className="font-display text-2xl text-ink">How to use this list</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
          <li>Filter by form if drinks fail but spoon desserts might work — or the reverse.</li>
          <li>
            Note flavours already refused. Bring that list to dietetics; starter packs exist for some
            brands so clinics can trial small amounts.
          </li>
          <li>
            Most adult bottle drinks — many Ensure and Fortisip lines — are a different conversation.
            Adult products carry different nutrient ratios and were never designed around a
            child&apos;s weight, so children&apos;s products are listed first here.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Background on restricted eating:{' '}
          <Link href="/arfid" className="underline decoration-rule underline-offset-2 hover:text-ink">
            About ARFID
          </Link>
          . Helplines:{' '}
          <Link href="/resources" className="underline decoration-rule underline-offset-2 hover:text-ink">
            UK resources
          </Link>
          .
        </p>
      </section>

      <OnsExplorer />

      <section className="mt-14 max-w-prose border-t border-rule pt-10">
        <h2 className="font-display text-xl text-ink">Not listed / skipped</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We left out most adult sip feeds (many Fortisip and Ensure Plus bottles) unless a product is
          clearly labelled for children with a published age range. Tube-feed-only products, highly
          specialised hospital feeds, and anything we could not check on a current UK manufacturer page
          are not listed — we would rather leave a gap than guess. What your GP or dietitian can prescribe
          on the NHS still depends on your local area.
        </p>
        <p className="mt-6 text-xs leading-relaxed text-ink-faint">
          No affiliate links. Information checked September 2026 — always read the current label and
          datasheet; FSMP products are prescribed or advised under medical supervision.
        </p>
      </section>
    </div>
  );
}
