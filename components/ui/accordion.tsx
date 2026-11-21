"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type AccordionVariant =
  | "default"
  | "autumn"
  | "spring"
  | "summer"
  | "winter"
  | "autumn-salon"
  | "spring-salon"
  | "summer-salon"
  | "winter-salon"
  | "autumn-secession"
  | "spring-secession"
  | "summer-secession"
  | "winter-secession"

const AccordionVariantContext = React.createContext<AccordionVariant>("default")

const groupSalonBase =
  "relative isolate min-w-0 px-6 py-5 sm:px-8 sm:py-7 [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:border-[24px] sm:before:border-[32px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill]"

const accordionVariants = cva("w-full min-w-0", {
  variants: {
    variant: {
      default: "divide-y divide-border",

      // V1: Botanical Folio Plates — spaced individual parchment plates
      autumn: "flex flex-col gap-3 text-[#2C1E0F]",
      winter: "flex flex-col gap-3 text-[#14283D]",
      spring: "flex flex-col gap-3 text-[#1F3114]",
      summer: "flex flex-col gap-3 text-[#2E1E04]",

      // V2: Salon Passe-Partout Stack — single unified outer frame + delicate inner rules
      "autumn-salon": `${groupSalonBase} divide-y divide-[#AE8746]/45 text-[#2C1E0F] before:[border-image-source:url('/autumn/accordion-group-salon.svg')]`,
      "winter-salon": `${groupSalonBase} divide-y divide-[#7BA7CC]/45 text-[#14283D] before:[border-image-source:url('/winter/accordion-group-salon.svg')]`,
      "spring-salon": `${groupSalonBase} divide-y divide-[#78AA48]/45 text-[#1F3114] before:[border-image-source:url('/spring/accordion-group-salon.svg')]`,
      "summer-salon": `${groupSalonBase} divide-y divide-[#E0A822]/45 text-[#2E1E04] before:[border-image-source:url('/summer/accordion-group-salon.svg')]`,

      // V3: Vienna Secession Cabinet — stacked rectilinear drawers
      "autumn-secession": "flex flex-col gap-2.5 text-[#2C1E0F]",
      "winter-secession": "flex flex-col gap-2.5 text-[#14283D]",
      "spring-secession": "flex flex-col gap-2.5 text-[#1F3114]",
      "summer-secession": "flex flex-col gap-2.5 text-[#2E1E04]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const itemFramedBase =
  "relative isolate min-w-0 [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch]"

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      default: "border-b last:border-b-0",

      autumn: `${itemFramedBase} px-6 py-1.5 sm:px-7 sm:py-2 before:border-[18px] sm:before:border-[21px] before:[border-image-slice:calc(24/80*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/autumn/accordion-item-1.svg')]`,
      winter: `${itemFramedBase} px-6 py-1.5 sm:px-7 sm:py-2 before:border-[18px] sm:before:border-[21px] before:[border-image-slice:calc(24/80*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/winter/accordion-item-1.svg')]`,
      spring: `${itemFramedBase} px-6 py-1.5 sm:px-7 sm:py-2 before:border-[18px] sm:before:border-[21px] before:[border-image-slice:calc(24/80*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/spring/accordion-item-1.svg')]`,
      summer: `${itemFramedBase} px-6 py-1.5 sm:px-7 sm:py-2 before:border-[18px] sm:before:border-[21px] before:[border-image-slice:calc(24/80*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/summer/accordion-item-1.svg')]`,

      "autumn-salon": "rounded-xs px-2 transition-colors data-[state=open]:bg-[#AE8746]/[0.07]",
      "winter-salon": "rounded-xs px-2 transition-colors data-[state=open]:bg-[#7BA7CC]/[0.07]",
      "spring-salon": "rounded-xs px-2 transition-colors data-[state=open]:bg-[#78AA48]/[0.07]",
      "summer-salon": "rounded-xs px-2 transition-colors data-[state=open]:bg-[#E0A822]/[0.07]",

      "autumn-secession": `${itemFramedBase} px-5 py-1 sm:px-6 sm:py-1.5 before:border-[14px] sm:before:border-[16px] before:[border-image-slice:calc(20/72*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/autumn/accordion-item-secession.svg')]`,
      "winter-secession": `${itemFramedBase} px-5 py-1 sm:px-6 sm:py-1.5 before:border-[14px] sm:before:border-[16px] before:[border-image-slice:calc(20/72*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/winter/accordion-item-secession.svg')]`,
      "spring-secession": `${itemFramedBase} px-5 py-1 sm:px-6 sm:py-1.5 before:border-[14px] sm:before:border-[16px] before:[border-image-slice:calc(20/72*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/spring/accordion-item-secession.svg')]`,
      "summer-secession": `${itemFramedBase} px-5 py-1 sm:px-6 sm:py-1.5 before:border-[14px] sm:before:border-[16px] before:[border-image-slice:calc(20/72*100%)_calc(20/200*100%)_fill] before:[border-image-source:url('/summer/accordion-item-secession.svg')]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function DisclosureOrnament({ variant }: { variant: AccordionVariant }) {
  if (variant === "default") {
    return (
      <ChevronDownIcon
        aria-hidden
        className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-data-[state=open]/accordion-trigger:rotate-180"
      />
    )
  }

  if (variant.endsWith("-secession")) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none size-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-data-[state=open]/accordion-trigger:rotate-180"
        fill="none"
      >
        <rect
          x="3"
          y="3"
          width="14"
          height="14"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M6.8 8.8 L10 12.2 L13.2 8.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (variant.endsWith("-salon")) {
    // Salon Cameo Lozenge with side pearls
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 20"
        className="pointer-events-none h-5 w-6 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-data-[state=open]/accordion-trigger:rotate-180"
        fill="none"
      >
        <polygon
          points="12,2 21,10 12,18 3,10"
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeWidth="1.15"
        />
        <circle cx="3" cy="10" r="1.3" fill="currentColor" />
        <circle cx="21" cy="10" r="1.3" fill="currentColor" />
        <path
          d="M9 8.8 L12 12 L15 8.8"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  // V1: Botanical Calyx / Bud Medallion
  return (
    <svg
      aria-hidden
      viewBox="0 0 22 22"
      className="pointer-events-none size-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-data-[state=open]/accordion-trigger:rotate-180"
      fill="none"
    >
      <circle
        cx="11"
        cy="11"
        r="9"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M6.5 9.2 C8.5 9.5 9.8 11.2 11 14 C12.2 11.2 13.5 9.5 15.5 9.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="7.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function Accordion({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants>) {
  const resolved = (variant ?? "default") as AccordionVariant

  return (
    <AccordionVariantContext.Provider value={resolved}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={resolved}
        className={cn(accordionVariants({ variant: resolved }), className)}
        {...props}
      />
    </AccordionVariantContext.Provider>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const variant = React.useContext(AccordionVariantContext)

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const variant = React.useContext(AccordionVariantContext)
  const isJugend = variant !== "default"

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex min-h-12 flex-1 cursor-pointer items-center justify-between gap-4 py-3 text-left transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75 disabled:pointer-events-none disabled:opacity-50",
          isJugend
            ? cn(ambrosia.className, "text-xl sm:text-2xl tracking-wide hover:opacity-85")
            : "text-sm font-medium hover:underline",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <DisclosureOrnament variant={variant} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const variant = React.useContext(AccordionVariantContext)
  const isJugend = variant !== "default"

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div
        className={cn(
          "pt-1 pb-4 leading-relaxed",
          isJugend && "border-t border-current/15 pt-3 text-current/85",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  accordionItemVariants,
  AccordionTrigger,
  accordionVariants,
  type AccordionVariant,
}
