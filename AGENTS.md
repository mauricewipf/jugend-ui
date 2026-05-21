# jugend-ui - An Art Nouveau / Jugendstil UI Component Library

## Project Overview

**jugend-ui** is an **Art Nouveau (Jugendstil) styled UI component library** built with Next.js 16. The project is a design system showcase and component library featuring decorative, ornamental design elements inspired by the Art Nouveau movement of the late 19th and early 20th centuries.

The name "Jugend" refers to the German term for the Art Nouveau style (Jugendstil), characterized by organic forms, flowing curves, and nature-inspired decorative motifs.

This is a **design system showcase**, not a production application - it exists to demonstrate and showcase Art Nouveau-styled UI components.

## Tech Stack

- **Framework**: Next.js 16.1.6 with React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Primitives**: Radix UI 1.4.3 + Base UI 1.1.0
- **Icons**: Lucide React
- **Fonts**: Geist (Vercel), Inter, OpenDyslexic (accessibility)
- **Package Manager**: Bun (evidenced by `bun.lock`)

## Architecture

### App Router Structure
```
app/
├── layout.tsx      # Root layout with font imports and metadata
├── page.tsx        # Main page rendering ComponentExample
└── globals.css     # Global styles and CSS variables
```

### Component Organization
```
components/
├── ui/                     # Core UI components (button, card, input, etc.)
├── example.tsx            # Example wrapper components
└── component-example.tsx  # Main showcase component

lib/
└── utils.ts              # Utility functions (cn for class merging)
```

## shadcn/ui Configuration

The project uses shadcn/ui with the following configuration (`components.json`):
- **Style**: `radix-nova` (modern Radix-based components)
- **Base Color**: `neutral`
- **CSS Variables**: Enabled
- **Icon Library**: `lucide`

## Working with Components

### Standard UI Components

All UI components are located in `components/ui/` and follow shadcn/ui patterns:
- Use `class-variance-authority` (CVA) for variant management
- Support Tailwind CSS class merging via `cn()` utility
- Use Radix UI primitives for accessibility and behavior

### Art Nouveau / Jugendstil Theme

This is the **core theme of the project** - all components are designed with Art Nouveau (Jugendstil) aesthetics as an option. The project includes custom **"Jugend"** themed components with special variants:

**Button variant `outline_j`:**
```tsx
<Button variant="outline_j" size="xxl">
  Jugendstil Button
</Button>
```

**Card variant `outline_j`:**
```tsx
<Card variant="outline_j">
  {/* Content with decorative SVG border frame */}
</Card>
```

**Key characteristics:**
- Uses decorative SVG border frames (e.g., `card-frame-1.svg` in `/public`)
- Extra-large sizes (`xxl`) for buttons
- Ornamental, nature-inspired aesthetics
- Designed for elegant, artistic presentations

### Component Variants Reference

**Button sizes:**
- `xs`, `sm`, `default`, `lg`, `xl`, `xxl`
- Icon sizes: `icon-xs`, `icon-sm`, `icon`, `icon-lg`

**Button variants:**
- `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`, `outline_j`

**Card variants:**
- `default`, `outline_j`

## Styling Patterns

### Tailwind CSS v4
- Uses new Tailwind v4 syntax with `@import "tailwindcss"`
- Custom CSS variables defined in `app/globals.css`
- Component-specific CSS in component files

### CSS Variables
Color system uses CSS variables (e.g., `--background`, `--foreground`, etc.) defined in `globals.css`.

### The `cn()` Utility
Always use the `cn()` utility from `lib/utils.ts` for class merging:
```tsx
import { cn } from "@/lib/utils"

// In component:
className={cn("base-classes", className)}
```

## Icon Usage

Use Lucide icons exclusively:
```tsx
import { PlusIcon, SettingsIcon } from "lucide-react"

// Icon positioning:
<Button>
  <PlusIcon data-icon="inline-start" />
  Add Item
</Button>

<Button variant="secondary">
  Download
  <DownloadIcon data-icon="inline-end" />
</Button>
```

## Development Workflow

### Run Development Server
```bash
bun dev      # or: npm run dev, yarn dev, pnpm dev
```

### Linting
```bash
bun lint     # Runs ESLint
```

### Build
```bash
bun build    # Production build
```

## Adding New Components

1. Create component in `components/ui/`
2. Use CVA for variant management
3. Export all compound components (e.g., `Card`, `CardHeader`, `CardContent`)
4. Add example usage in `component-example.tsx`
5. Follow existing patterns for Jugendstil variants if applicable

## Generating Art Nouveau SVG Borders

The decorative SVG border frames used in the `outline_j` variants can be generated using AI-powered tools:

### Recommended Tool: Quiver AI

**Quiver AI** provides text-to-SVG generation capabilities perfect for creating Art Nouveau decorative elements:

- **Quickstart Guide**: https://docs.quiver.ai/getting-started/quickstart
- **Text-to-SVG Model**: https://docs.quiver.ai/models/text-to-svg

Use these resources to generate custom decorative SVG frames, ornamental borders, and Jugendstil-inspired design elements for new component variants.

**Note:** The `@quiverai/sdk` package is already installed as a dependency and the API is configured globally. Quiver AI is ready to use immediately without additional setup.

## Accessibility

- OpenDyslexic font included for dyslexia-friendly text
- All components use Radix UI primitives for keyboard navigation and ARIA
- Semantic HTML structure maintained
- `sr-only` classes for icon-only buttons

## Important Notes

- **This is a showcase/demo project** for Art Nouveau styled UI components, not a production application
- The `outline_j` variants require the decorative SVG frames in `/public`
- Always test Jugendstil components at various content lengths (short, medium, long)
- Tailwind CSS v4 uses different configuration patterns than v3

## File Locations

| Resource | Location |
|----------|----------|
| Main page | `app/page.tsx` |
| Layout/Fonts | `app/layout.tsx` |
| Global styles | `app/globals.css` |
| UI components | `components/ui/*.tsx` |
| Example showcase | `components/component-example.tsx` |
| Utility functions | `lib/utils.ts` |
| Public assets | `public/` (SVG frames, images) |
| shadcn config | `components.json` |

## Dependencies to Know

- `@radix-ui/*` - Headless UI primitives
- `@base-ui/react` - Additional base components
- `class-variance-authority` - Variant management
- `tailwind-merge` + `clsx` - Class name utilities
- `lucide-react` - Icons
- `@fontsource/opendyslexic` - Accessibility font
- `@quiverai/sdk` - AI-powered SVG generation for Art Nouveau borders
