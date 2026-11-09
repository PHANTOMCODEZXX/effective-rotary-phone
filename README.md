# Kaeti Enterprises — founder portfolio site

A single-page, dependency-free portfolio site for Kaeti, founder of Kaeti Enterprises, a social
media marketing studio working with small and medium businesses.

Built as static HTML, CSS, and vanilla JavaScript. No build step, no framework, no tracking scripts.
Deploy the folder as-is.

---

## 1. Run it locally

Any static file server works. From the repo root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with Node:

```bash
npx serve .
```

Opening `index.html` directly from the filesystem also works, though a local server is closer to
production.

---

## 2. Project structure

```
.
├── index.html              # page markup and all fixed copy
├── assets/
│   ├── css/styles.css      # design tokens + every component style
│   ├── js/
│   │   ├── content.js      # ← the only file you edit to add real data
│   │   └── main.js         # rendering, navigation, form validation
│   └── img/favicon.svg
└── README.md
```

---

## 3. Adding real content

All factual content lives in **`assets/js/content.js`**. It ships empty on purpose — the build never
invents a stat, a metric, a client name, or a testimonial.

### How empty slots behave

| Slot | When it is empty |
| --- | --- |
| `stats` | The hero stat row is not rendered at all |
| `caseStudies` | The Results section, its nav link, and the "See results" CTA stay hidden; the hero's secondary CTA points to Services instead |
| `testimonials` | The Testimonials section and its nav link stay hidden |
| `instagram` | The Instagram section stays hidden until `url` is set |
| `direct` | Each contact row (email / WhatsApp / Calendly) appears only when filled |
| `social` | Each footer icon appears only when filled; the mobile WhatsApp button only appears with a WhatsApp URL |
| `formEndpoint` | The form shows a success state instead of sending (see section 5) |

### Examples

Uncomment and edit these inside `content.js`.

```js
/* Hero stats — only figures you can verify */
stats: [
  { value: "50+", label: "brands managed" },
  { value: "1.2M+", label: "reach generated" },
],

/* Case studies — every field is optional except one */
caseStudies: [{
  industry: "Beauty retail",
  challenge: "Paid social was spending without a clear offer.",
  action: "Rebuilt the offer, then tested three hooks a week for 60 days.",
  metrics: [
    { value: "+312%", label: "engagement in 90 days" },
    { value: "-38%", label: "cost per enquiry" },
  ],
}],

/* Testimonials — quote only, or quote plus attribution */
testimonials: [{
  quote: "The first month of content finally sounded like our shop.",
  name: "Client name",
  business: "Business name",
}],

instagram: { handle: "yourhandle", url: "https://instagram.com/yourhandle", followers: "8.4K" },
direct:    { email: "hello@example.com", whatsapp: "https://wa.me/254700000000", calendly: "https://calendly.com/you/call" },
social:    { instagram: "…", tiktok: "…", whatsapp: "…" },
```

Values render exactly as written — no rounding, no "estimated" labels, no generated placeholders.

### Previewing the hidden sections

The Results, Testimonials, and Instagram layouts are built and tested — they are simply not
rendered while their data is empty. To look at them before you have real data:

1. Open `assets/js/content.js`.
2. Temporarily paste the example objects above (or any clearly-labelled test values).
3. Reload the page. Delete them again before launch — never ship sample metrics or quotes.

Because the sections are driven entirely by that file, there is no separate "demo mode" that could
accidentally go live.

### Editing fixed copy

| What | Where |
| --- | --- |
| Page title, meta description, social preview text | `index.html`, `<head>` |
| Founder name, role line, tagline, hero CTAs | `index.html`, hero section |
| About story and pull-quote | `index.html`, About section |
| Service names, promises, deliverables, expectations | `index.html`, Services section |
| Process steps | `index.html`, Process section |
| Contact headline, form labels, success message | `index.html`, Contact section |
| Footer line, copyright | `index.html`, footer |
| Colours, type, spacing, radii | `assets/css/styles.css`, `:root` block |
| Founder name | `index.html` — title, meta description, JSON-LD, header, hero, portrait caption, About copy, footer and copyright (find and replace `Kaeti`) |
| Secondary hero CTA | Falls back to "Explore services" while no case studies exist; switches to "See results" automatically once `caseStudies` has an entry |
| Structured data (JSON-LD) | `index.html`, near the end of `<head>` |

---

## 4. Using a real portrait

The hero ships with a branded gradient card because no photo was supplied — the brief rules out
stock or generated photos of people.

To swap in a real portrait, replace the `<figure class="portrait">` block in the hero with:

```html
<figure class="portrait">
  <img class="portrait__img" src="assets/img/kaeti.jpg"
       alt="Kaeti, founder of Kaeti Enterprises"
       width="800" height="1000" fetchpriority="high">
</figure>
```

The commented instructions sit directly above that block in `index.html`. Keep the alt text
descriptive, keep `width`/`height` set to avoid layout shift, and compress the file (WebP or a
quality-80 JPEG is plenty).

---

## 5. Wiring the contact form

With `formEndpoint` empty, submitting the form shows the success panel and sends nothing. The
panel also displays a small "demo mode" notice so an unconnected form can never quietly swallow a
real enquiry. The handler is marked with a `TODO` in `assets/js/main.js`.

To connect a real backend:

1. Create a form endpoint (Formspree, Basin, Netlify Forms, or your own handler).
2. Paste the URL into `formEndpoint` in `assets/js/content.js`.
3. Confirm the endpoint accepts `POST` with `Content-Type: application/json`.

The JSON body looks like:

```json
{
  "name": "…",
  "email": "…",
  "instagram": "…",
  "service": "social-media-management | content-creation | paid-advertising",
  "message": "…"
}
```

Existing protections: required-field validation with inline errors, `aria-invalid` and focus
management, a honeypot field for bots, and a graceful error message if the request fails. Add
server-side validation too — client-side validation is a convenience, not a security control.

---

## 6. Deploying

The site is static, so any host works.

- **Netlify / Vercel:** drag the folder in, or connect the repo. No build command, publish directory `.`
- **GitHub Pages:** push to the default branch, then enable Pages for the repository root
- **Cloudflare Pages / S3 / nginx:** upload the folder as-is

After deploying, do a final pass:

- [ ] Fill in `direct`, `social`, and `instagram` links in `content.js`
- [ ] Set `formEndpoint` (or leave the stub and remove the form if you prefer email only)
- [ ] Add real portrait, or keep the branded gradient card
- [ ] Add real stats, case studies, and testimonials — or leave the sections hidden
- [ ] Update the page title, meta description, and JSON-LD with the live domain
- [ ] Add an `og:image` (1200×630) and set `og:url` once the domain is known

---

## 7. Design system

| Token | Value | Use |
| --- | --- | --- |
| `--cream-50` | `#FDFAF5` | Page background |
| `--cream-100` | `#F8F1E7` | Alternating section bands |
| `--plum-950` | `#1F0C1A` | Contact + footer background |
| `--plum-700` | `#4A2140` | Primary buttons, headings accents |
| `--gold-500` | `#C09542` | Decorative rules, icons, accents |
| `--gold-ink` | `#7C5710` | Gold text on light backgrounds (AA) |

- **Type:** Sora for headings, Inter for body, both with system fallbacks. Loaded from Google Fonts
  with `display=swap`. To remove the third-party request entirely, delete the two `<link rel="preconnect">`
  tags and the Google Fonts `<link>` in `index.html` and self-host the two families in `assets/fonts/`
  — the CSS already falls back to system sans-serifs in the meantime.
- **Scale:** fluid `clamp()` sizes from 375px upward; body copy is 16–17px with 1.65–1.75 line height.
- **Layout:** 1200px max width, 8px spacing scale, 12–16px radii, subtle shadows.
- **Contrast:** body text is 7.8:1 on cream, 12.7:1 on plum, and gold accents are 5.3:1 — all past
  WCAG AA. Re-check if you change the palette.

Changing the palette is mostly a matter of editing the colour tokens in `:root` — components
reference the tokens rather than raw hex values.

---

## 8. Behaviour and accessibility notes

- Sticky header that condenses on scroll; hamburger panel under 900px with Escape-to-close, outside
  click, scroll lock, and focus handling.
- Smooth anchor scrolling via CSS, with `scroll-margin-top` so headings clear the sticky header.
  Disabled automatically under `prefers-reduced-motion`.
- Scroll-triggered reveals are progressive enhancement: content is visible without JavaScript.
- Skip link, semantic landmarks (`header`, `nav`, `main`, `section`, `footer`, `aside`), one `h1`,
  labelled form fields, visible focus rings on both light and dark surfaces.
- The floating WhatsApp button is inside a labelled `aside` landmark and only renders on screens
  under 900px with a configured link.
- Sections with no real data are omitted entirely rather than filled with examples.

Verified with: `html-validate` (recommended + document + a11y rules) and axe-core (WCAG 2.1 A/AA +
best practice) in both the empty-content and populated-content states — zero violations.

---

## 9. Browser support

Current Chrome, Edge, Firefox, and Safari, plus iOS Safari 15+. The only modern-CSS dependencies are
`clamp()`, `aspect-ratio`, `backdrop-filter`, and `overflow: clip`; each degrades gracefully where
unsupported. JavaScript is required only for the data-driven sections, the mobile menu, and the form.
