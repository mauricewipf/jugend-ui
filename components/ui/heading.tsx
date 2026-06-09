import { cva, type VariantProps } from "class-variance-authority"
import dynamic from "next/dynamic"
import * as React from "react"

import { cn } from "@/lib/utils"

import type { HeadingLevel } from "./heading-jugend"

const JugendHeading = dynamic(() =>
  import("./heading-jugend").then((mod) => ({ default: mod.JugendHeading }))
)

const headingVariants = cva("", {
  variants: {
    variant: {
      default: "",
      jugend: "",
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
} & VariantProps<typeof headingVariants> &
  React.ComponentPropsWithoutRef<"h1">

function Heading({
  level,
  variant = "default",
  className,
  ...props
}: HeadingProps) {
  if (variant === "jugend") {
    return (
      <JugendHeading level={level} className={className} {...props} />
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
