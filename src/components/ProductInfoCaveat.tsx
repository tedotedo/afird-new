import type { ReactNode } from 'react';
import { INFO_CHECKED } from '@/data/supplements';

type Props = {
  extras?: ReactNode;
  footerNote?: string;
};

/** Standing safety block for vitamins and oral-nutrition comparison pages. */
export default function ProductInfoCaveat({ extras, footerNote }: Props) {
  return (
    <aside className="mt-8 rounded-xl border border-rule bg-paper-card p-5 text-sm leading-relaxed text-ink-muted shadow-card">
      <p className="font-medium text-ink">Not medical advice — check labels; discuss with GP or dietitian</p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>
          Always check the <strong className="font-medium text-ink">manufacturer&apos;s current page and the pack
          label</strong> for strengths, flavours, age banding and directions. We cannot guarantee accuracy —
          formulations and flavours change without notice.
        </li>
        <li>
          Check <strong className="font-medium text-ink">food allergens including excipients</strong> (oils,
          gelatine, sweeteners, flavour carriers, emulsifiers, thickeners) — not only the headline vitamins or
          nutrients. Allergy status can differ between flavours of the same brand.
        </li>
        <li>
          This page helps families <strong className="font-medium text-ink">see options</strong> to talk through
          with a GP, paediatrician or dietitian. It does not recommend doses, brands to buy, or products to
          start without professional advice.
        </li>
        {extras}
        <li>No affiliate links. Prefer manufacturer, NHS or pharmacy information over marketplace listings.</li>
      </ul>
      <p className="mt-4 text-xs text-ink-faint">
        Information checked {INFO_CHECKED}
        {footerNote ? ` — ${footerNote}` : ' — always read the current label; formulations change.'}
      </p>
    </aside>
  );
}
