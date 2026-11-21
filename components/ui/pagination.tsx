import { cva } from "class-variance-authority"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

type PaginationVariant =
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

const PaginationVariantContext =
  React.createContext<PaginationVariant>("default")

const salonTrayBase =
  "relative isolate gap-0.5 sm:gap-1 px-4 sm:px-6 py-2 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[12px] before:border-x-[18px] sm:before:border-x-[21px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(16/56*100%)_calc(28/260*100%)_fill]"

const paginationContentVariants = cva(
  "flex flex-wrap items-center justify-center",
  {
    variants: {
      variant: {
        default: "gap-1",

        // V1: Botanical Folio Medallions
        autumn: "gap-1 sm:gap-2 text-[#2C1E0F]",
        winter: "gap-1 sm:gap-2 text-[#14283D]",
        spring: "gap-1 sm:gap-2 text-[#1F3114]",
        summer: "gap-1 sm:gap-2 text-[#2E1E04]",

        // V2: Salon Scroll Tray — fits all 6 items on a single row at 375px mobile
        "autumn-salon": `${salonTrayBase} text-[#2C1E0F] before:[border-image-source:url('/autumn/pagination-tray-salon.svg')]`,
        "winter-salon": `${salonTrayBase} text-[#14283D] before:[border-image-source:url('/winter/pagination-tray-salon.svg')]`,
        "spring-salon": `${salonTrayBase} text-[#1F3114] before:[border-image-source:url('/spring/pagination-tray-salon.svg')]`,
        "summer-salon": `${salonTrayBase} text-[#2E1E04] before:[border-image-source:url('/summer/pagination-tray-salon.svg')]`,

        // V3: Vienna Secession Quadratstil Tiles
        "autumn-secession": "gap-1 sm:gap-1.5 text-[#2C1E0F]",
        "winter-secession": "gap-1 sm:gap-1.5 text-[#14283D]",
        "spring-secession": "gap-1 sm:gap-1.5 text-[#1F3114]",
        "summer-secession": "gap-1 sm:gap-1.5 text-[#2E1E04]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tileBase =
  "relative isolate inline-flex cursor-pointer select-none items-center justify-center text-sm font-medium transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:[border-image-repeat:stretch]"

const paginationLinkVariants = cva("", {
  variants: {
    variant: {
      default:
        "hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[active=true]:border data-[active=true]:border-border data-[active=true]:bg-background",

      // V1: Botanical Medallion Tiles
      autumn: `${tileBase} text-[#2C1E0F] before:border-[12px] before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] before:[border-image-source:url('/autumn/pagination-tile-1.svg')] data-[active=true]:font-bold data-[active=true]:text-[#160D03] data-[active=true]:before:[border-image-source:url('/autumn/pagination-tile-active-1.svg')]`,
      winter: `${tileBase} text-[#14283D] before:border-[12px] before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] before:[border-image-source:url('/winter/pagination-tile-1.svg')] data-[active=true]:font-bold data-[active=true]:text-[#0B1826] data-[active=true]:before:[border-image-source:url('/winter/pagination-tile-active-1.svg')]`,
      spring: `${tileBase} text-[#1F3114] before:border-[12px] before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] before:[border-image-source:url('/spring/pagination-tile-1.svg')] data-[active=true]:font-bold data-[active=true]:text-[#0F1A08] data-[active=true]:before:[border-image-source:url('/spring/pagination-tile-active-1.svg')]`,
      summer: `${tileBase} text-[#2E1E04] before:border-[12px] before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] before:[border-image-source:url('/summer/pagination-tile-1.svg')] data-[active=true]:font-bold data-[active=true]:text-[#1E1301] data-[active=true]:before:[border-image-source:url('/summer/pagination-tile-active-1.svg')]`,

      // V2: Salon Tray
      "autumn-salon":
        "relative isolate inline-flex cursor-pointer select-none items-center justify-center rounded-sm text-sm font-medium text-[#2C1E0F]/80 transition-all hover:bg-[#AE8746]/15 hover:text-[#2C1E0F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75 data-[active=true]:font-bold data-[active=true]:text-[#160D03] data-[active=true]:before:pointer-events-none data-[active=true]:before:absolute data-[active=true]:before:inset-0 data-[active=true]:before:-z-10 data-[active=true]:before:border-solid data-[active=true]:before:border-[10px] data-[active=true]:before:[border-image-repeat:stretch] data-[active=true]:before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] data-[active=true]:before:[border-image-source:url('/autumn/pagination-tile-active-1.svg')]",
      "winter-salon":
        "relative isolate inline-flex cursor-pointer select-none items-center justify-center rounded-sm text-sm font-medium text-[#14283D]/80 transition-all hover:bg-[#7BA7CC]/15 hover:text-[#14283D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75 data-[active=true]:font-bold data-[active=true]:text-[#0B1826] data-[active=true]:before:pointer-events-none data-[active=true]:before:absolute data-[active=true]:before:inset-0 data-[active=true]:before:-z-10 data-[active=true]:before:border-solid data-[active=true]:before:border-[10px] data-[active=true]:before:[border-image-repeat:stretch] data-[active=true]:before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] data-[active=true]:before:[border-image-source:url('/winter/pagination-tile-active-1.svg')]",
      "spring-salon":
        "relative isolate inline-flex cursor-pointer select-none items-center justify-center rounded-sm text-sm font-medium text-[#1F3114]/80 transition-all hover:bg-[#78AA48]/15 hover:text-[#1F3114] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75 data-[active=true]:font-bold data-[active=true]:text-[#0F1A08] data-[active=true]:before:pointer-events-none data-[active=true]:before:absolute data-[active=true]:before:inset-0 data-[active=true]:before:-z-10 data-[active=true]:before:border-solid data-[active=true]:before:border-[10px] data-[active=true]:before:[border-image-repeat:stretch] data-[active=true]:before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] data-[active=true]:before:[border-image-source:url('/spring/pagination-tile-active-1.svg')]",
      "summer-salon":
        "relative isolate inline-flex cursor-pointer select-none items-center justify-center rounded-sm text-sm font-medium text-[#2E1E04]/80 transition-all hover:bg-[#E0A822]/15 hover:text-[#2E1E04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75 data-[active=true]:font-bold data-[active=true]:text-[#1E1301] data-[active=true]:before:pointer-events-none data-[active=true]:before:absolute data-[active=true]:before:inset-0 data-[active=true]:before:-z-10 data-[active=true]:before:border-solid data-[active=true]:before:border-[10px] data-[active=true]:before:[border-image-repeat:stretch] data-[active=true]:before:[border-image-slice:calc(20/64*100%)_calc(20/64*100%)_fill] data-[active=true]:before:[border-image-source:url('/summer/pagination-tile-active-1.svg')]",

      // V3: Vienna Secession Quadratstil Tiles
      "autumn-secession": `${tileBase} text-[#2C1E0F] before:border-[10px] before:[border-image-slice:calc(16/60*100%)_calc(16/60*100%)_fill] before:[border-image-source:url('/autumn/pagination-tile-secession.svg')] data-[active=true]:font-bold data-[active=true]:text-[#160D03] data-[active=true]:before:[border-image-source:url('/autumn/pagination-tile-active-secession.svg')]`,
      "winter-secession": `${tileBase} text-[#14283D] before:border-[10px] before:[border-image-slice:calc(16/60*100%)_calc(16/60*100%)_fill] before:[border-image-source:url('/winter/pagination-tile-secession.svg')] data-[active=true]:font-bold data-[active=true]:text-[#0B1826] data-[active=true]:before:[border-image-source:url('/winter/pagination-tile-active-secession.svg')]`,
      "spring-secession": `${tileBase} text-[#1F3114] before:border-[10px] before:[border-image-slice:calc(16/60*100%)_calc(16/60*100%)_fill] before:[border-image-source:url('/spring/pagination-tile-secession.svg')] data-[active=true]:font-bold data-[active=true]:text-[#0F1A08] data-[active=true]:before:[border-image-source:url('/spring/pagination-tile-active-secession.svg')]`,
      "summer-secession": `${tileBase} text-[#2E1E04] before:border-[10px] before:[border-image-slice:calc(16/60*100%)_calc(16/60*100%)_fill] before:[border-image-source:url('/summer/pagination-tile-secession.svg')] data-[active=true]:font-bold data-[active=true]:text-[#1E1301] data-[active=true]:before:[border-image-source:url('/summer/pagination-tile-active-secession.svg')]`,
    },
    size: {
      icon: "size-9 sm:size-10",
      default: "h-9 sm:h-10 max-sm:w-9 max-sm:px-0 sm:px-3.5 gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "icon",
  },
})

function Pagination({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"nav"> & {
  variant?: PaginationVariant
}) {
  return (
    <PaginationVariantContext.Provider value={variant}>
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        data-variant={variant}
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </PaginationVariantContext.Provider>
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  const variant = React.useContext(PaginationVariantContext)

  return (
    <ul
      data-slot="pagination-content"
      className={cn(paginationContentVariants({ variant }), className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  size?: "icon" | "default"
} & React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  const variant = React.useContext(PaginationVariantContext)

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(paginationLinkVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const variant = React.useContext(PaginationVariantContext)
  const isSalon = variant.endsWith("-salon")

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        isSalon && "mr-0.5 rounded-none border-r border-current/20 sm:pr-3",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const variant = React.useContext(PaginationVariantContext)
  const isSalon = variant.endsWith("-salon")

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        isSalon && "ml-0.5 rounded-none border-l border-current/20 sm:pl-3",
        className
      )}
      {...props}
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const variant = React.useContext(PaginationVariantContext)
  const isSecession = variant.endsWith("-secession")
  const isJugend = variant !== "default"

  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 sm:size-9 items-center justify-center", className)}
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
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationVariant,
}
