import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
  {
    variants: {
      variant: {
        default: "",
        autumn: "relative isolate overflow-visible border-0 [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-[88px] before:border-solid before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/209*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/autumn/card-frame.svg')] bg-transparent ring-0 rounded-none px-12 pt-10 pb-8 has-data-[slot=card-footer]:pb-8",
        winter: "relative isolate overflow-visible border-0 [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-[88px] before:border-solid before:[border-image-repeat:round_stretch] before:[border-image-slice:calc(50/209*100%)_calc(56/141*100%)_fill] before:[border-image-source:url('/winter/card-frame.svg')] bg-transparent ring-0 rounded-none px-12 pt-10 pb-8 has-data-[slot=card-footer]:pb-8",
        "autumn-teaser": "relative isolate border-0 bg-transparent ring-0 rounded-none aspect-[150/218] bg-[url('/autumn/card-teaser.svg')] bg-contain bg-center bg-no-repeat justify-center gap-0 py-0 pl-[12%] pr-[27%]",
        "winter-teaser": "relative isolate border-0 bg-transparent ring-0 rounded-none aspect-[150/218] bg-[url('/winter/card-teaser.svg')] bg-contain bg-center bg-no-repeat justify-center gap-0 py-0 pl-[12%] pr-[27%]",
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

function Card({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
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
        "gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-data-[variant=autumn]/card:rounded-none group-data-[variant=autumn]/card:pt-0 group-data-[variant=winter]/card:rounded-none group-data-[variant=winter]/card:pt-0 group-data-[variant=autumn-teaser]/card:rounded-none group-data-[variant=autumn-teaser]/card:p-0 group-data-[variant=winter-teaser]/card:rounded-none group-data-[variant=winter-teaser]/card:p-0",
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
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm data-[align=left]:text-left data-[align=center]:text-center data-[align=right]:text-right",
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
      className={cn("text-muted-foreground text-sm", className)}
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
      className={cn("px-4 group-data-[size=sm]/card:px-3 group-data-[variant=autumn]/card:px-0 group-data-[variant=winter]/card:px-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3 flex items-center group-data-[variant=default]/card:bg-muted/50 group-data-[variant=autumn]/card:rounded-none group-data-[variant=autumn]/card:border-0 group-data-[variant=autumn]/card:pb-6 group-data-[variant=winter]/card:rounded-none group-data-[variant=winter]/card:border-0 group-data-[variant=winter]/card:pb-6", className)}
      {...props}
    />
  )
}

export {
  Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants
}

