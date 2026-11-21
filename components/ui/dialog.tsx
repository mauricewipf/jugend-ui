"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type DialogVariant = NonNullable<
  VariantProps<typeof dialogContentVariants>["variant"]
>

const DialogVariantContext = React.createContext<DialogVariant>("default")

// IMPORTANT: Never include `relative` here so `fixed` on base CVA is preserved!
const framedDialogBase =
  "isolate overflow-hidden border-0 bg-transparent ring-0 rounded-none max-h-[calc(100dvh-2rem)] flex flex-col [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch] before:drop-shadow-2xl"

const dialogContentVariants = cva(
  "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 duration-150 outline-none group/dialog-content",
  {
    variants: {
      variant: {
        default:
          "bg-background ring-foreground/10 grid max-w-lg rounded-xl p-6 shadow-lg ring-1",

        // V1: Botanical Grand Folio (dialog-frame-1.svg, slice 48/220)
        autumn: `${framedDialogBase} max-w-lg text-[#2C1E0F] p-8 sm:p-11 before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/220*100%)_calc(48/220*100%)_fill] before:[border-image-source:url('/autumn/dialog-frame-1.svg')]`,
        winter: `${framedDialogBase} max-w-lg text-[#14283D] p-8 sm:p-11 before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/220*100%)_calc(48/220*100%)_fill] before:[border-image-source:url('/winter/dialog-frame-1.svg')]`,
        spring: `${framedDialogBase} max-w-lg text-[#1F3114] p-8 sm:p-11 before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/220*100%)_calc(48/220*100%)_fill] before:[border-image-source:url('/spring/dialog-frame-1.svg')]`,
        summer: `${framedDialogBase} max-w-lg text-[#2E1E04] p-8 sm:p-11 before:border-[34px] sm:before:border-[44px] before:[border-image-slice:calc(48/220*100%)_calc(48/220*100%)_fill] before:[border-image-source:url('/summer/dialog-frame-1.svg')]`,

        // V2: Salon Lunette Dossier (dialog-frame-salon.svg, slice 44/220)
        "autumn-salon": `${framedDialogBase} max-w-lg text-[#2C1E0F] p-8 sm:p-11 before:border-[33px] sm:before:border-[44px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/autumn/dialog-frame-salon.svg')]`,
        "winter-salon": `${framedDialogBase} max-w-lg text-[#14283D] p-8 sm:p-11 before:border-[33px] sm:before:border-[44px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/winter/dialog-frame-salon.svg')]`,
        "spring-salon": `${framedDialogBase} max-w-lg text-[#1F3114] p-8 sm:p-11 before:border-[33px] sm:before:border-[44px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/spring/dialog-frame-salon.svg')]`,
        "summer-salon": `${framedDialogBase} max-w-lg text-[#2E1E04] p-8 sm:p-11 before:border-[33px] sm:before:border-[44px] before:[border-image-slice:calc(44/220*100%)_calc(44/220*100%)_fill] before:[border-image-source:url('/summer/dialog-frame-salon.svg')]`,

        // V3: Vienna Secession Pavilion (modal-frame-2.svg, slice 40/200)
        "autumn-secession": `${framedDialogBase} max-w-lg text-[#2C1E0F] p-7 sm:p-9 before:border-[28px] sm:before:border-[36px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/autumn/modal-frame-2.svg')]`,
        "winter-secession": `${framedDialogBase} max-w-lg text-[#14283D] p-7 sm:p-9 before:border-[28px] sm:before:border-[36px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/winter/modal-frame-2.svg')]`,
        "spring-secession": `${framedDialogBase} max-w-lg text-[#1F3114] p-7 sm:p-9 before:border-[28px] sm:before:border-[36px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/spring/modal-frame-2.svg')]`,
        "summer-secession": `${framedDialogBase} max-w-lg text-[#2E1E04] p-7 sm:p-9 before:border-[28px] sm:before:border-[36px] before:[border-image-slice:calc(40/200*100%)_calc(40/200*100%)_fill] before:[border-image-source:url('/summer/modal-frame-2.svg')]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/40 duration-150 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  variant = "default",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean
  }) {
  const resolved = variant ?? "default"
  const isJugend = resolved !== "default"
  const isSecession = resolved.endsWith("-secession")

  return (
    <DialogVariantContext.Provider value={resolved}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          data-variant={resolved}
          data-jugend={isJugend ? "true" : undefined}
          className={cn(dialogContentVariants({ variant: resolved }), className)}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close-button"
              className={cn(
                "cursor-pointer inline-flex items-center justify-center transition-all outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75",
                isJugend
                  ? cn(
                      "absolute! z-20! size-10 sm:size-9 border border-current/35 bg-current/10 hover:bg-current/20",
                      isSecession
                        ? "top-6 right-6 sm:top-7 sm:right-7 rounded-none"
                        : "top-8 right-8 sm:top-10 sm:right-10 rounded-full"
                    )
                  : "ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100 focus:ring-2 focus:ring-offset-2"
              )}
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogVariantContext.Provider>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  const variant = React.useContext(DialogVariantContext)
  const isJugend = variant !== "default"

  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1.5",
        isJugend
          ? "border-b border-current/20 pr-11 pb-3 text-left"
          : "text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  const variant = React.useContext(DialogVariantContext)
  const isJugend = variant !== "default"

  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        isJugend && "border-t border-current/20 pt-3",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const variant = React.useContext(DialogVariantContext)
  const isJugend = variant !== "default"

  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "leading-snug font-semibold",
        isJugend
          ? cn(ambrosia.className, "text-2xl sm:text-3xl font-normal tracking-wide")
          : "text-lg",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const variant = React.useContext(DialogVariantContext)
  const isJugend = variant !== "default"

  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
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
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  dialogContentVariants,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
