import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

const quoteJugendBase =
  "relative isolate min-w-0 border-0 bg-transparent [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-solid before:[border-image-repeat:stretch]"

const blockquoteVariants = cva("text-sm sm:text-base leading-relaxed", {
  variants: {
    variant: {
      default: "border-l-2 pl-6 italic",

      // V1: Asymmetric Left-Spined Botanical Epigraph Scroll (slice 28 28 28 40 -> 21 21 21 30)
      autumn: `${quoteJugendBase} text-[#2C1E0F] pl-9 pr-6 py-7 sm:pl-10 sm:pr-8 sm:py-7 before:border-y-[21px] before:border-r-[21px] before:border-l-[30px] before:[border-image-slice:calc(28/120*100%)_calc(28/220*100%)_calc(28/120*100%)_calc(40/220*100%)_fill] before:[border-image-source:url('/autumn/blockquote-frame-1.svg')]`,
      winter: `${quoteJugendBase} text-[#14283D] pl-9 pr-6 py-7 sm:pl-10 sm:pr-8 sm:py-7 before:border-y-[21px] before:border-r-[21px] before:border-l-[30px] before:[border-image-slice:calc(28/120*100%)_calc(28/220*100%)_calc(28/120*100%)_calc(40/220*100%)_fill] before:[border-image-source:url('/winter/blockquote-frame-1.svg')]`,
      spring: `${quoteJugendBase} text-[#1F3114] pl-9 pr-6 py-7 sm:pl-10 sm:pr-8 sm:py-7 before:border-y-[21px] before:border-r-[21px] before:border-l-[30px] before:[border-image-slice:calc(28/120*100%)_calc(28/220*100%)_calc(28/120*100%)_calc(40/220*100%)_fill] before:[border-image-source:url('/spring/blockquote-frame-1.svg')]`,
      summer: `${quoteJugendBase} text-[#2E1E04] pl-9 pr-6 py-7 sm:pl-10 sm:pr-8 sm:py-7 before:border-y-[21px] before:border-r-[21px] before:border-l-[30px] before:[border-image-slice:calc(28/120*100%)_calc(28/220*100%)_calc(28/120*100%)_calc(40/220*100%)_fill] before:[border-image-source:url('/summer/blockquote-frame-1.svg')]`,

      // V2: Salon Passe-Partout Literary Plaque
      "autumn-salon": `${quoteJugendBase} text-center text-[#2C1E0F] p-7 sm:p-8 before:border-[21px] before:[border-image-slice:calc(28/120*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/autumn/blockquote-frame-salon.svg')]`,
      "winter-salon": `${quoteJugendBase} text-center text-[#14283D] p-7 sm:p-8 before:border-[21px] before:[border-image-slice:calc(28/120*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/winter/blockquote-frame-salon.svg')]`,
      "spring-salon": `${quoteJugendBase} text-center text-[#1F3114] p-7 sm:p-8 before:border-[21px] before:[border-image-slice:calc(28/120*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/spring/blockquote-frame-salon.svg')]`,
      "summer-salon": `${quoteJugendBase} text-center text-[#2E1E04] p-7 sm:p-8 before:border-[21px] before:[border-image-slice:calc(28/120*100%)_calc(28/200*100%)_fill] before:[border-image-source:url('/summer/blockquote-frame-salon.svg')]`,

      // V3: Vienna Secession Manifesto Tablet
      "autumn-secession": `${quoteJugendBase} text-[#2C1E0F] p-6 sm:p-7 before:border-[18px] before:[border-image-slice:calc(24/120*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/autumn/blockquote-frame-secession.svg')]`,
      "winter-secession": `${quoteJugendBase} text-[#14283D] p-6 sm:p-7 before:border-[18px] before:[border-image-slice:calc(24/120*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/winter/blockquote-frame-secession.svg')]`,
      "spring-secession": `${quoteJugendBase} text-[#1F3114] p-6 sm:p-7 before:border-[18px] before:[border-image-slice:calc(24/120*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/spring/blockquote-frame-secession.svg')]`,
      "summer-secession": `${quoteJugendBase} text-[#2E1E04] p-6 sm:p-7 before:border-[18px] before:[border-image-slice:calc(24/120*100%)_calc(24/200*100%)_fill] before:[border-image-source:url('/summer/blockquote-frame-secession.svg')]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function QuoteOrnament({
  isSecession,
  centered,
}: {
  isSecession: boolean
  centered: boolean
}) {
  if (isSecession) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 28 18"
        className={cn("mb-2 h-4 w-7 opacity-60", centered && "mx-auto")}
        fill="currentColor"
      >
        <polygon points="3,2 11,2 8,16 2,16" />
        <polygon points="15,2 23,2 20,16 14,16" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 28 20"
      className={cn("mb-2 h-5 w-7 opacity-65", centered && "mx-auto")}
      fill="currentColor"
    >
      <path d="M11 3 C6 3 2.5 6.8 2.5 11.5 C2.5 15.2 5 17.8 8.2 17.8 C10.8 17.8 12.6 16 12.6 13.6 C12.6 11.4 10.9 9.8 8.7 9.8 C7.9 9.8 7.2 10 6.6 10.4 C7.1 7.4 9.2 5.4 12.2 4.6 Z" />
      <path d="M24.5 3 C19.5 3 16 6.8 16 11.5 C16 15.2 18.5 17.8 21.7 17.8 C24.3 17.8 26.1 16 26.1 13.6 C26.1 11.4 24.4 9.8 22.2 9.8 C21.4 9.8 20.7 10 20.1 10.4 C20.6 7.4 22.7 5.4 25.7 4.6 Z" />
    </svg>
  )
}

function Blockquote({
  className,
  variant = "default",
  author,
  children,
  ...props
}: React.ComponentProps<"blockquote"> &
  VariantProps<typeof blockquoteVariants> & {
    author?: React.ReactNode
  }) {
  const resolved = variant ?? "default"
  const isJugend = resolved !== "default"
  const isSalon = resolved.endsWith("-salon")
  const isSecession = resolved.endsWith("-secession")

  return (
    <blockquote
      data-slot="blockquote"
      data-variant={resolved}
      className={cn(blockquoteVariants({ variant: resolved }), className)}
      {...props}
    >
      {isJugend && (
        <QuoteOrnament isSecession={isSecession} centered={isSalon} />
      )}
      <div>{children}</div>
      {author && (
        <footer
          data-slot="blockquote-cite"
          className={cn(
            "mt-3 flex items-center gap-2 text-xs font-semibold opacity-85",
            isSalon && "justify-center"
          )}
        >
          <span aria-hidden className="size-1.5 rotate-45 bg-current" />
          <cite
            className={cn(
              ambrosia.className,
              "text-lg font-normal not-italic tracking-wide"
            )}
          >
            {author}
          </cite>
        </footer>
      )}
    </blockquote>
  )
}

export { Blockquote, blockquoteVariants }
