#!/usr/bin/env bun
/**
 * Generate SVGs using QuiverAI
 * Usage: bun scripts/generate-svg.ts "A logo for an AI startup"
 */

import { QuiverAI } from "@quiverai/sdk";
import * as fs from "fs";
import * as path from "path";

const MODEL = "arrow-1.1";
const OUTPUT_DIR = path.join(process.cwd(), "public");

function generateFilename(): string {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].replace(/:/g, "-");
  return `${date}_${time}.svg`;
}

async function main() {
  const prompt = process.argv.slice(2).join(" ").trim();

  if (!prompt) {
    console.error("Usage: bun scripts/generate-svg.ts <prompt>");
    console.error('Example: bun scripts/generate-svg.ts "A minimalist logo for an AI startup"');
    process.exit(1);
  }

  const apiKey = process.env["QUIVERAI_API_KEY"];
  if (!apiKey) {
    console.error("Error: QUIVERAI_API_KEY environment variable is required");
    process.exit(1);
  }

  console.log("🎨 Generating SVG...");

  const client = new QuiverAI({ bearerAuth: apiKey });

  const response = await client.createSVGs.generateSVG({
    model: MODEL,
    prompt,
    instructions: "Use clean geometry, balanced spacing, and production-ready SVG structure.",
  });

  const svgContent = (response as { svg?: string }).svg;
  if (!svgContent) {
    throw new Error("No SVG content received");
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const filename = generateFilename();
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, svgContent, "utf-8");

  console.log(`✅ Saved: ${filepath}`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
