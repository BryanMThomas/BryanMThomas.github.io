# bryan-thomas.com

Interactive embedding-space portfolio for Bryan Thomas — React, Vite, Three.js, Tailwind.
Every point in the hero is a real Gemini embedding (3072-d) projected to 3D with PCA.

Deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## Develop

```sh
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # serve the production build
```

## Scripts

```sh
npm run optimize:images           # regenerate WebP images + PWA icons from PNG sources
python scripts/build_embeddings.py   # recompute node embeddings -> src/data.json
```
