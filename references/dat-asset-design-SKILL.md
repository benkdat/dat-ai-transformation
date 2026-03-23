---
name: dat-asset-design
description: >
  DAT brand + UI/UX design + image generation for any DAT Freight & Analytics asset. Use whenever creating
  or styling anything for DAT: presentations, dashboards, HTML/React apps, reports, documents, Slack/email,
  PDFs, data visualizations, internal tools, People Team deliverables, or any web/mobile UI. Triggers for
  landing pages, dashboards, admin panels, components, forms, charts, or any UI needing design decisions.
  Use for DAT branding, DAT colors, DAT design system, "make it look like DAT," People Team assets, the
  Pathfinder voice. ALSO use whenever the user asks to generate, create, draw, design, or edit any image
  or visual content — headers, thumbnails, icons, diagrams, patterns, illustrations, photos, graphics.
  Always read before generating DAT-branded code, comms, visuals, or images.
allowed-tools: Bash(gemini:*)
---

# DAT Asset Design Skill

This skill combines three sources:
1. **DAT Brand Guidelines** — DAT Freight & Analytics official brand identity, colors, typography, voice/tone
2. **UI/UX Pro Max** — Professional design intelligence: 67 styles, 96 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types, accessibility rules, and industry-specific reasoning
3. **Nano Banana Image Generation** — Generate and edit images via Gemini CLI's nanobanana extension

**For full brand reference, always read:** `references/brand-reference.md`

---

## When to Apply

**Always use for:**
- Any DAT-branded visual asset (deck, dashboard, HTML/React app, PDF, email banner, org chart)
- Any DAT written communication (Slack, email, docs, reports) — apply the Pathfinder voice
- Designing new pages, dashboards, or admin panels — even if not explicitly DAT-branded
- Creating or refactoring UI components (buttons, modals, forms, tables, charts)
- Choosing color schemes, typography, spacing, layout systems
- Reviewing UI code for UX quality, accessibility, or visual consistency
- **Any image generation request** — blog headers, thumbnails, icons, diagrams, patterns, illustrations, photos, graphics

**Skip for:**
- Pure backend logic or API/database design
- Infrastructure or DevOps work
- Non-visual scripts or automation tasks

---

## DAT Brand Quick Reference

### Colors

| Token | HEX | Use |
|---|---|---|
| `--dat-blue` | `#0046DD` | Primary brand. Buttons, headings, links, charts. |
| `--dat-blue-on-black` | `#0056FF` | DAT Blue on dark backgrounds. |
| `--dat-digital-blue` | `#0046E0` | Digital platforms, heavy dark backgrounds. |
| `--dat-black` | `#000000` | Headlines, dark backgrounds, co-primary with blue. |
| `--dat-white` | `#FFFFFF` | Light backgrounds, text on dark. |
| `--dat-grey` | `#8A8D8F` | Borders, secondary text, subtle accents. |
| `--dat-grey-medium` | `#6E6B68` | Supporting elements. |
| `--dat-grey-dark` | `#565657` | Heavier supporting elements. |
| `--dat-red` | `#E10600` | Alerts, negative indicators. Sparingly. |
| `--dat-yellow` | `#FFD700` | Highlights, call-outs. Sparingly. |

**Ratio:** Blue + Black dominant (~70%), White + Greys base (~20%), Red/Yellow accent (~10%).

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
| Body copy | Sequel Sans | Roman | Inter Regular |
| Google Docs only | Inter | (mapped above) | — |

In code environments, default to **Inter** from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

**Font stack:**
```css
font-family: 'Sequel Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Voice & Tone (The Pathfinder)

DAT's brand character: **intelligent, uniting, empowering, brave, trusted.**

- Be informative and approachable, never aloof or preachy
- Advocate for teammates and customers, move at their pace
- Equip and empower, don't hand-hold or prescribe
- Think big, stay grounded, earn trust through accuracy and consistency
- Communication tiers: **Inspire** (mission framing) → **Explain** (product/data details) → **Connect** (relationships)

**Internal language:**
- "teammates" not "employees"
- "People Team" not "HR"

### Key Brand Phrases

| Phrase | Use |
|---|---|
| WE TAKE THE UNCERTAINTY OUT OF FREIGHT | Mission. Headlines, hero text. |
| Find your path | Pathfinder tagline. |
| Clarity of Choice | Brand essence. |
| Relevance Now and Next | Value proposition. |
| Here's to Knowing | Manifesto anchor. |
| Compete, Perform, Prosper | Customer aspirational outcome. |

---

## Applying the Brand by Asset Type

### HTML / React Apps & Dashboards
- Import Inter from Google Fonts
- DAT Blue (`#0046DD`) for primary interactive elements
- Black backgrounds with `#0056FF` for dark mode
- White backgrounds with `#0046DD` for light mode
- Signal Red for errors/alerts, Signal Yellow for highlights
- Charts: blue primary series, grey secondary, red/yellow for heat/alerts
- Bold, confident headlines. Clean layouts with generous white space.

### Presentations (PPTX)
- DAT Blue and Black as dominant slide colors; White for contrast
- Inter (or Sequel Sans if available) for all text
- Black weight for titles, Regular for body
- Include DAT logo with proper clear space (min half-box-width around logo)
- Photography: real people, warm lighting, fresh angles, motion

### Documents (DOCX / PDF / Markdown)
- DAT Blue for headings and accent elements; regular weight body text
- Clean tables using the brand palette
- Consistent logo placement with clear space

### Slack / Email / Written Comms
- Pathfinder voice: intelligent, uniting, empowering, brave, trusted
- Structure: Inspire → Explain → Connect
- "teammates" and "People Team" always

### Logo Usage

- Primary lockup: DAT Freight & Analytics (horizontal or stacked)
- Secondary: DAT mark alone (when F&A is redundant or space is tight)
- Sub-brand lockups: DAT One (freight), DAT iQ (analytics)
- On dark backgrounds: use adjusted blue (#0056FF) or white logo
- Minimum clear space: half the width of one blue box in the DAT mark
- Never recolor, add gradients, shadows, outline, rotate, crop, or pattern the logo
- Minimum digital size: ~35px high

### People Team Icon — "The Horizon" v2 (Canonical)

**This is the only valid version.** Earlier versions with diamonds, rectangles, connector rails, or arc-based person bodies are deprecated.

- **Person**: Two-layer (dark #080808 outline behind blue #0056FF fill). Bezier body curves, NOT arcs. Network lines from y=140.
- **Network**: Circles (r=110/185/270/370) + cardinal/diagonal crosses + spokes ONLY. No diamonds, no rectangles, no secondary angles.
- **Road**: linearGradient black→#0056FF@0.15. Edge stroke-width 3. Apex y=195.
- **Text**: Inter Black 900, 90px, letter-spacing 4, white, drop shadow filter.
- **Background**: #080808 (not #000). Corner rx=90 (not 112).
- **Dashed line**: #4a4a4a (not #808080), stroke-width 3, dasharray 16/14, opacity 0.6.
- **Animation**: All durations ×1.5. Glow max 0.25. Person glow 5s. Respects prefers-reduced-motion.
- **Modes**: Dark (#080808 bg), White (#FFF bg, #0046DD blue, black text), Grey (#1F1F1F bg).
- **Sizes**: 800/512/200px PNGs. Animated HTML standalone.
- **Embedding in pages**: Crop to `viewBox="50 30 700 580"`, omit text/logo since the page provides those.

---

## Image Generation (Nano Banana)

Use this section whenever the user asks to generate, create, draw, design, or edit any image or visual content. Do NOT attempt to generate images through any other method.

### Before First Use

1. Verify the nanobanana extension is installed:
   ```bash
   gemini extensions list | grep nanobanana
   ```
2. If missing, install it:
   ```bash
   gemini extensions install https://github.com/gemini-cli-extensions/nanobanana
   ```
3. Verify API key is set:
   ```bash
   [ -n "$GEMINI_API_KEY" ] && echo "API key configured" || echo "Missing GEMINI_API_KEY"
   ```

### Command Selection

| User Request | Command |
|---|---|
| "make me a blog header" | `/generate` |
| "create an app icon" | `/icon` |
| "draw a flowchart of..." | `/diagram` |
| "fix this old photo" | `/restore` |
| "remove the background" | `/edit` |
| "create a repeating texture" | `/pattern` |
| "make a comic strip" | `/story` |

### Available Commands

**Always use the `--yolo` flag to automatically approve all tool actions.**

| Command | Use Case |
|---|---|
| `gemini --yolo "/generate 'prompt'"` | Text-to-image generation |
| `gemini --yolo "/edit file.png 'instruction'"` | Modify existing image |
| `gemini --yolo "/restore old_photo.jpg 'fix scratches'"` | Repair damaged photos |
| `gemini --yolo "/icon 'description'"` | App icons, favicons, UI elements |
| `gemini --yolo "/diagram 'description'"` | Flowcharts, architecture diagrams |
| `gemini --yolo "/pattern 'description'"` | Seamless textures and patterns |
| `gemini --yolo "/story 'description'"` | Sequential/narrative images |
| `gemini --yolo "/nanobanana prompt"` | Natural language interface |

### Common Options

- `--yolo` — **Required.** Auto-approve all tool actions (no confirmation prompts)
- `--count=N` — Generate N variations (1-8)
- `--preview` — Auto-open generated images
- `--styles="style1,style2"` — Apply artistic styles
- `--format=grid|separate` — Output arrangement

### Common Sizes

| Use Case | Dimensions | Notes |
|---|---|---|
| YouTube thumbnail | 1280x720 | `--aspect=16:9` |
| Blog featured image | 1200x630 | Social preview friendly |
| Square social | 1080x1080 | Instagram, LinkedIn |
| Twitter/X header | 1500x500 | Wide banner |
| Vertical story | 1080x1920 | `--aspect=9:16` |

### Model Selection

Default: `gemini-2.5-flash-image` (~$0.04/image)

For higher quality (4K, better reasoning):
```bash
export NANOBANANA_MODEL=gemini-3-pro-image-preview
```

### DAT-Branded Image Prompting

When generating images for DAT, always incorporate brand elements into the prompt:
- Reference DAT Blue (`#0046DD`), black, and white as dominant colors
- Use "modern," "professional," "clean," "confident" as style descriptors
- For freight/logistics imagery: trucks, shipping, data dashboards, maps, route networks
- Include "no text" unless the user specifically wants text rendered
- Prefer flat illustration or editorial photography styles for People Team assets

**Examples:**
```bash
# DAT-branded blog header
gemini --yolo "/generate 'modern flat illustration of freight truck on highway with blue (#0046DD) and black color scheme, data visualization overlay, professional, clean, no text' --preview"

# People Team asset
gemini --yolo "/generate 'diverse professional team collaborating in modern office, warm natural light, shallow depth of field, editorial photography style, no text' --count=3"

# DAT icon
gemini --yolo "/icon 'minimalist logistics app icon, blue and white, clean lines, modern' --sizes='64,128,256,512' --type='app-icon' --corners='rounded'"
```

### Output & Presentation

All generated images are saved to `./nanobanana-output/` in the current directory.

After generation completes:
1. List contents of `./nanobanana-output/` to find generated files
2. Present the most recent image(s) to the user
3. Offer to regenerate with variations if needed

### Refinements

- **"Try again" / "Give me options"**: Regenerate with `--count=3`
- **"Make it more [adjective]"**: Adjust prompt and regenerate
- **"Edit this one"**: Use `gemini --yolo "/edit nanobanana-output/filename.png 'adjustment'"`
- **"Different style"**: Add `--styles="requested_style"` to the command

### Prompt Tips

1. **Be specific**: Include style, mood, colors, composition details
2. **Add "no text"**: If you don't want text rendered in the image
3. **Reference styles**: "editorial photography", "flat illustration", "3D render", "watercolor"
4. **Specify aspect ratio context**: "wide banner", "square thumbnail", "vertical story"

### Troubleshooting

| Problem | Solution |
|---|---|
| `GEMINI_API_KEY` not set | `export GEMINI_API_KEY="your-key"` |
| Extension not found | Run install command from setup section |
| Quota exceeded | Wait for reset or switch to flash model |
| Image generation failed | Check prompt for policy violations, simplify request |
| Output directory missing | Will be created automatically on first run |

---

## UI/UX Design Intelligence

When building any UI (DAT or general), apply these professional standards. Rules are prioritized 1→10.

### Priority 1: Accessibility (CRITICAL)
- Contrast ≥4.5:1 for normal text (3:1 for large), ≥3:1 for UI elements
- Visible focus rings (2-4px) on all interactive elements
- Alt text for meaningful images; aria-labels for icon-only buttons
- Keyboard navigation matches visual order; tab order logical
- Use label with `for` attribute on all form inputs
- Support `prefers-reduced-motion`
- Never convey info by color alone, add icon/text

### Priority 2: Touch & Interaction (CRITICAL)
- Min touch target 44x44pt (iOS) / 48x48dp (Android/Web)
- Min 8px gap between touch targets
- Use click/tap for primary interactions, don't rely on hover alone
- Disable buttons during async operations; show loading state
- Add `cursor-pointer` to all clickable elements
- Tap feedback within 80-150ms

### Priority 3: Performance (HIGH)
- Use WebP/AVIF images; lazy load below-fold assets
- Declare `width`/`height` on images to prevent layout shift (CLS < 0.1)
- `font-display: swap` to avoid invisible text
- Virtualize lists with 50+ items
- Debounce/throttle high-frequency events

### Priority 4: Style Selection (HIGH)
- Match style to product type and context
- Use SVG icons (Heroicons, Lucide), never emoji as icons
- Consistent style across all pages/screens
- Each screen should have one primary CTA; secondary actions visually subordinate

**DAT-specific style:** For DAT assets, lead with **Minimalism & Swiss Style** (clean, organized, dimensional) or **Data-Dense Dashboard** / **Executive Dashboard** patterns. Blue + Black dominant, clean grid layouts, Inter typography, generous white space.

### Priority 5: Layout & Responsive (HIGH)
- Mobile-first, systematic breakpoints (375 / 768 / 1024 / 1440)
- `viewport` meta: `width=device-width, initial-scale=1` (never disable zoom)
- Min 16px body text on mobile
- No horizontal scroll; `max-w-6xl`/`7xl` containers on desktop
- Use 4pt/8dp spacing increments (Material Design)

### Priority 6: Typography & Color (MEDIUM)
- Body line-height 1.5-1.75; limit to 65-75 chars per line
- Type scale: 12 / 14 / 16 / 18 / 24 / 32
- Font-weight hierarchy: Bold headings (600-700), Regular body (400), Medium labels (500)
- Use semantic color tokens, not raw hex in components
- Dark mode: test contrast independently, use desaturated/lighter tonal variants

### Priority 7: Animation (MEDIUM)
- Micro-interactions: 150-300ms; complex transitions ≤400ms
- Only animate `transform` / `opacity`, never `width`, `height`, `top`, `left`
- Use `ease-out` entering, `ease-in` exiting
- Exit animations ~60-70% the duration of enter animations
- Always respect `prefers-reduced-motion`

### Priority 8: Forms & Feedback (MEDIUM)
- Visible label per input (never placeholder-only)
- Error messages below the related field, with cause + how to fix
- Loading → success/error state on submit
- Auto-dismiss toasts in 3-5s; confirm before destructive actions
- Mark required fields (asterisk)
- Validate on blur, not on keystroke

### Priority 9: Navigation (HIGH)
- Bottom nav max 5 items with icon + label
- Back navigation predictable and consistent; restore scroll/state
- All key screens reachable via deep link
- Modal close affordance always visible; swipe-down to dismiss on mobile

### Priority 10: Charts & Data (HIGH for DAT dashboards)
- Match chart type to data (trend → line, comparison → bar, proportion → donut)
- Always show legend; provide tooltips on hover/tap with exact values
- Label axes with units; accessible color pairs for colorblind users
- Skeleton placeholder while loading; meaningful empty state when no data
- For DAT analytics: blue primary series, grey secondary, red alerts, yellow highlights

---

## DAT Dashboard Design Patterns

For People Analytics, engagement, and HR dashboards:

**Light mode (default for internal tools):**
- Background: `#FFFFFF` or `#F8F9FA`
- Card backgrounds: `#FFFFFF` with subtle grey border `#E9ECEF`
- Primary data: `#0046DD`
- Section headings: `#000000` or `#0046DD`
- Body text: `#333333`
- Muted/secondary: `#8A8D8F`

**Dark mode (for exec/ELT dashboards):**
- Background: `#000000`
- Card backgrounds: `#1A1A1A` or `#111111`
- Primary data: `#0056FF`
- Headings: `#FFFFFF`
- Body text: `#CCCCCC`
- Muted: `#8A8D8F`

**Chart color sequence:**
1. `#0046DD` (DAT Blue, primary)
2. `#8A8D8F` (DAT Grey, secondary)
3. `#FFD700` (DAT Yellow, highlight/positive)
4. `#E10600` (DAT Red, alert/negative)
5. `#565657` (DAT Grey Dark, tertiary)

---

## Pre-Delivery Checklist

Before shipping any DAT asset:

**Brand**
- [ ] DAT Blue (`#0046DD`) used for primary elements
- [ ] Inter font imported and applied
- [ ] "teammates" and "People Team" language used throughout
- [ ] Pathfinder voice: confident, clear, approachable, not corporate jargon
- [ ] Logo placement with proper clear space (if applicable)

**UI/UX**
- [ ] No emojis used as icons (SVG only)
- [ ] All interactive elements have `cursor-pointer` and hover/focus states
- [ ] Touch targets ≥44px
- [ ] Contrast ≥4.5:1 for body text
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px

**Data / Dashboards**
- [ ] Chart legends visible and chart colors follow DAT sequence above
- [ ] Empty states defined (no blank charts)
- [ ] Loading states defined (skeleton or spinner)
- [ ] Tooltips on hover/tap with exact values

**Images (if generated)**
- [ ] DAT brand colors referenced in prompt
- [ ] Style is professional, modern, clean
- [ ] "no text" included unless text is intentional
- [ ] Output reviewed and presented from `./nanobanana-output/`

---

## References

- Full DAT brand specification: `references/brand-reference.md`
- For official DAT logo files and photography: contact DAT Marketing
- Brand source: DAT Brand Foundation and Guidelines, Rev 6, October 2021
- Image generation: Nano Banana via Gemini CLI (nanobanana extension)
