"use client"

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0 data-horizontal:w-full data-vertical:self-stretch",
  {
    variants: {
      variant: {
        default:
          "bg-border data-horizontal:h-px data-vertical:w-px",
        autumn:
          "border-0 bg-transparent data-horizontal:h-auto data-vertical:h-full data-vertical:w-auto [&_img]:block [&_img]:h-auto [&_img]:w-full data-vertical:[&_img]:h-full data-vertical:[&_img]:w-auto data-vertical:[&_img]:rotate-90",
        winter:
          "border-0 bg-transparent data-horizontal:h-auto data-vertical:h-full data-vertical:w-auto [&_img]:block [&_img]:h-auto [&_img]:w-full data-vertical:[&_img]:h-full data-vertical:[&_img]:w-auto data-vertical:[&_img]:rotate-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Separator({
  className,
  variant = "default",
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>) {
  if (variant === "autumn" || variant === "winter") {
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
