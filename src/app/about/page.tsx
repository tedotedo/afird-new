import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = { title: 'About', authors: [{ name: 'Dr Odet Mark Aszkenasy' }] };

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
        <p>
          I am Dr Odet Mark Aszkenasy. I qualified in medicine in London in 1982. After general medicine and paediatrics, I
          moved into neurodevelopmental work in 1996 and later specialised in autism. I worked as a Consultant Community
          Paediatrician and clinical lead for autism until retirement from the NHS in September 2026, and now work as a
          consultant paediatrician for Care ADHD. I also write at{' '}
          <a
            className="text-accent underline-offset-2 hover:underline"
            href="https://www.practical-autism-research.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Practical Autism Research
          </a>
          .
        </p>
        <p>
          Families kept asking for something simple on ARFID — what it is, what to try at home,
          and when to push for help — without another app harvesting meal photos and growth data.
          That is why this site exists.
        </p>
        <p>
          Optional notes stay in your browser unless you choose to save them on your device.
        </p>
        <p>
          This site does not replace your GP, paediatrician, or
          dietitian, and it is not a shop.
        </p>
      </div>
    </article>
  );
}
