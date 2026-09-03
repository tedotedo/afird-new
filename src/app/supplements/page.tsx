import type { Metadata } from 'next';
import Link from 'next/link';
import SupplementsExplorer from '@/components/SupplementsExplorer';

export const metadata: Metadata = {
  authors: [{ name: 'Dr Odet Mark Aszkenasy' }],
  title: 'Vitamins & textures',
  description:
    'UK children’s vitamin and mineral formats compared for restricted diets and ARFID — liquids, sprays, gummies, chewables and powders. Not medical advice.',
};

export default function SupplementsPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Vitamins &amp; textures</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Common UK children’s vitamin and mineral products, compared by form, flavour and mouthfeel.
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
        If the texture, smell or aftertaste is wrong, many children with ARFID simply will not take
        it. That is never because they are being difficult. Form and flavour matter as much as the
        vitamins listed on the bottle — so that is what this page compares.
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
        Several of these brands sell three or four different products under almost the same name,
        with different nutrients and different age bands. Where that happens, it is flagged. We
        would rather leave a gap than guess.
      </p>

      <aside className="mt-8 max-w-2xl rounded-xl border border-rule bg-paper-card p-5 text-sm leading-relaxed text-ink-muted shadow-card">
        <p className="font-medium text-ink">Before you use this list</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-ink">Iron.</strong> Products marked &ldquo;contains
            iron&rdquo; carry a real overdose risk for younger siblings — iron is one of the
            commonest serious accidental poisonings in small children. Store high and out of reach.
            Iron can also taste metallic and contribute to constipation.
          </li>
          <li>
            <strong className="font-medium text-ink">Stacking.</strong> Two products together can
            overshoot vitamin A or vitamin D. If your child is already on something, that matters
            more than which new product looks appealing.
          </li>
          <li>
            <strong className="font-medium text-ink">Allergens.</strong> Check excipients as well as
            headline nutrients — oils, gelatine, sweeteners, flavour carriers, emulsifiers,
            thickeners. Allergy status can differ between flavours of the same brand.
          </li>
          <li>
            <strong className="font-medium text-ink">Labels change.</strong> Formulations, flavours
            and age banding are revised without notice. The pack in your hand is the authority, not
            this page.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed">
          If your child is already under clinical care or already taking vitamins, changes are worth
          making with that team — mainly because of the stacking risk above.
        </p>
      </aside>

      <section className="mt-10 max-w-prose">
        <h2 className="font-display text-2xl text-ink">Healthy Start (England and beyond)</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          If your family is on the NHS Healthy Start scheme, free children’s vitamin drops
          (vitamins A, C and D) are still part of the offer for eligible children under four —
          collect via midwife, health visitor or a local distribution point with your Healthy Start
          card. See the Healthy Start product card below and the{' '}
          <a
            href="https://www.healthystart.nhs.uk/getting-vitamins/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-rule underline-offset-2 hover:text-ink"
          >
            official getting-vitamins page
          </a>
          . Children on ≥500 ml infant formula a day usually do not need the drops.
        </p>
      </section>

      <section className="mt-10 max-w-prose">
        <h2 className="font-display text-2xl text-ink">How to use this list</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
          <li>Filter by form if your child only accepts liquids, or refuses anything chewy.</li>
          <li>
            Take two or three realistic options to clinic — including ones they have already refused.
            What has failed, and how it failed, tells the dietitian as much as what might work.
          </li>
          <li>
            Nutrition gaps from a narrow diet still need a proper assessment. Supplements do not
            fix energy intake, protein, or fibre on their own — see{' '}
            <Link
              href="/nutrition-support"
              className="underline decoration-rule underline-offset-2 hover:text-ink"
            >
              Sip feeds &amp; fortifiers
            </Link>{' '}
            if calories/protein are the issue under discussion.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          More on restricted eating:{' '}
          <Link href="/arfid" className="underline decoration-rule underline-offset-2 hover:text-ink">
            About ARFID
          </Link>
          . Helplines and GP prompts:{' '}
          <Link
            href="/resources"
            className="underline decoration-rule underline-offset-2 hover:text-ink"
          >
            UK resources
          </Link>
          .
        </p>
      </section>

      <SupplementsExplorer />

      <section className="mt-14 max-w-prose border-t border-rule pt-10">
        <h2 className="font-display text-xl text-ink">Not listed / skipped</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Older <strong className="font-medium text-ink">Forceval Junior hard capsules</strong> are
          no longer the current junior product from the manufacturer — we list Forceval Soluble
          Junior instead. We skipped marketplace-only or poorly documented “ARFID powders” where we
          could not verify ingredients from a manufacturer or NHS source. Prescription-only or
          specialist sip-feed vitamins are outside the scope of this parent-facing comparison.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          General NHS background:{' '}
          <a
            href="https://www.nhs.uk/conditions/vitamins-and-minerals/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-rule underline-offset-2 hover:text-ink"
          >
            NHS vitamins and minerals
          </a>
          .
        </p>
        <p className="mt-6 text-xs leading-relaxed text-ink-faint">
          No affiliate links. Information checked September 2026 — UK availability (for example
          Abidec and Dalivit) can fluctuate.
        </p>
      </section>
    </div>
  );
}
