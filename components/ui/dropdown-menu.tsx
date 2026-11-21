"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

type DropdownMenuVariant = NonNullable<
  VariantProps<typeof dropdownMenuContentVariants>["variant"]
>

const DropdownMenuVariantContext =
  React.createContext<DropdownMenuVariant>("default")

const framedMenuBase =
  "relative isolate border-0 bg-transparent ring-0 rounded-none [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch] before:drop-shadow-xl"

const dropdownMenuContentVariants = cva(
  "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-w-44 duration-100 z-50 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden group/dropdown-menu-content",
  {
    variants: {
      variant: {
        default:
          "ring-foreground/10 bg-popover text-popover-foreground rounded-lg p-1 shadow-md ring-1",

        // Version 1: Botanical Parchment Menu (menu-frame-1.svg, 24px border for rich corner leaves)
        autumn: `${framedMenuBase} min-w-64 text-[#2C1E0F] p-5 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/autumn/menu-frame-1.svg')]`,
        winter: `${framedMenuBase} min-w-64 text-[#14283D] p-5 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/winter/menu-frame-1.svg')]`,
        spring: `${framedMenuBase} min-w-64 text-[#1F3114] p-5 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/spring/menu-frame-1.svg')]`,
        summer: `${framedMenuBase} min-w-64 text-[#2E1E04] p-5 before:border-[24px] before:[border-image-slice:calc(28/140*100%)_calc(28/140*100%)_fill] before:[border-image-source:url('/summer/menu-frame-1.svg')]`,

        // Version 2: Vienna Secession Cabinet Menu (menu-frame-2.svg)
        "autumn-secession": `${framedMenuBase} min-w-64 text-[#2C1E0F] p-4 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/autumn/menu-frame-2.svg')]`,
        "winter-secession": `${framedMenuBase} min-w-64 text-[#14283D] p-4 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/winter/menu-frame-2.svg')]`,
        "spring-secession": `${framedMenuBase} min-w-64 text-[#1F3114] p-4 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/spring/menu-frame-2.svg')]`,
        "summer-secession": `${framedMenuBase} min-w-64 text-[#2E1E04] p-4 before:border-[18px] before:[border-image-slice:calc(24/140*100%)_calc(24/140*100%)_fill] before:[border-image-source:url('/summer/menu-frame-2.svg')]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 6,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> &
  VariantProps<typeof dropdownMenuContentVariants>) {
  const resolvedVariant = variant ?? "default"
  const isJugend = resolvedVariant !== "default"

  return (
    <DropdownMenuVariantContext.Provider value={resolvedVariant}>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          data-slot="dropdown-menu-content"
          data-variant={resolvedVariant}
          data-jugend={isJugend ? "true" : undefined}
          sideOffset={sideOffset}
          align={align}
          className={cn(
            dropdownMenuContentVariants({ variant: resolvedVariant }),
            className
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuVariantContext.Provider>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  const menuVariant = React.useContext(DropdownMenuVariantContext)
  const isJugend = menuVariant !== "default"

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "gap-2.5 rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-colors",
        isJugend
          ? "min-h-10 rounded-xs focus:bg-current/12 data-[variant=destructive]:text-[#8E2A1B] data-[variant=destructive]:focus:bg-[#8E2A1B]/12"
          : "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  const menuVariant = React.useContext(DropdownMenuVariantContext)
  const isJugend = menuVariant !== "default"

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "gap-2.5 rounded-md py-1.5 pr-8 pl-2.5 text-sm whitespace-nowrap data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        isJugend
          ? "min-h-10 rounded-xs focus:bg-current/12"
          : "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  const menuVariant = React.useContext(DropdownMenuVariantContext)
  const isJugend = menuVariant !== "default"

  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "gap-2.5 rounded-md py-1.5 pr-8 pl-2.5 text-sm whitespace-nowrap data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        isJugend
          ? "min-h-10 rounded-xs focus:bg-current/12"
          : "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  const menuVariant = React.useContext(DropdownMenuVariantContext)
  const isJugend = menuVariant !== "default"

  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2.5 py-1.5 text-xs font-semibold data-inset:pl-7",
        isJugend ? "text-current/75" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  const menuVariant = React.useContext(DropdownMenuVariantContext)
  const isJugend = menuVariant !== "default"

  if (isJugend) {
    return (
      <DropdownMenuPrimitive.Separator
        data-slot="dropdown-menu-separator"
        className={cn("my-2 flex items-center gap-2 px-1", className)}
        {...props}
      >
        <span aria-hidden className="h-px flex-1 bg-current/25" />
        <span aria-hidden className="size-1.5 rotate-45 bg-current/45" />
        <span aria-hidden className="h-px flex-1 bg-current/25" />
      </DropdownMenuPrimitive.Separator>
    )
  }

  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const menuVariant = React.useContext(DropdownMenuVariantContext)
  const isJugend = menuVariant !== "default"

  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto pl-3 text-xs tracking-wide",
        isJugend
          ? "text-current/75"
          : "text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  const menuVariant = React.useContext(DropdownMenuVariantContext)
  const isJugend = menuVariant !== "default"

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "gap-2.5 rounded-md px-2.5 py-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 flex cursor-pointer items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        isJugend
          ? "min-h-10 rounded-xs focus:bg-current/12 data-open:bg-current/12"
          : "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> &
  VariantProps<typeof dropdownMenuContentVariants>) {
  const parentVariant = React.useContext(DropdownMenuVariantContext)
  const resolvedVariant = variant ?? parentVariant

  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      data-variant={resolvedVariant}
      className={cn(
        dropdownMenuContentVariants({ variant: resolvedVariant }),
        "min-w-44",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  dropdownMenuContentVariants,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
