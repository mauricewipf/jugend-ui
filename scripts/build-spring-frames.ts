// Generate spring-themed SVG frames by recoloring the autumn versions
// to match the spring palette used in public/spring/card-teaser.svg.
//
// Spring palette (lightness-ordered):
//   #F0F9EC  light mint (backgrounds, lightest fills)
//   #E5F1DC  slightly darker mint (inner parchment analog for skeleton-frame)
//   #8FBF5C  mid green (mid-tone fills)
//   #5A7D3A  dark green (mid-tone accents)
//   #4A6B2E  mid-dark stroke
//   #3D5425  darkest stroke
//
// Mapping is by lightness tier to preserve the visual hierarchy of the
// autumn originals (light bg, mid fill, dark stroke).

import * as fs from "node:fs"
import * as path from "node:path"

// Lightness tiers — order matters: longer hex first to avoid prefix collisions.
// Tier 1 (lightest): parchment-like backgrounds
// Tier 2 (light):   tan/cream fills
// Tier 3 (mid):     warm browns
// Tier 4 (dark):    deep browns
// Tier 5 (darkest): near-black strokes
const map = {
  // Tier 1 → light mint
  "#FFF7EA": "#F0F9EC",
  "#FEF5E6": "#F0F9EC",
  "#FEF4E8": "#F0F9EC",
  "#FBF3E3": "#F0F9EC",
  "#FDF3DE": "#F0F9EC",
  "#F5E8D2": "#F0F9EC",

  // Tier 2 → mid-light green
  "#EEE1CA": "#E5F1DC",
  "#E8DCC8": "#E5F1DC",
  "#D2BA8C": "#E5F1DC",
  "#CDB78B": "#E5F1DC",

  // Tier 3 → mid green
  "#DEB13D": "#8FBF5C",
  "#E3B648": "#8FBF5C",
  "#D4A53F": "#8FBF5C",
  "#CE9E3A": "#8FBF5C",
  "#C9993C": "#8FBF5C",
  "#C99D57": "#8FBF5C",
  "#C19431": "#8FBF5C",
  "#C48E30": "#8FBF5C",
  "#B67F30": "#8FBF5C",
  "#B89162": "#8FBF5C",
  "#B17E32": "#8FBF5C",
  "#B18741": "#8FBF5C",
  "#AE8746": "#8FBF5C",
  "#A66F29": "#8FBF5C",
  "#9F7931": "#8FBF5C",
  "#987042": "#8FBF5C",

  // Tier 4 → dark green
  "#965E1C": "#5A7D3A",
  "#935D17": "#5A7D3A",
  "#935624": "#5A7D3A",
  "#935517": "#5A7D3A",
  "#846537": "#5A7D3A",
  "#816232": "#5A7D3A",
  "#7D4418": "#5A7D3A",
  "#794718": "#5A7D3A",
  "#743E16": "#5A7D3A",

  // Tier 5 (strokes) → darkest spring stroke
  "#6D511B": "#4A6B2E",
  "#6A502E": "#4A6B2E",
  "#6A4A1E": "#4A6B2E",
  "#6A4821": "#4A6B2E",
  "#684F28": "#4A6B2E",
  "#603913": "#4A6B2E",
  "#473418": "#3D5425",
}

const autumnDir = "public/autumn"
const springDir = "public/spring"

const stemToSuffix = {
  "button-frame-1": "button-frame-1",
  "card-frame": "card-frame",
  "skeleton-frame": "skeleton-frame",
  "separator": "separator",
}

const commentRenames = [
  ["Jugendstil autumn", "Jugendstil spring"],
  ["autumn skeleton frame", "spring skeleton frame"],
  ["autumn leaf", "spring leaf"],
  ["autumn leaves", "fresh leaves"],
  ["large autumn leaf", "large leaf"],
  ["autumn berry", "spring berry"],
  ["autumn berry leaves", "sprouting leaves"],
  ["autumn kid", "spring bud"],
  ["autumn kid leaves", "sprouting leaves"],
  ["autumn turn", "spring bloom"],
  ["autumn turn swirl", "spring bloom swirl"],
  ["autumn ornaments", "spring ornaments"],
  ["autumn corner motif", "spring corner motif"],
  ["autumn style", "spring style"],
  ["autumn rule", "spring rule"],
  ["autumn frame", "spring frame"],
  ["autumn leaves vines", "spring fresh growth"],
  ["autumn fall", "spring bloom"],
  ["autumn curtain", "spring curtain"],
  ["autumn charcoal", "spring fern"],
  ["autumn ink", "spring ink"],
  ["autumn-derived", "spring-derived"],
  ["autumn/", "spring/"],
  ["/autumn", "/spring"],
  ["-autumn", "-spring"],
  ["autumn", "spring"],
]

function recolor(svg: string): string {
  let out = svg
  for (const [from, to] of Object.entries(map)) {
    // case-insensitive replace
    out = out.split(from).join(to)
    out = out.split(from.toLowerCase()).join(to)
  }
  for (const [from, to] of commentRenames) {
    out = out.split(from).join(to)
  }
  return out
}

fs.mkdirSync(springDir, { recursive: true })

for (const [src, dst] of Object.entries(stemToSuffix)) {
  const inPath = path.join(autumnDir, `${src}.svg`)
  const outPath = path.join(springDir, `${dst}.svg`)
  const original = fs.readFileSync(inPath, "utf8")
  const recolored = recolor(original)
  fs.writeFileSync(outPath, recolored, "utf8")
  console.log(`✓ ${inPath} → ${outPath}`)
}

console.log("\nDone — spring SVG frames generated.")
