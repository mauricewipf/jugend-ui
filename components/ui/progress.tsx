"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Progress as ProgressPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

// 50% vertical slice (14/28) guarantees 0u vertical stretch and zero finial shear!
const trackJugendBase =
  "relative isolate h-5 w-full overflow-visible rounded-none bg-transparent before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:border-y-[10px] before:border-x-[16px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(14/28*100%)_calc(22/240*100%)_calc(14/28*100%)_calc(22/240*100%)_fill]"

const progressVariants = cva("relative w-full", {
  variants: {
    variant: {
      default: "bg-primary/20 h-2 overflow-hidden rounded-full",

      // V1: Botanical Brass Gauge (progress-track-1.svg)
      autumn: `${trackJugendBase} before:[border-image-source:url('/autumn/progress-track-1.svg')]`,
      winter: `${trackJugendBase} before:[border-image-source:url('/winter/progress-track-1.svg')]`,
      spring: `${trackJugendBase} before:[border-image-source:url('/spring/progress-track-1.svg')]`,
      summer: `${trackJugendBase} before:[border-image-source:url('/summer/progress-track-1.svg')]`,

      // V2: Salon Enamel Gauge (progress-track-salon.svg)
      "autumn-salon": `${trackJugendBase} before:[border-image-source:url('/autumn/progress-track-salon.svg')]`,
      "winter-salon": `${trackJugendBase} before:[border-image-source:url('/winter/progress-track-salon.svg')]`,
      "spring-salon": `${trackJugendBase} before:[border-image-source:url('/spring/progress-track-salon.svg')]`,
      "summer-salon": `${trackJugendBase} before:[border-image-source:url('/summer/progress-track-salon.svg')]`,

      // V3: Vienna Secession Meter (progress-track-secession.svg)
      "autumn-secession": `${trackJugendBase} before:[border-image-source:url('/autumn/progress-track-secession.svg')]`,
      "winter-secession": `${trackJugendBase} before:[border-image-source:url('/winter/progress-track-secession.svg')]`,
      "spring-secession": `${trackJugendBase} before:[border-image-source:url('/spring/progress-track-secession.svg')]`,
      "summer-secession": `${trackJugendBase} before:[border-image-source:url('/summer/progress-track-secession.svg')]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type ProgressVariant = NonNullable<VariantProps<typeof progressVariants>["variant"]>

function getIndicatorGradient(variant: ProgressVariant): string {
  if (variant.startsWith("winter")) {
    return "bg-gradient-to-r from-[#34597D] via-[#5E8EB6] to-[#7BA7CC] border-[#1F3A56]"
  }
  if (variant.startsWith("spring")) {
    return "bg-gradient-to-r from-[#4B6E2C] via-[#689A3B] to-[#84B852] border-[#2F441B]"
  }
  if (variant.startsWith("summer")) {
    return "bg-gradient-to-r from-[#9E6B0C] via-[#CA9116] to-[#E8B328] border-[#3F2A04]"
  }
  return "bg-gradient-to-r from-[#7D491A] via-[#A67628] to-[#C99A3E] border-[#473418]"
}

function Progress({
  className,
  value = 0,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>) {
  const resolved = variant ?? "default"
  const clamped = Math.max(0, Math.min(100, value ?? 0))

  if (resolved === "default") {
    return (
      <ProgressPrimitive.Root
        data-slot="progress"
        data-variant="default"
        value={clamped}
        className={cn(progressVariants({ variant: "default" }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full w-full flex-1 transition-all"
          style={{ transform: `translateX(-${100 - clamped}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  }

  const isSalon = resolved.endsWith("-salon")
  const isSecession = resolved.endsWith("-secession")

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-variant={resolved}
      value={clamped}
      className={cn(progressVariants({ variant: resolved }), className)}
      {...props}
    >
      {/* Recessed inner gauge channel */}
      <div
        className={cn(
          "absolute inset-y-[4.5px] inset-x-[12px] z-10 overflow-hidden",
          isSecession ? "rounded-none" : "rounded-full",
          isSalon &&
            "[background-image:repeating-linear-gradient(90deg,transparent_0,transparent_calc(10%-1px),rgba(0,0,0,0.14)_calc(10%-1px),rgba(0,0,0,0.14)_10%)]"
        )}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "relative h-full border-r transition-[width] duration-300 motion-reduce:transition-none",
            !isSecession && "rounded-l-full",
            getIndicatorGradient(resolved)
          )}
          style={{ width: `${clamped}%` }}
        >
          {clamped > 4 && (
            <span
              aria-hidden
              className={cn(
                "absolute top-1/2 right-1 size-1.5 -translate-y-1/2 bg-[#FFFDF8] ring-1 ring-black/40",
                !isSecession && "rounded-full"
              )}
            />
          )}
        </ProgressPrimitive.Indicator>
      </div>
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressVariants }
