import type {
  ColoredSvgLayer,
  FrameBuildOptions,
  FramePaths,
} from "./frame-geometry"

const f = (n: number) => Number(n.toFixed(2))

function computeMultiFlags(opts: FrameBuildOptions) {
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

/** Draw an organic pointed leaf shape from (lx, ly) along unit vector (dx, dy) */
function leafD(
  lx: number,
  ly: number,
  dx: number,
  dy: number,
  len: number,
  wid = 0.42
): string {
  const px = -dy
  const py = dx
  const ex = lx + dx * len
  const ey = ly + dy * len
  return [
    `M ${f(lx)} ${f(ly)}`,
    `C ${f(lx + dx * len * 0.35 + px * len * wid)} ${f(ly + dy * len * 0.35 + py * len * wid)},`,
    `${f(lx + dx * len * 0.78 + px * len * wid * 0.6)} ${f(ly + dy * len * 0.78 + py * len * wid * 0.6)},`,
    `${f(ex)} ${f(ey)}`,
    `C ${f(lx + dx * len * 0.78 - px * len * wid * 0.6)} ${f(ly + dy * len * 0.78 - py * len * wid * 0.6)},`,
    `${f(lx + dx * len * 0.35 - px * len * wid)} ${f(ly + dy * len * 0.35 - py * len * wid)},`,
    `${f(lx)} ${f(ly)} Z`,
  ].join(" ")
}

/**
 * Push a layered multi-petal Art Nouveau blossom (like Image 1 & Image 5)
 * with outer petals, delicate inner vein strokes, and a golden stamen center!
 */
function pushBlossom(
  layers: ColoredSvgLayer[],
  cx: number,
  cy: number,
  radius: number,
  petals: number,
  petalToken: "petalPrimary" | "petalSecondary",
  rotation = 0,
  withVeins = true
) {
  const step = (Math.PI * 2) / petals
  // Petals
  for (let i = 0; i < petals; i++) {
    const a = rotation + i * step
    const dx = Math.cos(a)
    const dy = Math.sin(a)
    const px = -dy
    const py = dx
    const tipX = cx + dx * radius
    const tipY = cy + dy * radius
    const w = radius * 0.42
    const d = [
      `M ${f(cx)} ${f(cy)}`,
      `C ${f(cx + dx * radius * 0.42 + px * w)} ${f(cy + dy * radius * 0.42 + py * w)},`,
      `${f(cx + dx * radius * 0.88 + px * w * 0.72)} ${f(cy + dy * radius * 0.88 + py * w * 0.72)},`,
      `${f(tipX)} ${f(tipY)}`,
      `C ${f(cx + dx * radius * 0.88 - px * w * 0.72)} ${f(cy + dy * radius * 0.88 - py * w * 0.72)},`,
      `${f(cx + dx * radius * 0.42 - px * w)} ${f(cy + dy * radius * 0.42 - py * w)},`,
      `${f(cx)} ${f(cy)} Z`,
    ].join(" ")
    layers.push({
      d,
      fill: petalToken,
      stroke: "ink",
      strokeWidth: radius > 12 ? 0.95 : 0.75,
    })
    if (withVeins && radius >= 10) {
      layers.push({
        d: `M ${f(cx + dx * radius * 0.25)} ${f(cy + dy * radius * 0.25)} L ${f(cx + dx * radius * 0.65)} ${f(cy + dy * radius * 0.65)}`,
        fill: "none",
        stroke: "ink",
        strokeWidth: 0.45,
        strokeOpacity: 0.45,
      })
    }
  }
  // Golden-ochre stamen core
  const cr = Math.max(2.6, radius * 0.27)
  layers.push({
    d: `M ${f(cx - cr)} ${f(cy)} a ${f(cr)} ${f(cr)} 0 1 0 ${f(cr * 2)} 0 a ${f(cr)} ${f(cr)} 0 1 0 ${f(-cr * 2)} 0`,
    fill: "center",
    stroke: "ink",
    strokeWidth: 0.85,
  })
}

/** Push a side-facing trumpet / freesia / bell blossom (Images 1, 3, 4) */
function pushBellBlossom(
  layers: ColoredSvgLayer[],
  bx: number,
  by: number,
  dx: number,
  dy: number,
  len: number,
  petalToken: "petalPrimary" | "petalSecondary" | "center"
) {
  const px = -dy
  const py = dx
  // Left wing petal
  layers.push({
    d: [
      `M ${f(bx)} ${f(by)}`,
      `C ${f(bx + dx * len * 0.55 + px * len * 0.52)} ${f(by + dy * len * 0.55 + py * len * 0.52)},`,
      `${f(bx + dx * len * 0.95 + px * len * 0.42)} ${f(by + dy * len * 0.95 + py * len * 0.42)},`,
      `${f(bx + dx * len * 0.9 + px * len * 0.14)} ${f(by + dy * len * 0.9 + py * len * 0.14)}`,
      `C ${f(bx + dx * len * 0.55 + px * len * 0.15)} ${f(by + dy * len * 0.55 + py * len * 0.15)},`,
      `${f(bx + dx * len * 0.25)} ${f(by + dy * len * 0.25)},`,
      `${f(bx)} ${f(by)} Z`,
    ].join(" "),
    fill: petalToken,
    stroke: "ink",
    strokeWidth: 0.85,
  })
  // Right wing petal
  layers.push({
    d: [
      `M ${f(bx)} ${f(by)}`,
      `C ${f(bx + dx * len * 0.55 - px * len * 0.52)} ${f(by + dy * len * 0.55 - py * len * 0.52)},`,
      `${f(bx + dx * len * 0.95 - px * len * 0.42)} ${f(by + dy * len * 0.95 - py * len * 0.42)},`,
      `${f(bx + dx * len * 0.9 - px * len * 0.14)} ${f(by + dy * len * 0.9 - py * len * 0.14)}`,
      `C ${f(bx + dx * len * 0.55 - px * len * 0.15)} ${f(by + dy * len * 0.55 - py * len * 0.15)},`,
      `${f(bx + dx * len * 0.25)} ${f(by + dy * len * 0.25)},`,
      `${f(bx)} ${f(by)} Z`,
    ].join(" "),
    fill: petalToken,
    stroke: "ink",
    strokeWidth: 0.85,
  })
  // Center front petal
  layers.push({
    d: leafD(bx, by, dx, dy, len * 1.05, 0.34),
    fill: petalToken,
    stroke: "ink",
    strokeWidth: 0.9,
  })
}

/**
 * Draft 13: "Blüten-Kaskade" (OPEN AT THE BOTTOM! Inspired by Image 5 + Colors of Image 1!)
 * - Completely OPEN bottom edge!
 * - Lush cascading multi-color botanical vines across top + upper left & upper right
 * - Layered multi-petal blossoms (coral, soft peach/ivory, golden centers)
 * - Slender double-rail side stems with tiny interior curling tendrils
 * - Graceful outward-flaring whiplash root-feet at bottom-left & bottom-right
 */
export function buildBluetenKaskade(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish } = computeMultiFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 32, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showFull = hasTopCrest && innerW >= 250
  const showSideTendrils = hasSideFlourish && innerH >= 170

  // Soft tinted inner ground that fades seamlessly into the open bottom!
  const br = scale === "button" ? 10 : 20
  const fillPath = `M ${f(x0 + br)} ${f(y0)} L ${f(x1 - br)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + br)} L ${f(x1)} ${f(y1 - 4)} L ${f(x0)} ${f(y1 - 4)} L ${f(x0)} ${f(y0 + br)} Q ${f(x0)} ${f(y0)} ${f(x0 + br)} ${f(y0)} Z`

  const colorLayers: ColoredSvgLayer[] = []

  if (scale === "button") {
    // Open-bottom delicate canopy button with curled side feet & twin corner blossoms!
    const r = Math.min(12, innerH * 0.36)
    // Open-bottom canopy rail
    colorLayers.push({
      d: `M ${f(x0 - 4)} ${f(y1)} C ${f(x0 + 2)} ${f(y1)}, ${f(x0)} ${f(y1 - 6)}, ${f(x0)} ${f(y0 + r)} Q ${f(x0)} ${f(y0)} ${f(x0 + r)} ${f(y0)} L ${f(x1 - r)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r)} C ${f(x1)} ${f(y1 - 6)}, ${f(x1 - 2)} ${f(y1)}, ${f(x1 + 4)} ${f(y1)}`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 1.55,
    })
    // Colored vine accent hugging top corners
    colorLayers.push({
      d: `M ${f(x0 + 3)} ${f(y0 + r + 3)} C ${f(x0 + 3)} ${f(y0 + 3)}, ${f(x0 + 16)} ${f(y0 + 3)}, ${f(x0 + 24)} ${f(y0 + 3)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 2.2,
    })
    colorLayers.push({
      d: `M ${f(x1 - 3)} ${f(y0 + r + 3)} C ${f(x1 - 3)} ${f(y0 + 3)}, ${f(x1 - 16)} ${f(y0 + 3)}, ${f(x1 - 24)} ${f(y0 + 3)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 2.2,
    })
    // Tiny paired multi-color corner blooms
    pushBlossom(colorLayers, x0 + 4, y0 + 5, 6.2, 5, "petalPrimary", 0.3, false)
    pushBlossom(colorLayers, x1 - 4, y0 + 5, 6.2, 5, "petalSecondary", -0.3, false)

    return {
      fillPath,
      primaryStrokes: [],
      accentStrokes: [],
      accentFills: [],
      colorLayers,
      strokeWidth: 1.5,
      accentStrokeWidth: 1,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Card / Small Tile: Open-bottom slender double-rail side stems + curling whiplash feet!
  const railGap = showFull ? 5 : 3.5
  const r = showFull ? 24 : 14
  const foot = showFull ? 22 : 11

  // Outer left rail -> sweeping top arch -> outer right rail -> open outward curled feet!
  colorLayers.push({
    d: [
      `M ${f(x0 - foot * 0.55)} ${f(y1 + 2)}`,
      `C ${f(x0 - foot * 0.1)} ${f(y1 + 5)}, ${f(x0)} ${f(y1 - 14)}, ${f(x0)} ${f(y1 - 34)}`,
      `L ${f(x0)} ${f(y0 + r)}`,
      `C ${f(x0)} ${f(y0 + r * 0.25)}, ${f(x0 + r * 0.25)} ${f(y0)}, ${f(x0 + r)} ${f(y0)}`,
      `C ${f(cx - innerW * 0.16)} ${f(y0 - (showFull ? 6 : 2))}, ${f(cx + innerW * 0.16)} ${f(y0 - (showFull ? 6 : 2))}, ${f(x1 - r)} ${f(y0)}`,
      `C ${f(x1 - r * 0.25)} ${f(y0)}, ${f(x1)} ${f(y0 + r * 0.25)}, ${f(x1)} ${f(y0 + r)}`,
      `L ${f(x1)} ${f(y1 - 34)}`,
      `C ${f(x1)} ${f(y1 - 14)}, ${f(x1 + foot * 0.1)} ${f(y1 + 5)}, ${f(x1 + foot * 0.55)} ${f(y1 + 2)}`,
    ].join(" "),
    fill: "none",
    stroke: "ink",
    strokeWidth: 1.65,
  })

  // Colored ribbon fill between left & right double side rails (like Image 5's celadon-green vertical stems!)
  colorLayers.push({
    d: `M ${f(x0)} ${f(y0 + r)} L ${f(x0 + railGap)} ${f(y0 + r + 2)} L ${f(x0 + railGap)} ${f(y1 - 24)} C ${f(x0 + railGap)} ${f(y1 - 4)}, ${f(x0 + foot * 0.85)} ${f(y1 + 5)}, ${f(x0 + foot * 1.15)} ${f(y1 - 2)} C ${f(x0 + foot * 0.6)} ${f(y1 + 2)}, ${f(x0)} ${f(y1 - 12)}, ${f(x0)} ${f(y1 - 28)} Z`,
    fill: "leaf",
    fillOpacity: 0.72,
    stroke: "ink",
    strokeWidth: 0.9,
  })
  colorLayers.push({
    d: `M ${f(x1)} ${f(y0 + r)} L ${f(x1 - railGap)} ${f(y0 + r + 2)} L ${f(x1 - railGap)} ${f(y1 - 24)} C ${f(x1 - railGap)} ${f(y1 - 4)}, ${f(x1 - foot * 0.85)} ${f(y1 + 5)}, ${f(x1 - foot * 1.15)} ${f(y1 - 2)} C ${f(x1 - foot * 0.6)} ${f(y1 + 2)}, ${f(x1)} ${f(y1 - 12)}, ${f(x1)} ${f(y1 - 28)} Z`,
    fill: "leaf",
    fillOpacity: 0.72,
    stroke: "ink",
    strokeWidth: 0.9,
  })

  // Intertwined colored top vine ribbon + trailing organic leaves!
  if (showFull) {
    // Rich sweeping teal/celadon vine wave across the top
    colorLayers.push({
      d: `M ${f(x0 + 6)} ${f(y0 + 30)} C ${f(x0 - 4)} ${f(y0 - 6)}, ${f(x0 + 55)} ${f(y0 - 8)}, ${f(cx - 28)} ${f(y0 + 4)} C ${f(cx + 12)} ${f(y0 - 12)}, ${f(x1 - 55)} ${f(y0 - 8)}, ${f(x1 - 6)} ${f(y0 + 28)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 4.2,
    })
    colorLayers.push({
      d: `M ${f(x0 + 6)} ${f(y0 + 30)} C ${f(x0 - 4)} ${f(y0 - 6)}, ${f(x0 + 55)} ${f(y0 - 8)}, ${f(cx - 28)} ${f(y0 + 4)} C ${f(cx + 12)} ${f(y0 - 12)}, ${f(x1 - 55)} ${f(y0 - 8)}, ${f(x1 - 6)} ${f(y0 + 28)}`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 0.9,
    })

    // Sweeping dual-tone leaves along top arch & cascading upper sides!
    colorLayers.push({
      d: leafD(x0 + 42, y0 + 2, 0.95, 0.25, 28, 0.36),
      fill: "stem",
      stroke: "ink",
      strokeWidth: 0.85,
    })
    colorLayers.push({
      d: leafD(x0 + 75, y0 + 4, 0.72, 0.68, 22, 0.34),
      fill: "leaf",
      stroke: "ink",
      strokeWidth: 0.85,
    })
    colorLayers.push({
      d: leafD(x1 - 44, y0 + 2, -0.95, 0.25, 28, 0.36),
      fill: "stem",
      stroke: "ink",
      strokeWidth: 0.85,
    })
    colorLayers.push({
      d: leafD(x1 - 76, y0 + 4, -0.72, 0.68, 22, 0.34),
      fill: "leaf",
      stroke: "ink",
      strokeWidth: 0.85,
    })
    // Golden ribbon accent leaf hints (just like Image 5's tiny gold leaves!)
    colorLayers.push({
      d: leafD(x0 + 22, y0 + 18, 0.45, 0.88, 18, 0.28),
      fill: "center",
      stroke: "ink",
      strokeWidth: 0.75,
    })
    colorLayers.push({
      d: leafD(x1 - 22, y0 + 20, -0.45, 0.88, 18, 0.28),
      fill: "center",
      stroke: "ink",
      strokeWidth: 0.75,
    })

    // Side curling tendrils along lower vertical rails (like Image 5!)
    if (showSideTendrils) {
      const cy = (y0 + y1) / 2
      colorLayers.push({
        d: `M ${f(x0 + 2)} ${f(y0 + 78)} C ${f(x0 + 14)} ${f(y0 + 96)}, ${f(x0 + 12)} ${f(cy - 10)}, ${f(x0 + 3)} ${f(cy + 12)}`,
        fill: "none",
        stroke: "stem",
        strokeWidth: 1.6,
      })
      colorLayers.push({
        d: `M ${f(x1 - 2)} ${f(y0 + 78)} C ${f(x1 - 14)} ${f(y0 + 96)}, ${f(x1 - 12)} ${f(cy - 10)}, ${f(x1 - 3)} ${f(cy + 12)}`,
        fill: "none",
        stroke: "stem",
        strokeWidth: 1.6,
      })
      // Cascading left & right mid-upper accent flowers (slightly asymmetric like Image 5!)
      colorLayers.push({
        d: leafD(x0 + 6, y0 + 62, 0.35, 0.92, 22, 0.36),
        fill: "stem",
        stroke: "ink",
        strokeWidth: 0.85,
      })
      pushBlossom(colorLayers, x0 + 6, y0 + 54, 13, 6, "petalSecondary", 0.2)
      pushBlossom(colorLayers, x1 - 7, y0 + 66, 11, 6, "petalPrimary", -0.3)
    }

    // Hero Multi-Color Blossoms along the Top Canopy!
    pushBlossom(colorLayers, x0 + 14, y0 + 12, 16, 7, "petalPrimary", 0.15)
    pushBlossom(colorLayers, cx - 10, y0 - 1, 14, 6, "petalSecondary", 0.5)
    pushBlossom(colorLayers, x1 - 16, y0 + 14, 18, 8, "petalSecondary", -0.2)
    // Secondary small coral pop bud beside right flower
    pushBlossom(colorLayers, x1 - 40, y0 + 6, 9.5, 5, "petalPrimary", 0.4, false)
  } else {
    // Small Tile ("Kleine Kachel"): Clean open-bottom arch with 2 delicate corner blossoms!
    colorLayers.push({
      d: leafD(x0 + 16, y0 + 2, 0.92, 0.35, 16, 0.34),
      fill: "stem",
      stroke: "ink",
      strokeWidth: 0.75,
    })
    colorLayers.push({
      d: leafD(x1 - 16, y0 + 2, -0.92, 0.35, 16, 0.34),
      fill: "stem",
      stroke: "ink",
      strokeWidth: 0.75,
    })
    pushBlossom(colorLayers, x0 + 8, y0 + 7, 9.5, 6, "petalPrimary", 0.2, false)
    pushBlossom(colorLayers, x1 - 8, y0 + 7, 9.5, 6, "petalSecondary", -0.2, false)
  }

  return {
    fillPath,
    primaryStrokes: [],
    accentStrokes: [],
    accentFills: [],
    colorLayers,
    strokeWidth: 1.6,
    accentStrokeWidth: 1.1,
    hasTopCrest: showFull,
    hasSideFlourish: showFull && showSideTendrils,
    hasBottomCrest: false,
  }
}

/**
 * Draft 14: "Mucha-Portal" (Rich Multi-Color Floral Arch & Bottom Cameo · Inspired by Image 1!)
 * - Rounded inner lithograph window framed by a celadon-sage botanical border
 * - Large cards: Overhanging burnt-coral & soft-peach flower garland across top arch +
 *   sculptural bottom circular cameo medallion flanked by sage wings!
 * - Small tiles & buttons: Clean sage-rimmed rounded arch with tiny coral corner buds
 */
export function buildMuchaPortal(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeMultiFlags(opts)

  const m = scale === "button" ? 5 : 10
  const x0 = m
  const x1 = Math.max(x0 + 32, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showGarland = hasTopCrest && innerW >= 250
  const showCameo = hasBottomCrest && innerW >= 260

  const r =
    scale === "button"
      ? Math.min(14, innerH * 0.45)
      : showGarland
        ? Math.min(44, innerH * 0.25, innerW * 0.14)
        : Math.min(20, innerH * 0.24)

  const outerArch = [
    `M ${f(x0 + r)} ${f(y0)}`,
    `L ${f(x1 - r)} ${f(y0)}`,
    `C ${f(x1 - r * 0.25)} ${f(y0)}, ${f(x1)} ${f(y0 + r * 0.25)}, ${f(x1)} ${f(y0 + r)}`,
    `L ${f(x1)} ${f(y1 - r)}`,
    `C ${f(x1)} ${f(y1 - r * 0.25)}, ${f(x1 - r * 0.25)} ${f(y1)}, ${f(x1 - r)} ${f(y1)}`,
    `L ${f(x0 + r)} ${f(y1)}`,
    `C ${f(x0 + r * 0.25)} ${f(y1)}, ${f(x0)} ${f(y1 - r * 0.25)}, ${f(x0)} ${f(y1 - r)}`,
    `L ${f(x0)} ${f(y0 + r)}`,
    `C ${f(x0)} ${f(y0 + r * 0.25)}, ${f(x0 + r * 0.25)} ${f(y0)}, ${f(x0 + r)} ${f(y0)} Z`,
  ].join(" ")

  const colorLayers: ColoredSvgLayer[] = []

  // Celadon outer frame band (Image 1's signature sage lithograph rail)
  colorLayers.push({
    d: outerArch,
    fill: "none",
    stroke: "stem",
    strokeWidth: scale === "button" ? 4.2 : 7,
  })
  // Crisp inner & outer dark slate-teal lithograph ink lines
  colorLayers.push({
    d: outerArch,
    fill: "none",
    stroke: "ink",
    strokeWidth: scale === "button" ? 1.45 : 1.75,
  })

  if (scale !== "button") {
    const ins = 5.5
    const ir = Math.max(8, r - ins)
    const innerArch = [
      `M ${f(x0 + ins + ir)} ${f(y0 + ins)}`,
      `L ${f(x1 - ins - ir)} ${f(y0 + ins)}`,
      `C ${f(x1 - ins - ir * 0.25)} ${f(y0 + ins)}, ${f(x1 - ins)} ${f(y0 + ins + ir * 0.25)}, ${f(x1 - ins)} ${f(y0 + ins + ir)}`,
      `L ${f(x1 - ins)} ${f(y1 - ins - ir)}`,
      `C ${f(x1 - ins)} ${f(y1 - ins - ir * 0.25)}, ${f(x1 - ins - ir * 0.25)} ${f(y1 - ins)}, ${f(x1 - ins - ir)} ${f(y1 - ins)}`,
      `L ${f(x0 + ins + ir)} ${f(y1 - ins)}`,
      `C ${f(x0 + ins + ir * 0.25)} ${f(y1 - ins)}, ${f(x0 + ins)} ${f(y1 - ins - ir * 0.25)}, ${f(x0 + ins)} ${f(y1 - ins - ir)}`,
      `L ${f(x0 + ins)} ${f(y0 + ins + ir)}`,
      `C ${f(x0 + ins)} ${f(y0 + ins + ir * 0.25)}, ${f(x0 + ins + ir * 0.25)} ${f(y0 + ins)}, ${f(x0 + ins + ir)} ${f(y0 + ins)} Z`,
    ].join(" ")
    colorLayers.push({
      d: innerArch,
      fill: "none",
      stroke: "ink",
      strokeWidth: 1.0,
    })
  }

  if (scale === "button") {
    // Tiny burnt-coral & peach side leaf-buds on button
    colorLayers.push({
      d: leafD(x0 + 4, (y0 + y1) / 2, 0.85, -0.5, 9, 0.42),
      fill: "petalPrimary",
      stroke: "ink",
      strokeWidth: 0.75,
    })
    colorLayers.push({
      d: leafD(x1 - 4, (y0 + y1) / 2, -0.85, -0.5, 9, 0.42),
      fill: "petalPrimary",
      stroke: "ink",
      strokeWidth: 0.75,
    })
    return {
      fillPath: outerArch,
      primaryStrokes: [],
      accentStrokes: [],
      accentFills: [],
      colorLayers,
      strokeWidth: 1.5,
      accentStrokeWidth: 1,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  if (showGarland) {
    // Lush Mucha coral + peach + celadon overhanging floral garland across the top!
    colorLayers.push({
      d: leafD(x0 + 18, y0 + 12, 0.9, -0.35, 34, 0.36),
      fill: "petalPrimary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(x1 - 18, y0 + 12, -0.9, -0.35, 34, 0.36),
      fill: "petalPrimary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(x0 + 52, y0 + 10, 0.75, 0.62, 26, 0.38),
      fill: "leaf",
      stroke: "ink",
      strokeWidth: 0.85,
    })
    colorLayers.push({
      d: leafD(x1 - 52, y0 + 10, -0.75, 0.62, 26, 0.38),
      fill: "leaf",
      stroke: "ink",
      strokeWidth: 0.85,
    })
    // Hanging asymmetrical blooms
    pushBlossom(colorLayers, x0 + 36, y0 + 5, 16, 6, "petalSecondary", 0.1)
    pushBlossom(colorLayers, x0 + 16, y0 + 24, 11, 5, "petalPrimary", 0.5, false)
    pushBlossom(colorLayers, cx, y0 - 2, 13, 6, "petalSecondary", 0.3)
    pushBlossom(colorLayers, x1 - 38, y0 + 6, 17, 6, "petalSecondary", -0.2)
    pushBlossom(colorLayers, x1 - 18, y0 + 22, 12.5, 5, "petalPrimary", -0.4, false)
  } else {
    // Small tile: subtle corner peach & coral buds
    pushBlossom(colorLayers, x0 + 12, y0 + 10, 8, 5, "petalPrimary", 0.2, false)
    pushBlossom(colorLayers, x1 - 12, y0 + 10, 8, 5, "petalSecondary", -0.2, false)
  }

  // Bottom Centered Cameo Medallion with Sweeping Sage Wings (Image 1!)
  if (showCameo) {
    const cr = 13
    const cyB = y1 - 1
    // Sweeping celadon wings cradling the cameo
    colorLayers.push({
      d: leafD(cx - cr + 2, cyB, -0.96, -0.22, 34, 0.32),
      fill: "stem",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(cx + cr - 2, cyB, 0.96, -0.22, 34, 0.32),
      fill: "stem",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    // Outer sage bezel ring
    colorLayers.push({
      d: `M ${f(cx - cr)} ${f(cyB)} a ${f(cr)} ${f(cr)} 0 1 0 ${f(cr * 2)} 0 a ${f(cr)} ${f(cr)} 0 1 0 ${f(-cr * 2)} 0`,
      fill: "stem",
      stroke: "ink",
      strokeWidth: 1.2,
    })
    // Inner warm apricot-gold cameo gem
    const ir = cr * 0.64
    colorLayers.push({
      d: `M ${f(cx - ir)} ${f(cyB)} a ${f(ir)} ${f(ir)} 0 1 0 ${f(ir * 2)} 0 a ${f(ir)} ${f(ir)} 0 1 0 ${f(-ir * 2)} 0`,
      fill: "petalSecondary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    // Center coral dot inside cameo
    colorLayers.push({
      d: `M ${f(cx - 3.2)} ${f(cyB)} a 3.2 3.2 0 1 0 6.4 0 a 3.2 3.2 0 1 0 -6.4 0`,
      fill: "petalPrimary",
      stroke: "ink",
      strokeWidth: 0.7,
    })
  }

  return {
    fillPath: outerArch,
    primaryStrokes: [],
    accentStrokes: [],
    accentFills: [],
    colorLayers,
    strokeWidth: 1.6,
    accentStrokeWidth: 1.1,
    hasTopCrest: showGarland,
    hasSideFlourish: false,
    hasBottomCrest: showCameo,
  }
}

/**
 * Draft 15: "Freesien-Ranke" (Interwoven Botanical Stems & Trumpet Blossoms · Inspired by Image 3!)
 * - Soft flowing ribbon-stems weaving around all 4 edges with braided figure-8 loop at bottom center
 * - Delicate diagonal sprays of dual-tone trumpet blossoms & buds in the corners
 * - Responsive: Small tiles & buttons keep the dual-tone woven corner stems + mini buds
 */
export function buildFreesienRanke(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeMultiFlags(opts)

  const m = scale === "button" ? 5 : 11
  const x0 = m
  const x1 = Math.max(x0 + 30, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showSprays = hasTopCrest && innerW >= 250
  const showBraid = hasBottomCrest && innerW >= 250

  const r = scale === "button" ? 11 : 22
  const fillPath = `M ${f(x0 + r)} ${f(y0)} Q ${f(cx)} ${f(y0 - 4)} ${f(x1 - r)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r)} L ${f(x1)} ${f(y1 - r)} Q ${f(x1)} ${f(y1)} ${f(x1 - r)} ${f(y1)} Q ${f(cx)} ${f(y1 + 4)} ${f(x0 + r)} ${f(y1)} Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - r)} L ${f(x0)} ${f(y0 + r)} Q ${f(x0)} ${f(y0)} ${f(x0 + r)} ${f(y0)} Z`

  const colorLayers: ColoredSvgLayer[] = []

  // Woven dual-ribbon organic frame stems (sage ribbon + crisp ink outline)
  const stemA = [
    `M ${f(x0 + r)} ${f(y0)}`,
    `C ${f(cx - innerW * 0.18)} ${f(y0 - 5)}, ${f(cx + innerW * 0.18)} ${f(y0 + 4)}, ${f(x1 - r)} ${f(y0)}`,
    `Q ${f(x1 + 2)} ${f(y0 - 1)} ${f(x1)} ${f(y0 + r)}`,
    `C ${f(x1 + 4)} ${f(y0 + innerH * 0.35)}, ${f(x1 - 4)} ${f(y0 + innerH * 0.65)}, ${f(x1)} ${f(y1 - r)}`,
    `Q ${f(x1 + 1)} ${f(y1 + 2)} ${f(x1 - r)} ${f(y1)}`,
    `C ${f(cx + innerW * 0.18)} ${f(y1 + 5)}, ${f(cx - innerW * 0.18)} ${f(y1 - 4)}, ${f(x0 + r)} ${f(y1)}`,
    `Q ${f(x0 - 2)} ${f(y1 + 1)} ${f(x0)} ${f(y1 - r)}`,
    `C ${f(x0 - 4)} ${f(y1 - innerH * 0.35)}, ${f(x0 + 4)} ${f(y1 - innerH * 0.65)}, ${f(x0)} ${f(y0 + r)}`,
    `Q ${f(x0 - 1)} ${f(y0 - 2)} ${f(x0 + r)} ${f(y0)} Z`,
  ].join(" ")

  colorLayers.push({
    d: stemA,
    fill: "none",
    stroke: "leaf",
    strokeWidth: scale === "button" ? 3.5 : 5.2,
  })
  colorLayers.push({
    d: stemA,
    fill: "none",
    stroke: "ink",
    strokeWidth: scale === "button" ? 1.25 : 1.5,
  })

  if (scale === "button") {
    // Mini trumpet buds at opposite corners
    pushBellBlossom(colorLayers, x0 + 5, y0 + 6, 0.85, 0.5, 10, "petalSecondary")
    pushBellBlossom(colorLayers, x1 - 5, y1 - 6, -0.85, -0.5, 10, "petalPrimary")
    return {
      fillPath,
      primaryStrokes: [],
      accentStrokes: [],
      accentFills: [],
      colorLayers,
      strokeWidth: 1.4,
      accentStrokeWidth: 1,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Corner freesias & arching stem sprays (Image 3 vibe!)
  if (showSprays) {
    // Top-left white/peach freesia cluster
    colorLayers.push({
      d: `M ${f(x0 + 4)} ${f(y0 + 56)} C ${f(x0 + 10)} ${f(y0 + 18)}, ${f(x0 + 38)} ${f(y0 + 8)}, ${f(x0 + 82)} ${f(y0 + 12)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 2.2,
    })
    pushBellBlossom(colorLayers, x0 + 16, y0 + 18, 0.65, -0.75, 18, "petalSecondary")
    pushBellBlossom(colorLayers, x0 + 34, y0 + 14, 0.9, -0.42, 16, "petalSecondary")
    pushBellBlossom(colorLayers, x0 + 56, y0 + 12, 0.96, -0.2, 12, "center")

    // Top-right golden/coral freesia cluster (asymmetric color echo like Image 3!)
    colorLayers.push({
      d: `M ${f(x1 - 4)} ${f(y0 + 56)} C ${f(x1 - 10)} ${f(y0 + 18)}, ${f(x1 - 38)} ${f(y0 + 8)}, ${f(x1 - 82)} ${f(y0 + 12)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 2.2,
    })
    pushBellBlossom(colorLayers, x1 - 16, y0 + 18, -0.65, -0.75, 18, "petalPrimary")
    pushBellBlossom(colorLayers, x1 - 36, y0 + 14, -0.9, -0.42, 15, "center")
    pushBellBlossom(colorLayers, x1 - 58, y0 + 12, -0.96, -0.2, 11, "petalSecondary")

    // Bottom corner delicate buds
    pushBellBlossom(colorLayers, x0 + 14, y1 - 14, 0.72, -0.68, 15, "petalSecondary")
    pushBellBlossom(colorLayers, x1 - 14, y1 - 14, -0.72, -0.68, 15, "petalPrimary")
  } else {
    // Small tile: subtle pair of corner trumpet buds
    pushBellBlossom(colorLayers, x0 + 8, y0 + 10, 0.85, 0.52, 11, "petalSecondary")
    pushBellBlossom(colorLayers, x1 - 8, y0 + 10, -0.85, 0.52, 11, "petalPrimary")
  }

  // Braided Figure-8 Stem Knot at Bottom Center (Image 3!)
  if (showBraid) {
    const bw = Math.min(72, innerW * 0.22)
    colorLayers.push({
      d: `M ${f(cx - bw)} ${f(y1 - 2)} C ${f(cx - bw * 0.45)} ${f(y1 - 16)}, ${f(cx - bw * 0.12)} ${f(y1 + 10)}, ${f(cx)} ${f(y1 - 2)} C ${f(cx + bw * 0.12)} ${f(y1 - 14)}, ${f(cx + bw * 0.45)} ${f(y1 + 10)}, ${f(cx + bw)} ${f(y1 - 2)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 3.6,
    })
    colorLayers.push({
      d: `M ${f(cx - bw)} ${f(y1 - 2)} C ${f(cx - bw * 0.45)} ${f(y1 - 16)}, ${f(cx - bw * 0.12)} ${f(y1 + 10)}, ${f(cx)} ${f(y1 - 2)} C ${f(cx + bw * 0.12)} ${f(y1 - 14)}, ${f(cx + bw * 0.45)} ${f(y1 + 10)}, ${f(cx + bw)} ${f(y1 - 2)}`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 0.95,
    })
  }

  return {
    fillPath,
    primaryStrokes: [],
    accentStrokes: [],
    accentFills: [],
    colorLayers,
    strokeWidth: 1.5,
    accentStrokeWidth: 1.1,
    hasTopCrest: showSprays,
    hasSideFlourish: false,
    hasBottomCrest: showBraid,
  }
}

/**
 * Draft 16: "Jugend-Torbogen" (Multi-Color Spandrel Arch & Twin Coral Bells · Inspired by Image 4!)
 * - Sweeping architectural parabolic top arch + smooth oval-cradle base
 * - Upper spandrel corners burst with twin burnt-coral bell flowers on slender stems
 * - Top center holds a pale symmetric iris crest with delicate curling scrolls
 * - Bottom center anchors with a sculptural keystone finial
 */
export function buildJugendTorbogen(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasBottomCrest } = computeMultiFlags(opts)

  const m = scale === "button" ? 5 : 10
  const x0 = m
  const x1 = Math.max(x0 + 32, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showPortal = hasTopCrest && innerW >= 250
  const showKeystone = hasBottomCrest && innerW >= 250

  if (scale === "button") {
    const r = Math.min(13, innerH * 0.44)
    const archBtn = `M ${f(x0 + r)} ${f(y0)} Q ${f(cx)} ${f(y0 - 3)} ${f(x1 - r)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r)} L ${f(x1)} ${f(y1 - r)} Q ${f(x1)} ${f(y1)} ${f(x1 - r)} ${f(y1)} L ${f(x0 + r)} ${f(y1)} Q ${f(x0)} ${f(y1)} ${f(x0)} ${f(y1 - r)} L ${f(x0)} ${f(y0 + r)} Q ${f(x0)} ${f(y0)} ${f(x0 + r)} ${f(y0)} Z`
    const colorLayers: ColoredSvgLayer[] = [
      { d: archBtn, fill: "none", stroke: "stem", strokeWidth: 3.6 },
      { d: archBtn, fill: "none", stroke: "ink", strokeWidth: 1.35 },
      {
        d: leafD(x0 + 7, y0 + 6, 0.8, 0.5, 9, 0.4),
        fill: "petalPrimary",
        stroke: "ink",
        strokeWidth: 0.75,
      },
      {
        d: leafD(x1 - 7, y0 + 6, -0.8, 0.5, 9, 0.4),
        fill: "petalPrimary",
        stroke: "ink",
        strokeWidth: 0.75,
      },
    ]
    return {
      fillPath: archBtn,
      primaryStrokes: [],
      accentStrokes: [],
      accentFills: [],
      colorLayers,
      strokeWidth: 1.5,
      accentStrokeWidth: 1,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Sweeping arched inner window (Image 4!)
  const topDrop = showPortal ? Math.min(54, innerH * 0.25) : 18
  const botRise = showKeystone ? Math.min(34, innerH * 0.16) : 14

  const innerPortal = [
    `M ${f(x0)} ${f(y0 + topDrop)}`,
    `C ${f(x0)} ${f(y0 + 4)}, ${f(cx - innerW * 0.28)} ${f(y0 - 4)}, ${f(cx)} ${f(y0 - (showPortal ? 6 : 2))}`,
    `C ${f(cx + innerW * 0.28)} ${f(y0 - 4)}, ${f(x1)} ${f(y0 + 4)}, ${f(x1)} ${f(y0 + topDrop)}`,
    `L ${f(x1)} ${f(y1 - botRise)}`,
    `C ${f(x1)} ${f(y1 - 2)}, ${f(cx + innerW * 0.26)} ${f(y1 + 2)}, ${f(cx)} ${f(y1 + 2)}`,
    `C ${f(cx - innerW * 0.26)} ${f(y1 + 2)}, ${f(x0)} ${f(y1 - 2)}, ${f(x0)} ${f(y1 - botRise)} Z`,
  ].join(" ")

  const colorLayers: ColoredSvgLayer[] = []

  // Outer rectangular pastel spandrel border (for large cards, exactly like Image 4!)
  if (showPortal) {
    colorLayers.push({
      d: `M ${f(x0)} ${f(y0)} L ${f(x1)} ${f(y0)} L ${f(x1)} ${f(y1)} L ${f(x0)} ${f(y1)} Z`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 3.2,
    })
    colorLayers.push({
      d: `M ${f(x0)} ${f(y0)} L ${f(x1)} ${f(y0)} L ${f(x1)} ${f(y1)} L ${f(x0)} ${f(y1)} Z`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 0.9,
    })
  }

  // Main sweeping celadon arch ribbon
  colorLayers.push({
    d: innerPortal,
    fill: "none",
    stroke: "stem",
    strokeWidth: showPortal ? 6 : 4,
  })
  colorLayers.push({
    d: innerPortal,
    fill: "none",
    stroke: "ink",
    strokeWidth: 1.6,
  })

  if (showPortal) {
    // Twin burnt-coral bell flowers blooming inside top-left & top-right spandrels (Image 4!)
    pushBellBlossom(colorLayers, x0 + 8, y0 + 28, 0.5, -0.86, 20, "petalPrimary")
    pushBellBlossom(colorLayers, x0 + 22, y0 + 18, 0.82, -0.56, 16, "petalPrimary")
    pushBellBlossom(colorLayers, x1 - 8, y0 + 28, -0.5, -0.86, 20, "petalPrimary")
    pushBellBlossom(colorLayers, x1 - 22, y0 + 18, -0.82, -0.56, 16, "petalPrimary")

    // Symmetric top-center pale iris & curled scrolls (Image 4!)
    colorLayers.push({
      d: `M ${f(cx - 46)} ${f(y0 + 10)} C ${f(cx - 28)} ${f(y0 - 4)}, ${f(cx - 12)} ${f(y0 + 14)}, ${f(cx)} ${f(y0 + 2)} C ${f(cx + 12)} ${f(y0 + 14)}, ${f(cx + 28)} ${f(y0 - 4)}, ${f(cx + 46)} ${f(y0 + 10)}`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 1.2,
    })
    colorLayers.push({
      d: leafD(cx, y0 - 2, 0, 1, 18, 0.4),
      fill: "petalSecondary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(cx - 3, y0 - 1, -0.68, 0.72, 15, 0.34),
      fill: "leaf",
      stroke: "ink",
      strokeWidth: 0.85,
    })
    colorLayers.push({
      d: leafD(cx + 3, y0 - 1, 0.68, 0.72, 15, 0.34),
      fill: "leaf",
      stroke: "ink",
      strokeWidth: 0.85,
    })
  } else {
    // Compact tile corner coral buds
    pushBellBlossom(colorLayers, x0 + 8, y0 + 14, 0.65, -0.75, 11, "petalPrimary")
    pushBellBlossom(colorLayers, x1 - 8, y0 + 14, -0.65, -0.75, 11, "petalPrimary")
  }

  // Sculptural bottom keystone stem (Image 4!)
  if (showKeystone) {
    colorLayers.push({
      d: `M ${f(cx - 54)} ${f(y1 + 2)} C ${f(cx - 28)} ${f(y1 - 10)}, ${f(cx - 10)} ${f(y1 - 2)}, ${f(cx)} ${f(y1 - 14)} C ${f(cx + 10)} ${f(y1 - 2)}, ${f(cx + 28)} ${f(y1 - 10)}, ${f(cx + 54)} ${f(y1 + 2)} Z`,
      fill: "petalSecondary",
      stroke: "ink",
      strokeWidth: 1.0,
    })
  }

  return {
    fillPath: innerPortal,
    primaryStrokes: [],
    accentStrokes: [],
    accentFills: [],
    colorLayers,
    strokeWidth: 1.6,
    accentStrokeWidth: 1.1,
    hasTopCrest: showPortal,
    hasSideFlourish: false,
    hasBottomCrest: showKeystone,
  }
}

/**
 * Draft 17: "Offener Schleifen-Kranz" (OPEN AT THE BOTTOM · Fusion of Sketch + Image 2 & Image 5!)
 * - Completely OPEN at the bottom!
 * - Sweeping calligraphic ribbon loops across top corners (Image 2 & Sketch)
 * - Top center holds Image 2's iconic multi-color floral shell-fan & twin S-scrolls!
 * - Multi-color corner rosettes + tapering curled side ribbons that float open at bottom!
 */
export function buildOffenerKranz(opts: FrameBuildOptions): FramePaths {
  const { width: w, height: h, scale } = opts
  const { hasTopCrest, hasSideFlourish } = computeMultiFlags(opts)

  const m = scale === "button" ? 6 : 12
  const x0 = m
  const x1 = Math.max(x0 + 32, w - m)
  const y0 = m
  const y1 = Math.max(y0 + 22, h - m)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const innerW = x1 - x0
  const innerH = y1 - y0

  const showCrown = hasTopCrest && innerW >= 250
  const showSideLoops = hasSideFlourish && innerH >= 175

  const br = scale === "button" ? 10 : 18
  const fillPath = `M ${f(x0 + br)} ${f(y0)} L ${f(x1 - br)} ${f(y0)} Q ${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + br)} L ${f(x1)} ${f(y1 - 2)} L ${f(x0)} ${f(y1 - 2)} L ${f(x0)} ${f(y0 + br)} Q ${f(x0)} ${f(y0)} ${f(x0 + br)} ${f(y0)} Z`

  const colorLayers: ColoredSvgLayer[] = []

  if (scale === "button") {
    // Open-bottom calligraphic loop canopy with two tiny colored rosettes!
    const r = Math.min(10, innerH * 0.32)
    colorLayers.push({
      d: `M ${f(x0 + 5)} ${f(y1)} C ${f(x0 - 5)} ${f(y1 + 2)}, ${f(x0 - 4)} ${f(y1 - 10)}, ${f(x0)} ${f(y0 + r)} C ${f(x0)} ${f(y0 - 4)}, ${f(x0 + r + 4)} ${f(y0 - 4)}, ${f(x0 + r + 8)} ${f(y0)} L ${f(x1 - r - 8)} ${f(y0)} C ${f(x1 - r - 4)} ${f(y0 - 4)}, ${f(x1)} ${f(y0 - 4)}, ${f(x1)} ${f(y0 + r)} C ${f(x1 + 4)} ${f(y1 - 10)}, ${f(x1 + 5)} ${f(y1 + 2)}, ${f(x1 - 5)} ${f(y1)}`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 1.55,
    })
    pushBlossom(colorLayers, x0 + 5, y0 + 4, 5.5, 5, "petalPrimary", 0.2, false)
    pushBlossom(colorLayers, x1 - 5, y0 + 4, 5.5, 5, "petalPrimary", -0.2, false)
    return {
      fillPath,
      primaryStrokes: [],
      accentStrokes: [],
      accentFills: [],
      colorLayers,
      strokeWidth: 1.5,
      accentStrokeWidth: 1,
      hasTopCrest: false,
      hasSideFlourish: false,
      hasBottomCrest: false,
    }
  }

  // Open-bottom sweeping calligraphic loop arch!
  const loopR = showCrown ? 26 : 14
  const openRail = [
    // Left bottom curled ribbon tail
    `M ${f(x0 + 16)} ${f(y1)}`,
    `C ${f(x0 - 8)} ${f(y1 + 4)}, ${f(x0 - 8)} ${f(y1 - 16)}, ${f(x0)} ${f(y1 - 24)}`,
    // Left side stem up
    `L ${f(x0)} ${f(y0 + loopR)}`,
    // Grand sweeping top-left ribbon loop (Image 2!)
    `C ${f(x0)} ${f(y0 - 8)}, ${f(x0 + loopR * 1.4)} ${f(y0 - 8)}, ${f(x0 + loopR * 1.35)} ${f(y0 + loopR * 0.42)}`,
    `C ${f(x0 + loopR * 1.3)} ${f(y0 + loopR * 0.92)}, ${f(x0 + loopR * 0.42)} ${f(y0 + loopR * 0.72)}, ${f(x0 + loopR * 0.75)} ${f(y0 + 2)}`,
    `C ${f(x0 + loopR * 0.95)} ${f(y0 - 2)}, ${f(cx - innerW * 0.16)} ${f(y0 - (showCrown ? 9 : 3))}, ${f(cx)} ${f(y0 - (showCrown ? 9 : 3))}`,
    `C ${f(cx + innerW * 0.16)} ${f(y0 - (showCrown ? 9 : 3))}, ${f(x1 - loopR * 0.95)} ${f(y0 - 2)}, ${f(x1 - loopR * 0.75)} ${f(y0 + 2)}`,
    `C ${f(x1 - loopR * 0.42)} ${f(y0 + loopR * 0.72)}, ${f(x1 - loopR * 1.3)} ${f(y0 + loopR * 0.92)}, ${f(x1 - loopR * 1.35)} ${f(y0 + loopR * 0.42)}`,
    `C ${f(x1 - loopR * 1.4)} ${f(y0 - 8)}, ${f(x1)} ${f(y0 - 8)}, ${f(x1)} ${f(y0 + loopR)}`,
    // Right side stem down to right bottom curled ribbon tail
    `L ${f(x1)} ${f(y1 - 24)}`,
    `C ${f(x1 + 8)} ${f(y1 - 16)}, ${f(x1 + 8)} ${f(y1 + 4)}, ${f(x1 - 16)} ${f(y1)}`,
  ].join(" ")

  // Colored ribbon underlay + crisp dark ink outline
  colorLayers.push({
    d: openRail,
    fill: "none",
    stroke: "leaf",
    strokeWidth: showCrown ? 4.8 : 3.2,
  })
  colorLayers.push({
    d: openRail,
    fill: "none",
    stroke: "ink",
    strokeWidth: 1.65,
  })

  // Side calligraphic ribbon curls on tall cards (Image 2's iconic side waist curls!)
  if (showSideLoops) {
    colorLayers.push({
      d: `M ${f(x0)} ${f(cy - 26)} C ${f(x0 - 16)} ${f(cy - 18)}, ${f(x0 - 14)} ${f(cy - 2)}, ${f(x0 - 4)} ${f(cy - 2)} C ${f(x0 - 14)} ${f(cy + 2)}, ${f(x0 - 16)} ${f(cy + 18)}, ${f(x0)} ${f(cy + 26)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 2.2,
    })
    colorLayers.push({
      d: `M ${f(x1)} ${f(cy - 26)} C ${f(x1 + 16)} ${f(cy - 18)}, ${f(x1 + 14)} ${f(cy - 2)}, ${f(x1 + 4)} ${f(cy - 2)} C ${f(x1 + 14)} ${f(cy + 2)}, ${f(x1 + 16)} ${f(cy + 18)}, ${f(x1)} ${f(cy + 26)}`,
      fill: "none",
      stroke: "stem",
      strokeWidth: 2.2,
    })
  }

  // Corner multi-color rosettes & trailing leaves
  const rSz = showCrown ? 13 : 8.5
  colorLayers.push({
    d: leafD(x0 + 8, y0 + 18, 0.3, 0.95, showCrown ? 24 : 13, 0.36),
    fill: "stem",
    stroke: "ink",
    strokeWidth: 0.8,
  })
  colorLayers.push({
    d: leafD(x1 - 8, y0 + 18, -0.3, 0.95, showCrown ? 24 : 13, 0.36),
    fill: "stem",
    stroke: "ink",
    strokeWidth: 0.8,
  })
  pushBlossom(colorLayers, x0 + 6, y0 + 6, rSz, 6, "petalPrimary", 0.25)
  pushBlossom(colorLayers, x1 - 6, y0 + 6, rSz, 6, "petalPrimary", -0.25)

  // Top-Center Shell-Fan & Twin S-Scrolls (Direct homage to Image 2's iconic top ornament!)
  if (showCrown) {
    const sy = y0 - 4
    // Twin symmetrical S-scrolls flanking the fan
    colorLayers.push({
      d: `M ${f(cx - 4)} ${f(sy + 10)} C ${f(cx - 18)} ${f(sy + 4)}, ${f(cx - 32)} ${f(sy + 16)}, ${f(cx - 38)} ${f(sy + 9)} C ${f(cx - 42)} ${f(sy + 3)}, ${f(cx - 34)} ${f(sy - 2)}, ${f(cx - 30)} ${f(sy + 4)}`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 1.9,
    })
    colorLayers.push({
      d: `M ${f(cx + 4)} ${f(sy + 10)} C ${f(cx + 18)} ${f(sy + 4)}, ${f(cx + 32)} ${f(sy + 16)}, ${f(cx + 38)} ${f(sy + 9)} C ${f(cx + 42)} ${f(sy + 3)}, ${f(cx + 34)} ${f(sy - 2)}, ${f(cx + 30)} ${f(sy + 4)}`,
      fill: "none",
      stroke: "ink",
      strokeWidth: 1.9,
    })
    // 5-petal shell-fan blossom rising at top center
    colorLayers.push({
      d: leafD(cx, sy + 8, -0.75, -0.66, 15, 0.32),
      fill: "petalSecondary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(cx, sy + 8, 0.75, -0.66, 15, 0.32),
      fill: "petalSecondary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(cx, sy + 8, -0.38, -0.92, 17, 0.32),
      fill: "petalPrimary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(cx, sy + 8, 0.38, -0.92, 17, 0.32),
      fill: "petalPrimary",
      stroke: "ink",
      strokeWidth: 0.9,
    })
    colorLayers.push({
      d: leafD(cx, sy + 8, 0, -1, 19, 0.34),
      fill: "center",
      stroke: "ink",
      strokeWidth: 0.95,
    })
  }

  return {
    fillPath,
    primaryStrokes: [],
    accentStrokes: [],
    accentFills: [],
    colorLayers,
    strokeWidth: 1.6,
    accentStrokeWidth: 1.1,
    hasTopCrest: showCrown,
    hasSideFlourish: showSideLoops,
    hasBottomCrest: false,
  }
}
