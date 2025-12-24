'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';

export default function SupplementsInfoPage() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [checkboxAccepted, setCheckboxAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarDismissed, setSidebarDismissed] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has previously acknowledged
    if (typeof window !== 'undefined') {
      const hasAcknowledged = localStorage.getItem('supplementsDisclaimerAccepted');
      if (hasAcknowledged === 'true') {
        setAcknowledged(true);
      }
      // Check session storage for sidebar dismissal
      const sidebarDismissedSession = sessionStorage.getItem('sidebarDismissed');
      if (sidebarDismissedSession === 'true') {
        setSidebarDismissed(true);
      }
      setIsLoading(false);
    }
  }, []);

  const handleAccept = () => {
    if (checkboxAccepted) {
      localStorage.setItem('supplementsDisclaimerAccepted', 'true');
      setAcknowledged(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDismissSidebar = () => {
    sessionStorage.setItem('sidebarDismissed', 'true');
    setSidebarDismissed(true);
  };

  const toggleTooltip = (id: string) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  // Tooltip component
  const Tooltip = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <div className="relative inline-block ml-2">
      <button
        onClick={() => toggleTooltip(id)}
        className="text-blue-600 hover:text-blue-700 focus:outline-none"
        aria-label="More information"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      {activeTooltip === id && (
        <div className="absolute z-10 w-64 p-3 mt-2 text-sm bg-white border-2 border-blue-200 rounded-lg shadow-lg left-0 animate-fadeIn">
          <button
            onClick={() => setActiveTooltip(null)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-gray-700">{children}</div>
        </div>
      )}
    </div>
  );

  // Section reminder component
  const SectionReminder = ({ text }: { text: string }) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6 rounded-r-lg">
      <p className="text-sm text-yellow-800 flex items-center gap-2">
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{text}</span>
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </AuthGuard>
    );
  }

  if (!acknowledged) {
    return (
      <AuthGuard>
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-scaleIn">
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <span className="text-4xl text-orange-600">💊</span>
              <h2 className="text-3xl font-bold text-gray-900">Important Disclaimer</h2>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-4">Please acknowledge before viewing supplement guidance:</p>

              <div className="space-y-4 text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Parents should not make any decisions about supplements and diet based on the information provided by this app</strong>,
                  which is for indicative tracking only. Always check with their paediatrician, GP, or registered dietitian before starting,
                  stopping, or changing any supplement, especially higher‑dose single‑nutrient products.
                </p>

                <p className="text-sm leading-relaxed">
                  Doses, blood tests, and monitoring plans must be individualised, particularly in children with complex medical conditions
                  or on multiple medications.
                </p>

                <p className="text-sm leading-relaxed">
                  This page is general information only and is not a substitute for medical advice or diagnosis. The inclusion of any
                  supplement types, examples or product formats does not imply endorsement by the clinician, service, app, or any partner organisation.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkboxAccepted}
                  onChange={(e) => setCheckboxAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 select-none group-hover:text-gray-900">
                  I have read and understood this disclaimer and acknowledge that this information is for educational purposes only
                  and does not replace professional medical advice
                </span>
              </label>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAccept}
                disabled={!checkboxAccepted}
                className={`px-8 py-3 rounded-lg font-semibold text-lg shadow-md transition-colors
                  ${checkboxAccepted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                I Acknowledge - View Supplement Guidance
              </button>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
        {/* Sticky Sidebar Banner */}
        {!sidebarDismissed && (
          <div className="fixed right-4 top-24 z-40 hidden md:block animate-fadeIn">
            <div className="bg-white border-2 border-orange-400 rounded-lg shadow-lg p-4 max-w-xs">
              <button
                onClick={handleDismissSidebar}
                className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-orange-600 transition"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">👨‍⚕️</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Important Reminder</p>
                  <p className="text-xs text-gray-700">
                    Discuss all supplements with your clinician before starting
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sticky Banner (Bottom) */}
        {!sidebarDismissed && (
          <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-slideUp">
            <div className="bg-white border-2 border-orange-400 rounded-lg shadow-lg p-3 relative">
              <button
                onClick={handleDismissSidebar}
                className="absolute -top-3 -right-3 bg-orange-500 text-white rounded-full w-11 h-11 flex items-center justify-center hover:bg-orange-600 transition z-50 shadow-lg"
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👨‍⚕️</span>
                <p className="text-xs font-semibold text-gray-900">
                  Discuss all supplements with your clinician
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">💊</span>
              <h1 className="text-4xl md:text-5xl font-bold">Vitamin & Mineral Supplements for Children with ARFID</h1>
            </div>
            <p className="text-xl text-orange-100 mt-4">
              Evidence-based guidance for families and clinicians
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl mt-8 space-y-8">

          {/* Why Supplements Are Sometimes Needed */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🍎</span>
              Why Supplements Are Sometimes Needed
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="leading-relaxed">
                Children with ARFID often eat a very limited range of foods, which can mean low intakes of several vitamins and minerals,
                even if total calories or growth charts look "ok". The restrictive nature of ARFID means that whole food groups may be
                avoided, leading to gaps in essential nutrients.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Common Nutrient Deficiencies in ARFID</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Research studies in children with ARFID have identified low intakes or deficiencies of:
                </p>
                <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                  <li><strong>Vitamins:</strong> A, C, D, B1 (thiamin), B2 (riboflavin), B12, folate, vitamin K</li>
                  <li><strong>Minerals:</strong> Iron, calcium, zinc, potassium, magnesium, iodine</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-2">Symptoms of Deficiency Can Include:</h3>
                <ul className="text-sm text-red-800 list-disc list-inside space-y-1">
                  <li>Persistent tiredness and fatigue</li>
                  <li>Poor concentration and difficulty focusing</li>
                  <li>Weakened immune function (frequent infections)</li>
                  <li>Bone health concerns (fractures, poor bone density)</li>
                  <li>Eye problems and vision changes</li>
                  <li>Slow wound healing</li>
                  <li>In severe cases, serious medical complications requiring urgent treatment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hidden Risk: Normal Intake But Ongoing Deficiency */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              Hidden Risk: When Intake Looks "Normal"
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="leading-relaxed">
                Some children have apparently adequate intake on food diaries or tracking apps but still develop deficiency.
                This is a critical point that parents and clinicians need to understand.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Why This Happens:</h3>
                <ul className="text-sm text-yellow-800 space-y-3">
                  <li>
                    <strong>Malabsorption problems:</strong> Conditions such as untreated or partially treated coeliac disease,
                    inflammatory bowel disease (IBD), or other gastrointestinal conditions can prevent proper absorption of nutrients,
                    even when intake appears adequate.
                  </li>
                  <li>
                    <strong>Utilization difficulties:</strong> Some children have underlying metabolic, genetic, or chronic medical
                    conditions that affect how their body processes and uses vitamins and minerals, requiring higher intakes or
                    different forms of supplementation.
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed">
                In these situations, clinicians may use blood tests, growth monitoring, and symptom review to decide whether targeted
                supplementation is needed and how long to continue it. This is why tracking apps alone cannot replace medical assessment.
              </p>
            </div>
          </div>

          {/* ARFID-Friendly Supplement Formats */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <SectionReminder text="Remember: All supplement decisions require individual medical guidance" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🧪</span>
              ARFID-Friendly Supplement Formats
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="leading-relaxed">
                For children with ARFID, the format of a supplement can be just as important as its nutritional content.
                Sensory sensitivities, swallowing difficulties, and food aversions mean that traditional tablets or capsules
                may not be acceptable.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Liquids and Syrups */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <span>💧</span> Liquids and Syrups
                    <Tooltip id="liquids">
                      <p className="font-semibold mb-1">Individual medical advice is essential.</p>
                      <p>Never start supplements without consulting your child's healthcare team.</p>
                    </Tooltip>
                  </h3>
                  <div className="text-sm text-purple-800 space-y-2">
                    <p><strong>Pros:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Easier for children who dislike tablets</li>
                      <li>Flexible dosing (can adjust amount easily)</li>
                      <li>Can sometimes be mixed with drinks</li>
                    </ul>
                    <p><strong>Cons:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>May have strong taste or smell</li>
                      <li>Can stain teeth (e.g., iron syrups)</li>
                      <li>Need measuring device for accuracy</li>
                      <li>Some have sugar or artificial flavours</li>
                    </ul>
                  </div>
                </div>

                {/* Powders */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <span>🥄</span> Powders
                    <Tooltip id="powders">
                      <p className="font-semibold mb-1">Individual medical advice is essential.</p>
                      <p>Never start supplements without consulting your child's healthcare team.</p>
                    </Tooltip>
                  </h3>
                  <div className="text-sm text-green-800 space-y-2">
                    <p><strong>Pros:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Can be mixed into "safe" foods or drinks</li>
                      <li>Often tasteless or easy to mask</li>
                      <li>Good for multiple nutrients in one dose</li>
                    </ul>
                    <p><strong>Cons:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Changes texture of food/drink</li>
                      <li>May not dissolve completely</li>
                      <li>Difficult to hide if child is sensitive</li>
                      <li>Needs careful discussion with child</li>
                    </ul>
                  </div>
                </div>

                {/* Chewables and Gummies */}
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <h3 className="font-semibold text-pink-900 mb-2 flex items-center gap-2">
                    <span>🍬</span> Chewables and Gummies
                    <Tooltip id="chewables">
                      <p className="font-semibold mb-1">Individual medical advice is essential.</p>
                      <p>Never start supplements without consulting your child's healthcare team.</p>
                    </Tooltip>
                  </h3>
                  <div className="text-sm text-pink-800 space-y-2">
                    <p><strong>Pros:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Most acceptable for taste and texture</li>
                      <li>Child may view as "treat" rather than medicine</li>
                      <li>Wide variety available</li>
                    </ul>
                    <p><strong>Cons:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Often contain sugar or sweeteners</li>
                      <li>Dental health concerns with frequent use</li>
                      <li>Not suitable for every child (allergies, sensitivities)</li>
                      <li>Can be seen as "sweets" (safety risk)</li>
                    </ul>
                  </div>
                </div>

                {/* Sprays, Drops, Dispersibles */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <span>💨</span> Sprays, Drops & Dispersible Tablets
                    <Tooltip id="sprays">
                      <p className="font-semibold mb-1">Individual medical advice is essential.</p>
                      <p>Never start supplements without consulting your child's healthcare team.</p>
                    </Tooltip>
                  </h3>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p><strong>Pros:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Very small volumes needed</li>
                      <li>Quick and convenient</li>
                      <li>Good for specific nutrients (vitamin D, B12)</li>
                      <li>Dispersibles dissolve in water quickly</li>
                    </ul>
                    <p><strong>Cons:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Can have unpleasant taste or sensation</li>
                      <li>Spray coordination may be difficult</li>
                      <li>Not available for all nutrients</li>
                      <li>Can be more expensive</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-orange-900 mb-2">Important Reminders:</h3>
                <ul className="text-sm text-orange-800 list-disc list-inside space-y-1">
                  <li>Always check labels for age-appropriateness and maximum safe daily doses</li>
                  <li>Look for potential allergens (gluten, dairy, soy, nuts) especially if your child has coeliac disease or allergies</li>
                  <li>Consider dental health implications, particularly with liquid iron or sugary gummies</li>
                  <li>Be aware of choking risks with chewables for younger children</li>
                  <li>Store all supplements safely out of children's reach</li>
                </ul>
              </div>

              {/* Safe Food Protection Tip */}
              {/* Safe Food Protection & Hacks */}
              <div className="space-y-4 mt-6">
                <div className="bg-rose-50 border-l-4 border-rose-400 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-rose-900 mb-2 flex items-center gap-2">
                    <span>🛡️</span> Protecting Safe Foods
                  </h3>
                  <p className="text-sm text-rose-800 leading-relaxed">
                    If vitamin supplements are being added to food or drinks, <strong>splitting them into divided doses</strong> can help
                    reduce the chances of the taste of the supplement "spoiling" a safe food for your child. Some children can be
                    put off from a safe food or drink permanently after experiencing an unpleasant taste change.
                  </p>
                </div>

                <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <span>💡</span> Parent Hacks for Success
                  </h3>
                  <div className="text-sm text-emerald-800 space-y-3">
                    <div>
                      <strong>The "Micro-Dose" Method:</strong>
                      <p className="mt-1">
                        Start with a tiny "micro-speck" of the supplement and very slowly increase the amount over several days or weeks.
                        This allows your child to get used to any subtle sensory changes without triggering a flat-out rejection.
                      </p>
                    </div>
                    <div>
                      <strong>Flavour Masking:</strong>
                      <p className="mt-1">
                        Mixing supplements with foods that have naturally strong or sour profiles (like lemonade, orange juice, or
                        flavoured yogurt) helps mask any faint underlying vitamin taste better than mild foods like water or milk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Which Nutrients Are Often Considered */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <SectionReminder text="Individual testing and medical guidance required for all supplement decisions" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">📋</span>
              Which Nutrients Are Often Considered
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="leading-relaxed">
                The following is a neutral, high-level overview of nutrients that clinicians may consider for supplementation in children
                with ARFID. This is <strong>not dosing advice</strong> – all decisions about which supplements to use and at what dose
                must be made by your child's healthcare team.
              </p>

              {/* Multivitamins */}
              <div className="border-l-4 border-indigo-400 bg-indigo-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">Multivitamin and Mineral Supplements</h3>
                <p className="text-sm text-indigo-800 leading-relaxed mb-2">
                  Sometimes used when overall dietary variety is very limited. These contain small amounts of many different vitamins
                  and minerals.
                </p>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  <strong>Important:</strong> While multivitamins can provide a "safety net" for general nutrition, they may not correct
                  specific, severe deficiencies (e.g., significant iron-deficiency anaemia or very low vitamin D). Blood tests help
                  determine if additional targeted supplementation is needed.
                </p>
              </div>

              {/* Iron */}
              <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-2 flex items-center">
                  Iron
                  <Tooltip id="iron">
                    <p className="font-semibold mb-1">Blood tests required before starting iron.</p>
                    <p>Always consult your clinician before giving iron supplements to children.</p>
                  </Tooltip>
                </h3>
                <p className="text-sm text-red-800 leading-relaxed mb-2">
                  Often considered where there is iron-deficiency anaemia or very low iron intake (common in children who avoid meat,
                  fortified cereals, and green vegetables).
                </p>
                <p className="text-sm text-red-800 leading-relaxed font-semibold">
                  ⚠️ CRITICAL: Over-the-counter iron should NEVER be started without blood tests and medical advice. Iron overdose can
                  be dangerous, and unnecessary iron supplementation can cause side effects and mask other conditions.
                </p>
              </div>

              {/* Vitamin D and Calcium */}
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-yellow-900 mb-2 flex items-center">
                  Vitamin D and Calcium
                  <Tooltip id="vitamin-d">
                    <p className="font-semibold mb-1">Discuss appropriate dosing with your clinician.</p>
                    <p>Individual needs vary based on age, diet, and sun exposure.</p>
                  </Tooltip>
                </h3>
                <p className="text-sm text-yellow-800 leading-relaxed mb-2">
                  Important for bone health, muscle function, and immune system. Children with ARFID are at higher risk of low vitamin D
                  and calcium levels due to:
                </p>
                <ul className="text-sm text-yellow-800 list-disc list-inside ml-2 space-y-1">
                  <li>Restrictive diets (especially if dairy is avoided)</li>
                  <li>Limited outdoor exposure (less sunlight for vitamin D production)</li>
                  <li>Malabsorption conditions (e.g., coeliac disease, IBD)</li>
                </ul>
                <p className="text-sm text-yellow-800 leading-relaxed mt-2">
                  UK government guidance recommends vitamin D supplements for all children aged 1-4 years, and many clinicians recommend
                  them for older children with restricted diets.
                </p>
              </div>

              {/* B Vitamins */}
              <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                  B-Vitamins (B12, Thiamin, Folate, Riboflavin)
                  <Tooltip id="b-vitamins">
                    <p className="font-semibold mb-1">Blood tests help identify specific deficiencies.</p>
                    <p>Consult your healthcare team about appropriate B-vitamin supplementation.</p>
                  </Tooltip>
                </h3>
                <p className="text-sm text-green-800 leading-relaxed mb-2">
                  May be low in children who exclude most meat, fish, dairy, eggs, fortified cereals, or whole food groups. B-vitamins
                  are essential for:
                </p>
                <ul className="text-sm text-green-800 list-disc list-inside ml-2 space-y-1">
                  <li>Energy production and metabolism</li>
                  <li>Nervous system function</li>
                  <li>Red blood cell formation</li>
                  <li>Brain development and function</li>
                </ul>
                <p className="text-sm text-green-800 leading-relaxed mt-2">
                  Vitamin B12 deficiency in particular can cause serious neurological problems if left untreated, so blood tests are
                  important if there's concern.
                </p>
              </div>

              {/* Other Nutrients */}
              <div className="border-l-4 border-purple-400 bg-purple-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Other Nutrients (Zinc, Iodine, Essential Fatty Acids)</h3>
                <p className="text-sm text-purple-800 leading-relaxed">
                  These nutrients may also need review depending on the child's specific dietary pattern and symptoms. Testing and
                  supplementation should be guided by a clinician or registered dietitian who understands your child's full medical
                  history and current diet.
                </p>
              </div>

              <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
                <p className="text-sm text-red-900 font-semibold flex items-center gap-2">
                  <span className="text-xl">🛑</span>
                  No vitamin or mineral should be started at high doses "just in case"
                </p>
                <p className="text-sm text-red-800 mt-2">
                  Testing, diagnosis, and treatment plans should always be coordinated with your child's usual medical team.
                  High-dose single-nutrient supplements can be harmful and may interact with medications or mask underlying conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Monitoring and Follow-Up */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <SectionReminder text="Regular monitoring with your healthcare team ensures safe and effective supplementation" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Monitoring and Follow-Up
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="leading-relaxed">
                Regular monitoring is essential to ensure that supplements are working, that deficiencies are being corrected, and that
                your child is not receiving excessive amounts of any nutrient.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Growth and Development Monitoring</h3>
                <ul className="text-sm text-blue-800 list-disc list-inside space-y-2">
                  <li>Regular measurement of weight, height, and (for younger children) head circumference</li>
                  <li>Plotting on appropriate growth charts (WHO charts for under-fours, UK-WHO charts for older children)</li>
                  <li>Monitoring for crossing centile lines downwards, which may indicate inadequate nutrition</li>
                  <li>Assessment of pubertal development in older children and teenagers</li>
                  <li>General wellbeing, energy levels, and developmental progress</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-purple-900 mb-2">When Blood Tests Might Be Requested</h3>
                <p className="text-sm text-purple-800 mb-2">
                  Your child's clinician may request blood tests in several situations:
                </p>
                <ul className="text-sm text-purple-800 list-disc list-inside space-y-1">
                  <li>Before starting high-dose supplementation (baseline levels)</li>
                  <li>If there are symptoms of specific deficiencies (tiredness, weakness, poor concentration, etc.)</li>
                  <li>When dietary intake is severely restricted for a prolonged period</li>
                  <li>To check response to treatment after supplementation has been started</li>
                  <li>If there are concerns about malabsorption or underlying medical conditions</li>
                  <li>Periodically during long-term supplementation to ensure safety</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-green-900 mb-2">Time-Limited Supplementation</h3>
                <p className="text-sm text-green-800 leading-relaxed">
                  Most supplements are time-limited and re-checked rather than continued "forever", unless there is a chronic
                  malabsorption condition (such as coeliac disease or inflammatory bowel disease) or an underlying metabolic condition.
                  The goal is usually to correct any deficiency, support the child while they work on expanding their diet, and then
                  reassess whether ongoing supplementation is needed. Regular reviews with your child's dietitian or doctor will help
                  determine the right approach.
                </p>
              </div>
            </div>
          </div>

          {/* When to Contact Your Doctor Urgently */}
          <div className="bg-red-50 border-2 border-red-400 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-red-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🚨</span>
              When to Contact Your Doctor Urgently
            </h2>
            <div className="prose max-w-none text-red-900">
              <p className="font-semibold mb-4">
                Seek immediate medical advice if your child experiences any of the following:
              </p>
              <ul className="list-disc list-inside space-y-2 text-red-800">
                <li>Sudden severe weakness, fatigue, or inability to engage in normal activities</li>
                <li>Unexplained rapid weight loss or crossing multiple centile lines downwards</li>
                <li>Persistent or severe dizziness, fainting, or heart palpitations</li>
                <li>Confusion, memory problems, or significant behaviour changes</li>
                <li>Visual disturbances or night blindness</li>
                <li>Unusual bleeding or bruising</li>
                <li>Severe or persistent bone pain</li>
                <li>Signs of severe dehydration</li>
                <li>Any signs of allergic reaction to a supplement (rash, swelling, breathing difficulties)</li>
                <li>Accidental overdose or ingestion of excessive supplement amounts</li>
              </ul>
              <p className="mt-4 font-semibold">
                If you have any concerns about your child's health or nutrition, contact your GP, paediatrician, or registered dietitian
                for advice. Don't wait for symptoms to become severe.
              </p>
            </div>
          </div>

          {/* Summary and Resources */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">💙</span>
              Supporting Your Child's Nutritional Health
            </h2>
            <div className="space-y-4 text-blue-100">
              <p className="leading-relaxed">
                Managing nutrition in a child with ARFID can be challenging, but you're not alone. With the right support from your
                medical team, appropriate testing and monitoring, and careful use of supplements when needed, most children can maintain
                good nutritional health while working on expanding their diet.
              </p>
              <p className="leading-relaxed">
                Remember: this page provides general educational information only. Every child is unique, and supplementation decisions
                must be tailored to your child's specific needs, medical history, current diet, and blood test results.
              </p>
              <p className="leading-relaxed font-semibold">
                Always work closely with your child's paediatrician, GP, or registered dietitian to develop a safe and effective
                supplementation plan.
              </p>
            </div>
            <div className="mt-6 bg-blue-700 bg-opacity-50 rounded-lg p-4">
              <p className="text-sm text-blue-100">
                For more information about ARFID and support resources, visit our{' '}
                <a href="/arfid-info" className="underline font-semibold hover:text-white">ARFID Information page</a>.
              </p>
            </div>
          </div>

          {/* Footer Closer - Action Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-orange-400">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🔄</span>
              <h2 className="text-2xl font-bold text-gray-900">Ready to discuss with your clinician?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Share this page - Clickable with print function */}
              <button
                onClick={handlePrint}
                className="bg-blue-50 rounded-lg p-4 flex flex-col items-center text-center hover:bg-blue-100 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Share this page</h3>
                <p className="text-sm text-gray-600">Print this guide to discuss with your healthcare provider</p>
              </button>

              {/* Book appointment - Informational only */}
              <div className="bg-green-50 bg-opacity-60 rounded-lg p-4 flex flex-col items-center text-center opacity-75">
                <div className="w-12 h-12 bg-green-600 bg-opacity-60 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Book appointment</h3>
                <p className="text-sm text-gray-600">Contact your GP, paediatrician, or registered dietitian to discuss supplements</p>
              </div>

              {/* Track in app - Clickable link */}
              <Link href="/summary" legacyBehavior>
                <a className="bg-purple-50 rounded-lg p-4 flex flex-col items-center text-center hover:bg-purple-100 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Track symptoms & weight</h3>
                  <p className="text-sm text-gray-600">Use the app to monitor nutrition, growth, and energy levels meanwhile</p>
                </a>
              </Link>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="text-sm text-yellow-800 font-semibold text-center">
                This app supports tracking, not treatment decisions. Always consult your healthcare team before starting any supplements.
              </p>
            </div>
          </div>

        </div>

        {/* Supplements Parents Find Helpful */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <SectionReminder text="Mention of these products does not imply endorsement. Checking with your child's doctor or registered dietitian is recommended." />
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">🌟</span>
            Supplements Parents Find Helpful
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="leading-relaxed">
              Parents in the ARFID community often share what works for them. While every child is different, here are some
              categories of supplements that are frequently mentioned as being helpful.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🥦</span> Truly Tasteless Powders
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Highly concentrated powders designed to be invisible in food.
                </p>
                <div className="bg-white p-3 rounded border border-gray-100 text-sm">
                  <p className="font-semibold text-indigo-600 mb-1">Community Favourites:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>ENOF:</strong> Made from organic veggies. Tiny serving size (1/12th tsp) makes it exceptionally easy to hide. <span className="text-gray-500 text-xs">(Available in UK via online retailers like NineLife)</span></li>
                    <li><strong>EllaOla / nutrient blends:</strong> Often noted for being truly unflavoured and texture-free in soft foods. <span className="text-gray-500 text-xs">(International shipping to UK available)</span></li>
                    <li><strong>Nutrigen Vitamixin Sprinkles:</strong> Tasteless powder sachets designed to be mixed into semi-solid food. <span className="text-gray-500 text-xs">(Available in UK via Holland & Barrett and online pharmacies)</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🩸</span> Palatable Iron Options
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Iron is notoriously hard to hide, but some brands have solved the "metallic" taste.
                </p>
                <div className="bg-white p-3 rounded border border-gray-100 text-sm">
                  <p className="font-semibold text-indigo-600 mb-1">Community Favourites:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>Renzo's "Iron Strong":</strong> Melty tabs with orange flavour that dissolve quickly. <span className="text-gray-500 text-xs">(Available via UK online speciality stores)</span></li>
                    <li><strong>NovaFerrum:</strong> Liquid iron often accepted by kids who reject standard drops; comes in raspberry/grape. <span className="text-gray-500 text-xs">(Available via UK online retailers)</span></li>
                    <li><strong>Spatone:</strong> Natural liquid iron sachets (apple flavour or original). Can be mixed into juice. <span className="text-gray-500 text-xs">(Widely available in UK supermarkets and pharmacies)</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🔋</span> Liquid Multivitamins
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Easier to swallow than pills and can be mixed into drinks.
                </p>
                <div className="bg-white p-3 rounded border border-gray-100 text-sm">
                  <p className="font-semibold text-indigo-600 mb-1">Community Favourites:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>Mary Ruth's (Liquid Morning):</strong> Popular for taste, though check volume needed. <span className="text-gray-500 text-xs">(Widely available in UK via Healf, Planet Organic, etc.)</span></li>
                    <li><strong>Detailed labelling:</strong> Parents look for "sugar-free" or "dye-free" if those are triggers.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🍫</span> Texture-Friendly Options
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  For children who can't do liquids or powders.
                </p>
                <div className="bg-white p-3 rounded border border-gray-100 text-sm">
                  <p className="font-semibold text-indigo-600 mb-1">Community Favourites:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>Dispersible Tablets:</strong> Dissolve instantly (e.g., tiny Vitamin D tablets).</li>
                    <li><strong>Soft Chews:</strong> Sometimes preferred over gummy bears if texture is an issue.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-4 text-xs text-gray-500 italic">
              <strong>Disclaimer:</strong> The mention of these product categories does not imply endorsement by this app or its creators.
              Product formulations change, and what works for one child may not be suitable for another.
              <strong>Always check with your child's doctor or registered dietitian is recommended</strong> before trying new products.
            </div>
          </div>
        </div>

      </div>
    </AuthGuard>
  );
}


