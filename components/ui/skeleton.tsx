import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const skeletonVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "animate-pulse motion-reduce:animate-none rounded-md bg-muted",

      // Version 1: Exhibition Portrait/Panel Skeleton (responsive border-image)
      autumn:
        "relative isolate overflow-visible border-0 rounded-none bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-[24px] sm:before:border-[32px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(50/211*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/autumn/skeleton-frame.svg')] after:absolute after:inset-[22px] sm:after:inset-[29px] after:animate-pulse motion-reduce:after:animate-none after:bg-[#DFCCA8]/75 after:content-['']",
      winter:
        "relative isolate overflow-visible border-0 rounded-none bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-[24px] sm:before:border-[32px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(50/211*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/winter/skeleton-frame.svg')] after:absolute after:inset-[22px] sm:after:inset-[29px] after:animate-pulse motion-reduce:after:animate-none after:bg-[#C6DDEF]/75 after:content-['']",
      spring:
        "relative isolate overflow-visible border-0 rounded-none bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-[24px] sm:before:border-[32px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(50/211*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/spring/skeleton-frame.svg')] after:absolute after:inset-[22px] sm:after:inset-[29px] after:animate-pulse motion-reduce:after:animate-none after:bg-[#CBE3BC]/75 after:content-['']",
      summer:
        "relative isolate overflow-visible border-0 rounded-none bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-[24px] sm:before:border-[32px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(50/211*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/summer/skeleton-frame.svg')] after:absolute after:inset-[22px] sm:after:inset-[29px] after:animate-pulse motion-reduce:after:animate-none after:bg-[#F9E69E]/75 after:content-['']",

      // Version 2: Compact Text-Line & Block Skeleton (before:z-10 sits crisp ABOVE after:z-0 pulse!)
      "autumn-compact":
        "relative isolate overflow-visible border-0 rounded-none bg-[#FBF3E3] min-h-7 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:border-[9px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(18/56*100%)_calc(18/160*100%)] before:[border-image-source:url('/autumn/skeleton-frame-v2.svg')] after:absolute after:inset-[4px] after:z-0 after:animate-pulse motion-reduce:after:animate-none after:bg-[#DEC9A2] after:content-['']",
      "winter-compact":
        "relative isolate overflow-visible border-0 rounded-none bg-[#F2F8FC] min-h-7 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:border-[9px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(18/56*100%)_calc(18/160*100%)] before:[border-image-source:url('/winter/skeleton-frame-v2.svg')] after:absolute after:inset-[4px] after:z-0 after:animate-pulse motion-reduce:after:animate-none after:bg-[#C3DCED] after:content-['']",
      "spring-compact":
        "relative isolate overflow-visible border-0 rounded-none bg-[#F0F9EC] min-h-7 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:border-[9px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(18/56*100%)_calc(18/160*100%)] before:[border-image-source:url('/spring/skeleton-frame-v2.svg')] after:absolute after:inset-[4px] after:z-0 after:animate-pulse motion-reduce:after:animate-none after:bg-[#C8E1B8] after:content-['']",
      "summer-compact":
        "relative isolate overflow-visible border-0 rounded-none bg-[#FFFEF5] min-h-7 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:border-[9px] before:border-solid before:[border-image-repeat:stretch] before:[border-image-slice:calc(18/56*100%)_calc(18/160*100%)] before:[border-image-source:url('/summer/skeleton-frame-v2.svg')] after:absolute after:inset-[4px] after:z-0 after:animate-pulse motion-reduce:after:animate-none after:bg-[#F7E294] after:content-['']",
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
