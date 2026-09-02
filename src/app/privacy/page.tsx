import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Privacy</h1>
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
        <p>
          <strong className="font-medium text-ink">ARFID Wellness does not collect child or health data.</strong>{" "}
          No accounts. No cloud food logs. No camera uploads. No BMI tools that store results.
        </p>
        <p>
          Optional notes and weight dates on the Notes for clinic page use browser localStorage on your device.
          We cannot read them.
        </p>
        <p>
          If you accept analytics cookies, we use Google Analytics 4 for anonymous site traffic
          (pages viewed, device type, rough region). That is not used to track food, sleep, or
          anything about your child.
        </p>
        <p>
          The site is hosted on Netlify. It may appear at arfidwellnesstracker.com and
          arfidwellness.co.uk. Same site, same privacy rules — the older tracker domain is kept
          so existing links still work.
        </p>
        <p>
          Questions:{" "}
          <a className="text-accent underline-offset-2 hover:underline" href="https://practical-autism-research.co.uk">
            practical-autism-research.co.uk
          </a>
          .
        </p>
      </div>
    </article>
  );
}
