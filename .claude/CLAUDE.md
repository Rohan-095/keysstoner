# CLAUDE.md — Keystoners Exterior Cleaning

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Coding rules → `.claude/rules/code-style.md`
React/component patterns → `.claude/rules/frontend/react.md`

---

## What This Project Is

**Keystoners** is an exterior property cleaning website for a Vancouver-based business serving the Lower Mainland. The site generates leads via WhatsApp, phone, and a quote form.

**Business contact:** +1 250-317-1366 | WhatsApp via `wa.me/12503171366`

---

## Current Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router, `'use client'` |
| UI | React 19 + Tailwind CSS v4 |
| Icons | lucide-react |
| Fonts | Geist Sans + Geist Mono via `next/font/google` |
| Hosting | Vercel |

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # must pass before reporting done
npm run lint     # ESLint check
```

---

## Current Goals (Build in This Order)

1. **Mobile responsiveness** — fix layout and overlapping issues at 375 px
2. **Refactor `app/page.js`** — split into separate components under `app/components/`
3. **Quote calculator** — service type + size → instant price range
4. **Booking / contact form** — name, phone, service, city → opens WhatsApp pre-filled
5. **WhatsApp + call buttons** — always visible, floating, easy to tap

---

## Future Architecture (Do NOT Build Yet)

```
Customer fills form
  → Next.js API route (/api/leads) saves lead
    → Supabase (Postgres) stores lead record
      → AI voice agent (Vapi or Retell) auto-calls customer
        → Webhook saves call transcript + summary to Supabase
          → Admin dashboard shows all leads + call outcomes
```

**When building each phase, ask before starting.**

---

## File Structure

Everything currently lives in `app/page.js` — one large client component.

**Refactor target:**
```
app/
  components/
    Navbar.jsx
    HeroSlider.jsx
    Services.jsx
    QuoteCalculator.jsx   ← to build
    BookingForm.jsx       ← to build
    Reviews.jsx
    FAQ.jsx
    Footer.jsx
    FloatingButtons.jsx   ← WhatsApp + Call
  page.js                 ← imports components, keeps page layout only
```

Key patterns inside the current `page.js`:
- `T` — design token object (all colours). Always use, never raw hex.
- `buildWA(msg)` — builds WhatsApp links. `PHONE_RAW` = `12503171366`.
- Static data arrays at the top: `heroSlides`, `services`, `reviews`, `faqs`, `coverage`.
- `Reveal` — scroll-triggered fade/slide component.
- `GlowBtn` — animated CTA button (props: `gold`, `wa`, `ghost`).

---

## Design Rules

- Mobile-first — every change must work at 375 px first
- Tailwind CSS only — no inline styles in new components
- Keep the navy + gold colour scheme (`T.navy`, `T.gold`)
- Do not change existing animations or design tokens

---

## Coding Rules

- Ask before deleting any file
- No overengineering — one task at a time
- `npm run build` must pass before reporting done
- Static data stays in `app/components/data/` when refactoring (not hardcoded in JSX)
