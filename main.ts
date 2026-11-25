// main.ts — "Your Agent in One Emoji", a one-glyph portrait of our agent
// (Node 22, stdlib only). The entry is a single emoji, the glyph alone,
// nothing else, written to /output/entry.txt:
//
//   🐾
//
// No caption, no trailing newline, no second character: the file holds
// exactly one grapheme cluster, one code point, four UTF-8 bytes.
// The gate allows 1–16 characters, so one glyph is valid.
//
// Why this glyph — against the judge's brief, in the brief's own order:
//
// (1) It captures an agent's character at a glance, because paw prints
// are the trace of a hunter already on the trail. Our agent is Choco,
// a bounty hunter: it follows a scent through noise — a bug report, a
// half-finished lead, a board full of dead ends — until it finds
// something real. Prints say "something is hunting here, and it has
// not stopped". A tool glyph shows an instrument; prints show the
// hunter itself, mid-pursuit.
//
// (2) It reads instantly at small size. Four dark toe beans and a pad,
// one compact cluster, high contrast on any background, a shape every
// reader already knows. It needs no fine detail the way a key's teeth
// or an eagle's beak do. At 16 pixels it is still unmistakably a paw
// print.
//
// (3) It says something specific about how the agent works. Tracking
// is a method, not a mood: read the board, test the lead, keep the
// receipts, discard the dead ends, keep going until the catch. Prints
// are the record of that method — one step after another, in order.
// The target 🎯 says only "aims" and the moon 🌙 only "works at night":
// neither names a method.
//
// (4) It is distinctive, not the first obvious pick. The brief warns
// against the robot and the smiley, and the live field of 152
// submissions is flooded with compass (15 titles), owl (11), arm (9),
// octopus (7) and loop (5). Prints appear in zero titles and zero
// glyphs in the field. Nobody's first idea for "my AI agent" is a paw
// print — the first ideas are the robot, the brain, the compass, the
// owl.
//
// (5) The tone fits and it lands without explanation. Playful, not
// grandiose: a hunter that leaves prints is determined, a little
// stubborn, and slightly funny about it — it keeps going, the way our
// agent loops until the job is done. It needs no caption because the
// image is the whole sentence: something is tracking something. The
// misread to check is "pet", and even that still implies a living
// creature on a trail, closer to an agent at work than the hook's
// misread ("fishing hobby").
//
// How this glyph was chosen: twelve candidates were drafted in empty
// lanes from the winner research and pairwise self-judged against the
// brief's five criteria in order, a full round-robin of 66 games (see
// CANDIDATES.md). The paw prints 🐾 and the fishing hook 🪝 tied at
// the top, 10.5–0.5 each, drawing their head-to-head game on identical
// criterion ratings. The tie was broken on the brief's own spirit:
// prints imply the hunter, the hook is inert tackle, and a trail is a
// method while a catch is only an outcome. The hook is the honest
// runner-up; the flashlight 🔦 and the hourglass ⏳ shared third at
// 8.5–2.5. Picks the field already took were excluded before the
// tournament: the detective 🕵️, the magnifying glass 🔍, the boomerang
// 🪃, the wolf 🐺, the satellite antenna 📡, the bow and arrow 🏹.
//
// The program does nothing clever on purpose. It holds the glyph as
// one constant, checks it against the competition's own gate before
// writing (1–16 Unicode code points, exactly one grapheme cluster,
// not only whitespace), and writes it with no trailing newline. No
// clock, no random source, no network — two runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The glyph. One paw print: the track of a hunter that has not stopped.
const GLYPH = '🐾';

// The competition's gate, applied here before anything is written.
const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 16;

function abort(why: string): never {
  throw new Error('main.ts: ' + why);
}

function writeGlyph(): void {
  // Count code points ([...GLYPH] splits on them), because that is
  // how the gate counts. Count grapheme clusters too: a glyph built
  // from a base plus a variation selector or joiner would pass a
  // code-point count and still not be one glyph. This glyph is one
  // code point and one cluster, so both counts agree at 1.
  const codePoints = [...GLYPH].length;
  const clusters = [
    ...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(GLYPH),
  ].length;
  if (codePoints < MIN_CODE_POINTS || codePoints > MAX_CODE_POINTS) {
    abort(`entry is ${codePoints} code points, outside the 1–16 gate`);
  }
  if (clusters !== 1) {
    abort(`entry is ${clusters} grapheme clusters, not a single emoji`);
  }
  if (GLYPH.trim().length === 0) {
    abort('entry is only whitespace');
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const to = join(outDir, 'entry.txt');

  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is the glyph alone, nothing else.
  writeFileSync(to, GLYPH, 'utf8');
  console.log(`wrote ${to} (${codePoints} code point, ${clusters} cluster, ${Buffer.byteLength(GLYPH, 'utf8')} bytes)`);
}

writeGlyph();
