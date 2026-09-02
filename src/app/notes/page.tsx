'use client';

import { useEffect, useState } from "react";

const KEY = "aw-local-notes";

export default function NotesPage() {
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setText(raw);
    } catch {
      /* ignore */
    }
  }, []);

  function save() {
    try {
      localStorage.setItem(KEY, text);
      setSavedAt(new Date().toLocaleString("en-GB"));
    } catch {
      /* ignore */
    }
  }

  function clear() {
    try {
      localStorage.removeItem(KEY);
      setText("");
      setSavedAt(null);
    } catch {
      /* ignore */
    }
  }

  return (
    <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Private notes</h1>
      <p className="mt-4 text-ink-muted leading-relaxed">
        Optional notes stay in <strong className="font-medium text-ink">this browser only</strong>.
        Nothing is uploaded. Clearing site data removes them.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        className="mt-6 w-full rounded-md border border-rule bg-paper-card p-3 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        placeholder="Questions for clinic, foods to try, wins…"
      />
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={save} className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover">
          Save on this device
        </button>
        <button type="button" onClick={clear} className="rounded-md border border-rule bg-paper-card px-4 py-2 text-sm text-ink-muted hover:bg-paper">
          Clear notes
        </button>
      </div>
      {savedAt && <p className="mt-3 text-xs text-ink-muted">Saved locally {savedAt}</p>}
    </article>
  );
}
