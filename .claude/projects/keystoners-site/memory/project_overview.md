# Project Overview — Keystoners Exterior Cleaning

## Business

**Keystoners** is an exterior property cleaning company based in **Vancouver, BC, Canada**, serving the Lower Mainland. Contact: +1 250-317-1366 (also WhatsApp via `wa.me/12503171366`).

## Services

| Service | Starting Price | Duration |
|---|---|---|
| Roof Soft Wash | $349 | 2–4 hrs |
| Gutter Cleaning | $149 | 1–2 hrs |
| House Washing | $299 | 2–3 hrs |
| Pressure Washing | $199 | 1–3 hrs |
| Window Cleaning | $179 | 1–2 hrs |
| Maintenance Plans | $499/yr | Ongoing |

Coverage: Vancouver, Burnaby, Richmond, Surrey, Langley, Coquitlam, New Westminster, North Vancouver, West Vancouver, Delta, Maple Ridge, Port Coquitlam.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router |
| UI | React 19 + Tailwind CSS v4 |
| Icons | lucide-react |
| Hosting | Vercel |

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Current Goals (Priority Order)

1. Mobile responsiveness fixes ← in progress
2. Refactor `app/page.js` into components under `app/components/`
3. Quote calculator (service + size → price range)
4. Booking/contact form (opens WhatsApp pre-filled)
5. WhatsApp + call floating buttons always visible

## Future Roadmap (Not Started)

```
Customer fills form
  → /api/leads saves to Supabase
    → AI voice agent (Vapi or Retell) calls customer
      → Webhook saves transcript to Supabase
        → Admin dashboard shows leads + call outcomes
```

## Current Code Structure

Everything is in `app/page.js` (single large client component).

Key internals:
- `T` object — all design tokens (colours/gradients). Never use raw hex.
- `buildWA(msg)` — WhatsApp URL builder. `PHONE_RAW = "12503171366"`.
- Static arrays at top: `heroSlides`, `services`, `reviews`, `faqs`, `coverage`, `marqueeItems`
- Reusable: `Reveal` (scroll animation), `GlowBtn` (CTA button with gold/wa/ghost variants)
- Mix of Tailwind classes and inline styles — do not consolidate unless touching a component

## Refactor Target Structure

```
app/
  components/
    Navbar.jsx
    HeroSlider.jsx
    Services.jsx
    QuoteCalculator.jsx
    BookingForm.jsx
    Reviews.jsx
    FAQ.jsx
    Footer.jsx
    FloatingButtons.jsx
    data/             ← static arrays moved here
  page.js             ← layout only, imports components
```
