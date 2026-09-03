'use client';

import { useMemo, useState } from 'react';
import { onsFormSections, onsProducts, type OnsForm, type OnsProduct } from '@/data/ons';

function FormBadge({ form }: { form: OnsForm }) {
  const labels: Record<OnsForm, string> = {
    'liquid-sip': 'Milkshake sip',
    smoothie: 'Smoothie / juice',
    pudding: 'Pudding-style',
    'modular-liquid': 'Energy shot',
    powder: 'Powder',
  };
  return (
    <span className="rounded-full border border-rule bg-paper px-2.5 py-0.5 text-xs text-ink-muted">
      {labels[form]}
    </span>
  );
}

function ProductCard({ product }: { product: OnsProduct }) {
  return (
    <article className="rounded-xl border border-rule bg-paper-card p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-faint">{product.brand}</p>
          <h3 className="mt-1 font-display text-xl text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{product.formLabel}</p>
        </div>
        <FormBadge form={product.form} />
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-medium text-ink">Flavour variants</dt>
          <dd className="mt-0.5 text-ink-muted">{product.flavours}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Texture / flavour / mouthfeel</dt>
          <dd className="mt-0.5 text-ink-muted">{product.textureNotes}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Energy / protein / what it is</dt>
          <dd className="mt-0.5 text-ink-muted">{product.keyContents}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Complete nutrition?</dt>
          <dd className="mt-0.5 text-ink-muted">{product.completeNutrition}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Age / weight banding (label)</dt>
          <dd className="mt-0.5 text-ink-muted">{product.ageBand}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Allergens / excipients to check</dt>
          <dd className="mt-0.5 text-ink-muted">{product.allergensHint}</dd>
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

export default function OnsExplorer() {
  const [form, setForm] = useState<OnsForm | 'all'>('all');

  const filtered = useMemo(() => {
    if (form === 'all') return onsProducts;
    return onsProducts.filter((p) => p.form === form);
  }, [form]);

  const order: OnsForm[] = ['liquid-sip', 'smoothie', 'pudding', 'modular-liquid', 'powder'];
  const grouped =
    form === 'all'
      ? order
          .map((f) => ({
            form: f,
            label: onsFormSections.find((x) => x.id === f)?.label ?? f,
            items: onsProducts.filter((p) => p.form === f),
          }))
          .filter((g) => g.items.length > 0)
      : null;

  return (
    <div>
      <div className="sticky top-[57px] z-30 -mx-4 border-y border-rule bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-faint">Filter by form</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {onsFormSections.map((s) => (
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
        <p className="mt-2 text-xs text-ink-faint">
          Showing {filtered.length} of {onsProducts.length} products
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
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
