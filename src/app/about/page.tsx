import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">About</h1>
      <div className="mt-8 flex justify-center">
        <div className="overflow-hidden rounded-lg border border-rule shadow-sm">
          <Image src="/author-photo.jpg" alt="Dr Odet Mark Aszkenasy" width={240} height={300} className="object-cover" priority />
        </div>
      </div>
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
        <p>I qualified in medicine in London in 1982. After general medicine and paediatrics, I entered neurodevelopmental paediatrics in 1996 and later specialised in autism.</p>
        <p>As clinical lead for autism in a busy paediatric service in the north-east of England, I meet families every week who are trying to understand their child's needs. ARFID Wellness is a quiet companion site: information only, no cloud food tracking.</p>
        <p className="rounded-md border border-rule bg-paper-card p-4 text-sm italic">The best approach combines scientific rigour with honest, straightforward communication.</p>
      </div>
    </article>
  );
}
