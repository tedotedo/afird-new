import Link from 'next/link';
import CookiePreferences from '@/components/CookiePreferences';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-rule bg-ink text-[#e8e2d6]">
      <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg text-white">Practical ARFID</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#c9c2b4]">
              Plain UK information for families dealing with Avoidant/Restrictive Food Intake
              Disorder. Written by a consultant community paediatrician. Notes stay on this
              device — nothing is uploaded.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/arfid" className="hover:text-white/95">About ARFID</Link></li>
              <li><Link href="/supplements" className="hover:text-white/95">Vitamins &amp; textures</Link></li>
              <li><Link href="/nutrition-support" className="hover:text-white/95">Sip feeds &amp; fortifiers</Link></li>
              <li><Link href="/resources" className="hover:text-white/95">UK resources</Link></li>
              <li><Link href="/notes" className="hover:text-white/95">Notes for clinic</Link></li>
              <li><Link href="/about" className="hover:text-white/95">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white/95">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-white">Helpful sources</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="https://www.beateatingdisorders.org.uk/types/arfid" target="_blank" rel="noopener noreferrer" className="hover:text-white/95">Beat — ARFID</a></li>
              <li><a href="https://www.arfidawarenessuk.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white/95">ARFID Awareness UK</a></li>
              <li><a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white/95">NHS</a></li>
              <li><a href="https://www.practical-autism-research.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white/95">Practical Autism Research</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-sm text-[#a39e92]">
          <p>© {new Date().getFullYear()} Practical ARFID. Dr Odet Mark Aszkenasy.</p>
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
