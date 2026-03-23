# People Team Icon — "The Horizon" Mark v2 (Canonical)

> **This is the only valid version.** Any earlier versions (v1 with diamonds/rectangles, connector rails, arc-based person body, or rx=112 corners) are deprecated and must not be referenced or reproduced.

---

## Quick Spec (for code generation)

| Property | Value |
|---|---|
| Person head | Circle r=24 blue over r=25 dark outline at cy=115 |
| Person body | Bezier: `C 358,148 375,130 400,130` (blue) over `C 358,145 375,128 400,128` (dark outline) |
| Network lines origin | y=140 (person center), NOT y=148 or y=185 |
| Network geometry | Circles + cardinal/diagonal crosses + spokes ONLY. No diamonds, no rectangles. |
| Circle radii | 110, 185, 270, 370 centered at (400, 300) |
| Circle opacities | 0.15, 0.10, 0.07, 0.04 |
| Cardinal cross opacity | 0.08 |
| Diagonal cross opacity | 0.06 |
| Spoke opacity | 0.10 |
| Road fill | linearGradient: black (opacity 1) top → #0056FF (opacity 0.15) bottom |
| Road edge stroke | #0056FF, stroke-width 3 |
| Dashed center line | #4a4a4a, stroke-width 3, dasharray 16/14, opacity 0.6 |
| Text | Inter Black (900), 90px, letter-spacing 4, white, drop shadow filter |
| Corner radius | rx=90 (NOT 112) |
| Background | #080808 (NOT pure black #000) |
| DAT logo boxes | 48x48, no rx, #0056FF fill |
| DAT logo text | Inter 900, 30px for D/A/T |

---

## Design Elements

### Person figure
Two-layer construction: dark (#080808) outline shape drawn first (r=25 head, wider body curve), then blue (#0056FF) on top (r=24 head, tighter body curve). Creates depth ring. Body uses cubic bezier curves, NOT arc paths. Network lines originate from y=140.

### Network
Simplified: concentric circles, cardinal cross (+), diagonal cross (X), inner-to-mid spokes at 45° intervals. No diamonds, no rectangles, no secondary angles. Inner ring nodes: ring-alpha 0.4, dot-alpha 0.65. Mid ring nodes: ring-alpha 0.3, dot-alpha 0.55. Prominent person nodes: ring-alpha 0.8, dot-alpha 0.9, stroke-width 2.

### Road
Gradient fill (linearGradient black→blue 15%), not flat rgba. Edge lines #0056FF stroke-width 3. Apex at y=195.

### Text
"PEOPLE" y=415, "TEAM" y=515. Inter 900, 90px, letter-spacing 4, white, drop shadow (dy=4 stdDeviation=6 black 0.6).

### Dashed center line
#4a4a4a (not #808080), stroke-width 3, dasharray 16/14, opacity 0.6. Breaks: apex→345, 430→450, 532→830.

### DAT logo
Three 48x48 squares, #0056FF, 6px gap. Letters Inter 900, 30px. "Freight & Analytics" 16px weight 700. TM 8px 60% white. At translate(247, 690).

---

## Color Modes

| Mode | Background | Blue | Text | Dash | Network mult |
|---|---|---|---|---|---|
| Dark (default) | #080808 | #0056FF | #FFF | #4a4a4a | 1.0x |
| White | #FFF | #0046DD | #000 | #A5A5A5 | 0.55x |
| Grey | #1F1F1F | #0056FF | #FFF | #595959 | 0.85x |

---

## Animation (HTML/CSS)

All durations multiplied by 1.5x. Glow max 0.25. Person glow 5s cycle (0.3→0.6). Staggered delays across rings. Wrapped in `prefers-reduced-motion: reduce`.

---

## Sizes and Files

800/512/200px PNGs per mode. Animated HTML standalone. When embedding in a page, crop to viewBox="50 30 700 580" and omit text/logo.

```
people-team-dark-{800,512,200}.png
people-team-white-{800,512,200}.png
people-team-grey-{800,512,200}.png
people-team-animated-v2.html
```

---

## Deprecated (DO NOT USE)

- Diamond/rotated square network shapes
- Axis-aligned rectangle network shapes
- Secondary angular lines at 22.5°
- Connector rails (horizontal lines + dots flanking text)
- Arc-based person body (`A 39,39 0 0 1`)
- rx=112 corners
- Pure black #000 background
- Network line origins at y=148 or y=185
- #808080 dashed line
- letter-spacing 3 or none
- Flat rgba road fill
