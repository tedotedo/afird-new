import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Privacy</h1>
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
        <p>
          <strong className="font-medium text-ink">ARFID Wellness does not collect child or health data.</strong>{" "}
          There are no accounts, no food logs in the cloud, no camera uploads, and no BMI calculators that store results.
        </p>
        <p>
          Optional notes on the Notes page use browser localStorage on your device only. We cannot see them.
        </p>
        <p>
          If you accept analytics cookies, we use Google Analytics 4 for anonymous traffic (pages, devices, approximate region).
          Measurement ID is set via environment; it is not a tracking product for food or sleep.
        </p>
        <p>
          Hosting is on Netlify. The domain may remain arfidwellnesstracker.com for continuity even though the product name is ARFID Wellness.
        </p>
        <p>
          Contact via{" "}
          <a className="text-accent underline-offset-2 hover:underline" href="https://practical-autism-research.co.uk">
            practical-autism-research.co.uk
          </a>.
        </p>
      </div>
    </article>
  );
}
