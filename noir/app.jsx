/* ============================================================
   ARTITA GALLERY — shared UI (icons, Img, header, footer, cards)
   Exposes components on window for sibling babel scripts.
   ============================================================ */
const { useState, useEffect, useRef, createContext, useContext } = React;

/* ---------- DeviceContext ---------- */
const DeviceCtx = createContext(false);
const useMobile = () => useContext(DeviceCtx);

/* ---------- ICONS ---------- */
const I = {
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  user:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  bag:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>,
  heart:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M12 20s-7-4.5-9.2-9C1.3 7.6 3 4.5 6.2 4.5c2 0 3.2 1.2 3.8 2.3.6-1.1 1.8-2.3 3.8-2.3 3.2 0 4.9 3.1 3.4 6.5C19 15.5 12 20 12 20z"/></svg>,
  heartF: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 20s-7-4.5-9.2-9C1.3 7.6 3 4.5 6.2 4.5c2 0 3.2 1.2 3.8 2.3.6-1.1 1.8-2.3 3.8-2.3 3.2 0 4.9 3.1 3.4 6.5C19 15.5 12 20 12 20z"/></svg>,
  burger: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 7h18M3 12h18M3 17h18"/></svg>,
  close:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  arrow:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  arrowUR:(p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M7 17L17 7M9 7h8v8"/></svg>,
  check:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 12l5 5L20 6"/></svg>,
  dash:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M6 12h12"/></svg>,
  ship:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>,
  gift:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M4 11h16v9H4zM4 7h16v4H4zM12 7v13M12 7s-1-4-4-3 0 3 4 3zM12 7s1-4 4-3 0 3-4 3z"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  ig:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
};

/* ---------- IMG with graceful fallback ---------- */
function Img({ src, alt, className, style, position }) {
  const [err, setErr] = useState(false);
  const st = position ? { ...(style || {}), objectPosition: position } : style;
  if (err) return <div className={"img-fallback " + (className || "")} style={st}><span>{alt || "image"}</span></div>;
  return <img src={src} alt={alt || ""} className={className} style={st} loading="lazy" onError={() => setErr(true)} />;
}

/* ---------- FadeUp on scroll ---------- */
function FadeUp({ children, className, delay = 0, tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const root = el.closest(".viewport");
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.disconnect(); } });
    }, { root: root || null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const Tag = tag;
  return <Tag ref={ref} className={"fade-up " + (shown ? "in " : "") + (className || "")}>{children}</Tag>;
}

/* ---------- MARQUEE ---------- */
function Marquee({ items }) {
  const row = items.flatMap((t, i) => [<span key={"a" + i}>{t}</span>, <span key={"d" + i} className="dot">✦</span>]);
  return <div className="marquee"><div className="track">{row}{row}</div></div>;
}

/* ---------- HEADER ---------- */
function Header({ logo, cartCount, onCart, onHome, onNav }) {
  const m = useMobile();
  const nav = ["Catalog", "Rings", "Necklaces", "About"];
  return (
    <header className="hdr">
      <div className="wrap hdr-inner">
        {m
          ? <button className="burger" aria-label="Menu">{I.burger()}</button>
          : <nav className="hdr-nav">{nav.map(n => <a key={n} onClick={() => onNav && onNav(n)}>{n}</a>)}</nav>}
        {m && <div className="hdr-logo" onClick={onHome}>{logo}</div>}
        <div className="hdr-right">
          <div className="hdr-icons">
            <button className="ic" aria-label="Search">{I.search()}</button>
            {!m && <button className="ic" aria-label="Account">{I.user()}</button>}
            <button className="ic" aria-label="Cart" onClick={onCart}>
              {I.bag()}
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
          {!m && <div className="hdr-logo" onClick={onHome}>{logo}</div>}
        </div>
      </div>
    </header>
  );
}

/* ---------- PRODUCT CARD ---------- */
function ProductCard({ p, onOpen, fmt }) {
  return (
    <a className="pcard" onClick={() => onOpen(p)} style={{ cursor: "pointer" }}>
      <div className="ph">
        <Img src={p.img} alt={p.name} />
        {p.tag && <span className="tag">{p.tag}</span>}
        <div className="quick">View Piece</div>
      </div>
      <div className="nm">{p.name}</div>
      <div className="meta">
        <span className="cat">{p.cat}</span>
        <span className="pr">{fmt(p.price)}</span>
      </div>
    </a>
  );
}

/* ---------- SECTION HEAD ---------- */
function SectionHead({ eyebrow, title, link, center }) {
  return (
    <div className="section-head" style={center ? { flexDirection: "column", alignItems: "center", textAlign: "center" } : null}>
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="h-display">{title}</h2>
      </div>
      {link && <a className="section-link">{link}</a>}
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ logo }) {
  const cols = [
    { h: "Shop", items: ["New Arrivals", "Rings", "Necklaces", "Earrings", "Bracelets"] },
    { h: "Atelier", items: ["Our Story", "Craftsmanship", "Sustainability", "Showrooms"] },
    { h: "Care", items: ["Shipping & Returns", "Resizing", "Warranty", "Contact"] }
  ];
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div>
            <div className="logo">{logo}</div>
            <p className="blurb">Solid-gold heirloom jewelry, handcrafted in small batches and made to be worn every single day — and passed down for the next hundred years.</p>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              <ul>{c.items.map(it => <li key={it}><a>{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="ftr-bottom">
          <span>© 2026 Artita Gallery. All rights reserved.</span>
          <span>Lisbon · London · New York</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { DeviceCtx, useMobile, I, Img, FadeUp, Marquee, Header, ProductCard, SectionHead, Footer });


/* ============================================================
   ARTITA GALLERY — section + hero components
   ============================================================ */
(function () {
  const { useState } = React;
  const D = window.ARTITA;
  const fmt = D.fmt;

  /* ---------------- HEROES ---------------- */
  function HeroFull({ onShop, onPdp }) {
    return (
      <section className="hero-full">
        <Img className="bg" src={D.IMG.model} alt="Model wearing Artita necklaces and band" position="center 30%" />
        <div className="veil" />
        <div className="content">
          <div className="eyebrow">The Everyday Collection — 2026</div>
          <h1 className="h-display">Jewelry made<br/>to be lived in.</h1>
          <p>Solid-gold pieces, handcrafted in small batches and finished by hand. Quietly luxurious, endlessly wearable.</p>
          <div className="cta-row">
            <button className="btn btn-solid" onClick={onShop}>Shop the collection {I.arrow({ width: 16 })}</button>
            <button className="btn btn-outline" onClick={onPdp}>View bestseller</button>
          </div>
        </div>
      </section>
    );
  }

  function HeroSplit({ onShop, onPdp }) {
    return (
      <section className="hero-split">
        <div className="left">
          <div className="eyebrow">Artita Gallery — Est. 2018</div>
          <h1 className="h-display">Unveil<br/>timeless<br/><span className="underline">elegance</span></h1>
          <p>Express your individuality with pieces crafted to highlight you. Solid gold, ethically sourced, made to last several lifetimes.</p>
          <div className="cta-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn btn-ink" onClick={onShop}>Shop now {I.arrowUR({ width: 15 })}</button>
            <button className="btn btn-outline" onClick={onPdp}>The signet ring</button>
          </div>
          <div className="stat-row">
            <div className="stat"><div className="n">18k</div><div className="l">Solid recycled gold</div></div>
            <div className="stat"><div className="n">12k+</div><div className="l">5-star reviews</div></div>
            <div className="stat"><div className="n">Life</div><div className="l">Free resizing</div></div>
          </div>
        </div>
        <div className="right"><Img src={D.IMG.neckNavy} alt="Midnight diamond necklace" position="center" /></div>
      </section>
    );
  }

  function HeroGrid({ onShop }) {
    return (
      <section className="hero-grid">
        <div className="wrap">
          <div className="grid">
            <div className="ph tall"><Img src={D.IMG.trillionSet} alt="The Trillion edit" position="center" /><span className="cap">The Trillion Edit</span></div>
            <div className="center-col">
              <div className="eyebrow">New Season · 2026</div>
              <h1 className="h-display">The quiet art<br/>of adornment</h1>
              <p>A study in restraint. Heirloom gold, sculpted by hand and designed to disappear into your everyday.</p>
              <button className="btn btn-solid" onClick={onShop}>Explore the edit {I.arrow({ width: 16 })}</button>
            </div>
            <div className="ph tall"><Img src={D.IMG.neckDish} alt="Double chain necklace" position="center" /><span className="cap">Double Chain Necklace</span></div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- CATEGORIES ---------------- */
  function Categories({ variant }) {
    if (variant === "strip") {
      return (
        <section className="section"><div className="wrap">
          <SectionHead eyebrow="Browse by category" title="Find your piece" link="View all" />
          <FadeUp><div className="cat-strip">
            {D.CATEGORIES.map((c, i) => (
              <a key={c.name}>
                <span className="idx">0{i + 1}</span>
                <span className="nm">{c.name}</span>
                <span className="ct">{c.count} pieces &nbsp;{I.arrowUR({ width: 13, style: { display: "inline" } })}</span>
              </a>
            ))}
          </div></FadeUp>
        </div></section>
      );
    }
    return (
      <section className="section"><div className="wrap">
        <SectionHead eyebrow="Shop by category" title="The collections" link="View all" />
        <div className="cats-grid">
          {D.CATEGORIES.map((c, i) => (
            <FadeUp key={c.name} delay={i * 70} tag="a" className="cat-card">
              <Img src={c.img} alt={c.name} />
              <div className="grad" />
              <div className="arrow">{I.arrowUR({ width: 16 })}</div>
              <div className="label"><div className="nm h-head">{c.name}</div><div className="ct">{c.count} pieces</div></div>
            </FadeUp>
          ))}
        </div>
      </div></section>
    );
  }

  /* ---------------- PRODUCT GRID ---------------- */
  function ProductGrid({ eyebrow, title, link, onOpen, items, cols }) {
    const list = items || D.PRODUCTS;
    return (
      <section className="section"><div className="wrap">
        <SectionHead eyebrow={eyebrow} title={title} link={link} />
        <div className={"prod-grid" + (cols === 3 ? " cols-3" : "")}>
          {list.map((p, i) => (
            <FadeUp key={p.id} delay={(i % 4) * 60}><ProductCard p={p} onOpen={onOpen} fmt={fmt} /></FadeUp>
          ))}
        </div>
      </div></section>
    );
  }

  /* ---------------- EDITORIAL / LOOKBOOK ---------------- */
  function Editorial({ img, eyebrow, title, body, cta, onShop }) {
    return (
      <section className="editorial">
        <div className="band">
          <Img className="bg" src={img} alt="Editorial campaign" position="50% 28%" />
          <div className="veil" />
          <div className="inner">
            <div className="eyebrow" style={{ color: "#f0d9c6" }}>{eyebrow}</div>
            <h2 className="h-display">{title}</h2>
            <p>{body}</p>
            <div><button className="btn btn-ghost-light" onClick={onShop}>{cta} {I.arrow({ width: 15 })}</button></div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- FEATURE / ABOUT ---------------- */
  function About({ flip }) {
    return (
      <section className="section"><div className="wrap">
        <div className={"feature" + (flip ? " flip" : "")}>
          <FadeUp className="media">
            <Img src={D.ABOUT.img} alt="Inside the atelier" className="main" position="50% 25%" />
            <div className="badge"><div className="b1">18k</div><div className="b2">Solid gold</div></div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="eyebrow">Our atelier</div>
            <h2 className="h-display">Made by hand,<br/>made to last.</h2>
            <p className="body">Every Artita piece begins as recycled 18k gold and ends in the hands of a single goldsmith in our Lisbon atelier. No mass production, no shortcuts — only slow, deliberate craft. The result is jewelry with real weight and warmth, the kind you reach for every morning and never want to take off.</p>
            <button className="btn btn-outline">Discover the craft {I.arrow({ width: 15 })}</button>
            <div className="signoff" style={{ marginTop: 26 }}>— The Artita atelier</div>
          </FadeUp>
        </div>
      </div></section>
    );
  }

  /* ---------------- THE DIFFERENCE ---------------- */
  function Difference({ withImage }) {
    return (
      <section className="section diff"><div className="wrap">
        <SectionHead eyebrow="The Artita difference" title="Why it's worth it" />
        <div className="diff-layout">
          {withImage !== false && <FadeUp className="media"><Img src={D.DIFFERENCE.img} alt="Artita craftsmanship" position="50% 25%" /></FadeUp>}
          <FadeUp delay={100}>
            <div className="cmp">
              <div className="cmp-head">
                <span className="c-lbl">What matters</span>
                <span className="c-art">Artita</span>
                <span className="c-oth">Others</span>
              </div>
              {D.DIFFERENCE.rows.map((r, i) => (
                <div className="cmp-row" key={i}>
                  <span className="feat">{r[0]}</span>
                  <span className="cell art">{I.check({ className: "ic" })}</span>
                  <span className="cell oth">{I.close({ className: "ic", style: { width: 16, height: 16, opacity: .55 } })}<span>&nbsp;{r[1]}</span></span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div></section>
    );
  }

  /* ---------------- REVIEWS ---------------- */
  function Reviews() {
    return (
      <section className="section"><div className="wrap">
        <SectionHead eyebrow="Loved by thousands" title="In their words" center />
        <div className="reviews-grid">
          {D.REVIEWS.map((r, i) => (
            <FadeUp key={i} delay={i * 90}><div className="rev-card">
              <div className="stars">{"★★★★★".slice(0, r.stars)}</div>
              <div className="text">“{r.text}”</div>
              <div className="who"><b>{r.name}</b> · {r.loc}</div>
            </div></FadeUp>
          ))}
        </div>
      </div></section>
    );
  }

  /* ---------------- INSTAGRAM WALL ---------------- */
  function Instagram() {
    return (
      <section className="section" style={{ paddingBottom: 0 }}><div className="wrap">
        <div className="ig-head">
          <div className="eyebrow">@artitagallery</div>
          <h2 className="h-display">Worn in the world</h2>
        </div>
        <div className="ig-grid">
          {D.IG.map((src, i) => (
            <a key={i}><Img src={src} alt={"Instagram " + (i + 1)} /><span className="ig-ic">{I.ig({ width: 26 })}</span></a>
          ))}
        </div>
      </div></section>
    );
  }

  /* ---------------- NEWSLETTER ---------------- */
  function Newsletter() {
    const [ok, setOk] = useState(false);
    return (
      <section className="section news"><div className="wrap"><div className="inner">
        <div className="eyebrow">Join the list</div>
        <h2>First look, first access.</h2>
        <p>Subscribe for early access to new collections, atelier stories and a little something for your first order.</p>
        <form className="field" onSubmit={(e) => { e.preventDefault(); setOk(true); }}>
          <input type="email" placeholder="Your email address" required />
          <button className="btn btn-solid" type="submit">{ok ? "Subscribed ✓" : "Subscribe"}</button>
        </form>
      </div></div></section>
    );
  }

  Object.assign(window, { HeroFull, HeroSplit, HeroGrid, Categories, ProductGrid, Editorial, About, Difference, Reviews, Instagram, Newsletter });
})();


/* ============================================================
   ARTITA GALLERY — Product Detail Page
   ============================================================ */
(function () {
  const { useState } = React;
  const D = window.ARTITA;
  const fmt = D.fmt;

  function Accordion({ title, defaultOpen, children }) {
    const [open, setOpen] = useState(!!defaultOpen);
    return (
      <div className={"item" + (open ? " open" : "")}>
        <button className="q" onClick={() => setOpen(o => !o)}>
          <span>{title}</span><span className="pm">{open ? "–" : "+"}</span>
        </button>
        <div className="a"><div className="a-inner">{children}</div></div>
      </div>
    );
  }

  function PDP({ onAdd, onOpen, onHome }) {
    const p = D.PDP;
    const [active, setActive] = useState(0);
    const [metal, setMetal] = useState("gold");
    const [size, setSize] = useState("7");
    const [qty, setQty] = useState(1);
    const [wish, setWish] = useState(false);

    const related = D.PRODUCTS.filter(x => x.id !== p.id).slice(0, 3);

    return (
      <div className="pdp"><div className="wrap">
        <div className="crumb">
          {p.crumb.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">{I.arrow({ width: 12 })}</span>}
              {i === p.crumb.length - 1 ? <b>{c}</b> : <a onClick={i === 0 ? onHome : undefined} style={{ cursor: i === 0 ? "pointer" : "default" }}>{c}</a>}
            </React.Fragment>
          ))}
        </div>

        <div className="pdp-layout">
          {/* GALLERY */}
          <div>
            <div className="gallery">
              {p.gallery.map((src, i) => (
                <div className="cell" key={i}><Img src={src} alt={p.name + " view " + (i + 1)} /></div>
              ))}
            </div>
            {/* mobile gallery */}
            <div className="gallery-m">
              <div className="stagebox"><Img src={p.gallery[active]} alt={p.name} /></div>
              <div className="thumbs">
                {p.gallery.map((src, i) => (
                  <button key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)}><Img src={src} alt="" /></button>
                ))}
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="pdp-info">
            <div className="eyebrow">{p.cat}</div>
            <h1>{p.name}</h1>
            <div className="price">{fmt(p.price)}</div>
            <p className="desc">{p.desc}</p>

            <div className="opt-label"><span>Metal — {p.metals.find(m => m.key === metal).label}</span></div>
            <div className="metal-row">
              {p.metals.map(m => (
                <button key={m.key} className={"metal" + (metal === m.key ? " active" : "")} onClick={() => setMetal(m.key)}>
                  <span className={"sw " + m.key} /><span>{m.label}</span>
                </button>
              ))}
            </div>

            <div className="opt-label"><span>Size — {size}</span><span className="sizeguide">Size guide</span></div>
            <div className="size-row">
              {p.sizes.map(s => {
                const sold = p.soldOut.includes(s);
                return <button key={s} className={"size" + (size === s ? " active" : "") + (sold ? " sold" : "")} onClick={() => !sold && setSize(s)} disabled={sold}>{s}</button>;
              })}
            </div>

            <div className="buy-row">
              <div className="qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>–</button>
                <span className="n">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="btn btn-solid add-cart" onClick={() => onAdd({ id: p.id, name: p.name, price: p.price, img: p.gallery[0], metal: p.metals.find(m => m.key === metal).label, size, qty })}>
                Add to cart — {fmt(p.price * qty)}
              </button>
              <button className={"wish" + (wish ? " on" : "")} onClick={() => setWish(w => !w)} aria-label="Wishlist">
                {wish ? I.heartF({ width: 20 }) : I.heart({ width: 20 })}
              </button>
            </div>

            <div className="trust-row">
              <div className="t">{I.ship({ className: "ic" })} Free insured shipping</div>
              <div className="t">{I.shield({ className: "ic" })} Lifetime warranty</div>
              <div className="t">{I.gift({ className: "ic" })} Gift packaging</div>
            </div>

            <div className="accord">
              <Accordion title="Product details" defaultOpen>
                <div className="detail-table">
                  {p.details.map((d, i) => (
                    <div className="r" key={i}><span className="k">{d[0]}</span><span>{d[1]}</span></div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="Shipping & returns">{p.shipping}</Accordion>
              <Accordion title="Care guide">Store your piece in the linen pouch provided, away from moisture and perfume. Polish gently with the included cloth. Solid gold loves to be worn — the more you wear it, the better it looks.</Accordion>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="related">
          <ProductGrid eyebrow="You may also love" title="Complete the look" link="View all" onOpen={onOpen} items={related} cols={3} />
        </div>
      </div></div>
    );
  }

  window.PDP = PDP;
})();



/* ============================================================
   STANDALONE APP — responsive, hostable (home + PDP, cart)
   ============================================================ */
(function () {
  const { useState, useRef, useEffect } = React;
  const D = window.ARTITA;
  const fmt = D.fmt;
  const LOGO = "Artita";
  const MARQ = ["Complimentary insured shipping worldwide", "Free resizing for life", "Handcrafted in solid 14k gold", "30 days, free returns"];

  function useResponsive() {
    const q = "(max-width: 820px)";
    const [m, setM] = useState(window.matchMedia(q).matches);
    useEffect(() => {
      const mq = window.matchMedia(q);
      const h = (e) => setM(e.matches);
      mq.addEventListener ? mq.addEventListener("change", h) : mq.addListener(h);
      return () => { mq.removeEventListener ? mq.removeEventListener("change", h) : mq.removeListener(h); };
    }, []);
    return m;
  }

  function Cart({ open, items, onClose, onRemove }) {
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    return (<React.Fragment>
      <div className={"scrim" + (open ? " show" : "")} onClick={onClose} />
      <div className={"drawer" + (open ? " show" : "")}>
        <div className="d-head"><h3>Your bag ({items.reduce((s, i) => s + i.qty, 0)})</h3><button className="ic" onClick={onClose} aria-label="Close">{I.close({ width: 22 })}</button></div>
        <div className="d-body">
          {items.length === 0
            ? <div className="empty">Your bag is empty.<br />Discover something you'll keep forever.</div>
            : items.map((it, i) => (
              <div className="line-item" key={i}>
                <Img src={it.img} alt={it.name} />
                <div style={{ flex: 1 }}>
                  <div className="li-nm h-head">{it.name}</div>
                  <div className="li-meta">{it.metal} · Size {it.size} · Qty {it.qty}</div>
                  <div className="li-pr">{fmt(it.price * it.qty)}</div>
                  <button className="rm" onClick={() => onRemove(i)}>Remove</button>
                </div>
              </div>
            ))}
        </div>
        {items.length > 0 && (
          <div className="d-foot">
            <div className="sub"><span>Subtotal</span><b>{fmt(total)}</b></div>
            <div className="note">Shipping & taxes calculated at checkout.</div>
            <button className="btn btn-solid" style={{ width: "100%" }}>Checkout {I.arrow({ width: 15 })}</button>
          </div>
        )}
      </div>
    </React.Fragment>);
  }

  function Home({ go }) {
    return (<React.Fragment>
      <Marquee items={MARQ} />
      <Header logo={LOGO} cartCount={go.count} onCart={go.cart} onHome={go.home} />
      <HeroSplit onShop={go.shop} onPdp={go.pdp} />
      <Categories variant="strip" />
      <ProductGrid eyebrow="Just landed" title="New arrivals" link="Shop all" onOpen={go.open} cols={3} />
      <Difference />
      <Editorial img={D.EDITORIAL.blush} eyebrow="The edit" title="Bold by design." body="Statement gold for those who'd rather be remembered. Explore the pieces from our latest edit." cta="Shop the edit" onShop={go.shop} />
      <Reviews />
      <Instagram />
      <Newsletter />
      <Footer logo={LOGO} />
    </React.Fragment>);
  }

  function App() {
    const isMobile = useResponsive();
    const [route, setRoute] = useState("home");
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const toastT = useRef(null);

    useEffect(() => { window.scrollTo(0, 0); }, [route]);

    function addToCart(item) {
      setCart(c => {
        const idx = c.findIndex(x => x.id === item.id && x.size === item.size && x.metal === item.metal);
        if (idx >= 0) { const n = [...c]; n[idx] = { ...n[idx], qty: n[idx].qty + item.qty }; return n; }
        return [...c, item];
      });
      setCartOpen(true);
    }
    function fireToast(msg) { setToast(msg); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToast(null), 2600); }

    const go = {
      count: cart.reduce((s, i) => s + i.qty, 0),
      home: () => setRoute("home"),
      shop: () => setRoute("home"),
      pdp: () => setRoute("pdp"),
      open: () => setRoute("pdp"),
      cart: () => setCartOpen(true)
    };
    const onAdd = (item) => { addToCart(item); fireToast(item.name + " added to your bag"); };

    const page = route === "pdp"
      ? (<React.Fragment>
          <Header logo={LOGO} cartCount={go.count} onCart={go.cart} onHome={go.home} />
          <PDP onAdd={onAdd} onOpen={() => setRoute("pdp")} onHome={() => setRoute("home")} />
          <Footer logo={LOGO} />
        </React.Fragment>)
      : <Home go={go} />;

    return (
      <DeviceCtx.Provider value={isMobile}>
        <div className={"site" + (isMobile ? " is-mobile" : "")}>
          {page}
          <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={(i) => setCart(c => c.filter((_, j) => j !== i))} />
          <div className={"toast" + (toast ? " show" : "")}>{I.check({ width: 16 })}{toast}</div>
        </div>
      </DeviceCtx.Provider>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
