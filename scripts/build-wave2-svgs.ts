/**
 * Build Wave 2 Jugendstil & Vienna Secession SVG frames across all 4 seasons:
 * - Tabs (V1 Botanical Arch open-bottom transom, V2 Salon corner-safe tray & cartouche, V3 Secession open-bottom register)
 * - Accordion (V1 Botanical Folio with seasonalCluster, V2 Salon Passe-Partout Group, V3 Secession Drawer)
 * - Breadcrumb (V2 Ribbon 50%-vertical-slice Wayfinder, V3 Secession Header Bar)
 * - Pagination (V1 Botanical Medallion Tiles, V2 Salon Scroll Tray, V3 Secession Quadratstil Tiles)
 */

import {
  type Palette,
  seasonalCluster,
  writeSeasonalSvg,
} from "./build-wave1-svgs"

/**
 * TABS V1: Open-Bottom Arched Botanical Transom Active Trigger (viewBox 0 0 160 52, slice 20 24 4 24)
 */
function buildTabsTrigger1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 52">
  <path d="M2.5 52 V18 C2.5 8.5 10.5 2 22 2 H138 C149.5 2 157.5 8.5 157.5 18 V52 Z" fill="${p.ground}"/>
  <path d="M2.5 52 V18 C2.5 8.5 10.5 2 22 2 H138 C149.5 2 157.5 8.5 157.5 18 V52" fill="none" stroke="${p.ink}" stroke-width="1.25"/>
  <path d="M6 52 V19 C6 11.2 12.5 5.5 22.5 5.5 H137.5 C147.5 5.5 154 11.2 154 19 V52" fill="none" stroke="${p.band}" stroke-width="1.7"/>
  <path d="M9.5 52 V20 C9.5 13.5 15 8.8 23 8.8 H137 C145 8.8 150.5 13.5 150.5 20 V52" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="tab1-c">
    <path d="M6 20 C6.8 11.8 12.2 6.8 21 6 C16.5 9.2 14.2 12.8 13.8 18.2 C11.2 16.8 8.5 18 6 20 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
    <circle cx="13" cy="12" r="1.5" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
  </g>
  <use href="#tab1-c" transform="translate(160 0) scale(-1 1)"/>
</svg>`
}

/**
 * TABS V1: Botanical Panel Frame (viewBox 0 0 180 140, slice 32 32)
 */
function buildTabsPanel1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140">
  <rect x="2" y="2" width="176" height="136" rx="5" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <path d="M5.5 5.5H174.5V134.5H5.5ZM9 9V131H171V9Z" fill="${p.band}" fill-rule="evenodd" stroke="${p.ink}" stroke-width="0.55"/>
  <rect x="12.5" y="12.5" width="155" height="115" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="tpnl1-c">
    <path d="M9 9 C20 9.8 27 14 30 22 C31.5 25.8 30.5 29.5 27.5 30.8 C25.5 31.6 23.8 30.5 24 28.8 C25.8 28.2 26.8 25.5 25.5 22.5 C23 16.5 17 13 9 12 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M14.5 13 C20.5 13.5 24.5 17.2 24.5 23 C19.5 22 16 18.5 14.5 13 Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.45"/>
    ${seasonalCluster(p, 27.5, 13.5, 0.72)}
    <circle cx="12.5" cy="12.5" r="1.8" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#tpnl1-c" transform="translate(180 0) scale(-1 1)"/>
  <use href="#tpnl1-c" transform="translate(0 140) scale(1 -1)"/>
  <use href="#tpnl1-c" transform="translate(180 140) scale(-1 -1)"/>
</svg>`
}

/**
 * TABS V2: Salon Cartouche Tray — Strictly Corner-Safe at 16 24 (zero middle-strip diamonds!)
 */
function buildTabsTraySalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 56">
  <rect x="2" y="2" width="236" height="52" rx="10" fill="${p.groundAlt}" stroke="${p.ink}" stroke-width="1.15"/>
  <rect x="5.5" y="5.5" width="229" height="45" rx="7" fill="none" stroke="${p.band}" stroke-width="1.25"/>
  <g id="ttray-c">
    <path d="M5.5 15 C5.5 9.5 9.5 5.5 18 5.5 H5.5 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <circle cx="9.5" cy="9.5" r="1.5" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#ttray-c" transform="translate(240 0) scale(-1 1)"/>
  <use href="#ttray-c" transform="translate(0 56) scale(1 -1)"/>
  <use href="#ttray-c" transform="translate(240 56) scale(-1 -1)"/>
</svg>`
}

/**
 * TABS V2: Active Gilded Stadium Cartouche Trigger (viewBox 0 0 160 48, slice 16 20)
 */
function buildTabsTriggerSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48">
  <defs>
    <linearGradient id="tab-sal-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.ctaFillStart}"/>
      <stop offset="100%" stop-color="${p.ctaFillEnd}"/>
    </linearGradient>
  </defs>
  <path d="M18 2.5 H142 C150.5 2.5 157.5 10 157.5 24 C157.5 38 150.5 45.5 142 45.5 H18 C9.5 45.5 2.5 38 2.5 24 C2.5 10 9.5 2.5 18 2.5 Z" fill="url(#tab-sal-g)" stroke="${p.ink}" stroke-width="1.2"/>
  <path d="M19 6 H141 C147.5 6 153.5 12 153.5 24 C153.5 36 147.5 42 141 42 H19 C12.5 42 6.5 36 6.5 24 C6.5 12 12.5 6 19 6 Z" fill="none" stroke="${p.ground}" stroke-width="0.9" stroke-opacity="0.9"/>
  <circle cx="12.5" cy="24" r="1.9" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
  <circle cx="147.5" cy="24" r="1.9" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
</svg>`
}

/**
 * TABS V2: Salon Passe-Partout Panel (viewBox 0 0 180 140, slice 32 32)
 */
function buildTabsPanelSalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140">
  <rect x="2" y="2" width="176" height="136" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <path d="M5.5 5.5H174.5V134.5H5.5ZM11.5 11.5V128.5H168.5V11.5Z" fill="${p.groundAlt}" fill-rule="evenodd"/>
  <rect x="5.5" y="5.5" width="169" height="129" fill="none" stroke="${p.band}" stroke-width="1.4"/>
  <rect x="11.5" y="11.5" width="157" height="117" fill="none" stroke="${p.inkSoft}" stroke-width="0.6"/>
  <g id="tpnl-sal-c">
    <path d="M11.5 27 C11.5 18.5 18.5 11.5 27 11.5 H11.5 Z" fill="${p.bandLight}" fill-opacity="0.45" stroke="${p.band}" stroke-width="0.55"/>
    <polygon points="11.5,8.5 14.5,11.5 11.5,14.5 8.5,11.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M9.5 11.5 H15 M11.5 9.5 V15" stroke="${p.ink}" stroke-width="0.45"/>
  </g>
  <use href="#tpnl-sal-c" transform="translate(180 0) scale(-1 1)"/>
  <use href="#tpnl-sal-c" transform="translate(0 140) scale(1 -1)"/>
  <use href="#tpnl-sal-c" transform="translate(180 140) scale(-1 -1)"/>
</svg>`
}

/**
 * TABS V3: Open-Bottom Vienna Secession Active Trigger & Panel
 */
function buildTabsTriggerSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48">
  <polygon points="2,48 2,7 7,2 153,2 158,7 158,48" fill="${p.ground}"/>
  <path d="M2 48 V7 L7 2 H153 L158 7 V48" fill="none" stroke="${p.ink}" stroke-width="1.3"/>
  <line x1="6" y1="5.5" x2="154" y2="5.5" stroke="${p.band}" stroke-width="2.2"/>
  <rect x="6" y="9" width="4.8" height="4.8" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
  <rect x="149.2" y="9" width="4.8" height="4.8" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.45"/>
</svg>`
}

function buildTabsPanelSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140">
  <rect x="2" y="2" width="176" height="136" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <rect x="5.5" y="5.5" width="169" height="129" fill="none" stroke="${p.band}" stroke-width="1.8"/>
  <rect x="9.5" y="9.5" width="161" height="121" fill="none" stroke="${p.inkSoft}" stroke-width="0.55"/>
  <g id="tpnl-sec-c">
    <rect x="4" y="4" width="10" height="10" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.65"/>
    <rect x="7" y="7" width="4" height="4" fill="${p.bandDark}"/>
    <rect x="16.5" y="5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="21.5" y="5" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5" y="16.5" width="3.2" height="3.2" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
    <rect x="5" y="21.5" width="3.2" height="3.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.4"/>
  </g>
  <use href="#tpnl-sec-c" transform="translate(180 0) scale(-1 1)"/>
  <use href="#tpnl-sec-c" transform="translate(0 140) scale(1 -1)"/>
  <use href="#tpnl-sec-c" transform="translate(180 140) scale(-1 -1)"/>
</svg>`
}

/**
 * ACCORDION V1: Botanical Folio Plate with seasonalCluster (viewBox 0 0 200 80, slice 24 24)
 */
function buildAccordionItem1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
  <rect x="2" y="2" width="196" height="76" rx="5" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <rect x="5.5" y="5.5" width="189" height="69" rx="3" fill="none" stroke="${p.band}" stroke-width="1.6"/>
  <rect x="8.8" y="8.8" width="182.4" height="62.4" fill="none" stroke="${p.inkSoft}" stroke-width="0.5"/>
  <g id="acc1-c">
    <path d="M5.5 21 C6.2 11.5 11.5 6.2 21 5.5 C16 8.8 13.5 12.2 13 17.5 C10.5 16 8 17.5 5.5 21 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <path d="M10.5 10.5 C15.8 11 19.2 14.2 19.5 19.2 C15 18.5 12 15.5 10.5 10.5 Z" fill="${p.band}" stroke="${p.ink}" stroke-width="0.45"/>
    ${seasonalCluster(p, 19, 9.5, 0.58)}
    <circle cx="8.8" cy="8.8" r="1.6" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
  </g>
  <use href="#acc1-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#acc1-c" transform="translate(0 80) scale(1 -1)"/>
  <use href="#acc1-c" transform="translate(200 80) scale(-1 -1)"/>
</svg>`
}

function buildAccordionGroupSalon(p: Palette): string {
  return buildTabsPanelSalon(p)
}

function buildAccordionItemSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 72">
  <polygon points="7,2 193,2 198,7 198,65 193,70 7,70 2,65 2,7" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <polygon points="9,5 191,5 195,9 195,63 191,67 9,67 5,63 5,9" fill="none" stroke="${p.band}" stroke-width="1.5"/>
  <g id="acc-sec-c">
    <rect x="4.5" y="4.5" width="7.5" height="7.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
    <rect x="6.8" y="6.8" width="3" height="3" fill="${p.bandDark}"/>
    <rect x="14.2" y="5" width="2.8" height="2.8" fill="${p.bandDark}" stroke="${p.ink}" stroke-width="0.4"/>
  </g>
  <use href="#acc-sec-c" transform="translate(200 0) scale(-1 1)"/>
  <use href="#acc-sec-c" transform="translate(0 72) scale(1 -1)"/>
  <use href="#acc-sec-c" transform="translate(200 72) scale(-1 -1)"/>
</svg>`
}

/**
 * BREADCRUMB V2: Interlocking Chevron Ribbon Plaque (viewBox 0 0 140 40, 50% vertical slice 20 18)
 */
function buildBreadcrumbRibbon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40">
  <polygon points="3,3 129,3 137,20 129,37 3,37 10,20" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.25"/>
  <line x1="12" y1="6.5" x2="126" y2="6.5" stroke="${p.band}" stroke-width="1"/>
  <line x1="12" y1="33.5" x2="126" y2="33.5" stroke="${p.band}" stroke-width="1"/>
  <circle cx="14" cy="20" r="1.6" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.45"/>
</svg>`
}

function buildBreadcrumbBarSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48">
  <polygon points="8,2 232,2 238,8 238,40 232,46 8,46 2,40 2,8" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <rect x="5.5" y="5.5" width="229" height="37" fill="none" stroke="${p.band}" stroke-width="1.3"/>
  <g id="bc-sec-c">
    <rect x="4.5" y="4.5" width="6.5" height="6.5" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <rect x="6.5" y="6.5" width="2.5" height="2.5" fill="${p.bandDark}"/>
  </g>
  <use href="#bc-sec-c" transform="translate(240 0) scale(-1 1)"/>
  <use href="#bc-sec-c" transform="translate(0 48) scale(1 -1)"/>
  <use href="#bc-sec-c" transform="translate(240 48) scale(-1 -1)"/>
</svg>`
}

function buildPaginationTile1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="2" y="2" width="60" height="60" rx="8" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="5.5" y="5.5" width="53" height="53" rx="5" fill="none" stroke="${p.band}" stroke-width="1.4"/>
  <g id="pg1-c">
    <path d="M5.5 17 C6.2 10 10 6.2 17 5.5 C13.5 8 11.8 10.5 11.2 14.5 C9.2 13.5 7.2 14.8 5.5 17 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
    <circle cx="8.5" cy="8.5" r="1.4" fill="${p.bandDark}"/>
  </g>
  <use href="#pg1-c" transform="translate(64 0) scale(-1 1)"/>
  <use href="#pg1-c" transform="translate(0 64) scale(1 -1)"/>
  <use href="#pg1-c" transform="translate(64 64) scale(-1 -1)"/>
</svg>`
}

function buildPaginationTileActive1(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="pg1-act" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.ctaFillStart}"/>
      <stop offset="100%" stop-color="${p.ctaFillEnd}"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="8" fill="url(#pg1-act)" stroke="${p.ink}" stroke-width="1.35"/>
  <rect x="5.5" y="5.5" width="53" height="53" rx="5" fill="none" stroke="${p.ground}" stroke-width="1"/>
  <g id="pg1a-c">
    <path d="M5.5 17 C6.2 10 10 6.2 17 5.5 C13.5 8 11.8 10.5 11.2 14.5 C9.2 13.5 7.2 14.8 5.5 17 Z" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="${p.ink}"/>
  </g>
  <use href="#pg1a-c" transform="translate(64 0) scale(-1 1)"/>
  <use href="#pg1a-c" transform="translate(0 64) scale(1 -1)"/>
  <use href="#pg1a-c" transform="translate(64 64) scale(-1 -1)"/>
</svg>`
}

function buildPaginationTraySalon(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 56">
  <path d="M22 2.5 H238 C249 2.5 257.5 11 257.5 28 C257.5 45 249 53.5 238 53.5 H22 C11 53.5 2.5 45 2.5 28 C2.5 11 11 2.5 22 2.5 Z" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.15"/>
  <path d="M23 6.5 H237 C245.5 6.5 253 13.5 253 28 C253 42.5 245.5 49.5 237 49.5 H23 C14.5 49.5 7 42.5 7 28 C7 13.5 14.5 6.5 23 6.5 Z" fill="none" stroke="${p.band}" stroke-width="1.5"/>
  <g id="pgtray-end">
    <path d="M9 28 C9 17.5 15 10.5 24 9.5 C18.5 14 16 20 16 28 C16 36 18.5 42 24 46.5 C15 45.5 9 38.5 9 28 Z" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.55"/>
    <polygon points="15,28 19.5,23.5 24,28 19.5,32.5" fill="${p.band}" stroke="${p.ink}" stroke-width="0.5"/>
  </g>
  <use href="#pgtray-end" transform="translate(260 0) scale(-1 1)"/>
</svg>`
}

function buildPaginationTileSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
  <polygon points="6,2 54,2 58,6 58,54 54,58 6,58 2,54 2,6" fill="${p.ground}" stroke="${p.ink}" stroke-width="1.2"/>
  <rect x="5.5" y="5.5" width="49" height="49" fill="none" stroke="${p.band}" stroke-width="1.2"/>
  <g id="pg-sec-c">
    <rect x="4.2" y="4.2" width="5.2" height="5.2" fill="${p.bandLight}" stroke="${p.ink}" stroke-width="0.5"/>
  </g>
  <use href="#pg-sec-c" transform="translate(60 0) scale(-1 1)"/>
  <use href="#pg-sec-c" transform="translate(0 60) scale(1 -1)"/>
  <use href="#pg-sec-c" transform="translate(60 60) scale(-1 -1)"/>
</svg>`
}

function buildPaginationTileActiveSecession(p: Palette): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
  <defs>
    <linearGradient id="pg-sec-act" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.ctaFillStart}"/>
      <stop offset="100%" stop-color="${p.ctaFillEnd}"/>
    </linearGradient>
  </defs>
  <polygon points="6,2 54,2 58,6 58,54 54,58 6,58 2,54 2,6" fill="url(#pg-sec-act)" stroke="${p.ink}" stroke-width="1.35"/>
  <rect x="5.5" y="5.5" width="49" height="49" fill="none" stroke="${p.ground}" stroke-width="1"/>
  <g id="pg-seca-c">
    <rect x="4.2" y="4.2" width="5.5" height="5.5" fill="${p.ground}" stroke="${p.ink}" stroke-width="0.55"/>
    <rect x="5.8" y="5.8" width="2.3" height="2.3" fill="${p.ink}"/>
  </g>
  <use href="#pg-seca-c" transform="translate(60 0) scale(-1 1)"/>
  <use href="#pg-seca-c" transform="translate(0 60) scale(1 -1)"/>
  <use href="#pg-seca-c" transform="translate(60 60) scale(-1 -1)"/>
</svg>`
}

if (import.meta.main) {
  writeSeasonalSvg("tabs-trigger-1.svg", buildTabsTrigger1)
  writeSeasonalSvg("tabs-panel-1.svg", buildTabsPanel1)
  writeSeasonalSvg("tabs-tray-salon.svg", buildTabsTraySalon)
  writeSeasonalSvg("tabs-trigger-salon.svg", buildTabsTriggerSalon)
  writeSeasonalSvg("tabs-panel-salon.svg", buildTabsPanelSalon)
  writeSeasonalSvg("tabs-trigger-secession.svg", buildTabsTriggerSecession)
  writeSeasonalSvg("tabs-panel-secession.svg", buildTabsPanelSecession)
  writeSeasonalSvg("accordion-item-1.svg", buildAccordionItem1)
  writeSeasonalSvg("accordion-group-salon.svg", buildAccordionGroupSalon)
  writeSeasonalSvg("accordion-item-secession.svg", buildAccordionItemSecession)
  writeSeasonalSvg("breadcrumb-ribbon.svg", buildBreadcrumbRibbon)
  writeSeasonalSvg("breadcrumb-bar-secession.svg", buildBreadcrumbBarSecession)
  writeSeasonalSvg("pagination-tile-1.svg", buildPaginationTile1)
  writeSeasonalSvg("pagination-tile-active-1.svg", buildPaginationTileActive1)
  writeSeasonalSvg("pagination-tray-salon.svg", buildPaginationTraySalon)
  writeSeasonalSvg("pagination-tile-secession.svg", buildPaginationTileSecession)
  writeSeasonalSvg("pagination-tile-active-secession.svg", buildPaginationTileActiveSecession)
}
