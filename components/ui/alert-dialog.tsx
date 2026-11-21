"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type AlertDialogVariant = NonNullable<
  VariantProps<typeof alertDialogContentVariants>["variant"]
>

const AlertDialogVariantContext =
  React.createContext<AlertDialogVariant>("default")

// IMPORTANT: Do NOT include `relative` here — `fixed` on base CVA already creates
// the containing block for `before:absolute`, and `relative` would strip `fixed` via twMerge!
const framedModalBase =
  "isolate overflow-visible border-0 bg-transparent ring-0 rounded-none [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch] before:drop-shadow-2xl"

const alertDialogContentVariants = cva(
  "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 gap-4 duration-150 group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-background ring-foreground/10 rounded-xl p-4 ring-1 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm",

        // Version 1: Whiplash Botanical Decree Frame (modal-frame-1.svg)
        autumn: `${framedModalBase} text-[#2C1E0F] max-w-md before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/200*100%)_calc(48/200*100%)_fill] before:[border-image-source:url('/autumn/modal-frame-1.svg')] p-9 sm:p-11`,
        winter: `${framedModalBase} text-[#14283D] max-w-md before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/200*100%)_calc(48/200*100%)_fill] before:[border-image-source:url('/winter/modal-frame-1.svg')] p-9 sm:p-11`,
        spring: `${framedModalBase} text-[#1F3114] max-w-md before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/200*100%)_calc(48/200*100%)_fill] before:[border-image-source:url('/spring/modal-frame-1.svg')] p-9 sm:p-11`,
        summer: `${framedModalBase} text-[#2E1E04] max-w-md before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/200*100%)_calc(48/200*100%)_fill] before:[border-image-source:url('/summer/modal-frame-1.svg')] p-9 sm:p-11`,

        // Version 2: Vienna Secession Architectural Frame (modal-frame-2.svg)
        "autumn-secession": `${framedModalBase} text-[#2C1E0F] max-w-md before:border-[26px] sm:before:border-[34px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/autumn/modal-frame-2.svg')] p-7 sm:p-9`,
        "winter-secession": `${framedModalBase} text-[#14283D] max-w-md before:border-[26px] sm:before:border-[34px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/winter/modal-frame-2.svg')] p-7 sm:p-9`,
        "spring-secession": `${framedModalBase} text-[#1F3114] max-w-md before:border-[26px] sm:before:border-[34px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/spring/modal-frame-2.svg')] p-7 sm:p-9`,
        "summer-secession": `${framedModalBase} text-[#2E1E04] max-w-md before:border-[26px] sm:before:border-[34px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/summer/modal-frame-2.svg')] p-7 sm:p-9`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function getSeasonFromVariant(
  variant: AlertDialogVariant
): "autumn" | "winter" | "spring" | "summer" | null {
  if (variant.startsWith("autumn")) return "autumn"
  if (variant.startsWith("winter")) return "winter"
  if (variant.startsWith("spring")) return "spring"
  if (variant.startsWith("summer")) return "summer"
  return null
}

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/40 duration-150 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> &
  VariantProps<typeof alertDialogContentVariants> & {
    size?: "default" | "sm"
  }) {
  const resolvedVariant = variant ?? "default"
  const isJugend = resolvedVariant !== "default"

  return (
    <AlertDialogVariantContext.Provider value={resolvedVariant}>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          data-slot="alert-dialog-content"
          data-size={size}
          data-variant={resolvedVariant}
          data-jugend={isJugend ? "true" : undefined}
          className={cn(
            alertDialogContentVariants({ variant: resolvedVariant }),
            className
          )}
          {...props}
        />
      </AlertDialogPortal>
    </AlertDialogVariantContext.Provider>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:not-group-data-[jugend=true]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:not-group-data-[jugend=true]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:not-group-data-[jugend=true]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end group-not-data-[jugend=true]/alert-dialog-content:bg-muted/50 group-not-data-[jugend=true]/alert-dialog-content:-mx-4 group-not-data-[jugend=true]/alert-dialog-content:-mb-4 group-not-data-[jugend=true]/alert-dialog-content:rounded-b-xl group-not-data-[jugend=true]/alert-dialog-content:border-t group-not-data-[jugend=true]/alert-dialog-content:p-4 group-data-[jugend=true]/alert-dialog-content:pt-3 group-data-[jugend=true]/alert-dialog-content:sm:justify-center group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:not-group-data-[jugend=true]/alert-dialog-content:row-span-2 group-data-[jugend=true]/alert-dialog-content:rounded-full group-data-[jugend=true]/alert-dialog-content:border group-data-[jugend=true]/alert-dialog-content:border-current/25 group-data-[jugend=true]/alert-dialog-content:bg-current/10 *:[svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  const ctxVariant = React.useContext(AlertDialogVariantContext)
  const isJugend = ctxVariant !== "default"

  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-base font-medium sm:group-data-[size=default]/alert-dialog-content:not-group-data-[jugend=true]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        isJugend && cn(ambrosia.className, "text-2xl sm:text-3xl tracking-wide"),
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-muted-foreground group-data-[jugend=true]/alert-dialog-content:text-current/80 *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  const ctxVariant = React.useContext(AlertDialogVariantContext)
  const season = getSeasonFromVariant(ctxVariant)
  const resolvedVariant =
    variant ?? (season ? (`${season}-gilded` as const) : "default")

  return (
    <Button variant={resolvedVariant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  const ctxVariant = React.useContext(AlertDialogVariantContext)
  const season = getSeasonFromVariant(ctxVariant)
  const resolvedVariant =
    variant ?? (season ? (`${season}-secession` as const) : "outline")

  return (
    <Button variant={resolvedVariant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  alertDialogContentVariants,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
