import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

const alertJugendBase =
  "relative isolate min-w-0 border-0 bg-transparent rounded-none [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch]"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[auto_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3.5 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current group/alert",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",

        // V1: Asymmetric Left-Spined Botanical Broadside (slice 24 28 24 36 -> 18 21 18 27, 0.75 isotropic)
        autumn: `${alertJugendBase} text-[#2C1E0F] pl-8 pr-6 py-5 sm:pl-9 sm:pr-7 sm:py-6 before:border-y-[18px] before:border-r-[21px] before:border-l-[27px] before:[border-image-slice:calc(24/88*100%)_calc(28/220*100%)_calc(24/88*100%)_calc(36/220*100%)_fill] before:[border-image-source:url('/autumn/alert-frame-1.svg')]`,
        winter: `${alertJugendBase} text-[#14283D] pl-8 pr-6 py-5 sm:pl-9 sm:pr-7 sm:py-6 before:border-y-[18px] before:border-r-[21px] before:border-l-[27px] before:[border-image-slice:calc(24/88*100%)_calc(28/220*100%)_calc(24/88*100%)_calc(36/220*100%)_fill] before:[border-image-source:url('/winter/alert-frame-1.svg')]`,
        spring: `${alertJugendBase} text-[#1F3114] pl-8 pr-6 py-5 sm:pl-9 sm:pr-7 sm:py-6 before:border-y-[18px] before:border-r-[21px] before:border-l-[27px] before:[border-image-slice:calc(24/88*100%)_calc(28/220*100%)_calc(24/88*100%)_calc(36/220*100%)_fill] before:[border-image-source:url('/spring/alert-frame-1.svg')]`,
        summer: `${alertJugendBase} text-[#2E1E04] pl-8 pr-6 py-5 sm:pl-9 sm:pr-7 sm:py-6 before:border-y-[18px] before:border-r-[21px] before:border-l-[27px] before:[border-image-slice:calc(24/88*100%)_calc(28/220*100%)_calc(24/88*100%)_calc(36/220*100%)_fill] before:[border-image-source:url('/summer/alert-frame-1.svg')]`,

        // V2: Salon Passe-Partout Notice (slice 24 24 -> 18px)
        "autumn-salon": `${alertJugendBase} text-[#2C1E0F] p-5 sm:p-6 before:border-[18px] before:[border-image-slice:calc(24/88*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/autumn/alert-frame-salon.svg')]`,
        "winter-salon": `${alertJugendBase} text-[#14283D] p-5 sm:p-6 before:border-[18px] before:[border-image-slice:calc(24/88*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/winter/alert-frame-salon.svg')]`,
        "spring-salon": `${alertJugendBase} text-[#1F3114] p-5 sm:p-6 before:border-[18px] before:[border-image-slice:calc(24/88*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/spring/alert-frame-salon.svg')]`,
        "summer-salon": `${alertJugendBase} text-[#2E1E04] p-5 sm:p-6 before:border-[18px] before:[border-image-slice:calc(24/88*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/summer/alert-frame-salon.svg')]`,

        // V3: Vienna Secession Plaque (slice 20 20 -> 15px)
        "autumn-secession": `${alertJugendBase} text-[#2C1E0F] p-5 sm:p-6 before:border-[15px] before:[border-image-slice:calc(20/80*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/autumn/alert-frame-secession.svg')]`,
        "winter-secession": `${alertJugendBase} text-[#14283D] p-5 sm:p-6 before:border-[15px] before:[border-image-slice:calc(20/80*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/winter/alert-frame-secession.svg')]`,
        "spring-secession": `${alertJugendBase} text-[#1F3114] p-5 sm:p-6 before:border-[15px] before:[border-image-slice:calc(20/80*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/spring/alert-frame-secession.svg')]`,
        "summer-secession": `${alertJugendBase} text-[#2E1E04] p-5 sm:p-6 before:border-[15px] before:[border-image-slice:calc(20/80*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/summer/alert-frame-secession.svg')]`,
      },
      tone: {
        default: "",
        // Period Venetian carmine ink (>= 7:1 WCAG AAA contrast on parchment)
        destructive: "text-[#7A1F14]! [&>svg]:text-[#7A1F14]!",
      },
    },
    defaultVariants: {
      variant: "default",
      tone: "default",
    },
  }
)

function Alert({
  className,
  variant = "default",
  tone = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const isJugend = variant !== "default" && variant !== "destructive"

  return (
    <div
      data-slot="alert"
      data-variant={variant}
      data-jugend={isJugend ? "true" : undefined}
      role="alert"
      className={cn(alertVariants({ variant, tone }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-2 min-h-4 font-semibold tracking-normal group-data-[jugend=true]/alert:text-xl group-data-[jugend=true]/alert:font-normal group-data-[jugend=true]/alert:leading-snug",
        ambrosia.variable,
        "group-data-[jugend=true]/alert:[font-family:var(--font-ambrosia),serif]",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground group-data-[jugend=true]/alert:text-current/85 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("col-start-2 mt-2 flex flex-wrap gap-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertAction, AlertDescription, AlertTitle, alertVariants }
