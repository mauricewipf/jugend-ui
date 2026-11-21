/**
 * Build Wave 3 Jugendstil, Salon Passe-Partout & Vienna Secession SVG frames across all 4 seasons:
 * - Alert (V1 Botanical Broadside, V2 Salon Notice, V3 Secession Plaque)
 * - Dialog (V1 Botanical Grand Folio, V2 Salon Lunette Dossier)
 * - Sheet (V1 Botanical Folding Door, V2 Salon Wing, V3 Secession Wing)
 * - Tooltip (V1 Botanical Cartouche, V2 Salon Brass Tag, V3 Secession Octagonal Tag)
 * - Popover (V2 Salon Passe-Partout Vitrine)
 * - Avatar (1:1 Full-Bleed Medallion Overlays: V1 Mucha Zodiac Halo, V2 Salon Cameo Bezel, V3 Secession Octagon Stamp)
 * - Progress (50% Vertical-Slice Zero-Shear Tracks: V1 Botanical Brass, V2 Salon Enamel, V3 Secession Meter)
 * - Blockquote (V1 Botanical Epigraph Scroll, V2 Salon Plaque, V3 Secession Manifesto Tablet)
 * - Empty (V1 Botanical Arch Alcove, V2 Salon Niche, V3 Secession Niche)
 */

import {
  type Palette,
  seasonalCluster,
  writeSeasonalSvg,
} from "./build-wave1-svgs"

/**
 * ALERT V1: Asymmetric Left-Spined Botanical Broadside (viewBox 0 0 220 88, slice 24 28 24 36)
 */
function buildAlertFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 88">
  <rect x="2" y="2" width="216" height="84" rx="5" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="5.5" y="5.5" width="209" height="77" rx="3" fill="none" stroke="${p.band}" stroke-width="1.5"/>
  <!-- Left double-brass vertical spine -->
  <rect x="5.5" y="5.5" width="5.5" height="77" fill="${p.band}" stroke="${p.ink}" stroke-width="0.6"/>
  <line x1="14" y1="8.5" x2="14" y2="79.5" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <rect x="14" y="8.5" width="197.5" height="71" fill="none" stroke="${p.inkSoft}" stroke-width="0.5"/>
  <!-- Left corner botanical tendrils -->
  <g id="alt1-lc">
    <path d="M11 8.5 C21 9 28 13 31 20 C25.5 19 20.5 15.5 17.5 11.5 C15 14 13.5 17.5 11 21 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    ${seasonalCluster(p, 26.5, 11.5, 0.62)}
  </g>
  <use href="#alt1-lc" transform="translate(0 88) scale(1 -1)"/>
  <!-- Right corner tendrils -->
  <g id="alt1-rc">
    <path d="M214.5 20 C213.5 12 208 6.5 200 5.5 C204.5 8.8 207 12.2 207.5 17 C210 15.5 212 17 214.5 20 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <circle cx="211.5" cy="8.5" r="1.5" fill="${p.bandDark}"/>
  </g>
  <use href="#alt1-rc" transform="translate(0 88) scale(1 -1)"/>
</svg>`
}

/**
 * ALERT V2: Salon Passe-Partout Notice (viewBox 0 0 200 88, slice 24 24)
 */
function buildAlertFrameSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 88">
  <rect x="2" y="2" width="196" height="84" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <path d="M5 5H195V83H5ZM10 10V78H190V10Z" fill="${p.groundAlt}" fill-rule="evenodd"/>
  <rect x="5" y="5" width="190" height="78" fill="none" stroke="${p.band}" stroke-width="1.35"/>
  <rect x="10" y="10" width="180" height="68" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="alt-sal-c">
    <path d="M10 21 C10 14.5 14.5 10 21 10 H10 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.5"/>
    <polygon points="10,7.5 12.5,10 10,12.5 7.5,10" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#alt-sal-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#alt-sal-c" transform="translate(0 88) scale(1 -1)"/>
  <use href="#alt-sal-c" transform="translate(200 88) scale(-1 -1)"/>
</svg>`
}

/**
 * ALERT V3: Vienna Secession Plaque (viewBox 0 0 200 80, slice 20 20)
 */
function buildAlertFrameSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
  <rect x="2" y="2" width="196" height="76" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <rect x="5" y="5" width="190" height="70" fill="none" stroke="${p.band}" stroke-width="1.4"/>
  <rect x="5" y="5" width="4.5" height="70" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.55"/>
  <g id="alt-sec-c">
    <rect x="190" y="4.5" width="5.5" height="5.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <rect x="184.5" y="5" width="3" height="3" fill="${p.bandDark}"/>
    <rect x="12" y="5" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="16.8" y="5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
  </g>
  <use href="#alt-sec-c" transform="translate(0 80) scale(1 -1)"/>
</svg>`
}

/**
 * DIALOG V1 & V2: Grand Exhibition Folio & Salon Lunette Dossier (viewBox 0 0 220 220)
 */
function buildDialogFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
  <rect x="3" y="3" width="214" height="214" rx="8" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.25"/>
  <path d="M7 7H213V213H7ZM12.5 12.5V207.5H207.5V12.5Z" fill="${p.band}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="0.65"/>
  <rect x="16.5" y="16.5" width="187" height="187" fill="none" stroke="${p.bandLight}" stroke-width="0.8"/>
  <rect x="20" y="20" width="180" height="180" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="dlg1-c">
    <path d="M12.5 12.5 C30 13.5 41 20 45.5 31.5 C47.8 37.5 46.5 43 42 45.5 C39 47.2 35.8 46 36 43.2 C38.5 42.2 40.5 38 39 33 C35.5 23 26 18 12.5 16.5 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <path d="M23 17 C31.5 17.5 37 23 36.2 32 C30 30.5 25.2 25.2 23 17 Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M25.2 19.2 C29.2 23.2 32.5 27 34.6 30.5" fill="none" stroke="${p.ground}" stroke-width="0.55" stroke-linecap="round"/>
    <path d="M17 23 C17.5 31.5 23 37 32 36.2 C30.5 30 25.2 25.2 17 23 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M19.2 25.2 C23.2 29.2 27 32.5 30.5 34.6" fill="none" stroke="${p.inkSoft}" stroke-width="0.5" stroke-linecap="round"/>
    ${seasonalCluster(p, 42, 19, 0.92)}
    <circle cx="20" cy="20" r="2.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
  </g>
  <use href="#dlg1-c" transform="translate(220 0) scale(-1 1)"/>
  <use href="#dlg1-c" transform="translate(0 220) scale(1 -1)"/>
  <use href="#dlg1-c" transform="translate(220 220) scale(-1 -1)"/>
</svg>`
}

function buildDialogFrameSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
  <rect x="3" y="3" width="214" height="214" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.25"/>
  <path d="M7 7H213V213H7ZM16 16V204H204V16Z" fill="${p.groundAlt}" fill-rule="evenodd"/>
  <rect x="7" y="7" width="206" height="206" fill="none" stroke="${p.band}" stroke-width="2"/>
  <rect x="16" y="16" width="188" height="188" fill="none" stroke="${p.inkSoft}" stroke-width="0.7"/>
  <g id="dlg-sal-c">
    <path d="M16 38 C16 25 25 16 38 16 H16 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.65"/>
    <path d="M13 16 H21 M16 13 V21" stroke="${p.ink}" stroke-width="0.65"/>
    <polygon points="16,12.2 19.8,16 16,19.8 12.2,16" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
  </g>
  <use href="#dlg-sal-c" transform="translate(220 0) scale(-1 1)"/>
  <use href="#dlg-sal-c" transform="translate(0 220) scale(1 -1)"/>
  <use href="#dlg-sal-c" transform="translate(220 220) scale(-1 -1)"/>
</svg>`
}

/**
 * SHEET V1, V2, V3: Architectural Sliding Wing Frames (viewBox 0 0 200 240)
 */
function buildSheetFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
  <rect x="2" y="2" width="196" height="236" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <path d="M5.5 5.5H194.5V234.5H5.5ZM9.5 9.5V230.5H190.5V9.5Z" fill="${p.band}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="0.55"/>
  <rect x="13" y="13" width="174" height="214" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="sht1-c">
    <path d="M9.5 9.5 C21 10.5 29 16 32.5 26 C34 30.5 32.5 34.2 29 35 C27 35.5 25.5 34 26 32 C28 31 28.8 27.5 27.5 24 C25 17.5 18.5 13.5 9.5 12.5 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
    ${seasonalCluster(p, 29, 14, 0.72)}
    <circle cx="13" cy="13" r="1.8" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#sht1-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#sht1-c" transform="translate(0 240) scale(1 -1)"/>
  <use href="#sht1-c" transform="translate(200 240) scale(-1 -1)"/>
</svg>`
}

function buildSheetFrameSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
  <rect x="2" y="2" width="196" height="236" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <path d="M5.5 5.5H194.5V234.5H5.5ZM12 12V228H188V12Z" fill="${p.groundAlt}" fill-rule="evenodd"/>
  <rect x="5.5" y="5.5" width="189" height="229" fill="none" stroke="${p.band}" stroke-width="1.6"/>
  <rect x="12" y="12" width="176" height="216" fill="none" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <g id="sht-sal-c">
    <path d="M12 29 C12 19.5 19.5 12 29 12 H12 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.55"/>
    <polygon points="12,9 15,12 12,15 9,12" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
  </g>
  <use href="#sht-sal-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#sht-sal-c" transform="translate(0 240) scale(1 -1)"/>
  <use href="#sht-sal-c" transform="translate(200 240) scale(-1 -1)"/>
</svg>`
}

function buildSheetFrameSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
  <rect x="2" y="2" width="196" height="236" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="5.5" y="5.5" width="189" height="229" fill="none" stroke="${p.band}" stroke-width="1.8"/>
  <rect x="9.5" y="9.5" width="181" height="221" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="sht-sec-c">
    <rect x="4" y="4" width="10" height="10" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <rect x="6.8" y="6.8" width="4.4" height="4.4" fill="${p.bandDark}"/>
    <rect x="16.5" y="5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="21.5" y="5" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5" y="16.5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5" y="21.5" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
  </g>
  <use href="#sht-sec-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#sht-sec-c" transform="translate(0 240) scale(1 -1)"/>
  <use href="#sht-sec-c" transform="translate(200 240) scale(-1 -1)"/>
</svg>`
}

/**
 * TOOLTIP V1, V2, V3: Vitrine Specimen Labels (viewBox 0 0 140 44)
 */
function buildTooltipFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 44">
  <path d="M14 2 H126 C132 2 138 9 138 22 C138 35 132 42 126 42 H14 C8 42 2 35 2 22 C2 9 8 2 14 2 Z" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.35"/>
  <path d="M15 5.2 H125 C129.5 5.2 134.5 10.5 134.5 22 C134.5 33.5 129.5 38.8 125 38.8 H15 C10.5 38.8 5.5 33.5 5.5 22 C5.5 10.5 10.5 5.2 15 5.2 Z" fill="none" stroke="${p.band}" stroke-width="1.1"/>
  <g id="tt1-end">
    <path d="M6.8 22 C6.8 14 11 9 16.2 8.2 C12.8 11.8 11.2 16.2 11.2 22 C11.2 27.8 12.8 32.2 16.2 35.8 C11 35 6.8 30 6.8 22 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <circle cx="8.8" cy="22" r="1.6" fill="${p.bandDark}"/>
  </g>
  <use href="#tt1-end" transform="translate(140 0) scale(-1 1)"/>
</svg>`
}

function buildTooltipFrameSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 44">
  <rect x="2" y="2" width="136" height="40" rx="6" fill="${p.groundAlt}" stroke="${p.ink}" stroke-width="1.35"/>
  <rect x="5" y="5" width="130" height="34" rx="4" fill="${p.ground}" stroke="${p.band}" stroke-width="1.15"/>
  <circle cx="10" cy="22" r="1.7" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
  <circle cx="130" cy="22" r="1.7" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
</svg>`
}

function buildTooltipFrameSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 44">
  <polygon points="10,2 130,2 138,10 138,34 130,42 10,42 2,34 2,10" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.35"/>
  <polygon points="11.5,5 128.5,5 135,11.5 135,32.5 128.5,39 11.5,39 5,32.5 5,11.5" fill="none" stroke="${p.band}" stroke-width="1.1"/>
  <rect x="7.5" y="19.5" width="4" height="4" fill="${p.bandDark}"/>
  <rect x="128.5" y="19.5" width="4" height="4" fill="${p.bandDark}"/>
</svg>`
}

/**
 * POPOVER V2: Salon Passe-Partout Vitrine (viewBox 0 0 160 160, slice 28 28)
 */
function buildPopoverFrameSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <rect x="2" y="2" width="156" height="156" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <path d="M5 5H155V155H5ZM10.5 10.5V149.5H149.5V10.5Z" fill="${p.groundAlt}" fill-rule="evenodd"/>
  <rect x="5" y="5" width="150" height="150" fill="none" stroke="${p.band}" stroke-width="1.4"/>
  <rect x="10.5" y="10.5" width="139" height="139" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="pop-sal-c">
    <path d="M10.5 24 C10.5 16.5 16.5 10.5 24 10.5 H10.5 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.5"/>
    <polygon points="10.5,8 13,10.5 10.5,13 8,10.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#pop-sal-c" transform="translate(160 0) scale(-1 1)"/>
  <use href="#pop-sal-c" transform="translate(0 160) scale(1 -1)"/>
  <use href="#pop-sal-c" transform="translate(160 160) scale(-1 -1)"/>
</svg>`
}

/**
 * AVATAR MEDALLIONS (1:1 Full-Bleed SVG Overlays with Transparent Center Aperture!)
 */
function buildAvatarMedallion1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Mucha Zodiac Botanical Halo with r=36.5 transparent portrait aperture -->
  <path d="M50 4 A46 46 0 1 1 49.99 4 Z M50 13.5 A36.5 36.5 0 1 0 50.01 13.5 Z" fill="${p.band}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="1.2"/>
  <circle cx="50" cy="50" r="42.5" fill="none" stroke="${p.bandLight}" stroke-width="1.4"/>
  <circle cx="50" cy="50" r="36.5" fill="none" stroke="${p.ink}" stroke-width="1.1"/>
  <!-- Crown fleuron at 12h -->
  <path d="M40 8 C45 2 55 2 60 8 C55 7 52 9.5 50 13 C48 9.5 45 7 40 8 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.8"/>
  <circle cx="50" cy="6.5" r="2.2" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.65"/>
  <!-- Crescent whiplash plumes on left & right -->
  <path d="M8 38 C4 50 8 64 18 74 C12 63 11 51 13.5 40 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.7"/>
  <path d="M92 38 C96 50 92 64 82 74 C88 63 89 51 86.5 40 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.7"/>
  <!-- Bottom botanical cluster at 6h -->
  ${seasonalCluster(p, 50, 91.5, 1.05)}
</svg>`
}

function buildAvatarMedallionSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Salon Cameo Bezel with 4 cardinal pearl/diamond cabochons & r=37 aperture -->
  <path d="M50 5 A45 45 0 1 1 49.99 5 Z M50 13 A37 37 0 1 0 50.01 13 Z" fill="${p.groundAlt}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="1.2"/>
  <circle cx="50" cy="50" r="41" fill="none" stroke="${p.band}" stroke-width="2.2"/>
  <circle cx="50" cy="50" r="37" fill="none" stroke="${p.ink}" stroke-width="1"/>
  <g fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.75">
    <polygon points="50,2.5 54,7.5 50,12.5 46,7.5"/>
    <polygon points="50,87.5 54,92.5 50,97.5 46,92.5"/>
    <polygon points="2.5,50 7.5,46 12.5,50 7.5,54"/>
    <polygon points="87.5,50 92.5,46 97.5,50 92.5,54"/>
  </g>
</svg>`
}

function buildAvatarMedallionSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Vienna Secession Octagonal Portrait Stamp -->
  <path d="M4 4 H96 V96 H4 Z M31 13 L13 31 V69 L31 87 H69 L87 69 V31 L69 13 Z" fill="${p.ground}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="1.3"/>
  <rect x="7.5" y="7.5" width="85" height="85" fill="none" stroke="${p.band}" stroke-width="1.8"/>
  <polygon points="31,13 69,13 87,31 87,69 69,87 31,87 13,69 13,31" fill="none" stroke="${p.ink}" stroke-width="1.15"/>
  <g id="av-sec-c">
    <rect x="6.5" y="6.5" width="9" height="9" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.65"/>
    <rect x="9.2" y="9.2" width="3.6" height="3.6" fill="${p.bandDark}"/>
  </g>
  <use href="#av-sec-c" transform="translate(100 0) scale(-1 1)"/>
  <use href="#av-sec-c" transform="translate(0 100) scale(1 -1)"/>
  <use href="#av-sec-c" transform="translate(100 100) scale(-1 -1)"/>
</svg>`
}

/**
 * PROGRESS TRACKS (50% Vertical-Slice Zero-Shear: viewBox 0 0 240 28, slice 14 22 14 22)
 */
function buildProgressTrack1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 28">
  <path d="M14 2 H226 C233 2 238 7.5 238 14 C238 20.5 233 26 226 26 H14 C7 26 2 20.5 2 14 C2 7.5 7 2 14 2 Z" fill="${p.groundAlt}" stroke="${p.ink}" stroke-width="1.25"/>
  <rect x="16" y="5.5" width="208" height="17" rx="6" fill="${p.ground}" stroke="${p.band}" stroke-width="1.1"/>
  <g id="prg1-end">
    <path d="M5 14 C5 8.5 9 5 15 5 C11.8 7.5 10.5 10.5 10.5 14 C10.5 17.5 11.8 20.5 15 23 C9 23 5 19.5 5 14 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <circle cx="8" cy="14" r="1.5" fill="${p.bandDark}"/>
  </g>
  <use href="#prg1-end" transform="translate(240 0) scale(-1 1)"/>
</svg>`
}

function buildProgressTrackSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 28">
  <rect x="2" y="2" width="236" height="24" rx="12" fill="${p.groundAlt}" stroke="${p.ink}" stroke-width="1.25"/>
  <rect x="14" y="5.5" width="212" height="17" rx="8" fill="${p.ground}" stroke="${p.band}" stroke-width="1.15"/>
  <polygon points="8.5,10 12.5,14 8.5,18 4.5,14" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
  <polygon points="231.5,10 235.5,14 231.5,18 227.5,14" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
</svg>`
}

function buildProgressTrackSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 28">
  <polygon points="7,2 233,2 238,7 238,21 233,26 7,26 2,21 2,7" fill="${p.groundAlt}" stroke="${p.ink}" stroke-width="1.25"/>
  <rect x="15" y="5.5" width="210" height="17" fill="${p.ground}" stroke="${p.band}" stroke-width="1.1"/>
  <rect x="5" y="9" width="6.5" height="10" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
  <rect x="228.5" y="9" width="6.5" height="10" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
</svg>`
}

/**
 * BLOCKQUOTE PLAQUES (V1 Botanical Scroll, V2 Salon Plaque, V3 Secession Manifesto Tablet)
 */
function buildBlockquoteFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 120">
  <rect x="2" y="2" width="216" height="116" rx="5" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="5.5" y="5.5" width="7" height="109" fill="${p.band}" stroke="${p.ink}" stroke-width="0.6"/>
  <rect x="5.5" y="5.5" width="209" height="109" rx="3" fill="none" stroke="${p.band}" stroke-width="1.5"/>
  <rect x="16" y="9.5" width="194.5" height="101" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="bq1-lc">
    <path d="M12.5 9.5 C24 10 31 15 34.5 23.5 C28 22.5 22 18 19 13 C16.5 16 15 20 12.5 24 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
    ${seasonalCluster(p, 30, 12.5, 0.68)}
  </g>
  <use href="#bq1-lc" transform="translate(0 120) scale(1 -1)"/>
</svg>`
}

function buildBlockquoteFrameSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120">
  <rect x="2" y="2" width="196" height="116" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <path d="M5.5 5.5H194.5V114.5H5.5ZM11 11V109H189V11Z" fill="${p.groundAlt}" fill-rule="evenodd"/>
  <rect x="5.5" y="5.5" width="189" height="109" fill="none" stroke="${p.band}" stroke-width="1.4"/>
  <rect x="11" y="11" width="178" height="98" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="bq-sal-c">
    <path d="M11 25 C11 17 17 11 25 11 H11 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.5"/>
    <polygon points="11,8.2 13.8,11 11,13.8 8.2,11" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#bq-sal-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#bq-sal-c" transform="translate(0 120) scale(1 -1)"/>
  <use href="#bq-sal-c" transform="translate(200 120) scale(-1 -1)"/>
</svg>`
}

function buildBlockquoteFrameSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120">
  <rect x="2" y="2" width="196" height="116" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="5.5" y="5.5" width="189" height="109" fill="none" stroke="${p.band}" stroke-width="1.8"/>
  <rect x="9.5" y="9.5" width="181" height="101" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="bq-sec-c">
    <rect x="4" y="4" width="9.5" height="9.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.6"/>
    <rect x="6.8" y="6.8" width="3.9" height="3.9" fill="${p.bandDark}"/>
    <rect x="15.8" y="5" width="3" height="3" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="20.5" y="5" width="3" height="3" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5" y="15.8" width="3" height="3" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
  </g>
  <use href="#bq-sec-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#bq-sec-c" transform="translate(0 120) scale(1 -1)"/>
  <use href="#bq-sec-c" transform="translate(200 120) scale(-1 -1)"/>
</svg>`
}

/**
 * EMPTY NICHES (V1 Botanical Arch Alcove, V2 Salon Niche, V3 Secession Niche)
 */
function buildEmptyFrame1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200">
  <rect x="3" y="3" width="214" height="194" rx="8" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="7" y="7" width="206" height="186" rx="5" fill="none" stroke="${p.band}" stroke-width="2"/>
  <rect x="12" y="12" width="196" height="176" fill="none" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <g id="emp1-tc">
    <path d="M12 40 C12 22 22 12 40 12 H12 Z" fill="${p.bandLight}" fill-opacity="0.5" stroke="${p.band}" stroke-width="0.65"/>
    <path d="M14 14 C25 15 33 21 36 31 C28 29 21 23 14 14 Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.5"/>
    ${seasonalCluster(p, 35, 16.5, 0.82)}
  </g>
  <use href="#emp1-tc" transform="translate(220 0) scale(-1 1)"/>
  <use href="#emp1-tc" transform="translate(0 200) scale(1 -1)"/>
  <use href="#emp1-tc" transform="translate(220 200) scale(-1 -1)"/>
</svg>`
}

function buildEmptyFrameSalon(p: Palette): string {
  return buildDialogFrameSalon(p)
}

function buildEmptyFrameSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="10,2 190,2 198,10 198,190 190,198 10,198 2,190 2,10" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="7" y="7" width="186" height="186" fill="none" stroke="${p.band}" stroke-width="2"/>
  <rect x="12" y="12" width="176" height="176" fill="none" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <g id="emp-sec-c">
    <rect x="5" y="5" width="12" height="12" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.7"/>
    <rect x="8.2" y="8.2" width="5.6" height="5.6" fill="${p.bandDark}"/>
    <path d="M12 27 H21 V21 H27" fill="none" stroke="${p.ink}" stroke-width="0.7"/>
  </g>
  <use href="#emp-sec-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#emp-sec-c" transform="translate(0 200) scale(1 -1)"/>
  <use href="#emp-sec-c" transform="translate(200 200) scale(-1 -1)"/>
</svg>`
}

if (process.argv[1]?.endsWith("build-wave3-svgs.ts")) {
  writeSeasonalSvg("alert-frame-1.svg", buildAlertFrame1)
  writeSeasonalSvg("alert-frame-salon.svg", buildAlertFrameSalon)
  writeSeasonalSvg("alert-frame-secession.svg", buildAlertFrameSecession)
  writeSeasonalSvg("dialog-frame-1.svg", buildDialogFrame1)
  writeSeasonalSvg("dialog-frame-salon.svg", buildDialogFrameSalon)
  writeSeasonalSvg("sheet-frame-1.svg", buildSheetFrame1)
  writeSeasonalSvg("sheet-frame-salon.svg", buildSheetFrameSalon)
  writeSeasonalSvg("sheet-frame-secession.svg", buildSheetFrameSecession)
  writeSeasonalSvg("tooltip-frame-1.svg", buildTooltipFrame1)
  writeSeasonalSvg("tooltip-frame-salon.svg", buildTooltipFrameSalon)
  writeSeasonalSvg("tooltip-frame-secession.svg", buildTooltipFrameSecession)
  writeSeasonalSvg("popover-frame-salon.svg", buildPopoverFrameSalon)
  writeSeasonalSvg("avatar-medallion-1.svg", buildAvatarMedallion1)
  writeSeasonalSvg("avatar-medallion-salon.svg", buildAvatarMedallionSalon)
  writeSeasonalSvg("avatar-medallion-secession.svg", buildAvatarMedallionSecession)
  writeSeasonalSvg("progress-track-1.svg", buildProgressTrack1)
  writeSeasonalSvg("progress-track-salon.svg", buildProgressTrackSalon)
  writeSeasonalSvg("progress-track-secession.svg", buildProgressTrackSecession)
  writeSeasonalSvg("blockquote-frame-1.svg", buildBlockquoteFrame1)
  writeSeasonalSvg("blockquote-frame-salon.svg", buildBlockquoteFrameSalon)
  writeSeasonalSvg("blockquote-frame-secession.svg", buildBlockquoteFrameSecession)
  writeSeasonalSvg("empty-frame-1.svg", buildEmptyFrame1)
  writeSeasonalSvg("empty-frame-salon.svg", buildEmptyFrameSalon)
  writeSeasonalSvg("empty-frame-secession.svg", buildEmptyFrameSecession)
}
