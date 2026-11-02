# Tidewell

The landing page of Tidewell, a fictional customer support platform. It's a demo project for Silt: every section is its own component, and the product screens are coded UI rather than images, so each element can be pulled onto a canvas and edited.

```
npm install
npm run dev
```

Sections live in `src/components/`, their copy and data in `src/content/`, and design tokens in the `@theme` block of `src/index.css`. The hero and the customer journey share one slideshow hook in `src/lib/`. The font (Manrope) is self-hosted through Fontsource, so saved builds render without network access.

Tidewell, its customers and the people quoted are made up.
