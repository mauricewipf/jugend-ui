# Contributing

Thanks for your interest in Jugend UI!

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page and [http://localhost:3000/autumn](http://localhost:3000/autumn) for the component showcase.

## Project structure

| Path | Description |
|------|-------------|
| `/app` | Next.js App Router pages |
| `/components/ui` | shadcn/ui components with Jugendstil variants |
| `/assets` | Shared static assets (fonts, showcase photos) |
| `/public/autumn`, `/public/winter` | Seasonal SVG frame assets served at runtime |
| `/lib/showcase-content.ts` | Shared demo data for season showcase pages |
| `/registry.json` | shadcn registry source |
| `/public/r` | Built registry JSON (`bun run registry:build`) |

## Adding or changing a component

1. Edit the component under `components/ui/`.
2. Add or update the matching SVG frame in `public/<season>/` if needed.
3. Update `registry.json` with the component metadata.
4. Rebuild the registry: `bun run registry:build`.
5. Update the landing page install snippet in `app/page.tsx` if the featured component changes.
6. Run `bun run lint` and `bun run build`.

## Optional dev tooling

Generate new SVG frames locally with QuiverAI:

```bash
cp .env.local.example .env
# Add QUIVERAI_API_KEY to .env
bun run generate-svg
```

## Pull requests

- Keep changes focused.
- Ensure lint and build pass.
- Include screenshots for visual changes when helpful.
