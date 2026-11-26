"use client"

import {
  ArrowLeftIcon,
  BellIcon,
  BookmarkIcon,
  CompassIcon,
  Flower2Icon,
  Maximize2Icon,
  Minimize2Icon,
  SlidersHorizontalIcon,
  SparklesIcon,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { ambrosia } from "@/lib/fonts/ambrosia"
import { cn } from "@/lib/utils"

import {
  DRAFT_PALETTES,
  DRAFT_STYLES,
  type DraftStyleId,
  type PaletteId,
} from "./frame-geometry"
import {
  OrganicButton,
  OrganicCard,
  OrganicHeading,
} from "./organic-frame"

const FEATURED_PALETTES: PaletteId[] = [
  "koralle",
  "salbei_multi",
  "tuerkis",
  "sage",
  "terrakotta",
  "pfau",
]

const CLASSIC_PALETTES: PaletteId[] = [
  "pergament",
  "spring",
  "autumn",
  "summer",
  "winter",
]

type DraftFilter = "finalist" | "multi" | "new" | "classic" | "all"

const SMALL_TILES = [
  { title: "Kleine Kachel", sub: "1895 · Wien" },
  { title: "Pavillon", sub: "12 Werke" },
]

export default function DraftsPage() {
  const [paletteId, setPaletteId] = React.useState<PaletteId>("salbei_multi")
  const [filter, setFilter] = React.useState<DraftFilter>("finalist")
  const [labStyle, setLabStyle] = React.useState<DraftStyleId>("asym_synthese")
  const [labWidth, setLabWidth] = React.useState<number>(520)
  const [labHeight, setLabHeight] = React.useState<number>(255)
  const [labMeta, setLabMeta] = React.useState({
    hasTopCrest: true,
    hasSideFlourish: true,
    hasBottomCrest: false,
  })

  const palette = DRAFT_PALETTES[paletteId]
  const visibleDrafts = React.useMemo(() => {
    if (filter === "all") return DRAFT_STYLES
    return DRAFT_STYLES.filter((s) => s.group === filter)
  }, [filter])

  const activeLabStyle =
    DRAFT_STYLES.find((s) => s.id === labStyle) ?? DRAFT_STYLES[0]

  return (
    <div
      style={{
        backgroundColor: palette.pageBg,
        color: palette.text,
      }}
      className="min-h-screen transition-colors duration-300"
    >
      {/* Sticky Top Control Bar */}
      <header
        style={{
          backgroundColor: `${palette.pageBg}F2`,
          borderColor: `${palette.stroke}24`,
        }}
        className="sticky top-0 z-40 border-b backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Link
              href="/showcase"
              style={{ color: palette.mutedText }}
              className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
            >
              <ArrowLeftIcon className="size-3.5" />
              Showcase
            </Link>
            <span
              style={{ color: `${palette.stroke}40` }}
              className="hidden sm:inline"
            >
              |
            </span>
            <span
              className={cn(
                ambrosia.variable,
                "[font-family:var(--font-ambrosia),serif] hidden text-xl tracking-wide sm:inline"
              )}
            >
              Rahmen-Drafts
            </span>
          </div>

          {/* Primary Multi-Color & Poster Palettes */}
          <div className="flex flex-wrap items-center gap-1">
            {FEATURED_PALETTES.map((id) => {
              const p = DRAFT_PALETTES[id]
              const active = id === paletteId
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPaletteId(id)}
                  style={{
                    backgroundColor: active ? palette.stroke : palette.surface,
                    color: active ? palette.pageBg : palette.text,
                    borderColor: `${palette.stroke}45`,
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all"
                >
                  <span className="inline-flex -space-x-1">
                    <span
                      style={{
                        backgroundColor: p.stem,
                        borderColor: p.stroke,
                      }}
                      className="size-2.5 rounded-full border"
                    />
                    <span
                      style={{
                        backgroundColor: p.petalPrimary,
                        borderColor: p.stroke,
                      }}
                      className="size-2.5 rounded-full border"
                    />
                  </span>
                  {p.label}
                </button>
              )
            })}
            <select
              aria-label="Weitere Paletten"
              value={
                CLASSIC_PALETTES.includes(paletteId) ? paletteId : ""
              }
              onChange={(e) => {
                if (e.target.value) {
                  setPaletteId(e.target.value as PaletteId)
                }
              }}
              style={{
                backgroundColor: CLASSIC_PALETTES.includes(paletteId)
                  ? palette.stroke
                  : palette.surface,
                color: CLASSIC_PALETTES.includes(paletteId)
                  ? palette.pageBg
                  : palette.mutedText,
                borderColor: `${palette.stroke}40`,
              }}
              className="cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-medium outline-none"
            >
              <option value="">+ Mehr…</option>
              {CLASSIC_PALETTES.map((id) => (
                <option key={id} value={id}>
                  {DRAFT_PALETTES[id].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16">
        {/* Intro Header */}
        <section className="mx-auto max-w-3xl space-y-4 text-center">
          <p
            style={{
              backgroundColor: palette.pillBg,
              color: palette.pillText,
              borderColor: `${palette.stroke}35`,
            }}
            className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-medium"
          >
            <SparklesIcon className="size-3.5" />
            Finalisten · Synthese aus deinen Favoriten (20 Drafts)
          </p>
          <h1
            className={cn(
              ambrosia.variable,
              "[font-family:var(--font-ambrosia),serif] text-4xl tracking-tight sm:text-6xl"
            )}
          >
            Jugendstil Rahmen-Atelier
          </h1>
          <p
            style={{ color: palette.mutedText }}
            className="mx-auto max-w-2xl text-sm leading-relaxed sm:text-base"
          >
            Die <strong>3 Finalisten (18–20)</strong> verbinden alles, was dir
            am besten gefallen hat: <strong>Draft 06</strong> (Schleifen,
            Krone &amp; Fächer), die <strong>Asymmetrie aus Draft 08</strong>,
            die <strong>3-Blatt-Irisblüten aus Draft 09</strong>,{" "}
            <strong>nach unten geöffnete Rahmen</strong> und mehrfarbige
            Lithografie-Paletten.
          </p>

          {/* Group Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {(
              [
                { id: "finalist", label: "Finalisten · Synthese (18–20)" },
                { id: "multi", label: "Mehrfarbig (13–17)" },
                { id: "new", label: "Verrückt (06–12)" },
                { id: "classic", label: "Erste Runde (01–05)" },
                { id: "all", label: "Alle 20" },
              ] as const
            ).map((tab) => {
              const active = filter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  style={{
                    backgroundColor: active ? palette.stroke : palette.surface,
                    color: active ? palette.pageBg : palette.text,
                    borderColor: `${palette.stroke}45`,
                  }}
                  className="cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-all"
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Quick Jump Pills */}
          <nav className="flex flex-wrap justify-center gap-1.5 pt-1">
            <a
              href="#responsive-lab"
              style={{
                backgroundColor: palette.pillBg,
                borderColor: `${palette.stroke}35`,
              }}
              className="rounded-full border px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
            >
              Live Responsive-Tester
            </a>
            {visibleDrafts.map((style) => (
              <a
                key={style.id}
                href={`#draft-${style.id}`}
                style={{
                  backgroundColor: palette.surface,
                  borderColor: `${palette.stroke}35`,
                }}
                className="rounded-full border px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
              >
                {style.number} · {style.name}
              </a>
            ))}
          </nav>
        </section>

        {/* Quick Side-by-Side Overview Strip */}
        <section className="space-y-5">
          <div className="flex items-baseline justify-between gap-2">
            <h2
              className={cn(
                ambrosia.variable,
                "[font-family:var(--font-ambrosia),serif] text-2xl sm:text-3xl"
              )}
            >
              Direktvergleich ({visibleDrafts.length} Richtungen)
            </h2>
            <span style={{ color: palette.mutedText }} className="text-xs">
              Kleine Kachel + passender Button
            </span>
          </div>
          <div
            className={cn(
              "grid grid-cols-1 gap-7 sm:grid-cols-2",
              visibleDrafts.length <= 3
                ? "md:grid-cols-3"
                : "md:grid-cols-3 lg:grid-cols-5"
            )}
          >
            {visibleDrafts.map((style) => (
              <div
                key={style.id}
                className="flex flex-col items-center justify-between gap-4"
              >
                <a
                  href={`#draft-${style.id}`}
                  className="block w-full flex-1 transition-transform hover:-translate-y-0.5"
                >
                  <OrganicCard
                    styleId={style.id}
                    paletteId={paletteId}
                    scale="tile"
                    className="flex h-full min-h-[144px] w-full flex-col items-center justify-center text-center"
                  >
                    <span
                      style={{ color: palette.mutedText }}
                      className="text-[11px] font-medium tracking-wider uppercase"
                    >
                      Draft {style.number}
                    </span>
                    <OrganicHeading className="mt-0.5 text-2xl">
                      {style.name}
                    </OrganicHeading>
                    {style.badge && (
                      <span
                        style={{ color: palette.mutedText }}
                        className="mt-1 text-[11px]"
                      >
                        {style.badge}
                      </span>
                    )}
                  </OrganicCard>
                </a>
                <OrganicButton
                  styleId={style.id}
                  paletteId={paletteId}
                  size="sm"
                  onClick={() => {
                    setLabStyle(style.id)
                    document
                      .getElementById("responsive-lab")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Im Tester öffnen
                </OrganicButton>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Responsive Playground */}
        <section
          id="responsive-lab"
          style={{
            borderColor: `${palette.stroke}2C`,
            backgroundColor: `${palette.surface}88`,
          }}
          className="scroll-mt-20 space-y-6 rounded-2xl border p-5 sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <SlidersHorizontalIcon className="size-4" />
                <h2
                  className={cn(
                    ambrosia.variable,
                    "[font-family:var(--font-ambrosia),serif] text-2xl sm:text-3xl"
                  )}
                >
                  Live Responsive-Tester
                </h2>
              </div>
              <p
                style={{ color: palette.mutedText }}
                className="text-xs sm:text-sm"
              >
                Teste jeden der 20 Drafts stufenlos von der großen Poster-Card
                bis zur kleinen Kachel.
              </p>
            </div>

            {/* Preset Size Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setLabWidth(560)
                  setLabHeight(265)
                }}
                style={{
                  backgroundColor: palette.surface,
                  borderColor: `${palette.stroke}40`,
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
              >
                <Maximize2Icon className="size-3" />
                Große Card (560×265)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLabWidth(340)
                  setLabHeight(165)
                }}
                style={{
                  backgroundColor: palette.surface,
                  borderColor: `${palette.stroke}40`,
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
              >
                Mittel (340×165)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLabWidth(220)
                  setLabHeight(125)
                }}
                style={{
                  backgroundColor: palette.surface,
                  borderColor: `${palette.stroke}40`,
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
              >
                <Minimize2Icon className="size-3" />
                Kleine Kachel (220×125)
              </button>
            </div>
          </div>

          {/* Draft Selector + Sliders */}
          <div className="grid gap-5 md:grid-cols-12">
            <div className="space-y-2 md:col-span-6">
              <span className="text-xs font-medium">Draft wählen</span>
              <div className="flex flex-wrap gap-1.5">
                {DRAFT_STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setLabStyle(s.id)}
                    style={{
                      backgroundColor:
                        labStyle === s.id ? palette.stroke : palette.surface,
                      color: labStyle === s.id ? palette.pageBg : palette.text,
                      borderColor: `${palette.stroke}40`,
                    }}
                    className="cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
                  >
                    {s.number} {s.name}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5 text-xs font-medium md:col-span-3">
              <span>
                Breite: <strong>{labWidth}px</strong>
              </span>
              <input
                type="range"
                min={175}
                max={640}
                value={labWidth}
                onChange={(e) => setLabWidth(Number(e.target.value))}
                className="accent-current"
              />
              <span style={{ color: palette.mutedText }} className="text-[11px]">
                Oberes Ornament ab 300px
              </span>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-medium md:col-span-3">
              <span>
                Höhe: <strong>{labHeight}px</strong>
              </span>
              <input
                type="range"
                min={105}
                max={320}
                value={labHeight}
                onChange={(e) => setLabHeight(Number(e.target.value))}
                className="accent-current"
              />
              <span style={{ color: palette.mutedText }} className="text-[11px]">
                Seiten/Unten ab ~190px
              </span>
            </label>
          </div>

          {/* Live Status Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              style={{
                backgroundColor: labMeta.hasTopCrest
                  ? palette.pillBg
                  : "transparent",
                borderColor: `${palette.stroke}40`,
                color: labMeta.hasTopCrest ? palette.pillText : palette.mutedText,
              }}
              className="rounded-full border px-2.5 py-0.5"
            >
              Mitte oben: {labMeta.hasTopCrest ? "Aktiv" : "Ausgeblendet"}
            </span>
            <span
              style={{
                backgroundColor: labMeta.hasSideFlourish
                  ? palette.pillBg
                  : "transparent",
                borderColor: `${palette.stroke}40`,
                color: labMeta.hasSideFlourish
                  ? palette.pillText
                  : palette.mutedText,
              }}
              className="rounded-full border px-2.5 py-0.5"
            >
              Seiten-Ornament:{" "}
              {labMeta.hasSideFlourish ? "Aktiv" : "Ausgeblendet"}
            </span>
            <span
              style={{
                backgroundColor: labMeta.hasBottomCrest
                  ? palette.pillBg
                  : "transparent",
                borderColor: `${palette.stroke}40`,
                color: labMeta.hasBottomCrest
                  ? palette.pillText
                  : palette.mutedText,
              }}
              className="rounded-full border px-2.5 py-0.5"
            >
              Mitte unten: {labMeta.hasBottomCrest ? "Aktiv" : "Ausgeblendet"}
            </span>
          </div>

          {/* Live Resizable Preview Box */}
          <div className="flex min-h-[330px] w-full items-center justify-center overflow-x-auto px-6 py-8">
            <OrganicCard
              styleId={labStyle}
              paletteId={paletteId}
              scale={labWidth < 280 ? "tile" : "card"}
              onResponsiveMeta={setLabMeta}
              style={{
                width: `${labWidth}px`,
                minHeight: `${labHeight}px`,
              }}
              className="flex shrink-0 flex-col justify-center text-center transition-[width,min-height] duration-150"
            >
              <OrganicHeading
                className={cn(
                  labWidth < 260 ? "text-2xl" : "text-3xl sm:text-4xl"
                )}
              >
                {labWidth < 260 ? "Kleine Kachel" : activeLabStyle.name}
              </OrganicHeading>
              <p
                style={{ color: palette.mutedText }}
                className="mt-1.5 text-xs leading-relaxed sm:text-sm"
              >
                {labWidth < 260
                  ? "Kompakt · reduziert"
                  : activeLabStyle.tagline}
              </p>
              {labHeight >= 185 && labWidth >= 320 && (
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <OrganicButton
                    styleId={labStyle}
                    paletteId={paletteId}
                    size="sm"
                    emphasized
                  >
                    Auswählen
                  </OrganicButton>
                  <OrganicButton
                    styleId={labStyle}
                    paletteId={paletteId}
                    size="sm"
                  >
                    Details
                  </OrganicButton>
                </div>
              )}
            </OrganicCard>
          </div>
        </section>

        {/* Detailed Showcase for Each Visible Draft */}
        <div className="space-y-24">
          {visibleDrafts.map((style) => (
            <section
              key={style.id}
              id={`draft-${style.id}`}
              style={{ borderColor: `${palette.stroke}28` }}
              className="scroll-mt-20 space-y-8 border-t pt-12"
            >
              {/* Draft Section Header */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    style={{ color: palette.mutedText }}
                    className="text-xs font-semibold tracking-widest uppercase"
                  >
                    Draft {style.number}
                  </span>
                  {style.badge && (
                    <span
                      style={{
                        backgroundColor: palette.pillBg,
                        color: palette.pillText,
                        borderColor: `${palette.stroke}35`,
                      }}
                      className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
                    >
                      {style.badge}
                    </span>
                  )}
                </div>
                <h2
                  className={cn(
                    ambrosia.variable,
                    "[font-family:var(--font-ambrosia),serif] text-3xl sm:text-4xl"
                  )}
                >
                  {style.name} — {style.tagline}
                </h2>
                <p
                  style={{ color: palette.mutedText }}
                  className="max-w-3xl text-xs leading-relaxed sm:text-sm"
                >
                  <strong>Idee:</strong> {style.inspiration}
                  <br />
                  <strong>Responsive:</strong> {style.responsiveNotes}
                </p>
              </div>

              {/* Main Grid: Large Card + Small Tiles + Buttons */}
              <div className="grid gap-10 lg:grid-cols-12">
                {/* 1. Large Card (7 cols) */}
                <div className="space-y-8 lg:col-span-7">
                  <div
                    style={{ color: palette.mutedText }}
                    className="text-xs font-medium tracking-wider uppercase"
                  >
                    Große Card · volle Jugendstil-Ornamentik
                  </div>
                  <div
                    className={cn(
                      style.id === "libelle" && "px-3",
                      (style.id === "halo" ||
                        style.id === "kathedrale" ||
                        style.id === "kaskade" ||
                        style.id === "mucha_portal" ||
                        style.id === "offener_kranz") &&
                        "pt-4"
                    )}
                  >
                    <OrganicCard
                      styleId={style.id}
                      paletteId={paletteId}
                      scale="card"
                      className={cn(
                        "w-full",
                        (style.id === "kathedrale" ||
                          style.id === "mucha_portal" ||
                          style.id === "torbogen" ||
                          style.id === "kaskade" ||
                          style.id === "offener_kranz") &&
                          "pt-12 sm:pt-14",
                        (style.id === "iris" ||
                          style.id === "mucha_portal" ||
                          style.id === "freesie" ||
                          style.id === "torbogen") &&
                          "pb-12 sm:pb-14"
                      )}
                    >
                      <div className="space-y-4">
                        <div className="space-y-1 text-center">
                          <OrganicHeading className="text-3xl sm:text-4xl">
                            The Fresh Growth
                          </OrganicHeading>
                          <p
                            style={{ color: palette.mutedText }}
                            className="text-xs sm:text-sm"
                          >
                            Mehrfarbige Jugendstil-Lithografie &amp; florale
                            Rahmen
                          </p>
                        </div>

                        <p className="text-sm leading-relaxed">
                          Zwischen 1890 und 1910 entstanden im Jugendstil
                          farbige Lithografien in gedecktem Salbei, warmem
                          Pfirsich und leuchtender Koralle — luftige Rahmen, die
                          Inhalte organisch umschließen statt einzusperren.
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {["1895", "Lithografie", style.name].map((tag) => (
                            <span
                              key={tag}
                              style={{
                                backgroundColor: palette.pillBg,
                                color: palette.pillText,
                                borderColor: `${palette.stroke}28`,
                              }}
                              className="rounded-full border px-3 py-0.5 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <OrganicButton
                            styleId={style.id}
                            paletteId={paletteId}
                            emphasized
                          >
                            <BookmarkIcon className="size-4" />
                            Ausstellung merken
                          </OrganicButton>
                          <OrganicButton
                            styleId={style.id}
                            paletteId={paletteId}
                          >
                            Mehr erfahren
                          </OrganicButton>
                          <OrganicButton
                            styleId={style.id}
                            paletteId={paletteId}
                            size="sm"
                            aria-label="Benachrichtigung"
                          >
                            <BellIcon className="size-4" />
                          </OrganicButton>
                        </div>
                      </div>
                    </OrganicCard>
                  </div>
                </div>

                {/* 2. Right Column: Small Tiles + Button Variants (5 cols) */}
                <div className="flex flex-col justify-between gap-7 lg:col-span-5">
                  {/* Small Tiles ("Kleine Kacheln") */}
                  <div className="space-y-4">
                    <div
                      style={{ color: palette.mutedText }}
                      className="text-xs font-medium tracking-wider uppercase"
                    >
                      Kleine Kacheln · reduziert &amp; responsive
                    </div>
                    <div
                      className={cn(
                        "grid grid-cols-2 gap-5",
                        style.id === "libelle" && "px-3"
                      )}
                    >
                      {SMALL_TILES.map((tile) => (
                        <OrganicCard
                          key={tile.title}
                          styleId={style.id}
                          paletteId={paletteId}
                          scale="tile"
                          className="flex min-h-[116px] flex-col items-center justify-center text-center"
                        >
                          <OrganicHeading className="text-xl sm:text-2xl">
                            {tile.title}
                          </OrganicHeading>
                          <span
                            style={{ color: palette.mutedText }}
                            className="mt-0.5 text-xs"
                          >
                            {tile.sub}
                          </span>
                        </OrganicCard>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {["Salbei", "Koralle", "Atelier"].map((label) => (
                        <OrganicCard
                          key={label}
                          styleId={style.id}
                          paletteId={paletteId}
                          scale="tile"
                          className="flex min-h-[70px] items-center justify-center px-3 py-2 text-center"
                        >
                          <span className="text-xs font-medium">{label}</span>
                        </OrganicCard>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <div
                      style={{ color: palette.mutedText }}
                      className="text-xs font-medium tracking-wider uppercase"
                    >
                      Buttons · im passenden Stil
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <OrganicButton
                        styleId={style.id}
                        paletteId={paletteId}
                        size="lg"
                        emphasized
                      >
                        <Flower2Icon className="size-4" />
                        Primäre Aktion
                      </OrganicButton>
                      <OrganicButton
                        styleId={style.id}
                        paletteId={paletteId}
                        size="md"
                      >
                        <CompassIcon className="size-4" />
                        Entdecken
                      </OrganicButton>
                      <OrganicButton
                        styleId={style.id}
                        paletteId={paletteId}
                        size="sm"
                      >
                        Kompakt
                      </OrganicButton>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
