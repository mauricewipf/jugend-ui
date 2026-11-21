"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Popover as PopoverPrimitive } from "radix-ui"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type PopoverVariant = NonNullable<
  VariantProps<typeof popoverContentVariants>["variant"]
>

const PopoverVariantContext = React.createContext<PopoverVariant>("default")

// IMPORTANT: Omit `relative` so Popper positioning is preserved!
const framedPopoverBase =
  "relative isolate border-0 bg-transparent ring-0 rounded-none w-72 max-w-[calc(100vw-2rem)] [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch] before:drop-shadow-xl"

const popoverContentVariants = cva(
  "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) duration-100 outline-hidden text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-popover text-popover-foreground ring-foreground/10 w-72 max-w-[calc(100vw-2rem)] rounded-lg p-4 shadow-md ring-1",

        // V1: Botanical Vignette (menu-frame-1.svg, slice 28/140 -> 24px)
        autumn: `${framedPopoverBase} text-[#2C1E0F] p-6 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/autumn/menu-frame-1.svg')]`,
        winter: `${framedPopoverBase} text-[#14283D] p-6 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/winter/menu-frame-1.svg')]`,
        spring: `${framedPopoverBase} text-[#1F3114] p-6 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/spring/menu-frame-1.svg')]`,
        summer: `${framedPopoverBase} text-[#2E1E04] p-6 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/summer/menu-frame-1.svg')]`,

        // V2: Salon Passe-Partout Vitrine (popover-frame-salon.svg, slice 28/160 -> 21px)
        "autumn-salon": `${framedPopoverBase} text-[#2C1E0F] p-5.5 before:border-[21px] before:[border-image-slice:calc(28/160*100%)_calc(28/160*100%)_fill] before:[border-image-source:url('/autumn/popover-frame-salon.svg')]`,
        "winter-salon": `${framedPopoverBase} text-[#14283D] p-5.5 before:border-[21px] before:[border-image-slice:calc(28/160*100%)_calc(28/160*100%)_fill] before:[border-image-source:url('/winter/popover-frame-salon.svg')]`,
        "spring-salon": `${framedPopoverBase} text-[#1F3114] p-5.5 before:border-[21px] before:[border-image-slice:calc(28/160*100%)_calc(28/160*100%)_fill] before:[border-image-source:url('/spring/popover-frame-salon.svg')]`,
        "summer-salon": `${framedPopoverBase} text-[#2E1E04] p-5.5 before:border-[21px] before:[border-image-slice:calc(28/160*100%)_calc(28/160*100%)_fill] before:[border-image-source:url('/summer/popover-frame-salon.svg')]`,

        // V3: Vienna Secession Vitrine (menu-frame-2.svg, slice 24/140 -> 18px)
        "autumn-secession": `${framedPopoverBase} text-[#2C1E0F] p-5 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/autumn/menu-frame-2.svg')]`,
        "winter-secession": `${framedPopoverBase} text-[#14283D] p-5 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/winter/menu-frame-2.svg')]`,
        "spring-secession": `${framedPopoverBase} text-[#1F3114] p-5 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/spring/menu-frame-2.svg')]`,
        "summer-secession": `${framedPopoverBase} text-[#2E1E04] p-5 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/summer/menu-frame-2.svg')]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  variant = "default",
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> &
  VariantProps<typeof popoverContentVariants>) {
  const resolved = variant ?? "default"

  return (
    <PopoverVariantContext.Provider value={resolved}>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="popover-content"
          data-variant={resolved}
          align={align}
          sideOffset={sideOffset}
          className={cn(popoverContentVariants({ variant: resolved }), className)}
          {...props}
        />
      </PopoverPrimitive.Portal>
    </PopoverVariantContext.Provider>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  const variant = React.useContext(PopoverVariantContext)
  const isJugend = variant !== "default"

  return (
    <div
      data-slot="popover-header"
      className={cn(
        "flex flex-col gap-1",
        isJugend && "mb-2.5 border-b border-current/20 pb-2",
        className
      )}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h4">) {
  const variant = React.useContext(PopoverVariantContext)
  const isJugend = variant !== "default"

  return (
    <h4
      data-slot="popover-title"
      className={cn(
        "font-medium leading-snug",
        isJugend && cn(ambrosia.className, "text-xl tracking-wide"),
        className
      )}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const variant = React.useContext(PopoverVariantContext)
  const isJugend = variant !== "default"

  return (
    <p
      data-slot="popover-description"
      className={cn(
        "text-xs leading-relaxed",
        isJugend ? "text-current/80" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  popoverContentVariants,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
