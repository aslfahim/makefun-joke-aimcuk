// The joke the reviewer laughs at — @aimcuk entry.
// The joke is stored as a tiny two-panel script: a straight observation
// about the agent, then a simile that reframes it as a fortune teller.
// The panels are stitched and delivered to entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PANELS = {
  observation: "My coding agent writes tests for code it hasn't written yet,",
  simile: "like a fortune teller who bills by the token.",
} as const;

function stitch(first: string, second: string): string {
  // Normalise the seam so the two panels always meet with exactly one
  // space, whatever trailing whitespace a panel carries.
  return `${first.trimEnd()} ${second.trimStart()}`;
}

function deliver(text: string): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, { encoding: "utf8" });
}

const joke = stitch(PANELS.observation, PANELS.simile);

// Gate mirror: the sealed scorer wants 1..280 code points, non-blank.
const points = [...joke].length;
if (points === 0 || points > 280 || joke.trim().length === 0) {
  console.error(`joke failed local gate at ${points} chars`);
  process.exit(1);
}

deliver(joke);
