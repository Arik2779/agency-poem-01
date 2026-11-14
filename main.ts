// agency-poem-01 entry (Node 22, standard library only).
//
// The poem lives in entry.txt beside this file: an agent's voice,
// handing the choice back to the person who asked. The program below
// simply delivers that file to the grader's output directory, whole.
// At 339 characters it sits inside the gate's 1 to 1,000 characters,
// line ends included, and no line end here is one I did not mean.
//
// Run it the way the kit does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program runs twice and must write the same bytes both times; a
// byte-for-byte copy of one fixed file always does.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The poem lives beside this file in the repository, and the output
// directory is the grader's /output unless MAKEFUN_OUTPUT_DIR says so.
const source = new URL('./entry.txt', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.txt');

if (!existsSync(source)) {
  throw new Error('entry.txt is missing beside main.ts');
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// A copied file must actually hold the poem: refuse an empty or
// truncated write instead of handing the judge a broken file.
const copiedBytes = statSync(target).size;
if (copiedBytes === 0 || copiedBytes !== statSync(source).size) {
  throw new Error('entry.txt was not copied whole');
}
