"use client"

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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import {
  BellIcon,
  BookmarkIcon,
  LeafIcon,
  SearchIcon,
  SendIcon,
} from "lucide-react"

import antwerpCentralStation from "./images/antwerp-central-station.jpg"
import artNouveauBalcony from "./images/art-nouveau-balcony.jpg"
import artNouveauInteriorArch from "./images/art-nouveau-interior-arch.jpg"

const exhibits = [
  {
    src: artNouveauBalcony,
    alt: "Art Nouveau building facade with ornate architectural details and balcony in Zagreb",
    caption: "Facade ornament",
  },
  {
    src: artNouveauInteriorArch,
    alt: "Art Nouveau doorway with carved ornament, stained glass panels, and decorative arch",
    caption: "Ornate doorway",
  },
  {
    src: antwerpCentralStation,
    alt: "Antwerp Central Station interior with stone arch, clock, and glass ceiling",
    caption: "Antwerp Central",
  },
] as const

const imageRow = [
  { kind: "image", exhibit: exhibits[1] },
  { kind: "skeleton" },
  { kind: "image", exhibit: exhibits[2] },
] as const

const movements = [
  "Jugendstil",
  "Art Nouveau",
  "Modern Style",
  "Sezession",
  "Stile Liberty",
] as const

const mediums = [
  { value: "poster", label: "Poster" },
  { value: "glass", label: "Stained Glass" },
  { value: "furniture", label: "Furniture" },
  { value: "jewelry", label: "Jewelry" },
] as const

export default function AutumnPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="space-y-3 text-center">
          <Badge variant="secondary">Component Gallery</Badge>
          <Heading
            level={1}
            variant="jugend"
            className="text-6xl font-medium tracking-tight"
          >
            Jugend UI Autumn Showcase
          </Heading>
          <p className="mx-auto max-w-xl text-sm leading-relaxed">
            A sample page demonstrating every UI component in this project,
            styled with the autumn Art Nouveau variants wherever available.
          </p>
        </header>

        <Card variant="autumn" className="w-full">
          <CardHeader>
            <Heading level={3} variant="jugend" className="text-center text-3xl">
              The Whiplash Line
            </Heading>
            <CardDescription className="text-center">
              Organic curves and botanical ornament from the Jugendstil era
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Between 1890 and 1910, artists across Europe rejected industrial
              uniformity in favor of flowing lines inspired by vines, lilies,
              and the female form. Decorative borders framed everyday objects,
              turning posters, furniture, and typography into total works of art.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>1895</Badge>
              <Badge variant="outline">Organic</Badge>
              <Badge variant="secondary">Ornamental</Badge>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="autumn" size="lg">
                <BookmarkIcon data-icon="inline-start" />
                Save exhibition
              </Button>
              <Button variant="outline">Learn more</Button>
              <Button variant="ghost" size="icon">
                <BellIcon />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="autumn" size="lg">
                  View exhibition details
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <LeafIcon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>The Whiplash Line</AlertDialogTitle>
                  <AlertDialogDescription>
                    A travelling survey of Jugendstil ornament from Munich to
                    Brussels, featuring posters, furniture, and metalwork from
                    1895–1910. Guided tours run Saturdays at 14:00.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction variant="default">
                    Reserve a tour
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>

        <section className="space-y-4 px-2">
          <Heading
            level={2}
            variant="jugend"
            className="text-center text-base font-medium text-muted-foreground"
          >
            Heading
          </Heading>
          <div className="space-y-3">
            <Heading level={1} variant="jugend" className="text-6xl">
              Heading 1
            </Heading>
            <Heading level={2} variant="jugend" className="text-4xl">
              Heading 2
            </Heading>
            <Heading level={3} variant="jugend" className="text-3xl">
              Heading 3
            </Heading>
            <Heading level={4} variant="jugend" className="text-2xl">
              Heading 4
            </Heading>
            <Heading level={5} variant="jugend" className="text-xl">
              Heading 5
            </Heading>
            <Heading level={6} variant="jugend" className="text-lg">
              Heading 6
            </Heading>
          </div>
        </section>

        <section className="space-y-4 px-2">
          <p className="text-sm leading-relaxed">
            Between 1890 and 1910, architects across Europe turned everyday
            buildings into total works of art — facades, interiors, and railway
            halls alike.
          </p>
          <Separator variant="autumn" />
          <p className="text-sm leading-relaxed">
            Stone carvings, wrought iron, and painted woodwork carried the same
            whiplash curves from street facades into entrance halls and
            waiting rooms — ornament no longer confined to a single surface.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {imageRow.map((slot) => (
              <figure
                key={
                  slot.kind === "skeleton" ? "skeleton" : slot.exhibit.caption
                }
                className="space-y-2"
              >
                {slot.kind === "skeleton" ? (
                  <Skeleton variant="autumn" className="aspect-[2/3] w-full" />
                ) : (
                  <img
                    src={slot.exhibit.src.src}
                    alt={slot.exhibit.alt}
                    width={slot.exhibit.src.width}
                    height={slot.exhibit.src.height}
                    className="aspect-[2/3] w-full rounded-sm object-cover"
                  />
                )}
                <figcaption className="text-center text-xs text-muted-foreground">
                  {slot.kind === "skeleton" ? "Skeleton" : slot.exhibit.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-sm leading-relaxed">
            These photographs trace that impulse across scales — a single
            window bay, a domestic threshold, and a civic monument — each
            treating architecture as a canvas for organic line and craft.
          </p>
        </section>

        <Card variant="autumn" className="w-full">
          <CardHeader>
            <Heading level={3} variant="jugend" className="text-center text-3xl">
              Visitor registration
            </Heading>
            <CardDescription className="text-center">
              Form fields built from Input, Select, Combobox, Textarea, and
              Field primitives
            </CardDescription>
          </CardHeader>
          <form onSubmit={(event) => event.preventDefault()}>
            <CardContent className="space-y-6">
              <FieldSet>
                <FieldLegend>Personal details</FieldLegend>
                <FieldDescription>
                  Tell us who will attend the gallery opening.
                </FieldDescription>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="visitor-name">Full name</FieldLabel>
                      <Input
                        id="visitor-name"
                        placeholder="Clara Behrens"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="visitor-email">Email</FieldLabel>
                      <Input
                        id="visitor-email"
                        type="email"
                        placeholder="clara@atelier.example"
                        required
                      />
                    </Field>
                  </div>

                  <FieldSeparator>Preferences</FieldSeparator>

                  <Field>
                    <FieldTitle>Favourite movement</FieldTitle>
                    <FieldContent>
                      <Combobox items={movements}>
                        <ComboboxInput
                          id="visitor-movement"
                          placeholder="Search movements…"
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No movements found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                      <FieldDescription>
                        Start typing to filter the list of stylistic schools.
                      </FieldDescription>
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="visitor-medium">
                      Preferred medium
                    </FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="visitor-medium" className="w-full">
                        <SelectValue placeholder="Choose a medium" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Exhibits</SelectLabel>
                          {mediums.map((medium) => (
                            <SelectItem key={medium.value} value={medium.value}>
                              {medium.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>Other</SelectLabel>
                          <SelectItem value="mixed">Mixed media</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="visitor-notes">
                      Curator notes
                    </FieldLabel>
                    <Textarea
                      id="visitor-notes"
                      placeholder="Accessibility requirements, guided tour requests…"
                    />
                    <FieldError>Please keep notes under 500 characters.</FieldError>
                  </Field>

                  <Field>
                    <Label htmlFor="search-archive">Archive search</Label>
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <InputGroupText>
                          <SearchIcon />
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="search-archive"
                        placeholder="Search the collection…"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton aria-label="Search">
                          <SearchIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="visitor-message">
                      Message to the curator
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id="visitor-message"
                        placeholder="Write a short note…"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupButton variant="default">
                          <SendIcon />
                          Send
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>

                </FieldGroup>
              </FieldSet>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="autumn" size="lg" type="submit">
                Register visit
              </Button>
              <Button variant="outline" type="reset">
                Clear form
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  )
}
