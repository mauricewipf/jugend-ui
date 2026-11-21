/**
 * Jugend variant uses Ambrosia font.
 * License: OFL (SIL Open Font License)
 * https://fontlibrary.org/en/font/ambrosia
 */
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const satisfies Record<HeadingLevel, `h${HeadingLevel}`>

type JugendHeadingProps = {
  level: HeadingLevel
  ornament?: "none" | "flourish"
  season?: "autumn" | "spring" | "summer" | "winter"
  dataVariant?: string
} & React.ComponentPropsWithoutRef<"h1">

const seasonOrnamentColors = {
  autumn: { fill: "#AE8746", light: "#D6AC54", stroke: "#473418" },
  spring: { fill: "#78AA48", light: "#A3CF72", stroke: "#2F441B" },
  summer: { fill: "#E0A822", light: "#F7C843", stroke: "#3F2A04" },
  winter: { fill: "#7BA7CC", light: "#A9CDE8", stroke: "#1F3A56" },
} as const

function JugendHeading({
  level,
  ornament = "none",
  season = "autumn",
  dataVariant,
  className,
  children,
  ...props
}: JugendHeadingProps) {
  const Tag = headingTags[level]
  const palette = seasonOrnamentColors[season]

  if (ornament === "flourish") {
    return (
      <Tag
        data-slot="heading"
        data-level={level}
        data-variant={dataVariant ?? "jugend-flourish"}
        className={cn(
          ambrosia.className,
          "inline-flex max-w-full flex-col items-center gap-1.5 tracking-wide",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <svg
          aria-hidden
          viewBox="0 0 220 16"
          preserveAspectRatio="none"
          className="h-4 w-full min-w-28"
          fill="none"
        >
          <path
            d="M4 8 H88 C96 8 101 2.2 110 2.2 C119 2.2 124 8 132 8 H216"
            stroke={palette.stroke}
            strokeWidth="1.15"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M22 8 C46 8 68 13.5 92 10.8 C101 9.8 105 13.5 110 13.5 C115 13.5 119 9.8 128 10.8 C152 13.5 174 8 198 8"
            stroke={palette.fill}
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points="110,2 116,8 110,14 104,8"
            fill={palette.light}
            stroke={palette.stroke}
            strokeWidth="0.9"
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points="12,5.5 15,8 12,10.5 9,8"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points="208,5.5 211,8 208,10.5 205,8"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </Tag>
    )
  }

  return (
    <Tag
      data-slot="heading"
      data-level={level}
      data-variant={dataVariant ?? "jugend"}
      className={cn(ambrosia.className, "tracking-wide", className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export { JugendHeading, type HeadingLevel, type JugendHeadingProps }
