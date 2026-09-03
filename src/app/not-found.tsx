import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-prose px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink-muted">That route is not part of Practical ARFID.</p>
      <Link href="/" className="mt-8 inline-block text-accent underline-offset-2 hover:underline">
        Back home
      </Link>
    </div>
  );
}
