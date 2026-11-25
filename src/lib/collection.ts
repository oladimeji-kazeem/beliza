export type Category = "Women" | "Men" | "Children" | "Accessories" | "African Heritage";

export type CollectionId = "imole" | "odo-indigo" | "irin-bronze" | "zaria-monolith";

export interface Collection {
  id: CollectionId;
  name: string;
  subtitle: string;
  origin: string;
  season: string;
  craft: string;
  story: string;
  palette: { name: string; hex: string }[];
  coverImage: string;
}

export interface Product {
  id: string;
  name: string;
  collectionId: CollectionId;
  collectionName: string;
  category: Category;
  price: number;
  image: string;
  tag: string;
  origin: string;
  fabric: string;
  description: string;
  sizes: string[];
}

export type BagItem = { productId: string; size: string; quantity: number };

export const categories = [
  "All",
  "Women",
  "Men",
  "Children",
  "Accessories",
  "African Heritage",
] as const;

export const collections: Collection[] = [
  {
    id: "imole",
    name: "Ìmọ́lẹ̀",
    subtitle: "The Harmattan Light Capsule",
    origin: "Abeokuta & Lagos",
    season: "CAPSULE 01 · HARMATTAN",
    craft: "Hand-loomed Akwete linen & tone-on-tone Adire Eleko",
    story:
      "Born from the pale golden dust of Lagos mornings, Ìmọ́lẹ̀ pairs unbleached hand-loomed cotton-linen with whisper-quiet cassava-starch Adire Eleko geometry.",
    palette: [
      { name: "Chalk Ivory", hex: "#F3EEE4" },
      { name: "Raw Linen", hex: "#DDD2BE" },
      { name: "Cast Bronze", hex: "#A57B4F" },
    ],
    coverImage: "/collections/imole-draped-column.jpg",
  },
  {
    id: "odo-indigo",
    name: "Odò Indigo",
    subtitle: "The Deep River Capsule",
    origin: "Osogbo & Ibadan",
    season: "CAPSULE 02 · RAINFALL",
    craft: "Natural fermented Elu indigo vats & Asa collar embroidery",
    story:
      "Steeped in living Osogbo indigo pots and shaped through sharp, collarless Lagos tailoring, Odò Indigo reimagines ceremonial Agbada volumes for daily movement.",
    palette: [
      { name: "Elu Indigo", hex: "#1B2A41" },
      { name: "Forest Teal", hex: "#1E4644" },
      { name: "River Slate", hex: "#4B5B64" },
    ],
    coverImage: "/collections/odo-indigo-agbada.jpg",
  },
  {
    id: "irin-bronze",
    name: "Ìrìn Bronze",
    subtitle: "The Benin Guild Capsule",
    origin: "Benin City & Victoria Island",
    season: "CAPSULE 03 · EVENING",
    craft: "Featherweight metallic Aso-Oke & lost-wax brass accents",
    story:
      "A tribute to the bronze-casting guilds of Igun Street—re-engineering ceremonial Aso-Oke into weightless obsidian-and-bronze tailoring with sculptural pleating.",
    palette: [
      { name: "Burnished Bronze", hex: "#9A6B42" },
      { name: "Benin Terracotta", hex: "#B45F3F" },
      { name: "Obsidian", hex: "#1F1D1B" },
    ],
    coverImage: "/collections/irin-asooke-jacket.jpg",
  },
  {
    id: "zaria-monolith",
    name: "Zàrià Monolith",
    subtitle: "The Northern Architecture Capsule",
    origin: "Kano & Zaria",
    season: "CAPSULE 04 · SAHEL",
    craft: "Tubali-inspired trapunto stitching & Kofar Mata dye selvedge",
    story:
      "Drawing from monumental Hausa Tubali courtyard geometry and Kano’s centuries-old Kofar Mata dye pits, Zàrià Monolith balances crisp structure with desert warmth.",
    palette: [
      { name: "Sahel Ochre", hex: "#C68D4A" },
      { name: "Kofar Slate", hex: "#344251" },
      { name: "Tubali Sand", hex: "#E3D5BE" },
    ],
    coverImage: "/collections/zaria-ochre-coat.jpg",
  },
];

export const products: Product[] = [
  {
    id: "imole-sculpted-blouse",
    name: "Ìmọ́lẹ̀ Sculpted Adire Blouse",
    collectionId: "imole",
    collectionName: "Ìmọ́lẹ̀",
    category: "Women",
    price: 82500,
    image: "/collections/imole-sculpted-blouse.jpg",
    tag: "NEW ARRIVAL",
    origin: "Abeokuta, Ogun State",
    fabric: "Hand-loomed cotton-linen with white-on-ivory Adire Eleko",
    description:
      "Architectural pleated sleeves meet a softly cinched bodice in raw Abeokuta cotton-linen, hand-painted with subtle cassava-paste Adire Eleko geometry.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "ankara-sculpted-midi",
    name: "Lagos Sculpted Ankara Midi",
    collectionId: "irin-bronze",
    collectionName: "Ìrìn Bronze",
    category: "Women",
    price: 118000,
    image: "/hero/hero-ankara.jpg",
    tag: "ANKARA EDIT",
    origin: "Lagos Atelier",
    fabric: "Custom geometric wax-print cotton in teal, ochre & navy",
    description:
      "Contemporary Ankara reimagined with an asymmetric pleated shoulder, waist-cinching sash, and architectural midi drape.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "odo-indigo-agbada",
    name: "Odò Indigo Agbada Coat",
    collectionId: "odo-indigo",
    collectionName: "Odò Indigo",
    category: "African Heritage",
    price: 195000,
    image: "/collections/odo-indigo-agbada.jpg",
    tag: "HERITAGE PIECE",
    origin: "Osogbo, Osun State",
    fabric: "Fermented Elu indigo cotton twill",
    description:
      "A deconstructed knee-length Agbada-trench hybrid dyed in natural fermented indigo vats, finished with sharp shoulders and tonal Asa hand embroidery.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "odo-eko-coord",
    name: "Eko Tailored Co-ord",
    collectionId: "odo-indigo",
    collectionName: "Odò Indigo",
    category: "Men",
    price: 128000,
    image: "/collections/odo-eko-coord.jpg",
    tag: "NEW ARRIVAL",
    origin: "Lagos Atelier",
    fabric: "Breathable hand-dyed forest-teal cotton-linen",
    description:
      "Clean architectural lines and effortless drape. A collarless forest-teal tunic paired with wide-leg pleated trousers designed for coastal evenings.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "irin-asooke-jacket",
    name: "Igun Burnished Aso-Oke Jacket",
    collectionId: "irin-bronze",
    collectionName: "Ìrìn Bronze",
    category: "African Heritage",
    price: 185000,
    image: "/collections/irin-asooke-jacket.jpg",
    tag: "LIMITED ASO-OKE",
    origin: "Iseyin & Benin City",
    fabric: "Featherweight metallic-bronze & obsidian hand-loomed Aso-Oke",
    description:
      "Cropped evening tailoring woven on narrow strip looms in shimmering burnished bronze and charcoal threads, finished with concealed horn buttons.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "zaria-monolith-kaftan",
    name: "Kofar Mata Architectural Kaftan",
    collectionId: "zaria-monolith",
    collectionName: "Zàrià Monolith",
    category: "Men",
    price: 142000,
    image: "/collections/zaria-monolith-kaftan.jpg",
    tag: "ZÀRIÀ MONOLITH",
    origin: "Kano & Zaria",
    fabric: "Matte slate-indigo cotton with tonal Tubali trapunto",
    description:
      "Precision-cut slate-indigo kaftan featuring raised geometric trapunto stitching inspired by historic Zaria courtyard reliefs, paired with relaxed trousers.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "children-adire-set",
    name: "Ọmọ Adire & Linen Occasion Set",
    collectionId: "imole",
    collectionName: "Ìmọ́lẹ̀",
    category: "Children",
    price: 54000,
    image: "/hero/hero-adire.jpg",
    tag: "JUNIOR CAPSULE",
    origin: "Abeokuta & Lagos",
    fabric: "Soft unbleached Nigerian cotton-linen with indigo Adire trim",
    description:
      "Breathable ceremonial and everyday dressing for young wearers—crafted in gentle hand-loomed cotton-linen with Aso-Oke cuff piping.",
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
  },
  {
    id: "accessories-asooke-clutch",
    name: "Igun Aso-Oke Clutch & Bronze Cuff",
    collectionId: "irin-bronze",
    collectionName: "Ìrìn Bronze",
    category: "Accessories",
    price: 96000,
    image: "/hero/hero-asooke.jpg",
    tag: "ARTISAN OBJECT",
    origin: "Benin City & Iseyin",
    fabric: "Hand-loomed metallic Aso-Oke, cast Benin bronze & Adire silk",
    description:
      "A sculptural evening clutch in forest-teal and bronze Aso-Oke paired with a hand-cast Benin bronze cuff and folded indigo silk pocket square.",
    sizes: ["ONE SIZE"],
  },
  {
    id: "imole-draped-column",
    name: "Harmattan Akwete Draped Column",
    collectionId: "imole",
    collectionName: "Ìmọ́lẹ̀",
    category: "African Heritage",
    price: 168000,
    image: "/collections/imole-draped-column.jpg",
    tag: "EDITOR’S PICK",
    origin: "Abia & Lagos Looms",
    fabric: "Unbleached Akwete-inspired raw silk-linen",
    description:
      "An asymmetric floor-length column gown with fluid architectural draping and a shoulder fold secured by a minimalist hand-cast Benin bronze pin.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "irin-courtyard-ensemble",
    name: "Oba’s Courtyard Pleated Ensemble",
    collectionId: "irin-bronze",
    collectionName: "Ìrìn Bronze",
    category: "Women",
    price: 154000,
    image: "/collections/irin-courtyard-ensemble.jpg",
    tag: "ÌRÌN BRONZE",
    origin: "Benin City, Edo State",
    fabric: "Terracotta silk-cotton & bronze-threaded Aso-Oke",
    description:
      "A fluid sun-baked terracotta silk-cotton tunic layered over a knife-pleated bronze-threaded Aso-Oke wrap skirt that catches the light with every step.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "zaria-ochre-coat",
    name: "Zaria Ochre Wrap Coat",
    collectionId: "zaria-monolith",
    collectionName: "Zàrià Monolith",
    category: "Women",
    price: 176000,
    image: "/collections/zaria-ochre-coat.jpg",
    tag: "NEW ARRIVAL",
    origin: "Zaria & Lagos",
    fabric: "Sun-baked ochre Nigerian cotton canvas with indigo selvedge",
    description:
      "A sculptural belted duster coat in tactile desert-ochre canvas, subtly trimmed with hand-stitched Kofar Mata indigo selvedge along the wide lapels.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

export const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export function addToBag(items: BagItem[], productId: string, size: string): BagItem[] {
  const existing = items.find((item) => item.productId === productId && item.size === size);
  return existing
    ? items.map((item) => (item === existing ? { ...item, quantity: item.quantity + 1 } : item))
    : [...items, { productId, size, quantity: 1 }];
}

export function bagTotal(items: BagItem[]) {
  return items.reduce(
    (sum, item) =>
      sum + (products.find((product) => product.id === item.productId)?.price ?? 0) * item.quantity,
    0,
  );
}

export function filterProducts(
  items: Product[],
  options: { category?: string; collectionId?: CollectionId | "all"; query?: string } = {},
): Product[] {
  const { category = "All", collectionId = "all", query = "" } = options;
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesCollection = collectionId === "all" || product.collectionId === collectionId;
    const matchesQuery =
      normalizedQuery === "" ||
      `${product.name} ${product.collectionName} ${product.category} ${product.origin} ${product.fabric} ${product.description}`
        .toLowerCase()
        .includes(normalizedQuery);
    return matchesCategory && matchesCollection && matchesQuery;
  });
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
