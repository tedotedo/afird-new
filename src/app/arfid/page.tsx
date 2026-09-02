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
        Avoidant/Restrictive Food Intake Disorder (ARFID) means eating has become so limited —
        through sensory aversion, fear after choking, gagging or vomiting, or simply low interest
        in food — that growth, nutrition, energy, or daily life is affected. The child (or adult)
        is not trying to be thin. There is no drive to lose weight or control body shape. That is
        the main difference from anorexia.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        Three patterns show up often. Some children refuse foods because of texture, smell, colour,
        or brand (sensory). Some are frightened of choking, gagging, or being sick after a bad
        experience. Others simply have little interest in food and forget to eat. Many children
        show a mix. Refusal is never because the child is being difficult — the sensory load, fear,
        or low drive is real.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        Clinicians diagnose ARFID using recognised criteria in DSM-5-TR and ICD-11. In practice they
        are looking for persistent restriction that harms physical health or day-to-day functioning,
        without the body-image focus of anorexia. That assessment belongs in clinic — this page is
        background, not a checklist to tick at home.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">Picky eating and the spectrum</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Many toddlers and young children are selective and still grow and thrive. That is common,
        and it often eases with time. ARFID is when the restriction is severe enough, or stuck
        enough, to harm health, nutrition, growth, or daily life — not a label for every child who
        pushes peas aside.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        The middle is messy. The same sensory patterns can appear in both ordinary picky eating and
        ARFID. There is overlap; both sit on a spectrum rather than in two tidy boxes. Autism and
        other neurodivergence often travel with the sensory pattern — when they do, assess the eating
        difficulty on its own merits.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        Seek assessment when the accepted food list is shrinking, growth or weight is slipping, or
        mealtimes have become unmanageable. A school-age child stuck on a handful of foods, losing
        weight, or terrified at the table needs proper clinical review.
      </p>

      <h2 className="mt-10 font-display text-2xl text-ink">What good support looks like</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        ARFID responds best to a team that understands it — usually including a paediatrician or GP
        who will track growth, a dietitian, and often psychology or an eating-disorder / feeding
        service. There is no single national NICE pathway yet, so what is on offer varies by area.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        With regular monitoring, the right nutritional plan (food first, supplements when needed),
        and support that does not treat the child as &ldquo;difficult,&rdquo; most children keep
        feeding by mouth. The aim is growth, energy, and to very gradually widen your child&rsquo;s safe
        food list.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        A smaller number need tube feeding (usually a nasogastric tube for a period; sometimes a PEG
        if longer support is required) when they cannot take enough by mouth to stay safe or grow.
        That is a medical decision, not a failure of parenting. Many children who need a tube later
        return to exclusive oral feeding with specialist help; a few need longer-term tube support.
        If a tube is discussed, ask for the plan: why now, how nutrition will be monitored, and what
        the steps back toward oral feeding look like.
      </p>
      <p className="mt-4 leading-relaxed text-ink-muted">
        Do not start, stop or change{' '}
        <Link href="/nutrition-support" className="underline decoration-rule underline-offset-2 hover:text-ink">
          sip feeds
        </Link>
        ,{' '}
        <Link href="/supplements" className="underline decoration-rule underline-offset-2 hover:text-ink">
          supplements
        </Link>{' '}
        or tube regimens without the clinical team.
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
