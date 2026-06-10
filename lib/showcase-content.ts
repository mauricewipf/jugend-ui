import antwerpCentralStation from "@/assets/showcase/images/antwerp-central-station.jpg"
import artNouveauBalcony from "@/assets/showcase/images/art-nouveau-balcony.jpg"
import artNouveauInteriorArch from "@/assets/showcase/images/art-nouveau-interior-arch.jpg"

export const exhibits = [
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

export const imageRow = [
  { kind: "image", exhibit: exhibits[1] },
  { kind: "skeleton" },
  { kind: "image", exhibit: exhibits[2] },
] as const

export const movements = [
  "Jugendstil",
  "Art Nouveau",
  "Modern Style",
  "Sezession",
  "Stile Liberty",
] as const

export const mediums = [
  { value: "poster", label: "Poster" },
  { value: "glass", label: "Stained Glass" },
  { value: "furniture", label: "Furniture" },
  { value: "jewelry", label: "Jewelry" },
] as const
