import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

const framedBase =
  "relative isolate min-w-0 overflow-visible border-0 bg-transparent ring-0 rounded-none [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid"

const cardVariants = cva(
  "ring-foreground/10 bg-card text-card-foreground min-w-0 gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
  {
    variants: {
      variant: {
        default: "",

        // Version 1: Classic Whiplash Botanical Card (isotropic corner ratio 58/50 -> 54/46 & 88/76)
        autumn: `${framedBase} text-[#2C1E0F] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/autumn/card-frame.svg')] px-8 pt-9 pb-8 sm:px-13 sm:pt-12 sm:pb-11 has-data-[slot=card-footer]:pb-8 sm:has-data-[slot=card-footer]:pb-11`,
        winter: `${framedBase} text-[#14283D] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/winter/card-frame.svg')] px-8 pt-9 pb-8 sm:px-13 sm:pt-12 sm:pb-11 has-data-[slot=card-footer]:pb-8 sm:has-data-[slot=card-footer]:pb-11`,
        spring: `${framedBase} text-[#1F3114] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/spring/card-frame.svg')] px-8 pt-9 pb-8 sm:px-13 sm:pt-12 sm:pb-11 has-data-[slot=card-footer]:pb-8 sm:has-data-[slot=card-footer]:pb-11`,
        summer: `${framedBase} text-[#2E1E04] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/summer/card-frame.svg')] px-8 pt-9 pb-8 sm:px-13 sm:pt-12 sm:pb-11 has-data-[slot=card-footer]:pb-8 sm:has-data-[slot=card-footer]:pb-11`,

        // Version 2: Salon Passe-Partout Lunette Card (duplicated & enhanced seasonal card-frame-v2.svg)
        "autumn-salon": `${framedBase} text-[#2C1E0F] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/autumn/card-frame-v2.svg')] px-8 pt-10 pb-9 sm:px-14 sm:pt-14 sm:pb-12 has-data-[slot=card-footer]:pb-9 sm:has-data-[slot=card-footer]:pb-12`,
        "winter-salon": `${framedBase} text-[#14283D] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/winter/card-frame-v2.svg')] px-8 pt-10 pb-9 sm:px-14 sm:pt-14 sm:pb-12 has-data-[slot=card-footer]:pb-9 sm:has-data-[slot=card-footer]:pb-12`,
        "spring-salon": `${framedBase} text-[#1F3114] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/spring/card-frame-v2.svg')] px-8 pt-10 pb-9 sm:px-14 sm:pt-14 sm:pb-12 has-data-[slot=card-footer]:pb-9 sm:has-data-[slot=card-footer]:pb-12`,
        "summer-salon": `${framedBase} text-[#2E1E04] before:border-y-[46px] before:border-x-[54px] sm:before:border-y-[76px] sm:before:border-x-[88px] before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/211*100%)_calc(58/147.4*100%)_fill] before:[border-image-source:url('/summer/card-frame-v2.svg')] px-8 pt-10 pb-9 sm:px-14 sm:pt-14 sm:pb-12 has-data-[slot=card-footer]:pb-9 sm:has-data-[slot=card-footer]:pb-12`,

        // Version 3: Vienna Secession Quadratstil Card (card-frame-secession.svg, 1.00 isotropic)
        "autumn-secession": `${framedBase} text-[#2C1E0F] before:border-[28px] sm:before:border-[36px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(40/180*100%)_calc(40/180*100%)_fill] before:[border-image-source:url('/autumn/card-frame-secession.svg')] p-7 sm:p-9 has-data-[slot=card-footer]:pb-7 sm:has-data-[slot=card-footer]:pb-9`,
        "winter-secession": `${framedBase} text-[#14283D] before:border-[28px] sm:before:border-[36px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(40/180*100%)_calc(40/180*100%)_fill] before:[border-image-source:url('/winter/card-frame-secession.svg')] p-7 sm:p-9 has-data-[slot=card-footer]:pb-7 sm:has-data-[slot=card-footer]:pb-9`,
        "spring-secession": `${framedBase} text-[#1F3114] before:border-[28px] sm:before:border-[36px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(40/180*100%)_calc(40/180*100%)_fill] before:[border-image-source:url('/spring/card-frame-secession.svg')] p-7 sm:p-9 has-data-[slot=card-footer]:pb-7 sm:has-data-[slot=card-footer]:pb-9`,
        "summer-secession": `${framedBase} text-[#2E1E04] before:border-[28px] sm:before:border-[36px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(40/180*100%)_calc(40/180*100%)_fill] before:[border-image-source:url('/summer/card-frame-secession.svg')] p-7 sm:p-9 has-data-[slot=card-footer]:pb-7 sm:has-data-[slot=card-footer]:pb-9`,

        // Teaser poster cards
        "autumn-teaser":
          "relative isolate border-0 bg-transparent text-[#2C1E0F] ring-0 rounded-none aspect-[150/218] bg-[url('/autumn/card-teaser.svg')] bg-contain bg-center bg-no-repeat justify-center gap-0 py-0 pl-[12%] pr-[27%]",
        "winter-teaser":
          "relative isolate border-0 bg-transparent text-[#14283D] ring-0 rounded-none aspect-[150/218] bg-[url('/winter/card-teaser.svg')] bg-contain bg-center bg-no-repeat justify-center gap-0 py-0 pl-[12%] pr-[27%]",
        "spring-teaser":
          "relative isolate border-0 bg-transparent text-[#1F3114] ring-0 rounded-none aspect-[150/218] bg-[url('/spring/card-teaser.svg')] bg-contain bg-center bg-no-repeat justify-center gap-0 py-0 pl-[12%] pr-[27%]",
        "summer-teaser":
          "relative isolate border-0 bg-transparent text-[#2E1E04] ring-0 rounded-none aspect-[150/218] bg-[url('/summer/card-teaser.svg')] bg-contain bg-center bg-no-repeat justify-center gap-0 py-0 pl-[12%] pr-[27%]",
      },
      size: {
        default: "",
        sm: "data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function isTeaserVariant(variant: string | null | undefined) {
  return Boolean(variant && variant.endsWith("-teaser"))
}

function isFramedJugendVariant(variant: string | null | undefined) {
  return Boolean(variant && variant !== "default" && !isTeaserVariant(variant))
}

function Card({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  const jugendLayout = isTeaserVariant(variant)
    ? "teaser"
    : isFramedJugendVariant(variant)
      ? "framed"
      : undefined

  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      data-jugend={jugendLayout}
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-data-[jugend=framed]/card:rounded-none group-data-[jugend=framed]/card:px-0 group-data-[jugend=framed]/card:pt-0 group-data-[jugend=teaser]/card:rounded-none group-data-[jugend=teaser]/card:p-0",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({
  className,
  align = "left",
  ...props
}: React.ComponentProps<"div"> & { align?: "left" | "center" | "right" }) {
  return (
    <div
      data-slot="card-title"
      data-align={align}
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm data-[align=left]:text-left data-[align=center]:text-center data-[align=right]:text-right group-data-[jugend=framed]/card:text-2xl group-data-[jugend=framed]/card:tracking-wide",
        ambrosia.variable,
        "group-data-[jugend=framed]/card:[font-family:var(--font-ambrosia),serif]",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-muted-foreground text-sm group-data-[jugend=framed]/card:text-current/75",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-4 group-data-[size=sm]/card:px-3 group-data-[jugend=framed]/card:px-0",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3 flex flex-wrap items-center gap-2 group-data-[variant=default]/card:bg-muted/50 group-data-[jugend=framed]/card:rounded-none group-data-[jugend=framed]/card:border-0 group-data-[jugend=framed]/card:px-0 group-data-[jugend=framed]/card:pt-2 group-data-[jugend=framed]/card:pb-0",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
}
