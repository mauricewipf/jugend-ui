import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const skeletonVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "animate-pulse rounded-md bg-muted",
      autumn:
        "relative isolate overflow-visible border-0 rounded-none bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-[44px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(50/211*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/autumn/skeleton-frame.svg')] after:absolute after:inset-[44px] after:animate-pulse after:bg-muted after:content-['']",
      winter:
        "relative isolate overflow-visible border-0 rounded-none bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-[44px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(50/211*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/winter/skeleton-frame.svg')] after:absolute after:inset-[44px] after:animate-pulse after:bg-muted after:content-['']",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Skeleton({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
