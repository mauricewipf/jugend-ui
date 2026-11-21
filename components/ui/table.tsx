import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type TableVariant = NonNullable<VariantProps<typeof tableFrameVariants>["variant"]>

const TableVariantContext = React.createContext<TableVariant>("default")

// Outer wrapper holds the SVG border-image frame; inner wrapper scrolls horizontally on mobile!
const framedTableShell =
  "relative isolate min-w-0 max-w-full p-4 sm:p-6 [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch]"

const tableFrameVariants = cva("relative w-full", {
  variants: {
    variant: {
      default: "overflow-x-auto",

      // V1: Botanical Atelier Catalogue (tabs-panel-1.svg)
      autumn: `${framedTableShell} text-[#2C1E0F] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/autumn/tabs-panel-1.svg')]`,
      winter: `${framedTableShell} text-[#14283D] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/winter/tabs-panel-1.svg')]`,
      spring: `${framedTableShell} text-[#1F3114] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/spring/tabs-panel-1.svg')]`,
      summer: `${framedTableShell} text-[#2E1E04] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/summer/tabs-panel-1.svg')]`,

      // V2: Salon Passe-Partout Ledger (tabs-panel-salon.svg)
      "autumn-salon": `${framedTableShell} text-[#2C1E0F] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/autumn/tabs-panel-salon.svg')]`,
      "winter-salon": `${framedTableShell} text-[#14283D] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/winter/tabs-panel-salon.svg')]`,
      "spring-salon": `${framedTableShell} text-[#1F3114] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/spring/tabs-panel-salon.svg')]`,
      "summer-salon": `${framedTableShell} text-[#2E1E04] before:border-[22px] sm:before:border-[28px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/summer/tabs-panel-salon.svg')]`,

      // V3: Vienna Secession Quadratstil Grid (tabs-panel-secession.svg)
      "autumn-secession": `${framedTableShell} text-[#2C1E0F] before:border-[20px] sm:before:border-[26px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/autumn/tabs-panel-secession.svg')]`,
      "winter-secession": `${framedTableShell} text-[#14283D] before:border-[20px] sm:before:border-[26px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/winter/tabs-panel-secession.svg')]`,
      "spring-secession": `${framedTableShell} text-[#1F3114] before:border-[20px] sm:before:border-[26px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/spring/tabs-panel-secession.svg')]`,
      "summer-secession": `${framedTableShell} text-[#2E1E04] before:border-[20px] sm:before:border-[26px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/summer/tabs-panel-secession.svg')]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Table({
  className,
  containerClassName,
  variant = "default",
  ...props
}: React.ComponentProps<"table"> &
  VariantProps<typeof tableFrameVariants> & {
    containerClassName?: string
  }) {
  const resolved = variant ?? "default"
  const isJugend = resolved !== "default"

  return (
    <TableVariantContext.Provider value={resolved}>
      <div
        data-slot="table-container"
        data-variant={resolved}
        className={cn(tableFrameVariants({ variant: resolved }), containerClassName)}
      >
        <div
          tabIndex={isJugend ? 0 : undefined}
          className={cn(
            isJugend &&
              "w-full overflow-x-auto overflow-y-hidden overscroll-x-contain pb-1 outline-none focus-visible:outline-2 focus-visible:outline-current/60"
          )}
        >
          <table
            data-slot="table"
            className={cn("w-full caption-bottom text-sm", className)}
            {...props}
          />
        </div>
      </div>
    </TableVariantContext.Provider>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  const variant = React.useContext(TableVariantContext)
  const isJugend = variant !== "default"

  return (
    <thead
      data-slot="table-header"
      className={cn(
        isJugend
          ? "bg-current/[0.06] [&_tr]:border-b-2 [&_tr]:border-current/35"
          : "[&_tr]:border-b",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  const variant = React.useContext(TableVariantContext)
  const isSalon = variant.endsWith("-salon")

  return (
    <tbody
      data-slot="table-tbody"
      className={cn(
        "[&_tr:last-child]:border-0",
        isSalon && "[&_tr:nth-child(even)]:bg-current/[0.035]",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  const variant = React.useContext(TableVariantContext)
  const isJugend = variant !== "default"

  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t font-medium [&>tr]:last:border-b-0",
        isJugend ? "border-current/30 bg-current/[0.05]" : "bg-muted/50",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  const variant = React.useContext(TableVariantContext)
  const isJugend = variant !== "default"
  const isSalon = variant.endsWith("-salon")
  const isSecession = variant.endsWith("-secession")

  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors",
        isJugend
          ? "border-current/15 hover:bg-current/[0.05]"
          : "hover:bg-muted/50 data-[state=selected]:bg-muted",
        (isSalon || isSecession) && "divide-x divide-current/12",
        className
      )}
      {...props}
    />
  )
}

function TableHead({
  className,
  children,
  ...props
}: React.ComponentProps<"th">) {
  const variant = React.useContext(TableVariantContext)
  const isJugend = variant !== "default"
  const isSecession = variant.endsWith("-secession")
  const isBotanical =
    isJugend && !isSecession && !variant.endsWith("-salon")

  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-3.5 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        isJugend
          ? cn(
              "font-semibold text-current",
              isBotanical && cn(ambrosia.className, "text-lg font-normal tracking-wide")
            )
          : "text-foreground font-medium",
        className
      )}
      {...props}
    >
      {isSecession ? (
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 bg-current opacity-70" />
          {children}
        </span>
      ) : (
        children
      )}
    </th>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-3.5 py-2.5 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  const variant = React.useContext(TableVariantContext)
  const isJugend = variant !== "default"

  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-3 text-xs",
        isJugend ? "text-current/70" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  tableFrameVariants,
  TableHead,
  TableHeader,
  TableRow,
}
