/**
 * UK paediatric oral nutritional supplements (ONS), modular fortifiers and related FSMP products
 * commonly discussed in restricted diets / ARFID / faltering growth.
 * Sourced from manufacturer UK pages (Nutricia, Abbott, Vitaflo/Nestlé Health Science) and BNF borderline substances notes.
 * Information checked September 2026 — formulations change; always read the current label.
 * Foods for Special Medical Purposes — use under medical supervision. Not medical advice. No affiliates.
 */

export type OnsForm = 'liquid-sip' | 'smoothie' | 'pudding' | 'modular-liquid' | 'powder';

export type OnsProduct = {
  id: string;
  name: string;
  brand: string;
  form: OnsForm;
  formLabel: string;
  flavours: string;
  textureNotes: string;
  keyContents: string;
  completeNutrition: string;
  ageBand: string;
  allergensHint: string;
  notes?: string;
  infoUrl: string;
  infoLabel: string;
};

export const onsFormSections: { id: OnsForm | 'all'; label: string }[] = [
  { id: 'all', label: 'All forms' },
  { id: 'liquid-sip', label: 'Milkshake-style sip' },
  { id: 'smoothie', label: 'Smoothie / juice-style' },
  { id: 'pudding', label: 'Pudding / yoghurt-style' },
  { id: 'modular-liquid', label: 'Low-volume energy shot' },
  { id: 'powder', label: 'Powder fortifier' },
];

export const onsProducts: OnsProduct[] = [
  {
    id: 'fortini-multi-fibre',
    name: 'Fortini Multi Fibre',
    brand: 'Nutricia Fortini',
    form: 'liquid-sip',
    formLabel: 'Ready-to-drink milkshake-style sip feed (200 ml)',
    flavours: 'Vanilla, banana, chocolate, strawberry, unflavoured (per Nutricia UK)',
    textureNotes:
      'Sweet milkshake mouthfeel; best served chilled. Can be gently heated (not boiled) or frozen. Fibre-containing — thicker/more filling than fibre-free feeds for some children. Shake well.',
    keyContents:
      'About 1.5 kcal/ml (~306 kcal and 6.6 g protein per 200 ml bottle on published UK datasheet); carbohydrate, fat, protein, Multi Fibre, vitamins and minerals',
    completeNutrition:
      'FSMP nutritionally complete for children aged 1–6 years or 8–20 kg when used as directed; can also supplement the diet',
    ageBand: 'From 1 year of age (>8 kg). Not for infants under 1 year.',
    allergensHint: 'Cow’s milk protein; soy (e.g. soy polysaccharides / soy lecithin on vanilla flavour ingredient list). Check each flavour pack.',
    notes:
      'Food for Special Medical Purposes — medical supervision. High fibre intakes need caution (manufacturer notes caution above 4 bottles/day). Prescribing/ACBS pathways vary by area.',
    infoUrl: 'https://www.nutricia.co.uk/patients-carers/pim-products/fortini-multi-fibre.html',
    infoLabel: 'Nutricia — Fortini Multi Fibre',
  },
  {
    id: 'fortini-compact-mf',
    name: 'Fortini Compact Multi Fibre',
    brand: 'Nutricia Fortini',
    form: 'liquid-sip',
    formLabel: 'Compact ready-to-drink sip feed (125 ml)',
    flavours: 'Strawberry, neutral, chocolate-caramel (per Nutricia UK)',
    textureNotes:
      'Smaller bottle, more energy-dense (~2.4 kcal/ml) — less volume to finish. Still a sweet sip-feed texture. Useful when volume aversion is the main barrier; flavour/aftertaste still decide acceptance.',
    keyContents:
      'About 2.4 kcal/ml (~300 kcal and ~7.2 g protein per 125 ml on Nutricia range materials); fibre-containing complete paediatric sip feed',
    completeNutrition: 'Nutritionally complete for children from 1 year (>8 kg) per manufacturer range information',
    ageBand: 'From 1 year onwards (not under 1 year; not for galactosaemia)',
    allergensHint: 'Expect milk and typically soy-related ingredients in Fortini liquids — verify current flavour label.',
    notes: 'FSMP under medical supervision. Compact format is often trialled when 200 ml bottles are refused for volume reasons.',
    infoUrl: 'https://www.nutricia.co.uk/hcp/pim-products/fortini-compact-multi-fibre.html',
    infoLabel: 'Nutricia — Fortini Compact Multi Fibre',
  },
  {
    id: 'paediasure',
    name: 'PaediaSure',
    brand: 'Abbott',
    form: 'liquid-sip',
    formLabel: 'Ready-to-drink milkshake-style sip feed (200 ml)',
    flavours: 'Banana, chocolate, strawberry, vanilla',
    textureNotes:
      'Milkshake-style; best chilled. Can be frozen into cubes/lollipops per Abbott. Chocolate flavour has a tighter age/weight band than other flavours on UK materials.',
    keyContents:
      'About 1.0 kcal/ml (~201 kcal and 5.6 g protein per 200 ml); protein, carbohydrate, fat, vitamins and minerals',
    completeNutrition: 'FSMP for dietary management of disease-related malnutrition in the stated weight/age range (under medical supervision)',
    ageBand:
      'Children weighing 8–30 kg or aged about 1–10 years; chocolate flavour stated as 12–30 kg or 3–10 years on Abbott UK materials',
    allergensHint: 'Check pack — Abbott lists clinically lactose-free / gluten-free / vegetarian suitability with caveats (vitamin D from lanolin). Flavour-specific allergens still matter.',
    notes: 'FSMP. Starter/sample packs may be available via clinical teams — not OTC shopping advice.',
    infoUrl: 'https://www.proconnect.abbott/uk/en/home/paediatric/products/PaediaSure.html',
    infoLabel: 'Abbott — PaediaSure (UK)',
  },
  {
    id: 'paediasure-plus',
    name: 'PaediaSure Plus (sip-feed bottle)',
    brand: 'Abbott',
    form: 'liquid-sip',
    formLabel: 'Higher-energy milkshake-style sip feed (200 ml)',
    flavours: 'Banana, strawberry, unflavoured, vanilla',
    textureNotes:
      'Sweeter/richer milkshake than standard PaediaSure for many children (1.5 kcal/ml). Unflavoured may suit savoury recipes per Abbott. Volume still 200 ml unless Compact is used instead.',
    keyContents: 'About 1.5 kcal/ml (~302 kcal and 8.4 g protein per 200 ml sip feed); vitamins and minerals',
    completeNutrition: 'FSMP under medical supervision for children 8–30 kg at risk of disease-related malnutrition',
    ageBand: 'Children weighing 8–30 kg (see current datasheet)',
    allergensHint: 'Confirm flavour label; clinically lactose-free / gluten-free claims on Abbott materials with vegetarian caveat for vitamin D source.',
    notes: 'Also available as tube-feed formats — this page focuses on oral sip use.',
    infoUrl: 'https://www.proconnect.abbott/uk/en/home/paediatric/products/Paediasure-Plus.html',
    infoLabel: 'Abbott — PaediaSure Plus (UK)',
  },
  {
    id: 'paediasure-compact',
    name: 'PaediaSure Compact',
    brand: 'Abbott',
    form: 'liquid-sip',
    formLabel: 'Compact high-energy milkshake-style sip feed',
    flavours: 'Check current Abbott UK list / starter pack (flavour set marketed for Compact)',
    textureNotes:
      'Smaller bottle, ~2.4 kcal/ml density — aimed at children who cannot manage large drink volumes. Still milkshake sensory profile.',
    keyContents: 'About 2.4 kcal/ml ready-to-drink paediatric sip feed with vitamins and minerals (confirm pack)',
    completeNutrition: 'FSMP for children weighing 8–30 kg with/at risk of disease-related malnutrition (medical supervision)',
    ageBand: 'Children weighing 8–30 kg (confirm current labelling)',
    allergensHint: 'Read the specific Compact flavour label and datasheet before any trial.',
    notes:
      'Abbott promotes Compact starter packs so families can trial flavours under clinical guidance. Exact flavour SKUs change — verify before prescribing talk.',
    infoUrl: 'https://www.proconnect.abbott/uk/en/patient-carers/products-landing-page/paediatric-products-lp/children-s-oral-nutritional-supplements.html',
    infoLabel: 'Abbott — children’s sip feeds overview (includes Compact)',
  },
  {
    id: 'paediasure-plus-juce',
    name: 'PaediaSure Plus Juce',
    brand: 'Abbott',
    form: 'smoothie',
    formLabel: 'Juice-style ready-to-drink sip feed',
    flavours: 'Juice-style flavours — confirm current UK pack list on Abbott materials',
    textureNotes:
      'Juice/drink profile rather than milky shake — sometimes preferred when “milkshake” is refused. Still a sweet commercial drink texture; acidity/fruit notes can be aversive for some ARFID profiles.',
    keyContents: 'About 1.5 kcal/ml juice-style paediatric sip feed with vitamins and minerals',
    completeNutrition: 'FSMP for children weighing 8–30 kg with/at risk of disease-related malnutrition',
    ageBand: 'Children weighing 8–30 kg (confirm label)',
    allergensHint: 'Juice-style bases differ from milkshake lines — check excipients and allergens on the specific bottle.',
    notes: 'Useful talking point when milk-like textures are rejected; still not a soft-drink substitute without dietetic oversight.',
    infoUrl: 'https://www.proconnect.abbott/uk/en/patient-carers/products-landing-page/paediatric-products-lp/children-s-oral-nutritional-supplements.html',
    infoLabel: 'Abbott — children’s sip feeds overview (includes Plus Juce)',
  },
  {
    id: 'fortini-smoothie-mf',
    name: 'Fortini Smoothie Multi Fibre',
    brand: 'Nutricia Fortini',
    form: 'smoothie',
    formLabel: 'Fruit smoothie-style sip feed (200 ml)',
    flavours: 'Berry fruit; summer fruit',
    textureNotes:
      'Smoothie style with real fruit content stated on Nutricia materials (~15% real fruit). Different mouthfeel from milkshake Fortini — fruit acidity and pulp/fibre sensation matter for sensory acceptance.',
    keyContents:
      'About 1.5 kcal/ml (~300 kcal, ~6.8 g protein, fibre per bottle on range materials); Multi Fibre',
    completeNutrition: 'Nutritionally complete for children aged 1–12 years or 8–45 kg per manufacturer; FSMP',
    ageBand: 'From 1 year (>8 kg)',
    allergensHint: 'Check pack — fruit smoothie lines often include milk and other allergens; verify flavour-specific ingredients.',
    notes: 'FSMP under medical supervision.',
    infoUrl: 'https://www.nutricia.co.uk/hcp/pim-products/fortini-smoothie-multi-fibre.html',
    infoLabel: 'Nutricia — Fortini Smoothie Multi Fibre',
  },
  {
    id: 'fortini-creamy-fruit',
    name: 'Fortini Creamy Fruit',
    brand: 'Nutricia Fortini',
    form: 'pudding',
    formLabel: 'Ready-to-eat dessert / yoghurt-style pot (100 g)',
    flavours: 'Berry fruit; summer fruit',
    textureNotes:
      'Spoonable creamy dessert — similar consistency to yoghurt/custard per Nutricia. ~5% real fruit stated. Texture may suit children who drink poorly but accept spoon foods — or fail if yoghurt-like foods are already refused.',
    keyContents:
      'About 1.5 kcal/g (~150 kcal, ~3.5 g protein, fibre per 100 g pot on range materials); vitamins and minerals',
    completeNutrition: 'Can supplement diet; suitable as sole source for children 1–12 years or 8–45 kg per manufacturer precautions',
    ageBand: 'From 1 year (>8 kg)',
    allergensHint:
      'Contains cow’s milk (fermented milk / whey) and soy (e.g. soy polysaccharides / carotenoids “contains soy” on published ingredient text). Check current pot.',
    notes: 'FSMP. Often described as the paediatric yoghurt-style sip-feed option in UK dietetic practice.',
    infoUrl: 'https://www.nutricia.co.uk/patients-carers/pim-products/fortini-creamy-fruit.html',
    infoLabel: 'Nutricia — Fortini Creamy Fruit',
  },
  {
    id: 'calogen-extra',
    name: 'Calogen Extra',
    brand: 'Nutricia Calogen',
    form: 'modular-liquid',
    formLabel: 'High-energy fat emulsion drink / fortifier (shots from bottle)',
    flavours: 'Neutral; strawberry',
    textureNotes:
      'Oily fat emulsion — distinctive mouthfeel. Ready to drink chilled; can dilute with milk/water or mix into foods. Not freezable per Nutricia. Strong sensory signature even in “neutral”.',
    keyContents:
      'About 4 kcal/ml (~480 kcal and 6 g protein per 120 ml on datasheet); mostly fat energy plus some protein, carbohydrate, vitamins and minerals — not a balanced complete feed',
    completeNutrition: 'Not suitable as sole source of nutrition — supplement/fortifier only',
    ageBand: 'Not suitable under 3 years; use with caution 3–6 years; may need dilution under 5 years — strict medical supervision',
    allergensHint: 'Cow’s milk proteins (caseinates, whey hydrolysate). Check flavour.',
    notes:
      'Also marketed as Calogen Extra Shots (pre-portioned cups). FSMP. Adult-oriented branding but used in paediatric fortification under dietitian direction — age limits matter.',
    infoUrl: 'https://www.nutricia.co.uk/patients-carers/pim-products/calogen-extra.html',
    infoLabel: 'Nutricia — Calogen Extra',
  },
  {
    id: 'pro-cal-shot',
    name: 'Pro-Cal shot',
    brand: 'Vitaflo (Nestlé Health Science)',
    form: 'modular-liquid',
    formLabel: 'Low-volume energy-dense liquid (120 ml bottle; typically 30 ml shots)',
    flavours: 'Neutral; strawberry; banana',
    textureNotes:
      'Thick, energy-dense “shot” — can be taken neat or stirred into food/drinks; can be frozen per manufacturer. Low volume helps when appetite/volume is tiny; viscosity and sweetness still decide ARFID acceptance. Consistency may sit around IDDSI Level 3 when chilled — SLT check if swallowing is an issue.',
    keyContents:
      'About 3.3 kcal/ml (100 kcal and 2 g protein per 30 ml; 400 kcal and 8 g protein per 120 ml); milk protein, fat and carbohydrate — no added micronutrient package intended to replace a multi',
    completeNutrition: 'Not suitable as sole source of nutrition',
    ageBand: 'Suitable from 3 years of age onwards (manufacturer)',
    allergensHint: 'Contains milk (milk protein, lactose) and soya (soya lecithin). Gluten free per datasheet.',
    notes: 'FSMP under medical supervision. Often used alongside (not instead of) dietetic food fortification plans.',
    infoUrl: 'https://www.nestlehealthscience.co.uk/vitaflo/conditions/nutrition-support/disease-related-malnutrition/pro-cal-shot-hcp',
    infoLabel: 'Vitaflo — Pro-Cal shot',
  },
  {
    id: 'duocal-super-soluble',
    name: 'Super Soluble Duocal',
    brand: 'Nutricia',
    form: 'powder',
    formLabel: 'Neutral energy powder (carbohydrate + fat fortifier)',
    flavours: 'Neutral / unflavoured (designed not to add strong taste)',
    textureNotes:
      'White powder mixed into feeds, drinks or moist foods. Marketed as neutral-tasting — in practice some children still detect greasiness, sweetness or mouth-coating when dose rises. Changing a “safe” food’s mouthfeel can trigger refusal.',
    keyContents:
      'Modular energy only: about 492 kcal/100 g powder; carbohydrate ~72.7 g and fat ~22.3 g per 100 g (BNF/Nutricia figures) — no protein, vitamins or minerals package',
    completeNutrition: 'Not a sole source of nutrition; fortifier only',
    ageBand:
      'Used under medical supervision for fortification (including infant formula contexts on UK materials) — dose and dilution only by clinician/dietitian',
    allergensHint: 'Ingredient list centres on dried glucose syrup and vegetable oils/MCT with emulsifier E472(c); confirm current tin for allergen statements.',
    notes:
      'ACBS-prescribable borderline substance in UK practice for indicated fortification. Easy to over- or under-dose without dietetic instruction, which is why the dose comes from the dietitian rather than the tin.',
    infoUrl: 'https://www.nutricia.co.uk/hcp/pim-products/super-soluble-duocal.html',
    infoLabel: 'Nutricia — Super Soluble Duocal',
  },
];
