import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type EmptyVariant = NonNullable<VariantProps<typeof emptyVariants>["variant"]>

const EmptyVariantContext = React.createContext<EmptyVariant>("default")

const emptyJugendBase =
  "relative isolate min-w-0 border-0 bg-transparent rounded-none [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch]"

const emptyVariants = cva(
  "flex min-w-0 flex-col items-center justify-center gap-3 text-center",
  {
    variants: {
      variant: {
        default: "rounded-xl border border-dashed p-8 sm:p-12",

        // V1: Botanical Arch Alcove (empty-frame-1.svg, slice 44/220 & 44/200)
        autumn: `${emptyJugendBase} text-[#2C1E0F] px-8 py-10 sm:px-12 sm:py-12 before:border-[30px] sm:before:border-[40px] before:[border-image-slice:calc(44/200*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/autumn/empty-frame-1.svg')]`,
        winter: `${emptyJugendBase} text-[#14283D] px-8 py-10 sm:px-12 sm:py-12 before:border-[30px] sm:before:border-[40px] before:[border-image-slice:calc(44/200*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/winter/empty-frame-1.svg')]`,
        spring: `${emptyJugendBase} text-[#1F3114] px-8 py-10 sm:px-12 sm:py-12 before:border-[30px] sm:before:border-[40px] before:[border-image-slice:calc(44/200*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/spring/empty-frame-1.svg')]`,
        summer: `${emptyJugendBase} text-[#2E1E04] px-8 py-10 sm:px-12 sm:py-12 before:border-[30px] sm:before:border-[40px] before:[border-image-slice:calc(44/200*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/summer/empty-frame-1.svg')]`,

        // V2: Salon Passe-Partout Niche
        "autumn-salon": `${emptyJugendBase} text-[#2C1E0F] px-8 py-10 sm:px-12 sm:py-12 before:border-[28px] sm:before:border-[38px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/autumn/empty-frame-salon.svg')]`,
        "winter-salon": `${emptyJugendBase} text-[#14283D] px-8 py-10 sm:px-12 sm:py-12 before:border-[28px] sm:before:border-[38px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/winter/empty-frame-salon.svg')]`,
        "spring-salon": `${emptyJugendBase} text-[#1F3114] px-8 py-10 sm:px-12 sm:py-12 before:border-[28px] sm:before:border-[38px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/spring/empty-frame-salon.svg')]`,
        "summer-salon": `${emptyJugendBase} text-[#2E1E04] px-8 py-10 sm:px-12 sm:py-12 before:border-[28px] sm:before:border-[38px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/summer/empty-frame-salon.svg')]`,

        // V3: Vienna Secession Pavilion Niche
        "autumn-secession": `${emptyJugendBase} text-[#2C1E0F] px-7 py-9 sm:px-10 sm:py-11 before:border-[24px] sm:before:border-[34px] before:[border-image-slice:calc(36/200*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/autumn/empty-frame-secession.svg')]`,
        "winter-secession": `${emptyJugendBase} text-[#14283D] px-7 py-9 sm:px-10 sm:py-11 before:border-[24px] sm:before:border-[34px] before:[border-image-slice:calc(36/200*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/winter/empty-frame-secession.svg')]`,
        "spring-secession": `${emptyJugendBase} text-[#1F3114] px-7 py-9 sm:px-10 sm:py-11 before:border-[24px] sm:before:border-[34px] before:[border-image-slice:calc(36/200*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/spring/empty-frame-secession.svg')]`,
        "summer-secession": `${emptyJugendBase} text-[#2E1E04] px-7 py-9 sm:px-10 sm:py-11 before:border-[24px] sm:before:border-[34px] before:[border-image-slice:calc(36/200*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/summer/empty-frame-secession.svg')]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Empty({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyVariants>) {
  const resolved = variant ?? "default"

  return (
    <EmptyVariantContext.Provider value={resolved}>
      <div
        data-slot="empty"
        data-variant={resolved}
        className={cn(emptyVariants({ variant: resolved }), className)}
        {...props}
      />
    </EmptyVariantContext.Provider>
  )
}

function EmptyMedia({ className, ...props }: React.ComponentProps<"div">) {
  const variant = React.useContext(EmptyVariantContext)
  const isJugend = variant !== "default"
  const isSecession = variant.endsWith("-secession")

  return (
    <div
      data-slot="empty-media"
      className={cn(
        "mb-1 inline-flex size-12 items-center justify-center [&_svg:not([class*='size-'])]:size-6",
        isJugend
          ? cn(
              "border border-current/30 bg-current/10",
              isSecession ? "rotate-45 [&>svg]:-rotate-45" : "rounded-full"
            )
          : "bg-muted rounded-full",
        className
      )}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"h3">) {
  const variant = React.useContext(EmptyVariantContext)
  const isJugend = variant !== "default"

  return (
    <h3
      data-slot="empty-title"
      className={cn(
        "font-semibold",
        isJugend
          ? cn(ambrosia.className, "text-2xl sm:text-3xl font-normal tracking-wide")
          : "text-lg",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  const variant = React.useContext(EmptyVariantContext)
  const isJugend = variant !== "default"

  return (
    <p
      data-slot="empty-description"
      className={cn(
        "max-w-sm text-sm leading-relaxed",
        isJugend ? "text-current/75" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function EmptyActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-actions"
      className={cn("mt-2 flex flex-wrap items-center justify-center gap-2.5", className)}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
  emptyVariants,
}
