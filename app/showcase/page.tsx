"use client"

import {
  AlertTriangleIcon,
  ArchiveIcon,
  ArrowLeftIcon,
  BellIcon,
  BookmarkIcon,
  CompassIcon,
  CrownIcon,
  DownloadIcon,
  EyeIcon,
  FeatherIcon,
  FrameIcon,
  InfoIcon,
  LandmarkIcon,
  LayersIcon,
  LeafIcon,
  PaletteIcon,
  PanelRightOpenIcon,
  SparklesIcon,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"

import antwerpCentralStation from "@/assets/showcase/images/antwerp-central-station.jpg"
import artNouveauBalcony from "@/assets/showcase/images/art-nouveau-balcony.jpg"
import artNouveauInteriorArch from "@/assets/showcase/images/art-nouveau-interior-arch.jpg"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Blockquote } from "@/components/ui/blockquote"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Heading } from "@/components/ui/heading"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Season = "autumn" | "spring" | "summer" | "winter"
type ArchetypeFilter = "all" | "botanical" | "salon" | "secession"

const SEASONS: Array<{ id: Season; label: string; subtitle: string }> = [
  { id: "autumn", label: "Autumn", subtitle: "Munich & Brussels Bronze" },
  { id: "spring", label: "Spring", subtitle: "Botanical Verdigris" },
  { id: "summer", label: "Summer", subtitle: "Sunlit Mucha Gold" },
  { id: "winter", label: "Winter", subtitle: "Nordic Frost & Slate" },
]

const ARCHETYPES: Array<{ id: ArchetypeFilter; label: string }> = [
  { id: "all", label: "All Versions" },
  { id: "botanical", label: "V1 · Botanical" },
  { id: "salon", label: "V2 · Salon" },
  { id: "secession", label: "V3 · Secession" },
]

const CATALOGUE_ROWS = [
  {
    folio: "Cat. 1895-I",
    work: "Hôtel Tassel Stairwell",
    artist: "Victor Horta",
    city: "Brussels",
    status: "On View",
  },
  {
    folio: "Cat. 1898-IV",
    work: "Secession Building Dome",
    artist: "Joseph Maria Olbrich",
    city: "Vienna",
    status: "Permanent",
  },
  {
    folio: "Cat. 1900-IX",
    work: "Porte Dauphine Édicule",
    artist: "Hector Guimard",
    city: "Paris",
    status: "Restored",
  },
] as const

export default function ShowcasePage() {
  const [season, setSeason] = React.useState<Season>("autumn")
  const [archetype, setArchetype] = React.useState<ArchetypeFilter>("all")
  const [catalogNotes, setCatalogNotes] = React.useState(true)
  const [provenanceTags, setProvenanceTags] = React.useState(false)
  const [activePage, setActivePage] = React.useState(2)
  const [restorationProgress, setRestorationProgress] = React.useState(68)

  const showV1 = archetype === "all" || archetype === "botanical"
  const showV2 = archetype === "all" || archetype === "salon"
  const showV3 = archetype === "all" || archetype === "secession"

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        {/* Top Bar & Header */}
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="flex w-full items-center justify-between gap-2">
            <Button variant={`${season}-secession`} asChild>
              <Link href="/">
                <ArrowLeftIcon data-icon="inline-start" />
                Home
              </Link>
            </Button>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <Badge variant={`${season}-ribbon`}>22 Components</Badge>
              <Badge variant={season}>4 Seasons</Badge>
            </div>
          </div>

          <Heading
            level={1}
            variant="jugend-flourish"
            season={season}
            className="mt-2 text-4xl font-medium tracking-tight sm:text-6xl"
          >
            Jugend UI Review Atelier
          </Heading>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Interactive side-by-side review of every Jugend UI component across
            three distinct Art Nouveau architectural schools—Whiplash Botanical,
            Salon Passe-Partout, and Vienna Secession—built with slice-safe SVG{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              border-image
            </code>{" "}
            frames for mobile and desktop.
          </p>

          {/* Season + Archetype Controls */}
          <Card variant={`${season}-secession`} className="mt-2 w-full">
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <span className="text-xs font-semibold opacity-80">
                  Seasonal Palette
                </span>
                <div
                  role="group"
                  aria-label="Select seasonal palette"
                  className="flex flex-wrap items-center justify-center gap-2"
                >
                  {SEASONS.map((s) => (
                    <Button
                      key={s.id}
                      variant={
                        season === s.id ? `${s.id}-gilded` : `${s.id}-secession`
                      }
                      aria-pressed={season === s.id}
                      onClick={() => setSeason(s.id)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-3 border-t border-current/15 pt-3 sm:flex-row">
                <span className="text-xs font-semibold opacity-80">
                  Filter Design School
                </span>
                <div
                  role="group"
                  aria-label="Filter component version school"
                  className="flex flex-wrap items-center justify-center gap-2"
                >
                  {ARCHETYPES.map((a) => (
                    <Button
                      key={a.id}
                      variant={
                        archetype === a.id
                          ? `${season}-gilded`
                          : `${season}-secession`
                      }
                      aria-pressed={archetype === a.id}
                      onClick={() => setArchetype(a.id)}
                    >
                      {a.label}
                    </Button>
                  ))}
                </div>
              </div>

              <nav
                aria-label="Component category jump links"
                className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-current/15 pt-2 text-xs font-medium"
              >
                <a
                  href="#foundations"
                  className="inline-flex min-h-9 items-center px-2 hover:underline"
                >
                  Foundations
                </a>
                <span aria-hidden className="opacity-40">
                  ◆
                </span>
                <a
                  href="#actions-surfaces"
                  className="inline-flex min-h-9 items-center px-2 hover:underline"
                >
                  Buttons, Badges & Cards
                </a>
                <span aria-hidden className="opacity-40">
                  ◆
                </span>
                <a
                  href="#navigation"
                  className="inline-flex min-h-9 items-center px-2 hover:underline"
                >
                  Tabs, Accordion & Wayfinding
                </a>
                <span aria-hidden className="opacity-40">
                  ◆
                </span>
                <a
                  href="#overlays"
                  className="inline-flex min-h-9 items-center px-2 hover:underline"
                >
                  Dialogs, Sheets & Menus
                </a>
                <span aria-hidden className="opacity-40">
                  ◆
                </span>
                <a
                  href="#feedback-data"
                  className="inline-flex min-h-9 items-center px-2 hover:underline"
                >
                  Alerts, Avatars & Tables
                </a>
              </nav>
            </CardContent>
          </Card>
        </header>

        <Separator variant={`${season}-fleuron`} />

        {/* ==================== FOUNDATIONS ==================== */}
        <section id="foundations" className="scroll-mt-6 space-y-10">
          <div className="space-y-1">
            <Badge variant={`${season}-ribbon`}>Part I · Foundations</Badge>
            <Heading level={2} variant="jugend" className="text-3xl sm:text-4xl">
              Headings, Separators & Skeletons
            </Heading>
          </div>

          {/* 1. Heading */}
          <div className="space-y-4">
            <Heading level={3} variant="jugend" className="text-2xl">
              1. Heading (3 Versions)
            </Heading>
            <div className="grid gap-6 md:grid-cols-3">
              {showV1 && (
                <Card variant={`${season}-secession`}>
                  <CardHeader>
                    <Badge variant={season}>V1 · Classic Ambrosia</Badge>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Heading level={3} variant="jugend" className="text-3xl">
                      Darmstadt Colony
                    </Heading>
                  </CardContent>
                </Card>
              )}

              {showV2 && (
                <Card variant={`${season}-secession`}>
                  <CardHeader>
                    <Badge variant={`${season}-ribbon`}>
                      V2 · Botanical Flourish
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex justify-center pt-2">
                    <Heading
                      level={3}
                      variant="jugend-flourish"
                      season={season}
                      className="text-3xl"
                    >
                      Hôtel Tassel
                    </Heading>
                  </CardContent>
                </Card>
              )}

              {showV3 && (
                <Card variant={`${season}-secession`}>
                  <CardHeader>
                    <Badge variant={`${season}-secession`}>
                      V3 · Cartouche Plaque
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex justify-center pt-2">
                    <Heading
                      level={3}
                      variant={`${season}-plaque`}
                      className="text-2xl sm:text-3xl"
                    >
                      Ver Sacrum
                    </Heading>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* 2 & 3. Separator & Skeleton */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Dividers</Badge>
                <CardTitle>2. Separator (3 Versions)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {showV1 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold opacity-75">
                      V1 · Full Botanical Frieze
                    </span>
                    <Separator variant={season} />
                  </div>
                )}
                {showV2 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold opacity-75">
                      V2 · Slice-Safe Finial Rule
                    </span>
                    <Separator variant={`${season}-rule`} />
                  </div>
                )}
                {showV3 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold opacity-75">
                      V3 · Centered Fleuron Medallion
                    </span>
                    <Separator variant={`${season}-fleuron`} />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Placeholders</Badge>
                <CardTitle>3. Skeleton (2 Versions)</CardTitle>
              </CardHeader>
              <CardContent className="grid items-center gap-6 sm:grid-cols-[120px_1fr]">
                {showV1 && (
                  <div className="space-y-2">
                    <span className="block text-xs font-semibold opacity-75">
                      V1 · Portrait
                    </span>
                    <Skeleton
                      variant={season}
                      className="aspect-[2/3] w-full max-w-[120px]"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <span className="block text-xs font-semibold opacity-75">
                    V2 · Compact Shimmer Bars
                  </span>
                  <Skeleton variant={`${season}-compact`} className="h-8 w-3/4" />
                  <Skeleton variant={`${season}-compact`} className="h-7 w-full" />
                  <Skeleton variant={`${season}-compact`} className="h-7 w-5/6" />
                  <Skeleton variant={`${season}-compact`} className="h-10 w-36" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator variant={`${season}-rule`} />

        {/* ==================== ACTIONS, BADGES & CARDS ==================== */}
        <section id="actions-surfaces" className="scroll-mt-6 space-y-10">
          <div className="space-y-1">
            <Badge variant={`${season}-ribbon`}>
              Part II · Actions & Surfaces
            </Badge>
            <Heading level={2} variant="jugend" className="text-3xl sm:text-4xl">
              Buttons, Badges & Cards
            </Heading>
          </div>

          {/* 4. Button */}
          <Card variant={`${season}-secession`}>
            <CardHeader>
              <Badge variant={season}>Interactive Actions</Badge>
              <CardTitle>4. Button (4 Versions)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {showV1 && (
                <div className="flex flex-col items-start justify-between gap-3">
                  <span className="text-xs font-semibold opacity-75">
                    V1 · Botanical Frame
                  </span>
                  <Button variant={season} size="lg">
                    <BookmarkIcon data-icon="inline-start" />
                    Save Folio
                  </Button>
                </div>
              )}
              {showV2 && (
                <div className="flex flex-col items-start justify-between gap-3">
                  <span className="text-xs font-semibold opacity-75">
                    V2 · Salon Flourish
                  </span>
                  <Button variant={`${season}-flourish`} size="lg">
                    <FeatherIcon data-icon="inline-start" />
                    Enter Salon
                  </Button>
                </div>
              )}
              {showV3 && (
                <div className="flex flex-col items-start justify-between gap-3">
                  <span className="text-xs font-semibold opacity-75">
                    V3 · Vienna Secession
                  </span>
                  <Button variant={`${season}-secession`} size="lg">
                    <CompassIcon data-icon="inline-start" />
                    Catalogue
                  </Button>
                </div>
              )}
              <div className="flex flex-col items-start justify-between gap-3">
                <span className="text-xs font-semibold opacity-75">
                  V4 · Gilded Primary CTA
                </span>
                <Button variant={`${season}-gilded`} size="lg">
                  <CrownIcon data-icon="inline-start" />
                  Reserve Pass
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 5. Badge */}
          <Card variant={`${season}-secession`}>
            <CardHeader>
              <Badge variant={season}>Labels & Seals</Badge>
              <CardTitle>5. Badge (3 Versions)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-3">
              {showV1 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold opacity-75">
                    V1 · Botanical Cartouche
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={season}>Lithograph</Badge>
                    <Badge variant={season}>
                      <LeafIcon data-icon="inline-start" />
                      1898
                    </Badge>
                  </div>
                </div>
              )}
              {showV3 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold opacity-75">
                    V2 · Secession Lozenge
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={`${season}-secession`}>Wrought Iron</Badge>
                    <Badge variant={`${season}-secession`}>Gallery IV</Badge>
                  </div>
                </div>
              )}
              {showV2 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold opacity-75">
                    V3 · Gilded Ribbon Seal
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={`${season}-ribbon`}>
                      <SparklesIcon data-icon="inline-start" />
                      Masterwork
                    </Badge>
                    <Badge variant={`${season}-ribbon`}>Permanent</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 6. Card */}
          <div className="space-y-4">
            <Heading level={3} variant="jugend" className="text-2xl">
              6. Card (3 Framed Versions + Poster Teaser)
            </Heading>
            <div className="grid gap-6 lg:grid-cols-3">
              {showV1 && (
                <Card variant={season}>
                  <CardHeader>
                    <Badge variant={season} className="mx-auto mb-1">
                      V1 · Whiplash Botanical
                    </Badge>
                    <CardTitle align="center" className="text-2xl sm:text-3xl">
                      Maison du Peuple
                    </CardTitle>
                    <CardDescription className="text-center">
                      Victor Horta, Brussels, 1899
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      Curving iron ribs and wide glass bays flood the interior
                      with daylight, uniting structural engineering and
                      botanical grace.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant={season}>Inspect Plate</Button>
                  </CardFooter>
                </Card>
              )}

              {showV2 && (
                <Card variant={`${season}-salon`}>
                  <CardHeader>
                    <Badge variant={`${season}-ribbon`} className="mx-auto mb-1">
                      V2 · Salon Passe-Partout
                    </Badge>
                    <CardTitle align="center" className="text-2xl sm:text-3xl">
                      Galerie Champenois
                    </CardTitle>
                    <CardDescription className="text-center">
                      Alphonse Mucha, Paris, 1897
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      Shaded passe-partout mats, arched corner spandrels, and
                      Moser cross-ticks frame archival lithographs with salon
                      poise.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant={`${season}-gilded`}>Open Dossier</Button>
                  </CardFooter>
                </Card>
              )}

              {showV3 && (
                <Card variant={`${season}-secession`}>
                  <CardHeader>
                    <Badge variant={`${season}-secession`} className="mb-1">
                      V3 · Vienna Secession
                    </Badge>
                    <CardTitle className="text-2xl sm:text-3xl">
                      Palais Stoclet
                    </CardTitle>
                    <CardDescription>
                      Josef Hoffmann, Brussels, 1905
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      Modular Quadratstil corner squares and orthogonal Wagner
                      fittings give dense layouts generous reading width.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant={`${season}-secession`}>Read Essay</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </section>

        <Separator variant={`${season}-fleuron`} />

        {/* ==================== NAVIGATION & DISCLOSURE ==================== */}
        <section id="navigation" className="scroll-mt-6 space-y-10">
          <div className="space-y-1">
            <Badge variant={`${season}-ribbon`}>
              Part III · Navigation & Disclosure
            </Badge>
            <Heading level={2} variant="jugend" className="text-3xl sm:text-4xl">
              Tabs, Accordion, Breadcrumb & Pagination
            </Heading>
          </div>

          {/* 7. Tabs */}
          <div className="space-y-4">
            <Heading level={3} variant="jugend" className="text-2xl">
              7. Tabs (3 Versions)
            </Heading>
            <div className="grid gap-8 lg:grid-cols-3">
              {showV1 && (
                <div className="min-w-0 space-y-2">
                  <span className="text-xs font-semibold opacity-75">
                    V1 · Botanical Arch Register
                  </span>
                  <Tabs defaultValue="architecture" variant={season}>
                    <TabsList>
                      <TabsTrigger value="architecture">
                        Architecture
                      </TabsTrigger>
                      <TabsTrigger value="posters">Posters</TabsTrigger>
                      <TabsTrigger value="glass">Glass</TabsTrigger>
                    </TabsList>
                    <TabsContent value="architecture" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Horta Ironwork
                      </Heading>
                      <p className="leading-relaxed">
                        Slender cast-iron columns blossom into botanical
                        tendrils supporting stained-glass skylights above open
                        stairwells.
                      </p>
                    </TabsContent>
                    <TabsContent value="posters" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Lithographic Posters
                      </Heading>
                      <p className="leading-relaxed">
                        Elongated vertical formats framed in gilded halos and
                        floral borders transformed Parisian boulevards into
                        galleries.
                      </p>
                    </TabsContent>
                    <TabsContent value="glass" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Iridescent Favrile
                      </Heading>
                      <p className="leading-relaxed">
                        Opalescent blown glass vessels captured dragonfly wings
                        and twilight botanical silhouettes.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {showV2 && (
                <div className="min-w-0 space-y-2">
                  <span className="text-xs font-semibold opacity-75">
                    V2 · Salon Cartouche Tray
                  </span>
                  <Tabs defaultValue="brussels" variant={`${season}-salon`}>
                    <TabsList>
                      <TabsTrigger value="brussels">Brussels</TabsTrigger>
                      <TabsTrigger value="nancy">Nancy</TabsTrigger>
                      <TabsTrigger value="munich">Munich</TabsTrigger>
                    </TabsList>
                    <TabsContent value="brussels" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Hôtel Solvay
                      </Heading>
                      <p className="leading-relaxed">
                        Every doorknob, carpet weave, and chandelier was
                        conceived as a single harmonious Gesamtkunstwerk.
                      </p>
                    </TabsContent>
                    <TabsContent value="nancy" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        École de Nancy
                      </Heading>
                      <p className="leading-relaxed">
                        Émile Gallé and Louis Majorelle drew directly from
                        Lorraine flora—thistles, umbels, and water lilies.
                      </p>
                    </TabsContent>
                    <TabsContent value="munich" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Jugend Magazine
                      </Heading>
                      <p className="leading-relaxed">
                        Founded in 1896 by Georg Hirth, weekly illustrated
                        covers gave Jugendstil its enduring name.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {showV3 && (
                <div className="min-w-0 space-y-2">
                  <span className="text-xs font-semibold opacity-75">
                    V3 · Vienna Secession Quadratstil
                  </span>
                  <Tabs defaultValue="secession" variant={`${season}-secession`}>
                    <TabsList>
                      <TabsTrigger value="secession">Secession</TabsTrigger>
                      <TabsTrigger value="werkstatte">Werkstätte</TabsTrigger>
                      <TabsTrigger value="glasgow">Glasgow</TabsTrigger>
                    </TabsList>
                    <TabsContent value="secession" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Olbrich Pavilion
                      </Heading>
                      <p className="leading-relaxed">
                        Crowned by a gilded dome of three thousand laurel
                        leaves: To every age its art, to every art its freedom.
                      </p>
                    </TabsContent>
                    <TabsContent value="werkstatte" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Wiener Werkstätte
                      </Heading>
                      <p className="leading-relaxed">
                        Perforated silver sheet, ebony inlays, and crisp
                        geometric grids anticipated twentieth-century modernism.
                      </p>
                    </TabsContent>
                    <TabsContent value="glasgow" className="space-y-2">
                      <Heading level={4} variant="jugend" className="text-2xl">
                        Mackintosh Rose
                      </Heading>
                      <p className="leading-relaxed">
                        High-backed oak chairs and stylized rose geometry
                        balanced Celtic line with Japanese proportion.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>

          {/* 8. Accordion */}
          <div className="space-y-4">
            <Heading level={3} variant="jugend" className="text-2xl">
              8. Accordion (3 Versions)
            </Heading>
            <div className="grid gap-8 lg:grid-cols-3">
              {showV1 && (
                <div className="min-w-0 space-y-2">
                  <span className="text-xs font-semibold opacity-75">
                    V1 · Botanical Folio Plates
                  </span>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-1"
                    variant={season}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>The Whiplash Curve</AccordionTrigger>
                      <AccordionContent>
                        Hermann Obrist’s 1895 embroidered wall hanging Cyclamen
                        became known as Der Peitschenhieb for its energetic
                        S-curve.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Gesamtkunstwerk</AccordionTrigger>
                      <AccordionContent>
                        Architects designed buildings from structural ironwork
                        down to cutlery, typography, and key escutcheons.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {showV2 && (
                <div className="min-w-0 space-y-2">
                  <span className="text-xs font-semibold opacity-75">
                    V2 · Salon Passe-Partout Stack
                  </span>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="sal-1"
                    variant={`${season}-salon`}
                  >
                    <AccordionItem value="sal-1">
                      <AccordionTrigger>Chromo-Lithography</AccordionTrigger>
                      <AccordionContent>
                        Multi-stone limestone printing allowed luminous flat
                        planes of ochre, sage, peacock blue, and metallic bronze
                        ink.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sal-2">
                      <AccordionTrigger>Botanical Morphology</AccordionTrigger>
                      <AccordionContent>
                        Ernst Haeckel’s Kunstformen der Natur inspired
                        chandeliers, gateways, and mosaic pavements across
                        Europe.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {showV3 && (
                <div className="min-w-0 space-y-2">
                  <span className="text-xs font-semibold opacity-75">
                    V3 · Vienna Secession Cabinet
                  </span>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="sec-1"
                    variant={`${season}-secession`}
                  >
                    <AccordionItem value="sec-1">
                      <AccordionTrigger>Ver Sacrum Square</AccordionTrigger>
                      <AccordionContent>
                        Adopted a bold square magazine format (29 × 29 cm) where
                        illustrations, poems, and borders formed unified
                        spreads.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sec-2">
                      <AccordionTrigger>Postsparkasse Hall</AccordionTrigger>
                      <AccordionContent>
                        Otto Wagner left marble cladding bolts and warm-air
                        aluminum towers proudly exposed as functional ornament.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>
          </div>

          {/* 9 & 10. Breadcrumb & Pagination */}
          <div className="grid gap-8 lg:grid-cols-2">
            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Wayfinding</Badge>
                <CardTitle>9. Breadcrumb (3 Versions)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {showV1 && (
                  <div className="space-y-2">
                    <span className="block text-xs font-semibold opacity-75">
                      V1 · Botanical Vine Trail
                    </span>
                    <Breadcrumb variant={season}>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#atelier">
                            Atelier
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#archives">
                            Archives
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Folio XIV</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                )}

                {showV2 && (
                  <div className="space-y-2">
                    <span className="block text-xs font-semibold opacity-75">
                      V2 · Gilded Ribbon Wayfinder
                    </span>
                    <Breadcrumb variant={`${season}-ribbon`}>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#salon">Salon</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#posters">
                            Posters
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>1898 Plate</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                )}

                {showV3 && (
                  <div className="space-y-2">
                    <span className="block text-xs font-semibold opacity-75">
                      V3 · Vienna Secession Header Bar
                    </span>
                    <Breadcrumb variant={`${season}-secession`}>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#vienna">Vienna</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#pavilion">
                            Pavilion
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Room III</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Folio Indexing</Badge>
                <CardTitle>10. Pagination (3 Versions)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  showV1 && {
                    label: "V1 · Botanical Folio Medallions",
                    variant: season,
                  },
                  showV2 && {
                    label: "V2 · Salon Scroll Tray",
                    variant: `${season}-salon` as const,
                  },
                  showV3 && {
                    label: "V3 · Vienna Secession Quadratstil Tiles",
                    variant: `${season}-secession` as const,
                  },
                ]
                  .filter(Boolean)
                  .map((entry) => {
                    if (!entry) return null
                    return (
                      <div key={entry.label} className="space-y-2">
                        <span className="block text-xs font-semibold opacity-75">
                          {entry.label}
                        </span>
                        <Pagination variant={entry.variant}>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                href="#prev"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setActivePage((p) => Math.max(1, p - 1))
                                }}
                              />
                            </PaginationItem>
                            {[1, 2, 3].map((num) => (
                              <PaginationItem key={num}>
                                <PaginationLink
                                  href={`#page-${num}`}
                                  isActive={activePage === num}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setActivePage(num)
                                  }}
                                >
                                  {num}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationNext
                                href="#next"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setActivePage((p) => Math.min(3, p + 1))
                                }}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )
                  })}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator variant={`${season}-rule`} />

        {/* ==================== OVERLAYS & MENUS ==================== */}
        <section id="overlays" className="scroll-mt-6 space-y-10">
          <div className="space-y-1">
            <Badge variant={`${season}-ribbon`}>Part IV · Overlays</Badge>
            <Heading level={2} variant="jugend" className="text-3xl sm:text-4xl">
              Dialogs, Sheets, Alert Dialogs, Menus, Popovers & Tooltips
            </Heading>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* 11. Dialog */}
            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Modals</Badge>
                <CardTitle>11. Dialog (3 Versions)</CardTitle>
                <CardDescription>
                  Ornamental close cabochon and inner scrollable body
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2.5">
                {showV1 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={season}>Dialog V1 · Botanical</Button>
                    </DialogTrigger>
                    <DialogContent variant={season}>
                      <DialogHeader>
                        <DialogTitle>Mathildenhöhe Catalogue</DialogTitle>
                        <DialogDescription>
                          Darmstadt Artists’ Colony, 1901 Exhibition Plate
                        </DialogDescription>
                      </DialogHeader>
                      <DialogBody className="space-y-3 py-2">
                        <p>
                          Joseph Maria Olbrich and Peter Behrens transformed the
                          hillside of Mathildenhöhe into a living architectural
                          manifesto where houses, studios, and gardens shared
                          unified Jugendstil ornament.
                        </p>
                        <p>
                          Viewing hours run Tuesday through Sunday from 10:00 to
                          18:00. Archival sketchbooks are available by request.
                        </p>
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={`${season}-secession`}>Close</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant={`${season}-gilded`}>
                            Book Viewing
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {showV2 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={`${season}-flourish`}>
                        Dialog V2 · Salon
                      </Button>
                    </DialogTrigger>
                    <DialogContent variant={`${season}-salon`}>
                      <DialogHeader>
                        <DialogTitle>Salon des Cent</DialogTitle>
                        <DialogDescription>
                          Lithographic Proof Inspection, Paris 1897
                        </DialogDescription>
                      </DialogHeader>
                      <DialogBody className="space-y-3 py-2">
                        <p>
                          Printed on fine Vélin d’Arches rag paper with hand-set
                          gilded ink stones, surrounded by a double
                          passe-partout mat and concave corner lunettes.
                        </p>
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={`${season}-gilded`}>Done</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {showV3 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={`${season}-secession`}>
                        Dialog V3 · Secession
                      </Button>
                    </DialogTrigger>
                    <DialogContent variant={`${season}-secession`}>
                      <DialogHeader>
                        <DialogTitle>XIV. Secession Exhibition</DialogTitle>
                        <DialogDescription>
                          Beethoven Frieze Room Plan, Vienna 1902
                        </DialogDescription>
                      </DialogHeader>
                      <DialogBody className="space-y-3 py-2">
                        <p>
                          Designed around Max Klinger’s polychrome Beethoven
                          monument with Gustav Klimt’s monumental gilded frieze
                          spanning three walls.
                        </p>
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={`${season}-gilded`}>
                            Acknowledge
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>

            {/* 12. Sheet */}
            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Slide-Over Drawers</Badge>
                <CardTitle>12. Sheet (3 Versions)</CardTitle>
                <CardDescription>
                  Responsive side wing panels for mobile & desktop drawers
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2.5">
                {showV1 && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant={season}>
                        <PanelRightOpenIcon data-icon="inline-start" />
                        Sheet V1 · Botanical
                      </Button>
                    </SheetTrigger>
                    <SheetContent variant={season}>
                      <SheetHeader>
                        <SheetTitle>Curator’s Notes</SheetTitle>
                        <SheetDescription>
                          Provenance & restoration dossier
                        </SheetDescription>
                      </SheetHeader>
                      <SheetBody className="space-y-4 py-2">
                        <p>
                          Acquired from the Brussels Exposition of 1897, this
                          brass-and-oak cabinet retains its original hand-hammered
                          botanical hinge plates.
                        </p>
                        <Separator variant={`${season}-fleuron`} />
                        <p>
                          Conservation status: Waxed patina stabilized; original
                          beveled crystal panes intact.
                        </p>
                      </SheetBody>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant={`${season}-gilded`}>
                            Close Wing
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                )}

                {showV2 && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant={`${season}-flourish`}>
                        Sheet V2 · Salon
                      </Button>
                    </SheetTrigger>
                    <SheetContent variant={`${season}-salon`}>
                      <SheetHeader>
                        <SheetTitle>Salon Inventory</SheetTitle>
                        <SheetDescription>
                          Framed poster holdings
                        </SheetDescription>
                      </SheetHeader>
                      <SheetBody className="space-y-3 py-2">
                        <p>
                          Twelve first-state color lithographs matted in warm
                          passe-partout boards with corner spandrels.
                        </p>
                      </SheetBody>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant={`${season}-gilded`}>Close</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                )}

                {showV3 && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant={`${season}-secession`}>
                        Sheet V3 · Secession
                      </Button>
                    </SheetTrigger>
                    <SheetContent variant={`${season}-secession`}>
                      <SheetHeader>
                        <SheetTitle>Werkstätte Index</SheetTitle>
                        <SheetDescription>
                          Metalwork archive drawer
                        </SheetDescription>
                      </SheetHeader>
                      <SheetBody className="space-y-3 py-2">
                        <p>
                          Catalogued silver baskets and brass lamps bearing the
                          Wiener Werkstätte rose mark and craftsman monograms.
                        </p>
                      </SheetBody>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant={`${season}-gilded`}>Close</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                )}
              </CardContent>
            </Card>

            {/* 13. Alert Dialog & 14. Dropdown Menu */}
            {(showV1 || showV3) && (
              <Card variant={`${season}-secession`}>
                <CardHeader>
                  <Badge variant={season}>Confirmations & Menus</Badge>
                  <CardTitle>13. Alert Dialog & 14. Dropdown Menu</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2.5">
                {showV1 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={season}>Alert Dialog V1</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent variant={season}>
                      <AlertDialogHeader>
                        <AlertDialogMedia>
                          <LandmarkIcon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>
                          Private Archive Access
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Unseal folio XIV from the 1900 Exposition lithograph
                          vault? Cotton gloves are required.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Return</AlertDialogCancel>
                        <AlertDialogAction>Unseal Folio</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {showV3 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={`${season}-secession`}>
                        Alert Dialog V2
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent variant={`${season}-secession`}>
                      <AlertDialogHeader>
                        <AlertDialogMedia>
                          <BellIcon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>
                          Curatorial Loan Notice
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Confirm loan transfer of Koloman Moser cabinet
                          drawings to Vienna.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Confirm Loan</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {showV1 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={season}>Menu V1 · Botanical</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent variant={season}>
                      <DropdownMenuLabel>Exhibit Actions</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <EyeIcon />
                          Inspect Lithograph
                          <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DownloadIcon />
                          Download Plate
                          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={catalogNotes}
                        onCheckedChange={(v) => setCatalogNotes(v === true)}
                      >
                        <PaletteIcon />
                        Curator Annotations
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {showV3 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={`${season}-secession`}>
                        Menu V2 · Secession
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent variant={`${season}-secession`}>
                      <DropdownMenuLabel>Archive Folio</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <BookmarkIcon />
                          Bookmark Plate
                        </DropdownMenuItem>
                        <DropdownMenuCheckboxItem
                          checked={provenanceTags}
                          onCheckedChange={(v) => setProvenanceTags(v === true)}
                        >
                          Show Provenance
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardContent>
            </Card>
            )}

            {/* 15. Popover & 16. Tooltip */}
            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Vitrines & Specimen Tags</Badge>
                <CardTitle>15. Popover & 16. Tooltip (3 Versions)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2.5">
                  {showV1 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={season}>Popover V1 · Botanical</Button>
                      </PopoverTrigger>
                      <PopoverContent variant={season}>
                        <PopoverHeader>
                          <PopoverTitle>Lalique Dragonfly</PopoverTitle>
                          <PopoverDescription>
                            Gold, plique-à-jour enamel, chrysoprase, and
                            moonstones, ca. 1897–1898.
                          </PopoverDescription>
                        </PopoverHeader>
                        <div className="flex items-center justify-between text-xs">
                          <span>Calouste Gulbenkian</span>
                          <Badge variant={season}>Lisbon</Badge>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}

                  {showV2 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={`${season}-flourish`}>
                          Popover V2 · Salon
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent variant={`${season}-salon`}>
                        <PopoverHeader>
                          <PopoverTitle>Tiffany Wisteria Lamp</PopoverTitle>
                          <PopoverDescription>
                            Over two thousand individually selected leaded glass
                            tesserae crowning a bronze tree-root base.
                          </PopoverDescription>
                        </PopoverHeader>
                        <Badge variant={`${season}-ribbon`}>1901</Badge>
                      </PopoverContent>
                    </Popover>
                  )}

                  {showV3 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={`${season}-secession`}>
                          Popover V3 · Secession
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent variant={`${season}-secession`}>
                        <PopoverHeader>
                          <PopoverTitle>Sitzmaschine Chair</PopoverTitle>
                          <PopoverDescription>
                            Josef Hoffmann bent beechwood Morris chair with
                            adjustable brass rod, 1905.
                          </PopoverDescription>
                        </PopoverHeader>
                        <Badge variant={`${season}-secession`}>Vienna</Badge>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 border-t border-current/15 pt-3">
                  <span className="text-xs font-semibold opacity-75">
                    Hover or Focus Tooltips:
                  </span>
                  {showV1 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant={season} asChild>
                          <button type="button" className="cursor-help">
                            Tooltip V1 · Botanical
                          </button>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent variant={season}>
                        Gilded bronze & opalescent glass
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {showV2 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant={`${season}-ribbon`} asChild>
                          <button type="button" className="cursor-help">
                            Tooltip V2 · Salon
                          </button>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent variant={`${season}-salon`}>
                        First-state stone lithograph, 1898
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {showV3 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant={`${season}-secession`} asChild>
                          <button type="button" className="cursor-help">
                            Tooltip V3 · Secession
                          </button>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent variant={`${season}-secession`}>
                        Hallmarked Wiener Werkstätte silver
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator variant={`${season}-fleuron`} />

        {/* ==================== FEEDBACK, DATA & EDITORIAL ==================== */}
        <section id="feedback-data" className="scroll-mt-6 space-y-10">
          <div className="space-y-1">
            <Badge variant={`${season}-ribbon`}>Part V · Data & Feedback</Badge>
            <Heading level={2} variant="jugend" className="text-3xl sm:text-4xl">
              Alerts, Avatars, Progress, Tables, Blockquotes & Empty Niches
            </Heading>
          </div>

          {/* 17. Alert */}
          <div className="space-y-4">
            <Heading level={3} variant="jugend" className="text-2xl">
              17. Alert Callouts (3 Versions + Carmine Warning Tone)
            </Heading>
            <div className="grid gap-5 lg:grid-cols-2">
              {showV1 && (
                <Alert variant={season}>
                  <InfoIcon />
                  <AlertTitle>Evening Salon Illumination</AlertTitle>
                  <AlertDescription>
                    Stained-glass skylights in the Horta conservatory are lit by
                    warm filament chandeliers every Friday at dusk.
                  </AlertDescription>
                </Alert>
              )}

              {showV2 && (
                <Alert variant={`${season}-salon`}>
                  <LayersIcon />
                  <AlertTitle>Archival Passe-Partout Handling</AlertTitle>
                  <AlertDescription>
                    Lithographic plates are mounted in acid-free rag mats; rest
                    folios flat on the felt cradles provided.
                  </AlertDescription>
                </Alert>
              )}

              {showV3 && (
                <Alert variant={`${season}-secession`}>
                  <FrameIcon />
                  <AlertTitle>Secession Gallery Wing IV</AlertTitle>
                  <AlertDescription>
                    Guided architectural talks begin on the hour beneath the
                    gilded laurel dome.
                  </AlertDescription>
                </Alert>
              )}

              <Alert variant={`${season}-secession`} tone="destructive">
                <AlertTriangleIcon />
                <AlertTitle>Fragile Glassware Advisory</AlertTitle>
                <AlertDescription>
                  Iridescent blown glass vitrines are sensitive to vibration;
                  keep bags checked in the vestibule cloakroom.
                </AlertDescription>
                <AlertAction>
                  <Button variant={`${season}-secession`}>
                    Read Guidelines
                  </Button>
                </AlertAction>
              </Alert>
            </div>
          </div>

          {/* 18. Avatar & 19. Progress */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Portrait Medallions</Badge>
                <CardTitle>18. Avatar (3 Versions · 1:1 Halo Bezels)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-3">
                {showV1 && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-xs font-semibold opacity-75">
                      V1 · Mucha Halo
                    </span>
                    <div className="flex items-center gap-2">
                      <Avatar variant={season} size="lg">
                        <AvatarImage
                          src={artNouveauBalcony.src}
                          alt="Zagreb Art Nouveau balcony"
                        />
                        <AvatarFallback>VH</AvatarFallback>
                      </Avatar>
                      <Avatar variant={season} size="default">
                        <AvatarFallback>VH</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                )}

                {showV2 && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-xs font-semibold opacity-75">
                      V2 · Salon Cameo
                    </span>
                    <div className="flex items-center gap-2">
                      <Avatar variant={`${season}-salon`} size="lg">
                        <AvatarImage
                          src={artNouveauInteriorArch.src}
                          alt="Ornate doorway arch"
                        />
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <Avatar variant={`${season}-salon`} size="default">
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                )}

                {showV3 && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-xs font-semibold opacity-75">
                      V3 · Secession Stamp
                    </span>
                    <div className="flex items-center gap-2">
                      <Avatar variant={`${season}-secession`} size="lg">
                        <AvatarImage
                          src={antwerpCentralStation.src}
                          alt="Antwerp Central Station"
                        />
                        <AvatarFallback>JH</AvatarFallback>
                      </Avatar>
                      <Avatar variant={`${season}-secession`} size="default">
                        <AvatarFallback>JH</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card variant={`${season}-secession`}>
              <CardHeader>
                <Badge variant={season}>Brass & Enamel Meters</Badge>
                <CardTitle>19. Progress (3 Versions)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {showV1 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold opacity-80">
                      <span>V1 · Botanical Brass Gauge</span>
                      <span className="tabular-nums">
                        {restorationProgress}%
                      </span>
                    </div>
                    <Progress value={restorationProgress} variant={season} />
                  </div>
                )}

                {showV2 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold opacity-80">
                      <span>V2 · Salon Calibrated Enamel</span>
                      <span className="tabular-nums">
                        {restorationProgress}%
                      </span>
                    </div>
                    <Progress
                      value={restorationProgress}
                      variant={`${season}-salon`}
                    />
                  </div>
                )}

                {showV3 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold opacity-80">
                      <span>V3 · Vienna Secession Meter</span>
                      <span className="tabular-nums">
                        {restorationProgress}%
                      </span>
                    </div>
                    <Progress
                      value={restorationProgress}
                      variant={`${season}-secession`}
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {[25, 68, 100].map((val) => (
                    <Button
                      key={val}
                      variant={
                        restorationProgress === val
                          ? `${season}-gilded`
                          : `${season}-secession`
                      }
                      onClick={() => setRestorationProgress(val)}
                    >
                      {val}%
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 20. Table */}
          <div className="space-y-6">
            <Heading level={3} variant="jugend" className="text-2xl">
              20. Table Ledgers (3 Versions · Mobile Scroll-Safe Inside Frame)
            </Heading>

            <div className="space-y-6">
              {[
                showV1 && {
                  label: "V1 · Botanical Atelier Catalogue",
                  variant: season,
                },
                showV2 && {
                  label: "V2 · Salon Passe-Partout Striped Ledger",
                  variant: `${season}-salon` as const,
                },
                showV3 && {
                  label: "V3 · Vienna Secession Quadratstil Grid",
                  variant: `${season}-secession` as const,
                },
              ]
                .filter(Boolean)
                .map((entry) => {
                  if (!entry) return null
                  return (
                    <div key={entry.label} className="space-y-2">
                      <span className="block text-xs font-semibold opacity-75">
                        {entry.label}
                      </span>
                      <Table variant={entry.variant}>
                        <TableCaption>
                          1900 European Architectural Register — Scroll
                          horizontally on narrow viewports
                        </TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Folio No.</TableHead>
                            <TableHead>Monument</TableHead>
                            <TableHead>Architect</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {CATALOGUE_ROWS.map((row) => (
                            <TableRow key={row.folio}>
                              <TableCell className="font-medium tabular-nums">
                                {row.folio}
                              </TableCell>
                              <TableCell>{row.work}</TableCell>
                              <TableCell>{row.artist}</TableCell>
                              <TableCell>{row.city}</TableCell>
                              <TableCell className="text-right">
                                <Badge variant={season}>{row.status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* 21. Blockquote */}
          <div className="space-y-4">
            <Heading level={3} variant="jugend" className="text-2xl">
              21. Blockquote Plaques (3 Versions)
            </Heading>
            <div className="grid gap-6 lg:grid-cols-3">
              {showV1 && (
                <div className="space-y-2">
                  <span className="block text-xs font-semibold opacity-75">
                    V1 · Botanical Epigraph Scroll
                  </span>
                  <Blockquote
                    variant={season}
                    author="Victor Horta, Memoirs, 1896"
                  >
                    I discard the flower and the leaf, but I keep the stem—the
                    living structural line through which nature rises toward the
                    light.
                  </Blockquote>
                </div>
              )}

              {showV2 && (
                <div className="space-y-2">
                  <span className="block text-xs font-semibold opacity-75">
                    V2 · Salon Literary Plaque
                  </span>
                  <Blockquote
                    variant={`${season}-salon`}
                    author="Alphonse Mucha, Lectures on Art"
                  >
                    Art exists to communicate a spiritual message of harmony,
                    turning every poster and vessel into quiet contemplation.
                  </Blockquote>
                </div>
              )}

              {showV3 && (
                <div className="space-y-2">
                  <span className="block text-xs font-semibold opacity-75">
                    V3 · Secession Manifesto Tablet
                  </span>
                  <Blockquote
                    variant={`${season}-secession`}
                    author="Ludwig Hevesi, Vienna Secession, 1898"
                  >
                    To every age its art. To every art its freedom. Let
                    craftsmanship honor truth in material and clarity in form.
                  </Blockquote>
                </div>
              )}
            </div>
          </div>

          {/* 22. Empty */}
          <div className="space-y-4">
            <Heading level={3} variant="jugend" className="text-2xl">
              22. Empty State Niches (3 Versions)
            </Heading>
            <div className="grid gap-6 lg:grid-cols-3">
              {showV1 && (
                <Empty variant={season}>
                  <EmptyMedia>
                    <ArchiveIcon />
                  </EmptyMedia>
                  <EmptyTitle>No Plates Unsealed</EmptyTitle>
                  <EmptyDescription>
                    Select an archival portfolio from the conservatory index to
                    inspect high-resolution lithographs.
                  </EmptyDescription>
                  <EmptyActions>
                    <Button variant={`${season}-gilded`}>Browse Vault</Button>
                  </EmptyActions>
                </Empty>
              )}

              {showV2 && (
                <Empty variant={`${season}-salon`}>
                  <EmptyMedia>
                    <SparklesIcon />
                  </EmptyMedia>
                  <EmptyTitle>Salon Frame Awaiting Work</EmptyTitle>
                  <EmptyDescription>
                    This passe-partout alcove is reserved for upcoming loans
                    from the Nancy School of Decorative Arts.
                  </EmptyDescription>
                  <EmptyActions>
                    <Button variant={season}>Notify Me</Button>
                  </EmptyActions>
                </Empty>
              )}

              {showV3 && (
                <Empty variant={`${season}-secession`}>
                  <EmptyMedia>
                    <CompassIcon />
                  </EmptyMedia>
                  <EmptyTitle>No Matching Folios</EmptyTitle>
                  <EmptyDescription>
                    Clear active movement filters to restore all 1895–1910
                    catalogued architectural plates.
                  </EmptyDescription>
                  <EmptyActions>
                    <Button variant={`${season}-secession`}>
                      Reset Filters
                    </Button>
                  </EmptyActions>
                </Empty>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
