import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const jugendBase =
  "relative isolate max-w-full cursor-pointer overflow-visible border-0 bg-transparent rounded-none hover:-translate-y-0.5 hover:before:drop-shadow-xs active:translate-y-0 active:scale-[0.99] focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current/75 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid transition-all"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",

        // Version 1: Classic Botanical Frame (button-frame-1.svg)
        autumn: `${jugendBase} text-[#2C1E0F] hover:before:brightness-[0.97] before:border-[16px] sm:before:border-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(31/113*100%)_calc(31/180*100%)_fill] before:[border-image-source:url('/autumn/button-frame-1.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,
        winter: `${jugendBase} text-[#14283D] hover:before:brightness-[0.97] before:border-[16px] sm:before:border-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(31/113*100%)_calc(31/180*100%)_fill] before:[border-image-source:url('/winter/button-frame-1.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,
        spring: `${jugendBase} text-[#1F3114] hover:before:brightness-[0.97] before:border-[16px] sm:before:border-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(31/113*100%)_calc(31/180*100%)_fill] before:[border-image-source:url('/spring/button-frame-1.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,
        summer: `${jugendBase} text-[#2E1E04] hover:before:brightness-[0.97] before:border-[16px] sm:before:border-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(31/113*100%)_calc(31/180*100%)_fill] before:[border-image-source:url('/summer/button-frame-1.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,

        // Version 2: Grand Salon Flourish Frame (duplicated & enhanced button-frame-v2.svg)
        "autumn-flourish": `${jugendBase} text-[#2C1E0F] hover:before:brightness-[0.97] before:border-y-[16px] before:border-x-[22px] sm:before:border-y-[18px] sm:before:border-x-[24px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(34/127*100%)_calc(46/200*100%)_fill] before:[border-image-source:url('/autumn/button-frame-v2.svg')] min-h-11 sm:min-h-12 py-2.5 not-data-[size^=icon]:px-7! sm:not-data-[size^=icon]:px-9!`,
        "winter-flourish": `${jugendBase} text-[#14283D] hover:before:brightness-[0.97] before:border-y-[16px] before:border-x-[22px] sm:before:border-y-[18px] sm:before:border-x-[24px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(34/127*100%)_calc(46/200*100%)_fill] before:[border-image-source:url('/winter/button-frame-v2.svg')] min-h-11 sm:min-h-12 py-2.5 not-data-[size^=icon]:px-7! sm:not-data-[size^=icon]:px-9!`,
        "spring-flourish": `${jugendBase} text-[#1F3114] hover:before:brightness-[0.97] before:border-y-[16px] before:border-x-[22px] sm:before:border-y-[18px] sm:before:border-x-[24px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(34/127*100%)_calc(46/200*100%)_fill] before:[border-image-source:url('/spring/button-frame-v2.svg')] min-h-11 sm:min-h-12 py-2.5 not-data-[size^=icon]:px-7! sm:not-data-[size^=icon]:px-9!`,
        "summer-flourish": `${jugendBase} text-[#2E1E04] hover:before:brightness-[0.97] before:border-y-[16px] before:border-x-[22px] sm:before:border-y-[18px] sm:before:border-x-[24px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(34/127*100%)_calc(46/200*100%)_fill] before:[border-image-source:url('/summer/button-frame-v2.svg')] min-h-11 sm:min-h-12 py-2.5 not-data-[size^=icon]:px-7! sm:not-data-[size^=icon]:px-9!`,

        // Version 3: Vienna Secession Chamfered Frame (button-frame-secession.svg)
        "autumn-secession": `${jugendBase} text-[#2C1E0F] hover:before:brightness-[0.97] before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/autumn/button-frame-secession.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-6!`,
        "winter-secession": `${jugendBase} text-[#14283D] hover:before:brightness-[0.97] before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/winter/button-frame-secession.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-6!`,
        "spring-secession": `${jugendBase} text-[#1F3114] hover:before:brightness-[0.97] before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/spring/button-frame-secession.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-6!`,
        "summer-secession": `${jugendBase} text-[#2E1E04] hover:before:brightness-[0.97] before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/summer/button-frame-secession.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-6!`,

        // Version 4: Gilded Primary CTA Frame (button-frame-gilded.svg — WCAG AA+ ink contrast)
        "autumn-gilded": `${jugendBase} text-[#160D03] font-semibold hover:brightness-106 before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/autumn/button-frame-gilded.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,
        "winter-gilded": `${jugendBase} text-[#0B1826] font-semibold hover:brightness-106 before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/winter/button-frame-gilded.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,
        "spring-gilded": `${jugendBase} text-[#0F1A08] font-semibold hover:brightness-106 before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/spring/button-frame-gilded.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,
        "summer-gilded": `${jugendBase} text-[#1E1301] font-semibold hover:brightness-106 before:border-[12px] sm:before:border-[14px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/64*100%)_calc(20/180*100%)_fill] before:[border-image-source:url('/summer/button-frame-gilded.svg')] min-h-11 sm:min-h-10 not-data-[size^=icon]:px-5! sm:not-data-[size^=icon]:px-7!`,
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-3 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xl: "h-11 gap-2 px-4 text-[0.925rem] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xxl: "h-12 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-9 sm:size-9",
        "icon-xs":
          "size-7 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
