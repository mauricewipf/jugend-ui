import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

type BreadcrumbVariant =
  | "default"
  | "autumn"
  | "spring"
  | "summer"
  | "winter"
  | "autumn-ribbon"
  | "spring-ribbon"
  | "summer-ribbon"
  | "winter-ribbon"
  | "autumn-secession"
  | "spring-secession"
  | "summer-secession"
  | "winter-secession"

const BreadcrumbVariantContext = React.createContext<BreadcrumbVariant>("default")

const breadcrumbListVariants = cva(
  "flex flex-wrap items-center text-sm break-words",
  {
    variants: {
      variant: {
        default: "text-muted-foreground gap-1.5 sm:gap-2.5",

        // V1: Botanical Vine Trail
        autumn: "gap-1.5 sm:gap-2 text-[#2C1E0F]/80",
        winter: "gap-1.5 sm:gap-2 text-[#14283D]/80",
        spring: "gap-1.5 sm:gap-2 text-[#1F3114]/80",
        summer: "gap-1.5 sm:gap-2 text-[#2E1E04]/80",

        // V2: Gilded Ribbon Wayfinder — interlocking chevron plaques
        "autumn-ribbon": "gap-1.5 text-[#2C1E0F]",
        "winter-ribbon": "gap-1.5 text-[#14283D]",
        "spring-ribbon": "gap-1.5 text-[#1F3114]",
        "summer-ribbon": "gap-1.5 text-[#2E1E04]",

        // V3: Vienna Secession Header Bar — content-hugged w-fit architectural plaque
        "autumn-secession":
          "relative isolate w-fit max-w-full gap-x-2 gap-y-1 px-5 py-1.5 text-[#2C1E0F] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[10px] before:border-x-[13px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(14/48*100%)_calc(18/240*100%)_fill] before:[border-image-source:url('/autumn/breadcrumb-bar-secession.svg')]",
        "winter-secession":
          "relative isolate w-fit max-w-full gap-x-2 gap-y-1 px-5 py-1.5 text-[#14283D] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[10px] before:border-x-[13px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(14/48*100%)_calc(18/240*100%)_fill] before:[border-image-source:url('/winter/breadcrumb-bar-secession.svg')]",
        "spring-secession":
          "relative isolate w-fit max-w-full gap-x-2 gap-y-1 px-5 py-1.5 text-[#1F3114] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[10px] before:border-x-[13px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(14/48*100%)_calc(18/240*100%)_fill] before:[border-image-source:url('/spring/breadcrumb-bar-secession.svg')]",
        "summer-secession":
          "relative isolate w-fit max-w-full gap-x-2 gap-y-1 px-5 py-1.5 text-[#2E1E04] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[10px] before:border-x-[13px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(14/48*100%)_calc(18/240*100%)_fill] before:[border-image-source:url('/summer/breadcrumb-bar-secession.svg')]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// 50% vertical slice (20/40) prevents any slope kink on the directional chevron!
const ribbonLinkBase =
  "relative isolate inline-flex h-9 items-center pl-4.5 pr-4 transition-all hover:-translate-y-0.5 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[18px] before:border-x-[16px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(20/40*100%)_calc(18/140*100%)_fill]"

const breadcrumbLinkVariants = cva(
  "inline-flex min-h-9 items-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75",
  {
    variants: {
      variant: {
        default: "hover:text-foreground",
        autumn:
          "px-1.5 text-[#2C1E0F]/75 underline-offset-4 hover:text-[#2C1E0F] hover:underline",
        winter:
          "px-1.5 text-[#14283D]/75 underline-offset-4 hover:text-[#14283D] hover:underline",
        spring:
          "px-1.5 text-[#1F3114]/75 underline-offset-4 hover:text-[#1F3114] hover:underline",
        summer:
          "px-1.5 text-[#2E1E04]/75 underline-offset-4 hover:text-[#2E1E04] hover:underline",

        "autumn-ribbon": `${ribbonLinkBase} before:[border-image-source:url('/autumn/breadcrumb-ribbon.svg')]`,
        "winter-ribbon": `${ribbonLinkBase} before:[border-image-source:url('/winter/breadcrumb-ribbon.svg')]`,
        "spring-ribbon": `${ribbonLinkBase} before:[border-image-source:url('/spring/breadcrumb-ribbon.svg')]`,
        "summer-ribbon": `${ribbonLinkBase} before:[border-image-source:url('/summer/breadcrumb-ribbon.svg')]`,

        "autumn-secession": "px-1 text-[#2C1E0F]/75 hover:text-[#2C1E0F] hover:underline underline-offset-4",
        "winter-secession": "px-1 text-[#14283D]/75 hover:text-[#14283D] hover:underline underline-offset-4",
        "spring-secession": "px-1 text-[#1F3114]/75 hover:text-[#1F3114] hover:underline underline-offset-4",
        "summer-secession": "px-1 text-[#2E1E04]/75 hover:text-[#2E1E04] hover:underline underline-offset-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const cartouchePageBase =
  "relative isolate inline-flex min-h-8 items-center px-4 py-1 font-semibold before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:[border-image-repeat:stretch]"

const breadcrumbPageVariants = cva("font-normal", {
  variants: {
    variant: {
      default: "text-foreground",

      autumn: `${cartouchePageBase} text-[#2C1E0F] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/autumn/badge-frame-1.svg')]`,
      winter: `${cartouchePageBase} text-[#14283D] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/winter/badge-frame-1.svg')]`,
      spring: `${cartouchePageBase} text-[#1F3114] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/spring/badge-frame-1.svg')]`,
      summer: `${cartouchePageBase} text-[#2E1E04] before:border-y-[9px] before:border-x-[12px] before:[border-image-slice:calc(14/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/summer/badge-frame-1.svg')]`,

      "autumn-ribbon": `${cartouchePageBase} h-9 px-4.5 text-[#1E1306] before:border-y-[18px] before:border-x-[16px] before:[border-image-slice:calc(20/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/autumn/badge-frame-3.svg')]`,
      "winter-ribbon": `${cartouchePageBase} h-9 px-4.5 text-[#0E1E2E] before:border-y-[18px] before:border-x-[16px] before:[border-image-slice:calc(20/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/winter/badge-frame-3.svg')]`,
      "spring-ribbon": `${cartouchePageBase} h-9 px-4.5 text-[#12200A] before:border-y-[18px] before:border-x-[16px] before:[border-image-slice:calc(20/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/spring/badge-frame-3.svg')]`,
      "summer-ribbon": `${cartouchePageBase} h-9 px-4.5 text-[#1E1301] before:border-y-[18px] before:border-x-[16px] before:[border-image-slice:calc(20/40*100%)_calc(18/120*100%)_fill] before:[border-image-source:url('/summer/badge-frame-3.svg')]`,

      "autumn-secession": "inline-flex min-h-9 items-center gap-1.5 font-semibold text-[#2C1E0F]",
      "winter-secession": "inline-flex min-h-9 items-center gap-1.5 font-semibold text-[#14283D]",
      "spring-secession": "inline-flex min-h-9 items-center gap-1.5 font-semibold text-[#1F3114]",
      "summer-secession": "inline-flex min-h-9 items-center gap-1.5 font-semibold text-[#2E1E04]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Breadcrumb({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  variant?: BreadcrumbVariant
}) {
  return (
    <BreadcrumbVariantContext.Provider value={variant}>
      <nav
        aria-label="breadcrumb"
        data-slot="breadcrumb"
        data-variant={variant}
        className={cn("min-w-0", className)}
        {...props}
      />
    </BreadcrumbVariantContext.Provider>
  )
}

function BreadcrumbList({
  className,
  variant,
  ...props
}: React.ComponentProps<"ol"> & VariantProps<typeof breadcrumbListVariants>) {
  const ctxVariant = React.useContext(BreadcrumbVariantContext)
  const resolved = (variant ?? ctxVariant) as BreadcrumbVariant

  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(breadcrumbListVariants({ variant: resolved }), className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const variant = React.useContext(BreadcrumbVariantContext)
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(breadcrumbLinkVariants({ variant }), className)}
      {...props}
    />
  )
}

function BreadcrumbPage({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const variant = React.useContext(BreadcrumbVariantContext)
  const isSecession = variant.endsWith("-secession")

  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(breadcrumbPageVariants({ variant }), className)}
      {...props}
    >
      {isSecession && (
        <span aria-hidden className="size-2 bg-current opacity-85" />
      )}
      {children}
    </span>
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  const variant = React.useContext(BreadcrumbVariantContext)

  let defaultSep: React.ReactNode = <ChevronRightIcon className="size-3.5" />
  if (variant !== "default") {
    if (variant.endsWith("-secession")) {
      defaultSep = (
        <span aria-hidden className="inline-flex items-center gap-1 opacity-55">
          <span className="h-3 w-px bg-current" />
          <span className="size-1.5 rotate-45 bg-current" />
          <span className="h-3 w-px bg-current" />
        </span>
      )
    } else if (variant.endsWith("-ribbon")) {
      defaultSep = (
        <span aria-hidden className="size-1.5 rotate-45 bg-current opacity-60" />
      )
    } else {
      defaultSep = (
        <svg
          aria-hidden
          viewBox="0 0 22 12"
          className="h-3 w-5 shrink-0 opacity-75"
          fill="none"
        >
          <path
            d="M2 8 C7 8 9 4 15 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M12.5 3.2 L17.5 6 L12.5 8.8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6.5" cy="5.5" r="1.3" fill="currentColor" />
        </svg>
      )
    }
  }

  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      {children ?? defaultSep}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const variant = React.useContext(BreadcrumbVariantContext)
  const isSecession = variant.endsWith("-secession")
  const isJugend = variant !== "default"

  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-8 items-center justify-center", className)}
      {...props}
    >
      {!isJugend ? (
        <MoreHorizontalIcon className="size-4" />
      ) : isSecession ? (
        <span className="inline-flex items-center gap-1 opacity-70">
          <span className="size-1.5 bg-current" />
          <span className="size-1.5 bg-current" />
          <span className="size-1.5 bg-current" />
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 opacity-75">
          <span className="size-1.5 rounded-full bg-current" />
          <span className="size-2 rounded-full bg-current" />
          <span className="size-1.5 rounded-full bg-current" />
        </span>
      )}
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbVariant,
}
