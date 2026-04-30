# Client Project — Quick Start Template

Copy this into `.claude/CLAUDE.md` when starting a new client project.
Fill in the `[ ]` sections from intake. Delete unused lines.

---

## Project

**Business:** [Business name]
**Industry:** [cleaning / mechanic / barber / dentist / restaurant / other]
**Location:** [City, Country]
**Phone:** [+X XXX-XXX-XXXX]
**WhatsApp:** [number without + or spaces, e.g. 12503171366]
**Email:** [email]

## Stack

- Next.js (App Router) + Tailwind CSS + lucide-react
- [ ] Supabase — add when CRM needed
- [ ] Claude API / Vapi — add when AI needed

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # must pass before done
npm run lint
```

## Services

[List services with prices, e.g.:]
- Service A — From $XXX
- Service B — From $XXX

## Features to Build

- [ ] Landing page (Navbar, Hero, Services, Reviews, FAQ, Footer)
- [ ] WhatsApp + call floating buttons
- [ ] Contact / booking form (opens WhatsApp pre-filled)
- [ ] Quote calculator
- [ ] CRM — Supabase lead capture
- [ ] AI voice agent (Vapi / Retell)
- [ ] Admin dashboard

## Folder Structure

```
app/
  components/     ← one file per component
  data/
    config.js     ← phone, WA number, default message
    services.js
    reviews.js
    faqs.js
  api/            ← add routes when backend needed
  page.js
```

## Rules

- Mobile-first (375 px)
- Tailwind only — no inline styles
- Static content in `app/data/`, never hardcoded in JSX
- Ask before deleting files
- Build must pass before reporting done

## Future Roadmap

```
Form → /api/leads → Supabase → AI voice call → transcript → Admin dashboard
```
Build phase by phase. Ask before starting each phase.

---

> Full reference: `MASTER_CLAUDE.md`
