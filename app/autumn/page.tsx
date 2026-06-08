"use client"

import * as React from "react"
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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
} from "@/components/ui/dropdown-menu"
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
import { Textarea } from "@/components/ui/textarea"
import {
  BellIcon,
  BookmarkIcon,
  LeafIcon,
  MailIcon,
  MoonIcon,
  PaletteIcon,
  SearchIcon,
  SendIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react"

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
  const [newsletter, setNewsletter] = React.useState(true)
  const [palette, setPalette] = React.useState("earth")

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="space-y-3 text-center">
          <Badge variant="secondary">Component Gallery</Badge>
          <h1 className="text-3xl font-medium tracking-tight">
            Jugend UI Showcase
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed">
            A sample page demonstrating every UI component in this project,
            styled with the autumn Art Nouveau variants wherever available.
          </p>
        </header>

        <Card variant="autumn" className="w-full">
          <CardHeader>
            <CardTitle align="center">The Whiplash Line</CardTitle>
            <CardDescription className="text-center">
              Organic curves and botanical ornament from the Jugendstil era
            </CardDescription>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <PaletteIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Palette</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={palette}
                      onValueChange={setPalette}
                    >
                      <DropdownMenuRadioItem value="earth">
                        <LeafIcon />
                        Earth tones
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="gold">
                        <SparklesIcon />
                        Gilded accents
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="ink">
                        <MoonIcon />
                        Ink &amp; charcoal
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={newsletter}
                      onCheckedChange={(checked) =>
                        setNewsletter(checked === true)
                      }
                    >
                      <MailIcon />
                      Newsletter
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <SunIcon />
                        More themes
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            Vienna Secession
                            <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Glasgow School
                            <DropdownMenuShortcut>⌘2</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
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
                  Request catalogue
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <LeafIcon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Send catalogue by post?</AlertDialogTitle>
                  <AlertDialogDescription>
                    We will mail a printed folio of Jugendstil reproductions to
                    the address in your profile. Delivery takes two to four
                    weeks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Not now</AlertDialogCancel>
                  <AlertDialogAction variant="autumn">
                    Send catalogue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>

        <section className="space-y-4 px-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Separator variant="autumn" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>

        <Card variant="autumn" className="w-full">
          <CardHeader>
            <CardTitle align="center">Visitor registration</CardTitle>
            <CardDescription className="text-center">
              Form fields built from Input, Select, Combobox, Textarea, and
              Field primitives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="space-y-6"
            >
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
                        <InputGroupButton variant="autumn">
                          <SendIcon />
                          Send
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>

                  <Field orientation="horizontal">
                    <Button variant="autumn" type="submit">
                      Register visit
                    </Button>
                    <Button variant="outline" type="reset">
                      Clear form
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </form>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <h2 className="text-center text-sm font-medium text-muted-foreground">
            Separator
          </h2>
          <div className="flex h-8 items-center justify-center gap-3">
            <span className="text-sm">Gallery</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Archive</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Shop</span>
          </div>
        </section>
      </div>
    </main>
  )
}
