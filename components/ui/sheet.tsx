"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type SheetVariant = NonNullable<
  VariantProps<typeof sheetContentVariants>["variant"]
>

const SheetVariantContext = React.createContext<SheetVariant>("default")

// IMPORTANT: Never include `relative` here so `fixed` on base CVA is preserved!
const framedSheetBase =
  "isolate overflow-hidden border-0 bg-transparent ring-0 rounded-none [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch] before:drop-shadow-2xl"

const sheetContentVariants = cva(
  "data-open:animate-in data-closed:animate-out fixed z-50 flex flex-col gap-4 transition ease-in-out data-closed:duration-200 data-open:duration-300 outline-none group/sheet-content",
  {
    variants: {
      side: {
        right:
          "data-closed:slide-out-to-right data-open:slide-in-from-right inset-y-0 right-0 h-full w-[88vw] max-w-sm",
        left: "data-closed:slide-out-to-left data-open:slide-in-from-left inset-y-0 left-0 h-full w-[88vw] max-w-sm",
        top: "data-closed:slide-out-to-top data-open:slide-in-from-top inset-x-0 top-0 h-auto max-h-[85dvh]",
        bottom:
          "data-closed:slide-out-to-bottom data-open:slide-in-from-bottom inset-x-0 bottom-0 h-auto max-h-[85dvh]",
      },
      variant: {
        default: "bg-background border p-6 shadow-lg",

        // V1: Botanical Folding Door (sheet-frame-1.svg, slice 36/200 & 36/240)
        autumn: `${framedSheetBase} text-[#2C1E0F] p-7 sm:p-9 before:border-[24px] sm:before:border-[30px] before:[border-image-slice:calc(36/240*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/autumn/sheet-frame-1.svg')]`,
        winter: `${framedSheetBase} text-[#14283D] p-7 sm:p-9 before:border-[24px] sm:before:border-[30px] before:[border-image-slice:calc(36/240*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/winter/sheet-frame-1.svg')]`,
        spring: `${framedSheetBase} text-[#1F3114] p-7 sm:p-9 before:border-[24px] sm:before:border-[30px] before:[border-image-slice:calc(36/240*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/spring/sheet-frame-1.svg')]`,
        summer: `${framedSheetBase} text-[#2E1E04] p-7 sm:p-9 before:border-[24px] sm:before:border-[30px] before:[border-image-slice:calc(36/240*100%)_calc(36/200*100%)_fill] before:[border-image-source:url('/summer/sheet-frame-1.svg')]`,

        // V2: Salon Passe-Partout Wing (sheet-frame-salon.svg, slice 32)
        "autumn-salon": `${framedSheetBase} text-[#2C1E0F] p-7 sm:p-9 before:border-[24px] sm:before:border-[28px] before:[border-image-slice:calc(32/240*100%)_calc(32/200*100%)_fill] before:[border-image-source:url('/autumn/sheet-frame-salon.svg')]`,
        "winter-salon": `${framedSheetBase} text-[#14283D] p-7 sm:p-9 before:border-[24px] sm:before:border-[28px] before:[border-image-slice:calc(32/240*100%)_calc(32/200*100%)_fill] before:[border-image-source:url('/winter/sheet-frame-salon.svg')]`,
        "spring-salon": `${framedSheetBase} text-[#1F3114] p-7 sm:p-9 before:border-[24px] sm:before:border-[28px] before:[border-image-slice:calc(32/240*100%)_calc(32/200*100%)_fill] before:[border-image-source:url('/spring/sheet-frame-salon.svg')]`,
        "summer-salon": `${framedSheetBase} text-[#2E1E04] p-7 sm:p-9 before:border-[24px] sm:before:border-[28px] before:[border-image-slice:calc(32/240*100%)_calc(32/200*100%)_fill] before:[border-image-source:url('/summer/sheet-frame-salon.svg')]`,

        // V3: Vienna Secession Cabinet Wing (sheet-frame-secession.svg, slice 28)
        "autumn-secession": `${framedSheetBase} text-[#2C1E0F] p-6 sm:p-8 before:border-[21px] sm:before:border-[26px] before:[border-image-slice:calc(28/240*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/autumn/sheet-frame-secession.svg')]`,
        "winter-secession": `${framedSheetBase} text-[#14283D] p-6 sm:p-8 before:border-[21px] sm:before:border-[26px] before:[border-image-slice:calc(28/240*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/winter/sheet-frame-secession.svg')]`,
        "spring-secession": `${framedSheetBase} text-[#1F3114] p-6 sm:p-8 before:border-[21px] sm:before:border-[26px] before:[border-image-slice:calc(28/240*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/spring/sheet-frame-secession.svg')]`,
        "summer-secession": `${framedSheetBase} text-[#2E1E04] p-6 sm:p-8 before:border-[21px] sm:before:border-[26px] before:[border-image-slice:calc(28/240*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/summer/sheet-frame-secession.svg')]`,
      },
    },
    defaultVariants: {
      side: "right",
      variant: "default",
    },
  }
)

function Sheet({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/40 duration-150 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  variant = "default",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetContentVariants>) {
  const resolved = variant ?? "default"
  const isJugend = resolved !== "default"
  const isSecession = resolved.endsWith("-secession")

  return (
    <SheetVariantContext.Provider value={resolved}>
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          data-slot="sheet-content"
          data-variant={resolved}
          className={cn(
            sheetContentVariants({ side, variant: resolved }),
            className
          )}
          {...props}
        >
          {children}
          <SheetPrimitive.Close
            data-slot="sheet-close-button"
            className={cn(
              "cursor-pointer inline-flex items-center justify-center transition-all outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75",
              isJugend
                ? cn(
                    "absolute! z-20! size-10 sm:size-9 border border-current/35 bg-current/10 hover:bg-current/20",
                    isSecession
                      ? "top-6 right-6 sm:top-7 sm:right-7 rounded-none"
                      : "top-7 right-7 sm:top-8.5 sm:right-8.5 rounded-full"
                  )
                : "ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100 focus:ring-2"
            )}
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </SheetPrimitive.Content>
      </SheetPortal>
    </SheetVariantContext.Provider>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  const variant = React.useContext(SheetVariantContext)
  const isJugend = variant !== "default"

  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1.5",
        isJugend && "border-b border-current/20 pr-11 pb-3",
        className
      )}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  const variant = React.useContext(SheetVariantContext)
  const isJugend = variant !== "default"

  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col gap-2",
        isJugend && "border-t border-current/20 pt-3",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  const variant = React.useContext(SheetVariantContext)
  const isJugend = variant !== "default"

  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-semibold",
        isJugend
          ? cn(ambrosia.className, "text-2xl sm:text-3xl font-normal tracking-wide")
          : "text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  const variant = React.useContext(SheetVariantContext)
  const isJugend = variant !== "default"

  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "text-sm",
        isJugend ? "text-current/80" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  sheetContentVariants,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
