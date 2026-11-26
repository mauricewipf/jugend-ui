import {
  buildAsymmetrischeSynthese,
  buildOffeneIrisAsymmetrie,
  buildSyntheseIris,
} from "./finalist-geometry"
import {
  buildBluetenKaskade,
  buildFreesienRanke,
  buildJugendTorbogen,
  buildMuchaPortal,
  buildOffenerKranz,
} from "./multicolor-geometry"
import {
  buildHalo,
  buildIris,
  buildKathedrale,
  buildLibelle,
  buildSeerose,
  buildSynthese,
  buildWelle,
} from "./wild-geometry"

export type DraftStyleId =
  | "asym_synthese"
  | "offene_iris"
  | "synthese_iris"
  | "kaskade"
  | "mucha_portal"
  | "freesie"
  | "torbogen"
  | "offener_kranz"
  | "synthese"
  | "kathedrale"
  | "seerose"
  | "iris"
  | "libelle"
  | "halo"
  | "welle"
  | "schleife"
  | "peitschenhieb"
  | "bogen"
  | "taille"
  | "filigran"

export type PaletteId =
  | "koralle"
  | "salbei_multi"
  | "tuerkis"
  | "sage"
  | "terrakotta"
  | "pfau"
  | "pergament"
  | "spring"
  | "autumn"
  | "summer"
  | "winter"

export type FrameScale = "card" | "tile" | "button"

export type ColorToken =
  | "ink"
  | "stem"
  | "leaf"
  | "petalPrimary"
  | "petalSecondary"
  | "center"
  | "none"

export interface ColoredSvgLayer {
  d: string
  fill?: ColorToken
  fillOpacity?: number
  stroke?: ColorToken
  strokeWidth?: number
  strokeOpacity?: number
}

export interface DraftPalette {
  id: PaletteId
  label: string
  subtitle: string
  group: "multi" | "poster" | "season"
  isDark?: boolean
  pageBg: string
  surface: string
  surfaceHover: string
  stroke: string
  strokeAccent: string
  accentFill: string
  text: string
  mutedText: string
  pillBg: string
  pillText: string
  // Multi-color botanical lithograph tokens
  stem: string
  leaf: string
  petalPrimary: string
  petalSecondary: string
  center: string
}

export const DRAFT_PALETTES: Record<PaletteId, DraftPalette> = {
  koralle: {
    id: "koralle",
    label: "Mucha Koralle",
    subtitle: "Farben Bild 1 · Creme, Salbei & Koralle",
    group: "multi",
    pageBg: "#F7F2E7",
    surface: "#FFFDF7",
    surfaceHover: "#F9F1E1",
    stroke: "#2B3F3B",
    strokeAccent: "#77A195",
    accentFill: "#E56C38",
    text: "#22312E",
    mutedText: "#566862",
    pillBg: "#E6EFEA",
    pillText: "#253D37",
    stem: "#739E92",
    leaf: "#A3C4B8",
    petalPrimary: "#E56C38",
    petalSecondary: "#F6D3AA",
    center: "#E4AC3E",
  },
  salbei_multi: {
    id: "salbei_multi",
    label: "Salbei · Bunt",
    subtitle: "Poster Salbei + Koralle & Creme",
    group: "multi",
    isDark: true,
    pageBg: "#48574A",
    surface: "#556657",
    surfaceHover: "#607262",
    stroke: "#EAE2B7",
    strokeAccent: "#93BEA8",
    accentFill: "#EB8254",
    text: "#F7F3DC",
    mutedText: "#D5D4BE",
    pillBg: "#435245",
    pillText: "#EFE7BF",
    stem: "#88B69F",
    leaf: "#6E9883",
    petalPrimary: "#EA8152",
    petalSecondary: "#F7DFB6",
    center: "#F0C55A",
  },
  tuerkis: {
    id: "tuerkis",
    label: "Anemone Türkis",
    subtitle: "Farben Bild 5 · Türkis, Weiß & Gold",
    group: "multi",
    pageBg: "#F9F6EE",
    surface: "#FFFDF9",
    surfaceHover: "#F2F7F5",
    stroke: "#264B48",
    strokeAccent: "#3E9C92",
    accentFill: "#E9B338",
    text: "#1D3836",
    mutedText: "#4F6C69",
    pillBg: "#E0F0EC",
    pillText: "#1E4A46",
    stem: "#3B9A90",
    leaf: "#9ACBC0",
    petalPrimary: "#FAF5E8",
    petalSecondary: "#E9F3EF",
    center: "#EAB336",
  },
  sage: {
    id: "sage",
    label: "Poster Salbei",
    subtitle: "Favorit · Salbei & Creme",
    group: "poster",
    isDark: true,
    pageBg: "#49584B",
    surface: "#566758",
    surfaceHover: "#617363",
    stroke: "#EAE2B7",
    strokeAccent: "#D6CC96",
    accentFill: "#EAE2B7",
    text: "#F7F3DC",
    mutedText: "#D5D4BE",
    pillBg: "#455347",
    pillText: "#ECE4BC",
    stem: "#9BB89F",
    leaf: "#7D9B82",
    petalPrimary: "#EAE2B7",
    petalSecondary: "#D9CE98",
    center: "#F2D379",
  },
  terrakotta: {
    id: "terrakotta",
    label: "Mucha Bordeaux",
    subtitle: "Weinrot & Champagnergold",
    group: "poster",
    isDark: true,
    pageBg: "#4B2B2A",
    surface: "#593533",
    surfaceHover: "#663E3C",
    stroke: "#EED9A8",
    strokeAccent: "#D4B374",
    accentFill: "#EED9A8",
    text: "#FBF1DC",
    mutedText: "#DFC8B4",
    pillBg: "#432524",
    pillText: "#F2DFB4",
    stem: "#8CA692",
    leaf: "#6E8775",
    petalPrimary: "#E78C5E",
    petalSecondary: "#F3DDB0",
    center: "#F2C864",
  },
  pfau: {
    id: "pfau",
    label: "Mitternacht Pfau",
    subtitle: "Tiefes Petrol & Messing",
    group: "poster",
    isDark: true,
    pageBg: "#1E383F",
    surface: "#26454E",
    surfaceHover: "#2F535D",
    stroke: "#E7D7A5",
    strokeAccent: "#BFC48F",
    accentFill: "#E7D7A5",
    text: "#F5EED8",
    mutedText: "#BFD0CE",
    pillBg: "#1A3036",
    pillText: "#EDE0B5",
    stem: "#569D96",
    leaf: "#3C7D78",
    petalPrimary: "#E58756",
    petalSecondary: "#F2E2B8",
    center: "#F0C352",
  },
  pergament: {
    id: "pergament",
    label: "Atelier Pergament",
    subtitle: "Warmes Leinen & Olive-Bronze",
    group: "poster",
    pageBg: "#F3EDE0",
    surface: "#FAF6EC",
    surfaceHover: "#EFE6D4",
    stroke: "#465137",
    strokeAccent: "#9D8444",
    accentFill: "#C7AF6E",
    text: "#252B1E",
    mutedText: "#5A614E",
    pillBg: "#E6DEC9",
    pillText: "#363F29",
    stem: "#7E946C",
    leaf: "#AAB999",
    petalPrimary: "#D97546",
    petalSecondary: "#F2D59B",
    center: "#D99F32",
  },
  spring: {
    id: "spring",
    label: "Spring",
    subtitle: "Frisches Blattgrün",
    group: "season",
    pageBg: "#FAFDF8",
    surface: "#F2FAEE",
    surfaceHover: "#E7F5DF",
    stroke: "#466B2B",
    strokeAccent: "#7EB34E",
    accentFill: "#98C868",
    text: "#1D3013",
    mutedText: "#4B633B",
    pillBg: "#E2F1D7",
    pillText: "#284417",
    stem: "#6FA346",
    leaf: "#A9D282",
    petalPrimary: "#F08C5B",
    petalSecondary: "#FCE6B8",
    center: "#EAB43B",
  },
  autumn: {
    id: "autumn",
    label: "Autumn",
    subtitle: "Warmes Ocker & Gold",
    group: "season",
    pageBg: "#FDFBF7",
    surface: "#FBF3E4",
    surfaceHover: "#F5E7CC",
    stroke: "#6D4619",
    strokeAccent: "#B88435",
    accentFill: "#D4A44C",
    text: "#2C1D0D",
    mutedText: "#6E5334",
    pillBg: "#F1E1C2",
    pillText: "#4B2F0E",
    stem: "#9A7E46",
    leaf: "#C7AF76",
    petalPrimary: "#D45D2E",
    petalSecondary: "#F2C785",
    center: "#E8A62E",
  },
  summer: {
    id: "summer",
    label: "Summer",
    subtitle: "Sonnengold & Bernstein",
    group: "season",
    pageBg: "#FFFEF9",
    surface: "#FFFCEB",
    surfaceHover: "#FDF5CC",
    stroke: "#8A5E08",
    strokeAccent: "#D9A426",
    accentFill: "#F2C64D",
    text: "#302004",
    mutedText: "#735822",
    pillBg: "#FAF0C5",
    pillText: "#573B06",
    stem: "#88A85B",
    leaf: "#BDD48E",
    petalPrimary: "#E97B35",
    petalSecondary: "#FCE28D",
    center: "#E0911E",
  },
  winter: {
    id: "winter",
    label: "Winter",
    subtitle: "Eisblau & Schiefer",
    group: "season",
    pageBg: "#F8FBFD",
    surface: "#EFF7FC",
    surfaceHover: "#E1F0F9",
    stroke: "#295477",
    strokeAccent: "#5F96BD",
    accentFill: "#89BADB",
    text: "#13273B",
    mutedText: "#44627B",
    pillBg: "#DCECF7",
    pillText: "#1C3D5A",
    stem: "#5C8FB5",
    leaf: "#9EC2DD",
    petalPrimary: "#D97C6C",
    petalSecondary: "#EBF4FB",
    center: "#E5BA5A",
  },
}

export interface DraftStyleMeta {
  id: DraftStyleId
  number: string
  name: string
  badge?: string
  group: "finalist" | "multi" | "new" | "classic"
  tagline: string
  inspiration: string
  responsiveNotes: string
}

export const DRAFT_STYLES: DraftStyleMeta[] = [
  {
    id: "asym_synthese",
    number: "18",
    name: "Asymmetrische Synthese",
    badge: "Finalist · 06 + 08 + 09",
    group: "finalist",
    tagline: "Pinsel-Asymmetrie + offene Schleifen + Iris-Blüten + Krone & Fächer",
    inspiration:
      "Vereint exakt alle deine Favoriten: Draft 08 Pinsel-Schwung diagonal (OL & UR), Draft 06 offene Eckschlaufen (OR & UL), Wellenkrone oben, 5-Blatt-Fächer unten und die grafischen 3-Blatt-Irisblüten aus Draft 09.",
    responsiveNotes:
      "Große Cards tragen volle Krone, Fächer und zwei asymmetrische Iris-Blüten; kleine Kacheln & Buttons reduzieren sich auf den dynamischen diagonalen Schwung + eine zarte Iris-Knospe.",
  },
  {
    id: "offene_iris",
    number: "19",
    name: "Offene Iris-Asymmetrie",
    badge: "Finalist · Nach unten offen",
    group: "finalist",
    tagline: "Nach unten geöffnet + Pinsel-Asymmetrie + 3-Blatt-Iris + Krone",
    inspiration:
      "Kombiniert deine liebste offene Form (nach unten geöffnet mit geschwungenen Füßen), den asymmetrischen Tusche-Schwung aus Draft 08, die Wellenkrone aus Draft 06 und die feinen 3-Blatt-Irisblüten aus Draft 09.",
    responsiveNotes:
      "Große Cards öffnen sich luftig nach unten mit Seiten-Iris und Krone oben; kleine Kacheln & Buttons bleiben nach unten offen mit einem markanten Iris-Akzent oben links.",
  },
  {
    id: "synthese_iris",
    number: "20",
    name: "Jugend-Synthese · Iris",
    badge: "Finalist · Symmetrisch",
    group: "finalist",
    tagline: "Draft 06 veredelt mit Draft-09-Irisblüten & Mehrfarbigkeit",
    inspiration:
      "Die ruhige, symmetrische Weiterentwicklung von Draft 06: behält offene Eckschlaufen, Innen-Voluten, Wellenkrone & Boden-Fächer und setzt zwei grafische 3-Blatt-Irisblüten aus Draft 09 in die oberen Ecken.",
    responsiveNotes:
      "Große Cards zeigen das volle symmetrische Ensemble; kleine Kacheln & Buttons bleiben die ultraklare Draft-06-Linie.",
  },
  {
    id: "kaskade",
    number: "13",
    name: "Blüten-Kaskade",
    badge: "Nach unten offen · Favorit",
    group: "multi",
    tagline: "Nach unten geöffnete Blüten-Ranke in Salbei, Koralle & Creme",
    inspiration:
      "Verbindet direkt dein Favoriten-Bild 5 (nach unten geöffnet, fließende Blüten-Kaskade + doppelte Seiten-Ranken) mit den warmen Korallen- & Salbeifarben aus Bild 1.",
    responsiveNotes:
      "Große Cards tragen volle Blüten-Kaskaden oben & seitlich + geschwungene Fuß-Ranken; kleine Kacheln & Buttons bleiben luftig nach unten offen mit zarten Eck-Blüten.",
  },
  {
    id: "mucha_portal",
    number: "14",
    name: "Mucha-Portal",
    badge: "Mehrfarbig · Bild 1",
    group: "multi",
    tagline: "Salbei-Bogen mit Korallen-Girlande & Kamee-Medaillon unten",
    inspiration:
      "Direkt nach deinem Bild 1: weicher Rundbogen-Rahmen in Salbei, üppige Pfirsich- & Korallenblüten oben und ein rundes Kamee-Medaillon mit Blättern unten.",
    responsiveNotes:
      "Große Cards entfalten Blüten-Girlande oben & Kamee-Medaillon unten; kleine Kacheln & Buttons reduzieren sich auf den doppelten Salbei-Rahmen mit feinen Korallen-Knospen.",
  },
  {
    id: "freesie",
    number: "15",
    name: "Freesien-Ranke",
    badge: "Mehrfarbig · Bild 3",
    group: "multi",
    tagline: "Verwobene Stängel, Blüten-Rispen & geflochtene Bodenschleife",
    inspiration:
      "Inspiriert von deinem Bild 3: lebendige, verwobene Blattstängel als Rahmen, zweifarbige Blüten-Rispen in den Ecken und ein geflochtener Achter-Knoten unten.",
    responsiveNotes:
      "Große Cards zeigen alle vier Blüten-Rispen & die geflochtene Schleife unten; kompakt bleiben die organischen Doppel-Stängel mit kleinen Knospen.",
  },
  {
    id: "torbogen",
    number: "16",
    name: "Jugend-Torbogen",
    badge: "Mehrfarbig · Bild 4",
    group: "multi",
    tagline: "Zwickel-Portal mit Korallen-Glocken & Iris-Scheitel",
    inspiration:
      "Direkt nach deinem Bild 4: weiter Salbei-Bogen im feinen Rechteck-Spiegel, leuchtende Korallen-Glockenblumen in den oberen Zwickeln und heller Schlussstein unten.",
    responsiveNotes:
      "Große Cards zeigen Zwickel-Blüten, Iris-Scheitel und Fuß-Schlussstein; kleine Kacheln & Buttons behalten den farbigen Salbei-Bogen mit zarten Korallen-Knospen.",
  },
  {
    id: "offener_kranz",
    number: "17",
    name: "Offener Schleifen-Kranz",
    badge: "Nach unten offen · Bild 2 + 5",
    group: "multi",
    tagline: "Nach unten offene Kalligrafie-Schleifen & bunte Muschelkrone",
    inspiration:
      "Zweite nach unten geöffnete Variante: verbindet deine Schleifen-Idee mit der Muschel-Fächerkrone aus Bild 2, bunten Eck-Rosetten und frei auslaufenden Band-Enden unten.",
    responsiveNotes:
      "Große Cards tragen Muschelkrone oben & seitliche Band-Schnörkel; kleine Kacheln & Buttons reduzieren sich auf den luftigen, nach unten offenen Schleifenbogen.",
  },
  {
    id: "synthese",
    number: "06",
    name: "Jugend-Synthese",
    badge: "Favoriten-Mix",
    group: "new",
    tagline: "Ecken aus 01 & 02 + Krone aus 02 + Fächerblatt aus 03",
    inspiration:
      "Direkt nach deinem Feedback kombiniert: offene Eckschlaufen + Innen-Voluten, Wellenkrone oben mit Tropfenknospe und 5-Blatt-Fächer unten.",
    responsiveNotes:
      "Große Cards zeigen Krone oben & Fächer unten; kleine Kacheln und Buttons reduzieren sich sauber auf die geschwungenen Hybrid-Ecken.",
  },
  {
    id: "kathedrale",
    number: "07",
    name: "Kathedrale",
    badge: "Architektur-Bogen",
    group: "new",
    tagline: "Geschwungener Jugendstil-Spitzbogen à la Pariser Métro",
    inspiration:
      "Inspiriert von Hector Guimard & historischen Jugendstil-Portalen — die gesamte Oberkante wölbt sich statt einer geraden Linie zu einem Portal-Bogen mit Zwickel-Ranken.",
    responsiveNotes:
      "Große Cards tragen volle Zwickel-Ecken & Strahlen-Rosette am Scheitel; kleine Kacheln werden zu schlanken Bogen-Fenstern und Buttons zu spitzbogigen Plaketten.",
  },
  {
    id: "seerose",
    number: "08",
    name: "Seerose",
    badge: "Verrückt · Asymmetrisch",
    group: "new",
    tagline: "Asymmetrisches Pinsel-Band mit dynamischer Strichstärke",
    inspiration:
      "Inspiriert vom Referenz-Set (Mitte links & oben rechts): echte Jugendstil-Asymmetrie — breiter Tuscheschwung oben links & unten rechts, hauchfeine Linie gegenüber.",
    responsiveNotes:
      "Auf großen Cards fließen zusätzliche Peitschen-Ranken über die Ober- und Unterkante; kompakt bleibt der markante asymmetrische Kalligrafie-Schwung.",
  },
  {
    id: "iris",
    number: "09",
    name: "Iris-Säulen",
    badge: "Verrückt · Oben offen",
    group: "new",
    tagline: "Zwei Blumen-Stängel ohne Oberkante & geflochtener Wurzelbogen",
    inspiration:
      "Direkt inspiriert vom ausgefallenen Rahmen unten (3. v. l.) im Referenz-Set: oben völlig offen für die Typografie, seitlich blühende Iris-Säulen, unten ein verflochtener Bogen.",
    responsiveNotes:
      "Große Cards zeigen hohe Stängel mit Seitenblättern & doppeltem Wurzelbogen; kleine Kacheln und Buttons werden zu luftigen botanischen Klammern.",
  },
  {
    id: "libelle",
    number: "10",
    name: "Libelle",
    badge: "Verrückt · Juwelierkunst",
    group: "new",
    tagline: "Durchscheinende Libellenflügel & Cabochon-Krone (Lalique)",
    inspiration:
      "Inspiriert von René Laliques berühmten Jugendstil-Broschen: fein geäderte Libellenflügel an den oberen Ecken, Edelstein-Cabochon mit Fühlern oben.",
    responsiveNotes:
      "Große Cards entfalten Doppel-Flügelpaare und Cabochon-Krone; kleine Kacheln schrumpfen auf zarte Einzelflügel und Buttons werden zu spitzen Flügel-Spangen.",
  },
  {
    id: "halo",
    number: "11",
    name: "Mucha-Halo",
    badge: "Plakat-Aureole",
    group: "new",
    tagline: "Konzentrischer Zodiak-Heiligenschein & Medaillon-Bögen",
    inspiration:
      "Hommage an Alphonse Muchas ikonische Plakat-Aureolen: ein konzentrischer Strahlen-Halbkreis steigt hinter der Oberkante auf, begleitet von runden Medaillon-Ecken.",
    responsiveNotes:
      "Große Cards tragen die volle Zodiak-Aureole oben, kleine Seiten-Perlen und Fuß-Medaillon; kleine Kacheln und Buttons zeigen reine konzentrische Rundbögen.",
  },
  {
    id: "welle",
    number: "12",
    name: "Welle",
    badge: "Verrückt · Keine Gerade",
    group: "new",
    tagline: "Flüssige Tinten-Wellen & gegenläufiges Flechtband",
    inspiration:
      "Null gerade Linien im gesamten Rahmen: alle vier Seiten atmen in sanften S-Wellen, umschlungen von einer gegenläufigen Echo-Linie und Nautilus-Wellenkamm oben.",
    responsiveNotes:
      "Große Cards flechten zwei gegenläufige Wellenlinien mit Doppel-Wellenkrone oben; auf Buttons bleibt ein spielerisches Wellenband mit eingerollten Enden.",
  },
  {
    id: "schleife",
    number: "01",
    name: "Schleife",
    group: "classic",
    tagline: "Durchgehende Ein-Linien-Kalligrafie mit Eckschlaufen",
    inspiration:
      "Direkt nach deiner Handskizze (Eck-Schlaufen + Kronen-Schlaufe oben & Seiten-Schnörkel)",
    responsiveNotes:
      "Ab 300px Breite erscheint die geschwungene Mittelschlaufe oben, ab 200px Höhe die kleinen Seitenschlaufen. Bei kleinen Kacheln & Buttons bleibt nur die feine Eckschlaufen-Linie.",
  },
  {
    id: "peitschenhieb",
    number: "02",
    name: "Peitschenhieb",
    group: "classic",
    tagline: "Organischer Jugendstil-Schwung mit Voluten-Ecken",
    inspiration:
      "Inspiriert vom Referenz-Bogen (oben links & unten links) — fließende S-Kurven statt harter Ecken",
    responsiveNotes:
      "Bei großen Cards öffnet sich oben eine symmetrische Wellen-Krone und unten ein feiner Gegenschwung. Kompakt schrumpft der Rahmen auf schlanke Voluten-Ecken.",
  },
  {
    id: "bogen",
    number: "03",
    name: "Bogen & Ranke",
    group: "classic",
    tagline: "Weich gerundete Schultern mit feinen Blattknospen",
    inspiration:
      "Verbindet deine beliebte grüne Spring-Card mit dem botanischen Bogen aus dem Referenz-Set (oben 2. v. l. & unten rechts)",
    responsiveNotes:
      "Große Karten erhalten oben eine zarte Lilien-Knospe und unten ein kleines Fächerblatt-Ornament. Kleine Kacheln & Buttons reduzieren sich auf weiche Ranken-Ecken.",
  },
  {
    id: "taille",
    number: "04",
    name: "Taille",
    group: "classic",
    tagline: "Lebendige Silhouette mit geschwungenen Blatt-Ecken",
    inspiration:
      "Inspiriert vom Rahmen unten (2. v. l.) im Referenz-Set — organische Einziehung an den Seiten",
    responsiveNotes:
      "Bei großen Cards ziehen sich die vertikalen Seiten sanft zur Mitte hin ein und oben/unten schließen elegante Blatt-Bögen an. Klein & schmal werden Seiten und Kanten ruhig und klar.",
  },
  {
    id: "filigran",
    number: "05",
    name: "Filigran",
    group: "classic",
    tagline: "Luftige Spiralecken für moderne, dichte UI-Flächen",
    inspiration:
      "Inspiriert vom feinen Rahmen Mitte rechts im Referenz-Set — maximale Ruhe bei unverkennbarem Jugendstil",
    responsiveNotes:
      "Bei breiten Cards krönt eine hauchfeine Dreiblatt-Welle die Oberkante und eine dezente Fußspange den Boden. Auf Buttons und kleinen Kacheln bleiben präzise Eck-Spiralen.",
  },
]

export interface FramePaths {
  fillPath: string
  primaryStrokes: string[]
  accentStrokes: string[]
  accentFills: string[]
  solidFills?: string[]
  colorLayers?: ColoredSvgLayer[]
  strokeWidth: number
  accentStrokeWidth: number
  hasTopCrest: boolean
  hasSideFlourish: boolean
  hasBottomCrest: boolean
}

export interface FrameBuildOptions {
  width: number
  height: number
  scale: FrameScale
  forceTopCrest?: boolean
  forceSideFlourish?: boolean
}

const f = (n: number) => Number(n.toFixed(2))

function computeFlags(opts: FrameBuildOptions) {
  const { width, height, scale, forceTopCrest, forceSideFlourish } = opts
  if (scale === "button") {
    return {
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }
  const hasTopCrest =
    forceTopCrest !== undefined ? forceTopCrest : width >= 300 && height >= 120
  const hasSideFlourish =
    forceSideFlourish !== undefined
      ? forceSideFlourish
      : height >= 205 && width >= 250
  const hasBottomCrest =
    forceTopCrest !== undefined
      ? forceTopCrest && height >= 180
      : width >= 330 && height >= 190
  return { hasTopCrest, hasSideFlourish, hasBottomCrest }
}

/**
 * Draft 01: "Schleife"
 * Directly faithful to the user's hand-drawn sketch:
 * - Single continuous calligraphic line with outward loops at every corner
 * - When wide: centered triple-loop crown seamlessly emerging from the top line
 * - When tall: twin small loops emerging from the left & right mid-edges
 * - When small (Kleine Kachel / Button): clean straight-ish connecting rails + 4 corner loops only
 */
function buildSchleife(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish } = computeFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 24, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 20, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  // Corner loop proportions
  const c =
    scale === "button"
      ? Math.min(11, innerH * 0.32, innerW * 0.14)
      : Math.min(20, innerH * 0.22, innerW * 0.14)
  const r = c * 0.56

  // Build ONE continuous closed calligraphic path clockwise starting right of TL loop
  const segs: string[] = []
  segs.push(`M ${f(x0 + c)} ${f(y0)}`)

  // TOP EDGE (with optional sketch crown in center)
  if (hasTopCrest && innerW >= 220) {
    const cw = Math.min(52, innerW * 0.16) // half-width of crown
    const ch = Math.min(22, cw * 0.44) // crown loop height
    const sc = cw * 0.24 // side small curl size

    segs.push(`L ${f(cx - cw)} ${f(y0)}`)
    // Left little loop
    segs.push(
      `C ${f(cx - cw * 0.72)} ${f(y0)}, ${f(cx - cw * 0.62)} ${f(y0 - sc * 0.95)}, ${f(cx - cw * 0.78)} ${f(y0 - sc * 0.95)}`
    )
    segs.push(
      `C ${f(cx - cw * 0.96)} ${f(y0 - sc * 0.95)}, ${f(cx - cw * 0.86)} ${f(y0 + 1.5)}, ${f(cx - cw * 0.45)} ${f(y0 + 1.2)}`
    )
    // Tall central calligraphic loop (sweeps up, crosses gracefully like pen stroke)
    segs.push(
      `C ${f(cx - cw * 0.14)} ${f(y0 + 1.2)}, ${f(cx + cw * 0.28)} ${f(y0 - ch * 0.48)}, ${f(cx + cw * 0.18)} ${f(y0 - ch * 0.88)}`
    )
    segs.push(
      `C ${f(cx + cw * 0.1)} ${f(y0 - ch * 1.18)}, ${f(cx - cw * 0.1)} ${f(y0 - ch * 1.18)}, ${f(cx - cw * 0.18)} ${f(y0 - ch * 0.88)}`
    )
    segs.push(
      `C ${f(cx - cw * 0.28)} ${f(y0 - ch * 0.48)}, ${f(cx + cw * 0.14)} ${f(y0 + 1.2)}, ${f(cx + cw * 0.45)} ${f(y0 + 1.2)}`
    )
    // Right little loop (mirror)
    segs.push(
      `C ${f(cx + cw * 0.86)} ${f(y0 + 1.5)}, ${f(cx + cw * 0.96)} ${f(y0 - sc * 0.95)}, ${f(cx + cw * 0.78)} ${f(y0 - sc * 0.95)}`
    )
    segs.push(
      `C ${f(cx + cw * 0.62)} ${f(y0 - sc * 0.95)}, ${f(cx + cw * 0.72)} ${f(y0)}, ${f(cx + cw)} ${f(y0)}`
    )
  }
  segs.push(`L ${f(x1 - c)} ${f(y0)}`)

  // TOP-RIGHT CORNER LOOP (open calligraphic crossing loop)
  segs.push(
    `C ${f(x1 - c * 0.25)} ${f(y0)}, ${f(x1 + r * 0.45)} ${f(y0)}, ${f(x1 + r * 0.85)} ${f(y0 - r * 0.45)}`
  )
  segs.push(
    `C ${f(x1 + r * 1.15)} ${f(y0 - r * 0.82)}, ${f(x1 + r * 0.52)} ${f(y0 - r * 1.25)}, ${f(x1 + r * 0.14)} ${f(y0 - r * 0.78)}`
  )
  segs.push(
    `C ${f(x1 - r * 0.15)} ${f(y0 - r * 0.4)}, ${f(x1)} ${f(y0 + c * 0.28)}, ${f(x1)} ${f(y0 + c)}`
  )

  // RIGHT EDGE (with optional twin mid-edge crossing loops from sketch)
  if (hasSideFlourish && innerH >= 150) {
    const sh = Math.min(28, innerH * 0.15)
    const sd = 10
    segs.push(`L ${f(x1)} ${f(cy - sh)}`)
    // Upper-right crossing eyelet
    segs.push(
      `C ${f(x1)} ${f(cy - sh * 0.32)}, ${f(x1 - sd * 0.85)} ${f(cy - sh * 0.2)}, ${f(x1 - sd * 0.72)} ${f(cy - sh * 0.54)}`
    )
    segs.push(
      `C ${f(x1 - sd * 0.58)} ${f(cy - sh * 0.85)}, ${f(x1 + sd * 0.75)} ${f(cy - sh * 0.42)}, ${f(x1 + sd * 0.4)} ${f(cy)}`
    )
    // Lower-right crossing eyelet
    segs.push(
      `C ${f(x1 + sd * 0.75)} ${f(cy + sh * 0.42)}, ${f(x1 - sd * 0.58)} ${f(cy + sh * 0.85)}, ${f(x1 - sd * 0.72)} ${f(cy + sh * 0.54)}`
    )
    segs.push(
      `C ${f(x1 - sd * 0.85)} ${f(cy + sh * 0.2)}, ${f(x1)} ${f(cy + sh * 0.32)}, ${f(x1)} ${f(cy + sh)}`
    )
  }
  segs.push(`L ${f(x1)} ${f(y1 - c)}`)

  // BOTTOM-RIGHT CORNER LOOP (open calligraphic crossing loop)
  segs.push(
    `C ${f(x1)} ${f(y1 - c * 0.25)}, ${f(x1)} ${f(y1 + r * 0.45)}, ${f(x1 + r * 0.45)} ${f(y1 + r * 0.85)}`
  )
  segs.push(
    `C ${f(x1 + r * 0.82)} ${f(y1 + r * 1.15)}, ${f(x1 + r * 1.25)} ${f(y1 + r * 0.52)}, ${f(x1 + r * 0.78)} ${f(y1 + r * 0.14)}`
  )
  segs.push(
    `C ${f(x1 + r * 0.4)} ${f(y1 - r * 0.15)}, ${f(x1 - c * 0.28)} ${f(y1)}, ${f(x1 - c)} ${f(y1)}`
  )

  // BOTTOM EDGE
  segs.push(`L ${f(x0 + c)} ${f(y1)}`)

  // BOTTOM-LEFT CORNER LOOP (open calligraphic crossing loop)
  segs.push(
    `C ${f(x0 + c * 0.25)} ${f(y1)}, ${f(x0 - r * 0.45)} ${f(y1)}, ${f(x0 - r * 0.85)} ${f(y1 + r * 0.45)}`
  )
  segs.push(
    `C ${f(x0 - r * 1.15)} ${f(y1 + r * 0.82)}, ${f(x0 - r * 0.52)} ${f(y1 + r * 1.25)}, ${f(x0 - r * 0.14)} ${f(y1 + r * 0.78)}`
  )
  segs.push(
    `C ${f(x0 + r * 0.15)} ${f(y1 + r * 0.4)}, ${f(x0)} ${f(y1 - c * 0.28)}, ${f(x0)} ${f(y1 - c)}`
  )

  // LEFT EDGE (with optional twin mid-edge crossing loops)
  if (hasSideFlourish && innerH >= 150) {
    const sh = Math.min(28, innerH * 0.15)
    const sd = 10
    segs.push(`L ${f(x0)} ${f(cy + sh)}`)
    segs.push(
      `C ${f(x0)} ${f(cy + sh * 0.32)}, ${f(x0 + sd * 0.85)} ${f(cy + sh * 0.2)}, ${f(x0 + sd * 0.72)} ${f(cy + sh * 0.54)}`
    )
    segs.push(
      `C ${f(x0 + sd * 0.58)} ${f(cy + sh * 0.85)}, ${f(x0 - sd * 0.75)} ${f(cy + sh * 0.42)}, ${f(x0 - sd * 0.4)} ${f(cy)}`
    )
    segs.push(
      `C ${f(x0 - sd * 0.75)} ${f(cy - sh * 0.42)}, ${f(x0 + sd * 0.58)} ${f(cy - sh * 0.85)}, ${f(x0 + sd * 0.72)} ${f(cy - sh * 0.54)}`
    )
    segs.push(
      `C ${f(x0 + sd * 0.85)} ${f(cy - sh * 0.2)}, ${f(x0)} ${f(cy - sh * 0.32)}, ${f(x0)} ${f(cy - sh)}`
    )
  }
  segs.push(`L ${f(x0)} ${f(y0 + c)}`)

  // TOP-LEFT CORNER LOOP (open calligraphic crossing loop)
  segs.push(
    `C ${f(x0)} ${f(y0 + c * 0.25)}, ${f(x0)} ${f(y0 - r * 0.45)}, ${f(x0 - r * 0.45)} ${f(y0 - r * 0.85)}`
  )
  segs.push(
    `C ${f(x0 - r * 0.82)} ${f(y0 - r * 1.15)}, ${f(x0 - r * 1.25)} ${f(y0 - r * 0.52)}, ${f(x0 - r * 0.78)} ${f(y0 - r * 0.14)}`
  )
  segs.push(
    `C ${f(x0 - r * 0.4)} ${f(y0 + r * 0.15)}, ${f(x0 + c * 0.28)} ${f(y0)}, ${f(x0 + c)} ${f(y0)} Z`
  )

  const br = scale === "button" ? 5 : 8
  const fillPath = `M ${f(x0 + br)} ${f(y0)} L ${f(x1 - br)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + br)} L ${f(x1)} ${f(y1 - br)} Q ${f(x1)} ${f(y1)} ${f(x1 - br)} ${f(y1)} L ${f(x0 + br)} ${f(y1)} Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - br)} L ${f(x0)} ${f(y0 + br)} Q ${f(x0)} ${f(y0)} ${f(x0 + br)} ${f(y0)} Z`

  return {
    fillPath,
    primaryStrokes: [segs.join(" ")],
    accentStrokes: [],
    accentFills: [],
    strokeWidth: scale === "button" ? 1.55 : 1.9,
    accentStrokeWidth: 1,
    hasTopCrest: hasTopCrest && innerW >= 220,
    hasSideFlourish: hasSideFlourish && innerH >= 150,
    hasBottomCrest: false,
  }
}

/**
 * Draft 02: "Peitschenhieb"
 * Inspired by reference sheet Row 1 Col 1 & Row 3 Col 1:
 * - Sweeping whiplash corner volutes with calligraphic ribbon thickness accents
 * - Large cards: expressive Art Nouveau wave-crest at top center & subtle swell at bottom center
 * - Small tiles / buttons: pure whiplash corner scrolls, unbroken connecting line
 */
function buildPeitschenhieb(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeFlags(opts)

  const m = scale === "button" ? 5 : 11
  const x0 = m
  const x1 = Math.max(x0 + 28, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const c =
    scale === "button"
      ? Math.min(13, innerH * 0.36, innerW * 0.16)
      : Math.min(28, innerH * 0.25, innerW * 0.18)
  const s = c * 0.36 // outward whiplash swell

  // Main outer flowing frame path (rounded organic whiplash silhouette)
  const main: string[] = []
  main.push(`M ${f(x0 + c)} ${f(y0)}`)

  // Top edge with responsive whiplash wave crest
  const showTop = hasTopCrest && innerW >= 240
  if (showTop) {
    const cw = Math.min(68, innerW * 0.22)
    const ch = Math.min(16, cw * 0.24)
    main.push(`L ${f(cx - cw)} ${f(y0)}`)
    main.push(
      `C ${f(cx - cw * 0.65)} ${f(y0)}, ${f(cx - cw * 0.48)} ${f(y0 - ch)}, ${f(cx - cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    main.push(
      `C ${f(cx - cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx - cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx)} ${f(y0 - ch * 1.25)}`
    )
    main.push(
      `C ${f(cx + cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx + cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx + cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    main.push(
      `C ${f(cx + cw * 0.48)} ${f(y0 - ch)}, ${f(cx + cw * 0.65)} ${f(y0)}, ${f(cx + cw)} ${f(y0)}`
    )
  }
  main.push(`L ${f(x1 - c)} ${f(y0)}`)

  // Top-right whiplash ear
  main.push(
    `C ${f(x1 - c * 0.35)} ${f(y0)}, ${f(x1 - c * 0.12)} ${f(y0 - s)}, ${f(x1 + s * 0.65)} ${f(y0 - s * 0.65)}`
  )
  main.push(
    `C ${f(x1 + s * 1.15)} ${f(y0 - s * 0.18)}, ${f(x1 + s * 0.7)} ${f(y0 + c * 0.42)}, ${f(x1)} ${f(y0 + c * 0.68)}`
  )
  main.push(`C ${f(x1 - s * 0.2)} ${f(y0 + c * 0.78)}, ${f(x1)} ${f(y0 + c * 0.92)}, ${f(x1)} ${f(y0 + c * 1.15)}`)

  // Right vertical rail
  main.push(`L ${f(x1)} ${f(y1 - c * 1.05)}`)

  // Bottom-right whiplash ear
  main.push(
    `C ${f(x1)} ${f(y1 - c * 0.4)}, ${f(x1 + s * 0.95)} ${f(y1 - s * 0.15)}, ${f(x1 + s * 0.55)} ${f(y1 + s * 0.6)}`
  )
  main.push(
    `C ${f(x1 + s * 0.15)} ${f(y1 + s * 1.05)}, ${f(x1 - c * 0.4)} ${f(y1 + s * 0.35)}, ${f(x1 - c)} ${f(y1)}`
  )

  // Bottom edge with optional subtle companion dip
  const showBot = hasBottomCrest && innerW >= 260
  if (showBot) {
    const bw = Math.min(48, innerW * 0.16)
    const bh = 9
    main.push(`L ${f(cx + bw)} ${f(y1)}`)
    main.push(
      `C ${f(cx + bw * 0.55)} ${f(y1)}, ${f(cx + bw * 0.35)} ${f(y1 + bh)}, ${f(cx)} ${f(y1 + bh * 0.45)}`
    )
    main.push(
      `C ${f(cx - bw * 0.35)} ${f(y1 + bh)}, ${f(cx - bw * 0.55)} ${f(y1)}, ${f(cx - bw)} ${f(y1)}`
    )
  }
  main.push(`L ${f(x0 + c)} ${f(y1)}`)

  // Bottom-left whiplash ear
  main.push(
    `C ${f(x0 + c * 0.4)} ${f(y1 + s * 0.35)}, ${f(x0 - s * 0.15)} ${f(y1 + s * 1.05)}, ${f(x0 - s * 0.55)} ${f(y1 + s * 0.6)}`
  )
  main.push(
    `C ${f(x0 - s * 0.95)} ${f(y1 - s * 0.15)}, ${f(x0)} ${f(y1 - c * 0.4)}, ${f(x0)} ${f(y1 - c * 1.05)}`
  )

  // Left vertical rail
  main.push(`L ${f(x0)} ${f(y0 + c * 1.15)}`)

  // Top-left whiplash ear
  main.push(
    `C ${f(x0)} ${f(y0 + c * 0.92)}, ${f(x0 + s * 0.2)} ${f(y0 + c * 0.78)}, ${f(x0)} ${f(y0 + c * 0.68)}`
  )
  main.push(
    `C ${f(x0 - s * 0.7)} ${f(y0 + c * 0.42)}, ${f(x0 - s * 1.15)} ${f(y0 - s * 0.18)}, ${f(x0 - s * 0.65)} ${f(y0 - s * 0.65)}`
  )
  main.push(
    `C ${f(x0 + c * 0.12)} ${f(y0 - s)}, ${f(x0 + c * 0.35)} ${f(y0)}, ${f(x0 + c)} ${f(y0)} Z`
  )

  // Inner calligraphic volute curls at all 4 corners (give lush Jugendstil motion)
  const accentStrokes: string[] = []
  const vc = c * 0.78
  // TL volute curl
  accentStrokes.push(
    `M ${f(x0 + vc * 1.25)} ${f(y0 + 3.5)} C ${f(x0 + vc * 0.45)} ${f(y0 + 3.5)}, ${f(x0 + 3.5)} ${f(y0 + vc * 0.45)}, ${f(x0 + 3.5)} ${f(y0 + vc * 1.15)}`
  )
  accentStrokes.push(
    `M ${f(x0 + vc * 0.72)} ${f(y0 + vc * 0.28)} C ${f(x0 + vc * 0.26)} ${f(y0 + vc * 0.2)}, ${f(x0 + vc * 0.18)} ${f(y0 + vc * 0.72)}, ${f(x0 + vc * 0.56)} ${f(y0 + vc * 0.68)} C ${f(x0 + vc * 0.76)} ${f(y0 + vc * 0.65)}, ${f(x0 + vc * 0.7)} ${f(y0 + vc * 0.42)}, ${f(x0 + vc * 0.5)} ${f(y0 + vc * 0.46)}`
  )
  // TR volute curl
  accentStrokes.push(
    `M ${f(x1 - vc * 1.25)} ${f(y0 + 3.5)} C ${f(x1 - vc * 0.45)} ${f(y0 + 3.5)}, ${f(x1 - 3.5)} ${f(y0 + vc * 0.45)}, ${f(x1 - 3.5)} ${f(y0 + vc * 1.15)}`
  )
  accentStrokes.push(
    `M ${f(x1 - vc * 0.72)} ${f(y0 + vc * 0.28)} C ${f(x1 - vc * 0.26)} ${f(y0 + vc * 0.2)}, ${f(x1 - vc * 0.18)} ${f(y0 + vc * 0.72)}, ${f(x1 - vc * 0.56)} ${f(y0 + vc * 0.68)} C ${f(x1 - vc * 0.76)} ${f(y0 + vc * 0.65)}, ${f(x1 - vc * 0.7)} ${f(y0 + vc * 0.42)}, ${f(x1 - vc * 0.5)} ${f(y0 + vc * 0.46)}`
  )
  // BR volute curl
  accentStrokes.push(
    `M ${f(x1 - vc * 1.1)} ${f(y1 - 3.5)} C ${f(x1 - vc * 0.4)} ${f(y1 - 3.5)}, ${f(x1 - 3.5)} ${f(y1 - vc * 0.4)}, ${f(x1 - 3.5)} ${f(y1 - vc * 0.95)}`
  )
  // BL volute curl
  accentStrokes.push(
    `M ${f(x0 + vc * 1.1)} ${f(y1 - 3.5)} C ${f(x0 + vc * 0.4)} ${f(y1 - 3.5)}, ${f(x0 + 3.5)} ${f(y1 - vc * 0.4)}, ${f(x0 + 3.5)} ${f(y1 - vc * 0.95)}`
  )

  const accentFills: string[] = []
  if (showTop) {
    const cw = Math.min(68, innerW * 0.22)
    const ch = Math.min(16, cw * 0.24)
    // Inner ribbon scroll beneath top crest
    accentStrokes.push(
      `M ${f(cx - cw * 0.52)} ${f(y0 + 3.5)} C ${f(cx - cw * 0.25)} ${f(y0 + 3.5)}, ${f(cx - cw * 0.16)} ${f(y0 - ch * 0.25)}, ${f(cx)} ${f(y0 - ch * 0.52)} C ${f(cx + cw * 0.16)} ${f(y0 - ch * 0.25)}, ${f(cx + cw * 0.25)} ${f(y0 + 3.5)}, ${f(cx + cw * 0.52)} ${f(y0 + 3.5)}`
    )
    // Small calligraphic droplet in top crest
    accentFills.push(
      `M ${f(cx)} ${f(y0 - ch * 0.96)} C ${f(cx + 3.2)} ${f(y0 - ch * 0.52)}, ${f(cx + 2.8)} ${f(y0 - ch * 0.18)}, ${f(cx)} ${f(y0 - ch * 0.12)} C ${f(cx - 2.8)} ${f(y0 - ch * 0.18)}, ${f(cx - 3.2)} ${f(y0 - ch * 0.52)}, ${f(cx)} ${f(y0 - ch * 0.96)} Z`
    )
  }

  const mainPath = main.join(" ")
  return {
    fillPath: mainPath,
    primaryStrokes: [mainPath],
    accentStrokes,
    accentFills,
    strokeWidth: scale === "button" ? 1.65 : 2.1,
    accentStrokeWidth: scale === "button" ? 1.0 : 1.25,
    hasTopCrest: showTop,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 03: "Bogen & Ranke"
 * Inspired by reference sheet Row 1 Col 2 & Row 3 Col 4 + the green Spring card:
 * - Soft arched shoulders (zero sharp 90° corners!) with fine vine tendrils & buds
 * - Large cards: top botanical bud crest + bottom fan-palmette spray
 * - Small tiles & buttons: tender curved vine shoulders & miniature corner leaves
 */
function buildBogen(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeFlags(opts)

  const m = scale === "button" ? 5 : 11
  const x0 = m
  const x1 = Math.max(x0 + 28, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const r =
    scale === "button"
      ? Math.min(14, innerH * 0.44, innerW * 0.18)
      : Math.min(34, innerH * 0.28, innerW * 0.22)
  const br = scale === "button" ? r * 0.85 : r * 0.65

  const showTop = hasTopCrest && innerW >= 240
  const showBot = hasBottomCrest && innerW >= 260

  // Smooth arched outer contour
  const contour: string[] = []
  contour.push(`M ${f(x0 + r)} ${f(y0)}`)

  if (showTop) {
    const cw = Math.min(58, innerW * 0.19)
    const ch = 13
    contour.push(`L ${f(cx - cw)} ${f(y0)}`)
    contour.push(
      `C ${f(cx - cw * 0.55)} ${f(y0)}, ${f(cx - cw * 0.28)} ${f(y0 - ch)}, ${f(cx)} ${f(y0 - ch)}`
    )
    contour.push(
      `C ${f(cx + cw * 0.28)} ${f(y0 - ch)}, ${f(cx + cw * 0.55)} ${f(y0)}, ${f(cx + cw)} ${f(y0)}`
    )
  }

  contour.push(`L ${f(x1 - r)} ${f(y0)}`)
  // Arched top-right shoulder
  contour.push(
    `C ${f(x1 - r * 0.35)} ${f(y0)}, ${f(x1)} ${f(y0 + r * 0.35)}, ${f(x1)} ${f(y0 + r)}`
  )
  contour.push(`L ${f(x1)} ${f(y1 - br)}`)
  contour.push(
    `C ${f(x1)} ${f(y1 - br * 0.35)}, ${f(x1 - br * 0.35)} ${f(y1)}, ${f(x1 - br)} ${f(y1)}`
  )
  contour.push(`L ${f(x0 + br)} ${f(y1)}`)
  contour.push(
    `C ${f(x0 + br * 0.35)} ${f(y1)}, ${f(x0)} ${f(y1 - br * 0.35)}, ${f(x0)} ${f(y1 - br)}`
  )
  contour.push(`L ${f(x0)} ${f(y0 + r)}`)
  contour.push(
    `C ${f(x0)} ${f(y0 + r * 0.35)}, ${f(x0 + r * 0.35)} ${f(y0)}, ${f(x0 + r)} ${f(y0)} Z`
  )

  const accentStrokes: string[] = []
  const accentFills: string[] = []

  // Botanical corner tendrils hugging the rounded arch corners
  const leaf = (lx: number, ly: number, dx: number, dy: number, sz: number) =>
    `M ${f(lx)} ${f(ly)} C ${f(lx + dx * sz * 0.7 - dy * sz * 0.35)} ${f(ly + dy * sz * 0.7 + dx * sz * 0.35)}, ${f(lx + dx * sz * 1.15 - dy * sz * 0.15)} ${f(ly + dy * sz * 1.15 + dx * sz * 0.15)}, ${f(lx + dx * sz * 1.25)} ${f(ly + dy * sz * 1.25)} C ${f(lx + dx * sz * 0.85 + dy * sz * 0.4)} ${f(ly + dy * sz * 0.85 - dx * sz * 0.4)}, ${f(lx + dx * sz * 0.3 + dy * sz * 0.35)} ${f(ly + dy * sz * 0.3 - dx * sz * 0.35)}, ${f(lx)} ${f(ly)} Z`

  const sz = scale === "button" ? 6.5 : 10.5
  const k = r * 0.55

  // Top-left vine curl & bud
  accentStrokes.push(
    `M ${f(x0 + r * 1.2)} ${f(y0)} C ${f(x0 + k * 0.5)} ${f(y0 - 4.5)}, ${f(x0 - 4.5)} ${f(y0 + k * 0.5)}, ${f(x0)} ${f(y0 + r * 1.2)}`
  )
  accentFills.push(leaf(x0 + k * 0.45, y0 + k * 0.45, -0.7, -0.7, sz))
  // Top-right vine curl & bud
  accentStrokes.push(
    `M ${f(x1 - r * 1.2)} ${f(y0)} C ${f(x1 - k * 0.5)} ${f(y0 - 4.5)}, ${f(x1 + 4.5)} ${f(y0 + k * 0.5)}, ${f(x1)} ${f(y0 + r * 1.2)}`
  )
  accentFills.push(leaf(x1 - k * 0.45, y0 + k * 0.45, 0.7, -0.7, sz))

  // Bottom corners delicate tendrils
  const bk = br * 0.55
  accentStrokes.push(
    `M ${f(x0 + br * 1.1)} ${f(y1)} C ${f(x0 + bk * 0.45)} ${f(y1 + 3.8)}, ${f(x0 - 3.8)} ${f(y1 - bk * 0.45)}, ${f(x0)} ${f(y1 - br * 1.1)}`
  )
  accentFills.push(leaf(x0 + bk * 0.42, y1 - bk * 0.42, -0.7, 0.7, sz * 0.82))
  accentStrokes.push(
    `M ${f(x1 - br * 1.1)} ${f(y1)} C ${f(x1 - bk * 0.45)} ${f(y1 + 3.8)}, ${f(x1 + 3.8)} ${f(y1 - bk * 0.45)}, ${f(x1)} ${f(y1 - br * 1.1)}`
  )
  accentFills.push(leaf(x1 - bk * 0.42, y1 - bk * 0.42, 0.7, 0.7, sz * 0.82))

  // Responsive top center botanical bud crown
  if (showTop) {
    accentFills.push(leaf(cx, y0 - 4, 0, -1, 10))
    accentFills.push(leaf(cx - 2, y0 - 5, -0.82, -0.52, 9))
    accentFills.push(leaf(cx + 2, y0 - 5, 0.82, -0.52, 9))
    accentStrokes.push(
      `M ${f(cx - 34)} ${f(y0 + 3)} C ${f(cx - 18)} ${f(y0 + 3)}, ${f(cx - 12)} ${f(y0 - 6)}, ${f(cx)} ${f(y0 - 6)} C ${f(cx + 12)} ${f(y0 - 6)}, ${f(cx + 18)} ${f(y0 + 3)}, ${f(cx + 34)} ${f(y0 + 3)}`
    )
  }

  // Responsive bottom center floral fan (nodding to ref Row 1 Col 2!)
  if (showBot) {
    const by = y1 + 1
    accentFills.push(leaf(cx, by - 1, 0, -1, 12))
    accentFills.push(leaf(cx - 2, by - 1, -0.55, -0.85, 11))
    accentFills.push(leaf(cx + 2, by - 1, 0.55, -0.85, 11))
    accentFills.push(leaf(cx - 5, by - 1, -0.92, -0.35, 10.5))
    accentFills.push(leaf(cx + 5, by - 1, 0.92, -0.35, 10.5))
    accentStrokes.push(
      `M ${f(cx - 42)} ${f(y1)} C ${f(cx - 24)} ${f(y1 - 9)}, ${f(cx - 12)} ${f(y1 + 5)}, ${f(cx)} ${f(y1 - 2)} C ${f(cx + 12)} ${f(y1 + 5)}, ${f(cx + 24)} ${f(y1 - 9)}, ${f(cx + 42)} ${f(y1)}`
    )
  }

  const contourPath = contour.join(" ")
  return {
    fillPath: contourPath,
    primaryStrokes: [contourPath],
    accentStrokes,
    accentFills,
    strokeWidth: scale === "button" ? 1.5 : 1.85,
    accentStrokeWidth: scale === "button" ? 1.05 : 1.35,
    hasTopCrest: showTop,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 04: "Taille"
 * Inspired by reference sheet Row 3 Col 2:
 * - Organic curved leaf-shoulders at all 4 corners
 * - When wide: symmetrical curved leaf-cleft dipping gently at top & bottom center
 * - When tall: iconic subtle inward Art Nouveau "waist pinch" at left & right center
 * - When small / button: sleek soft leaf-arched corners without waist pinch or cleft
 */
function buildTaille(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish, hasBottomCrest } = computeFlags(opts)

  const m = scale === "button" ? 5 : 10
  const x0 = m
  const x1 = Math.max(x0 + 28, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const r =
    scale === "button"
      ? Math.min(13, innerH * 0.42, innerW * 0.16)
      : Math.min(26, innerH * 0.24, innerW * 0.18)

  const showTop = hasTopCrest && innerW >= 240
  const showSide = hasSideFlourish && innerH >= 165
  const showBot = hasBottomCrest && innerW >= 260

  const dip = 10
  const pinch = 9

  const p: string[] = []
  p.push(`M ${f(x0 + r)} ${f(y0)}`)

  // Top edge (organic curved cleft when wide)
  if (showTop) {
    const cw = Math.min(82, innerW * 0.28)
    p.push(`L ${f(cx - cw)} ${f(y0)}`)
    p.push(
      `C ${f(cx - cw * 0.55)} ${f(y0 - 3)}, ${f(cx - cw * 0.22)} ${f(y0 + 2)}, ${f(cx)} ${f(y0 + dip)}`
    )
    p.push(
      `C ${f(cx + cw * 0.22)} ${f(y0 + 2)}, ${f(cx + cw * 0.55)} ${f(y0 - 3)}, ${f(cx + cw)} ${f(y0)}`
    )
  }
  p.push(`L ${f(x1 - r)} ${f(y0)}`)

  // Top-right curved leaf shoulder
  p.push(
    `C ${f(x1 - r * 0.15)} ${f(y0 - 2)}, ${f(x1 + 2)} ${f(y0 + r * 0.15)}, ${f(x1)} ${f(y0 + r)}`
  )

  // Right edge (subtle organic waist pinch when tall)
  if (showSide) {
    const sh = Math.min(36, innerH * 0.2)
    p.push(`L ${f(x1)} ${f(cy - sh)}`)
    p.push(
      `C ${f(x1)} ${f(cy - sh * 0.4)}, ${f(x1 - pinch * 0.55)} ${f(cy - sh * 0.15)}, ${f(x1 - pinch)} ${f(cy)}`
    )
    p.push(
      `C ${f(x1 - pinch * 0.55)} ${f(cy + sh * 0.15)}, ${f(x1)} ${f(cy + sh * 0.4)}, ${f(x1)} ${f(cy + sh)}`
    )
  }
  p.push(`L ${f(x1)} ${f(y1 - r)}`)

  // Bottom-right curved leaf shoulder
  p.push(
    `C ${f(x1 + 2)} ${f(y1 - r * 0.15)}, ${f(x1 - r * 0.15)} ${f(y1 + 2)}, ${f(x1 - r)} ${f(y1)}`
  )

  // Bottom edge (mirrored leaf cleft when large)
  if (showBot) {
    const cw = Math.min(82, innerW * 0.28)
    p.push(`L ${f(cx + cw)} ${f(y1)}`)
    p.push(
      `C ${f(cx + cw * 0.55)} ${f(y1 + 3)}, ${f(cx + cw * 0.22)} ${f(y1 - 2)}, ${f(cx)} ${f(y1 - dip)}`
    )
    p.push(
      `C ${f(cx - cw * 0.22)} ${f(y1 - 2)}, ${f(cx - cw * 0.55)} ${f(y1 + 3)}, ${f(cx - cw)} ${f(y1)}`
    )
  }
  p.push(`L ${f(x0 + r)} ${f(y1)}`)

  // Bottom-left curved leaf shoulder
  p.push(
    `C ${f(x0 + r * 0.15)} ${f(y1 + 2)}, ${f(x0 - 2)} ${f(y1 - r * 0.15)}, ${f(x0)} ${f(y1 - r)}`
  )

  // Left edge (subtle organic waist pinch when tall)
  if (showSide) {
    const sh = Math.min(36, innerH * 0.2)
    p.push(`L ${f(x0)} ${f(cy + sh)}`)
    p.push(
      `C ${f(x0)} ${f(cy + sh * 0.4)}, ${f(x0 + pinch * 0.55)} ${f(cy + sh * 0.15)}, ${f(x0 + pinch)} ${f(cy)}`
    )
    p.push(
      `C ${f(x0 + pinch * 0.55)} ${f(cy - sh * 0.15)}, ${f(x0)} ${f(cy - sh * 0.4)}, ${f(x0)} ${f(cy - sh)}`
    )
  }
  p.push(`L ${f(x0)} ${f(y0 + r)}`)

  // Top-left curved leaf shoulder
  p.push(
    `C ${f(x0 - 2)} ${f(y0 + r * 0.15)}, ${f(x0 + r * 0.15)} ${f(y0 - 2)}, ${f(x0 + r)} ${f(y0)} Z`
  )

  const accentStrokes: string[] = []
  const accentFills: string[] = []

  // Sweeping inner corner leaf arcs (creating the signature Jugendstil double-leaf frame)
  const k = r * 0.9
  // TL
  accentStrokes.push(
    `M ${f(x0 + k * 1.15)} ${f(y0 + 3.5)} C ${f(x0 + k * 0.4)} ${f(y0 + 3.5)}, ${f(x0 + 3.5)} ${f(y0 + k * 0.4)}, ${f(x0 + 3.5)} ${f(y0 + k * 1.15)}`
  )
  // TR
  accentStrokes.push(
    `M ${f(x1 - k * 1.15)} ${f(y0 + 3.5)} C ${f(x1 - k * 0.4)} ${f(y0 + 3.5)}, ${f(x1 - 3.5)} ${f(y0 + k * 0.4)}, ${f(x1 - 3.5)} ${f(y0 + k * 1.15)}`
  )
  // BR
  accentStrokes.push(
    `M ${f(x1 - k * 1.15)} ${f(y1 - 3.5)} C ${f(x1 - k * 0.4)} ${f(y1 - 3.5)}, ${f(x1 - 3.5)} ${f(y1 - k * 0.4)}, ${f(x1 - 3.5)} ${f(y1 - k * 1.15)}`
  )
  // BL
  accentStrokes.push(
    `M ${f(x0 + k * 1.15)} ${f(y1 - 3.5)} C ${f(x0 + k * 0.4)} ${f(y1 - 3.5)}, ${f(x0 + 3.5)} ${f(y1 - k * 0.4)}, ${f(x0 + 3.5)} ${f(y1 - k * 1.15)}`
  )

  // Sweeping paired top-center leaves (like Ref Row 3 Col 2)
  if (showTop) {
    const lw = Math.min(62, innerW * 0.2)
    accentStrokes.push(
      `M ${f(cx - lw)} ${f(y0 + 1)} C ${f(cx - lw * 0.55)} ${f(y0 - 9)}, ${f(cx - lw * 0.16)} ${f(y0 - 6)}, ${f(cx)} ${f(y0 + dip * 0.5)}`
    )
    accentStrokes.push(
      `M ${f(cx + lw)} ${f(y0 + 1)} C ${f(cx + lw * 0.55)} ${f(y0 - 9)}, ${f(cx + lw * 0.16)} ${f(y0 - 6)}, ${f(cx)} ${f(y0 + dip * 0.5)}`
    )
    accentFills.push(
      `M ${f(cx - 2)} ${f(y0 + 2)} C ${f(cx - lw * 0.34)} ${f(y0 - 7)}, ${f(cx - lw * 0.56)} ${f(y0 - 3)}, ${f(cx - lw * 0.72)} ${f(y0 + 1)} C ${f(cx - lw * 0.4)} ${f(y0 + 2)}, ${f(cx - lw * 0.18)} ${f(y0 + 5)}, ${f(cx - 2)} ${f(y0 + 2)} Z`
    )
    accentFills.push(
      `M ${f(cx + 2)} ${f(y0 + 2)} C ${f(cx + lw * 0.34)} ${f(y0 - 7)}, ${f(cx + lw * 0.56)} ${f(y0 - 3)}, ${f(cx + lw * 0.72)} ${f(y0 + 1)} C ${f(cx + lw * 0.4)} ${f(y0 + 2)}, ${f(cx + lw * 0.18)} ${f(y0 + 5)}, ${f(cx + 2)} ${f(y0 + 2)} Z`
    )
  }

  if (showBot) {
    const lw = Math.min(54, innerW * 0.18)
    accentStrokes.push(
      `M ${f(cx - lw)} ${f(y1 - 1)} C ${f(cx - lw * 0.5)} ${f(y1 + 8)}, ${f(cx - lw * 0.15)} ${f(y1 + 5)}, ${f(cx)} ${f(y1 - dip * 0.45)}`
    )
    accentStrokes.push(
      `M ${f(cx + lw)} ${f(y1 - 1)} C ${f(cx + lw * 0.5)} ${f(y1 + 8)}, ${f(cx + lw * 0.15)} ${f(y1 + 5)}, ${f(cx)} ${f(y1 - dip * 0.45)}`
    )
  }

  const mainPath = p.join(" ")
  return {
    fillPath: mainPath,
    primaryStrokes: [mainPath],
    accentStrokes,
    accentFills,
    strokeWidth: scale === "button" ? 1.6 : 1.95,
    accentStrokeWidth: scale === "button" ? 1.0 : 1.25,
    hasTopCrest: showTop,
    hasSideFlourish: showSide,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 05: "Filigran"
 * Inspired by reference sheet Row 2 Col 4:
 * - Ultra-clean fine single-line frame with delicate coiled spiral corners
 * - Large cards: airy feathered arch crest on top + subtle paired scroll foot bar on bottom
 * - Small tiles & buttons: crisp minimal spiral corners, ultra-legible at compact sizes
 */
function buildFiligran(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeFlags(opts)

  const m = scale === "button" ? 5 : 10
  const x0 = m
  const x1 = Math.max(x0 + 26, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 20, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const c =
    scale === "button"
      ? Math.min(10, innerH * 0.3, innerW * 0.12)
      : Math.min(18, innerH * 0.2, innerW * 0.14)

  const showTop = hasTopCrest && innerW >= 220
  const showBot = hasBottomCrest && innerW >= 260

  const main: string[] = []
  main.push(`M ${f(x0 + c)} ${f(y0)}`)

  // Delicate top-center scalloped crest
  if (showTop) {
    const cw = Math.min(48, innerW * 0.16)
    const ch = 10
    main.push(`L ${f(cx - cw)} ${f(y0)}`)
    main.push(
      `C ${f(cx - cw * 0.55)} ${f(y0)}, ${f(cx - cw * 0.35)} ${f(y0 - ch * 0.65)}, ${f(cx - cw * 0.18)} ${f(y0 - ch * 0.35)}`
    )
    main.push(
      `C ${f(cx - cw * 0.08)} ${f(y0 - ch * 0.95)}, ${f(cx + cw * 0.08)} ${f(y0 - ch * 0.95)}, ${f(cx + cw * 0.18)} ${f(y0 - ch * 0.35)}`
    )
    main.push(
      `C ${f(cx + cw * 0.35)} ${f(y0 - ch * 0.65)}, ${f(cx + cw * 0.55)} ${f(y0)}, ${f(cx + cw)} ${f(y0)}`
    )
  }

  main.push(`L ${f(x1 - c)} ${f(y0)}`)
  // Softly curved corners (inner contour)
  main.push(`Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + c)}`)
  main.push(`L ${f(x1)} ${f(y1 - c)}`)
  main.push(`Q ${f(x1)} ${f(y1)} ${f(x1 - c)} ${f(y1)}`)
  main.push(`L ${f(x0 + c)} ${f(y1)}`)
  main.push(`Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - c)}`)
  main.push(`L ${f(x0)} ${f(y0 + c)}`)
  main.push(`Q ${f(x0)} ${f(y0)} ${f(x0 + c)} ${f(y0)} Z`)

  // Corner spiral curls (seamless continuation from each corner)
  const sp = c * 0.72
  const spiral = (sx: number, sy: number, dx: number, dy: number) =>
    `M ${f(sx + dx * sp * 1.45)} ${f(sy)} C ${f(sx + dx * sp * 0.45)} ${f(sy)}, ${f(sx - dx * sp * 0.38)} ${f(sy - dy * sp * 0.38)}, ${f(sx - dx * sp * 0.25)} ${f(sy - dy * sp * 0.02)} C ${f(sx - dx * sp * 0.12)} ${f(sy + dy * sp * 0.32)}, ${f(sx + dx * sp * 0.38)} ${f(sy + dy * sp * 0.38)}, ${f(sx + dx * sp * 0.42)} ${f(sy + dy * sp * 0.12)} C ${f(sx + dx * sp * 0.44)} ${f(sy - dy * sp * 0.08)}, ${f(sx + dx * sp * 0.15)} ${f(sy - dy * sp * 0.12)}, ${f(sx + dx * sp * 0.12)} ${f(sy + dy * sp * 0.08)}`

  const accentStrokes: string[] = [
    // 4 coiled corner spirals
    spiral(x0, y0, 1, 1),
    spiral(x1, y0, -1, 1),
    spiral(x1, y1, -1, -1),
    spiral(x0, y1, 1, -1),
  ]

  // Subtle vertical companion spiral arms for cards/tiles
  if (scale !== "button") {
    const a = c * 0.85
    accentStrokes.push(
      `M ${f(x0)} ${f(y0 + a * 1.6)} C ${f(x0 - 3.5)} ${f(y0 + a * 0.9)}, ${f(x0 + 3.5)} ${f(y0 + a * 0.45)}, ${f(x0 + a * 0.5)} ${f(y0 + a * 0.35)}`
    )
    accentStrokes.push(
      `M ${f(x1)} ${f(y0 + a * 1.6)} C ${f(x1 + 3.5)} ${f(y0 + a * 0.9)}, ${f(x1 - 3.5)} ${f(y0 + a * 0.45)}, ${f(x1 - a * 0.5)} ${f(y0 + a * 0.35)}`
    )
  }

  // Subtle foot-bar flourish at bottom of tall/wide cards (like Ref Row 2 Col 4)
  if (showBot) {
    const bw = Math.min(72, innerW * 0.25)
    accentStrokes.push(
      `M ${f(cx - bw)} ${f(y1 - 4.5)} L ${f(cx + bw)} ${f(y1 - 4.5)}`
    )
    accentStrokes.push(
      `M ${f(cx - bw)} ${f(y1 - 4.5)} C ${f(cx - bw - 8)} ${f(y1 - 4.5)}, ${f(cx - bw - 8)} ${f(y1 + 2.5)}, ${f(cx - bw - 2)} ${f(y1 + 2.5)}`
    )
    accentStrokes.push(
      `M ${f(cx + bw)} ${f(y1 - 4.5)} C ${f(cx + bw + 8)} ${f(y1 - 4.5)}, ${f(cx + bw + 8)} ${f(y1 + 2.5)}, ${f(cx + bw + 2)} ${f(y1 + 2.5)}`
    )
  }

  const accentFills: string[] = []
  if (showTop) {
    // Tiny diamond seed finial above the scalloped crest
    accentFills.push(
      `M ${f(cx)} ${f(y0 - 15)} L ${f(cx + 2.6)} ${f(y0 - 11.5)} L ${f(cx)} ${f(y0 - 8)} L ${f(cx - 2.6)} ${f(y0 - 11.5)} Z`
    )
  }

  const mainPath = main.join(" ")
  return {
    fillPath: mainPath,
    primaryStrokes: [mainPath],
    accentStrokes,
    accentFills,
    strokeWidth: scale === "button" ? 1.35 : 1.5,
    accentStrokeWidth: scale === "button" ? 1.15 : 1.35,
    hasTopCrest: showTop,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}

export function buildDraftFramePaths(
  style: DraftStyleId,
  opts: FrameBuildOptions
): FramePaths {
  switch (style) {
    case "asym_synthese":
      return buildAsymmetrischeSynthese(opts)
    case "offene_iris":
      return buildOffeneIrisAsymmetrie(opts)
    case "synthese_iris":
      return buildSyntheseIris(opts)
    case "kaskade":
      return buildBluetenKaskade(opts)
    case "mucha_portal":
      return buildMuchaPortal(opts)
    case "freesie":
      return buildFreesienRanke(opts)
    case "torbogen":
      return buildJugendTorbogen(opts)
    case "offener_kranz":
      return buildOffenerKranz(opts)
    case "synthese":
      return buildSynthese(opts)
    case "kathedrale":
      return buildKathedrale(opts)
    case "seerose":
      return buildSeerose(opts)
    case "iris":
      return buildIris(opts)
    case "libelle":
      return buildLibelle(opts)
    case "halo":
      return buildHalo(opts)
    case "welle":
      return buildWelle(opts)
    case "schleife":
      return buildSchleife(opts)
    case "peitschenhieb":
      return buildPeitschenhieb(opts)
    case "bogen":
      return buildBogen(opts)
    case "taille":
      return buildTaille(opts)
    case "filigran":
      return buildFiligran(opts)
  }
}
