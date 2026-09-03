/**
 * UK children’s vitamin / mineral products for restricted diets / ARFID.
 * Sourced from manufacturer pages, NHS Healthy Start, and published PILs/SmPCs.
 * Information checked September 2026 — formulations change; always read the current label.
 * Not medical advice. No affiliate links.
 */

export type SupplementForm =
  | 'liquid'
  | 'gummy'
  | 'sprinkle'
  | 'chewable'
  | 'spray'
  | 'other';

export type Supplement = {
  id: string;
  name: string;
  brand: string;
  form: SupplementForm;
  formLabel: string;
  flavours: string;
  textureNotes: string;
  keyContents: string;
  ageBand: string;
  containsIron: boolean;
  notes?: string;
  infoUrl: string;
  infoLabel: string;
};

export const INFO_CHECKED = 'September 2026';

export const formSections: { id: SupplementForm | 'all'; label: string }[] = [
  { id: 'all', label: 'All forms' },
  { id: 'liquid', label: 'Liquid / drops' },
  { id: 'spray', label: 'Spray' },
  { id: 'gummy', label: 'Gummy / softie' },
  { id: 'chewable', label: 'Chewable' },
  { id: 'sprinkle', label: 'Powder / sprinkle' },
  { id: 'other', label: 'Other (e.g. soluble)' },
];

export const supplements: Supplement[] = [
  {
    id: 'healthy-start-drops',
    name: 'Healthy Start children’s vitamin drops',
    brand: 'NHS Healthy Start',
    form: 'liquid',
    formLabel: 'Liquid drops',
    flavours: 'Banana flavour (PIL lists banana flavour among ingredients)',
    textureNotes:
      'Thin drops; glycerol base. Not oily like peanut-oil products. Sweetish banana note — helps some sensory-sensitive children and puts others off.',
    keyContents: 'Vitamins A, C and D (government-aligned Healthy Start children’s formula)',
    ageBand: 'From birth to 4th birthday (scheme eligibility rules apply; not needed if ≥500 ml infant formula/day)',
    containsIron: false,
    notes:
      'Free for eligible families on the NHS Healthy Start scheme in England/Wales/NI. Ask midwife/health visitor or local collection point. Suitable for vegetarians and halal diets per NHS Healthy Start information; free from milk, egg, gluten, soya and peanut residues according to the scheme site. Exact microgram strengths can vary by leaflet revision — check the current bottle.',
    infoUrl: 'https://www.healthystart.nhs.uk/getting-vitamins/',
    infoLabel: 'NHS Healthy Start — getting vitamins',
  },
  {
    id: 'abidec-drops',
    name: 'Abidec Multivitamin Drops',
    brand: 'Abidec (Omega Pharma)',
    form: 'liquid',
    formLabel: 'Liquid drops',
    flavours: 'Natural flavour/aroma of the vitamins (not a fruit flavour)',
    textureNotes:
      'Yellow/brown liquid; characteristic vitamin smell/taste. Contains refined peanut (arachis) oil — oily mouthfeel possible. Also contains sucrose.',
    keyContents:
      'Vitamins A, D2, B1, B2, B6, nicotinamide (B3), C (licensed multivitamin drops)',
    ageBand: 'Babies and children from birth to 12 years (per PIL)',
    containsIron: false,
    notes:
      'Not the same as Dalivit Oral Drops: Abidec contains refined peanut (arachis) oil — do not use if allergic to peanut/soya; Dalivit does not use peanut oil and has higher vitamin A per dose, so they are not interchangeable millilitre-for-millilitre. UK supply of Abidec drops has been intermittent (pharmacy supply notifications); pharmacists may suggest alternatives. Always check the current pack.',
    infoUrl: 'https://www.drugs.com/uk/abidec-multivitamin-drops-leaflet.html',
    infoLabel: 'Abidec Multivitamin Drops — patient leaflet',
  },
  {
    id: 'dalivit-drops',
    name: 'Dalivit Oral Drops',
    brand: 'Dalivit',
    form: 'liquid',
    formLabel: 'Liquid drops',
    flavours: 'No named fruit flavour on SmPC; yellowish-orange liquid',
    textureNotes:
      'Slightly viscous yellowish-orange liquid. Contains sucrose.',
    keyContents:
      'Vitamins A (higher IU than Abidec per 0.6 ml), D2, B1, B2, B6, C, nicotinamide',
    ageBand: 'Licensed from 6 weeks of age (infants/children; older ages as directed)',
    containsIron: false,
    notes:
      'Not the same as Abidec Multivitamin Drops: Dalivit has no peanut oil, but higher vitamin A per dose — not interchangeable ml-for-ml; discuss with GP/pharmacist/dietitian. Supply has also been intermittent at times. Contains sodium methyl hydroxybenzoate (E219).',
    infoUrl: 'https://imedi.co.uk/dalivit-drops',
    infoLabel: 'Dalivit Drops — leaflet summary',
  },
  {
    id: 'wellbaby-liquid',
    name: 'Wellbaby Multi-vitamin Liquid',
    brand: 'Vitabiotics Wellbaby',
    form: 'liquid',
    formLabel: 'Liquid syrup (mix into milk/water)',
    flavours: 'Natural orange (Swiss Alpine malt; orange oil on some labels)',
    textureNotes:
      'Sweet syrupy liquid with malt; orange note. Can stain and may leave residue. Manufacturer directs mixing into usual milk or water for younger infants — not from the teaspoon directly in the youngest age band.',
    keyContents:
      '14 vitamins/minerals including A, C, D3 (10 µg per 5 ml), B vitamins, iron, zinc, copper — plus malt extract',
    ageBand: '6 months to 4 years',
    containsIron: true,
    notes:
      'Not the same as Wellbaby Multi-vitamin Drops (4–24 months, syringe) or Wellbaby Vitamin D Drops (vitamin D only in olive oil from birth). Contains iron (excess harmful to young children — keep out of reach). Contains gluten from barley malt. Colour may darken after opening (iron). Vegetarian; not vegan (vitamin D from lanolin). Food supplement, not a medicine.',
    infoUrl: 'https://www.vitabiotics.com/products/wellbaby-multi-vitamin-liquid',
    infoLabel: 'Vitabiotics — Wellbaby Multi-vitamin Liquid',
  },
  {
    id: 'wellbaby-drops',
    name: 'Wellbaby Multi-vitamin Drops',
    brand: 'Vitabiotics Wellbaby',
    form: 'liquid',
    formLabel: 'Liquid drops (syringe)',
    flavours: 'Malt (Swiss Alpine malt); some pack copy also mentions orange',
    textureNotes:
      'Measured with included syringe. Sweet malt taste. Smaller volume than the 5 ml liquid — may suit children who refuse spoonfuls of syrup.',
    keyContents:
      'Vitamins A, C, D plus B vitamins, iron, zinc and L-lysine (14+ nutrients; check current label for exact list)',
    ageBand: '4 to 24 months (manufacturer age banding)',
    containsIron: true,
    notes:
      'Not the same as Wellbaby Multi-vitamin Liquid (syrup, 6 months–4 years) or Wellbaby Vitamin D Drops (D-only olive oil drops from birth — no iron, no malt). Contains iron — overdose risk in the household. Contains barley malt (gluten). Food supplement. Confirm age directions on the box before use.',
    infoUrl: 'https://www.vitabiotics.com/products/wellbaby-multi-vitamin-drops',
    infoLabel: 'Vitabiotics — Wellbaby Multi-vitamin Drops',
  },
  {
    id: 'wellbaby-vitamin-d-drops',
    name: 'Wellbaby Vitamin D Drops',
    brand: 'Vitabiotics Wellbaby',
    form: 'liquid',
    formLabel: 'Oil-based vitamin D drops (dropper)',
    flavours: 'No fruit flavour — natural olive oil base only',
    textureNotes:
      'Oil drops in olive oil — oily mouthfeel, no malt syrup. Measured with included dropper (0.5 ml). For 0–6 months manufacturer directs drop-by-drop onto nipple/teat; from 6 months into usual milk or water.',
    keyContents: 'Vitamin D3 only — 10 µg (400 IU) per 0.5 ml daily dose',
    ageBand: 'From birth to 4 years',
    containsIron: false,
    notes:
      'Not the same as Wellbaby Multi-vitamin Drops or Wellbaby Multi-vitamin Liquid — this is vitamin D only (no A, C, iron or malt). Ingredients: olive oil and vitamin D3. Vegetarian; gluten-free; no artificial flavours/colours/sweeteners. Made in a site that may handle nuts/peanuts — manufacturer states not suitable for nut/peanut allergy. Food supplement. Do not stack with other vitamin D products without advice.',
    infoUrl: 'https://www.vitabiotics.com/products/wellbaby-vitamin-d-drops',
    infoLabel: 'Vitabiotics — Wellbaby Vitamin D Drops',
  },
  {
    id: 'prod3-drops',
    name: 'Pro D3 Liquid Drops',
    brand: 'Pro D3 (Synergy Biologics)',
    form: 'liquid',
    formLabel: 'Oil-based vitamin D drops',
    flavours: 'Orange',
    textureNotes:
      'Oil drops (sunflower seed oil / MCT base) — oily mouthfeel. Can be mixed into food or drink, or taken directly. Citrus orange flavour.',
    keyContents:
      'Vitamin D3 (cholecalciferol) only — typically 100 IU (2.5 µg) per drop on the liquid-drops pack; other Pro D3 liquids list different IU strengths (e.g. 2000 IU/ml, Forte) — check the label on the bottle you hold',
    ageBand: 'Manufacturer materials: infants/children (commonly stated from 6 months for the 100 IU drops) — follow labelled age and clinician advice',
    containsIron: false,
    notes:
      'Vitamin D only — not a multivitamin. Multiple Pro D3 formats and IU strengths exist (100 IU/drop drops; separate higher-strength liquids such as 2000 IU/ml and Forte) — always match the pack strength to clinical advice; do not assume bottles are interchangeable. Free from peanut and soya per pharmacy product information. Do not stack multiple vitamin D products without advice.',
    infoUrl: 'https://www.prod3.co.uk/products/pro-d3-liquid-drops-20ml-vitamin-d3',
    infoLabel: 'Pro D3 — Liquid Drops (100 IU/drop)',
  },
  {
    id: 'betteryou-kids-spray',
    name: "Multivitamin Kids' Oral Spray",
    brand: 'BetterYou',
    form: 'spray',
    formLabel: 'Oral spray (into cheek)',
    flavours: 'Chocolate and marshmallow',
    textureNotes:
      'Fine spray onto the inside of the cheek — no tablet, no gummy chew. Sugar-free (xylitol). Flavour is sweet/chocolate-marshmallow rather than fruity; some ARFID children prefer this, others refuse novelty flavours.',
    keyContents:
      '14 nutrients including vitamins A, C, D3 (10 µg), K1, B-complex, iodine, selenium — no iron',
    ageBand: '1 year and above',
    containsIron: false,
    notes:
      'Not a Haliborange Softie — BetterYou oral spray is a different product and brand (cheek spray, not a gelatine gummy). Contains vitamin K — unsuitable with some anticoagulants; seek medical advice if relevant. Vegetarian. Food supplement.',
    infoUrl: 'https://betteryou.com/collections/roald-dahl-kids-range/products/multivitamin-kids-daily-oral-spray',
    infoLabel: 'BetterYou — Multivitamin Kids Oral Spray',
  },
  {
    id: 'haliborange-softies',
    name: 'Multivitamin Softies',
    brand: 'Haliborange',
    form: 'gummy',
    formLabel: 'Gummy softies',
    flavours: 'Orange; strawberry (separate packs)',
    textureNotes:
      'Chewy gelatine softie — sweet, fruity, sticky. Bovine gelatine (not vegetarian). Sugar + glucose syrup. Texture is often a deal-breaker or a win for sensory-driven ARFID; do not assume “kids like gummies”.',
    keyContents: 'Vitamins A, C, D, E, niacin, B6, B12 (7 vitamins; no iron/zinc in this Softies line)',
    ageBand: '3–12 years',
    containsIron: false,
    notes:
      'Not the same as Haliborange Iron Softies (iron + vitamin C only; pectin gelling — check label) or Haliborange Multivitamins Calcium & Iron chewable tablets (chalky chewable, not a softie). Food supplement. Soft vitamin D per softie is lower than many liquid multis — check the label if vitamin D dose is under discussion with a clinician. Bovine gelatine.',
    infoUrl: 'https://www.haliborange.com/product/multivitamin-softies-orange-x30/',
    infoLabel: 'Haliborange — Multivitamin Softies',
  },
  {
    id: 'haliborange-iron-softies',
    name: 'Iron Softies (Iron & Vitamin C Softies)',
    brand: 'Haliborange',
    form: 'gummy',
    formLabel: 'Gummy softies',
    flavours: 'Strawberry',
    textureNotes:
      'Chewy softie — strawberry flavour, sweet/sticky. Standard kids’ pack uses pectin as gelling agent (not bovine gelatine on the current manufacturer ingredients list — confirm on the pack you buy; themed variants can differ).',
    keyContents: 'Iron 2.5 mg and vitamin C 12 mg per softie (not a full multivitamin)',
    ageBand: '3–12 years (children over 3 years)',
    containsIron: true,
    notes:
      'Not the same as Haliborange Multivitamin Softies or Multivitamins Calcium & Iron chewable tablets. Iron-focused softie only — does not replace a multi if other vitamins are the gap under discussion. Contains iron — keep out of reach of younger children; overdose risk. Current manufacturer page ingredients list pectin (no gelatine listed) plus sugar/glucose syrup; themed Frozen Softies packs can use bovine gelatine and a different nutrient list — always read the pack. Food supplement.',
    infoUrl: 'https://www.haliborange.com/product/iron-vitamin-c/',
    infoLabel: 'Haliborange — Iron & Vitamin C Softies',
  },
  {
    id: 'haliborange-calcium-vitamin-d-softies',
    name: 'Calcium & Vitamin D Softies',
    brand: 'Haliborange',
    form: 'gummy',
    formLabel: 'Gummy softies',
    flavours: 'Strawberry (brand category listing)',
    textureNotes:
      'Chewy softie — fruity/strawberry. Bovine gelatine (not vegetarian). Sugar + glucose syrup.',
    keyContents: 'Calcium 140 mg and vitamin D 5 µg per softie (bones/teeth focus — not a full multi)',
    ageBand: '3–12 years (children over 3 years; 1–2 softies daily per label)',
    containsIron: false,
    notes:
      'Not the same as Haliborange Multivitamin Softies, Iron Softies, or Multivitamins Calcium & Iron chewable tablets. Calcium + vitamin D only — no iron on this Softies line. Bovine gelatine — not vegetarian. Food supplement. Confirm flavour and allergen lines on the pack (themed packs exist).',
    infoUrl: 'https://www.haliborange.com/product/calcium-vitamin-d-x30/',
    infoLabel: 'Haliborange — Calcium & Vitamin D Softies',
  },
  {
    id: 'wellkid-liquid',
    name: 'Wellkid Multi-vitamin Liquid',
    brand: 'Vitabiotics Wellkid',
    form: 'liquid',
    formLabel: 'Liquid syrup',
    flavours: 'Natural orange (orange oil extract)',
    textureNotes:
      'Sweet syrupy liquid with malt and orange note — spoon dose, not a chewable or Soft Jelly pastille. Can stain; may leave sticky residue. Distinct mouthfeel from Smart Chewable / Immune Chewable tablets.',
    keyContents:
      '15 nutrients per 5 ml including vitamins A, C, D3 10 µg, B vitamins, E; iron 5 mg; zinc; copper; iodine — plus malt extract 500 mg',
    ageBand: '4–12 years (not under 4; 4–10 years 5 ml; 11–12 years 10 ml per label)',
    containsIron: true,
    notes:
      'Not the same as Wellkid Soft Jelly Pastilles, Smart Chewable, or Immune Chewable — liquid syrup with malt, different nutrient mix and iron level. Contains iron — keep out of reach of younger children; overdose risk. Contains gluten from barley malt; sugar and glucose liquid. Vegetarian. Made in a site that may handle nuts. Food supplement.',
    infoUrl: 'https://www.vitabiotics.com/products/wellkid-multi-vitamin-liquid',
    infoLabel: 'Vitabiotics — Wellkid Multi-vitamin Liquid',
  },
  {
    id: 'wellkid-smart-chewable',
    name: 'Wellkid Multi-vitamin Smart Chewable',
    brand: 'Vitabiotics Wellkid',
    form: 'chewable',
    formLabel: 'Chewable tablet',
    flavours: 'Mixed fruit (lemon, raspberry, strawberry, apple flavourings)',
    textureNotes:
      'Chewable tablet (not designed to be swallowed whole). Low sugar; xylitol sweetener — excess may loosen stools. Firmer chew than Soft Jelly pastilles. Citrus/fruit acidity.',
    keyContents:
      '21 nutrients per tablet including vitamins A, C, D3 10 µg, B-complex, E; magnesium; iron 7 mg; zinc; copper; manganese; selenium; chromium; iodine; flaxseed oil powder 114 mg',
    ageBand: '4–12 years (not under 4)',
    containsIron: true,
    notes:
      'Not the same as Wellkid Soft Jelly Pastilles (no iron; bovine gelatine), Wellkid Immune Chewable (orange & lemon; 24 nutrients including bioflavonoids/grapeseed; D3 12.5 µg), or Wellkid Multi-vitamin Liquid (syrup with malt). Food supplement. Contains iron — keep out of reach of younger children; overdose risk. Vegetarian. Vitamin E from soya (allergen on ingredients list — check current label). Made in a site that may handle nuts/peanuts.',
    infoUrl: 'https://www.vitabiotics.com/products/wellkid-smart-chewable',
    infoLabel: 'Vitabiotics — Wellkid Smart Chewable',
  },
  {
    id: 'wellkid-immune-chewable',
    name: 'Wellkid Immune Chewable',
    brand: 'Vitabiotics Wellkid',
    form: 'chewable',
    formLabel: 'Chewable tablet',
    flavours: 'Orange and lemon',
    textureNotes:
      'Chewable tablet (not designed to be swallowed whole). Low sugar; xylitol and sucralose — excess xylitol may loosen stools. Firmer than Soft Jelly; citrus orange/lemon rather than mixed-fruit Smart Chewable flavour.',
    keyContents:
      '24 nutrients per tablet including vitamins A, C, D3 12.5 µg, B-complex, E; iron 7 mg; zinc; magnesium; minerals; plus flaxseed oil powder, citrus bioflavonoids, betacarotene and grapeseed extract',
    ageBand: '4–12 years (not under 4)',
    containsIron: true,
    notes:
      'Not the same as Wellkid Smart Chewable (mixed fruit; 21 nutrients; D3 10 µg), Soft Jelly Pastilles (no iron; gelatine), or Wellkid Liquid (syrup). Food supplement. Contains iron — keep out of reach of younger children; overdose risk. Vegetarian. Vitamin E from soya (allergen on ingredients list). Made in a site that may handle nuts. Manufacturer: no need to take an additional multi-vitamin with this product.',
    infoUrl: 'https://www.vitabiotics.com/products/wellkid-immune-chewable',
    infoLabel: 'Vitabiotics — Wellkid Immune Chewable',
  },
  {
    id: 'wellkid-soft-jelly',
    name: 'Wellkid Soft Jelly Pastilles',
    brand: 'Vitabiotics Wellkid',
    form: 'chewable',
    formLabel: 'Chewable soft jelly pastilles',
    flavours: 'Strawberry or orange',
    textureNotes:
      'Soft chewable jelly (not hard tablet). Sugar-free sweeteners (maltitol/sorbitol) — excess may loosen stools. Bovine gelatine (not vegetarian). Citrus acidity in orange variant.',
    keyContents:
      '11 vitamins (B-complex, C, D3 10 µg per 2 pastilles, E) plus flaxseed oil — no iron, calcium or zinc in this pastille',
    ageBand: '4–12 years (not under 4)',
    containsIron: false,
    notes:
      'Not the same as Wellkid Smart Chewable or Immune Chewable (those tablets contain iron and minerals; Soft Jelly does not) or Wellkid Multi-vitamin Liquid (syrup with iron and malt). Food supplement. Designed to be chewed, not swallowed whole. Bovine gelatine — not vegetarian.',
    infoUrl: 'https://www.vitabiotics.com/products/wellkid-soft-jelly-pastilles',
    infoLabel: 'Vitabiotics — Wellkid Soft Jelly Pastilles',
  },
  {
    id: 'haliborange-calcium-iron',
    name: 'Multivitamins Calcium & Iron',
    brand: 'Haliborange',
    form: 'chewable',
    formLabel: 'Chewable tablet',
    flavours: 'Orange',
    textureNotes:
      'Chewable/crunchy tablet — chalky mineral mouthfeel possible (calcium + iron). Sweet orange. May contain lactose in flavourings (check current label — milk allergen on some packs).',
    keyContents: 'Vitamins A, C, D, B1, B2, B6, niacin, plus calcium and iron',
    ageBand: '3 years and over',
    containsIron: true,
    notes:
      'Not the same as Haliborange Multivitamin Softies or Iron Softies (those are gummies) or Calcium & Vitamin D Softies (calcium + D only, no iron). Contains iron — keep out of reach of younger children; overdose risk. Iron can taste metallic and contribute to constipation in some children. Vegetarian per brand FAQ for this product. Food supplement.',
    infoUrl: 'https://www.haliborange.com/product/multivitamins-calcium-iron-x30/',
    infoLabel: 'Haliborange — Multivitamins Calcium & Iron',
  },
  {
    id: 'biocare-kids-powder',
    name: "Children's Complete Multinutrient",
    brand: 'BioCare',
    form: 'sprinkle',
    formLabel: 'Powder (mix or sprinkle)',
    flavours: 'Banana and vanilla',
    textureNotes:
      'Powder mixed into cool drinks or sprinkled on food. Banana/vanilla flavour; xylitol sweetener (excess may loosen stools). Graininess or flavour change in accepted foods can trigger refusal — some families trial in a tolerated drink first under dietitian guidance.',
    keyContents:
      'Broad multi including vitamins A, C, D3 (10 µg per 2.5 g), K2, B vitamins, calcium, magnesium, iron, zinc and other minerals (see manufacturer table)',
    ageBand: 'From 6 months (dose scoop varies by age band on label)',
    containsIron: true,
    notes:
      'Contains iron. Suitable for vegetarians and vegans per manufacturer. Practitioner-facing brand often used when mixing into food is preferred to tablets. Food supplement — not a substitute for dietetic assessment.',
    infoUrl: 'https://www.biocare.co.uk/children-s-complete-multinutrient',
    infoLabel: 'BioCare — Children’s Complete Multinutrient',
  },
  {
    id: 'forceval-soluble-junior',
    name: 'Forceval Soluble Junior',
    brand: 'Forceval (Alliance Pharmaceuticals)',
    form: 'other',
    formLabel: 'Effervescent tablet (dissolve in water)',
    flavours: 'Forest fruits',
    textureNotes:
      'Dissolved drink — cloudy solution is normal (fat- and water-soluble vitamins). Fruit flavour; fizz and “medicine drink” smell can be a hard no for some ARFID children. Not a capsule to open.',
    keyContents:
      '23 vitamins and minerals including A, D3, B-complex, C, E, K1, folic acid, iron, zinc, magnesium, iodine and trace elements',
    ageBand: '6 years and above',
    containsIron: true,
    notes:
      'Not the same as adult Forceval (soluble or capsules) — Soluble Junior is the manufacturer’s current junior food-supplement format for children 6+; adult Forceval strengths and formats differ and are not interchangeable. Contains iron. Vegetarian (vitamin D from lanolin — not vegan). Older Forceval Junior hard capsules are no longer the current junior offering. Sometimes listed on NHS formularies for children who cannot swallow tablets; still discuss with the clinical team.',
    infoUrl: 'https://forceval.co.uk/soluble-junior/',
    infoLabel: 'Forceval — Soluble Junior',
  },
];
