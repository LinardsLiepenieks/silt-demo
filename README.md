# Halcyon

The landing page of Halcyon, a fictional customer support platform. It's a demo project for Silt: every section is its own component, and the product screens are coded UI rather than images, so each element can be pulled onto a canvas and edited.

```
npm install
npm run dev
```

Screens use hash routes, so any static host works: `#/` landing, `#/sign-in`, `#/sign-up`, `#/onboarding/workspace`, `#/onboarding/channels`, `#/onboarding/team` and `#/inbox` (sends you to sign in when signed out). Auth is front-end only: sign in with `demo@halcyon.app` / `halcyon123`, or sign up with any details. The session and onboarding answers live in browser storage.

Sections live in `src/components/`, their copy and data in `src/content/`, and design tokens in the `@theme` block of `src/index.css`. The hero and the customer journey share one slideshow hook in `src/lib/`. The font (Manrope) is self-hosted through Fontsource, so saved builds render without network access.

Halcyon, its customers and the people quoted are made up.
