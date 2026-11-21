"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Separator as SeparatorPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const ruleBase =
  "relative isolate border-0 bg-transparent data-horizontal:h-6 data-horizontal:w-full data-vertical:w-0.5 data-vertical:min-h-12 data-vertical:h-full data-vertical:bg-current/55 data-horizontal:before:pointer-events-none data-horizontal:before:absolute data-horizontal:before:inset-0 data-horizontal:before:border-solid data-horizontal:before:border-y-0 data-horizontal:before:border-x-[44px] sm:data-horizontal:before:border-x-[56px] data-horizontal:before:[border-image-repeat:stretch] data-horizontal:before:[border-image-slice:0_calc(56/300*100%)_0_calc(56/300*100%)_fill]"

const separatorVariants = cva(
  "shrink-0 data-horizontal:w-full data-vertical:self-stretch",
  {
    variants: {
      variant: {
        default: "bg-border data-horizontal:h-px data-vertical:w-px",

        // Version 1: Classic Full-Width Ornamental Frieze (separator.svg)
        autumn:
          "border-0 bg-transparent data-horizontal:h-auto data-vertical:h-full data-vertical:w-auto [&_img]:block [&_img]:h-auto [&_img]:w-full data-vertical:[&_img]:h-full data-vertical:[&_img]:w-auto data-vertical:[&_img]:rotate-90",
        winter:
          "border-0 bg-transparent data-horizontal:h-auto data-vertical:h-full data-vertical:w-auto [&_img]:block [&_img]:h-auto [&_img]:w-full data-vertical:[&_img]:h-full data-vertical:[&_img]:w-auto data-vertical:[&_img]:rotate-90",
        spring:
          "border-0 bg-transparent data-horizontal:h-auto data-vertical:h-full data-vertical:w-auto [&_img]:block [&_img]:h-auto [&_img]:w-full data-vertical:[&_img]:h-full data-vertical:[&_img]:w-auto data-vertical:[&_img]:rotate-90",
        summer:
          "border-0 bg-transparent data-horizontal:h-auto data-vertical:h-full data-vertical:w-auto [&_img]:block [&_img]:h-auto [&_img]:w-full data-vertical:[&_img]:h-full data-vertical:[&_img]:w-auto data-vertical:[&_img]:rotate-90",

        // Version 2: Slice-Safe Finial Rule (duplicated & edited separator-v2.svg — constant-height finials at all screen widths)
        "autumn-rule": `${ruleBase} before:[border-image-source:url('/autumn/separator-v2.svg')]`,
        "winter-rule": `${ruleBase} before:[border-image-source:url('/winter/separator-v2.svg')]`,
        "spring-rule": `${ruleBase} before:[border-image-source:url('/spring/separator-v2.svg')]`,
        "summer-rule": `${ruleBase} before:[border-image-source:url('/summer/separator-v2.svg')]`,

        // Version 3: Centered Jugendstil Fleuron Medallion Divider (horizontal & vertical)
        "autumn-fleuron":
          "flex items-center gap-3 bg-transparent text-[#AE8746] data-horizontal:h-6 data-vertical:flex-col data-vertical:w-6 data-vertical:h-full",
        "winter-fleuron":
          "flex items-center gap-3 bg-transparent text-[#7BA7CC] data-horizontal:h-6 data-vertical:flex-col data-vertical:w-6 data-vertical:h-full",
        "spring-fleuron":
          "flex items-center gap-3 bg-transparent text-[#78AA48] data-horizontal:h-6 data-vertical:flex-col data-vertical:w-6 data-vertical:h-full",
        "summer-fleuron":
          "flex items-center gap-3 bg-transparent text-[#E0A822] data-horizontal:h-6 data-vertical:flex-col data-vertical:w-6 data-vertical:h-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function FleuronMedallion({
  variant,
  vertical,
}: {
  variant: string
  vertical: boolean
}) {
  const strokeColor = variant.startsWith("winter")
    ? "#1F3A56"
    : variant.startsWith("spring")
      ? "#2F441B"
      : variant.startsWith("summer")
        ? "#3F2A04"
        : "#473418"

  return (
    <svg
      aria-hidden
      viewBox="0 0 64 20"
      className={cn("h-5 w-16 shrink-0", vertical && "rotate-90")}
      fill="none"
    >
      <path
        d="M2 10 C10 10 14 4 21 5 C25 5.6 27 8 32 10 C27 12 25 14.4 21 15 C14 16 10 10 2 10 Z"
        fill="currentColor"
        stroke={strokeColor}
        strokeWidth="0.8"
      />
      <path
        d="M62 10 C54 10 50 4 43 5 C39 5.6 37 8 32 10 C37 12 39 14.4 43 15 C50 16 54 10 62 10 Z"
        fill="currentColor"
        stroke={strokeColor}
        strokeWidth="0.8"
      />
      <polygon
        points="32,3 38,10 32,17 26,10"
        fill="currentColor"
        stroke={strokeColor}
        strokeWidth="0.9"
      />
      <circle
        cx="32"
        cy="10"
        r="2.2"
        fill="#FFFDF8"
        stroke={strokeColor}
        strokeWidth="0.7"
      />
    </svg>
  )
}

function Separator({
  className,
  variant = "default",
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>) {
  if (
    variant === "autumn" ||
    variant === "winter" ||
    variant === "spring" ||
    variant === "summer"
  ) {
    const src = `/${variant}/separator.svg`

    return (
      <SeparatorPrimitive.Root
        data-slot="separator"
        data-variant={variant}
        decorative={decorative}
        orientation={orientation}
        className={cn(separatorVariants({ variant }), className)}
        {...props}
      >
        <img src={src} alt="" aria-hidden />
      </SeparatorPrimitive.Root>
    )
  }

  if (variant && variant.endsWith("-fleuron")) {
    const isVertical = orientation === "vertical"
    return (
      <SeparatorPrimitive.Root
        data-slot="separator"
        data-variant={variant}
        decorative={decorative}
        orientation={orientation}
        className={cn(separatorVariants({ variant }), className)}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "flex-1 opacity-80",
            isVertical
              ? "w-[1.5px] bg-gradient-to-b from-transparent via-current to-current"
              : "h-[1.5px] bg-gradient-to-r from-transparent via-current to-current"
          )}
        />
        <FleuronMedallion variant={variant} vertical={isVertical} />
        <span
          aria-hidden
          className={cn(
            "flex-1 opacity-80",
            isVertical
              ? "w-[1.5px] bg-gradient-to-t from-transparent via-current to-current"
              : "h-[1.5px] bg-gradient-to-l from-transparent via-current to-current"
          )}
        />
      </SeparatorPrimitive.Root>
    )
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant={variant}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
