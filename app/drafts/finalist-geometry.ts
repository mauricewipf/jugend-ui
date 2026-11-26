import type {
  ColoredSvgLayer,
  ColorToken,
  FrameBuildOptions,
  FramePaths,
} from "./frame-geometry"

const f = (n: number) => Number(n.toFixed(2))

function computeFinalistFlags(opts: FrameBuildOptions) {
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
      : height >= 200 && width >= 250
  const hasBottomCrest =
    forceTopCrest !== undefined
      ? forceTopCrest && height >= 175
      : width >= 310 && height >= 180
  return { hasTopCrest, hasSideFlourish, hasBottomCrest }
}

/** Pointed sculptural petal shape (exact Draft 09 Iris DNA) */
function irisPetal(
  lx: number,
  ly: number,
  dx: number,
  dy: number,
  sz: number
): string {
  return `M ${f(lx)} ${f(ly)} C ${f(lx + dx * sz * 0.7 - dy * sz * 0.35)} ${f(ly + dy * sz * 0.7 + dx * sz * 0.35)}, ${f(lx + dx * sz * 1.15 - dy * sz * 0.15)} ${f(ly + dy * sz * 1.15 + dx * sz * 0.15)}, ${f(lx + dx * sz * 1.25)} ${f(ly + dy * sz * 1.25)} C ${f(lx + dx * sz * 0.85 + dy * sz * 0.4)} ${f(ly + dy * sz * 0.85 - dx * sz * 0.4)}, ${f(lx + dx * sz * 0.3 + dy * sz * 0.35)} ${f(ly + dy * sz * 0.3 - dx * sz * 0.35)}, ${f(lx)} ${f(ly)} Z`
}

/**
 * Push Draft 09's signature sculptural 3-petal Art Nouveau Iris/Tulip blossom
 * with translucent colored petals, crisp outline, and graceful sweeping curved tendril!
 */
function pushIrisBloom(
  layers: ColoredSvgLayer[],
  bx: number,
  by: number,
  angleDeg: number,
  sz: number,
  petalToken: ColorToken,
  tendrilDir: number, // +1 curves clockwise/right, -1 curves counter-clockwise/left, 0 = none
  tendrilLen = 36
) {
  const rad = (angleDeg * Math.PI) / 180
  const rot = (deg: number) => {
    const a = rad + (deg * Math.PI) / 180
    return { dx: Math.cos(a), dy: Math.sin(a) }
  }

  // Sweeping graceful tendril emerging from the bloom base (exact Draft 09 touch!)
  if (tendrilDir !== 0 && tendrilLen > 0) {
    const t1 = rot(tendrilDir * 44)
    const t2 = rot(tendrilDir * 78)
    const t3 = rot(tendrilDir * 102)
    layers.push({
      d: `M ${f(bx)} ${f(by)} C ${f(bx + t1.dx * tendrilLen * 0.42)} ${f(by + t1.dy * tendrilLen * 0.42)}, ${f(bx + t2.dx * tendrilLen * 0.8)} ${f(by + t2.dy * tendrilLen * 0.8)}, ${f(bx + t3.dx * tendrilLen)} ${f(by + t3.dy * tendrilLen)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: sz > 10 ? 1.45 : 1.05,
    })
  }

  const cDir = rot(0)
  const lDir = rot(-34)
  const rDir = rot(34)

  // Outer cupping petals
  layers.push({
    d: irisPetal(bx, by, lDir.dx, lDir.dy, sz * 0.96),
    fill: petalToken,
    fillOpacity: 0.42,
    stroke: "ink",
    strokeWidth: sz > 10 ? 1.3 : 1.0,
  })
  layers.push({
    d: irisPetal(bx, by, rDir.dx, rDir.dy, sz * 0.96),
    fill: petalToken,
    fillOpacity: 0.42,
    stroke: "ink",
    strokeWidth: sz > 10 ? 1.3 : 1.0,
  })
  // Tall center upright iris petal
  layers.push({
    d: irisPetal(bx, by, cDir.dx, cDir.dy, sz * 1.16),
    fill: petalToken,
    fillOpacity: 0.56,
    stroke: "ink",
    strokeWidth: sz > 10 ? 1.35 : 1.05,
  })
}

/**
 * Push Draft 03/06's beloved 5-petal bottom fan-palmette + sweeping tendrils
 */
function pushBottomFan(
  layers: ColoredSvgLayer[],
  cx: number,
  y1: number,
  petalToken: ColorToken,
  accentToken: ColorToken
) {
  const by = y1 + 1
  layers.push({
    d: `M ${f(cx - 48)} ${f(y1)} C ${f(cx - 26)} ${f(y1 - 9.5)}, ${f(cx - 13)} ${f(y1 + 5)}, ${f(cx)} ${f(y1 - 2)} C ${f(cx + 13)} ${f(y1 + 5)}, ${f(cx + 26)} ${f(y1 - 9.5)}, ${f(cx + 48)} ${f(y1)}`,
    fill: "none",
    stroke: "stem",
    strokeWidth: 1.35,
  })
  const specs: Array<[number, number, number, number, ColorToken]> = [
    [-5, -0.92, -0.35, 11, accentToken],
    [5, 0.92, -0.35, 11, accentToken],
    [-2, -0.55, -0.85, 12, petalToken],
    [2, 0.55, -0.85, 12, petalToken],
    [0, 0, -1, 13.5, petalToken],
  ]
  for (const [ox, dx, dy, sz, tok] of specs) {
    layers.push({
      d: irisPetal(cx + ox, by - 1, dx, dy, sz),
      fill: tok,
      fillOpacity: 0.48,
      stroke: "ink",
      strokeWidth: 1.15,
    })
  }
}

/**
 * Push Draft 02/06's beloved top-center wave crest inner ribbon + teardrop bud
 */
function pushTopCrestAccents(
  layers: ColoredSvgLayer[],
  cx: number,
  y0: number,
  cw: number,
  ch: number,
  budToken: ColorToken
) {
  layers.push({
    d: `M ${f(cx - cw * 0.52)} ${f(y0 + 3.5)} C ${f(cx - cw * 0.25)} ${f(y0 + 3.5)}, ${f(cx - cw * 0.16)} ${f(y0 - ch * 0.25)}, ${f(cx)} ${f(y0 - ch * 0.52)} C ${f(cx + cw * 0.16)} ${f(y0 - ch * 0.25)}, ${f(cx + cw * 0.25)} ${f(y0 + 3.5)}, ${f(cx + cw * 0.52)} ${f(y0 + 3.5)}`,
    fill: "none",
    stroke: "stem",
    strokeWidth: 1.25,
  })
  layers.push({
    d: `M ${f(cx)} ${f(y0 - ch * 0.96)} C ${f(cx + 3.5)} ${f(y0 - ch * 0.52)}, ${f(cx + 3)} ${f(y0 - ch * 0.16)}, ${f(cx)} ${f(y0 - ch * 0.1)} C ${f(cx - 3)} ${f(y0 - ch * 0.16)}, ${f(cx - 3.5)} ${f(y0 - ch * 0.52)}, ${f(cx)} ${f(y0 - ch * 0.96)} Z`,
    fill: budToken,
    fillOpacity: 0.6,
    stroke: "ink",
    strokeWidth: 1.05,
  })
}

/**
 * Draft 18: "Asymmetrische Synthese"
 * Direct fusion of ALL user favorites:
 * - Draft 08's diagonal calligraphic brush swells (TL & BR)
 * - Draft 06's open crossing calligraphic loops (TR & BL)
 * - Draft 02/06's wave crest with teardrop bud at top center
 * - Draft 09's sculptural 3-petal Iris blossoms + sweeping tendril (asymmetric TL & BR)
 * - Draft 03/06's 5-petal fan-palmette at bottom center
 */
export function buildAsymmetrischeSynthese(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeFinalistFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 32, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showTop = hasTopCrest && innerW >= 245
  const showBot = hasBottomCrest && innerW >= 255

  const rBig = scale === "button" ? 13 : Math.min(30, innerH * 0.24)
  const cLoop =
    scale === "button"
      ? Math.min(11, innerH * 0.34, innerW * 0.14)
      : Math.min(22, innerH * 0.22, innerW * 0.15)
  const rL = cLoop * 0.52

  // Continuous hybrid asymmetric path:
  // TL = sweeping calligraphic curve, TR = Draft 06 open loop,
  // BR = sweeping calligraphic curve, BL = Draft 06 open loop!
  const p: string[] = []
  p.push(`M ${f(x0 + rBig)} ${f(y0)}`)

  const cw = Math.min(70, innerW * 0.22)
  const ch = Math.min(17, cw * 0.24)
  if (showTop) {
    p.push(`L ${f(cx - cw)} ${f(y0)}`)
    p.push(
      `C ${f(cx - cw * 0.65)} ${f(y0)}, ${f(cx - cw * 0.48)} ${f(y0 - ch)}, ${f(cx - cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    p.push(
      `C ${f(cx - cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx - cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx)} ${f(y0 - ch * 1.25)}`
    )
    p.push(
      `C ${f(cx + cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx + cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx + cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    p.push(
      `C ${f(cx + cw * 0.48)} ${f(y0 - ch)}, ${f(cx + cw * 0.65)} ${f(y0)}, ${f(cx + cw)} ${f(y0)}`
    )
  }
  p.push(`L ${f(x1 - cLoop)} ${f(y0)}`)

  // TR: Draft 01/06 open crossing loop
  p.push(
    `C ${f(x1 - cLoop * 0.22)} ${f(y0)}, ${f(x1 + rL * 0.45)} ${f(y0)}, ${f(x1 + rL * 0.85)} ${f(y0 - rL * 0.44)}`
  )
  p.push(
    `C ${f(x1 + rL * 1.14)} ${f(y0 - rL * 0.82)}, ${f(x1 + rL * 0.52)} ${f(y0 - rL * 1.22)}, ${f(x1 + rL * 0.14)} ${f(y0 - rL * 0.76)}`
  )
  p.push(
    `C ${f(x1 - rL * 0.15)} ${f(y0 - rL * 0.38)}, ${f(x1)} ${f(y0 + cLoop * 0.28)}, ${f(x1)} ${f(y0 + cLoop)}`
  )

  p.push(`L ${f(x1)} ${f(y1 - rBig)}`)
  // BR: Sweeping calligraphic curve
  p.push(
    `C ${f(x1)} ${f(y1 - rBig * 0.24)}, ${f(x1 - rBig * 0.24)} ${f(y1)}, ${f(x1 - rBig)} ${f(y1)}`
  )
  p.push(`L ${f(x0 + cLoop)} ${f(y1)}`)

  // BL: Draft 01/06 open crossing loop
  p.push(
    `C ${f(x0 + cLoop * 0.22)} ${f(y1)}, ${f(x0 - rL * 0.45)} ${f(y1)}, ${f(x0 - rL * 0.85)} ${f(y1 + rL * 0.44)}`
  )
  p.push(
    `C ${f(x0 - rL * 1.14)} ${f(y1 + rL * 0.82)}, ${f(x0 - rL * 0.52)} ${f(y1 + rL * 1.22)}, ${f(x0 - rL * 0.14)} ${f(y1 + rL * 0.76)}`
  )
  p.push(
    `C ${f(x0 + rL * 0.15)} ${f(y1 + rL * 0.38)}, ${f(x0)} ${f(y1 - cLoop * 0.28)}, ${f(x0)} ${f(y1 - cLoop)}`
  )

  p.push(`L ${f(x0)} ${f(y0 + rBig)}`)
  // TL: Sweeping calligraphic curve
  p.push(
    `C ${f(x0)} ${f(y0 + rBig * 0.24)}, ${f(x0 + rBig * 0.24)} ${f(y0)}, ${f(x0 + rBig)} ${f(y0)} Z`
  )

  // Clean inner ground fill
  const fillPath = `M ${f(x0 + rBig)} ${f(y0)} L ${f(x1 - 8)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + 8)} L ${f(x1)} ${f(y1 - rBig)} Q ${f(x1)} ${f(y1)} ${f(x1 - rBig)} ${f(y1)} L ${f(x0 + 8)} ${f(y1)} Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - 8)} L ${f(x0)} ${f(y0 + rBig)} Q ${f(x0)} ${f(y0)} ${f(x0 + rBig)} ${f(y0)} Z`

  // Draft 08 bold variable-width asymmetric brush sweeps on TL & BR!
  const sw = showTop ? Math.min(115, innerW * 0.28) : Math.min(38, innerW * 0.24)
  const sh = showTop ? Math.min(62, innerH * 0.3) : Math.min(22, innerH * 0.5)
  const thick = scale === "button" ? 3.8 : showTop ? 6.8 : 4.8

  const solidFills: string[] = [
    // TL bold tapered brush sweep
    [
      `M ${f(x0 - 1.5)} ${f(y0 + sh)}`,
      `C ${f(x0 - 2.5)} ${f(y0 + sh * 0.22)}, ${f(x0 + sw * 0.08)} ${f(y0 - 3)}, ${f(x0 + sw * 0.44)} ${f(y0 - 2)}`,
      `C ${f(x0 + sw * 0.74)} ${f(y0 - 1.5)}, ${f(x0 + sw * 0.9)} ${f(y0)}, ${f(x0 + sw)} ${f(y0)}`,
      `C ${f(x0 + sw * 0.7)} ${f(y0 + 2.5)}, ${f(x0 + sw * 0.45)} ${f(y0 + thick * 0.82)}, ${f(x0 + sw * 0.24)} ${f(y0 + thick * 1.05)}`,
      `C ${f(x0 + thick * 1.05)} ${f(y0 + thick * 1.2)}, ${f(x0 + thick * 0.78)} ${f(y0 + sh * 0.42)}, ${f(x0 + 0.8)} ${f(y0 + sh)} Z`,
    ].join(" "),
    // BR counter-balancing tapered brush sweep
    [
      `M ${f(x1 + 1.5)} ${f(y1 - sh * 0.9)}`,
      `C ${f(x1 + 2.5)} ${f(y1 - sh * 0.2)}, ${f(x1 - sw * 0.08)} ${f(y1 + 3)}, ${f(x1 - sw * 0.44)} ${f(y1 + 2)}`,
      `C ${f(x1 - sw * 0.74)} ${f(y1 + 1.5)}, ${f(x1 - sw * 0.9)} ${f(y1)}, ${f(x1 - sw)} ${f(y1)}`,
      `C ${f(x1 - sw * 0.7)} ${f(y1 - 2.5)}, ${f(x1 - sw * 0.45)} ${f(y1 - thick * 0.82)}, ${f(x1 - sw * 0.24)} ${f(y1 - thick * 1.05)}`,
      `C ${f(x1 - thick * 1.05)} ${f(y1 - thick * 1.2)}, ${f(x1 - thick * 0.78)} ${f(y1 - sh * 0.38)}, ${f(x1 - 0.8)} ${f(y1 - sh * 0.9)} Z`,
    ].join(" "),
  ]

  const colorLayers: ColoredSvgLayer[] = []

  // Top crest inner ribbon + teardrop bud (Draft 02/06)
  if (showTop) {
    pushTopCrestAccents(colorLayers, cx, y0, cw, ch, "petalPrimary")
  }

  // Sculptural 3-petal Draft 09 Iris blooms perched asymmetrically on TL & BR!
  if (scale === "button") {
    pushIrisBloom(colorLayers, x0 + 6, y0 + 5, -135, 6.2, "petalPrimary", 0, 0)
  } else if (showTop) {
    // Hero 3-petal Iris rising gracefully from the top-left brush sweep!
    pushIrisBloom(colorLayers, x0 + 8, y0 + 6, -125, 13.5, "petalPrimary", 1, 42)
    // Secondary smaller 3-petal Iris echoing softly from the bottom-right sweep!
    pushIrisBloom(colorLayers, x1 - 8, y1 - 6, 55, 10.5, "petalSecondary", 1, 28)
  } else {
    // Small tile: one crisp 3-petal Iris at top-left
    pushIrisBloom(colorLayers, x0 + 6, y0 + 5, -128, 8.8, "petalPrimary", 1, 20)
  }

  // Bottom 5-petal fan-palmette (Draft 03/06)
  if (showBot) {
    pushBottomFan(colorLayers, cx, y1, "petalSecondary", "petalPrimary")
  }

  return {
    fillPath,
    primaryStrokes: [p.join(" ")],
    accentStrokes: [],
    accentFills: [],
    solidFills,
    colorLayers,
    strokeWidth: scale === "button" ? 1.5 : 1.85,
    accentStrokeWidth: 1.2,
    hasTopCrest: showTop,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 19: "Offene Iris-Asymmetrie"
 * Combines:
 * - OPEN AT THE BOTTOM (nach unten geöffnet, like Image 5!)
 * - Draft 08's asymmetric variable-width brush sweep across top-left!
 * - Draft 02/06's top wave crest with teardrop bud!
 * - Draft 09's iconic sculptural 3-petal Iris blossoms + sweeping tendrils!
 * - Outward-curled open whiplash feet at bottom-left & bottom-right!
 */
export function buildOffeneIrisAsymmetrie(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish } = computeFinalistFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 32, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showTop = hasTopCrest && innerW >= 245
  const showSide = hasSideFlourish && innerH >= 175

  const rBig = scale === "button" ? 12 : Math.min(28, innerH * 0.24)
  const rRight = scale === "button" ? 9 : Math.min(18, innerH * 0.18)
  const foot = scale === "button" ? 6 : showTop ? 20 : 10

  // Soft ground fading cleanly into the open bottom
  const fillPath = `M ${f(x0 + rBig)} ${f(y0)} L ${f(x1 - rRight)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + rRight)} L ${f(x1)} ${f(y1 - 4)} L ${f(x0)} ${f(y1 - 4)} L ${f(x0)} ${f(y0 + rBig)} Q ${f(x0)} ${f(y0)} ${f(x0 + rBig)} ${f(y0)} Z`

  // Open-bottom continuous asymmetric frame rail:
  // Starts at bottom-left curled whiplash foot -> climbs left stem -> top-left bold curve ->
  // optional Draft 02/06 top wave crest -> right open calligraphic loop -> right stem ->
  // finishes at bottom-right curled whiplash foot (leaving entire bottom OPEN!)
  const cw = Math.min(68, innerW * 0.21)
  const ch = Math.min(16, cw * 0.24)
  const cLoop = scale === "button" ? 10 : 20
  const rL = cLoop * 0.52

  const openPath: string[] = [
    // Left open bottom curled foot
    `M ${f(x0 - foot * 0.65)} ${f(y1 + 2)}`,
    `C ${f(x0 - foot * 0.12)} ${f(y1 + 5)}, ${f(x0)} ${f(y1 - 12)}, ${f(x0)} ${f(y1 - 26)}`,
    `L ${f(x0)} ${f(y0 + rBig)}`,
    `C ${f(x0)} ${f(y0 + rBig * 0.25)}, ${f(x0 + rBig * 0.25)} ${f(y0)}, ${f(x0 + rBig)} ${f(y0)}`,
  ]

  if (showTop) {
    openPath.push(`L ${f(cx - cw)} ${f(y0)}`)
    openPath.push(
      `C ${f(cx - cw * 0.65)} ${f(y0)}, ${f(cx - cw * 0.48)} ${f(y0 - ch)}, ${f(cx - cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    openPath.push(
      `C ${f(cx - cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx - cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx)} ${f(y0 - ch * 1.25)}`
    )
    openPath.push(
      `C ${f(cx + cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx + cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx + cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    openPath.push(
      `C ${f(cx + cw * 0.48)} ${f(y0 - ch)}, ${f(cx + cw * 0.65)} ${f(y0)}, ${f(cx + cw)} ${f(y0)}`
    )
  }

  openPath.push(`L ${f(x1 - cLoop)} ${f(y0)}`)
  // Top-right open crossing calligraphic loop (creating poetic asymmetry against top-left brush+iris!)
  openPath.push(
    `C ${f(x1 - cLoop * 0.22)} ${f(y0)}, ${f(x1 + rL * 0.45)} ${f(y0)}, ${f(x1 + rL * 0.85)} ${f(y0 - rL * 0.44)}`
  )
  openPath.push(
    `C ${f(x1 + rL * 1.14)} ${f(y0 - rL * 0.82)}, ${f(x1 + rL * 0.52)} ${f(y0 - rL * 1.22)}, ${f(x1 + rL * 0.14)} ${f(y0 - rL * 0.76)}`
  )
  openPath.push(
    `C ${f(x1 - rL * 0.15)} ${f(y0 - rL * 0.38)}, ${f(x1)} ${f(y0 + cLoop * 0.28)}, ${f(x1)} ${f(y0 + cLoop)}`
  )
  // Right stem down to open curled foot (slightly shorter asymmetric feel on large cards!)
  openPath.push(`L ${f(x1)} ${f(y1 - 26)}`)
  openPath.push(
    `C ${f(x1)} ${f(y1 - 12)}, ${f(x1 + foot * 0.12)} ${f(y1 + 5)}, ${f(x1 + foot * 0.65)} ${f(y1 + 2)}`
  )

  // Asymmetric calligraphic brush swell on top-left corner + subtle inner foot curl
  const sw = showTop ? Math.min(120, innerW * 0.29) : Math.min(40, innerW * 0.25)
  const sh = showTop ? Math.min(68, innerH * 0.34) : Math.min(20, innerH * 0.52)
  const thick = scale === "button" ? 3.8 : showTop ? 6.5 : 4.5

  const solidFills: string[] = [
    [
      `M ${f(x0 - 1.5)} ${f(y0 + sh)}`,
      `C ${f(x0 - 2.5)} ${f(y0 + sh * 0.22)}, ${f(x0 + sw * 0.08)} ${f(y0 - 3)}, ${f(x0 + sw * 0.44)} ${f(y0 - 2)}`,
      `C ${f(x0 + sw * 0.74)} ${f(y0 - 1.5)}, ${f(x0 + sw * 0.9)} ${f(y0)}, ${f(x0 + sw)} ${f(y0)}`,
      `C ${f(x0 + sw * 0.7)} ${f(y0 + 2.5)}, ${f(x0 + sw * 0.45)} ${f(y0 + thick * 0.82)}, ${f(x0 + sw * 0.24)} ${f(y0 + thick * 1.05)}`,
      `C ${f(x0 + thick * 1.05)} ${f(y0 + thick * 1.2)}, ${f(x0 + thick * 0.78)} ${f(y0 + sh * 0.42)}, ${f(x0 + 0.8)} ${f(y0 + sh)} Z`,
    ].join(" "),
  ]

  const colorLayers: ColoredSvgLayer[] = []

  // Delicate secondary companion stem running inside left rail on large cards
  if (showTop) {
    pushTopCrestAccents(colorLayers, cx, y0, cw, ch, "petalPrimary")
    colorLayers.push({
      d: `M ${f(x0 + 4.5)} ${f(y0 + sh * 0.75)} L ${f(x0 + 4.5)} ${f(y1 - 20)} C ${f(x0 + 4.5)} ${f(y1 - 4)}, ${f(x0 + 18)} ${f(y1 + 4)}, ${f(x0 + 26)} ${f(y1 - 2)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 1.35,
    })
    colorLayers.push({
      d: `M ${f(x1 - 4.5)} ${f(y0 + cLoop + 10)} L ${f(x1 - 4.5)} ${f(y1 - 20)} C ${f(x1 - 4.5)} ${f(y1 - 4)}, ${f(x1 - 18)} ${f(y1 + 4)}, ${f(x1 - 26)} ${f(y1 - 2)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 1.15,
    })
  }

  // Draft 09 Sculptural 3-petal Iris blossoms!
  if (scale === "button") {
    pushIrisBloom(colorLayers, x0 + 6, y0 + 5, -132, 6.2, "petalPrimary", 0, 0)
  } else if (showTop) {
    // Hero 3-petal Iris crowning the bold top-left brush sweep
    pushIrisBloom(colorLayers, x0 + 9, y0 + 7, -122, 14.5, "petalPrimary", 1, 46)
    // Secondary asymmetric 3-petal Iris sprouting midway down the left or right stem
    if (showSide) {
      pushIrisBloom(colorLayers, x0 + 4, cy - 10, -42, 9.5, "petalSecondary", 1, 22)
      pushIrisBloom(colorLayers, x1 - 4, cy + 16, -138, 9.5, "petalPrimary", -1, 22)
    }
  } else {
    // Small tile: clean open-bottom asymmetric arch + single 3-petal Iris at top-left
    pushIrisBloom(colorLayers, x0 + 6, y0 + 5, -126, 9.0, "petalPrimary", 1, 22)
  }

  return {
    fillPath,
    primaryStrokes: [openPath.join(" ")],
    accentStrokes: [],
    accentFills: [],
    solidFills,
    colorLayers,
    strokeWidth: scale === "button" ? 1.55 : 1.9,
    accentStrokeWidth: 1.2,
    hasTopCrest: showTop,
    hasSideFlourish: showTop && showSide,
    hasBottomCrest: false,
  }
}

/**
 * Draft 20: "Jugend-Synthese · Iris"
 * The refined symmetrical evolution of Draft 06 (which the user explicitly said "ist gut, geht in die richtige Richtung"):
 * - Keeps Draft 06's exact open crossing corner loops + inner volutes + top wave crest + 5-petal bottom fan
 * - Adds Draft 09's sculptural 3-petal Iris blossoms & sweeping tendrils nestled cleanly at the top shoulders
 * - Supports subtle multi-color accents (gorgeous in Mitternacht Pfau, Salbei · Bunt, Poster Salbei & Mucha Koralle!)
 */
export function buildSyntheseIris(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeFinalistFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const c =
    scale === "button"
      ? Math.min(12, innerH * 0.34, innerW * 0.15)
      : Math.min(24, innerH * 0.24, innerW * 0.16)
  const r = c * 0.52

  const showTop = hasTopCrest && innerW >= 240
  const showBot = hasBottomCrest && innerW >= 250

  const cw = Math.min(72, innerW * 0.22)
  const ch = Math.min(17, cw * 0.24)

  const segs: string[] = [`M ${f(x0 + c)} ${f(y0)}`]

  if (showTop) {
    segs.push(`L ${f(cx - cw)} ${f(y0)}`)
    segs.push(
      `C ${f(cx - cw * 0.65)} ${f(y0)}, ${f(cx - cw * 0.48)} ${f(y0 - ch)}, ${f(cx - cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    segs.push(
      `C ${f(cx - cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx - cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx)} ${f(y0 - ch * 1.25)}`
    )
    segs.push(
      `C ${f(cx + cw * 0.08)} ${f(y0 - ch * 1.15)}, ${f(cx + cw * 0.1)} ${f(y0 - ch * 0.55)}, ${f(cx + cw * 0.24)} ${f(y0 - ch * 0.72)}`
    )
    segs.push(
      `C ${f(cx + cw * 0.48)} ${f(y0 - ch)}, ${f(cx + cw * 0.65)} ${f(y0)}, ${f(cx + cw)} ${f(y0)}`
    )
  }
  segs.push(`L ${f(x1 - c)} ${f(y0)}`)

  // TR loop
  segs.push(
    `C ${f(x1 - c * 0.22)} ${f(y0)}, ${f(x1 + r * 0.45)} ${f(y0)}, ${f(x1 + r * 0.85)} ${f(y0 - r * 0.44)}`
  )
  segs.push(
    `C ${f(x1 + r * 1.14)} ${f(y0 - r * 0.82)}, ${f(x1 + r * 0.52)} ${f(y0 - r * 1.22)}, ${f(x1 + r * 0.14)} ${f(y0 - r * 0.76)}`
  )
  segs.push(
    `C ${f(x1 - r * 0.15)} ${f(y0 - r * 0.38)}, ${f(x1)} ${f(y0 + c * 0.28)}, ${f(x1)} ${f(y0 + c)}`
  )

  segs.push(`L ${f(x1)} ${f(y1 - c)}`)

  // BR loop
  segs.push(
    `C ${f(x1)} ${f(y1 - c * 0.22)}, ${f(x1)} ${f(y1 + r * 0.45)}, ${f(x1 + r * 0.44)} ${f(y1 + r * 0.85)}`
  )
  segs.push(
    `C ${f(x1 + r * 0.82)} ${f(y1 + r * 1.14)}, ${f(x1 + r * 1.22)} ${f(y1 + r * 0.52)}, ${f(x1 + r * 0.76)} ${f(y1 + r * 0.14)}`
  )
  segs.push(
    `C ${f(x1 + r * 0.38)} ${f(y1 - r * 0.15)}, ${f(x1 - c * 0.28)} ${f(y1)}, ${f(x1 - c)} ${f(y1)}`
  )

  segs.push(`L ${f(x0 + c)} ${f(y1)}`)

  // BL loop
  segs.push(
    `C ${f(x0 + c * 0.22)} ${f(y1)}, ${f(x0 - r * 0.45)} ${f(y1)}, ${f(x0 - r * 0.85)} ${f(y1 + r * 0.44)}`
  )
  segs.push(
    `C ${f(x0 - r * 1.14)} ${f(y1 + r * 0.82)}, ${f(x0 - r * 0.52)} ${f(y1 + r * 1.22)}, ${f(x0 - r * 0.14)} ${f(y1 + r * 0.76)}`
  )
  segs.push(
    `C ${f(x0 + r * 0.15)} ${f(y1 + r * 0.38)}, ${f(x0)} ${f(y1 - c * 0.28)}, ${f(x0)} ${f(y1 - c)}`
  )

  segs.push(`L ${f(x0)} ${f(y0 + c)}`)

  // TL loop
  segs.push(
    `C ${f(x0)} ${f(y0 + c * 0.22)}, ${f(x0)} ${f(y0 - r * 0.45)}, ${f(x0 - r * 0.44)} ${f(y0 - r * 0.85)}`
  )
  segs.push(
    `C ${f(x0 - r * 0.82)} ${f(y0 - r * 1.14)}, ${f(x0 - r * 1.22)} ${f(y0 - r * 0.52)}, ${f(x0 - r * 0.76)} ${f(y0 - r * 0.14)}`
  )
  segs.push(
    `C ${f(x0 - r * 0.38)} ${f(y0 + r * 0.15)}, ${f(x0 + c * 0.28)} ${f(y0)}, ${f(x0 + c)} ${f(y0)} Z`
  )

  const vc = c * 0.82
  const colorLayers: ColoredSvgLayer[] = [
    // Inner volute corner echoes in stem color
    {
      d: `M ${f(x0 + vc * 1.15)} ${f(y0 + 3.5)} C ${f(x0 + vc * 0.42)} ${f(y0 + 3.5)}, ${f(x0 + 3.5)} ${f(y0 + vc * 0.42)}, ${f(x0 + 3.5)} ${f(y0 + vc * 1.1)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: scale === "button" ? 1.0 : 1.3,
    },
    {
      d: `M ${f(x1 - vc * 1.15)} ${f(y0 + 3.5)} C ${f(x1 - vc * 0.42)} ${f(y0 + 3.5)}, ${f(x1 - 3.5)} ${f(y0 + vc * 0.42)}, ${f(x1 - 3.5)} ${f(y0 + vc * 1.1)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: scale === "button" ? 1.0 : 1.3,
    },
    {
      d: `M ${f(x1 - vc * 1.05)} ${f(y1 - 3.5)} C ${f(x1 - vc * 0.38)} ${f(y1 - 3.5)}, ${f(x1 - 3.5)} ${f(y1 - vc * 0.38)}, ${f(x1 - 3.5)} ${f(y1 - vc * 0.95)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: scale === "button" ? 1.0 : 1.25,
    },
    {
      d: `M ${f(x0 + vc * 1.05)} ${f(y1 - 3.5)} C ${f(x0 + vc * 0.38)} ${f(y1 - 3.5)}, ${f(x0 + 3.5)} ${f(y1 - vc * 0.38)}, ${f(x0 + 3.5)} ${f(y1 - vc * 0.95)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: scale === "button" ? 1.0 : 1.25,
    },
  ]

  if (showTop) {
    pushTopCrestAccents(colorLayers, cx, y0, cw, ch, "petalPrimary")
    // Paired sculptural 3-petal Draft 09 Iris blooms perched cleanly on both top shoulders!
    pushIrisBloom(colorLayers, x0 + 18, y0 + 14, 138, 10.5, "petalPrimary", -1, 28)
    pushIrisBloom(colorLayers, x1 - 18, y0 + 14, 42, 10.5, "petalSecondary", 1, 28)
  }

  if (showBot) {
    pushBottomFan(colorLayers, cx, y1, "petalSecondary", "petalPrimary")
  }

  const br = scale === "button" ? 5 : 9
  const fillPath = `M ${f(x0 + br)} ${f(y0)} L ${f(x1 - br)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + br)} L ${f(x1)} ${f(y1 - br)} Q ${f(x1)} ${f(y1)} ${f(x1 - br)} ${f(y1)} L ${f(x0 + br)} ${f(y1)} Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - br)} L ${f(x0)} ${f(y0 + br)} Q ${f(x0)} ${f(y0)} ${f(x0 + br)} ${f(y0)} Z`

  return {
    fillPath,
    primaryStrokes: [segs.join(" ")],
    accentStrokes: [],
    accentFills: [],
    solidFills: [],
    colorLayers,
    strokeWidth: scale === "button" ? 1.6 : 1.95,
    accentStrokeWidth: 1.25,
    hasTopCrest: showTop,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}
