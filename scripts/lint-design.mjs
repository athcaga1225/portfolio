// Design-system lint for v2/index.html
// Usage: node scripts/lint-design.mjs
// Fails (exit 1) when a style rule or markup breaks the rules in DESIGN.md.
import { readFileSync } from 'node:fs';

const file = new URL('../v2/index.html', import.meta.url);
const html = readFileSync(file, 'utf8');
const css = html.slice(html.indexOf('<style>') + 7, html.indexOf('</style>')).replace(/\/\*[\s\S]*?\*\//g, '');
const rest = html.slice(html.indexOf('</style>'));

// split :root token block(s) from rules
const rootRe = /:root\s*\{[^}]*\}/g;
const tokens = (css.match(rootRe) || []).join('\n');
const rules = css.replace(rootRe, '').replace(/\/\*[\s\S]*?\*\//g, '');

const problems = [];
const report = (kind, list) => list.forEach(m => problems.push(`${kind}: ${m}`));
const ctx = (src, i) => src.slice(Math.max(0, i - 50), i + 30).replace(/\s+/g, ' ');

const find = (re, src) => [...src.matchAll(re)].map(m => ctx(src, m.index));

report('px outside :root', find(/(?<![\w.#-])\d*\.?\d+px\b/g, rules));
report('hex colour outside :root', find(/#[0-9a-fA-F]{3,8}\b(?![\w-])/g, rules));
report('rgb()/hsl() outside :root', find(/\b(?:rgba?|hsla?)\(/g, rules));
report('!important', find(/!important/g, css));
report('position:absolute', find(/position\s*:\s*absolute/g, css));
// colours hard-coded in markup / scripts (data in works.json is exempt)
report('hex colour in markup/script', find(/(?:fill|stroke|color|background)=?["':]\s*#[0-9a-fA-F]{3,8}\b/g, rest));
report("hex colour constant in script", find(/=\s*'#[0-9a-fA-F]{3,8}'/g, rest));

// every var() used in rules must be defined somewhere (tokens, rules, or set at runtime)
const runtime = ['--ox','--oy','--vt','--vh','--f','--up','--pbg','--ar','--w','--c','--k','--d','--i','--sh','--to','--out','--mw','--lb','--pw'];
const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]).concat(runtime));
const undef = [...new Set([...rules.matchAll(/var\((--[\w-]+)/g)].map(m => m[1]))].filter(v => !defined.has(v));
report('undefined token', undef);

const tokenCount = (tokens.match(/--[\w-]+\s*:/g) || []).length;
if (problems.length) {
  console.log(`✗ ${problems.length} problem(s)`);
  problems.forEach(p => console.log('  - ' + p));
  process.exit(1);
}
console.log(`✓ design lint passed — ${tokenCount} tokens, 0 px / hex / !important / absolute outside :root`);
