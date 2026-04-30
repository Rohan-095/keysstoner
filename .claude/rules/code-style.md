# Code Style Rules

## The Single Rule That Covers Most Cases

If a future developer would have to ask "why is this here?" — it either needs a comment explaining the non-obvious reason, or it should be deleted.

## Styling

- Tailwind CSS only. No inline `style` props, no CSS modules, no styled-components.
- Mobile-first — every component must work at 375 px before you widen it.
- If a design decision required a choice (e.g., why this color), document it in `src/data/config.js` as a named constant, not a magic value buried in JSX.

## Structure

- One component = one responsibility. If you find yourself writing "and also" when describing what a component does, split it.
- All static content (service lists, FAQs, pricing tiers, coverage areas, testimonials) lives in `src/data/`. Never hardcode display strings directly in JSX.
- Prefer flat component trees. Avoid prop-drilling more than 2 levels — lift state or co-locate it instead.

## What to Avoid

- Overengineering: don't introduce context, reducers, or state libraries unless the app genuinely has cross-page shared state.
- Premature abstraction: three similar components are fine; abstract only when a fourth would appear.
- Dead code: remove it. Don't comment it out.
