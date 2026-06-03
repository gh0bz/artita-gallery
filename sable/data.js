/* ====== Artita Gallery — shared data (classic script, attaches to window) ====== */
(function () {
  var A = "/assets/img/";
  var IMG = {
    model:     A + "model-layered.png",  // model wearing layered necklaces + band ring (wide)
    flatset:   A + "flatlay-set.png",    // bronze dish: bezel necklace + solitaire ring + stones (square)
    neckSlab:  A + "necklace-slab.png",  // petite bezel diamond necklace on slab (square)
    neckDish:  A + "necklace-dish.png",  // double-chain bezel necklace in dish (square)
    neckNavy:  A + "necklace-navy.png",  // double-chain bezel necklace on navy linen (square)
    band:      A + "band-square.png",    // slim gold band w/ flush diamond (square)
    bandWide:  A + "band-wide.png",      // slim gold band, wide macro
    trillion:  A + "trillion-ring.png",  // hammered band w/ trillion diamond (square)
    trillionSet: A + "trillion-set.png", // trillion ring + trillion pendant flatlay (square)
    collage:   A + "collage.png"         // 4-up edit: ring + initial disc + pavé band + sapphire drop
  };

  var PRODUCTS = [
    { id: "petite",   name: "Petite Diamond Necklace", cat: "Necklaces", price: 290, img: IMG.neckSlab, tag: "Bestseller" },
    { id: "lumiere",  name: "Lumière Diamond Band",    cat: "Rings",     price: 390, img: IMG.band,     tag: "New" },
    { id: "double",   name: "Double Chain Necklace",   cat: "Necklaces", price: 340, img: IMG.neckDish },
    { id: "solis",    name: "Solis Bezel Ring",        cat: "Rings",     price: 450, img: IMG.flatset },
    { id: "midnight", name: "Midnight Diamond Necklace",cat: "Necklaces", price: 320, img: IMG.neckNavy },
    { id: "aurelia",  name: "Aurelia Slim Band",       cat: "Rings",     price: 360, img: IMG.bandWide, tag: "New" },
    { id: "trillion", name: "Trillion Hammered Band",   cat: "Rings",     price: 480, img: IMG.trillion, tag: "New" },
    { id: "vela",     name: "Vela Trillion Pendant",    cat: "Necklaces", price: 330, img: IMG.trillionSet }
  ];

  var PDP = {
    id: "lumiere",
    name: "Lumière Diamond Band",
    cat: "Rings",
    price: 390,
    crumb: ["Home", "Catalog", "Rings", "Lumière Diamond Band"],
    desc: "A slim, hand-finished band in solid gold, set flush with a single brilliant-cut diamond. Soft to the touch with a brushed-matte surface, the Lumière is designed to be worn alone or stacked — the kind of everyday piece you forget you have on, until someone notices.",
    gallery: [IMG.band, IMG.bandWide, IMG.flatset, IMG.model],
    metals: [
      { key: "gold",   label: "14k Gold" },
      { key: "silver", label: "Sterling Silver" }
    ],
    sizes: ["5", "6", "7", "8", "9", "10"],
    soldOut: ["10"],
    details: [
      ["Material", "Solid 14k recycled gold"],
      ["Finish", "Hand-brushed matte"],
      ["Band width", "2.0 mm"],
      ["Stone", "0.03 ct natural diamond, flush-set"],
      ["Origin", "Handcrafted in our Lisbon atelier"]
    ],
    shipping: "Complimentary insured shipping worldwide, dispatched within 1–3 business days with tracking. Enjoy 30 days for free returns and exchanges, plus complimentary resizing for life. Each piece arrives in our signature linen-wrapped box."
  };

  var CATEGORIES = [
    { name: "Rings",             count: 24, img: IMG.band },
    { name: "Necklaces",         count: 31, img: IMG.neckSlab },
    { name: "Everyday Diamonds", count: 18, img: IMG.neckNavy },
    { name: "Gifting",           count: 12, img: IMG.flatset }
  ];

  var DIFFERENCE = {
    rows: [
      ["Solid 14k & recycled gold",        "Gold-plated brass"],
      ["Conflict-free, traceable diamonds","Unverified sourcing"],
      ["Handcrafted in small batches",     "Mass-produced overseas"],
      ["Free resizing & repairs for life", "30-day window, then it's yours"],
      ["Transparent, fair pricing",        "Inflated retail mark-ups"]
    ],
    img: IMG.flatset
  };

  var REVIEWS = [
    { name: "Eloise R.",  loc: "London",     stars: 5, text: "The weight and finish are extraordinary — it feels like an heirloom, not an online purchase. I haven't taken it off in three months." },
    { name: "Naomi A.",   loc: "New York",   stars: 5, text: "Resized for free, arrived in the most beautiful box, and the gold is genuinely warm. Worth every penny." },
    { name: "Clara V.",   loc: "Copenhagen", stars: 5, text: "Understated and impossibly elegant. I bought one for myself and immediately ordered two more as gifts." }
  ];

  var IG = [IMG.model, IMG.trillionSet, IMG.neckSlab, IMG.neckNavy, IMG.trillion, IMG.neckDish];

  var ABOUT = { img: IMG.bandWide, img2: IMG.flatset };

  var EDITORIAL = { wide: IMG.model, blush: IMG.collage, portrait: IMG.neckDish };

  window.ARTITA = {
    IMG: IMG, PRODUCTS: PRODUCTS, PDP: PDP, CATEGORIES: CATEGORIES,
    DIFFERENCE: DIFFERENCE, REVIEWS: REVIEWS, IG: IG, ABOUT: ABOUT, EDITORIAL: EDITORIAL,
    fmt: function (n) { return "$" + n.toLocaleString("en-US"); }
  };
})();
