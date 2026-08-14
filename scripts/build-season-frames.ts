// Generate season-themed SVG frames by recoloring the autumn originals.
//
// Usage: bun scripts/build-season-frames.ts <season>
//
// The script expects public/<season>/ to be the destination and looks
// up palette + comment renames from the table below. Add a new season
// by adding an entry to the SEASONS map.

import * as fs from "node:fs"
import * as path from "node:path"

type SeasonConfig = {
  bottomTier: Record<string, string> // lightest cream → bg
  lightTier: Record<string, string>  // light tan → inner panel
  midTier: Record<string, string>    // mid brown → primary
  darkTier: Record<string, string>   // dark brown → accent
  midStrokeTier: Record<string, string>
  darkStrokeTier: Record<string, string>
}

const SEASONS: Record<string, SeasonConfig> = {
  spring: {
    bottomTier: {
      "#FFF7EA": "#F0F9EC",
      "#FEF5E6": "#F0F9EC",
      "#FEF4E8": "#F0F9EC",
      "#FBF3E3": "#F0F9EC",
      "#FDF3DE": "#F0F9EC",
      "#F5E8D2": "#F0F9EC",
    },
    lightTier: {
      "#EEE1CA": "#E5F1DC",
      "#E8DCC8": "#E5F1DC",
      "#D2BA8C": "#E5F1DC",
      "#CDB78B": "#E5F1DC",
    },
    midTier: {
      "#DEB13D": "#8FBF5C",
      "#E3B648": "#8FBF5C",
      "#D4A53F": "#8FBF5C",
      "#CE9E3A": "#8FBF5C",
      "#C9993C": "#8FBF5C",
      "#C99D57": "#8FBF5C",
      "#C19431": "#8FBF5C",
      "#C48E30": "#8FBF5C",
      "#B89162": "#8FBF5C",
      "#B67F30": "#8FBF5C",
      "#B17E32": "#8FBF5C",
      "#B18741": "#8FBF5C",
      "#AE8746": "#8FBF5C",
      "#A66F29": "#8FBF5C",
      "#9F7931": "#8FBF5C",
      "#987042": "#8FBF5C",
    },
    darkTier: {
      "#965E1C": "#5A7D3A",
      "#935D17": "#5A7D3A",
      "#935624": "#5A7D3A",
      "#935517": "#5A7D3A",
      "#846537": "#5A7D3A",
      "#816232": "#5A7D3A",
      "#7D4418": "#5A7D3A",
      "#794718": "#5A7D3A",
      "#743E16": "#5A7D3A",
    },
    midStrokeTier: {
      "#6D511B": "#4A6B2E",
      "#6A502E": "#4A6B2E",
      "#6A4A1E": "#4A6B2E",
      "#6A4821": "#4A6B2E",
      "#684F28": "#4A6B2E",
      "#603913": "#4A6B2E",
    },
    darkStrokeTier: {
      "#473418": "#3D5425",
    },
  },
  summer: {
    bottomTier: {
      "#FFF7EA": "#FFFEF5",
      "#FEF5E6": "#FFFEF5",
      "#FEF4E8": "#FFFEF5",
      "#FBF3E3": "#FFFEF5",
      "#FDF3DE": "#FFFEF5",
      "#F5E8D2": "#FFFEF5",
    },
    lightTier: {
      "#EEE1CA": "#FEF6D2",
      "#E8DCC8": "#FEF6D2",
      "#D2BA8C": "#FEF6D2",
      "#CDB78B": "#FEF6D2",
    },
    midTier: {
      "#DEB13D": "#F7C843",
      "#E3B648": "#F7C843",
      "#D4A53F": "#F7C843",
      "#CE9E3A": "#F7C843",
      "#C9993C": "#F7C843",
      "#C99D57": "#F7C843",
      "#C19431": "#F7C843",
      "#C48E30": "#F7C843",
      "#B89162": "#F7C843",
      "#B67F30": "#F7C843",
      "#B17E32": "#F7C843",
      "#B18741": "#F7C843",
      "#AE8746": "#F7C843",
      "#A66F29": "#F7C843",
      "#9F7931": "#F7C843",
      "#987042": "#F7C843",
    },
    darkTier: {
      "#965E1C": "#C28E1C",
      "#935D17": "#C28E1C",
      "#935624": "#C28E1C",
      "#935517": "#C28E1C",
      "#846537": "#C28E1C",
      "#816232": "#C28E1C",
      "#7D4418": "#C28E1C",
      "#794718": "#C28E1C",
      "#743E16": "#C28E1C",
    },
    midStrokeTier: {
      "#6D511B": "#8B5F0A",
      "#6A502E": "#8B5F0A",
      "#6A4A1E": "#8B5F0A",
      "#6A4821": "#8B5F0A",
      "#684F28": "#8B5F0A",
      "#603913": "#8B5F0A",
    },
    darkStrokeTier: {
      "#473418": "#3F2A04",
    },
  },
}

const STEMS = ["button-frame-1", "card-frame", "skeleton-frame", "separator"] as const

function makeRecolor(season: string) {
  const cfg = SEASONS[season]
  if (!cfg) {
    throw new Error(
      `Unknown season: ${season}. Known: ${Object.keys(SEASONS).join(", ")}`
    )
  }
  // Order: bottom (lightest) first so longer/more specific hex wins on overlap.
  const map: Record<string, string> = {
    ...cfg.bottomTier,
    ...cfg.lightTier,
    ...cfg.midTier,
    ...cfg.darkTier,
    ...cfg.midStrokeTier,
    ...cfg.darkStrokeTier,
  }

  const commentRenames: Array<[string, string]> = [
    ["Jugendstil autumn", `Jugendstil ${season}`],
    ["autumn skeleton frame", `${season} skeleton frame`],
    ["autumn leaf", `${season} leaf`],
    ["large autumn leaf", "large leaf"],
    ["autumn berry", `${season} berry`],
    ["autumn berry leaves", "sprouting leaves"],
    ["autumn kid", `${season} bud`],
    ["autumn kid leaves", "sprouting leaves"],
    ["autumn turn", `${season} bloom`],
    ["autumn turn swirl", `${season} bloom swirl`],
    ["autumn ornaments", `${season} ornaments`],
    ["autumn corner motif", `${season} corner motif`],
    ["autumn style", `${season} style`],
    ["autumn rule", `${season} rule`],
    ["autumn frame", `${season} frame`],
    ["autumn leaves vines", `${season} fresh growth`],
    ["autumn fall", `${season} bloom`],
    ["autumn curtain", `${season} curtain`],
    ["autumn charcoal", `${season} fern`],
    ["autumn ink", `${season} ink`],
    ["autumn-derived", `${season}-derived`],
    ["autumn/", `${season}/`],
    ["/autumn", `/${season}`],
    ["-autumn", `-${season}`],
    ["autumn", season],
  ]

  return (svg: string): string => {
    let out = svg
    for (const [from, to] of Object.entries(map)) {
      out = out.split(from).join(to)
      out = out.split(from.toLowerCase()).join(to)
    }
    for (const [from, to] of commentRenames) {
      out = out.split(from).join(to)
    }
    return out
  }
}

function main() {
  const season = process.argv[2]
  if (!season) {
    console.error(`Usage: bun scripts/build-season-frames.ts <season>`)
    console.error(`Known seasons: ${Object.keys(SEASONS).join(", ")}`)
    process.exit(1)
  }

  const recolor = makeRecolor(season)
  const srcDir = "public/autumn"
  const dstDir = `public/${season}`
  fs.mkdirSync(dstDir, { recursive: true })

  for (const stem of STEMS) {
    const inPath = path.join(srcDir, `${stem}.svg`)
    const outPath = path.join(dstDir, `${stem}.svg`)
    const original = fs.readFileSync(inPath, "utf8")
    const recolored = recolor(original)
    fs.writeFileSync(outPath, recolored, "utf8")
    console.log(`✓ ${inPath} → ${outPath}`)
  }

  console.log(`\nDone — ${season} SVG frames generated.`)
}

main()
