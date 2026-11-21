"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

type TabsVariant =
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

const TabsVariantContext = React.createContext<TabsVariant>("default")

const corniceScrollBase =
  "w-full flex-nowrap overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-end gap-1"

const tabsListVariants = cva("inline-flex max-w-full items-center", {
  variants: {
    variant: {
      default:
        "bg-muted text-muted-foreground h-10 flex-wrap justify-center rounded-lg p-1 gap-1",

      // V1: Botanical Arch Register — single-row cornice rail, scrollable if 4+ tabs
      autumn: `${corniceScrollBase} border-b-2 border-[#AE8746]/70 px-1 pt-1 pb-0 text-[#2C1E0F]`,
      winter: `${corniceScrollBase} border-b-2 border-[#7BA7CC]/70 px-1 pt-1 pb-0 text-[#14283D]`,
      spring: `${corniceScrollBase} border-b-2 border-[#78AA48]/70 px-1 pt-1 pb-0 text-[#1F3114]`,
      summer: `${corniceScrollBase} border-b-2 border-[#E0A822]/70 px-1 pt-1 pb-0 text-[#2E1E04]`,

      // V2: Salon Cartouche Tray — corner-safe passe-partout tray, single-row scroll-safe
      "autumn-salon":
        "relative isolate w-fit max-w-full flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1 px-3.5 py-2 sm:px-4 text-[#2C1E0F] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[12px] before:border-x-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(16/56*100%)_calc(24/240*100%)_fill] before:[border-image-source:url('/autumn/tabs-tray-salon.svg')]",
      "winter-salon":
        "relative isolate w-fit max-w-full flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1 px-3.5 py-2 sm:px-4 text-[#14283D] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[12px] before:border-x-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(16/56*100%)_calc(24/240*100%)_fill] before:[border-image-source:url('/winter/tabs-tray-salon.svg')]",
      "spring-salon":
        "relative isolate w-fit max-w-full flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1 px-3.5 py-2 sm:px-4 text-[#1F3114] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[12px] before:border-x-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(16/56*100%)_calc(24/240*100%)_fill] before:[border-image-source:url('/spring/tabs-tray-salon.svg')]",
      "summer-salon":
        "relative isolate w-fit max-w-full flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1 px-3.5 py-2 sm:px-4 text-[#2E1E04] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:border-solid before:border-y-[12px] before:border-x-[18px] before:[border-image-repeat:stretch] before:[border-image-slice:calc(16/56*100%)_calc(24/240*100%)_fill] before:[border-image-source:url('/summer/tabs-tray-salon.svg')]",

      // V3: Vienna Secession Quadratstil Register
      "autumn-secession": `${corniceScrollBase} border-b-2 border-[#473418] pb-0 text-[#2C1E0F]`,
      "winter-secession": `${corniceScrollBase} border-b-2 border-[#1F3A56] pb-0 text-[#14283D]`,
      "spring-secession": `${corniceScrollBase} border-b-2 border-[#2F441B] pb-0 text-[#1F3114]`,
      "summer-secession": `${corniceScrollBase} border-b-2 border-[#3F2A04] pb-0 text-[#2E1E04]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const triggerJugendBase =
  "relative isolate shrink-0 whitespace-nowrap cursor-pointer select-none inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current/75 [&_svg]:size-4 [&_svg]:shrink-0"

const tabsTriggerVariants = cva("", {
  variants: {
    variant: {
      default:
        "data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-xs",

      // V1: Botanical Arch Register — open-bottom arched transom seats flush on cornice
      autumn: `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#2C1E0F]/75 hover:bg-[#AE8746]/10 hover:text-[#2C1E0F] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#2C1E0F] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[15px] data-[state=active]:before:border-x-[18px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(20/52*100%)_calc(24/160*100%)_0_calc(24/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/autumn/tabs-trigger-1.svg')]`,
      winter: `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#14283D]/75 hover:bg-[#7BA7CC]/10 hover:text-[#14283D] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#14283D] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[15px] data-[state=active]:before:border-x-[18px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(20/52*100%)_calc(24/160*100%)_0_calc(24/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/winter/tabs-trigger-1.svg')]`,
      spring: `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#1F3114]/75 hover:bg-[#78AA48]/10 hover:text-[#1F3114] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#1F3114] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[15px] data-[state=active]:before:border-x-[18px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(20/52*100%)_calc(24/160*100%)_0_calc(24/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/spring/tabs-trigger-1.svg')]`,
      summer: `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#2E1E04]/75 hover:bg-[#E0A822]/10 hover:text-[#2E1E04] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#2E1E04] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[15px] data-[state=active]:before:border-x-[18px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(20/52*100%)_calc(24/160*100%)_0_calc(24/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/summer/tabs-trigger-1.svg')]`,

      // V2: Salon Cartouche — active tab wears gilded stadium cartouche
      "autumn-salon": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-1.5 rounded-sm text-[#2C1E0F]/80 hover:bg-[#AE8746]/12 hover:text-[#2C1E0F] data-[state=active]:font-semibold data-[state=active]:text-[#160D03] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-y-[12px] data-[state=active]:before:border-x-[15px] data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(20/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/autumn/tabs-trigger-salon.svg')]`,
      "winter-salon": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-1.5 rounded-sm text-[#14283D]/80 hover:bg-[#7BA7CC]/12 hover:text-[#14283D] data-[state=active]:font-semibold data-[state=active]:text-[#0B1826] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-y-[12px] data-[state=active]:before:border-x-[15px] data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(20/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/winter/tabs-trigger-salon.svg')]`,
      "spring-salon": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-1.5 rounded-sm text-[#1F3114]/80 hover:bg-[#78AA48]/12 hover:text-[#1F3114] data-[state=active]:font-semibold data-[state=active]:text-[#0F1A08] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-y-[12px] data-[state=active]:before:border-x-[15px] data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(20/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/spring/tabs-trigger-salon.svg')]`,
      "summer-salon": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-1.5 rounded-sm text-[#2E1E04]/80 hover:bg-[#E0A822]/12 hover:text-[#2E1E04] data-[state=active]:font-semibold data-[state=active]:text-[#1E1301] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-y-[12px] data-[state=active]:before:border-x-[15px] data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(20/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/summer/tabs-trigger-salon.svg')]`,

      // V3: Vienna Secession Quadratstil — open-bottom chamfered register
      "autumn-secession": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#2C1E0F]/75 hover:bg-[#AE8746]/10 hover:text-[#2C1E0F] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#2C1E0F] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[12px] data-[state=active]:before:border-x-[12px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(16/160*100%)_0_calc(16/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/autumn/tabs-trigger-secession.svg')]`,
      "winter-secession": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#14283D]/75 hover:bg-[#7BA7CC]/10 hover:text-[#14283D] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#14283D] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[12px] data-[state=active]:before:border-x-[12px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(16/160*100%)_0_calc(16/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/winter/tabs-trigger-secession.svg')]`,
      "spring-secession": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#1F3114]/75 hover:bg-[#78AA48]/10 hover:text-[#1F3114] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#1F3114] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[12px] data-[state=active]:before:border-x-[12px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(16/160*100%)_0_calc(16/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/spring/tabs-trigger-secession.svg')]`,
      "summer-secession": `${triggerJugendBase} min-h-11 sm:min-h-10 px-3.5 sm:px-4 py-2 text-[#2E1E04]/75 hover:bg-[#E0A822]/10 hover:text-[#2E1E04] data-[state=active]:z-10 data-[state=active]:font-semibold data-[state=active]:text-[#2E1E04] data-[state=active]:hover:bg-transparent data-[state=active]:before:pointer-events-none data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:border-solid data-[state=active]:before:border-t-[12px] data-[state=active]:before:border-x-[12px] data-[state=active]:before:border-b-0 data-[state=active]:before:[border-image-repeat:stretch] data-[state=active]:before:[border-image-slice:calc(16/48*100%)_calc(16/160*100%)_0_calc(16/160*100%)_fill] data-[state=active]:before:[border-image-source:url('/summer/tabs-trigger-secession.svg')]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const panelBase =
  "relative isolate min-w-0 outline-none [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch]"

const tabsContentVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "mt-2 outline-none",

      autumn: `${panelBase} mt-2.5 p-6 sm:p-8 text-[#2C1E0F] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/autumn/tabs-panel-1.svg')]`,
      winter: `${panelBase} mt-2.5 p-6 sm:p-8 text-[#14283D] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/winter/tabs-panel-1.svg')]`,
      spring: `${panelBase} mt-2.5 p-6 sm:p-8 text-[#1F3114] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/spring/tabs-panel-1.svg')]`,
      summer: `${panelBase} mt-2.5 p-6 sm:p-8 text-[#2E1E04] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/summer/tabs-panel-1.svg')]`,

      "autumn-salon": `${panelBase} mt-2.5 p-6 sm:p-8 text-[#2C1E0F] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/autumn/tabs-panel-salon.svg')]`,
      "winter-salon": `${panelBase} mt-2.5 p-6 sm:p-8 text-[#14283D] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/winter/tabs-panel-salon.svg')]`,
      "spring-salon": `${panelBase} mt-2.5 p-6 sm:p-8 text-[#1F3114] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/spring/tabs-panel-salon.svg')]`,
      "summer-salon": `${panelBase} mt-2.5 p-6 sm:p-8 text-[#2E1E04] before:border-[24px] sm:before:border-[32px] before:[border-image-slice:calc(32/140*100%)_calc(32/180*100%)_fill] before:[border-image-source:url('/summer/tabs-panel-salon.svg')]`,

      "autumn-secession": `${panelBase} mt-2.5 p-6 sm:p-7 text-[#2C1E0F] before:border-[21px] sm:before:border-[28px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/autumn/tabs-panel-secession.svg')]`,
      "winter-secession": `${panelBase} mt-2.5 p-6 sm:p-7 text-[#14283D] before:border-[21px] sm:before:border-[28px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/winter/tabs-panel-secession.svg')]`,
      "spring-secession": `${panelBase} mt-2.5 p-6 sm:p-7 text-[#1F3114] before:border-[21px] sm:before:border-[28px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/spring/tabs-panel-secession.svg')]`,
      "summer-secession": `${panelBase} mt-2.5 p-6 sm:p-7 text-[#2E1E04] before:border-[21px] sm:before:border-[28px] before:[border-image-slice:calc(28/140*100%)_calc(28/180*100%)_fill] before:[border-image-source:url('/summer/tabs-panel-secession.svg')]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Tabs({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant
}) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        className={cn("flex min-w-0 flex-col", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const ctxVariant = React.useContext(TabsVariantContext)
  const resolved = variant ?? ctxVariant

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={resolved}
      className={cn(tabsListVariants({ variant: resolved }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>) {
  const ctxVariant = React.useContext(TabsVariantContext)
  const resolved = variant ?? ctxVariant

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-variant={resolved}
      className={cn(tabsTriggerVariants({ variant: resolved }), className)}
      {...props}
    />
  )
}

function TabsContent({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>) {
  const ctxVariant = React.useContext(TabsVariantContext)
  const resolved = variant ?? ctxVariant

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      data-variant={resolved}
      className={cn(tabsContentVariants({ variant: resolved }), className)}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsContent,
  tabsContentVariants,
  TabsList,
  tabsListVariants,
  TabsTrigger,
  tabsTriggerVariants,
  type TabsVariant,
}
