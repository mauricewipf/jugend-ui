import type { FrameBuildOptions, FramePaths } from "./frame-geometry"

const f = (n: number) => Number(n.toFixed(2))

function computeWildFlags(opts: FrameBuildOptions) {
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

const leafShape = (
  lx: number,
  ly: number,
  dx: number,
  dy: number,
  sz: number
) =>
  `M ${f(lx)} ${f(ly)} C ${f(lx + dx * sz * 0.7 - dy * sz * 0.35)} ${f(ly + dy * sz * 0.7 + dx * sz * 0.35)}, ${f(lx + dx * sz * 1.15 - dy * sz * 0.15)} ${f(ly + dy * sz * 1.15 + dx * sz * 0.15)}, ${f(lx + dx * sz * 1.25)} ${f(ly + dy * sz * 1.25)} C ${f(lx + dx * sz * 0.85 + dy * sz * 0.4)} ${f(ly + dy * sz * 0.85 - dx * sz * 0.4)}, ${f(lx + dx * sz * 0.3 + dy * sz * 0.35)} ${f(ly + dy * sz * 0.3 - dx * sz * 0.35)}, ${f(lx)} ${f(ly)} Z`

/**
 * Draft 06: "Jugend-Synthese" (User's Favorite Mix!)
 * Combines:
 * - Hybrid open-loop + volute corners (from Draft 01 & Draft 02)
 * - Draft 02's beloved top-center wave crest + teardrop bud + inner ribbon
 * - Draft 03's beloved 5-petal fan-palmette + sweeping tendrils at bottom center
 */
export function buildSynthese(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeWildFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 28, w - m)
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

  // Continuous outer frame with Draft 01 open crossing loops + Draft 02 top crest
  const segs: string[] = []
  segs.push(`M ${f(x0 + c)} ${f(y0)}`)

  // TOP EDGE with Draft 02 wave crest
  if (showTop) {
    const cw = Math.min(72, innerW * 0.22)
    const ch = Math.min(17, cw * 0.24)
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

  // TOP-RIGHT open loop
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

  // BOTTOM-RIGHT open loop
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

  // BOTTOM-LEFT open loop
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

  // TOP-LEFT open loop
  segs.push(
    `C ${f(x0)} ${f(y0 + c * 0.22)}, ${f(x0)} ${f(y0 - r * 0.45)}, ${f(x0 - r * 0.44)} ${f(y0 - r * 0.85)}`
  )
  segs.push(
    `C ${f(x0 - r * 0.82)} ${f(y0 - r * 1.14)}, ${f(x0 - r * 1.22)} ${f(y0 - r * 0.52)}, ${f(x0 - r * 0.76)} ${f(y0 - r * 0.14)}`
  )
  segs.push(
    `C ${f(x0 - r * 0.38)} ${f(y0 + r * 0.15)}, ${f(x0 + c * 0.28)} ${f(y0)}, ${f(x0 + c)} ${f(y0)} Z`
  )

  // Inner Draft 02 volute corner accents
  const vc = c * 0.82
  const accentStrokes: string[] = [
    // TL inner volute
    `M ${f(x0 + vc * 1.15)} ${f(y0 + 3.5)} C ${f(x0 + vc * 0.42)} ${f(y0 + 3.5)}, ${f(x0 + 3.5)} ${f(y0 + vc * 0.42)}, ${f(x0 + 3.5)} ${f(y0 + vc * 1.1)}`,
    // TR inner volute
    `M ${f(x1 - vc * 1.15)} ${f(y0 + 3.5)} C ${f(x1 - vc * 0.42)} ${f(y0 + 3.5)}, ${f(x1 - 3.5)} ${f(y0 + vc * 0.42)}, ${f(x1 - 3.5)} ${f(y0 + vc * 1.1)}`,
    // BR inner arc
    `M ${f(x1 - vc * 1.05)} ${f(y1 - 3.5)} C ${f(x1 - vc * 0.38)} ${f(y1 - 3.5)}, ${f(x1 - 3.5)} ${f(y1 - vc * 0.38)}, ${f(x1 - 3.5)} ${f(y1 - vc * 0.95)}`,
    // BL inner arc
    `M ${f(x0 + vc * 1.05)} ${f(y1 - 3.5)} C ${f(x0 + vc * 0.38)} ${f(y1 - 3.5)}, ${f(x0 + 3.5)} ${f(y1 - vc * 0.38)}, ${f(x0 + 3.5)} ${f(y1 - vc * 0.95)}`,
  ]

  if (scale !== "button") {
    // Delicate inner spiral dots in TL & TR (Draft 02 touch)
    accentStrokes.push(
      `M ${f(x0 + vc * 0.74)} ${f(y0 + vc * 0.3)} C ${f(x0 + vc * 0.3)} ${f(y0 + vc * 0.24)}, ${f(x0 + vc * 0.22)} ${f(y0 + vc * 0.72)}, ${f(x0 + vc * 0.56)} ${f(y0 + vc * 0.68)} C ${f(x0 + vc * 0.74)} ${f(y0 + vc * 0.64)}, ${f(x0 + vc * 0.68)} ${f(y0 + vc * 0.44)}, ${f(x0 + vc * 0.5)} ${f(y0 + vc * 0.48)}`
    )
    accentStrokes.push(
      `M ${f(x1 - vc * 0.74)} ${f(y0 + vc * 0.3)} C ${f(x1 - vc * 0.3)} ${f(y0 + vc * 0.24)}, ${f(x1 - vc * 0.22)} ${f(y0 + vc * 0.72)}, ${f(x1 - vc * 0.56)} ${f(y0 + vc * 0.68)} C ${f(x1 - vc * 0.74)} ${f(y0 + vc * 0.64)}, ${f(x1 - vc * 0.68)} ${f(y0 + vc * 0.44)}, ${f(x1 - vc * 0.5)} ${f(y0 + vc * 0.48)}`
    )
  }

  const accentFills: string[] = []

  // Top crest inner ribbon + teardrop (Draft 02)
  if (showTop) {
    const cw = Math.min(72, innerW * 0.22)
    const ch = Math.min(17, cw * 0.24)
    accentStrokes.push(
      `M ${f(cx - cw * 0.52)} ${f(y0 + 3.5)} C ${f(cx - cw * 0.25)} ${f(y0 + 3.5)}, ${f(cx - cw * 0.16)} ${f(y0 - ch * 0.25)}, ${f(cx)} ${f(y0 - ch * 0.52)} C ${f(cx + cw * 0.16)} ${f(y0 - ch * 0.25)}, ${f(cx + cw * 0.25)} ${f(y0 + 3.5)}, ${f(cx + cw * 0.52)} ${f(y0 + 3.5)}`
    )
    accentFills.push(
      `M ${f(cx)} ${f(y0 - ch * 0.96)} C ${f(cx + 3.4)} ${f(y0 - ch * 0.52)}, ${f(cx + 2.9)} ${f(y0 - ch * 0.16)}, ${f(cx)} ${f(y0 - ch * 0.1)} C ${f(cx - 2.9)} ${f(y0 - ch * 0.16)}, ${f(cx - 3.4)} ${f(y0 - ch * 0.52)}, ${f(cx)} ${f(y0 - ch * 0.96)} Z`
    )
  }

  // Bottom 5-petal fan-palmette + sweeping tendrils (Draft 03)
  if (showBot) {
    const by = y1 + 1
    accentFills.push(leafShape(cx, by - 1, 0, -1, 13))
    accentFills.push(leafShape(cx - 2, by - 1, -0.55, -0.85, 11.5))
    accentFills.push(leafShape(cx + 2, by - 1, 0.55, -0.85, 11.5))
    accentFills.push(leafShape(cx - 5, by - 1, -0.92, -0.35, 11))
    accentFills.push(leafShape(cx + 5, by - 1, 0.92, -0.35, 11))
    accentStrokes.push(
      `M ${f(cx - 46)} ${f(y1)} C ${f(cx - 26)} ${f(y1 - 9.5)}, ${f(cx - 13)} ${f(y1 + 5)}, ${f(cx)} ${f(y1 - 2)} C ${f(cx + 13)} ${f(y1 + 5)}, ${f(cx + 26)} ${f(y1 - 9.5)}, ${f(cx + 46)} ${f(y1)}`
    )
  }

  const br = scale === "button" ? 5 : 9
  const fillPath = `M ${f(x0 + br)} ${f(y0)} L ${f(x1 - br)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + br)} L ${f(x1)} ${f(y1 - br)} Q ${f(x1)} ${f(y1)} ${f(x1 - br)} ${f(y1)} L ${f(x0 + br)} ${f(y1)} Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - br)} L ${f(x0)} ${f(y0 + br)} Q ${f(x0)} ${f(y0)} ${f(x0 + br)} ${f(y0)} Z`

  return {
    fillPath,
    primaryStrokes: [segs.join(" ")],
    accentStrokes,
    accentFills,
    solidFills: [],
    strokeWidth: scale === "button" ? 1.6 : 1.95,
    accentStrokeWidth: scale === "button" ? 1.0 : 1.25,
    hasTopCrest: showTop,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 07: "Kathedrale" (Guimard Arched Portal & Stained-Glass Crown)
 * Radically different silhouette:
 * - Large cards: The ENTIRE top sweeps upward into a sculptural Art Nouveau cathedral / horseshoe arch
 *   with ribbed ironwork spandrels in the upper corners and a delicate apex trefoil/sunburst!
 * - Small tiles: Miniature arched gothic-organic window silhouette (no spandrel ribs or sunburst)
 * - Buttons: Softly vaulted arched pill-plaque with pointed-leaf side finials
 */
export function buildKathedrale(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeWildFlags(opts)

  const m = scale === "button" ? 5 : 10
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showArch = hasTopCrest && innerW >= 240
  const showBot = hasBottomCrest && innerW >= 260

  if (scale === "button") {
    // Elongated gothic-organic jewel arch button (pointed curved ends!)
    const tip = Math.min(13, innerW * 0.14)
    const cy = (y0 + y1) / 2
    const outline = [
      `M ${f(x0 + tip)} ${f(y0)}`,
      `Q ${f(cx)} ${f(y0 - 3)} ${f(x1 - tip)} ${f(y0)}`,
      `C ${f(x1 - tip * 0.35)} ${f(y0)}, ${f(x1)} ${f(cy - 6)}, ${f(x1 + 2)} ${f(cy)}`,
      `C ${f(x1)} ${f(cy + 6)}, ${f(x1 - tip * 0.35)} ${f(y1)}, ${f(x1 - tip)} ${f(y1)}`,
      `Q ${f(cx)} ${f(y1 + 3)} ${f(x0 + tip)} ${f(y1)}`,
      `C ${f(x0 + tip * 0.35)} ${f(y1)}, ${f(x0)} ${f(cy + 6)}, ${f(x0 - 2)} ${f(cy)}`,
      `C ${f(x0)} ${f(cy - 6)}, ${f(x0 + tip * 0.35)} ${f(y0)}, ${f(x0 + tip)} ${f(y0)} Z`,
    ].join(" ")

    const accentStrokes = [
      `M ${f(x0 + tip + 3)} ${f(y0 + 3.5)} C ${f(x0 + 6)} ${f(y0 + 5)}, ${f(x0 + 6)} ${f(y1 - 5)}, ${f(x0 + tip + 3)} ${f(y1 - 3.5)}`,
      `M ${f(x1 - tip - 3)} ${f(y0 + 3.5)} C ${f(x1 - 6)} ${f(y0 + 5)}, ${f(x1 - 6)} ${f(y1 - 5)}, ${f(x1 - tip - 3)} ${f(y1 - 3.5)}`,
    ]

    return {
      fillPath: outline,
      primaryStrokes: [outline],
      accentStrokes,
      accentFills: [],
      solidFills: [],
      strokeWidth: 1.65,
      accentStrokeWidth: 1.0,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Card or Tile: Vaulted Cathedral / Guimard Portal!
  const archDrop = showArch ? Math.min(48, innerH * 0.24) : Math.min(18, innerH * 0.16)
  const archPeak = showArch ? y0 - 16 : y0 - 5
  const shoulderY = y0 + archDrop
  const br = 16

  // Vaulted outer silhouette (pointed ogee / parabolic Art Nouveau arch!)
  const archPath = [
    `M ${f(x0)} ${f(shoulderY)}`,
    // Left sweeping ogee arch up to apex
    `C ${f(x0)} ${f(y0 + archDrop * 0.18)}, ${f(cx - innerW * 0.28)} ${f(y0 - 2)}, ${f(cx)} ${f(archPeak)}`,
    // Right sweeping ogee arch down to right shoulder
    `C ${f(cx + innerW * 0.28)} ${f(y0 - 2)}, ${f(x1)} ${f(y0 + archDrop * 0.18)}, ${f(x1)} ${f(shoulderY)}`,
    `L ${f(x1)} ${f(y1 - br)}`,
    `C ${f(x1)} ${f(y1 - 4)}, ${f(x1 - 4)} ${f(y1)}, ${f(x1 - br)} ${f(y1)}`,
    `L ${f(x0 + br)} ${f(y1)}`,
    `C ${f(x0 + 4)} ${f(y1)}, ${f(x0)} ${f(y1 - 4)}, ${f(x0)} ${f(y1 - br)}`,
    `Z`,
  ].join(" ")

  const primaryStrokes: string[] = [archPath]
  const accentStrokes: string[] = []
  const accentFills: string[] = []

  // Inner concentric arch echo
  const inset = 6
  accentStrokes.push(
    `M ${f(x0 + inset)} ${f(shoulderY + 6)} C ${f(x0 + inset)} ${f(y0 + archDrop * 0.34)}, ${f(cx - innerW * 0.24)} ${f(y0 + 7)}, ${f(cx)} ${f(archPeak + 9)} C ${f(cx + innerW * 0.24)} ${f(y0 + 7)}, ${f(x1 - inset)} ${f(y0 + archDrop * 0.34)}, ${f(x1 - inset)} ${f(shoulderY + 6)}`
  )

  // Architectural spandrel ironwork (ONLY on large cards!)
  if (showArch) {
    // Outer rectangular corner spandrel brackets framing the curved arch (classic Guimard / Mucha portal!)
    const spW = Math.min(86, innerW * 0.2)
    primaryStrokes.push(
      `M ${f(x0)} ${f(shoulderY)} L ${f(x0)} ${f(y0 + 6)} Q ${f(x0)} ${f(y0)} ${f(x0 + 6)} ${f(y0)} L ${f(x0 + spW)} ${f(y0)}`
    )
    primaryStrokes.push(
      `M ${f(x1)} ${f(shoulderY)} L ${f(x1)} ${f(y0 + 6)} Q ${f(x1)} ${f(y0)} ${f(x1 - 6)} ${f(y0)} L ${f(x1 - spW)} ${f(y0)}`
    )
    // Flowing Guimard spandrel tendrils inside top-left & top-right spandrel triangles
    accentStrokes.push(
      `M ${f(x0 + 5)} ${f(y0 + 5)} C ${f(x0 + spW * 0.45)} ${f(y0 + 5)}, ${f(x0 + spW * 0.22)} ${f(y0 + archDrop * 0.55)}, ${f(x0 + 5)} ${f(y0 + archDrop * 0.72)}`
    )
    accentStrokes.push(
      `M ${f(x1 - 5)} ${f(y0 + 5)} C ${f(x1 - spW * 0.45)} ${f(y0 + 5)}, ${f(x1 - spW * 0.22)} ${f(y0 + archDrop * 0.55)}, ${f(x1 - 5)} ${f(y0 + archDrop * 0.72)}`
    )
    // Radiant cathedral apex rosette / sunburst crown
    const ry = archPeak - 3
    accentFills.push(leafShape(cx, ry + 5, 0, -1, 10.5))
    accentFills.push(leafShape(cx - 2, ry + 6, -0.78, -0.62, 8.5))
    accentFills.push(leafShape(cx + 2, ry + 6, 0.78, -0.62, 8.5))
    accentStrokes.push(
      `M ${f(cx - 22)} ${f(archPeak + 4)} A 24 24 0 0 1 ${f(cx + 22)} ${f(archPeak + 4)}`
    )
  }

  // Bottom Gothic-botanical trefoil foot
  if (showBot) {
    accentStrokes.push(
      `M ${f(cx - 48)} ${f(y1 - 5)} C ${f(cx - 22)} ${f(y1 - 5)}, ${f(cx - 12)} ${f(y1 - 13)}, ${f(cx)} ${f(y1 - 13)} C ${f(cx + 12)} ${f(y1 - 13)}, ${f(cx + 22)} ${f(y1 - 5)}, ${f(cx + 48)} ${f(y1 - 5)}`
    )
    accentFills.push(leafShape(cx, y1 - 2, 0, -1, 8))
  }

  return {
    fillPath: archPath,
    primaryStrokes,
    accentStrokes,
    accentFills,
    solidFills: [],
    strokeWidth: 2.0,
    accentStrokeWidth: 1.2,
    hasTopCrest: showArch,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 08: "Seerose" (Bold Asymmetric Calligraphic Whiplash Ribbon)
 * Inspired by reference sheet Row 2 Col 1 & Row 1 Col 4:
 * - Genuinely ASYMMETRIC organic Art Nouveau poster frame!
 * - True thick-to-thin brush/nib ribbon sweeps (using solidFills!) wrapping top-left & bottom-right
 * - Large cards: Dramatic sweeping whiplash ribbon canopy across the top-left & lush counter-wave bottom-right
 * - Small tiles & buttons: Bold asymmetric calligraphic diagonal accents (lush TL & BR swell, razor-fine opposite!)
 */
export function buildSeerose(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish } = computeWildFlags(opts)

  const m = scale === "button" ? 5 : 10
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showSweep = hasTopCrest && innerW >= 240
  const showSide = hasSideFlourish && innerH >= 170

  // Asymmetric organic contour: bigger dramatic curve TL & BR, crisper tucked curves TR & BL
  const rBig = scale === "button" ? 13 : Math.min(34, innerH * 0.25)
  const rSmall = scale === "button" ? 7 : Math.min(16, innerH * 0.14)

  const contour = [
    `M ${f(x0 + rBig)} ${f(y0)}`,
    // Slightly buoyant asymmetric top wave
    `C ${f(x0 + innerW * 0.38)} ${f(y0 - (showSweep ? 8 : 2))}, ${f(x1 - innerW * 0.25)} ${f(y0 + (showSweep ? 5 : 1))}, ${f(x1 - rSmall)} ${f(y0)}`,
    `Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + rSmall)}`,
    `C ${f(x1 + (showSide ? 3 : 0))} ${f(y0 + innerH * 0.52)}, ${f(x1 - (showSide ? 4 : 0))} ${f(y1 - innerH * 0.28)}, ${f(x1)} ${f(y1 - rBig)}`,
    `C ${f(x1)} ${f(y1 - rBig * 0.25)}, ${f(x1 - rBig * 0.25)} ${f(y1)}, ${f(x1 - rBig)} ${f(y1)}`,
    `C ${f(x1 - innerW * 0.36)} ${f(y1 + (showSweep ? 7 : 2))}, ${f(x0 + innerW * 0.26)} ${f(y1 - (showSweep ? 4 : 1))}, ${f(x0 + rSmall)} ${f(y1)}`,
    `Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - rSmall)}`,
    `C ${f(x0 - (showSide ? 4 : 0))} ${f(y1 - innerH * 0.5)}, ${f(x0 + (showSide ? 3 : 0))} ${f(y0 + innerH * 0.3)}, ${f(x0)} ${f(y0 + rBig)}`,
    `C ${f(x0)} ${f(y0 + rBig * 0.25)}, ${f(x0 + rBig * 0.25)} ${f(y0)}, ${f(x0 + rBig)} ${f(y0)} Z`,
  ].join(" ")

  const solidFills: string[] = []
  const accentStrokes: string[] = []

  // Sculptural variable-width calligraphic ribbon on TOP-LEFT!
  const sw = showSweep ? Math.min(140, innerW * 0.36) : Math.min(44, innerW * 0.26)
  const sh = showSweep ? Math.min(72, innerH * 0.34) : Math.min(24, innerH * 0.55)
  const thick = scale === "button" ? 4.2 : showSweep ? 8.5 : 5.5

  // Top-left sweeping thick-to-thin ink whiplash ribbon (filled organic shape!)
  solidFills.push(
    [
      `M ${f(x0 - 2)} ${f(y0 + sh)}`,
      `C ${f(x0 - 3)} ${f(y0 + sh * 0.25)}, ${f(x0 + sw * 0.08)} ${f(y0 - 4)}, ${f(x0 + sw * 0.45)} ${f(y0 - 3)}`,
      `C ${f(x0 + sw * 0.72)} ${f(y0 - 2)}, ${f(x0 + sw * 0.9)} ${f(y0 + 1)}, ${f(x0 + sw)} ${f(y0 - 1)}`,
      // Taper back along inside edge to create dramatic calligraphy stroke width!
      `C ${f(x0 + sw * 0.75)} ${f(y0 + 3)}, ${f(x0 + sw * 0.52)} ${f(y0 + thick * 0.9)}, ${f(x0 + sw * 0.26)} ${f(y0 + thick * 1.15)}`,
      `C ${f(x0 + thick * 1.15)} ${f(y0 + thick * 1.35)}, ${f(x0 + thick * 0.85)} ${f(y0 + sh * 0.42)}, ${f(x0 + 1)} ${f(y0 + sh)} Z`,
    ].join(" ")
  )

  // Bottom-right counter-balancing sweeping thick-to-thin whiplash ribbon!
  solidFills.push(
    [
      `M ${f(x1 + 2)} ${f(y1 - sh * 0.9)}`,
      `C ${f(x1 + 3)} ${f(y1 - sh * 0.22)}, ${f(x1 - sw * 0.08)} ${f(y1 + 4)}, ${f(x1 - sw * 0.45)} ${f(y1 + 3)}`,
      `C ${f(x1 - sw * 0.72)} ${f(y1 + 2)}, ${f(x1 - sw * 0.9)} ${f(y1 - 1)}, ${f(x1 - sw)} ${f(y1 + 1)}`,
      `C ${f(x1 - sw * 0.75)} ${f(y1 - 3)}, ${f(x1 - sw * 0.52)} ${f(y1 - thick * 0.9)}, ${f(x1 - sw * 0.26)} ${f(y1 - thick * 1.15)}`,
      `C ${f(x1 - thick * 1.15)} ${f(y1 - thick * 1.35)}, ${f(x1 - thick * 0.85)} ${f(y1 - sh * 0.38)}, ${f(x1 - 1)} ${f(y1 - sh * 0.9)} Z`,
    ].join(" ")
  )

  // Extra sculptural whiplash tendrils on large cards (flowing across top canopy!)
  if (showSweep) {
    accentStrokes.push(
      `M ${f(x0 + sw * 0.14)} ${f(y0 + thick * 1.6)} C ${f(x0 + sw * 0.45)} ${f(y0 + 26)}, ${f(x0 + innerW * 0.55)} ${f(y0 - 16)}, ${f(x1 - 24)} ${f(y0 + 2)}`
    )
    accentStrokes.push(
      `M ${f(x0 + 4)} ${f(y0 + sh * 0.55)} C ${f(x0 + 24)} ${f(y0 + 18)}, ${f(x0 + 44)} ${f(y0 + 26)}, ${f(x0 + sw * 0.78)} ${f(y0 + 4)}`
    )
    // Counter-tendril swooping gracefully along bottom-right
    accentStrokes.push(
      `M ${f(x1 - sw * 0.14)} ${f(y1 - thick * 1.5)} C ${f(x1 - sw * 0.45)} ${f(y1 - 22)}, ${f(x1 - innerW * 0.52)} ${f(y1 + 14)}, ${f(x0 + 26)} ${f(y1 - 2)}`
    )
  }

  return {
    fillPath: contour,
    primaryStrokes: [contour],
    accentStrokes,
    accentFills: [],
    solidFills,
    strokeWidth: scale === "button" ? 1.35 : 1.7,
    accentStrokeWidth: 1.45,
    hasTopCrest: showSweep,
    hasSideFlourish: showSide,
    hasBottomCrest: showSweep,
  }
}

/**
 * Draft 09: "Iris-Säulen" (Open-Top Botanical Flower-Stalk Pillars!)
 * Directly inspired by the wildest frame in reference sheet Row 3 Col 3:
 * - Large cards: Completely OPEN TOP (no top horizontal bar!), framed on left & right by
 *   two tall botanical stems crowned with blooming Art Nouveau iris/tulip buds, curving inward
 *   with waist leaves, and braiding together into an interlaced root-arch along the bottom!
 * - Small tiles & buttons: Airy open-top/open-side twin-stem botanical parentheses with tiny buds!
 */
export function buildIris(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish } = computeWildFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showFullStalks = hasTopCrest && innerW >= 240
  const showWaistLeaves = hasSideFlourish && innerH >= 165

  // Soft parchment ground (fades gently at the open top!)
  const br = scale === "button" ? 10 : 18
  const fillPath = `M ${f(x0 + br)} ${f(y0 + 6)} L ${f(x1 - br)} ${f(y0 + 6)} Q ${f(x1)} ${f(y0 + 6)} ${f(x1)} ${f(y0 + br + 6)} L ${f(x1)} ${f(y1 - br)} Q ${f(x1)} ${f(y1)} ${f(x1 - br)} ${f(y1)} L ${f(x0 + br)} ${f(y1)} Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - br)} L ${f(x0)} ${f(y0 + br + 6)} Q ${f(x0)} ${f(y0 + 6)} ${f(x0 + br)} ${f(y0 + 6)} Z`

  const primaryStrokes: string[] = []
  const accentStrokes: string[] = []
  const accentFills: string[] = []

  if (scale === "button") {
    // Open-top botanical cradle: curved left & right stems with tiny buds + graceful single bottom curve
    const stem = Math.min(12, innerW * 0.14)
    primaryStrokes.push(
      `M ${f(x0 + stem * 0.4)} ${f(y0 + 4)} C ${f(x0 - 2)} ${f(cy)}, ${f(x0 + 2)} ${f(y1)}, ${f(x0 + stem)} ${f(y1)} L ${f(x1 - stem)} ${f(y1)} C ${f(x1 - 2)} ${f(y1)}, ${f(x1 + 2)} ${f(cy)}, ${f(x1 - stem * 0.4)} ${f(y0 + 4)}`
    )
    // Light top arch hint connecting gently on hover/visual balance
    accentStrokes.push(
      `M ${f(x0 + stem * 1.1)} ${f(y0 + 2)} Q ${f(cx)} ${f(y0 - 2)} ${f(x1 - stem * 1.1)} ${f(y0 + 2)}`
    )
    // Tiny left & right flower buds at top tips of the stems
    accentFills.push(leafShape(x0 + stem * 0.35, y0 + 5, -0.3, -1, 6.5))
    accentFills.push(leafShape(x1 - stem * 0.35, y0 + 5, 0.3, -1, 6.5))

    return {
      fillPath,
      primaryStrokes,
      accentStrokes,
      accentFills,
      solidFills: [],
      strokeWidth: 1.7,
      accentStrokeWidth: 1.0,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Left & Right tall vertical flower stems + braided root-arch bottom!
  const budY = y0 + 14
  const archH = showFullStalks ? 24 : 10

  // Left main stem curving gracefully into bottom braided arch across to right!
  primaryStrokes.push(
    `M ${f(x0 + 2)} ${f(budY)} C ${f(x0 + 1)} ${f(cy - 18)}, ${f(x0 + 3)} ${f(y1 - 38)}, ${f(x0 + 2)} ${f(y1 - 14)} C ${f(x0 + 2)} ${f(y1 + 2)}, ${f(x0 + 18)} ${f(y1 + 2)}, ${f(cx - innerW * 0.14)} ${f(y1 - 4)} C ${f(cx)} ${f(y1 - archH)}, ${f(cx + innerW * 0.18)} ${f(y1 + 2)}, ${f(x1 - 14)} ${f(y1)}`
  )
  // Right main stem mirroring into the intertwined bottom arch across to left!
  primaryStrokes.push(
    `M ${f(x1 - 2)} ${f(budY)} C ${f(x1 - 1)} ${f(cy - 18)}, ${f(x1 - 3)} ${f(y1 - 38)}, ${f(x1 - 2)} ${f(y1 - 14)} C ${f(x1 - 2)} ${f(y1 + 2)}, ${f(x1 - 18)} ${f(y1 + 2)}, ${f(cx + innerW * 0.14)} ${f(y1 - 4)} C ${f(cx)} ${f(y1 - archH)}, ${f(cx - innerW * 0.18)} ${f(y1 + 2)}, ${f(x0 + 14)} ${f(y1)}`
  )

  // Stylized blooming Art Nouveau Tulip / Iris Crowns atop BOTH pillars!
  const bSz = showFullStalks ? 14 : 9.5
  const drawIrisCrown = (bx: number, by: number, dir: number) => {
    // Center upright petal
    accentFills.push(leafShape(bx, by + 2, 0, -1, bSz * 1.15))
    // Outer cupping petals
    accentFills.push(leafShape(bx - 1, by + 3, -0.58, -0.82, bSz))
    accentFills.push(leafShape(bx + 1, by + 3, 0.58, -0.82, bSz))
    // Graceful curled sepal tendril curving gently inward toward the open top
    accentStrokes.push(
      `M ${f(bx)} ${f(by + 6)} C ${f(bx + dir * 10)} ${f(by - 4)}, ${f(bx + dir * 24)} ${f(by - 8)}, ${f(bx + dir * (showFullStalks ? 38 : 18))} ${f(by - 2)}`
    )
  }

  drawIrisCrown(x0 + 2, budY, 1)
  drawIrisCrown(x1 - 2, budY, -1)

  // Mid-stalk inward-curving botanical leaves (ONLY on tall cards, just like Ref Row 3 Col 3!)
  if (showWaistLeaves) {
    // Left stalk curling leaf
    primaryStrokes.push(
      `M ${f(x0 + 2)} ${f(cy + 14)} C ${f(x0 + 2)} ${f(cy - 4)}, ${f(x0 + 16)} ${f(cy - 10)}, ${f(x0 + 22)} ${f(cy - 16)}`
    )
    accentFills.push(leafShape(x0 + 12, cy - 8, 0.72, -0.68, 10))
    // Right stalk curling leaf
    primaryStrokes.push(
      `M ${f(x1 - 2)} ${f(cy + 14)} C ${f(x1 - 2)} ${f(cy - 4)}, ${f(x1 - 16)} ${f(cy - 10)}, ${f(x1 - 22)} ${f(cy - 16)}`
    )
    accentFills.push(leafShape(x1 - 12, cy - 8, -0.72, -0.68, 10))
  }

  // Extra braided secondary arch ring at bottom center on large cards
  if (showFullStalks) {
    accentStrokes.push(
      `M ${f(cx - 52)} ${f(y1 + 1)} C ${f(cx - 24)} ${f(y1 - archH * 1.15)}, ${f(cx + 24)} ${f(y1 - archH * 1.15)}, ${f(cx + 52)} ${f(y1 + 1)}`
    )
  }

  return {
    fillPath,
    primaryStrokes,
    accentStrokes,
    accentFills,
    solidFills: [],
    strokeWidth: 2.0,
    accentStrokeWidth: 1.3,
    hasTopCrest: showFullStalks,
    hasSideFlourish: showWaistLeaves,
    hasBottomCrest: showFullStalks,
  }
}

/**
 * Draft 10: "Libelle" (René Lalique Dragonfly Wings & Jewel Filigree)
 * Wild Art Nouveau jewelry aesthetic:
 * - Large cards: Upper corners flare outward into translucent VEINED DRAGONFLY WINGS,
 *   top center bears an oval jewel cabochon with curled antennae, and bottom cradles in scalloped wing-tips!
 * - Small tiles & buttons: Sleek pointed dragonfly-wing endcaps (elongated jewel clasp silhouette!)
 */
export function buildLibelle(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeWildFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showWings = hasTopCrest && innerW >= 240
  const showBot = hasBottomCrest && innerW >= 250

  if (scale === "button") {
    // Sleek dragonfly-wing jewel clasp button
    const wCap = Math.min(18, innerW * 0.16)
    const outline = [
      `M ${f(x0 + wCap)} ${f(y0 + 2)}`,
      `Q ${f(cx)} ${f(y0 - 2)} ${f(x1 - wCap)} ${f(y0 + 2)}`,
      `C ${f(x1 - wCap * 0.25)} ${f(y0 + 2)}, ${f(x1 + 3)} ${f(y0 + 5)}, ${f(x1 + 4)} ${f(cy)}`,
      `C ${f(x1 + 3)} ${f(y1 - 5)}, ${f(x1 - wCap * 0.25)} ${f(y1 - 2)}, ${f(x1 - wCap)} ${f(y1 - 2)}`,
      `Q ${f(cx)} ${f(y1 + 2)} ${f(x0 + wCap)} ${f(y1 - 2)}`,
      `C ${f(x0 + wCap * 0.25)} ${f(y1 - 2)}, ${f(x0 - 3)} ${f(y1 - 5)}, ${f(x0 - 4)} ${f(cy)}`,
      `C ${f(x0 - 3)} ${f(y0 + 5)}, ${f(x0 + wCap * 0.25)} ${f(y0 + 2)}, ${f(x0 + wCap)} ${f(y0 + 2)} Z`,
    ].join(" ")

    // Delicate radial wing-vein lines strictly inside the pointed outer tips
    const vein = Math.min(8, wCap * 0.48)
    const accentStrokes = [
      `M ${f(x0 - 2)} ${f(cy)} L ${f(x0 + vein)} ${f(cy)}`,
      `M ${f(x0)} ${f(cy)} L ${f(x0 + vein * 0.85)} ${f(y0 + 7)}`,
      `M ${f(x0)} ${f(cy)} L ${f(x0 + vein * 0.85)} ${f(y1 - 7)}`,
      `M ${f(x1 + 2)} ${f(cy)} L ${f(x1 - vein)} ${f(cy)}`,
      `M ${f(x1)} ${f(cy)} L ${f(x1 - vein * 0.85)} ${f(y0 + 7)}`,
      `M ${f(x1)} ${f(cy)} L ${f(x1 - vein * 0.85)} ${f(y1 - 7)}`,
    ]

    return {
      fillPath: outline,
      primaryStrokes: [outline],
      accentStrokes,
      accentFills: [],
      solidFills: [],
      strokeWidth: 1.55,
      accentStrokeWidth: 0.9,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Card or Tile contour: tapered organic jewel shield
  const r = Math.min(28, innerH * 0.24)
  const taper = showWings ? 6 : 2
  const contour = [
    `M ${f(x0 + r)} ${f(y0)}`,
    `L ${f(x1 - r)} ${f(y0)}`,
    `C ${f(x1 - r * 0.2)} ${f(y0)}, ${f(x1)} ${f(y0 + r * 0.25)}, ${f(x1)} ${f(y0 + r)}`,
    `L ${f(x1 - taper)} ${f(y1 - r)}`,
    `C ${f(x1 - taper)} ${f(y1 - r * 0.25)}, ${f(x1 - r)} ${f(y1)}, ${f(x1 - r * 1.25)} ${f(y1)}`,
    `L ${f(x0 + r * 1.25)} ${f(y1)}`,
    `C ${f(x0 + r)} ${f(y1)}, ${f(x0 + taper)} ${f(y1 - r * 0.25)}, ${f(x0 + taper)} ${f(y1 - r)}`,
    `L ${f(x0)} ${f(y0 + r)}`,
    `C ${f(x0)} ${f(y0 + r * 0.25)}, ${f(x0 + r * 0.2)} ${f(y0)}, ${f(x0 + r)} ${f(y0)} Z`,
  ].join(" ")

  const primaryStrokes: string[] = [contour]
  const accentStrokes: string[] = []
  const accentFills: string[] = []

  // Sweeping translucent Dragonfly Wings at upper corners!
  const drawWing = (wx: number, wy: number, dir: number, big: boolean) => {
    const wl = big ? 44 : 20
    const wh = big ? 30 : 14
    // Upper translucent wing membrane
    accentFills.push(
      `M ${f(wx)} ${f(wy + 6)} C ${f(wx - dir * wl * 0.65)} ${f(wy - wh * 0.55)}, ${f(wx - dir * wl * 1.05)} ${f(wy - wh * 0.15)}, ${f(wx - dir * wl * 0.78)} ${f(wy + wh * 0.45)} C ${f(wx - dir * wl * 0.45)} ${f(wy + wh * 0.85)}, ${f(wx - dir * wl * 0.08)} ${f(wy + wh * 0.65)}, ${f(wx)} ${f(wy + 6)} Z`
    )
    // Radial gossamer wing veins!
    accentStrokes.push(
      `M ${f(wx)} ${f(wy + 6)} Q ${f(wx - dir * wl * 0.48)} ${f(wy - wh * 0.1)} ${f(wx - dir * wl * 0.82)} ${f(wy + wh * 0.05)}`
    )
    accentStrokes.push(
      `M ${f(wx)} ${f(wy + 6)} Q ${f(wx - dir * wl * 0.42)} ${f(wy + wh * 0.25)} ${f(wx - dir * wl * 0.72)} ${f(wy + wh * 0.42)}`
    )
    if (big) {
      // Secondary lower trailing wing fin
      accentFills.push(
        `M ${f(wx)} ${f(wy + 16)} C ${f(wx - dir * wl * 0.58)} ${f(wy + wh * 0.55)}, ${f(wx - dir * wl * 0.68)} ${f(wy + wh * 1.15)}, ${f(wx - dir * wl * 0.28)} ${f(wy + wh * 1.25)} C ${f(wx - dir * wl * 0.05)} ${f(wy + wh * 1.28)}, ${f(wx)} ${f(wy + 26)}, ${f(wx)} ${f(wy + 16)} Z`
      )
      accentStrokes.push(
        `M ${f(wx)} ${f(wy + 16)} Q ${f(wx - dir * wl * 0.35)} ${f(wy + wh * 0.88)} ${f(wx - dir * wl * 0.45)} ${f(wy + wh * 1.08)}`
      )
    }
  }

  drawWing(x0 + 4, y0 + 8, 1, showWings)
  drawWing(x1 - 4, y0 + 8, -1, showWings)

  // Jewel Cabochon & Dragonfly Antennae Crest at Top Center (large cards)
  if (showWings) {
    // Oval jewel cabochon
    accentFills.push(
      `M ${f(cx)} ${f(y0 - 9)} C ${f(cx + 6.5)} ${f(y0 - 9)}, ${f(cx + 6.5)} ${f(y0 + 7)}, ${f(cx)} ${f(y0 + 7)} C ${f(cx - 6.5)} ${f(y0 + 7)}, ${f(cx - 6.5)} ${f(y0 - 9)}, ${f(cx)} ${f(y0 - 9)} Z`
    )
    // Graceful curled antennae arching outward from the jewel
    primaryStrokes.push(
      `M ${f(cx - 5)} ${f(y0 - 4)} C ${f(cx - 18)} ${f(y0 - 18)}, ${f(cx - 38)} ${f(y0 - 16)}, ${f(cx - 44)} ${f(y0 - 6)} C ${f(cx - 47)} ${f(y0 - 1)}, ${f(cx - 39)} ${f(y0 + 2)}, ${f(cx - 36)} ${f(y0 - 3)}`
    )
    primaryStrokes.push(
      `M ${f(cx + 5)} ${f(y0 - 4)} C ${f(cx + 18)} ${f(y0 - 18)}, ${f(cx + 38)} ${f(y0 - 16)}, ${f(cx + 44)} ${f(y0 - 6)} C ${f(cx + 47)} ${f(y0 - 1)}, ${f(cx + 39)} ${f(y0 + 2)}, ${f(cx + 36)} ${f(y0 - 3)}`
    )
  }

  // Bottom slender tail-fin ornament
  if (showBot) {
    accentFills.push(leafShape(cx, y1 - 2, 0, 1, 10))
    accentStrokes.push(
      `M ${f(cx - 36)} ${f(y1)} Q ${f(cx - 14)} ${f(y1 + 9)} ${f(cx)} ${f(y1 + 4)} Q ${f(cx + 14)} ${f(y1 + 9)} ${f(cx + 36)} ${f(y1)}`
    )
  }

  return {
    fillPath: contour,
    primaryStrokes,
    accentStrokes,
    accentFills,
    solidFills: [],
    strokeWidth: 1.7,
    accentStrokeWidth: 1.05,
    hasTopCrest: showWings,
    hasSideFlourish: false,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 11: "Mucha-Halo" (Concentric Zodiac Crescent Aureole & Ribbon Medallion)
 * Inspired by Alphonse Mucha's iconic circular halos behind Art Nouveau posters:
 * - Large cards: A majestic concentric zodiac crescent halo with radial star-ticks rises
 *   behind the top center, paired with twin rounded ribbon brackets at the corners!
 * - Small tiles & buttons: Scalloped circular-arc end medallions with subtle crescent ticks!
 */
export function buildHalo(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeWildFlags(opts)

  const m = scale === "button" ? 5 : 11
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showHalo = hasTopCrest && innerW >= 250
  const showBot = hasBottomCrest && innerW >= 260

  if (scale === "button") {
    // Medallion-end pill with concentric crescent arcs at left & right!
    const r = Math.min(18, innerH * 0.5)
    const pill = [
      `M ${f(x0 + r)} ${f(y0)}`,
      `L ${f(x1 - r)} ${f(y0)}`,
      `A ${f(r)} ${f(r)} 0 0 1 ${f(x1 - r)} ${f(y1)}`,
      `L ${f(x0 + r)} ${f(y1)}`,
      `A ${f(r)} ${f(r)} 0 0 1 ${f(x0 + r)} ${f(y0)} Z`,
    ].join(" ")

    const accentStrokes = [
      `M ${f(x0 + r + 1)} ${f(y0 + 4)} A ${f(Math.max(4, r - 4))} ${f(Math.max(4, r - 4))} 0 0 0 ${f(x0 + r + 1)} ${f(y1 - 4)}`,
      `M ${f(x1 - r - 1)} ${f(y0 + 4)} A ${f(Math.max(4, r - 4))} ${f(Math.max(4, r - 4))} 0 0 1 ${f(x1 - r - 1)} ${f(y1 - 4)}`,
    ]

    return {
      fillPath: pill,
      primaryStrokes: [pill],
      accentStrokes,
      accentFills: [],
      solidFills: [],
      strokeWidth: 1.65,
      accentStrokeWidth: 1.05,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Card / Tile: Softly circular-cornered medallion panel with double-arc halo corners
  const r = Math.min(28, innerH * 0.25, innerW * 0.16)
  const framePath = [
    `M ${f(x0 + r)} ${f(y0)}`,
    `L ${f(x1 - r)} ${f(y0)}`,
    `A ${f(r)} ${f(r)} 0 0 1 ${f(x1)} ${f(y0 + r)}`,
    `L ${f(x1)} ${f(y1 - r)}`,
    `A ${f(r)} ${f(r)} 0 0 1 ${f(x1 - r)} ${f(y1)}`,
    `L ${f(x0 + r)} ${f(y1)}`,
    `A ${f(r)} ${f(r)} 0 0 1 ${f(x0)} ${f(y1 - r)}`,
    `L ${f(x0)} ${f(y0 + r)}`,
    `A ${f(r)} ${f(r)} 0 0 1 ${f(x0 + r)} ${f(y0)} Z`,
  ].join(" ")

  const primaryStrokes: string[] = [framePath]
  const accentStrokes: string[] = []
  const accentFills: string[] = []

  // Concentric corner quarter-halos (Mucha ring aesthetic)
  const cr = r * 0.72
  accentStrokes.push(
    `M ${f(x0 + r + 6)} ${f(y0 + 5)} A ${f(cr)} ${f(cr)} 0 0 0 ${f(x0 + 5)} ${f(y0 + r + 6)}`
  )
  accentStrokes.push(
    `M ${f(x1 - r - 6)} ${f(y0 + 5)} A ${f(cr)} ${f(cr)} 0 0 1 ${f(x1 - 5)} ${f(y0 + r + 6)}`
  )
  accentStrokes.push(
    `M ${f(x1 - r - 6)} ${f(y1 - 5)} A ${f(cr)} ${f(cr)} 0 0 0 ${f(x1 - 5)} ${f(y1 - r - 6)}`
  )
  accentStrokes.push(
    `M ${f(x0 + r + 6)} ${f(y1 - 5)} A ${f(cr)} ${f(cr)} 0 0 1 ${f(x0 + 5)} ${f(y1 - r - 6)}`
  )

  // Majestic Concentric Zodiac Halo Rising Behind Top Center!
  if (showHalo) {
    const hR = Math.min(54, innerW * 0.14)
    const hInner = hR - 8
    const baseY = y0 + 2

    // Filled halo band between outer & inner semicircles
    accentFills.push(
      `M ${f(cx - hR)} ${f(baseY)} A ${f(hR)} ${f(hR * 0.56)} 0 0 1 ${f(cx + hR)} ${f(baseY)} L ${f(cx + hInner)} ${f(baseY)} A ${f(hInner)} ${f(hInner * 0.5)} 0 0 0 ${f(cx - hInner)} ${f(baseY)} Z`
    )
    // Outer crisp halo ring
    primaryStrokes.push(
      `M ${f(cx - hR)} ${f(baseY)} A ${f(hR)} ${f(hR * 0.56)} 0 0 1 ${f(cx + hR)} ${f(baseY)}`
    )
    // Inner halo ring
    accentStrokes.push(
      `M ${f(cx - hInner)} ${f(baseY)} A ${f(hInner)} ${f(hInner * 0.5)} 0 0 1 ${f(cx + hInner)} ${f(baseY)}`
    )
    // Radial zodiac sun-rays inside the crescent halo band!
    const ticks = 9
    for (let i = 1; i < ticks; i++) {
      const angle = Math.PI + (i / ticks) * Math.PI
      const xA = cx + Math.cos(angle) * hInner
      const yA = baseY + Math.sin(angle) * (hInner * 0.5)
      const xB = cx + Math.cos(angle) * hR
      const yB = baseY + Math.sin(angle) * (hR * 0.56)
      accentStrokes.push(`M ${f(xA)} ${f(yA)} L ${f(xB)} ${f(yB)}`)
    }
    // Small diamond star at apex of halo
    const topY = baseY - hR * 0.56
    accentFills.push(
      `M ${f(cx)} ${f(topY - 6)} L ${f(cx + 3.2)} ${f(topY - 2)} L ${f(cx)} ${f(topY + 2)} L ${f(cx - 3.2)} ${f(topY - 2)} Z`
    )
  }

  // Subtle companion crescent medallion at bottom center
  if (showBot) {
    const bR = 26
    accentFills.push(
      `M ${f(cx - bR)} ${f(y1)} A ${f(bR)} ${f(bR * 0.45)} 0 0 0 ${f(cx + bR)} ${f(y1)} Z`
    )
    primaryStrokes.push(
      `M ${f(cx - bR)} ${f(y1)} A ${f(bR)} ${f(bR * 0.45)} 0 0 0 ${f(cx + bR)} ${f(y1)}`
    )
  }

  // Small side circular beads on tall cards
  const hasSide = innerH >= 200 && innerW >= 250
  if (hasSide) {
    accentFills.push(
      `M ${f(x0 - 3)} ${f(cy)} a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0`
    )
    accentFills.push(
      `M ${f(x1 - 3)} ${f(cy)} a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0`
    )
  }

  return {
    fillPath: framePath,
    primaryStrokes,
    accentStrokes,
    accentFills,
    solidFills: [],
    strokeWidth: 1.85,
    accentStrokeWidth: 1.15,
    hasTopCrest: showHalo,
    hasSideFlourish: hasSide,
    hasBottomCrest: showBot,
  }
}

/**
 * Draft 12: "Welle" (Liquid-Ink Undulating Wave & Intertwined Ribbon)
 * Playful, hypnotic, 100% straight-line-free!
 * - Every single edge flows in gentle organic sine/S-waves!
 * - Large cards: Primary flowing wave contour + offset interwoven echo-ribbon that braids around it,
 *   plus a swirling Nautilus wave-crest at top center!
 * - Small tiles & buttons: Graceful single undulating ribbon wave with curled banner tails!
 */
export function buildWelle(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish } = computeWildFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showCrest = hasTopCrest && innerW >= 240
  const showEcho = hasSideFlourish && innerH >= 165

  const ampX = scale === "button" ? 2.4 : showCrest ? 5.5 : 3.2
  const ampY = scale === "button" ? 2.2 : showEcho ? 5.2 : 2.8
  const r = scale === "button" ? 10 : 18

  // Undulating continuous perimeter (ZERO straight segments!)
  const buildWaveContour = (phase: number, inset: number) => {
    const lx0 = x0 + inset
    const lx1 = x1 - inset
    const ly0 = y0 + inset
    const ly1 = y1 - inset
    const aX = ampX * phase
    const aY = ampY * phase
    const lr = Math.max(6, r - inset * 0.5)

    return [
      `M ${f(lx0 + lr)} ${f(ly0)}`,
      // Top undulating S-wave (two harmonic swells)
      `C ${f(lx0 + innerW * 0.25)} ${f(ly0 - aX * 1.4)}, ${f(cx - innerW * 0.12)} ${f(ly0 + aX * 1.2)}, ${f(cx)} ${f(ly0 - aX * 0.4)}`,
      `C ${f(cx + innerW * 0.12)} ${f(ly0 - aX * 1.6)}, ${f(lx1 - innerW * 0.25)} ${f(ly0 + aX * 1.3)}, ${f(lx1 - lr)} ${f(ly0)}`,
      // Top-right soft wave corner
      `Q ${f(lx1 + 2)} ${f(ly0 - 1)} ${f(lx1)} ${f(ly0 + lr)}`,
      // Right undulating vertical wave
      `C ${f(lx1 + aY * 1.3)} ${f(ly0 + innerH * 0.34)}, ${f(lx1 - aY * 1.3)} ${f(ly0 + innerH * 0.66)}, ${f(lx1)} ${f(ly1 - lr)}`,
      // Bottom-right soft wave corner
      `Q ${f(lx1 + 1)} ${f(ly1 + 2)} ${f(lx1 - lr)} ${f(ly1)}`,
      // Bottom undulating wave
      `C ${f(lx1 - innerW * 0.25)} ${f(ly1 + aX * 1.4)}, ${f(cx + innerW * 0.12)} ${f(ly1 - aX * 1.2)}, ${f(cx)} ${f(ly1 + aX * 0.4)}`,
      `C ${f(cx - innerW * 0.12)} ${f(ly1 + aX * 1.6)}, ${f(lx0 + innerW * 0.25)} ${f(ly1 - aX * 1.3)}, ${f(lx0 + lr)} ${f(ly1)}`,
      // Bottom-left soft wave corner
      `Q ${f(lx0 - 2)} ${f(ly1 + 1)} ${f(lx0)} ${f(ly1 - lr)}`,
      // Left undulating vertical wave
      `C ${f(lx0 - aY * 1.3)} ${f(ly1 - innerH * 0.34)}, ${f(lx0 + aY * 1.3)} ${f(ly1 - innerH * 0.66)}, ${f(lx0)} ${f(ly0 + lr)}`,
      // Top-left soft wave corner
      `Q ${f(lx0 - 1)} ${f(ly0 - 2)} ${f(lx0 + lr)} ${f(ly0)} Z`,
    ].join(" ")
  }

  const mainContour = buildWaveContour(1, 0)
  const accentStrokes: string[] = []
  const accentFills: string[] = []

  // Intertwined counter-phase echo ribbon (braids over and under the main wave!)
  if (scale !== "button") {
    accentStrokes.push(buildWaveContour(-0.85, 2.5))
  } else {
    // Playful wave curls at left & right tips of buttons
    accentStrokes.push(
      `M ${f(x0 + 2)} ${f(cy)} C ${f(x0 - 5)} ${f(cy - 5)}, ${f(x0 - 5)} ${f(cy + 5)}, ${f(x0 + 3)} ${f(cy + 3)}`
    )
    accentStrokes.push(
      `M ${f(x1 - 2)} ${f(cy)} C ${f(x1 + 5)} ${f(cy + 5)}, ${f(x1 + 5)} ${f(cy - 5)}, ${f(x1 - 3)} ${f(cy - 3)}`
    )
  }

  // Swirling twin Nautilus wave-crest at Top Center on large cards!
  if (showCrest) {
    const ny = y0 - 2
    // Left breaking wave curl
    accentStrokes.push(
      `M ${f(cx - 44)} ${f(ny + 2)} C ${f(cx - 26)} ${f(ny - 12)}, ${f(cx - 8)} ${f(ny - 18)}, ${f(cx - 2)} ${f(ny - 9)} C ${f(cx + 2)} ${f(ny - 3)}, ${f(cx - 8)} ${f(ny + 1)}, ${f(cx - 10)} ${f(ny - 6)}`
    )
    // Right breaking wave curl (counter-spiral)
    accentStrokes.push(
      `M ${f(cx + 44)} ${f(ny + 2)} C ${f(cx + 26)} ${f(ny - 12)}, ${f(cx + 8)} ${f(ny - 18)}, ${f(cx + 2)} ${f(ny - 9)} C ${f(cx - 2)} ${f(ny - 3)}, ${f(cx + 8)} ${f(ny + 1)}, ${f(cx + 10)} ${f(ny - 6)}`
    )
    // Pearl droplet hovering above the breaking waves
    accentFills.push(
      `M ${f(cx - 2.6)} ${f(ny - 15)} a 2.6 2.6 0 1 0 5.2 0 a 2.6 2.6 0 1 0 -5.2 0`
    )
  }

  return {
    fillPath: mainContour,
    primaryStrokes: [mainContour],
    accentStrokes,
    accentFills,
    solidFills: [],
    strokeWidth: scale === "button" ? 1.6 : 1.9,
    accentStrokeWidth: scale === "button" ? 1.15 : 1.15,
    hasTopCrest: showCrest,
    hasSideFlourish: showEcho,
    hasBottomCrest: showCrest,
  }
}
