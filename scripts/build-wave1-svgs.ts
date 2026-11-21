/**
 * Build Wave 1 Jugendstil & Vienna Secession SVG frames across all 4 seasons.
 *
 * Incorporates Wave 1 incremental review refinements from both
 * "ui/ux designer" and "art-nouveau architect":
 * - Preserves original seasonal motifs (e.g., Winter snowflakes) when duplicating card-frame.svg
 * - Salon Passe-Partout lunette spandrel & Moser mitered ticks (no coupon dasharray) on card-frame-v2.svg
 * - Strictly modular Hoffmann Quadratstil check squares & orthogonal Wagner brackets on Secession frames
 * - Continuous stadium hairline (no vertical crease) on heading-frame-1.svg
 * - Expanded inner rail clearance + seasonal frost/botanical accents on button-frame-v2.svg
 * - Richer corner sprays + seasonalCluster on menu-frame-1.svg and separator-v2.svg
 * - Transparent center cutout option for skeleton frames so ::before sits crisp above ::after pulse
 */

import * as fs from "node:fs"
import * as path from "node:path"

export type SeasonName = "autumn" | "spring" | "summer" | "winter"

export type Palette = {
  season: SeasonName
  ground: string       // Primary parchment / center fill
  groundAlt: string    // Deeper inner mat / tint
  band: string         // Mid metallic / seasonal frame band
  bandLight: string    // Highlight gold / light botanical fill
  bandDark: string     // Deep accent / berry / shadow gold
  ink: string          // Primary outer dark stroke
  inkSoft: string      // Secondary inner hairline stroke
  ctaFillStart: string // High-emphasis button fill start
  ctaFillEnd: string   // High-emphasis button fill end
}

export const PALETTES: Record<SeasonName, Palette> = {
  autumn: {
    season: "autumn",
    ground: "#FBF3E3",
    groundAlt: "#F0DFBE",
    band: "#AE8746",
    bandLight: "#D6AC54",
    bandDark: "#7D491A",
    ink: "#473418",
    inkSoft: "#684F28",
    ctaFillStart: "#CFA044",
    ctaFillEnd: "#B0802E",
  },
  spring: {
    season: "spring",
    ground: "#F0F9EC",
    groundAlt: "#DFEFD4",
    band: "#78AA48",
    bandLight: "#A3CF72",
    bandDark: "#4B6E2C",
    ink: "#2F441B",
    inkSoft: "#4A6B2E",
    ctaFillStart: "#92C45E",
    ctaFillEnd: "#70A240",
  },
  summer: {
    season: "summer",
    ground: "#FFFEF5",
    groundAlt: "#FBF0BE",
    band: "#E0A822",
    bandLight: "#F7C843",
    bandDark: "#A87410",
    ink: "#3F2A04",
    inkSoft: "#8B5F0A",
    ctaFillStart: "#F5C43D",
    ctaFillEnd: "#D49B1A",
  },
  winter: {
    season: "winter",
    ground: "#F2F8FC",
    groundAlt: "#DCEBF6",
    band: "#7BA7CC",
    bandLight: "#A9CDE8",
    bandDark: "#34597D",
    ink: "#1F3A56",
    inkSoft: "#34597D",
    ctaFillStart: "#94BCE0",
    ctaFillEnd: "#6A9BC2",
  },
}

export const SEASONS: SeasonName[] = ["autumn", "spring", "summer", "winter"]

export function recolorFromAutumn(svg: string, p: Palette): string {
  if (p.season === "autumn") return svg
  const replacements: Array<[string, string]> = [
    ["#FFF7EA", p.ground],
    ["#FEF5E6", p.ground],
    ["#FEF4E8", p.ground],
    ["#FBF3E3", p.ground],
    ["#FDF3DE", p.ground],
    ["#FDF6E9", p.ground],
    ["#F5E8D2", p.groundAlt],
    ["#F2E4C9", p.groundAlt],
    ["#F0DFBE", p.groundAlt],
    ["#EEE1CA", p.groundAlt],
    ["#E8DCC8", p.groundAlt],
    ["#D2BA8C", p.groundAlt],
    ["#CDB78B", p.groundAlt],
    ["#DEB13D", p.bandLight],
    ["#E3B648", p.bandLight],
    ["#D6AC54", p.bandLight],
    ["#D4A53F", p.bandLight],
    ["#CE9E3A", p.band],
    ["#C9993C", p.band],
    ["#C99D57", p.bandLight],
    ["#C19431", p.band],
    ["#C48E30", p.band],
    ["#B89162", p.band],
    ["#B67F30", p.band],
    ["#B17E32", p.band],
    ["#B18741", p.band],
    ["#AE8746", p.band],
    ["#A66F29", p.bandDark],
    ["#9F7931", p.band],
    ["#987042", p.band],
    ["#965E1C", p.bandDark],
    ["#935D17", p.bandDark],
    ["#935624", p.bandDark],
    ["#935517", p.bandDark],
    ["#846537", p.bandDark],
    ["#816232", p.bandDark],
    ["#7D491A", p.bandDark],
    ["#7D4418", p.bandDark],
    ["#794718", p.bandDark],
    ["#743E16", p.bandDark],
    ["#6D511B", p.inkSoft],
    ["#6A502E", p.inkSoft],
    ["#6A4A1E", p.inkSoft],
    ["#6A4821", p.inkSoft],
    ["#684F28", p.inkSoft],
    ["#603913", p.ink],
    ["#473418", p.ink],
  ]
  let out = svg
  for (const [from, to] of replacements) {
    out = out.split(from).join(to)
    out = out.split(from.toLowerCase()).join(to)
  }
  return out
}

export function seasonalCluster(p: Palette, cx: number, cy: number, scale = 1): string {
  switch (p.season) {
    case "autumn":
      return `<g transform="translate(${cx} ${cy}) scale(${scale})">
        <circle cx="0" cy="0" r="1.8" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.35"/>
        <circle cx="3.2" cy="2.2" r="1.35" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.35"/>
        <circle cx="-2.4" cy="2.8" r="1.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.35"/>
      </g>`
    case "spring":
      return `<g transform="translate(${cx} ${cy}) scale(${scale})">
        <path d="M0 -2.6 C1.8 -1.2 1.8 1.4 0 2.8 C-1.8 1.4 -1.8 -1.2 0 -2.6Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
        <path d="M2.6 0.2 C4.2 -0.6 4.8 1.2 3.2 2.4 C1.8 2.2 1.6 1 2.6 0.2Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.35"/>
        <circle cx="-2.2" cy="2.2" r="1.1" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.35"/>
      </g>`
    case "summer":
      return `<g transform="translate(${cx} ${cy}) scale(${scale})">
        <circle cx="0" cy="0" r="2.1" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
        <circle cx="0" cy="0" r="0.85" fill="${p.bandDark}"/>
        <circle cx="3.4" cy="1.8" r="1.15" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.35"/>
        <circle cx="-1.8" cy="3.2" r="1.15" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.35"/>
      </g>`
    case "winter":
      return `<g transform="translate(${cx} ${cy}) scale(${scale})" stroke="${p.ink}" stroke-linecap="round">
        <path d="M0 -3.2V3.2M-2.8 -1.6L2.8 1.6M2.8 -1.6L-2.8 1.6" stroke-width="0.55"/>
        <circle cx="0" cy="0" r="1.1" fill="${p.ground}" stroke-width="0.4"/>
        <circle cx="3.3" cy="2.3" r="0.95" fill="${p.bandLight}" stroke-width="0.35"/>
      </g>`
    default: {
      const _exhaustive: never = p.season
      return _exhaustive
    }
  }
}

/**
 * 1. Duplicate public/autumn/button-frame-2.svg -> public/<season>/button-frame-v2.svg
 *    Expanded inner rail (y=14..113) for generous label clearance + seasonal frost/botanical gems.
 */
function buildButtonFrameV2(p: Palette): string {
  const baseSvg = fs.readFileSync(
    path.join(process.cwd(), "public/autumn/button-frame-2.svg"),
    "utf8"
  )
  const recolored = recolorFromAutumn(baseSvg, p)
  const winterCrystals =
    p.season === "winter"
      ? `<g stroke="${p.ink}" stroke-width="0.55" stroke-linecap="round">
          <path d="M22 25v6m-2.6-4.5 5.2 3m0-3-5.2 3"/>
          <path d="M178 25v6m-2.6-4.5 5.2 3m0-3-5.2 3"/>
          <path d="M22 96v6m-2.6-4.5 5.2 3m0-3-5.2 3"/>
          <path d="M178 96v6m-2.6-4.5 5.2 3m0-3-5.2 3"/>
        </g>`
      : ""
  const overlay = `
  <!-- Duplicated & enhanced v2 outer-cleared salon rail (y=14..113) and seasonal cabochons -->
  <rect x="35" y="14.5" width="130" height="98" rx="8" fill="none" stroke="${p.band}" stroke-width="0.7" stroke-opacity="0.9"/>
  <circle cx="38" cy="17.5" r="1.7" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  <circle cx="162" cy="17.5" r="1.7" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  <circle cx="38" cy="109.5" r="1.7" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  <circle cx="162" cy="109.5" r="1.7" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  ${winterCrystals}
</svg>`
  return recolored.replace("</svg>", overlay)
}

/**
 * 2. Duplicate public/<season>/card-frame.svg -> public/<season>/card-frame-v2.svg
 *    Reads each season's authentic card-frame.svg (preserving Winter snowflakes!) and adds
 *    an Alphonse Mucha / Ver Sacrum Salon Passe-Partout shaded mat with concave arched corner
 *    lunette spandrels and Moser mitered cross-ticks (no dashed coupon line!).
 */
function buildCardFrameV2(p: Palette): string {
  const seasonalOriginal = fs.readFileSync(
    path.join(process.cwd(), `public/${p.season}/card-frame.svg`),
    "utf8"
  )
  // viewBox is 0 0 147.4 211; slice is y=50, x=58.
  // Add shaded passe-partout mat band + concave corner lunette spandrels + double bevel hairlines.
  const overlay = `
  <!-- Salon Passe-Partout shaded mat band, arched corner spandrels & Moser mitered ticks -->
  <path d="M17 19 H130.4 V192 H17 Z M22.5 24.5 V186.5 H124.9 V24.5 Z" fill="${p.groundAlt}" fill-rule="evenodd" opacity="0.88"/>
  <rect x="17" y="19" width="113.4" height="173" fill="none" stroke="${p.band}" stroke-width="0.8"/>
  <rect x="22.5" y="24.5" width="102.4" height="162" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <!-- Moser Ver Sacrum mitered corner over-extensions -->
  <g stroke="${p.ink}" stroke-width="0.55" stroke-linecap="round">
    <path d="M20 24.5 H26.5 M22.5 22 V28.5"/>
    <path d="M120.9 24.5 H127.4 M124.9 22 V28.5"/>
    <path d="M20 186.5 H26.5 M22.5 182.5 V189"/>
    <path d="M120.9 186.5 H127.4 M124.9 182.5 V189"/>
  </g>
  <!-- Mucha-inspired arched corner spandrels -->
  <path d="M22.5 41 C22.5 31 31 24.5 41 24.5 H22.5 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.55"/>
  <path d="M124.9 41 C124.9 31 116.4 24.5 106.4 24.5 H124.9 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.55"/>
  <path d="M22.5 170 C22.5 180 31 186.5 41 186.5 H22.5 Z" fill="${p.bandLight}" fill-opacity="0.35" stroke="${p.band}" stroke-width="0.5"/>
  <path d="M124.9 170 C124.9 180 116.4 186.5 106.4 186.5 H124.9 Z" fill="${p.bandLight}" fill-opacity="0.35" stroke="${p.band}" stroke-width="0.5"/>
  <!-- Corner diamond cabochons -->
  <g fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5">
    <polygon points="22.5,21.5 25.5,24.5 22.5,27.5 19.5,24.5"/>
    <polygon points="124.9,21.5 127.9,24.5 124.9,27.5 121.9,24.5"/>
    <polygon points="22.5,183.5 25.5,186.5 22.5,189.5 19.5,186.5"/>
    <polygon points="124.9,183.5 127.9,186.5 124.9,189.5 121.9,186.5"/>
  </g>
</svg>`
  return seasonalOriginal.replace("</svg>", overlay)
}

/**
 * 3. Duplicate public/autumn/separator.svg -> public/<season>/separator-v2.svg
 *    Continuous center rail (x=34..266) with zero seam at slice x=56 + seasonalCluster!
 */
function buildSeparatorV2(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 26">
  <!-- Duplicated from separator.svg and restructured for seamless border-image-slice (0 56 0 56) -->
  <line x1="36" y1="8.5" x2="264" y2="8.5" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <line x1="36" y1="17.5" x2="264" y2="17.5" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <rect x="32" y="11.2" width="236" height="3.6" fill="${p.band}" stroke="${p.ink}" stroke-width="0.65"/>

  <g id="finial">
    <path d="M36 11.2 H26 C18 11.2 14 5.2 8.5 6.2 C3.8 7 2.5 12.2 6.2 15.4 C9.2 17.8 13.8 16.4 13.5 13.2 C13.2 11 10.8 10.6 10 12.2 C9 10.4 11.8 8.2 14.8 9.6 C19.4 11.8 22.5 14.8 28 14.8 H36" fill="${p.band}" stroke="${p.ink}" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35 11.2 C29 7.2 23 3.4 16.8 4.2 C21.8 5.6 26 8.8 30.2 11.2 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45" stroke-linejoin="round"/>
    <path d="M35 14.8 C29 18.8 23 22.6 16.8 21.8 C21.8 20.4 26 17.2 30.2 14.8 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45" stroke-linejoin="round"/>
    <polygon points="48,13 42.5,7.5 37,13 42.5,18.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <circle cx="42.5" cy="13" r="1.5" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.45"/>
    ${seasonalCluster(p, 19, 13, 0.72)}
  </g>
  <use href="#finial" transform="translate(300 0) scale(-1 1)"/>
</svg>`
}

/**
 * 4. Duplicate public/autumn/skeleton-frame.svg -> public/<season>/skeleton-frame-v2.svg
 *    Transparent center opening so ::before frame sits CRISP on top of ::after shimmer!
 */
function buildSkeletonFrameV2(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 56">
  <!-- Compact skeleton frame with crisp corner leaves over inner shimmer. Slice 18/18 -->
  <path d="M0 0H160V56H0ZM9 9V47H151V9Z" fill="${p.ground}" fill-rule="evenodd"/>
  <rect x="2" y="2" width="156" height="52" fill="none" stroke="${p.ink}" stroke-width="0.8"/>
  <path d="M4.2 4.2H155.8V51.8H4.2ZM7.2 7.2V48.8H152.8V7.2Z" fill="${p.band}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="0.45"/>
  <rect x="9" y="9" width="142" height="38" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="sk-c">
    <path d="M4.2 14 C4.2 8.2 8.2 4.2 14 4.2 H10.5 C6.8 4.2 4.2 6.8 4.2 10.5 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
    <path d="M7.2 7.2 C12.8 7.8 16 10.6 17 15.2 C13.2 14.4 10.2 11.8 7.2 7.2 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
    <circle cx="15.5" cy="8.5" r="1.15" fill="${p.bandDark}"/>
  </g>
  <use href="#sk-c" transform="translate(160 0) scale(-1 1)"/>
  <use href="#sk-c" transform="translate(0 56) scale(1 -1)"/>
  <use href="#sk-c" transform="translate(160 56) scale(-1 -1)"/>
</svg>`
}

/**
 * 5. Vienna Secession Button Frame (viewBox 0 0 180 64, slice 20 20)
 */
function buildButtonFrameSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 64">
  <polygon points="8,1.5 172,1.5 178.5,8 178.5,56 172,62.5 8,62.5 1.5,56 1.5,8" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.1"/>
  <polygon points="10,4 170,4 176,10 176,54 170,60 10,60 4,54 4,10" fill="none" stroke="${p.band}" stroke-width="2"/>
  <rect x="7.5" y="7.5" width="165" height="49" fill="none" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <g id="sec-btn-c">
    <rect x="3.5" y="3.5" width="5.5" height="5.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <rect x="10.8" y="3.8" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="15.5" y="3.8" width="3.2" height="3.2" fill="${p.band}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="3.8" y="10.8" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
    <path d="M7.5 14.5 H11.5 V10.5 H15.5" fill="none" stroke="${p.ink}" stroke-width="0.6"/>
  </g>
  <use href="#sec-btn-c" transform="translate(180 0) scale(-1 1)"/>
  <use href="#sec-btn-c" transform="translate(0 64) scale(1 -1)"/>
  <use href="#sec-btn-c" transform="translate(180 64) scale(-1 -1)"/>
</svg>`
}

/**
 * 6. Gilded Filled Primary CTA Button Frame (viewBox 0 0 180 64, slice 20 20)
 */
function buildButtonFrameGilded(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 64">
  <defs>
    <linearGradient id="gild-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.ctaFillStart}"/>
      <stop offset="100%" stop-color="${p.ctaFillEnd}"/>
    </linearGradient>
  </defs>
  <path d="M12 1.5 H168 C173.8 1.5 178.5 6.2 178.5 12 V52 C178.5 57.8 173.8 62.5 168 62.5 H12 C6.2 62.5 1.5 57.8 1.5 52 V12 C1.5 6.2 6.2 1.5 12 1.5 Z" fill="url(#gild-bg)" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="5" y="5" width="170" height="54" rx="7" fill="none" stroke="${p.ground}" stroke-width="0.95" stroke-opacity="0.9"/>
  <rect x="7.5" y="7.5" width="165" height="49" rx="5" fill="none" stroke="${p.ink}" stroke-width="0.6"/>
  <g id="gild-c">
    <path d="M5 18 C5 9.5 9.5 5 18 5 C14 7.5 12 10.5 11.5 15.5 C9 14.5 7 15.5 5 18 Z" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
    <circle cx="11" cy="11" r="2" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
    <path d="M13.5 7.5 C16.5 7.5 18.5 9 19 11.2 C16.4 11.2 14.5 9.8 13.5 7.5 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#gild-c" transform="translate(180 0) scale(-1 1)"/>
  <use href="#gild-c" transform="translate(0 64) scale(1 -1)"/>
  <use href="#gild-c" transform="translate(180 64) scale(-1 -1)"/>
</svg>`
}

/**
 * 7. Vienna Secession Card Frame (viewBox 0 0 180 180, slice 40 40)
 *    Pure Josef Hoffmann Quadratstil & Otto Wagner Postsparkasse orthogonal fittings:
 *    three strictly modular 3.2x3.2 Schachbrett squares on a 5.5u pitch + stepped key-fret!
 */
function buildCardFrameSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${p.ground}"/>
  <rect x="2" y="2" width="176" height="176" fill="none" stroke="${p.ink}" stroke-width="1.1"/>
  <path d="M5.5 5.5H174.5V174.5H5.5ZM9.5 9.5V170.5H170.5V9.5Z" fill="${p.band}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="0.6"/>
  <rect x="13" y="13" width="154" height="154" fill="none" stroke="${p.bandLight}" stroke-width="0.7"/>
  <rect x="16.5" y="16.5" width="147" height="147" fill="none" stroke="${p.inkSoft}" stroke-width="0.6"/>

  <g id="sec-card-c">
    <!-- Hoffmann Quadratstil stepped corner medallion -->
    <rect x="4" y="4" width="14.5" height="14.5" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.8"/>
    <rect x="6.5" y="6.5" width="9.5" height="9.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <rect x="9.3" y="9.3" width="3.9" height="3.9" fill="${p.bandDark}"/>
    <!-- Strictly modular 3x Schachbrett squares on 5.5u pitch along both axes -->
    <rect x="21.5" y="5.9" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="27" y="5.9" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="32.5" y="5.9" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5.9" y="21.5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5.9" y="27" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5.9" y="32.5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <!-- Orthogonal Otto Wagner stepped corner bracket & 3 Postsparkasse flutes -->
    <path d="M16.5 31.5 H23.5 V23.5 H31.5" fill="none" stroke="${p.ink}" stroke-width="0.7"/>
    <rect x="19.2" y="19.2" width="3" height="3" fill="${p.band}" stroke="${p.ink}" stroke-width="0.45"/>
    <line x1="26" y1="16.5" x2="26" y2="21" stroke="${p.inkSoft}" stroke-width="0.55"/>
    <line x1="28.5" y1="16.5" x2="28.5" y2="21" stroke="${p.inkSoft}" stroke-width="0.55"/>
  </g>
  <use href="#sec-card-c" transform="translate(180 0) scale(-1 1)"/>
  <use href="#sec-card-c" transform="translate(0 180) scale(1 -1)"/>
  <use href="#sec-card-c" transform="translate(180 180) scale(-1 -1)"/>
</svg>`
}

/**
 * 8. Badge Frame 1 — Botanical Cartouche Tag (viewBox 0 0 120 40, slice 14 18)
 *    Outer ink stroke dominant (1.3) over inner metallic band (1.0), crisp leaf contours (0.65).
 */
function buildBadgeFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40">
  <path d="M14 2 H106 C111 2 118 8 118 20 C118 32 111 38 106 38 H14 C9 38 2 32 2 20 C2 8 9 2 14 2 Z" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.3"/>
  <path d="M15 5 H105 C109 5 114.6 10 114.6 20 C114.6 30 109 35 105 35 H15 C11 35 5.4 30 5.4 20 C5.4 10 11 5 15 5 Z" fill="none" stroke="${p.band}" stroke-width="1"/>
  <g id="bdg-end">
    <path d="M6.8 20 C6.8 12.5 11 8.2 16.2 7.4 C12.8 10.6 11.2 14.6 11.2 20 C11.2 25.4 12.8 29.4 16.2 32.6 C11 31.8 6.8 27.5 6.8 20 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.65"/>
    <circle cx="8.6" cy="20" r="1.8" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.5"/>
  </g>
  <use href="#bdg-end" transform="translate(120 0) scale(-1 1)"/>
</svg>`
}

/**
 * 9. Badge Frame 2 — Secession Chamfered Lozenge (viewBox 0 0 120 40, slice 12 16)
 */
function buildBadgeFrame2(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40">
  <polygon points="11,2 109,2 118,11 118,29 109,38 11,38 2,29 2,11" fill="${p.groundAlt}" stroke="${p.ink}" stroke-width="1.25"/>
  <polygon points="12.5,5 107.5,5 115,12.5 115,27.5 107.5,35 12.5,35 5,27.5 5,12.5" fill="none" stroke="${p.band}" stroke-width="1"/>
  <polygon points="8.5,16.5 12,20 8.5,23.5 5,20" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.55"/>
  <polygon points="111.5,16.5 115,20 111.5,23.5 108,20" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.55"/>
</svg>`
}

/**
 * 10. Badge Frame 3 — Gilded Ribbon Seal (viewBox 0 0 120 40, slice 12 18)
 */
function buildBadgeFrame3(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40">
  <polygon points="2,4 118,4 112,20 118,36 2,36 8,20" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="1.25"/>
  <line x1="12" y1="7.4" x2="108" y2="7.4" stroke="${p.ink}" stroke-width="0.7"/>
  <line x1="12" y1="32.6" x2="108" y2="32.6" stroke="${p.ink}" stroke-width="0.7"/>
  <circle cx="13.5" cy="20" r="1.7" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
  <circle cx="106.5" cy="20" r="1.7" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
</svg>`
}

/**
 * 11. Modal Frame 1 — Whiplash Botanical Decree Frame (viewBox 0 0 200 200, slice 48 48)
 *     Both twin leaves veined symmetrically + seasonalCluster.
 */
function buildModalFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="3" y="3" width="194" height="194" rx="8" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <path d="M7 7H193V193H7ZM12 12V188H188V12Z" fill="${p.band}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="0.65"/>
  <rect x="15.5" y="15.5" width="169" height="169" fill="none" stroke="${p.bandLight}" stroke-width="0.8"/>
  <rect x="19" y="19" width="162" height="162" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>

  <g id="mod1-c">
    <path d="M12 12 C28 13 39 19 44 30 C46.5 35.5 45.5 41.5 41 44.5 C38 46.5 34.5 45.5 34.5 42.8 C34.5 40.8 36.8 40.2 37.8 41.6 C39.8 40.2 40.8 36.2 39 31.8 C35 22.5 25.5 17.5 12 16 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <path d="M22 16.5 C30.5 17 36 22.5 35.2 31.5 C29.2 30 24.5 24.8 22 16.5 Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M24.2 18.8 C28.2 22.8 31.5 26.5 33.6 30" fill="none" stroke="${p.ground}" stroke-width="0.55" stroke-linecap="round"/>
    <path d="M16.5 22 C17 30.5 22.5 36 31.5 35.2 C30 29.2 24.8 24.5 16.5 22 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M18.8 24.2 C22.8 28.2 26.5 31.5 30 33.6" fill="none" stroke="${p.inkSoft}" stroke-width="0.5" stroke-linecap="round"/>
    ${seasonalCluster(p, 41, 18.5, 0.95)}
    <circle cx="19" cy="19" r="2.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
  </g>
  <use href="#mod1-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#mod1-c" transform="translate(0 200) scale(1 -1)"/>
  <use href="#mod1-c" transform="translate(200 200) scale(-1 -1)"/>
</svg>`
}

/**
 * 12. Modal Frame 2 — Vienna Secession Architectural Modal Frame (viewBox 0 0 200 200, slice 40 40)
 *     Orthogonal stepped key-fret corner brackets (no carpenter's diagonal!).
 */
function buildModalFrame2(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="10,2 190,2 198,10 198,190 190,198 10,198 2,190 2,10" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <polygon points="13,6 187,6 194,13 194,187 187,194 13,194 6,187 6,13" fill="none" stroke="${p.band}" stroke-width="2.4"/>
  <rect x="11.5" y="11.5" width="177" height="177" fill="none" stroke="${p.ink}" stroke-width="0.75"/>
  <rect x="15" y="15" width="170" height="170" fill="none" stroke="${p.band}" stroke-width="0.6"/>
  <g id="mod2-c">
    <rect x="6" y="6" width="14" height="14" fill="${p.groundAlt}" stroke="${p.ink}" stroke-width="0.8"/>
    <polygon points="13,8 18,13 13,18 8,13" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.5"/>
    <rect x="23" y="7.8" width="4" height="4" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="29" y="7.8" width="4" height="4" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="35" y="7.8" width="4" height="4" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="7.8" y="23" width="4" height="4" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="7.8" y="29" width="4" height="4" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="7.8" y="35" width="4" height="4" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
    <path d="M15 29 H22 V22 H29" fill="none" stroke="${p.ink}" stroke-width="0.75"/>
  </g>
  <use href="#mod2-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#mod2-c" transform="translate(0 200) scale(1 -1)"/>
  <use href="#mod2-c" transform="translate(200 200) scale(-1 -1)"/>
</svg>`
}

/**
 * 13. Menu Frame 1 — Botanical Parchment Menu Frame (viewBox 0 0 140 140, slice 28 28)
 *     Expanded corner sprays filling 25u of the 28u slice + seasonalCluster!
 */
function buildMenuFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <rect x="2" y="2" width="136" height="136" rx="6" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <rect x="5.5" y="5.5" width="129" height="129" rx="3.5" fill="none" stroke="${p.band}" stroke-width="1.8"/>
  <rect x="9.5" y="9.5" width="121" height="121" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="mnu1-c">
    <path d="M5.5 25 C6.5 12 12 6.5 25 5.5 C19 9.5 15.5 14 14.8 21.5 C12 19 8.8 21 5.5 25 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
    <path d="M10.5 10.5 C18.5 11.2 23.5 15.8 24.2 23.5 C18.2 22.5 13.2 18.2 10.5 10.5 Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M12.5 12.8 C16.5 16.5 19.5 19.5 22.2 22" fill="none" stroke="${p.ground}" stroke-width="0.5" stroke-linecap="round"/>
    ${seasonalCluster(p, 22.5, 11, 0.68)}
    <circle cx="9.5" cy="9.5" r="1.9" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#mnu1-c" transform="translate(140 0) scale(-1 1)"/>
  <use href="#mnu1-c" transform="translate(0 140) scale(1 -1)"/>
  <use href="#mnu1-c" transform="translate(140 140) scale(-1 -1)"/>
</svg>`
}

/**
 * 14. Menu Frame 2 — Secession Cabinet Frame (viewBox 0 0 140 140, slice 24 24)
 */
function buildMenuFrame2(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <rect x="2" y="2" width="136" height="136" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <rect x="5" y="5" width="130" height="130" fill="none" stroke="${p.band}" stroke-width="1.6"/>
  <rect x="8.5" y="8.5" width="123" height="123" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="mnu2-c">
    <rect x="3.8" y="3.8" width="9.5" height="9.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.65"/>
    <rect x="6.5" y="6.5" width="4.1" height="4.1" fill="${p.bandDark}"/>
    <rect x="15.5" y="4.8" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="20.2" y="4.8" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="4.8" y="15.5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
    <rect x="4.8" y="20.2" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#mnu2-c" transform="translate(140 0) scale(-1 1)"/>
  <use href="#mnu2-c" transform="translate(0 140) scale(1 -1)"/>
  <use href="#mnu2-c" transform="translate(140 140) scale(-1 -1)"/>
</svg>`
}

/**
 * 15. Heading Plaque Frame — Continuous Stadium Hairline (NO vertical rect crease!)
 */
function buildHeadingFrame(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 72">
  <path d="M24 3 H216 C224 3 237 14 237 36 C237 58 224 69 216 69 H24 C16 69 3 58 3 36 C3 14 16 3 24 3 Z" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <path d="M26 7 H214 C220 7 232 17 232 36 C232 55 220 65 214 65 H26 C20 65 8 55 8 36 C8 17 20 7 26 7 Z" fill="none" stroke="${p.band}" stroke-width="1.8"/>
  <path d="M30 11 H210 C216 11 226 19.5 226 36 C226 52.5 216 61 210 61 H30 C24 61 14 52.5 14 36 C14 19.5 24 11 30 11 Z" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="hdg-end">
    <path d="M10 36 C10 22 18 12 30 10.5 C23 16 19.5 24.5 19.5 36 C19.5 47.5 23 56 30 61.5 C18 60 10 50 10 36 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <path d="M14.5 36 L22 28.5 L29.5 36 L22 43.5 Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.55"/>
    <circle cx="22" cy="36" r="2.2" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
  </g>
  <use href="#hdg-end" transform="translate(240 0) scale(-1 1)"/>
</svg>`
}

export function writeSeasonalSvg(filename: string, builder: (p: Palette) => string) {
  for (const season of SEASONS) {
    const outDir = path.join(process.cwd(), "public", season)
    fs.mkdirSync(outDir, { recursive: true })
    const outPath = path.join(outDir, filename)
    fs.writeFileSync(outPath, builder(PALETTES[season]), "utf8")
  }
  console.log(`✓ Generated ${filename} across ${SEASONS.join(", ")}`)
}

if (import.meta.main) {
  writeSeasonalSvg("button-frame-v2.svg", buildButtonFrameV2)
  writeSeasonalSvg("card-frame-v2.svg", buildCardFrameV2)
  writeSeasonalSvg("separator-v2.svg", buildSeparatorV2)
  writeSeasonalSvg("skeleton-frame-v2.svg", buildSkeletonFrameV2)
  writeSeasonalSvg("button-frame-secession.svg", buildButtonFrameSecession)
  writeSeasonalSvg("button-frame-gilded.svg", buildButtonFrameGilded)
  writeSeasonalSvg("card-frame-secession.svg", buildCardFrameSecession)
  writeSeasonalSvg("badge-frame-1.svg", buildBadgeFrame1)
  writeSeasonalSvg("badge-frame-2.svg", buildBadgeFrame2)
  writeSeasonalSvg("badge-frame-3.svg", buildBadgeFrame3)
  writeSeasonalSvg("modal-frame-1.svg", buildModalFrame1)
  writeSeasonalSvg("modal-frame-2.svg", buildModalFrame2)
  writeSeasonalSvg("menu-frame-1.svg", buildMenuFrame1)
  writeSeasonalSvg("menu-frame-2.svg", buildMenuFrame2)
  writeSeasonalSvg("heading-frame-1.svg", buildHeadingFrame)
}
