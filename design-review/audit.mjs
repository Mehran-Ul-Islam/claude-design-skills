#!/usr/bin/env node
// Designer's-eye static audit. Usage: node design-review/audit.mjs [dir] [--strict]
// Add `audit-ignore` in a comment on a line to exempt it.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const root = args.find((a) => !a.startsWith("--")) ?? ".";
const EXT = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".html"]);
const SKIP = new Set(["node_modules", "dist", "build", ".git"]);
const isTokenFile = (f) => /(^|[\\/])tokens([\\/]|\.)/.test(f) || /[\\/]design-review[\\/]/.test(f);
const isCss = (f) => /\.(css|html)$/.test(f);

const line = [
  {
    id: "hex-outside-tokens", level: "error",
    test: (l, f) => !isTokenFile(f) && /(?<!url\()(?<![&\w])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/.test(l),
    msg: "Raw hex color. Use a token (var(--ink), text-ink, ...).",
  },
  {
    id: "css-keyframes", level: "error",
    test: (l) => /@keyframes/.test(l),
    msg: "@keyframes can't be interrupted or retargeted. Use a Framer Motion spring.",
  },
  {
    id: "css-transition", level: "error",
    test: (l, f) => isCss(f) && /\btransition\s*:/.test(l),
    msg: "CSS transition. Use a spring (type: \"spring\") via Framer Motion.",
  },
  {
    id: "tailwind-transition", level: "error",
    test: (l, f) => !isCss(f) && /["'`\s](transition(?:-[a-z]+)?|duration-\d+|ease-(?:in|out|linear|in-out))(?=["'`\s])/.test(l),
    msg: "Tailwind transition/duration/ease class. Use a Framer Motion spring.",
  },
  {
    id: "tween-or-ease", level: "error",
    test: (l) => /type:\s*["']tween["']|\bease:\s*["']|\bease(?:In|Out|InOut)\b|repeat:\s*Infinity/.test(l),
    msg: "Tween/ease/infinite loop. Springs for anything the user touches; no decorative loops.",
  },
  {
    id: "outline-removed", level: "error",
    test: (l) => /\boutline-none\b|outline:\s*none/.test(l) && !/focus-visible/.test(l),
    msg: "Focus outline removed without a focus-visible replacement.",
  },
  {
    id: "off-grid-arbitrary", level: "warn",
    test: (l) => {
      const re = /\b(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y|w|h)-\[(\d+)px\]/g;
      let m; while ((m = re.exec(l))) if (Number(m[1]) % 4 !== 0) return true;
      return false;
    },
    msg: "Arbitrary px value off the 4pt grid.",
  },
  {
    id: "px-font-size", level: "warn",
    test: (l) => /font-size\s*:\s*\d+px/.test(l),
    msg: "Fixed px font size. Use rem so text scales with the user's setting.",
  },
  {
    id: "all-caps-label", level: "warn",
    test: (l) => /\buppercase\b|tracking-(?:wide|wider|widest)\b|text-transform\s*:\s*uppercase/.test(l),
    msg: "All-caps / tracked-out label: a common generated-UI tell. Does the content need it?",
  },
  {
    id: "tailwind-animate", level: "warn",
    test: (l) => /\banimate-(?:spin|ping|pulse|bounce)\b/.test(l),
    msg: "Tailwind animate-* uses CSS keyframes. Fine for a spinner; otherwise use a spring.",
  },
];

const file = [
  {
    id: "no-reduced-motion", level: "warn",
    test: (src) =>
      /\bmotion\.|\banimate\(/.test(src) &&
      !/useReducedMotion|MotionConfig|reducedMotion|spring-motion|springs\.js|useSpringTransition/.test(src),
    msg: "Uses motion but never checks reduced motion.",
  },
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(name))) yield p;
  }
}

const findings = [];
for (const f of walk(root)) {
  const src = readFileSync(f, "utf8");
  src.split("\n").forEach((l, i) => {
    if (/audit-ignore/.test(l)) return;
    for (const r of line) if (r.test(l, f)) findings.push({ f, n: i + 1, ...r });
  });
  if (!isTokenFile(f)) for (const r of file) if (r.test(src)) findings.push({ f, n: 1, ...r });
}

const errors = findings.filter((x) => x.level === "error");
const warns = findings.filter((x) => x.level === "warn");
for (const x of [...errors, ...warns]) {
  console.log(`${x.level.toUpperCase().padEnd(5)} ${relative(process.cwd(), x.f)}:${x.n}  [${x.id}] ${x.msg}`);
}
console.log(`\n${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length || (strict && warns.length) ? 1 : 0);
