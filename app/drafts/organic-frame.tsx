"use client"

import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

import {
  buildDraftFramePaths,
  type ColorToken,
  DRAFT_PALETTES,
  type DraftPalette,
  type DraftStyleId,
  type FrameScale,
  type PaletteId,
} from "./frame-geometry"

function resolveColorToken(
  token: ColorToken | undefined,
  palette: DraftPalette
): string {
  switch (token) {
    case "ink":
      return palette.stroke
    case "stem":
      return palette.stem
    case "leaf":
      return palette.leaf
    case "petalPrimary":
      return palette.petalPrimary
    case "petalSecondary":
      return palette.petalSecondary
    case "center":
      return palette.center
    case "none":
    default:
      return "none"
  }
}

function useElementSize<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  fallback: { width: number; height: number }
) {
  const [size, setSize] = React.useState(fallback)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        setSize((prev) =>
          Math.abs(prev.width - rect.width) < 0.5 &&
          Math.abs(prev.height - rect.height) < 0.5
            ? prev
            : { width: rect.width, height: rect.height }
        )
      }
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return size
}

interface FrameOverlayProps {
  styleId: DraftStyleId
  paletteId: PaletteId
  width: number
  height: number
  scale: FrameScale
  hovered?: boolean
  emphasized?: boolean
  forceTopCrest?: boolean
  forceSideFlourish?: boolean
  onMetaChange?: (meta: {
    hasTopCrest: boolean
    hasSideFlourish: boolean
    hasBottomCrest: boolean
  }) => void
}

function FrameSvgOverlay({
  styleId,
  paletteId,
  width,
  height,
  scale,
  hovered = false,
  emphasized = false,
  forceTopCrest,
  forceSideFlourish,
  onMetaChange,
}: FrameOverlayProps) {
  const palette = DRAFT_PALETTES[paletteId]
  const paths = React.useMemo(
    () =>
      buildDraftFramePaths(styleId, {
        width,
        height,
        scale,
        forceTopCrest,
        forceSideFlourish,
      }),
    [styleId, width, height, scale, forceTopCrest, forceSideFlourish]
  )

  React.useEffect(() => {
    onMetaChange?.({
      hasTopCrest: paths.hasTopCrest,
      hasSideFlourish: paths.hasSideFlourish,
      hasBottomCrest: paths.hasBottomCrest,
    })
  }, [
    paths.hasTopCrest,
    paths.hasSideFlourish,
    paths.hasBottomCrest,
    onMetaChange,
  ])

  const isDarkPoster = Boolean(palette.isDark)

  const fillColor = emphasized
    ? hovered
      ? isDarkPoster
        ? `${palette.stroke}38`
        : palette.pillBg
      : isDarkPoster
        ? `${palette.stroke}24`
        : palette.pillBg
    : hovered
      ? palette.surfaceHover
      : palette.surface

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <path
        d={paths.fillPath}
        fill={fillColor}
        className="transition-[fill] duration-200"
      />
      {paths.accentFills.map((d, i) => (
        <path
          key={`af-${i}`}
          d={d}
          fill={palette.accentFill}
          fillOpacity={isDarkPoster ? 0.24 : 0.45}
          stroke={palette.stroke}
          strokeWidth={Math.max(0.8, paths.accentStrokeWidth * 0.72)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {paths.accentStrokes.map((d, i) => (
        <path
          key={`as-${i}`}
          d={d}
          fill="none"
          stroke={palette.strokeAccent}
          strokeWidth={paths.accentStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {paths.primaryStrokes.map((d, i) => (
        <path
          key={`ps-${i}`}
          d={d}
          fill="none"
          stroke={palette.stroke}
          strokeWidth={paths.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {paths.solidFills?.map((d, i) => (
        <path
          key={`sf-${i}`}
          d={d}
          fill={palette.stroke}
          stroke="none"
        />
      ))}
      {paths.colorLayers?.map((layer, i) => (
        <path
          key={`cl-${i}`}
          d={layer.d}
          fill={resolveColorToken(layer.fill, palette)}
          fillOpacity={layer.fillOpacity ?? 1}
          stroke={resolveColorToken(layer.stroke, palette)}
          strokeWidth={layer.strokeWidth ?? 1}
          strokeOpacity={layer.strokeOpacity ?? 1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

export interface OrganicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  styleId: DraftStyleId
  paletteId: PaletteId
  scale?: "card" | "tile"
  forceTopCrest?: boolean
  forceSideFlourish?: boolean
  onResponsiveMeta?: (meta: {
    hasTopCrest: boolean
    hasSideFlourish: boolean
    hasBottomCrest: boolean
  }) => void
}

export function OrganicCard({
  styleId,
  paletteId,
  scale = "card",
  forceTopCrest,
  forceSideFlourish,
  onResponsiveMeta,
  className,
  style,
  children,
  ...props
}: OrganicCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const size = useElementSize(
    ref,
    scale === "card"
      ? { width: 520, height: 260 }
      : { width: 220, height: 120 }
  )
  const palette = DRAFT_PALETTES[paletteId]

  return (
    <div
      ref={ref}
      style={{ color: palette.text, ...style }}
      className={cn(
        "relative isolate min-w-0",
        scale === "card"
          ? "px-8 py-8 sm:px-11 sm:py-10"
          : "px-6 py-5",
        className
      )}
      {...props}
    >
      <FrameSvgOverlay
        styleId={styleId}
        paletteId={paletteId}
        width={size.width}
        height={size.height}
        scale={scale}
        forceTopCrest={forceTopCrest}
        forceSideFlourish={forceSideFlourish}
        onMetaChange={onResponsiveMeta}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export interface OrganicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleId: DraftStyleId
  paletteId: PaletteId
  emphasized?: boolean
  size?: "sm" | "md" | "lg"
}

export function OrganicButton({
  styleId,
  paletteId,
  emphasized = false,
  size = "md",
  className,
  style,
  children,
  ...props
}: OrganicButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = React.useState(false)
  const dims = useElementSize(ref, { width: 160, height: 44 })
  const palette = DRAFT_PALETTES[paletteId]

  return (
    <button
      ref={ref}
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: palette.text, ...style }}
      className={cn(
        "relative isolate inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium transition-transform duration-150 select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current/70",
        size === "sm" && "min-h-9 px-5 py-1.5 text-xs",
        size === "md" && "min-h-11 px-7 py-2 text-sm",
        size === "lg" && "min-h-12 px-8 py-2.5 text-sm font-semibold",
        className
      )}
      {...props}
    >
      <FrameSvgOverlay
        styleId={styleId}
        paletteId={paletteId}
        width={dims.width}
        height={dims.height}
        scale="button"
        hovered={hovered}
        emphasized={emphasized}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}

export function OrganicHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={cn(
        ambrosia.variable,
        "[font-family:var(--font-ambrosia),serif] tracking-wide",
        className
      )}
    >
      {children}
    </h3>
  )
}
