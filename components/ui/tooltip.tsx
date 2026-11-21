"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

// Radix Popper wraps Content in an outer fixed div, leaving Content static; `relative` anchors ::before cleanly!
const tooltipJugendBase =
  "relative isolate border-0 bg-transparent rounded-none max-w-xs [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch] before:drop-shadow-md"

const tooltipContentVariants = cva(
  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) duration-100 text-xs text-balance",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground rounded-md px-3 py-1.5",

        // V1: Botanical Cartouche Label (50% vertical slice 22/44 for crisp end-crescents)
        autumn: `${tooltipJugendBase} px-4.5 py-2 font-medium text-[#2C1E0F] before:border-y-[14px] before:border-x-[12px] before:[border-image-slice:calc(22/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/autumn/tooltip-frame-1.svg')]`,
        winter: `${tooltipJugendBase} px-4.5 py-2 font-medium text-[#14283D] before:border-y-[14px] before:border-x-[12px] before:[border-image-slice:calc(22/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/winter/tooltip-frame-1.svg')]`,
        spring: `${tooltipJugendBase} px-4.5 py-2 font-medium text-[#1F3114] before:border-y-[14px] before:border-x-[12px] before:[border-image-slice:calc(22/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/spring/tooltip-frame-1.svg')]`,
        summer: `${tooltipJugendBase} px-4.5 py-2 font-medium text-[#2E1E04] before:border-y-[14px] before:border-x-[12px] before:[border-image-slice:calc(22/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/summer/tooltip-frame-1.svg')]`,

        // V2: Salon Brass Tag (tooltip-frame-salon.svg)
        "autumn-salon": `${tooltipJugendBase} px-4 py-2 font-medium text-[#2C1E0F] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/autumn/tooltip-frame-salon.svg')]`,
        "winter-salon": `${tooltipJugendBase} px-4 py-2 font-medium text-[#14283D] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/winter/tooltip-frame-salon.svg')]`,
        "spring-salon": `${tooltipJugendBase} px-4 py-2 font-medium text-[#1F3114] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/spring/tooltip-frame-salon.svg')]`,
        "summer-salon": `${tooltipJugendBase} px-4 py-2 font-medium text-[#2E1E04] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/44*100%)_calc(18/140*100%)_fill] before:[border-image-source:url('/summer/tooltip-frame-salon.svg')]`,

        // V3: Vienna Secession Octagonal Tag (tooltip-frame-secession.svg)
        "autumn-secession": `${tooltipJugendBase} px-4 py-2 font-medium text-[#2C1E0F] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/44*100%)_calc(16/140*100%)_fill] before:[border-image-source:url('/autumn/tooltip-frame-secession.svg')]`,
        "winter-secession": `${tooltipJugendBase} px-4 py-2 font-medium text-[#14283D] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/44*100%)_calc(16/140*100%)_fill] before:[border-image-source:url('/winter/tooltip-frame-secession.svg')]`,
        "spring-secession": `${tooltipJugendBase} px-4 py-2 font-medium text-[#1F3114] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/44*100%)_calc(16/140*100%)_fill] before:[border-image-source:url('/spring/tooltip-frame-secession.svg')]`,
        "summer-secession": `${tooltipJugendBase} px-4 py-2 font-medium text-[#2E1E04] before:border-y-[8px] before:border-x-[11px] before:[border-image-slice:calc(12/44*100%)_calc(16/140*100%)_fill] before:[border-image-source:url('/summer/tooltip-frame-secession.svg')]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TooltipProvider({
  delayDuration = 100,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 8,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipContentVariants>) {
  const resolved = variant ?? "default"
  const isJugend = resolved !== "default"

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        data-variant={resolved}
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant: resolved }), className)}
        {...props}
      >
        <span>{children}</span>
        {!isJugend && (
          <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export {
  Tooltip,
  TooltipContent,
  tooltipContentVariants,
  TooltipProvider,
  TooltipTrigger,
}
