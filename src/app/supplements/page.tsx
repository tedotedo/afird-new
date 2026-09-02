import type { Metadata } from 'next';
import Link from 'next/link';
import SupplementsExplorer from '@/components/SupplementsExplorer';
import { INFO_CHECKED } from '@/data/supplements';

export const metadata: Metadata = {
  title: 'Vitamins & textures',
  description:
    'UK children’s vitamin and mineral formats compared for restricted diets and ARFID — liquids, sprays, gummies, chewables and powders. Not medical advice.',
};

export default function SupplementsPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Vitamins &amp; textures</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Common UK children’s vitamin and mineral products, compared by form, flavour and
        mouthfeel — the bits that often decide whether an ARFID child will take them at all.
      </p>

      <aside className="mt-8 rounded-lg border border-rule bg-paper-card p-5 text-sm leading-relaxed text-ink-muted">
        <p className="font-medium text-ink">Not medical advice — discuss with GP or dietitian</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            This page helps families <strong className="font-medium text-ink">see options</strong> to
            talk through with a GP, paediatrician or dietitian. It does not recommend doses, brands
            to buy, or “the right vitamin for ARFID”.
          </li>
          <li>
            Many children with ARFID refuse supplements because of texture, smell, sweetness or
            aftertaste — not because they are being difficult. Matching format to sensory tolerance
            matters as much as the nutrient list.
          </li>
          <li>
            Do not start, stop or combine supplements on your own if your child is under clinical
            care, already on vitamins, or has a restricted diet. Stacking products can overshoot
            vitamin A or D.
          </li>
          <li>
            <strong className="font-medium text-ink">Iron:</strong> products flagged “Contains iron”
            need extra care — metallic taste, constipation in some children, and serious overdose
            risk if tablets or liquids are left where younger siblings can reach them.
          </li>
          <li>
            No affiliate links. Prefer manufacturer, NHS or pharmacy information over marketplace
            listings.
          </li>
        </ul>
        <p className="mt-4 text-xs text-ink-faint">
          Information checked {INFO_CHECKED} — always read the current label; formulations change.
          UK availability and stock (e.g. Abidec / Dalivit) can fluctuate.
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
            Take two or three realistic options to clinic — including ones they might refuse — so
            the dietitian knows what textures have already failed.
          </li>
          <li>
            Nutrition gaps from a narrow diet still need a proper assessment. Supplements do not
            fix energy intake, protein, or fibre on their own.
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
      </section>
    </div>
  );
}
