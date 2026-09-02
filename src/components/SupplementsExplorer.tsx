'use client';

import { useMemo, useState } from 'react';
import {
  formSections,
  supplements,
  type Supplement,
  type SupplementForm,
} from '@/data/supplements';

function FormBadge({ form }: { form: SupplementForm }) {
  const labels: Record<SupplementForm, string> = {
    liquid: 'Liquid / drops',
    spray: 'Spray',
    gummy: 'Gummy',
    chewable: 'Chewable',
    sprinkle: 'Powder / sprinkle',
    other: 'Other',
  };
  return (
    <span className="rounded-full border border-rule bg-paper px-2.5 py-0.5 text-xs text-ink-muted">
      {labels[form]}
    </span>
  );
}

function ProductCard({ product }: { product: Supplement }) {
  return (
    <article className="rounded-xl border border-rule bg-paper-card p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-faint">{product.brand}</p>
          <h3 className="mt-1 font-display text-xl text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{product.formLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <FormBadge form={product.form} />
          {product.containsIron && (
            <span className="rounded-full border border-amber-700/30 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-900">
              Contains iron
            </span>
          )}
        </div>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-medium text-ink">Flavour(s)</dt>
          <dd className="mt-0.5 text-ink-muted">{product.flavours}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Texture / mouthfeel (ARFID-relevant)</dt>
          <dd className="mt-0.5 text-ink-muted">{product.textureNotes}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Key contents</dt>
          <dd className="mt-0.5 text-ink-muted">{product.keyContents}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Age banding (label)</dt>
          <dd className="mt-0.5 text-ink-muted">{product.ageBand}</dd>
        </div>
        {product.notes && (
          <div>
            <dt className="font-medium text-ink">Practical notes</dt>
            <dd className="mt-0.5 text-ink-muted">{product.notes}</dd>
          </div>
        )}
      </dl>

      <p className="mt-4 text-sm">
        <a
          href={product.infoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-rule underline-offset-2 hover:text-ink"
        >
          {product.infoLabel}
        </a>
      </p>
    </article>
  );
}

export default function SupplementsExplorer() {
  const [form, setForm] = useState<SupplementForm | 'all'>('all');
  const [ironOnly, setIronOnly] = useState(false);

  const filtered = useMemo(() => {
    return supplements.filter((s) => {
      if (form !== 'all' && s.form !== form) return false;
      if (ironOnly && !s.containsIron) return false;
      return true;
    });
  }, [form, ironOnly]);

  const byFormOrder: SupplementForm[] = [
    'liquid',
    'spray',
    'gummy',
    'chewable',
    'sprinkle',
    'other',
  ];

  const grouped =
    form === 'all' && !ironOnly
      ? byFormOrder
          .map((f) => ({
            form: f,
            label: formSections.find((x) => x.id === f)?.label ?? f,
            items: supplements.filter((s) => s.form === f),
          }))
          .filter((g) => g.items.length > 0)
      : null;

  return (
    <div>
      <div className="sticky top-[57px] z-30 -mx-4 border-y border-rule bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-faint">Filter by form</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {formSections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setForm(s.id)}
              className={`rounded-md px-3 py-1.5 text-sm ${
                form === s.id
                  ? 'bg-accent text-white'
                  : 'border border-rule bg-paper-card text-ink-muted hover:border-accent/30 hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={ironOnly}
            onChange={(e) => setIronOnly(e.target.checked)}
            className="rounded border-rule"
          />
          Show only products that contain iron
        </label>
        <p className="mt-2 text-xs text-ink-faint">
          Showing {filtered.length} of {supplements.length} products
        </p>
      </div>

      {grouped ? (
        <div className="mt-8 space-y-12">
          {grouped.map((g) => (
            <section key={g.form} id={g.form}>
              <h2 className="font-display text-2xl text-ink">{g.label}</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {g.items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {filtered.length === 0 ? (
            <p className="text-ink-muted">No products match these filters.</p>
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      )}
    </div>
  );
}
