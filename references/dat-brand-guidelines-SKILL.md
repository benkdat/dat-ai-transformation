---
name: dat-brand-guidelines
description: >
  Applies DAT Freight & Analytics official brand identity, colors, typography, voice/tone, and design system
  to any asset Claude creates. Use this skill whenever creating or styling anything for DAT, including
  presentations, dashboards, HTML artifacts, React apps, reports, documents, Slack/email comms, PDFs,
  data visualizations, internal tools, or any People Team deliverable. Also trigger when the user mentions
  DAT branding, DAT colors, DAT design system, DAT style, "make it look like DAT," People Team assets,
  or references the DAT Pathfinder voice. If the output is for DAT Freight & Analytics in any capacity,
  read this skill first.
---

# DAT Freight & Analytics — Brand Guidelines Skill

Apply DAT's official brand identity to every asset. Read `references/brand-reference.md` for the full
specification. This file covers the essentials and how to apply them.

## When to Read the Full Reference

Always start by reading `references/brand-reference.md` when:
- Creating any visual asset (deck, dashboard, HTML, React, PDF, chart)
- Writing communications in DAT's voice (Slack, email, docs, reports)
- Building a web app or tool styled for DAT
- Generating data visualizations or dashboards
- Unsure about a specific color, font, or tone question

For quick lookups (you already know the palette), the summary below is enough.

---

## Quick Reference

### Colors

| Token | HEX | Use |
|---|---|---|
| `--dat-blue` | `#0046DD` | Primary brand color. Buttons, headings, links, charts. |
| `--dat-blue-on-black` | `#0056FF` | DAT Blue adjusted for dark backgrounds. |
| `--dat-digital-blue` | `#0046E0` | Digital platforms with heavy black backgrounds. |
| `--dat-black` | `#000000` | Headlines, dark backgrounds, co-primary with blue. |
| `--dat-white` | `#FFFFFF` | Light backgrounds, text on dark. |
| `--dat-grey` | `#8A8D8F` | Borders, secondary text, subtle accents. |
| `--dat-grey-medium` | `#6E6B68` | Supporting elements. |
| `--dat-grey-dark` | `#565657` | Heavier supporting elements. |
| `--dat-red` | `#E10600` | Alerts, negative indicators, urgency. Sparingly. |
| `--dat-yellow` | `#FFD700` | Highlights, call-outs. Sparingly. |

**Ratio:** Blue + Black dominant (~70%), White + Greys base (~20%), Red/Yellow accent (~10%).

**CSS variables:**
```css
:root {
  --dat-blue: #0046DD;
  --dat-blue-on-black: #0056FF;
  --dat-digital-blue: #0046E0;
  --dat-black: #000000;
  --dat-white: #FFFFFF;
  --dat-grey: #8A8D8F;
  --dat-grey-medium: #6E6B68;
  --dat-grey-dark: #565657;
  --dat-red: #E10600;
  --dat-yellow: #FFD700;
}
```

**Tailwind extend:**
```js
colors: {
  dat: {
    blue: '#0046DD',
    'blue-light': '#0056FF',
    'digital-blue': '#0046E0',
    black: '#000000',
    white: '#FFFFFF',
    grey: '#8A8D8F',
    'grey-medium': '#6E6B68',
    'grey-dark': '#565657',
    red: '#E10600',
    yellow: '#FFD700',
  }
}
```

### Typography

| Context | Font | Weight | Fallback |
|---|---|---|---|
| Headlines | Sequel Sans | Black | Inter Black, system sans-serif |
| Secondary headlines | Sequel Sans | Bold | Inter Bold |
| Body copy | Sequel Sans | Roman (Regular) | Inter Regular |
| Google Docs only | Inter | (see above mapping) | — |

**Font stack for web/digital:**
```css
font-family: 'Sequel Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Since Sequel Sans is a commercial font and often unavailable in code environments, default to **Inter** 
(available from Google Fonts / CDN) as the working substitute. Import it in HTML/React artifacts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

### Voice & Tone

DAT's brand character is **The Pathfinder**: intelligent, uniting, empowering, brave, trusted.

When writing DAT comms:
- Be informative and approachable, never aloof or preachy
- Advocate for customers and teammates, move at their pace
- Equip and empower, don't hand-hold or prescribe
- Think big, stand behind perspectives, stay grounded
- Earn trust through accuracy, fairness, and consistency

**Communication tiers:** Lead with **Inspire** (bold mission framing), support with **Explain** (product/data details), deepen with **Connect** (relationships, expertise, loyalty).

**Internal language rules:**
- Say "teammates" not "employees"
- Say "People Team" not "HR"

### Key Phrases

| Phrase | Context |
|---|---|
| WE TAKE THE UNCERTAINTY OUT OF FREIGHT | Mission. Headlines, hero text. |
| Find your path | Pathfinder tagline. |
| Clarity of Choice | Brand essence. |
| Relevance Now and Next | Value proposition. |
| Here's to Knowing | Manifesto / campaign anchor. |
| Compete, Perform, Prosper | Customer aspirational outcome. |

---

## People Team Icon ("The Horizon" v2)

When generating the People Team icon or embedding it in any asset, **always** read `references/people-team-icon-reference.md` first. Key rules:
- Person has dark outline behind blue fill (two-layer bezier body, NOT arcs)
- Network is circles + crosses + spokes only (NO diamonds, rectangles, or secondary angles)
- Road uses linearGradient fill (black→blue), not flat rgba
- Network lines originate from y=140
- Background #080808, corner rx=90, Inter Black 900 at letter-spacing 4
- Dashed line #4a4a4a (not #808080)
- Any earlier version specs are deprecated

---

## Applying the Brand by Asset Type

### HTML / React Artifacts & Web Apps
- Import Inter from Google Fonts as the primary typeface
- Use the Tailwind color extend or CSS variables above
- DAT Blue (`#0046DD`) for primary interactive elements (buttons, links, active states)
- Black backgrounds with `#0056FF` for dark mode
- White backgrounds with `#0046DD` for light mode
- Signal Red for errors/alerts, Signal Yellow for highlights
- Data charts: blue primary, grey secondary, red/yellow for heat maps and alerts
- Bold, confident headlines. Clean layouts with generous white space.

### Presentations (PPTX)
- DAT Blue and Black as dominant slide colors
- White for contrast and breathing room
- Inter (or Sequel Sans if available) for all text
- Black weight for slide titles, Regular for body
- Include DAT logo with proper clear space (min half-box-width around logo)
- Photography: real people, warm lighting, fresh angles, motion

### Dashboards & Data Viz
- Primary data series: DAT Blue
- Secondary series: Grey tones
- Positive/growth: DAT Blue or Signal Yellow
- Negative/alert: Signal Red
- Background: White (light mode) or Black (dark mode)
- Gridlines and borders: light grey
- Aim for clean, organized, dimensional data presentation
- 3D depth treatments encouraged for layered data

### Documents (DOCX / PDF / Markdown)
- DAT Blue for headings and accent elements
- Body text in regular weight
- Clean tables using the brand palette
- Consistent logo placement with clear space

### Slack / Email / Written Comms
- Pathfinder voice: intelligent, uniting, empowering, brave, trusted
- Structure using Inspire > Explain > Connect tiers
- Use "teammates" and "People Team" terminology internally

---

## Logo Usage Rules (Summary)

- Primary lockup: DAT Freight & Analytics (horizontal or stacked)
- Secondary: DAT mark alone (when F&A is redundant or space is tight)
- Sub-brand lockups: DAT One (freight), DAT iQ (analytics)
- On dark backgrounds: use adjusted blue (#0056FF) or white logo
- Minimum clear space: half the width of one blue box in the DAT mark
- Never recolor, add gradients, shadows, outline, rotate, crop, or pattern the logo
- Minimum digital size: ~35px high

---

## Source

Based on the DAT Brand Foundation and Guidelines, Rev 6, October 2021.
For official logo files and photography assets, contact the DAT Marketing team.
