import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingBag,
  Menu,
  Scissors,
  Globe2,
  Leaf,
  Minus,
  Plus,
  Trash2,
  Check,
  X,
  Sparkles,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  categories,
  collections,
  products,
  money,
  addToBag,
  bagTotal,
  filterProducts,
  isValidEmail,
  type Product,
  type BagItem,
  type CollectionId,
} from "@/lib/collection";
import { heroSlides, shopCategories, bespokeServices, intelligenceReports } from "@/lib/editorial";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beliza Signature | Redefining the Future of African Fashion" },
      {
        name: "description",
        content:
          "Discover contemporary Nigerian fashion, exceptional craftsmanship and a new expression of African identity—Adire, Aso-Oke, Ankara, Akwete and bespoke Lagos tailoring.",
      },
      {
        property: "og:title",
        content: "Beliza Signature | Redefining the Future of African Fashion",
      },
      {
        property: "og:description",
        content:
          "Discover contemporary fashion, exceptional craftsmanship and a new expression of African identity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Wordmark({ variant = "header" }: { variant?: "header" | "footer" }) {
  const src = variant === "footer" ? "/logo_off_white-bg.png" : "/original_logo-bg.png";
  return (
    <a href="#" className="wordmark" aria-label="Beliza Signature home">
      <img
        src={src}
        alt="Beliza Signature"
        className={variant === "footer" ? "wordmark-img wordmark-img-footer" : "wordmark-img"}
      />
    </a>
  );
}

function Index() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTrackRef = useRef<HTMLDivElement | null>(null);

  const [filter, setFilter] = useState<string>("All");
  const [activeCapsule, setActiveCapsule] = useState<CollectionId | "all">("all");
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [bag, setBag] = useState<BagItem[]>([]);
  const [panel, setPanel] = useState<
    "search" | "bag" | "saved" | "menu" | "story" | "bespoke" | null
  >(null);
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const [bespokeServiceName, setBespokeServiceName] = useState(bespokeServices[0].title);
  const [bespokeName, setBespokeName] = useState("");
  const [bespokeEmail, setBespokeEmail] = useState("");
  const [bespokeSubmitted, setBespokeSubmitted] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "error" | "subscribed">("idle");

  const count = bag.reduce((sum, item) => sum + item.quantity, 0);
  const visible = filterProducts(products, { category: filter, collectionId: activeCapsule });
  const searchMatches = filterProducts(products, { query: search });
  const selectedCapsule =
    activeCapsule === "all" ? null : (collections.find((c) => c.id === activeCapsule) ?? null);
  const currentSlide = heroSlides[heroIndex] ?? heroSlides[0];

  function scrollToSlide(nextIndex: number) {
    const wrapped = (nextIndex + heroSlides.length) % heroSlides.length;
    setHeroIndex(wrapped);
    const track = heroTrackRef.current;
    if (track) {
      track.scrollTo({ left: wrapped * track.clientWidth, behavior: "smooth" });
    }
  }

  function handleHeroScroll() {
    const track = heroTrackRef.current;
    if (!track || track.clientWidth === 0) return;
    const nearest = Math.round(track.scrollLeft / track.clientWidth);
    if (nearest !== heroIndex && nearest >= 0 && nearest < heroSlides.length) {
      setHeroIndex(nearest);
    }
  }

  useEffect(() => {
    if (heroPaused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      setHeroIndex((previous) => {
        const next = (previous + 1) % heroSlides.length;
        const track = heroTrackRef.current;
        if (track) {
          track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
        }
        return next;
      });
    }, 6500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  function openProduct(product: Product) {
    setPanel(null);
    setSelected(product);
    setSize(product.sizes.includes("M") ? "M" : (product.sizes[0] ?? "M"));
    setAdded(false);
  }

  function exploreArrivals(category = "All", capsule: CollectionId | "all" = "all") {
    setFilter(category);
    setActiveCapsule(capsule);
    setPanel(null);
    document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" });
  }

  function openBespoke(serviceTitle?: string) {
    if (serviceTitle) setBespokeServiceName(serviceTitle);
    setBespokeSubmitted(false);
    setPanel("bespoke");
  }

  function toggleSaved(id: string) {
    setSaved((previous) =>
      previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id],
    );
  }

  function changeQuantity(index: number, amount: number) {
    setBag((previous) =>
      previous
        .map((item, i) => (i === index ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function handleNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValidEmail(newsletterEmail)) {
      setNewsletterState("error");
      return;
    }
    setNewsletterState("subscribed");
    setNewsletterEmail("");
  }

  function handleBespokeSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!bespokeName.trim() || !isValidEmail(bespokeEmail)) return;
    setBespokeSubmitted(true);
  }

  return (
    <>
      <div className="announcement">
        Redefining African Luxury.
        <span>Adire · Aso-Oke · Ankara · Akwete · Bespoke Lagos Atelier</span>
      </div>

      <header className="site-header">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#categories">Categories</a>
          <a href="#collections" className="current">
            Collections
          </a>
          <a href="#new-arrivals" onClick={() => exploreArrivals("All", "all")}>
            New Arrivals
          </a>
          <a href="#bespoke">Bespoke</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#newsletter">Newsletter</a>
        </nav>
        <div className="header-tools">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search collection"
            title="Search collection"
            onClick={() => setPanel("search")}
          >
            <Search size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Saved pieces"
            title="Saved pieces"
            onClick={() => setPanel("saved")}
          >
            <Heart size={18} />
          </Button>
          <Button
            variant="ghost"
            aria-label={`Shopping bag, ${count} items`}
            title="Shopping bag"
            className="px-2"
            onClick={() => {
              setPanel("bag");
              setCheckout(false);
            }}
          >
            <ShoppingBag size={18} />
            <span className="bag-count">{count}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label="Open menu"
            onClick={() => setPanel("menu")}
          >
            <Menu />
          </Button>
        </div>
      </header>

      <main>
        {/* 1. HERO CAMPAIGN — 6 SCROLLABLE NIGERIAN LOCAL FASHION SLIDES */}
        <section
          className="hero"
          aria-label="Beliza Signature campaign"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          <div
            ref={heroTrackRef}
            className="hero-track"
            onScroll={handleHeroScroll}
            role="region"
            aria-roledescription="carousel"
            aria-label="Nigerian fashion heritage lookbook slides"
          >
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="hero-slide" aria-hidden={index !== heroIndex}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="hero-image"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-copy">
            <div className="eyebrow">
              {currentSlide.craftLabel} · {currentSlide.region}
            </div>
            <h1>
              Redefining the Future of <em>African Fashion.</em>
            </h1>
            <p>
              Discover contemporary fashion, exceptional craftsmanship and a new expression of
              African identity.
            </p>
            <div className="hero-actions">
              <Button
                variant="editorial"
                className="hero-cta"
                onClick={() =>
                  document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Collections <ArrowRight />
              </Button>
              <Button
                variant="outline"
                className="hero-cta-secondary"
                onClick={() => setPanel("story")}
              >
                Discover Our World <ArrowUpRight />
              </Button>
            </div>
          </div>

          <div className="hero-bottom">
            <span className="hero-caption">{currentSlide.caption}</span>
            <div className="hero-controls">
              <div className="hero-pills" role="tablist" aria-label="Choose Nigerian fashion slide">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={index === heroIndex}
                    className="hero-pill"
                    data-active={index === heroIndex}
                    onClick={() => scrollToSlide(index)}
                  >
                    <span className="hero-pill-index">0{index + 1}</span>
                    <span className="hero-pill-label">{slide.craftLabel}</span>
                  </button>
                ))}
              </div>
              <div className="hero-arrows">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hero-arrow"
                  aria-label="Previous campaign look"
                  onClick={() => scrollToSlide(heroIndex - 1)}
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hero-arrow"
                  aria-label="Next campaign look"
                  onClick={() => scrollToSlide(heroIndex + 1)}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="values-strip">
          <div className="value-item">
            <Scissors />
            <span>Nigerian Master Craftsmanship</span>
          </div>
          <div className="value-item">
            <Globe2 />
            <span>Rooted in Lagos · Worn Worldwide</span>
          </div>
          <div className="value-item">
            <Leaf />
            <span>Traceable Looms &amp; Living Dyes</span>
          </div>
        </div>

        {/* 2. SHOP BY CATEGORY */}
        <section id="categories" className="section" aria-label="Shop by category">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Curated Departments</div>
              <h2>Shop by Category</h2>
              <p>
                Five refined expressions of contemporary Nigerian dressing for every generation.
              </p>
            </div>
            <Button
              variant="navigation"
              className="text-action"
              onClick={() => exploreArrivals("All", "all")}
            >
              Browse all pieces <ArrowUpRight />
            </Button>
          </div>

          <div className="category-grid">
            {shopCategories.map((item, idx) => (
              <article
                key={item.category}
                className={`category-card${idx === 4 ? " category-card-wide" : ""}`}
              >
                <img src={item.image} alt={`${item.title} — ${item.subtitle}`} loading="lazy" />
                <div className="category-shade" aria-hidden="true" />
                <div className="category-copy">
                  <span className="category-count">
                    {filterProducts(products, { category: item.category }).length}{" "}
                    {filterProducts(products, { category: item.category }).length === 1
                      ? "PIECE"
                      : "PIECES"}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="edit-link"
                  aria-label={`Shop ${item.title}`}
                  onClick={() => exploreArrivals(item.category, "all")}
                >
                  <ArrowUpRight />
                </Button>
              </article>
            ))}
          </div>
        </section>

        {/* 3. FEATURED COLLECTIONS — LARGE ASYMMETRIC IMAGE CARDS */}
        <section
          id="collections"
          className="section capsule-section"
          aria-label="Featured Nigerian collections"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">Regional Craft, Reimagined</div>
              <h2>Featured Collections</h2>
              <p>Four novel Nigerian capsules crafted with partner guilds from Abeokuta to Kano.</p>
            </div>
            <Button
              variant="navigation"
              className="text-action"
              onClick={() => exploreArrivals("All", "all")}
            >
              Explore all {products.length} pieces <ArrowUpRight />
            </Button>
          </div>

          <div className="featured-grid">
            {collections.map((capsule, index) => (
              <article
                key={capsule.id}
                className={`featured-card${index === 0 || index === 3 ? " featured-card-large" : ""}`}
                data-active={activeCapsule === capsule.id}
              >
                <div className="featured-media">
                  <img
                    src={capsule.coverImage}
                    alt={`${capsule.name} — ${capsule.subtitle}`}
                    loading="lazy"
                  />
                  <span className="capsule-season">{capsule.season}</span>
                </div>
                <div className="capsule-body">
                  <span className="capsule-origin">{capsule.origin}</span>
                  <h3>{capsule.name}</h3>
                  <p className="capsule-subtitle">{capsule.subtitle}</p>
                  <p className="capsule-story">{capsule.story}</p>
                  <div className="capsule-footer">
                    <div
                      className="palette-swatches"
                      aria-label={`${capsule.name} textile palette`}
                    >
                      {capsule.palette.map((swatch) => (
                        <span
                          key={swatch.name}
                          className="palette-dot"
                          style={{ backgroundColor: swatch.hex }}
                          title={swatch.name}
                        />
                      ))}
                    </div>
                    <Button
                      variant="navigation"
                      className="capsule-cta"
                      onClick={() => exploreArrivals("All", capsule.id)}
                    >
                      View collection <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. NEW ARRIVALS */}
        <section id="new-arrivals" className="section" aria-label="New arrivals">
          <div className="section-heading">
            <div>
              <div className="eyebrow">The Latest Drop</div>
              <h2>New Arrivals</h2>
              <p>Architectural Nigerian silhouettes in Adire, Aso-Oke, Ankara, Akwete and linen.</p>
            </div>
            <Button
              variant="navigation"
              className="text-action"
              onClick={() => exploreArrivals("All", "all")}
            >
              Reset filters <ArrowUpRight />
            </Button>
          </div>

          <div className="filter-bar">
            <div className="collection-tabs" aria-label="Filter by category">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="filter"
                  data-active={filter === category}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="collection-tabs" aria-label="Filter by collection">
              <Button
                variant="filter"
                data-active={activeCapsule === "all"}
                aria-pressed={activeCapsule === "all"}
                onClick={() => setActiveCapsule("all")}
              >
                All Collections
              </Button>
              {collections.map((capsule) => (
                <Button
                  key={capsule.id}
                  variant="filter"
                  data-active={activeCapsule === capsule.id}
                  aria-pressed={activeCapsule === capsule.id}
                  onClick={() => setActiveCapsule(capsule.id)}
                >
                  {capsule.name}
                </Button>
              ))}
            </div>
          </div>

          {selectedCapsule && (
            <div className="capsule-banner">
              <div>
                <div className="capsule-origin">
                  {selectedCapsule.season} · {selectedCapsule.origin}
                </div>
                <h3>
                  {selectedCapsule.name} — {selectedCapsule.subtitle}
                </h3>
                <p>
                  {selectedCapsule.craft}. {selectedCapsule.story}
                </p>
              </div>
              <div className="capsule-banner-meta">
                <div className="palette-swatches" aria-label={`${selectedCapsule.name} palette`}>
                  {selectedCapsule.palette.map((swatch) => (
                    <span
                      key={swatch.name}
                      className="palette-dot"
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => setActiveCapsule("all")}>
                  <X size={14} /> Show all collections
                </Button>
              </div>
            </div>
          )}

          {visible.length === 0 ? (
            <div className="empty-state">
              No pieces match that combination of category and collection.
              <Button
                variant="link"
                className="mx-auto mt-3 block"
                onClick={() => exploreArrivals("All", "all")}
              >
                View all new arrivals
              </Button>
            </div>
          ) : (
            <div className="product-grid">
              {visible.map((product) => (
                <article key={product.id}>
                  <div className="product-photo">
                    <Button
                      variant="ghost"
                      className="product-open"
                      aria-label={`View ${product.name}`}
                      onClick={() => openProduct(product)}
                    >
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </Button>
                    <span className="product-tag">{product.tag}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="save-product"
                      aria-label={`Save ${product.name}`}
                      aria-pressed={saved.includes(product.id)}
                      onClick={() => toggleSaved(product.id)}
                    >
                      <Heart />
                    </Button>
                  </div>
                  <div className="product-meta">
                    <h3>{product.name}</h3>
                    <span>{money(product.price)}</span>
                  </div>
                  <div className="product-category">
                    {product.collectionName.toUpperCase()} · {product.category.toUpperCase()} ·{" "}
                    {product.origin.toUpperCase()}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 5. MANUFACTURING AND BESPOKE SERVICES */}
        <section
          id="bespoke"
          className="section bespoke-section"
          aria-label="Manufacturing and bespoke services"
        >
          <div className="bespoke-layout">
            <div className="bespoke-intro">
              <div className="eyebrow">Lagos Atelier &amp; Production</div>
              <h2>
                Manufacturing &amp;
                <br />
                <em>Bespoke Services</em>
              </h2>
              <p>
                From private made-to-measure ceremonial garments to ethical small-batch production
                for independent labels, our Victoria Island atelier bridges master Nigerian artisan
                guilds with international luxury finishing standards.
              </p>
              <div className="bespoke-image-wrap">
                <img
                  src="/collections/irin-courtyard-ensemble.jpg"
                  alt="Master artisan tailoring hand-loomed Nigerian textiles in the Beliza Signature atelier"
                  loading="lazy"
                />
              </div>
              <Button variant="default" className="mt-6" onClick={() => openBespoke()}>
                Book an Atelier Consultation <ArrowRight />
              </Button>
            </div>

            <div className="bespoke-grid">
              {bespokeServices.map((service) => (
                <article key={service.id} className="bespoke-card">
                  <div className="bespoke-card-top">
                    <span className="bespoke-num">{service.number}</span>
                    <span className="bespoke-lead">{service.leadTime}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="bespoke-list">
                    {service.highlights.map((point) => (
                      <li key={point}>
                        <Sparkles size={12} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="navigation"
                    className="capsule-cta mt-auto pt-3"
                    onClick={() => openBespoke(service.title)}
                  >
                    Inquire about this service <ArrowUpRight />
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FASHION INTELLIGENCE AND INDUSTRY INSIGHTS */}
        <section
          id="intelligence"
          className="section intelligence-section"
          aria-label="Fashion intelligence and industry insights"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow intelligence-eyebrow">Research &amp; Market Signals</div>
              <h2>Fashion Intelligence</h2>
              <p>
                Data-backed insights tracking African luxury growth, artisan loom preservation, and
                regenerative Nigerian textile economies.
              </p>
            </div>
            <Button
              variant="editorial"
              onClick={() => setPanel("story")}
              className="intelligence-btn"
            >
              Read Atelier Dossier <ArrowUpRight />
            </Button>
          </div>

          <div className="intelligence-grid">
            {intelligenceReports.map((item) => (
              <article key={item.id} className="intelligence-card">
                <div className="intelligence-tag">
                  <TrendingUp size={13} />
                  <span>{item.category}</span>
                </div>
                <div className="intelligence-metric">{item.metric}</div>
                <div className="intelligence-label">{item.label}</div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 7. NEWSLETTER SUBSCRIPTION SECTION */}
        <section
          id="newsletter"
          className="section newsletter-section"
          aria-label="Newsletter subscription"
        >
          <div className="newsletter-card">
            <div className="newsletter-copy">
              <div className="eyebrow">The Beliza Dispatch</div>
              <h2>Private invitations, capsule previews &amp; cultural essays.</h2>
              <p>
                Join collectors, stylists, and design patrons receiving early access to limited
                Nigerian textile drops and seasonal Fashion Intelligence briefings.
              </p>
            </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
              <div className="newsletter-row">
                <Input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(event) => {
                    setNewsletterEmail(event.target.value);
                    if (newsletterState !== "idle") setNewsletterState("idle");
                  }}
                />
                <Button type="submit" variant="default" className="newsletter-submit">
                  Subscribe <ArrowRight />
                </Button>
              </div>
              {newsletterState === "error" && (
                <p role="alert" className="newsletter-feedback newsletter-error">
                  Please enter a valid email address.
                </p>
              )}
              {newsletterState === "subscribed" && (
                <p role="status" className="newsletter-feedback newsletter-success">
                  <Check size={14} /> Welcome to The Beliza Dispatch. Your preview subscription is
                  confirmed.
                </p>
              )}
              <p className="newsletter-note">
                Published bi-weekly from Lagos. Unsubscribe anytime with one click.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* 8. PREMIUM FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark variant="footer" />
            <p className="footer-tagline">
              Redefining the future of African fashion through contemporary architecture, living
              Nigerian textiles, and ethical atelier craft.
            </p>
            <div className="footer-socials" aria-label="Social media">
              <a href="#newsletter" aria-label="Instagram">
                Instagram
              </a>
              <a href="#newsletter" aria-label="Pinterest">
                Pinterest
              </a>
              <a href="#newsletter" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="#newsletter" aria-label="X">
                X / Twitter
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <a href="#categories">Shop by Category</a>
            <a href="#collections">Featured Collections</a>
            <a href="#new-arrivals" onClick={() => exploreArrivals("All", "all")}>
              New Arrivals
            </a>
            <a href="#bespoke">Manufacturing &amp; Bespoke</a>
            <a href="#intelligence">Fashion Intelligence</a>
          </div>

          <div className="footer-col">
            <h4>Departments</h4>
            {shopCategories.map((item) => (
              <a
                key={item.category}
                href="#new-arrivals"
                onClick={() => exploreArrivals(item.category, "all")}
              >
                {item.title}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact &amp; Flagship</h4>
            <div className="footer-contact-item">
              <MapPin size={14} />
              <span>14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={14} />
              <span>atelier@belizasignature.com</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={14} />
              <span>+234 (0) 901 482 0194</span>
            </div>
            <p className="footer-hours">
              Mon – Sat · 10:00 – 19:00 WAT · Private fittings by appointment
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Beliza Signature Ltd. All rights reserved.</span>
          <span>ADIRE · ASO-OKE · ANKARA · AKWETE · BESPOKE ATELIER</span>
          <span>Lagos · Abuja · Worldwide Delivery</span>
        </div>
      </footer>

      {/* PRODUCT DETAIL DIALOG */}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <img className="detail-image" src={selected.image} alt={selected.name} />
              <div className="capsule-origin">
                {selected.collectionName} · {selected.category}
              </div>
              <DialogTitle className="detail-title">{selected.name}</DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
              <dl className="detail-meta">
                <div>
                  <dt>Origin</dt>
                  <dd>{selected.origin}</dd>
                </div>
                <div>
                  <dt>Textile &amp; Craft</dt>
                  <dd>{selected.fabric}</dd>
                </div>
              </dl>
              <div className="text-sm font-medium">{money(selected.price)}</div>
              <fieldset>
                <legend className="mb-2 text-xs text-muted-foreground">Size</legend>
                <div className="flex flex-wrap gap-2">
                  {selected.sizes.map((value) => (
                    <Button
                      key={value}
                      variant="filter"
                      data-active={size === value}
                      aria-pressed={size === value}
                      onClick={() => {
                        setSize(value);
                        setAdded(false);
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </fieldset>
              <Button
                onClick={() => {
                  setBag((previous) => addToBag(previous, selected.id, size));
                  setAdded(true);
                }}
              >
                {added ? (
                  <>
                    <Check /> Added to bag
                  </>
                ) : (
                  <>
                    <ShoppingBag /> Add to bag
                  </>
                )}
              </Button>
              {added && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelected(null);
                    setPanel("bag");
                    setCheckout(false);
                  }}
                >
                  View shopping bag <ArrowRight />
                </Button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* UTILITY & EDITORIAL DIALOGS */}
      <Dialog
        open={panel !== null}
        onOpenChange={(open) => {
          if (!open) setPanel(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogTitle className="detail-title">
            {panel === "search"
              ? "Find your signature"
              : panel === "bag"
                ? "Your shopping bag"
                : panel === "saved"
                  ? "Your saved pieces"
                  : panel === "menu"
                    ? "Beliza Signature"
                    : panel === "bespoke"
                      ? "Atelier & Bespoke Inquiry"
                      : "Discover Our World"}
          </DialogTitle>
          <DialogDescription>
            {panel === "story"
              ? "Rooted in Nigerian heritage. Engineered for the global wardrobe."
              : panel === "bag"
                ? `${count} ${count === 1 ? "piece" : "pieces"} in your bag`
                : panel === "saved"
                  ? "A curated shortlist of your favourite pieces."
                  : panel === "search"
                    ? "Search across pieces, Nigerian textiles, categories and collections."
                    : panel === "bespoke"
                      ? "Schedule a private fitting or discuss small-batch atelier manufacturing."
                      : "Contemporary silhouettes. Nigerian soul."}
          </DialogDescription>

          {panel === "search" && (
            <>
              <Input
                aria-label="Search products"
                placeholder="Try “Adire”, “Aso-Oke”, “Ankara”, “Children”, “Kaftan”…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="search-results">
                {searchMatches.map((product) => (
                  <Button
                    key={product.id}
                    variant="navigation"
                    className="h-auto w-full justify-start gap-3 py-3 text-left"
                    onClick={() => openProduct(product)}
                  >
                    <img className="h-16 w-12 object-cover" src={product.image} alt="" />
                    <span>
                      {product.name}
                      <br />
                      <small className="text-muted-foreground">
                        {product.collectionName} · {product.category} · {money(product.price)}
                      </small>
                    </span>
                    <ArrowRight className="ml-auto" />
                  </Button>
                ))}
                {searchMatches.length === 0 && (
                  <p className="empty-state">
                    No pieces found. Try “Adire”, “Aso-Oke”, “Ankara” or “Indigo”.
                  </p>
                )}
              </div>
            </>
          )}

          {panel === "saved" &&
            (saved.length === 0 ? (
              <div className="empty-state">
                <Heart className="mx-auto mb-3" />
                No saved pieces yet.
                <Button
                  variant="link"
                  className="mx-auto mt-4 block"
                  onClick={() => exploreArrivals()}
                >
                  Explore new arrivals
                </Button>
              </div>
            ) : (
              products
                .filter((product) => saved.includes(product.id))
                .map((product) => (
                  <Button
                    variant="navigation"
                    key={product.id}
                    className="h-auto justify-start gap-4"
                    onClick={() => openProduct(product)}
                  >
                    <img src={product.image} alt="" className="h-20 w-14 object-cover" />
                    <span>
                      {product.name}
                      <br />
                      <small className="text-muted-foreground">{product.collectionName}</small>
                    </span>
                    <ArrowRight className="ml-auto" />
                  </Button>
                ))
            ))}

          {panel === "menu" && (
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              <Button
                variant="navigation"
                className="justify-between"
                onClick={() => {
                  setPanel(null);
                  document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop by Category <ArrowRight />
              </Button>
              <Button
                variant="navigation"
                className="justify-between"
                onClick={() => {
                  setPanel(null);
                  document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Featured Collections <ArrowRight />
              </Button>
              <Button
                variant="navigation"
                className="justify-between"
                onClick={() => exploreArrivals("All", "all")}
              >
                New Arrivals <ArrowRight />
              </Button>
              <Button
                variant="navigation"
                className="justify-between"
                onClick={() => {
                  setPanel(null);
                  document.getElementById("bespoke")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Manufacturing &amp; Bespoke <ArrowRight />
              </Button>
              <Button
                variant="navigation"
                className="justify-between"
                onClick={() => {
                  setPanel(null);
                  document.getElementById("intelligence")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Fashion Intelligence <ArrowRight />
              </Button>
              <Button
                variant="navigation"
                className="justify-between"
                onClick={() => {
                  setPanel(null);
                  document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Newsletter <ArrowRight />
              </Button>
            </nav>
          )}

          {panel === "story" && (
            <>
              <img
                className="detail-image"
                src="/hero/hero-asooke.jpg"
                alt="Nigerian artisan craftsmanship"
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Beliza Signature unites the stature of an international fashion house with the
                living pulse of Nigerian craft. Every capsule is co-authored with regional
                guilds—Abeokuta Adire painters, Osogbo Elu indigo dyers, Iseyin Aso-Oke weavers,
                Abia Akwete looms, and Kano master tailors.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                From sculptural ready-to-wear and ceremonial couture to ethical small-batch
                manufacturing and Fashion Intelligence research, we are shaping a future where
                African design leads globally on its own terms.
              </p>
              <Button onClick={() => exploreArrivals("All", "all")}>
                Explore the Collections <ArrowRight />
              </Button>
            </>
          )}

          {panel === "bespoke" && (
            <>
              {bespokeSubmitted ? (
                <div className="empty-state">
                  <Check className="mx-auto mb-3 text-primary" />
                  <p className="mb-2 font-medium text-foreground">Consultation request noted</p>
                  <p className="text-xs text-muted-foreground">
                    Thank you, {bespokeName}. Our Lagos atelier concierge has recorded your preview
                    inquiry for <strong>{bespokeServiceName}</strong>.
                  </p>
                  <Button className="mx-auto mt-5 flex" onClick={() => setPanel(null)}>
                    Return to Beliza Signature
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-3" onSubmit={handleBespokeSubmit}>
                  <label className="text-xs text-muted-foreground">
                    Service of interest
                    <select
                      className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                      value={bespokeServiceName}
                      onChange={(event) => setBespokeServiceName(event.target.value)}
                    >
                      {bespokeServices.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title} ({service.leadTime})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs text-muted-foreground">
                    Full name
                    <Input
                      required
                      className="mt-1"
                      placeholder="Adaeze Okonkwo"
                      value={bespokeName}
                      onChange={(event) => setBespokeName(event.target.value)}
                    />
                  </label>
                  <label className="text-xs text-muted-foreground">
                    Email address
                    <Input
                      required
                      type="email"
                      className="mt-1"
                      placeholder="you@example.com"
                      value={bespokeEmail}
                      onChange={(event) => setBespokeEmail(event.target.value)}
                    />
                  </label>
                  <Button type="submit" className="mt-2">
                    Request Consultation <ArrowRight />
                  </Button>
                </form>
              )}
            </>
          )}

          {panel === "bag" && (
            <>
              {bag.length === 0 ? (
                <div className="empty-state">
                  <ShoppingBag className="mx-auto mb-3" />
                  Your bag is waiting for something special.
                  <Button className="mx-auto mt-5 flex" onClick={() => exploreArrivals()}>
                    Explore new arrivals <ArrowRight />
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    {bag.map((item, index) => {
                      const product = products.find((value) => value.id === item.productId);
                      if (!product) return null;
                      return (
                        <div key={`${item.productId}-${item.size}`} className="bag-row">
                          <img src={product.image} alt={product.name} />
                          <div>
                            <h3>{product.name}</h3>
                            <p>
                              {product.collectionName} · Size {item.size} · {money(product.price)}
                            </p>
                            <div className="bag-quantity">
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Decrease ${product.name} quantity`}
                                onClick={() => changeQuantity(index, -1)}
                              >
                                <Minus />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Increase ${product.name} quantity`}
                                onClick={() => changeQuantity(index, 1)}
                              >
                                <Plus />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Remove ${product.name}`}
                            onClick={() =>
                              setBag((previous) => previous.filter((_, i) => i !== index))
                            }
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span>Subtotal</span>
                    <strong>{money(bagTotal(bag))}</strong>
                  </div>
                  <Button onClick={() => setCheckout(true)}>
                    Continue to checkout <ArrowRight />
                  </Button>
                  {checkout && (
                    <p role="status" className="text-sm leading-relaxed text-muted-foreground">
                      This is a preview collection. Orders and payments are not available yet.
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
