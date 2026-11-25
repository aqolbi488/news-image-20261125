// news-image-20261125 entry (Node 22, standard library only).
// The submitted image ships beside this file as entry.png; the program
// copies it to the output directory unchanged, so both grader runs
// produce identical bytes.
//
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const here = new URL('./entry.png', import.meta.url);
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(here, dest);
