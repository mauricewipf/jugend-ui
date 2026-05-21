import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "relative isolate overflow-hidden rounded-md bg-muted/70 animate-pulse",
  {
    variants: {
      variant: {
        default: "",
        circle: "rounded-full",
        text: "rounded-sm",
        outline_j:
          "relative isolate overflow-visible border-0 bg-transparent animate-none before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-[52px] before:border-solid before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(40/120*100%)_calc(50/200*100%)_fill] before:[border-image-source:url('/skeleton-frame.svg')] rounded-none",
      },
      size: {
        default: "",
        sm: "h-3",
        md: "h-4",
        lg: "h-6",
        xl: "h-8",
        "2xl": "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Skeleton({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants> & {
    children?: React.ReactNode
  }) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      data-size={size}
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    >
      {/* Shimmer overlay for default variants */}
      {variant !== "outline_j" && (
        <div
          className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden="true"
        />
      )}
      {/* Content area for outline_j — children render inside the decorative frame */}
      {variant === "outline_j" && children && (
        <div className="relative z-10 flex flex-col gap-3 px-10 pt-8 pb-6">
          {children}
        </div>
      )}
    </div>
  )
}

export { Skeleton, skeletonVariants }
