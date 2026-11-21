import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const jugendBadgeBase =
  "relative isolate min-h-7 py-1 overflow-visible rounded-none border-0 bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:[border-image-repeat:stretch]"

const badgeVariants = cva(
  "h-5 gap-1.5 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",

        // Version 1: Botanical Cartouche Tag (badge-frame-1.svg)
        autumn: `${jugendBadgeBase} h-auto px-4! has-data-[icon=inline-start]:pl-4! has-data-[icon=inline-end]:pr-4! text-[#2C1E0F] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/autumn/badge-frame-1.svg')]`,
        winter: `${jugendBadgeBase} h-auto px-4! has-data-[icon=inline-start]:pl-4! has-data-[icon=inline-end]:pr-4! text-[#14283D] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/winter/badge-frame-1.svg')]`,
        spring: `${jugendBadgeBase} h-auto px-4! has-data-[icon=inline-start]:pl-4! has-data-[icon=inline-end]:pr-4! text-[#1F3114] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/spring/badge-frame-1.svg')]`,
        summer: `${jugendBadgeBase} h-auto px-4! has-data-[icon=inline-start]:pl-4! has-data-[icon=inline-end]:pr-4! text-[#2E1E04] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/summer/badge-frame-1.svg')]`,

        // Version 2: Vienna Secession Chamfered Lozenge (badge-frame-2.svg)
        "autumn-secession": `${jugendBadgeBase} h-auto px-3.5! has-data-[icon=inline-start]:pl-3.5! has-data-[icon=inline-end]:pr-3.5! text-[#2C1E0F] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/40*100%)_calc(16/120*100%)_fill] before:[border-image-source:url('/autumn/badge-frame-2.svg')]`,
        "winter-secession": `${jugendBadgeBase} h-auto px-3.5! has-data-[icon=inline-start]:pl-3.5! has-data-[icon=inline-end]:pr-3.5! text-[#14283D] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/40*100%)_calc(16/120*100%)_fill] before:[border-image-source:url('/winter/badge-frame-2.svg')]`,
        "spring-secession": `${jugendBadgeBase} h-auto px-3.5! has-data-[icon=inline-start]:pl-3.5! has-data-[icon=inline-end]:pr-3.5! text-[#1F3114] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/40*100%)_calc(16/120*100%)_fill] before:[border-image-source:url('/spring/badge-frame-2.svg')]`,
        "summer-secession": `${jugendBadgeBase} h-auto px-3.5! has-data-[icon=inline-start]:pl-3.5! has-data-[icon=inline-end]:pr-3.5! text-[#2E1E04] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/40*100%)_calc(16/120*100%)_fill] before:[border-image-source:url('/summer/badge-frame-2.svg')]`,

        // Version 3: Gilded Swallowtail Ribbon Seal (badge-frame-3.svg)
        "autumn-ribbon": `${jugendBadgeBase} h-auto px-4.5! has-data-[icon=inline-start]:pl-4.5! has-data-[icon=inline-end]:pr-4.5! font-semibold text-[#1E1306] before:border-y-[8px] before:border-x-[12px] before:[border-image-slice:calc(12/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/autumn/badge-frame-3.svg')]`,
        "winter-ribbon": `${jugendBadgeBase} h-auto px-4.5! has-data-[icon=inline-start]:pl-4.5! has-data-[icon=inline-end]:pr-4.5! font-semibold text-[#0E1E2E] before:border-y-[8px] before:border-x-[12px] before:[border-image-slice:calc(12/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/winter/badge-frame-3.svg')]`,
        "spring-ribbon": `${jugendBadgeBase} h-auto px-4.5! has-data-[icon=inline-start]:pl-4.5! has-data-[icon=inline-end]:pr-4.5! font-semibold text-[#12200A] before:border-y-[8px] before:border-x-[12px] before:[border-image-slice:calc(12/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/spring/badge-frame-3.svg')]`,
        "summer-ribbon": `${jugendBadgeBase} h-auto px-4.5! has-data-[icon=inline-start]:pl-4.5! has-data-[icon=inline-end]:pr-4.5! font-semibold text-[#1E1301] before:border-y-[8px] before:border-x-[12px] before:[border-image-slice:calc(12/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/summer/badge-frame-3.svg')]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
