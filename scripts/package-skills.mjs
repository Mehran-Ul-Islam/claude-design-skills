#!/usr/bin/env node
// Builds one self-contained, uploadable skill folder per skill into dist/skills/<name>/.
// Each folder = SKILL.md + assets/ (the skill's files AND the files it imports, same relative layout)
// so the skill works on its own in claude.ai, Claude Desktop/mobile, or Claude Code.
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist", "skills");

const manifest = {
  tokens: ["tokens/tokens.js", "tokens/tokens.css", "tokens/build-css.mjs", "tokens/tailwind.preset.js"],
  "spring-motion": ["spring-motion/springs.js", "spring-motion/Pressable.jsx", "spring-motion/index.js"],
  "glass-surface": [
    "glass-surface/GlassSurface.jsx", "glass-surface/glass.css",
    "spring-motion/springs.js", "tokens/tokens.js", "tokens/tokens.css",
  ],
  "sheet-modal": [
    "sheet-modal/Sheet.jsx", "sheet-modal/index.js",
    "glass-surface/glass.css", "spring-motion/springs.js", "tokens/tokens.js", "tokens/tokens.css",
  ],
  "design-review": ["design-review/audit.mjs", "design-review/checklist.md"],
};

rmSync(out, { recursive: true, force: true });
for (const [name, files] of Object.entries(manifest)) {
  const dir = join(out, name);
  mkdirSync(join(dir, "assets"), { recursive: true });
  cpSync(join(root, name, "SKILL.md"), join(dir, "SKILL.md"));
  for (const f of files) {
    const src = join(root, f);
    if (!existsSync(src)) throw new Error(`missing ${f} for ${name}`);
    cpSync(src, join(dir, "assets", f));
  }
  // ESM marker so .js files with import/export run under plain `node` with no project package.json.
  writeFileSync(join(dir, "assets", "package.json"), '{ "type": "module" }\n');
  const zip = spawnSync("zip", ["-qr", `${name}.zip`, name], { cwd: out });
  console.log(`${name}: ${files.length} files${zip.status === 0 ? " -> " + name + ".zip" : " (no zip CLI; zip the folder yourself)"}`);
}
