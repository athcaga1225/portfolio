# Design System — v2

The tokens for v2 are all defined in `:root` at the top of `v2/index.html`. Everything below `:root` may only reference tokens through `var(--…)`.

## Hard rules (enforced by `scripts/lint-design.mjs`)

| Rule | Detail |
|---|---|
| No raw px | Outside `:root`, no `px` value may be written. Spacing, size, radius and font size must all use tokens. |
| No raw colour | Outside `:root`, hex, `rgb()` and `hsl()` are banned. Colours in JS and SVG also use `var(--c-…)`. |
| No `!important` | Not allowed anywhere. Use specificity or a `:not([hidden])` style selector instead. |
| No `position:absolute` | To layer things, use grid stacking (`grid-area:1/1`). For stacking order, use `position:relative` plus a `z-index` token. `sticky` and `fixed` are allowed only for the nav, progress bar and dialogs. |
| No undefined tokens | Every `var(--x)` must be defined in `:root`. Variables JS writes at runtime (`--mw`, `--vt`, `--vh`, `--p` and so on) are on the lint allow-list. |

Run the lint before every change:

```bash
node scripts/lint-design.mjs
# ✓ design lint passed — 132 tokens, 0 px / hex / !important / absolute outside :root
```

### Allowed exceptions
- **Breakpoints** use `em` (`68.75em` / `53.75em` / `37.5em`), because CSS media queries cannot read variables.
- **Runtime geometry in JS**, such as pointer offsets, parallax and minimap ratios, is computed and then written back as CSS variables. It is not hard-coded styling.
- Unitless values such as `0`, `1fr`, `%`, `vh` / `vw`, `cqw` and line-height multipliers.

## Tokens

### Colour
| Layer | Tokens |
|---|---|
| Palette | `--c-paper` `--c-ink` `--c-mute` `--c-line` `--c-soft` (each with a `-dk` dark-mode version), `--c-coral` `--c-peach` `--c-mist`, `--c-blue` `--c-green` `--c-green-ink` `--c-night`, `--c-white` `--c-black`, vinyl `--c-vinyl*` |
| Semantic | `--bg` `--ink` `--mute` `--line` `--soft` (switch automatically via `light-dark()`), `--accent` `--edge` |
| Category theme | `.crate[data-lg=web\|visual\|motion]` overrides `--lb` (background) and `--ink` (text): Web = blue/white, Visual = green/deep green, Motion = black/off-white |
| Secondary text | `opacity:var(--o-mute)` (.85). Every theme meets WCAG AA. |

### Type
`--fs-xs` 12 · `--fs-s` 13 · `--fs-m` 15 · `--fs-base` 17 · `--fs-l` 20 · `--fs-xl` 24. Fluid sizes: `--fs-h3` `--fs-h2` `--fs-h1` `--fs-lead` `--fs-shelf` `--fs-menu` `--fs-d4…d1`.
Line height: `--lh-tight` .86 · `--lh-snug` 1.2 · `--lh-body` 1.6.

### Space
Fixed scale: `--s-1` 2 · `--s-2` 4 · `--s-3` 8 · `--s-4` 12 · `--s-5` 16 · `--s-6` 20 · `--s-7` 24 · `--s-8` 32 · `--s-9` 40 · `--s-10` 48 · `--s-11` 64 · `--s-12` 96

Fluid (semantic) tokens:
- `--gutter`: page side margin
- `--sp-col`: gap between columns
- `--sp-block`: gap between blocks
- `--sp-group`: gap between the three category groups
- `--sp-section` and `--sp-section-l`: section spacing
- `--sp-head` and `--sp-cnav`: header and player offsets
- `--sp-media` and `--sp-media-c`: padding around media

### Size, radius, elevation
- Lines: `--hair` 1 · `--rule` 2 · `--rule-m` 3
- Tap targets: `--tap` 44 · `--tap-l` 52 · `--btn` 36 · `--btn-s` 30 (all controls are at least 24×24)
- Radius: `--r-s` 6 · `--r-m` 10 · `--r-l` 14 · `--r-xl` 18 · `--r-full`
- Shadows: `--sh-float` · `--sh-media`

### Motion
- Easing: `--ease` (default ease-out) · `--ease-soft`
- Durations: `--t-fast` .15s · `--t-1` .3s · `--t-2` .5s · `--t-3` .9s · `--t-4` 1.2s · `--t-open` 1.6s · `--t-close` 1.25s
- Only `.crate` animates colour; children inherit it, which prevents flicker. Text colour switches mid-fade using `steps(2,jump-none)`.
- Under `prefers-reduced-motion: reduce`, parallax, entrance animations and smooth scrolling are all turned off.

### Layers
`--z-sticky` 30 · `--z-nav` 50 · `--z-prog` 60 · `--z-menu` 90 · `--z-dlg` 100 · `--z-vwr` 150 · `--z-skip` 200

## Accessibility checklist (audited 2026-11)
- Contrast: every theme's body and secondary text is ≥ 4.5:1. The secondary-text opacity went from .68 to .85.
- Headings: h1 (visually hidden) → h2 for each category / About / Contact → h3 for sub-items. No levels are skipped.
- Landmarks: header / main / nav ×3 / footer; `lang="zh-Hant"`.
- Every button has a name; images and SVGs have alt text or an aria-label.
- Focus rings show for keyboard users only (`html.kb`), and a skip link is provided.
- Tap targets are ≥ 24×24 (footer links got padding).
- Text on the turntable's record label is decorative and marked `aria-hidden`, so it is excluded from the minimum-size check.
