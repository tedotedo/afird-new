import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About ARFID' };

export default function ArfidPage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">About ARFID</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">
        Avoidant/Restrictive Food Intake Disorder — plain English for parents and carers.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">What is ARFID?</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        ARFID means a child (or adult) avoids many foods, or eats very little overall — enough to
        affect growth, nutrition, energy, or daily life. It is not about wanting to be thin. There
        is no drive to lose weight or control shape. That is the main difference from anorexia.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        Three patterns show up often. Some children refuse foods because of texture, smell, colour,
        or brand (sensory). Some are frightened of choking, gagging, or being sick after a bad
        experience. Others simply have little interest in food and forget to eat. Many children
        show a mix. Autism and other neurodevelopmental conditions overlap a lot with the sensory
        pattern — that does not make the eating problem less real.
      </p>
      <p className="mt-4 rounded-md border border-rule bg-paper-card p-4 text-sm leading-relaxed text-ink-muted">
        ARFID is a recognised medical condition, not &ldquo;just picky eating&rdquo; or a phase you can wait
        out. A toddler who refuses greens is common. A school-age child stuck on five foods, losing
        weight, or terrified at the table needs proper assessment.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">Signs at the table</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
        <li>Very short list of accepted foods — often the same brand or packaging</li>
        <li>Refusal based on texture, smell, colour, or how the food looks on the plate</li>
        <li>Mealtimes full of dread, tears, or long stand-offs</li>
        <li>Fear of choking, gagging, or vomiting</li>
        <li>Poor growth, weight loss, tiredness, or constipation — or normal weight on a very narrow diet</li>
        <li>Avoiding parties, school dinners, or eating with other people</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl text-ink">What to try carefully this week</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        There is no miracle diet. Pressure and bribes usually make mealtime anxiety worse. Small,
        steady steps work better than big confrontations.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
        <li>Keep mealtimes calm and predictable. Same place, same rough time, no long battles.</li>
        <li>Offer one safe food alongside a tiny amount of something new — no requirement to eat it.</li>
        <li>Let the child look at, smell, or touch a new food before tasting. That counts as progress.</li>
        <li>Do not hide new foods inside accepted ones if trust is already fragile.</li>
        <li>Write down what they actually eat in a normal week. You will need that list for clinic.</li>
      </ul>
      <p className="mt-4 leading-relaxed text-ink-muted">
        Do not start supplements, meal replacements, or major diet changes without advice from
        your GP or a dietitian. Cutting out food groups on your own can make nutrition worse.
        If nutrition gaps are already on the table in clinic, ask the dietitian which format is
        realistic — liquids, sprays, gummies and powders fail for different sensory reasons. See{' '}
        <Link href="/supplements" className="underline decoration-rule underline-offset-2 hover:text-ink">
          Vitamins &amp; textures
        </Link>{' '}
        for a UK product comparison (not a recommendation to buy). For energy and protein
        products (sip feeds, puddings, fortifiers), see{' '}
        <Link href="/nutrition-support" className="underline decoration-rule underline-offset-2 hover:text-ink">
          Sip feeds &amp; fortifiers
        </Link>.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">When to see the GP</h2>
      <p className="mt-3 font-medium text-ink">Book a routine GP appointment if:</p>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-ink-muted">
        <li>The accepted food list is getting shorter, or mealtimes have become unmanageable</li>
        <li>Growth has slowed, weight has dropped, or school energy is poor</li>
        <li>Fear of choking or being sick is stopping them eating safely</li>
        <li>You suspect autism or sensory issues and eating is part of the picture</li>
      </ul>
      <p className="mt-4 font-medium text-ink">Seek urgent help (same day / A&amp;E / 999) if:</p>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-ink-muted">
        <li>Your child cannot keep fluids down, is dehydrated, or is rapidly losing weight</li>
      </ul>
      <p className="mt-4 leading-relaxed text-ink-muted">
        The GP can check growth, rule out medical causes, and refer to community paediatrics,
        dietetics, CAMHS, or a local eating-disorder pathway. Pathways vary by area — ask what
        exists where you live.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">Prepare for the appointment</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Ten minutes of notes help more than a long story under stress. Bring:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
        <li>A list of foods they will eat (brands matter — write them down)</li>
        <li>Foods they used to eat but now refuse</li>
        <li>What happens at mealtimes — gagging, leaving the table, distress</li>
        <li>Growth concerns, constipation, tiredness, or school impact</li>
        <li>Questions you want answered before you leave</li>
      </ul>
      <p className="mt-4 leading-relaxed text-ink-muted">
        Use our{' '}
        <Link href="/notes" className="underline decoration-rule underline-offset-2 hover:text-ink">
          Notes for clinic
        </Link>{' '}
        page if you want somewhere private to draft this. Or see{' '}
        <Link href="/resources" className="underline decoration-rule underline-offset-2 hover:text-ink">
          UK resources
        </Link>{' '}
        for charity and NHS links.
      </p>
    </article>
  );
}
