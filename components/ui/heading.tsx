import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

import { JugendHeading, type HeadingLevel } from "./heading-jugend"

const plaqueBase =
  "relative isolate inline-flex max-w-full items-center justify-center overflow-visible border-0 bg-transparent px-8 py-3 text-center sm:px-11 sm:py-3.5 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[16px] before:border-x-[24px] sm:before:border-y-[20px] sm:before:border-x-[30px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(24/72*100%)_calc(36/240*100%)_fill]"

const headingVariants = cva("", {
  variants: {
    variant: {
      default: "",
      jugend: "",
      "jugend-flourish": "",
      "autumn-plaque": `${plaqueBase} text-[#2C1E0F] before:[border-image-source:url('/autumn/heading-frame-1.svg')]`,
      "winter-plaque": `${plaqueBase} text-[#14283D] before:[border-image-source:url('/winter/heading-frame-1.svg')]`,
      "spring-plaque": `${plaqueBase} text-[#1F3114] before:[border-image-source:url('/spring/heading-frame-1.svg')]`,
      "summer-plaque": `${plaqueBase} text-[#2E1E04] before:[border-image-source:url('/summer/heading-frame-1.svg')]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const satisfies Record<HeadingLevel, `h${HeadingLevel}`>

type HeadingProps = {
  level: HeadingLevel
  season?: "autumn" | "spring" | "summer" | "winter"
} & VariantProps<typeof headingVariants> &
  React.ComponentPropsWithoutRef<"h1">

function Heading({
  level,
  variant = "default",
  season = "autumn",
  className,
  ...props
}: HeadingProps) {
  if (variant === "jugend") {
    return (
      <JugendHeading
        level={level}
        dataVariant="jugend"
        className={className}
        {...props}
      />
    )
  }

  if (variant === "jugend-flourish") {
    return (
      <JugendHeading
        level={level}
        ornament="flourish"
        season={season}
        dataVariant="jugend-flourish"
        className={className}
        {...props}
      />
    )
  }

  if (variant && variant.endsWith("-plaque")) {
    return (
      <JugendHeading
        level={level}
        dataVariant={variant}
        className={cn(headingVariants({ variant }), className)}
        {...props}
      />
    )
  }

  const Tag = headingTags[level]

  return (
    <Tag
      data-slot="heading"
      data-level={level}
      data-variant={variant}
      className={cn(headingVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Heading, headingVariants, type HeadingLevel, type HeadingProps }
