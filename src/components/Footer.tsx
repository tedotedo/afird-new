import Link from 'next/link';
import CookiePreferences from '@/components/CookiePreferences';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-rule bg-ink text-[#d7d3ca]">
      <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg text-white">ARFID Wellness</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#b7b3aa]">
              Plain UK information for families dealing with Avoidant/Restrictive Food Intake
              Disorder. Written by a consultant community paediatrician. Notes stay on this
              device — nothing is uploaded.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/arfid" className="hover:text-white">About ARFID</Link></li>
              <li><Link href="/supplements" className="hover:text-white">Vitamins &amp; textures</Link></li>
              <li><Link href="/resources" className="hover:text-white">UK resources</Link></li>
              <li><Link href="/notes" className="hover:text-white">Notes for clinic</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-white">Trusted sources</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="https://www.beateatingdisorders.org.uk/types/arfid" target="_blank" rel="noopener noreferrer" className="hover:text-white">Beat — ARFID</a></li>
              <li><a href="https://www.arfidawarenessuk.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white">ARFID Awareness UK</a></li>
              <li><a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white">NHS</a></li>
              <li><a href="https://www.practical-autism-research.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white">Practical Autism Research</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-sm text-[#8f8b82]">
          <p>© {new Date().getFullYear()} ARFID Wellness. Dr Odet Mark Aszkenasy.</p>
          <p className="mt-2 text-xs"><CookiePreferences /></p>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed">
            General information only — not a substitute for professional advice.
            Talk to your GP, paediatrician, or healthcare team about feeding and nutrition.
          </p>
        </div>
      </div>
    </footer>
  );
}
