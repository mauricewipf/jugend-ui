"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Avatar as AvatarPrimitive } from "radix-ui"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

type AvatarVariant = NonNullable<VariantProps<typeof avatarVariants>["variant"]>

const AvatarVariantContext = React.createContext<AvatarVariant>("default")

// 1:1 full-bleed SVG medallion bezel layered ABOVE (`after:z-10`) the inset portrait!
const bezelBase =
  "relative isolate inline-flex shrink-0 select-none items-center justify-center overflow-visible rounded-none after:pointer-events-none after:absolute after:inset-0 after:z-10 after:bg-contain after:bg-center after:bg-no-repeat"

const avatarVariants = cva("relative flex shrink-0", {
  variants: {
    variant: {
      default: "overflow-hidden rounded-full",

      // V1: Alphonse Mucha Zodiac Botanical Halo (avatar-medallion-1.svg)
      autumn: `${bezelBase} text-[#2C1E0F] after:bg-[url('/autumn/avatar-medallion-1.svg')]`,
      winter: `${bezelBase} text-[#14283D] after:bg-[url('/winter/avatar-medallion-1.svg')]`,
      spring: `${bezelBase} text-[#1F3114] after:bg-[url('/spring/avatar-medallion-1.svg')]`,
      summer: `${bezelBase} text-[#2E1E04] after:bg-[url('/summer/avatar-medallion-1.svg')]`,

      // V2: Salon Cameo Bezel (avatar-medallion-salon.svg)
      "autumn-salon": `${bezelBase} text-[#2C1E0F] after:bg-[url('/autumn/avatar-medallion-salon.svg')]`,
      "winter-salon": `${bezelBase} text-[#14283D] after:bg-[url('/winter/avatar-medallion-salon.svg')]`,
      "spring-salon": `${bezelBase} text-[#1F3114] after:bg-[url('/spring/avatar-medallion-salon.svg')]`,
      "summer-salon": `${bezelBase} text-[#2E1E04] after:bg-[url('/summer/avatar-medallion-salon.svg')]`,

      // V3: Vienna Secession Octagonal Portrait Stamp (avatar-medallion-secession.svg)
      "autumn-secession": `${bezelBase} text-[#2C1E0F] after:bg-[url('/autumn/avatar-medallion-secession.svg')]`,
      "winter-secession": `${bezelBase} text-[#14283D] after:bg-[url('/winter/avatar-medallion-secession.svg')]`,
      "spring-secession": `${bezelBase} text-[#1F3114] after:bg-[url('/spring/avatar-medallion-secession.svg')]`,
      "summer-secession": `${bezelBase} text-[#2E1E04] after:bg-[url('/summer/avatar-medallion-secession.svg')]`,
    },
    size: {
      sm: "size-10 text-sm",
      default: "size-14 text-lg",
      lg: "size-20 text-2xl",
      xl: "size-24 text-3xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function getSeasonBg(variant: AvatarVariant): string {
  if (variant.startsWith("winter")) return "bg-[#DCEBF6]"
  if (variant.startsWith("spring")) return "bg-[#DFEFD4]"
  if (variant.startsWith("summer")) return "bg-[#FBF0BE]"
  return "bg-[#F0DFBE]"
}

function Avatar({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  const resolved = variant ?? "default"

  return (
    <AvatarVariantContext.Provider value={resolved}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        data-variant={resolved}
        data-size={size}
        className={cn(avatarVariants({ variant: resolved, size }), className)}
        {...props}
      />
    </AvatarVariantContext.Provider>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  const variant = React.useContext(AvatarVariantContext)
  const isJugend = variant !== "default"
  const isSecession = variant.endsWith("-secession")

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "object-cover",
        !isJugend && "aspect-square size-full",
        isJugend &&
          !isSecession &&
          "absolute inset-[12.5%] z-0 size-[75%] rounded-full",
        isJugend &&
          isSecession &&
          "absolute inset-[12.5%] z-0 size-[75%] [clip-path:polygon(23.5%_0%,76.5%_0%,100%_23.5%,100%_76.5%,76.5%_100%,23.5%_100%,0%_76.5%,0%_23.5%)]",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const variant = React.useContext(AvatarVariantContext)
  const isJugend = variant !== "default"
  const isSecession = variant.endsWith("-secession")

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex items-center justify-center",
        !isJugend && "bg-muted size-full rounded-full text-sm font-medium",
        isJugend &&
          cn(
            ambrosia.className,
            getSeasonBg(variant),
            "absolute z-0 tracking-wide",
            isSecession
              ? "inset-[12.5%] size-[75%] [clip-path:polygon(23.5%_0%,76.5%_0%,100%_23.5%,100%_76.5%,76.5%_100%,23.5%_100%,0%_76.5%,0%_23.5%)]"
              : "inset-[12.5%] size-[75%] rounded-full"
          ),
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex items-center -space-x-2.5", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage, avatarVariants }
