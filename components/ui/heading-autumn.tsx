/**
 * Autumn variant uses "Nouveau Nostalgia" font.
 * License: Free for personal use, NOT free for commercial use.
 * https://www.1001fonts.com/nouveau-nostalgia-font.html#license
 */
import * as React from "react"

import { nouveauNostalgia } from "@/lib/fonts/nouveau-nostalgia"
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

type AutumnHeadingProps = {
  level: HeadingLevel
} & React.ComponentPropsWithoutRef<"h1">

function AutumnHeading({ level, className, ...props }: AutumnHeadingProps) {
  const Tag = headingTags[level]

  return (
    <Tag
      data-slot="heading"
      data-level={level}
      data-variant="autumn"
      className={cn(nouveauNostalgia.className, className)}
      {...props}
    />
  )
}

export { AutumnHeading, type AutumnHeadingProps, type HeadingLevel }
