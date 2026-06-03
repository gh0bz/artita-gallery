# Artita Gallery — “Noir” direction

Cool ivory + charcoal · bold split hero

A self-contained, responsive jewelry storefront: a homepage and a working product
detail page (image gallery, size & metal selectors, add-to-cart with a slide-in bag).
This is one of three sibling directions; this folder is everything needed to host **Noir** on its own.

---

## Files

| File | What it is |
|------|------------|
| `index.html` | Entry point. Loads fonts, the stylesheet, the data, and the app. The `<body>` carries the theme class `theme-B`. |
| `styles.css` | All styling — design tokens, layout, components, the product page, cart drawer, and the mobile breakpoint (≤ 820px). |
| `data.js` | All content & catalog data — products, prices, the PDP, categories, reviews, copy, and image paths. **Edit this to change content.** |
| `app.jsx` | The full application — UI components, page sections, product page, routing, and cart logic (React, compiled in the browser by Babel). |
| `assets/img/` | Product & editorial photography referenced by `data.js`. |

> The three content layers are deliberately separated: **`styles.css` (look)**, **`data.js` (content)**, **`app.jsx` (behaviour)**.

---

## Hosting

This is a static site — host it anywhere that serves files over HTTP (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3, any web server). Drag the folder in, or:

```bash
# from inside this folder, for a quick local preview:
npx serve .
# then open the printed http://localhost:… URL
```

It **must be served over http(s)**, not opened as a `file://` path — the app code is
loaded over the network. Every real host does this for you.

### Suggested subdomain
`artita-noir.yourdomain.com`

---

## Editing content

Open **`data.js`** — no build step, no framework knowledge needed:

- **Products / prices** → the `PRODUCTS` array (`name`, `cat`, `price`, `img`, optional `tag`).
- **Product page** → the `PDP` object (gallery images, description, sizes, metals, spec table, shipping copy).
- **Categories, reviews, the “Difference” comparison, the Instagram wall** → their matching objects.
- **Images** → drop files into `assets/img/` and point the path at them. Recommended export: long edge ≥ 1200px, sRGB JP? PNG both fine. Product cards crop to 4:5; hero/editorial bleed full.
- **Currency** → the `fmt` helper at the bottom of `data.js`.

## Changing the look

Open **`styles.css`** and edit the `.theme-B` token block near the top
(`--bg`, `--accent`, `--font-display`, etc.). Everything else reads from those variables.

---

## Notes for the developer taking this to production

- The app uses in-browser Babel for zero-config hosting. For a production build you’d
  pre-compile `app.jsx` (e.g. with esbuild/Vite) and swap to React production bundles —
  the component code ports over unchanged.
- Routing is in-memory (Home ⇄ Product). Wire to real URLs / a router when integrating
  with a commerce backend (Shopify, commercetools, etc.).
- Cart is client-side state for the prototype; connect `addToCart` / Checkout to your platform.
- Photography in `assets/img/` is the client’s supplied imagery.

© 2026 Artita Gallery.
