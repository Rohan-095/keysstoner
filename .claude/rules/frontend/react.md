# Frontend — React (Vite)

## Folder Layout

```
src/
  components/     # one file per component, PascalCase
  data/           # config.js + one file per content type (services.js, faqs.js, …)
  pages/          # one file per route (Home.jsx, About.jsx, …)
  utils/          # pure functions: formatCurrency, buildWhatsAppLink, etc.
```

## Component Checklist

**Always scaffold these for every project:**
`Navbar` · `Hero` · `Services` · `Reviews` · `ContactForm` · `Footer` · `WhatsAppButton` · `FloatingCallButton`

**Add only when the client requests it:**
`BookingForm` · `QuoteCalculator` · `CRMDashboard`

## Key Patterns

**WhatsApp links** — always built via a util, never hardcoded inline:
```js
// src/utils/buildWhatsAppLink.js
export const buildWhatsAppLink = (phone, msg) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
```

**Currency / timezone** — use `Intl.NumberFormat` and `Intl.DateTimeFormat`. No external library.

**Config** — phone, email, business name, default WhatsApp message go in `src/data/config.js` as named exports. Never scattered across components.

**State** — `useState` + `useEffect` for local UI state. No Redux/Zustand unless the project spans 5+ pages with genuinely shared state.

## Supabase (CRM)

When CRM is needed, leads table minimum schema:
```sql
id, name, phone, email, address, service, message, created_at
```
Always use the Supabase client from a single `src/utils/supabase.js` import — never initialise it twice.

## AI Integration

When AI is needed, use `claude-sonnet-4-6` as the default model.
Keep the system prompt in `src/data/aiConfig.js`, not inside the component.
