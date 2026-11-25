import type { Category, CollectionId } from "@/lib/collection";

export interface HeroSlide {
  id: string;
  craftLabel: string;
  region: string;
  caption: string;
  image: string;
  alt: string;
  collectionId: CollectionId;
}

export interface ShopCategoryCard {
  category: Category;
  title: string;
  subtitle: string;
  image: string;
}

export interface BespokeService {
  id: string;
  number: string;
  title: string;
  leadTime: string;
  description: string;
  highlights: string[];
}

export interface JournalArticle {
  id: string;
  tag: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string[];
}

export interface EmergingDesigner {
  id: string;
  name: string;
  city: string;
  specialty: string;
  image: string;
  bio: string;
  collectionId: CollectionId;
}

export interface IntelligenceInsight {
  id: string;
  metric: string;
  label: string;
  title: string;
  summary: string;
  category: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "adire",
    craftLabel: "Adire Eleko",
    region: "Abeokuta & Lagos",
    caption: "01 / 06 · ADIRE ELEKO — HAND-DYED INDIGO & STARCH-RESIST COUTURE",
    image: "/hero/hero-adire.jpg",
    alt: "Nigerian models wearing contemporary indigo Adire Eleko silk-linen gown and tailored suit in a sunlit Lagos courtyard",
    collectionId: "imole",
  },
  {
    id: "asooke",
    craftLabel: "Aso-Oke",
    region: "Iseyin & Victoria Island",
    caption: "02 / 06 · HAND-LOOMED ASO-OKE — ARCHITECTURAL METALLIC STRIP WEAVING",
    image: "/hero/hero-asooke.jpg",
    alt: "Nigerian models in sculpted burnished bronze, teal and ivory hand-loomed Aso-Oke eveningwear in a minimalist gallery",
    collectionId: "irin-bronze",
  },
  {
    id: "ankara",
    craftLabel: "Ankara",
    region: "Lagos Atelier",
    caption: "03 / 06 · CONTEMPORARY ANKARA — SCULPTURAL WAX-PRINT TAILORING",
    image: "/hero/hero-ankara.jpg",
    alt: "Nigerian models wearing refined deep-teal, ochre and navy contemporary Ankara architectural tailoring",
    collectionId: "irin-bronze",
  },
  {
    id: "akwete",
    craftLabel: "Akwete",
    region: "Abia & Eastern Looms",
    caption: "04 / 06 · AKWETE HERITAGE — CEREMONIAL HAND-WOVEN SILK-LINEN",
    image: "/collections/imole-draped-column.jpg",
    alt: "Nigerian model in sculptural ivory hand-loomed Akwete silk-linen column gown with bronze pin",
    collectionId: "imole",
  },
  {
    id: "agbada",
    craftLabel: "Elu Indigo Agbada",
    region: "Osogbo & Ibadan",
    caption: "05 / 06 · ELU INDIGO AGBADA — FERMENTED VAT TAILORING",
    image: "/collections/odo-indigo-agbada.jpg",
    alt: "Nigerian model wearing a deconstructed knee-length Osogbo Elu indigo Agbada coat",
    collectionId: "odo-indigo",
  },
  {
    id: "tubali",
    craftLabel: "Tubali Kaftan",
    region: "Kano & Zaria",
    caption: "06 / 06 · TUBALI KAFTAN — NORTHERN ARCHITECTURAL TRAPUNTO",
    image: "/collections/zaria-monolith-kaftan.jpg",
    alt: "Nigerian model wearing a slate-indigo architectural kaftan with geometric Tubali trapunto stitching",
    collectionId: "zaria-monolith",
  },
];

export const shopCategories: ShopCategoryCard[] = [
  {
    category: "Women",
    title: "Women",
    subtitle: "Sculptural Adire, Ankara & draped linen",
    image: "/collections/imole-sculpted-blouse.jpg",
  },
  {
    category: "Men",
    title: "Men",
    subtitle: "Collarless Lagos co-ords & Tubali kaftans",
    image: "/collections/odo-eko-coord.jpg",
  },
  {
    category: "Children",
    title: "Children",
    subtitle: "Heirloom junior Adire & breathable linen",
    image: "/hero/hero-adire.jpg",
  },
  {
    category: "Accessories",
    title: "Accessories",
    subtitle: "Aso-Oke clutches, Benin bronze & silk",
    image: "/hero/hero-asooke.jpg",
  },
  {
    category: "African Heritage",
    title: "African Heritage",
    subtitle: "Ceremonial Agbada, Akwete & metallic Aso-Oke",
    image: "/collections/odo-indigo-agbada.jpg",
  },
];

export const bespokeServices: BespokeService[] = [
  {
    id: "private-atelier",
    number: "01",
    title: "Private Bespoke Tailoring",
    leadTime: "2–3 Weeks",
    description:
      "One-on-one fittings in our Victoria Island studio or virtually worldwide—translating your proportions into architectural Nigerian tailoring.",
    highlights: [
      "Personal pattern drafting & toile fitting",
      "Custom hand-dyed Adire or indigo colourways",
      "Worldwide insured courier delivery",
    ],
  },
  {
    id: "ceremonial-couture",
    number: "02",
    title: "Bridal & Ceremonial Couture",
    leadTime: "4–8 Weeks",
    description:
      "Heirloom engagement, traditional wedding, and cultural gala garments woven to order with partner guilds in Iseyin, Abia, and Benin.",
    highlights: [
      "Custom family Aso-Oke loom commissions",
      "Hand-beaded George & coral-accented ensembles",
      "Coordinated groom, bride & family capsules",
    ],
  },
  {
    id: "ethical-manufacturing",
    number: "03",
    title: "Small-Batch Atelier Manufacturing",
    leadTime: "MOQ from 25 Units",
    description:
      "End-to-end sample room and ethical small-batch production in Lagos for independent African and global designers demanding luxury finishing.",
    highlights: [
      "Pattern engineering, grading & tech packs",
      "French seams, trapunto & hand-finished linings",
      "Transparent artisan wage & provenance ledger",
    ],
  },
  {
    id: "textile-sourcing",
    number: "04",
    title: "Heritage Textile Sourcing",
    leadTime: "1–4 Weeks",
    description:
      "Direct access to our vetted network of master weavers, natural indigo dyers, and wax-print archives across Ogun, Osun, Abia, and Kano.",
    highlights: [
      "Certified natural Elu & Kofar Mata indigo batches",
      "Custom-weight featherweight Aso-Oke weaving",
      "Archival swatch books shipped to design houses",
    ],
  },
];

export const journalArticles: JournalArticle[] = [
  {
    id: "living-indigo-osogbo",
    tag: "CRAFT & TEXTILES",
    title: "Inside the Living Indigo Vats of Osogbo and Kano",
    date: "November 2026",
    readTime: "5 min read",
    image: "/collections/odo-indigo-agbada.jpg",
    excerpt:
      "How a new generation of Nigerian ateliers is pairing centuries-old fermented Elu indigo dyeing with architectural menswear tailoring.",
    body: [
      "Before a single pattern piece is chalked in our Lagos cutting room, the life of an Odò Indigo garment begins in deep clay vats fed with fermented Lonchocarpus cyanescens leaves and wood-ash lye. Unlike synthetic dyes that sit flat on cotton fibres, living natural indigo oxidises in open air—shifting from emerald-green to deep midnight blue with every dip.",
      "Across Osogbo and Kano’s historic Kofar Mata pits, master dyers judge saturation by aroma, froth, and sunlight. By commissioning small, traceable batches directly from family compounds, Beliza Signature ensures the colour deepens gracefully with age while sustaining generational livelihoods.",
      "Paired with crisp, unlined Savile-influenced shoulders and collarless necklines, the resulting textiles prove that heritage craft does not belong behind museum glass—it belongs in motion.",
    ],
  },
  {
    id: "re-engineering-asooke",
    tag: "DESIGN ARCHIVE",
    title: "Weightless Royalty: Re-Engineering Aso-Oke for Global Climate",
    date: "October 2026",
    readTime: "4 min read",
    image: "/collections/irin-asooke-jacket.jpg",
    excerpt:
      "Traditional ceremonial strip-weaving meets fine-gauge silk and metallic threads to create structured eveningwear that breathes.",
    body: [
      "For centuries, Yoruba Aso-Oke carried the visual weight of celebration—dense, sculptural, and unmistakable. Yet for everyday evening dressing between Lagos, London, and New York, our studio asked a fresh question: what happens when narrow-strip loom tension is recalibrated with fine combed cotton and spun silk?",
      "Working alongside master weavers in Iseyin, we developed a featherweight burnished-bronze and obsidian weave that holds sharp lapel architecture at nearly half the traditional gsm. The result drapes effortlessly over silk layers while preserving the unmistakable horizontal rhythm of the hand-thrown shuttle.",
    ],
  },
  {
    id: "architecture-of-tubali",
    tag: "CULTURE & FORM",
    title: "From Zaria Courtyards to Tailored Reliefs: The Geometry of Tubali",
    date: "September 2026",
    readTime: "6 min read",
    image: "/collections/zaria-monolith-kaftan.jpg",
    excerpt:
      "Exploring how Northern Nigeria’s sculpted earthen facades inspire tonal trapunto stitching and sun-baked ochre silhouettes.",
    body: [
      "Walk through the old quarters of Zaria at late afternoon and the walls themselves read like embroidery. Hand-plastered Hausa Tubali facades cast crisp geometric reliefs—interlocking knots, arches, and stepped pinnacles engineered to cool interior courtyards.",
      "For the Zàrià Monolith capsule, our pattern makers translated those earthen reliefs into tone-on-tone trapunto embroidery across slate-indigo kaftans and sand-ochre canvas coats. Rather than contrasting thread, shadow and raised stitch alone carry the ornament.",
    ],
  },
];

export const emergingDesigners: EmergingDesigner[] = [
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    city: "Lagos & Enugu",
    specialty: "Akwete Drapery & Sculptural Womenswear",
    image: "/collections/imole-draped-column.jpg",
    bio: "Trained in architectural pattern cutting, Amara collaborates with women’s weaving cooperatives in Abia State to transform ceremonial Akwete motifs into fluid evening columns.",
    collectionId: "imole",
  },
  {
    id: "tunde-adeyemi",
    name: "Tunde Adeyemi",
    city: "Ibadan & Lagos",
    specialty: "Deconstructed Agbada & Indigo Tailoring",
    image: "/collections/odo-eko-coord.jpg",
    bio: "Tunde’s work distils the sweeping volume of classic Yoruba menswear into razor-clean, breathable outerwear dyed exclusively in fermented Osogbo indigo.",
    collectionId: "odo-indigo",
  },
  {
    id: "esosa-igbinovia",
    name: "Esosa Igbinovia",
    city: "Benin City",
    specialty: "Metallic Aso-Oke & Cast-Bronze Hardware",
    image: "/collections/irin-courtyard-ensemble.jpg",
    bio: "Drawing on Edo guild metalwork, Esosa embeds hand-cast bronze clasps and knife-pleated metallic strip weaves into contemporary resort and gala silhouettes.",
    collectionId: "irin-bronze",
  },
  {
    id: "sadiq-bello",
    name: "Sadiq Bello",
    city: "Kano & Abuja",
    specialty: "Hausa Trapunto & Monolithic Outerwear",
    image: "/collections/zaria-ochre-coat.jpg",
    bio: "Sadiq merges northern Nigerian cotton canvas, Kofar Mata selvedge dyeing, and understated architectural proportions built for trans-seasonal travel.",
    collectionId: "zaria-monolith",
  },
];

export const intelligenceReports: IntelligenceInsight[] = [
  {
    id: "african-luxury-growth",
    metric: "+18.4%",
    label: "ANNUAL LUXURY GROWTH",
    category: "MARKET SIGNAL",
    title: "Diaspora & Continental Demand for Provenance-Led Craft",
    summary:
      "Collectors in Lagos, London, New York, and Paris are shifting from logo-driven luxury toward traceable hand-loomed textiles with documented regional origin.",
  },
  {
    id: "artisan-loom-index",
    metric: "42 Guilds",
    label: "VERIFIED NIGERIAN WORKSHOPS",
    category: "SUPPLY CHAIN",
    title: "Small-Batch Ethical Production as a Competitive Edge",
    summary:
      "Direct atelier-to-loom partnerships shorten lead times by 35% while increasing master weaver retention across Ogun, Osun, Abia, and Kano states.",
  },
  {
    id: "natural-dye-sustainability",
    metric: "68% Less",
    label: "WATER FOOTPRINT VS. SYNTHETIC",
    category: "SUSTAINABILITY",
    title: "Natural Fermented Indigo & Plant-Starch Resist Revival",
    summary:
      "Closed-loop cassava-paste Adire Eleko and organic Elu indigo vats position Nigerian artisanal textiles at the forefront of global regenerative fashion.",
  },
  {
    id: "hybrid-silhouette-index",
    metric: "3.2×",
    label: "REPEAT WEAR VELOCITY",
    category: "CONSUMER INSIGHT",
    title: "Trans-Seasonal Heritage Tailoring Outperforms Occasion-Only Wear",
    summary:
      "Modular pieces—like deconstructed Agbada coats and lightweight Aso-Oke jackets—bridge boardroom, gallery, and ceremonial wardrobes effortlessly.",
  },
];
