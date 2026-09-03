'use client';

import { useEffect, useState } from "react";

const KEY = "aw-local-notes";

type WeightEntry = { id: string; date: string; weight: string };

type StoredNotes = { text: string; weights: WeightEntry[] };

const PLACEHOLDER = `Accepted foods (include brands):
-

Feared / refused foods:
-

What happens at mealtimes:
-

Progress since last appointment (look / smell / touch, sitting longer, new brand of a safe food, one bite of a near-safe texture, less distress):
-

Questions for GP / dietitian:
-
`;

function newWeight(): WeightEntry {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `w-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: "",
    weight: "",
  };
}

function loadStored(): StoredNotes {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { text: "", weights: [] };
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && "text" in parsed) {
        const obj = parsed as { text?: unknown; weights?: unknown };
        const text = typeof obj.text === "string" ? obj.text : "";
        const weights = Array.isArray(obj.weights)
          ? obj.weights
              .filter(
                (w): w is WeightEntry =>
                  !!w &&
                  typeof w === "object" &&
                  typeof (w as WeightEntry).id === "string" &&
                  typeof (w as WeightEntry).date === "string" &&
                  typeof (w as WeightEntry).weight === "string",
              )
              .map((w) => ({ id: w.id, date: w.date, weight: w.weight }))
          : [];
        return { text, weights };
      }
    } catch {
      /* legacy plain-string notes */
    }
    return { text: raw, weights: [] };
  } catch {
    return { text: "", weights: [] };
  }
}

export default function NotesPage() {
  const [text, setText] = useState("");
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadStored();
    setText(stored.text);
    setWeights(stored.weights);
  }, []);

  function updateWeight(id: string, patch: Partial<Pick<WeightEntry, "date" | "weight">>) {
    setWeights((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function addWeight() {
    setWeights((rows) => [...rows, newWeight()]);
  }

  function removeWeight(id: string) {
    setWeights((rows) => rows.filter((row) => row.id !== id));
  }

  function save() {
    try {
      const cleaned = weights.filter((w) => w.date.trim() || w.weight.trim());
      const payload: StoredNotes = { text, weights: cleaned };
      localStorage.setItem(KEY, JSON.stringify(payload));
      setWeights(cleaned);
      setSavedAt(new Date().toLocaleString("en-GB"));
    } catch {
      /* ignore */
    }
  }

  function clear() {
    try {
      localStorage.removeItem(KEY);
      setText("");
      setWeights([]);
      setSavedAt(null);
    } catch {
      /* ignore */
    }
  }

  return (
    <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Notes for clinic</h1>
      <p className="mt-4 text-ink-muted leading-relaxed">
        Use this before a GP, paediatric, or dietitian appointment. List accepted foods, feared
        foods, small signs of progress, and the questions you want answered. Save them on this
        device with the button below. Nothing is uploaded, and clearing your browser data will
        remove them — so if the list matters, take a photo of it too.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={14}
        className="mt-6 w-full rounded-md border border-rule bg-paper-card p-3 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        placeholder={PLACEHOLDER}
      />

      <section className="mt-8" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="font-display text-2xl text-ink">
          Progress worth noting
        </h2>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          Progress rarely looks like &ldquo;ate a new food,&rdquo; and a week can feel like nothing
          happened when it did. Anything here is worth writing down:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
          <li>Looked at, smelled, or touched a food before tasting</li>
          <li>Stayed at the table a bit longer</li>
          <li>Tried a new brand or pack of a safe food</li>
          <li>One bite of a near-safe texture</li>
          <li>Less distress, or shorter stand-offs, at mealtimes</li>
        </ul>
        <p className="mt-3 text-sm text-ink-muted leading-relaxed">
          Weight trend has its own log below if you need it.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="weights-heading">
        <h2 id="weights-heading" className="font-display text-2xl text-ink">
          Weight log <span className="text-base font-sans font-normal text-ink-muted">(optional)</span>
        </h2>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          Optional — weights from home scales or clinic letters help the GP see the trend. Use kg if
          you can; stone/lb is fine too. Leave blank if you do not need this.
        </p>

        {weights.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[18rem] border-collapse text-sm">
              <thead>
                <tr className="text-left text-ink-muted">
                  <th className="pb-2 pr-2 font-medium">Date</th>
                  <th className="pb-2 pr-2 font-medium">Weight</th>
                  <th className="pb-2 w-16">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {weights.map((row) => (
                  <tr key={row.id}>
                    <td className="py-1.5 pr-2 align-middle">
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => updateWeight(row.id, { date: e.target.value })}
                        className="w-full min-w-[9.5rem] rounded-md border border-rule bg-paper-card px-2 py-1.5 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        aria-label="Weight date"
                      />
                    </td>
                    <td className="py-1.5 pr-2 align-middle">
                      <input
                        type="text"
                        value={row.weight}
                        onChange={(e) => updateWeight(row.id, { weight: e.target.value })}
                        placeholder="e.g. 18.2 kg"
                        className="w-full rounded-md border border-rule bg-paper-card px-2 py-1.5 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        aria-label="Weight"
                      />
                    </td>
                    <td className="py-1.5 align-middle">
                      <button
                        type="button"
                        onClick={() => removeWeight(row.id)}
                        className="rounded-md px-2 py-1.5 text-ink-muted hover:bg-paper hover:text-ink"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="button"
          onClick={addWeight}
          className="mt-3 rounded-md border border-rule bg-paper-card px-3 py-2 text-sm text-ink-muted hover:bg-paper hover:text-ink"
        >
          Add a weight
        </button>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Save on this device
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded-md border border-rule bg-paper-card px-4 py-2 text-sm text-ink-muted hover:bg-paper"
        >
          Clear notes
        </button>
      </div>
      {savedAt && <p className="mt-3 text-xs text-ink-muted">Saved locally {savedAt}</p>}
    </article>
  );
}
