# DAT Freight & Analytics — Brand Guidelines

> Reference document for creating on-brand DAT assets (presentations, dashboards, reports, comms, digital products, internal tools). Sourced from the official DAT Brand Foundation and Guidelines (Rev 6, October 2021).

---

## Brand Platform

### Purpose (Why We Exist)
To keep America moving with flexibility, efficiency, anticipation, and intelligence, one truck, one load, one pickup and delivery at a time.

### Mission (How We Do It)
**WE TAKE THE UNCERTAINTY OUT OF FREIGHT.**

### Value Proposition (What We Deliver)
Relevance now and next. Deliver relevant connections now, while anticipating the next.

### Brand Essence
**Clarity of Choice.** Present the right options in a way that is clear and connected to business needs. Clarity makes choice easy, reduces risk, gives confidence.

### Brand Promise
A turnkey, end-to-end freight platform that supports shippers, brokers, and carriers with the ability to compete, perform, and prosper.

### Brand Position
The largest network, the most comprehensive data, the biggest load board, and the only freight logistics platform with a human touch.

---

## Brand Architecture

DAT operates a master brand with two sub-brands:

| Brand | Role | Focus |
|---|---|---|
| **DAT Freight & Analytics** | Master brand | Full company identity |
| **DAT One** | Freight sub-brand | End-to-end freight platform for brokers and carriers |
| **DAT iQ** | Analytics sub-brand | Intelligence, analytics, and forecasting |

### Naming Strategy
- **Sub-brands** extend the DAT name to convey focus or expertise (DAT One, DAT iQ)
- **Product names** should prioritize clarity of function (e.g., "Load Board," "RateView")
- **Feature names** can use preferred prefixes: "Quick" (for DAT One, conveying speed/access) or "Custom" (for DAT iQ, conveying tailored intelligence). Only use a prefix if it fits naturally.

---

## Brand Character: The Pathfinder

DAT's brand character is **The Pathfinder**, a seasoned veteran with practical wisdom built through experience. The Pathfinder leads others, empowers them, removes uncertainty by presenting clear choices, and always looks ahead to what's next.

**Tagline:** Find your path.

---

## Voice & Tone

DAT's voice is an extension of The Pathfinder. Five core attributes shape all communication:

### Intelligent
Informative, demonstrative, insightful. Put smarts to work for customers by making the complex approachable. Never aloof, never preachy, never prescriptive.

### Uniting
Inspired, in it together, connected. Advocate for the category and for customers. Move at their pace, be a loyal business partner. Never hand-holding or telling anyone what to do.

### Empowering
Helpful, providing, liberating. Equip customers with tools and data to get the job done. Meet them where they are, big or small, new or veteran. Never out of reach.

### Brave
Big-thinking, bold, responsive. Think big, take bold steps, stand behind perspectives even if they ruffle feathers. Never careless or flippant.

### Trusted
Real, experienced, truthful. Trust built on accuracy, fairness, and truth in data, rates, and market conditions. Down-to-earth, relatable, reliable. Never assuming trust is guaranteed.

### Communication Tiers
Use this hierarchy when structuring any communication:

| Tier | Intent | What It Does |
|---|---|---|
| **Inspire** | Attract and build energy | Bold, optimistic mission statements. Lead with why DAT exists and how it helps. |
| **Explain** | Inform and enable decisions | Communicate unique position and product/service benefits. The details. |
| **Connect** | Strengthen relationships | Validate choices, build loyalty, drive confidence through expertise and personal connection. |

### Messaging Goals
1. **Celebrate the market** — Frame the spot market as flexible capacity, 24/7/365
2. **Own the difference** — DAT's data is the most trusted, clean, and comprehensive
3. **Be more than search** — The freight journey goes dock to dock
4. **Demonstrate empathy** — Love problems over solutions, love people over products
5. **Own the connections** — Biggest network, easiest and most relevant match
6. **Be human** — Show that real people work hard every day behind DAT

---

## Color Palette

### Primary Colors

| Color | HEX | RGB | CMYK | Pantone | Usage |
|---|---|---|---|---|---|
| **DAT Blue** | `#0046DD` | 0, 70, 221 | 100, 80, 0, 12 | Blue 2935 C | Primary brand color. Dominant in all applications. |
| **DAT Blue (on black)** | `#0056FF` | 0, 86, 255 | 100, 50, 0, 0 | Blue 2935 C | Adjusted for visibility on dark backgrounds. |
| **DAT Digital Blue** | `#0046E0` | 0, 70, 224 | — | — | Adjusted for digital platforms with large black backgrounds. |
| **Black** | `#000000` | 0, 0, 0 | 50, 40, 40, 100 | — | Co-primary with DAT Blue. Headlines, backgrounds. |
| **White** | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 | — | Base color, text on dark backgrounds. |

### Secondary / Neutral Colors

| Color | HEX | RGB | Usage |
|---|---|---|---|
| **Grey / Metallic Silver** | `#8A8D8F` | 138, 141, 143 | Subtle accents, borders, secondary text |
| **Grey Medium** | `#6E6B68` | 110, 107, 104 | Supporting elements |
| **Grey Dark** | `#565657` | 86, 86, 87 | Heavier supporting elements |

### Accent Colors

| Color | HEX | RGB | Pantone | Usage |
|---|---|---|---|---|
| **Signal Red** | `#E10600` | 225, 0, 0 | 2347 C | Accent, alerts, urgency. Used sparingly. |
| **Signal Yellow** | `#FFD700` | 255, 215, 0 | 012 C | Accent, highlights, data call-outs. Used sparingly. |
| **Gradient** | Red-to-Yellow | — | — | Accent and pop. Signal Red to Signal Yellow. |

### Color Usage Ratios
- **DAT Blue + Black** = dominant brand presence (~70%)
- **White + Greys** = base and supporting (~20%)
- **Signal Red, Signal Yellow, Gradient** = accent and pop (~10%)

### CSS / Code Quick Reference
```css
:root {
  --dat-blue: #0046DD;
  --dat-blue-on-black: #0056FF;
  --dat-digital-blue: #0046E0;
  --dat-black: #000000;
  --dat-white: #FFFFFF;
  --dat-grey-silver: #8A8D8F;
  --dat-grey-medium: #6E6B68;
  --dat-grey-dark: #565657;
  --dat-signal-red: #E10600;
  --dat-signal-yellow: #FFD700;
}
```

### Tailwind Custom Theme
```js
// tailwind.config.js extend colors
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

---

## Typography

### Primary Font: Sequel Sans
The official DAT brand typeface. Used across all external-facing materials.

| Weight | Usage |
|---|---|
| **Black** (+ Italic) | Headlines, hero text |
| **Bold** (+ Italic) | Secondary headlines, emphasis |
| **Medium** (+ Italic) | Sub-headlines when needed |
| **Roman** (+ Italic) | Body copy (default) |
| **Light** (+ Italic) | Tertiary/supporting text when needed |

### Google Docs Substitute: Inter
For internal Google Docs/Sheets only. Never on external-facing materials.

| Weight | Maps To |
|---|---|
| **Black** | Headlines |
| **Bold** | Secondary headlines |
| **Medium** | Sub-headlines |
| **Regular** | Body copy |
| **Thin** | Supporting/light text |

### Web / Digital Fallback Stack
When Sequel Sans is not available in digital contexts, use Inter as the primary fallback:

```css
font-family: 'Sequel Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Typesetting Rules
- Headlines use **Sequel Sans Black**. Can be all caps, title case, or sentence case.
- Tracking should be tight but breathable for headlines.
- Body copy uses **Sequel Sans Roman** with tracking at zero and leading opened for readability.
- Paragraph alignment: centered or left-aligned depending on context.
- Never break words in headlines.
- Outline stroke headlines: use a stroke weight ~2% of type size (e.g., 2pt stroke on 100pt type).
- Never mix other typefaces with Sequel Sans in external-facing work.

---

## Logo System

### Logo Lockups Available
| Lockup | When to Use |
|---|---|
| **DAT F&A Horizontal** | Horizontally dominant spaces, general brand use |
| **DAT F&A Stacked** | Vertically dominant spaces |
| **DAT Secondary (no F&A)** | When "Freight & Analytics" is redundant, at small sizes, apparel, signage |
| **DAT F&A Approachable** | Special use with approachable tagline (articles, white papers) |
| **DAT One** lockups | DAT One freight sub-brand contexts |
| **DAT iQ** lockups | DAT iQ analytics sub-brand contexts |
| **Partnership lockups** | "By DAT" or "Powered By DAT" for licensed/co-branded products |

### Logo Color Rules
- **Primary:** Full color (DAT Blue)
- **On black backgrounds:** Use adjusted blue (#0056FF) for visibility
- **One-color light backgrounds:** Black
- **One-color dark backgrounds:** White
- **Never** recolor, add gradients, add shadows, outline, rotate, crop, repeat as pattern, or use old logos/colors

### Clear Space
Minimum clear space around any logo = "X" (half the width/height of one blue box in the DAT mark). Maintain as much clear space as possible.

### Minimum Sizes
- DAT Logo: minimum 0.495"W x 0.15"H (print), ~35px high (digital)
- Stacked Lockup: minimum 0.9426"W x 0.4353"H (print)
- For digital at small scales (30-80px), use the designated small-scale lockup variants

---

## Design Theme: The Interchange

The DAT design theme is called **The Interchange**. It represents where the brand platform comes together visually. Attributes:

**Clear, Dynamic, Next, Precise, Organized, Confident, Vibrant, In Motion, Bold, Fresh, Forward, Modern**

### Design Principles
- Use DAT Blue and Black as the dominant visual foundation
- Typography should feel bold and confident (Sequel Sans Black for impact)
- Photography and imagery should convey motion, real people, fresh perspectives
- Data visualization should feel clean, organized, dimensional, with a sense of depth
- Signal Red and Signal Yellow for accents, heat mapping, and attention-grabbing moments
- White space is important for breathing room and clarity

---

## Data Visualization

- Clean, organized, and dynamic with a sense of depth
- Use zoom-in/zoom-out features and dimensionality where possible
- Information should be easy to absorb at a glance
- Use the DAT color palette for heat mapping: blue baseline, signal red/yellow for hot spots and predictive moments
- 3D depth treatments are encouraged for revealing deeper layers of data

### Dashboard Color Recommendations
```
Primary data: DAT Blue (#0046DD)
Secondary data: Grey tones (#8A8D8F, #6E6B68)
Positive/growth: DAT Blue or Signal Yellow
Negative/alert: Signal Red (#E10600)
Background: White (#FFFFFF) or Black (#000000)
Gridlines/borders: Light grey
```

---

## Iconography & Illustration

### Icon Style
- Realistic and proportionally correct
- Medium line weights with a mix of straight and curved lines
- Simple, confident, readable at any scale
- Should resonate with The Pathfinder character

### Illustration Style
- 3D isometric drawings
- Mix of solid fills, line weights, and shadowing
- Duo-tone blue color treatment
- Conveys depth, detail, and character

---

## Photography & Imagery

### Composition Matrix
| Category | Weight | Subjects |
|---|---|---|
| **People first** | ~40% | Load Warriors (carriers/drivers) and Load Masters (brokers). Real, approachable, diverse. |
| **Views from the road** | ~35% | American landscapes, sights, the journey. Motion, time of day, road-side moments. |
| **The freight load** | ~25% | How loads move, truck perspectives, the mechanics of freight. |

### Photography Guidelines
- Dramatic lighting, sharp focus, fresh angles, motion
- Real people, real expressions. Never posed or stock-feeling.
- Warm, natural lighting preferred
- Show confidence, diversity in ethnicity and gender
- Capture blue trucks when possible for brand color consistency
- Use cropping, depth, and frame-within-frame techniques
- Leave enough image around subjects for flexible scaling

### Photography Don'ts
- No models (use real people)
- No clipped/cutout people on plain backgrounds
- No black-and-white, cold, or Photoshop-heavy processing
- No unapproachable or disparaging imagery
- No hyper-real lighting or color effects
- No red trucks (prefer blue)
- Avoid stock imagery commonly used by competitors

---

## Internal Communications Context (People Team)

For internal DAT assets (People Team comms, dashboards, reports, Slack messages):

- Use **"teammates"** instead of "employees"
- Use **"People Team"** instead of "HR"
- Voice should still align with Pathfinder attributes but can be warmer and more direct for internal audiences
- DAT Blue and the standard palette apply to internal dashboards and presentations
- Inter font is acceptable for Google Docs/Sheets
- Sequel Sans preferred for polished internal decks and PDFs

---

## Application Quick Reference

### Presentations / Decks
- DAT Blue and Black dominant, with white for contrast
- Sequel Sans typography (Black for headlines, Roman for body)
- Bold, confident headline treatments
- Clean data visualizations with the DAT palette
- Use photography that follows Interchange guidelines
- Include DAT logo (appropriate lockup) per clear space rules

### Dashboards / Web Apps
- Use the CSS/Tailwind variables defined above
- Inter or system sans-serif as fallback when Sequel Sans isn't available
- DAT Blue as primary interactive color
- Signal Red for alerts/negative indicators
- Signal Yellow for highlights/call-outs
- Dark mode: use black backgrounds with DAT Blue on Black (#0056FF)
- Light mode: white backgrounds with DAT Blue (#0046DD)

### Email / Slack / Written Comms
- Align with Pathfinder voice: intelligent, uniting, empowering, brave, trusted
- Lead with the Inspire tier for high-level comms, layer in Explain and Connect
- Keep tone real, approachable, and never preachy

### Reports / Documents
- Follow brand typography hierarchy
- DAT Blue for headings and accent elements
- Clean tables and charts using the data visualization palette
- Maintain consistent logo placement and clear space

---

## Key Phrases & Taglines

| Phrase | Context |
|---|---|
| **WE TAKE THE UNCERTAINTY OUT OF FREIGHT** | Mission statement. Use in headlines and hero contexts. |
| **Find your path** | Pathfinder tagline. Use for brand connection. |
| **Clarity of Choice** | Brand essence. Internal reference, can inform external messaging. |
| **Relevance Now and Next** | Value proposition framing. |
| **Here's to Knowing** | Manifesto anchor. Campaign and thought-leadership contexts. |
| **Compete, Perform, Prosper** | Aspirational outcome framing for customers. |

---

## People Team Icon — "The Horizon" Mark v2 (Canonical)

> **This is the only valid version.** Any earlier versions are deprecated.

The People Team identity mark for Slack, People Hub, presentations, email signatures, and all People Team branded touchpoints.

### Construction
- **Person**: Two-layer (dark outline behind blue fill). Head circle r=24 blue over r=25 dark at cy=115. Body uses cubic bezier curves (`C 358,148 375,130 400,130`), NOT arcs.
- **Network**: Concentric circles (r=110/185/270/370 at cx=400,cy=300) + cardinal cross + diagonal cross + inner-to-mid spokes. **No diamonds, no rectangles, no secondary angles.**
- **Road**: linearGradient fill (black→#0056FF at 15% opacity). Edge lines #0056FF stroke-width 3. Apex at y=195.
- **Text**: Inter Black (900), 90px, letter-spacing 4, white with drop shadow. "PEOPLE" y=415, "TEAM" y=515.
- **Dashed line**: #4a4a4a, stroke-width 3, dasharray 16/14, opacity 0.6. Breaks around text.
- **Corner radius**: rx=90. **Background**: #080808 (not pure black).
- **Network lines from person**: originate at y=140.
- **DAT logo**: 48x48 squares, Inter 900 30px letters, at translate(247,690).

### Color Modes
| Mode | Background | Blue | Text |
|---|---|---|---|
| Dark (default) | #080808 | #0056FF | #FFFFFF |
| White | #FFFFFF | #0046DD | #000000 |
| Grey | #1F1F1F | #0056FF | #FFFFFF |

### Animation
All node pulse durations ×1.5. Glow max 0.25. Person glow 5s (0.3→0.6). Respects `prefers-reduced-motion`.

### Sizes
800/512/200px PNGs per mode. Animated HTML standalone. When embedding in pages, crop to `viewBox="50 30 700 580"` and omit text/logo.

### Deprecated (never use)
Diamonds, rectangles, secondary angle lines, connector rails, arc-based body, rx=112, #000 background, #808080 dash color, y=148/185 line origins, letter-spacing 3, flat rgba road fill.

See `references/people-team-icon-reference.md` for the full specification with exact SVG coordinates.

---

## Source

DAT Brand Foundation and Guidelines, Rev 6, October 26, 2021. This reference doc is a working summary for asset creation. For official logo files, photography assets, and the full brand foundation deck, contact the DAT Marketing team.
