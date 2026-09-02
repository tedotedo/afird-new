import type { Metadata } from 'next';
import Link from 'next/link';
import OnsExplorer from '@/components/OnsExplorer';
import ProductInfoCaveat from '@/components/ProductInfoCaveat';

export const metadata: Metadata = {
  title: 'Sip feeds & fortifiers',
  description:
    'UK paediatric oral nutritional supplements and fortifiers by form and texture for restricted diets and ARFID. Foods for Special Medical Purposes — not medical advice.',
};

export default function NutritionSupportPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Sip feeds &amp; fortifiers</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Paediatric oral nutritional supplements (ONS), smoothie and pudding-style feeds, and modular
        calorie boosters used in UK practice when intake is too low — compared by form, flavour and
        mouthfeel.
      </p>

      <ProductInfoCaveat
        footerNote="always read the current label and datasheet; FSMP products are prescribed/advised under medical supervision. Formulations change."
        extras={
          <>
            <li>
              Most products here are <strong className="font-medium text-ink">Foods for Special Medical
              Purposes (FSMP)</strong>. They are for use under medical supervision — usually via GP,
              paediatrician or dietitian, often on ACBS prescription. Do not buy and start them as
              everyday “meal replacements” without advice.
            </li>
            <li>
              If a sip feed is too sweet, milky or oily, many children with ARFID will not drink it.
              That is never because they are being difficult. Texture belongs in the conversation with
              the dietitian.
            </li>
            <li>
              Modular fortifiers (Calogen, Pro-Cal, Duocal) are <strong className="font-medium text-ink">not
              complete feeds</strong>. Wrong doses can unbalance the diet. Age limits differ from
              paediatric complete ONS.
            </li>
          </>
        }
      />

      <section className="mt-10 max-w-prose">
        <h2 className="font-display text-2xl text-ink">How this differs from vitamins</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Vitamins fill micronutrient gaps. These products are mainly about <strong className="font-medium text-ink">energy
          and protein</strong> (and sometimes fibre) when a child cannot eat enough food. See{' '}
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
            Adult sip feeds (e.g. many Ensure/Fortisip lines) are a different conversation — paediatric
            products are listed first here for a reason.
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
          We skipped adult-primary lines (many Fortisip / Ensure Plus SKUs) except where clearly used as
          paediatric modular products with published age limits. Peptide / elemental feeds, tube-feed-only
          presentations, and brand variants without a clear current UK manufacturer page were omitted
          rather than guessed. Local formularies decide what is actually available on FP10.
        </p>
      </section>
    </div>
  );
}
