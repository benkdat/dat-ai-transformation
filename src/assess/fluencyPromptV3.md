AI Fluency Report — v3 (DAT org-wide, role-adaptive)
You are assessing a DAT teammate's AI fluency based on their Claude conversation history. Use the recent_chats and conversation_search tools to pull a representative sample spanning as far back as history allows, up to 12 months. Paginate backward through recent_chats using the before parameter on each call until no earlier results are returned. Focus on conversations that tie to the person's stated day job (see ROLE BLOCK below). Apply the ROLE-RELEVANCE FILTER to screen out orthogonal work.


ORG BLOCK — DAT (stable, applies to everyone)
This is the organizational lens. These facts are the same whether the person being assessed works in Engineering, People, Product, Sales, Finance, or Operations. Do not modify unless the org itself changes.

org: DAT Freight & Analytics
industry: freight technology and analytics
org_stage: foundation-building, post-4-acquisitions (Convoy, Outgo, Trucker Tools, LoadLink)
office_footprint: Seattle, Denver, Beaverton/Tigard, Springfield, Toronto, Bangalore
stated_leadership_metrics:
  - engagement
  - automation
  - efficiency
  - quality_of_hire
  - belonging
  - ai_fluency
voice: Pathfinder — intelligent, uniting, empowering, brave, trusted
internal_language:
  - teammates (never "employees")
  - People Team (never "HR")
common_exec_audiences:
  CEO: direct, data-forward, outcomes over activity
  ELT: exec-calibrated, problem first then solution
  XLT: exec-calibrated, problem first then solution, data-backed
  org_wide: inclusive, calm, purposeful
  slack: punchy, conversational
org_mandate_phrases_to_avoid:
  - leverage, synergy, dive deep, unpack, landscape, move the needle
brand_system_reference: dat-asset-design skill (Pathfinder voice, DAT Blue, Inter font)


ROLE BLOCK — swappable per person
This block is what makes the assessment tied to someone's actual day job. Fill it out before running. If the user's Claude memory already contains role context (title, scope, team, recurring workflows), propose a pre-filled ROLE BLOCK at the start of the assessment and ask the user to confirm or correct before scoring.

name: Ben Krupp
role_title: Director, Talent Operations
function: People Team
level: Director
scope: Talent Acquisition, Talent Operations & Analytics, and Workplace Experience across six offices (Seattle, Denver, Beaverton/Tigard, Springfield, Toronto, Bangalore)
reports_to: Jana Galbraith, Chief People Officer
direct_reports: 7 — Nathalia Migliorato (Sr Mgr, Talent Ops & Analytics), three recruiters (Becca Fernyhough, Darren Robinson, Paul Montague Jr.), three Workplace Experience managers (Matt Gaustad, Terresa Hill, Justine Cagle)
team_shape: 7 directs spanning three sub-functions (TA, Talent Ops & Analytics, Workplace). Peer PBPs (Kate Westrin, Karishma Suhag) report to Jana, not to Ben

recurring_workflows:
  - Weekly recruiting pipeline reviews and hiring manager coaching across active searches
  - Executive recruiting searches (Sr Director and above) where Ben leads as hiring partner
  - Monthly People Team metrics prep for XLT and ELT decks
  - Annual merit cycle end-to-end (file architecture, budget allocation, approvals, delivery)
  - Annual Gallup engagement survey execution, dashboarding, and org-wide action planning
  - Office transition and workplace operations (current: Tigard buildout for July go-live)
  - Offer approval and comp exception routing with Finance and Jeff Clementz
  - AI Fluency initiative execution and rollout to People Team and broader org
  - Vendor management across Greenhouse, Radford, Gallup, Crosschq, UKG
  - Post-acquisition integration work (comp harmonization, policy alignment)

role_success_metrics:
  - Time to fill (all reqs, executive reqs tracked separately)
  - Quality of hire
  - Cost per hire and agency spend reduction
  - Gallup grand mean engagement score and Roper percentile
  - Gallup participation rate (currently 97%, 619 teammates)
  - Teammate belonging and inclusion scores
  - Workplace satisfaction by office

role_stakeholders:
  - Jana Galbraith (CPO) — problem plus solution, direct, structured
  - XLT members — exec-calibrated, problem first then solution, data-backed
  - ELT — outcomes-forward, minimal exposition
  - Hiring managers — warm and clear, coaching tone
  - Direct reports (Nathalia, recruiters, Workplace managers) — warm and clear, coaching tone
  - Teammates (org-wide) — inclusive, calm, purposeful
  - Kate Westrin and Karishma Suhag (peer PBPs) — peer-to-peer, collaborative
  - Cheryl Bullard (Chief of Staff, interviewer on senior searches)

role_systems_of_record:
  - Greenhouse (ATS)
  - UKG (HRIS)
  - Gallup (engagement)
  - 15Five (performance and feedback)
  - Radford (compensation benchmarking)
  - TalentWall and Crosschq (candidate workflow)
  - Google Drive, Docs, Sheets
  - Confluence (People Hub)
  - Slack
  - DocuSign and Adobe Sign (offers, NDAs)

role_deliverable_types:
  - Offer letters and comp recommendations
  - XLT and ELT People Team decks
  - Gallup dashboards, action plans, and org-wide engagement comms
  - Merit cycle architecture (linked XLT and ELT sheets, bonus schedules, budget models)
  - Hiring manager playbooks and search scorecards
  - Org-wide comms (Slack, email, announcements)
  - Office transition plans and teammate communications
  - Policy documents (NDAs, confidentiality, non-solicit, non-compete, IP agreements)
  - People Hub pages (Google Sites and Confluence)
  - Custom skills, Claude memory entries, and n8n automations for the People Team

self_authored_org_initiatives:
  - AI Fluency initiative (tied to: ai_fluency) → EXCLUDED from personal ai_fluency scoring

See Appendix A at the end of this prompt for populated ROLE BLOCK examples across five common DAT functions.


ROLE-RELEVANCE FILTER
Before a conversation counts as evidence for any metric, it must pass this filter:

Role-relevant: The conversation addresses work inside the person's ROLE BLOCK scope, uses one of their role_systems_of_record, produces one of their role_deliverable_types, or directly serves one of their role_stakeholders.
Org-relevant: The conversation addresses DAT-internal work (org initiatives, cross-functional projects, comms to DAT audiences), even if slightly outside the person's core scope.
Excluded: Personal life, personal side projects unrelated to DAT work, job searches, unrelated learning, entertainment, shopping, relationships, health, finance.

Work that is sophisticated but orthogonal to the ROLE BLOCK (e.g. a Finance teammate building a personal React app) is acknowledged in Section 6 as context but does not contribute to metric scores. A DAT AI fluency assessment measures DAT AI fluency, not general AI skill.

Report the count of conversations pulled, role-relevant, org-relevant, and excluded in Section 2.


MODE SELECTION
Choose one before running. State the selected mode at the top of the generated report.

INTERNAL (default for self-review): DAT names, project names, stakeholder names, and tool names may appear in the written sections. Not for external sharing.
EXTERNAL (LinkedIn-publishable): Apply the PRIVACY RULES block below in full. All org, project, product, client, stakeholder, and collaborator names stripped. Describe by type and domain only.


PRIVACY RULES — apply in EXTERNAL mode only
In EXTERNAL mode, do not name any specific product, project, company, employer, client, collaborator, or DAT-internal tool. Describe by type and domain only. Do not reproduce verbatim quotes. Standout examples must describe behavior and why it demonstrates skill, not what the work was about. Do not make comparative claims about the user relative to other users or populations. Tier labels are behavioral classifications only, not rankings.

Pre-publish sanity check: Re-read every descriptor as if a competitor were trying to identify the user's projects or employer. Genericize further until identification is not possible.

In INTERNAL mode, specific names and projects are allowed. All other rules above (no verbatim quotes, no comparative claims, tier-as-behavior-not-ranking) still apply.


SELF-AUTHORED METRIC RULE
If a stated leadership metric from the ORG BLOCK appears in the person's ROLE BLOCK under self_authored_org_initiatives, that metric is excluded from personal scoring for this person. The user cannot self-score on a rubric they authored or an initiative they lead. Evidence of fluency must come from their own AI usage patterns, not from materials they produced about the initiative for others.

This rule applies to the individual, not to the org. Other DAT teammates running this assessment are not affected by one person's self-authored initiatives.


SCORING RULES
The default score is 5.0. Move up only with specific, observable, repeated evidence from role-relevant conversations. Move down when evidence contradicts a level. Grade on:

Whether the behavior produced a meaningfully better outcome than a lower-level behavior would have
Whether the behavior is repeatable across sessions, not a one-time occurrence
Whether the result required skill from the user, not just from the model
Whether the behavior shows up in work tied to the ROLE BLOCK, not adjacent to it

Do NOT grade on:

Prompt length, word count, or visible effort
How sophisticated or impressive a topic sounds
Volume of usage alone
Whether the user seems smart or invested
Sophisticated AI work outside the ROLE BLOCK's scope

A single example does not earn a score above 6. Repeated evidence across multiple role-relevant sessions is required to reach 7+.
FOUNDATION-BUILDING STAGE WEIGHT
DAT is a foundation-building org. Weight reusable systems higher than one-off output inside Workflow Integration and Execution on Insight. A deployed custom skill, a saved prompt template, or a production agent counts more heavily than the same volume of ad-hoc session output. This applies to everyone at DAT regardless of function.
DECIMAL PRECISION RULES
Score each metric to one decimal place. The integer portion is the rubric band. The decimal portion is the within-band position, and it must encode something real.

.0–.2 — Just entered the band. Evidence barely supports the level.
.3–.5 — Solidly in the band. Multiple repeated examples across sessions.
.6–.8 — Top of the band. Consistent level behavior plus emerging evidence of the next band up.
.9 — About to cross. One more clear instance and this score would move up a whole point. Use sparingly.

Hard constraints:

No score may end in .0 unless the evidence is genuinely at the band boundary with zero variance. Rare.
If you cannot articulate why 7.4 and not 7.3, the score is 7.3.
Composite is the mean of the five metric scores, carried to one decimal. Do not round metrics to integers before averaging.
Month-over-month movement of less than 0.2 is noise. Treat it as flat in the narrative.


CURRENT STATE vs. TRAJECTORY
The headline score is the user's current state, not an average over time. Use the most recent month's composite as the headline. The full month-by-month progression is shown separately as the trajectory story, not collapsed into a single average.


SCORING RUBRIC
Each metric has two evidence layers: generic signals (universal) and DAT context-aware signals (combines ORG BLOCK and ROLE BLOCK). Score 1.0–10.0 month-by-month to one decimal.
Metric 1 — Prompt Quality
Does the user give the model what it needs to produce a useful first response?

Generic signals:

1–3: Vague questions, no context, accepts first output without evaluation.
4–5: Multi-sentence prompts with some context. Basic role or format framing. Minimal iteration when output misses.
6–7: Specific constraints stated upfront. Deliverable named clearly. Relevant context loaded before asking. Corrects drift mid-conversation with specifics.
8: Preempts common failure modes. Names intended audience and success criteria in the prompt itself. Pushes back with evidence when output is wrong, not just preference.
9: Prompts function as reusable artifacts, structured well enough that another person could run them and get comparable results without modification.
10: Meta-prompting. Writes prompts that generate better prompts. Builds composable prompt systems. Designs prompt libraries used across sessions or shared with others.

DAT context-aware signals:

Names specific audiences from ROLE BLOCK role_stakeholders and applies their tone expectations (not just a generic "make it exec-ready")
Loads context from ROLE BLOCK role_systems_of_record (Greenhouse req data, GitHub PR, Snowflake query result, Salesforce opportunity) rather than paraphrasing
Prompts in Pathfinder voice natively. Uses "teammates" and "People Team" without correction. Avoids org_mandate_phrases_to_avoid
Names role-specific failure modes ("do not suggest Python library we can't use in this repo", "do not generate comp numbers outside our Radford bands")
Metric 2 — Output Discipline
How often does the user catch the model being wrong, and act on it?

Generic signals:

1–3: Accepts outputs at face value.
4–5: Occasionally pushes back on tone or format. Rarely challenges factual claims or reasoning.
6–7: Routinely challenges outputs that miss the brief. Asks for sources on claims that matter. Rejects structurally weak responses even if they sound plausible.
8: Treats first answers as drafts for anything consequential. Requests counterarguments or alternative framings before acting.
9: Runs adversarial checks. Actively red-teams conclusions and stress-tests assumptions before publishing, shipping, or acting.
10: Standing critique protocol for externally published work. Claude's output is always raw material, never the final product.

DAT context-aware signals:

Rejects output that violates Pathfinder voice or internal language without needing to be told each session
Catches violations of the DAT brand system in AI-generated visuals (wrong colors, wrong font, wrong logo usage)
Pushes back when AI recommendations would bypass ROLE BLOCK stakeholder tone expectations (an XLT-bound message that isn't problem-then-solution, a customer-facing email that isn't DAT voice)
Catches fabricated role-domain specifics (invented Radford codes, invented revenue numbers, invented API endpoints, invented account names)
Metric 3 — Workflow Integration
Is AI embedded in how the user works, or a place they occasionally visit?

Generic signals:

1–3: Sporadic, one-off use. Each session starts from scratch.
4–5: Regular use but each session re-explains context. No saved prompts, no persistent setup, no Projects.
6–7: Uses Projects or standing instructions. Repeat workflows exist for recurring task types. Still re-contextualizes manually often.
8: Standing context is actively maintained (custom skills, memory, Claude Projects, CLAUDE.md equivalents). AI is the default first step for named recurring workflows.
9: Built persistent systems. Custom Projects per workstream, connected tools via MCPs, saved prompt libraries reused deliberately.
10: Running agents or automated workflows. AI executes on a schedule or trigger without manual kickoff.

DAT context-aware signals:

Custom skills maintained for the person's role-specific work (brand, code style, comp analysis, sales enablement, etc.)
Memory populated with ROLE BLOCK context that persists across sessions
Connected tool use aligned to role_systems_of_record rather than generic web search (e.g. Gmail/Calendar/Drive/Slack/Atlassian/Snowflake for People work, GitHub/Jira for engineering, Salesforce for sales)
Apply foundation-building weight: reusable systems score above ad-hoc volume
Metric 4 — Cross-Session Context
Do conversations build on each other, or does each one reset?

Generic signals:

1–3: Every conversation is standalone.
4–5: Context accumulates within a single session but resets each time.
6–7: References prior sessions in later ones. Uses conversation search or explicit recaps. Multi-session project threads exist.
8: Multi-session arcs are deliberate and structural. Research in one session feeds building in the next.
9: Treats AI as a persistent collaborator. Outputs from one workstream feed adjacent ones.
10: Context orchestration across projects, domains, and months. Knowledge compounds visibly.

DAT context-aware signals:

Role-specific annual or quarterly cycles accumulate continuity (performance cycle, comp cycle, planning, product launches, sales kickoffs, engagement surveys, financial close)
Work on one ORG BLOCK priority metric informs work on another (engagement data feeds retention strategy feeds recruiting pitch)
Cross-functional arcs visible when role demands it (a PM's product work pulling from Sales CRM data pulling from Finance forecasts)
Metric 5 — Execution on Insight
Does the user act on what AI produces, or does analysis accumulate without output?

Generic signals:

1–3: Uses AI to think. Rarely acts on what the thinking produces.
4–5: Occasionally ships or acts on outputs. Most analysis goes unused.
6–7: Acts on roughly half of significant output. "Good idea → nothing" pattern visible but not dominant.
8: Most significant outputs get used, shipped, published, or built on within a reasonable timeframe. Follow-through is the norm.
9: Rapid insight-to-execution cycle. Recommendations become real within days to weeks, visibly and verifiably.
10: Nothing sits. If it is worth generating, it is worth executing.

DAT context-aware signals:

Outputs ship into ROLE BLOCK role_systems_of_record (committed code, merged PRs, sent offers, updated dashboards, closed deals, published comms)
AI-accelerated work visibly moves ROLE BLOCK role_success_metrics or ORG BLOCK stated_leadership_metrics (subject to SELF-AUTHORED METRIC RULE)
Apply foundation-building weight: production infrastructure counts more than the same volume of one-off deliverables


TIER DEFINITIONS
Assign one tier based on the pattern of scores in the most recent month only. Do not average across the full window.

Novice: Mostly 1.0–4.0. Sporadic use, little iteration, outputs rarely acted on.
Functional: Mostly 4.0–6.0. Regular use with some sophistication, but sessions largely reset.
Proficient: Mostly 6.0–7.0. Clear workflows exist, context builds across sessions, outputs used consistently. One or two metrics still weak.
Advanced: Mix of 7.0–8.0 across most metrics. Multi-session arcs, strong prompt construction, adversarial checking on consequential work. Execution on insight is reliable.
Native: 8.0+ on most metrics with evidence of meta-prompting, persistent systems, or agent use. AI is infrastructure, not a tool.


ORDER OF OPERATIONS
Propose pre-filled ROLE BLOCK from memory if available. Ask user to confirm or correct.
Apply ROLE-RELEVANCE FILTER to pulled conversations. Report counts.
Produce Sections 1–6.5 as a brief written summary in chat.
Produce Section 7 downloadable files (markdown report, 7 carousel slides, 2 standalone charts).
Produce Section 8 inline React dashboard saved as .jsx.
Call present_files once with all 11 artifacts.


REQUIRED OUTPUT — Sections 1–6.5 (in chat)
SECTION 1 — Raw Data Table
Month
Prompt Quality
Output Discipline
Workflow Integration
Cross-Session Context
Execution on Insight
Composite


All values to one decimal. Composite is the mean of the five metric scores for that month. Do not compute a cross-month average.
SECTION 2 — Usage KPIs
Total conversations pulled
Role-relevant count (passes ROLE-RELEVANCE FILTER)
Org-relevant count
Excluded count (orthogonal to ROLE BLOCK)
Date range covered
Average role-relevant conversations per week
Distinct role-relevant workstreams identified
Tools and integrations used (MCPs, web search, connected tools, file creation)
Deep research runs
Role-relevant documents produced
Multi-session project arcs identified within ROLE BLOCK scope
Meta-prompts or reusable prompt systems built
SECTION 3 — What You're Actually Good At
Two behavior patterns maximum. For each: name the behavior (not the topic), give one specific role-relevant example describing what was done and why it's skillful, explain why this behavior is not the default. Respect mode-specific privacy.
SECTION 4 — Where You're Weakest
The single biggest gap only, as it shows up in the person's ROLE BLOCK work. Name the metric and score. Describe the pattern keeping the score there in terms of their role. Name the one behavior change that would move it most. No softening.
SECTION 5 — Three Recommendations
Each must be specific enough to act on this week, testable within 7 days, and tied to the lowest-scoring metric.

At least one recommendation must tie to a ROLE BLOCK role_success_metric or recurring_workflow — the fluency lift needs to show up in their actual day job.
At least one recommendation must tie to an ORG BLOCK stated_leadership_metric — the fluency lift needs to compound with what DAT already cares about.
These can be the same recommendation if it hits both layers. They can also be different.

Format for each:

What: One sentence.
Why it matters: One sentence.
How to verify: One observable signal this week that confirms it's working.
SECTION 6 — Honest Observations
Two to four observations the rubric alone doesn't capture: contradictions between stated values and actual behavior, genuinely unusual patterns, anything that changes interpretation of the score. If the person has sophisticated AI work outside their ROLE BLOCK scope (side projects, off-role learning), mention it here as context — it does not affect the score but it affects the read. No flattery.
SECTION 6.5 — Priority Alignment
Two short sub-sections.

6.5a — Role-level (from ROLE BLOCK): For each role_success_metric or key recurring_workflow, one line: Touched — [how] / Adjacent — [how] / Not touched.

6.5b — Org-level (from ORG BLOCK): For each stated_leadership_metric, one line: Touched — [how] / Adjacent — [how] / Not touched. Apply SELF-AUTHORED METRIC RULE — mark any self-authored initiative metric as n/a (self-authored, excluded).

Keep both sub-sections short. Purpose is to show whether personal AI investment maps to role AND org priorities, not to re-score.


SECTION 7 — Downloadable Files
Use code execution. Save everything to the outputs directory.
Design tokens — DAT Exec Dashboard (dark mode)
Applies to everyone running this assessment. These come from the DAT dat-asset-design skill.

Base tokens:

Background:      #000000
Surface:         #111111
Surface 2:       #1A1A1A
Divider:         #2A2A2A
White text:      #FFFFFF
Body text:       #CCCCCC
Muted text:      #8A8D8F
Primary/Accent:  #0056FF   (DAT Blue on dark)
Composite line:  #FFFFFF   (dashed)

Metric palette (monochromatic blue progression):

Prompt Quality:        #0056FF   (DAT Blue full)
Output Discipline:     #4D84FF   (blue tint 80%)
Workflow Integration:  #80A8FF   (blue tint 60%)
Cross-Session Context: #B3CCFF   (blue tint 40%)
Execution on Insight:  #E0EBFF   (blue tint 20%)

Semantic accents (reserved):

Gap/callout negative:  #E10600   (DAT Red)
Strength/positive:     #FFD700   (DAT Yellow)

Typography: Inter from Google Fonts. In matplotlib, fall back to a clean sans stack.

# matplotlib
plt.rcParams['font.family'] = ['Inter', 'DejaVu Sans', 'sans-serif']

# HTML/React
# <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap" rel="stylesheet">
# font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

Voice: Pathfinder across all generated copy. "teammates", "People Team". No corporate jargon.
File 1 — Full Report (ai_fluency_report.md)
Save a clean version of Sections 1–6.5. Header leads with:

Mode: INTERNAL or EXTERNAL
Name: (INTERNAL only) from ROLE BLOCK
Role: (INTERNAL only) {{role_title}}, {{function}} from ROLE BLOCK
Current Score: [most recent composite, one decimal] / 10 — Tier: [tier]
Trajectory: [first composite] → [most recent composite] over [N] months
Assessment date and coverage window
Files 2–8 — LinkedIn Carousel (1080×1080px PNGs)
Canvas: fig, ax = plt.subplots(figsize=(7.2, 7.2), facecolor='#000000').

Slide 1 — Hero (slide_01_hero.png) Tier badge (DAT Blue pill #0056FF), large score (one decimal), /10 in muted text, trajectory line, coverage window. Pure black background. Generous whitespace.

Slide 2 — Score Bars (slide_02_scores.png) Title: "How I score across 5 dimensions · Current state". Five horizontal bars. Bar track from x=0.5 to x=7.5 (7.0 units wide), filled proportionally to score/10 in metric's hex color. Metric name in bold inside the bar at x=0.75. Score label at x=7.75. Delta badge starting at x=8.45. Canonical order: PQ, OD, WI, CSC, EoI.

Slide 3 — Score Progression (slide_03_progression.png) Title: "Score progression over time". Use fig.add_axes([0.10, 0.15, 0.82, 0.72]). Do NOT use ax.axis('off') with manual coordinate transforms. Plot all five metrics plus Composite as a white dashed line. Grid lines at 2, 4, 6, 8, 10 in #2A2A2A. Legend at bottom, ncol=3.

Slide 4 — Weekly Activity (slide_04_activity.png) Title: "Weekly AI usage". Bar chart, bars in DAT Blue #0056FF. Include role-relevant vs total activity if easy to distinguish (role-relevant solid, total outlined). Month labels at first week of each month. Dashed average line in #FFFFFF with avg value labeled.

Slide 5 — Strengths (slide_05_strengths.png) Title: "What I'm actually good at". Two blocks side by side. Behavior label in DAT Blue, one short sentence (≤20 words) in white. Card surface #111111, border #2A2A2A, rounded corners.

Slide 6 — Gap + Fix (slide_06_gap.png) Title "My biggest gap" at top. Vertical stack, all centered:

Metric name in its hex color, ~15pt bold
Score in same hex, 64–72pt bold, va='center', positioned at least 1.0 grid unit below the label
/ 10 in muted gray, ~16pt, to the RIGHT of the score at x ≥ 6.0 (score anchored at x=4.3)
Behavior description, max 5 lines of ~12 words each, muted text, centered — phrased in terms of the person's role
Divider line in #2A2A2A
"THE FIX" in DAT Blue, bold
Fix action, 1–2 centered lines in white

Slide 7 — Recommendations (slide_07_recommendations.png) Title: "3 things to do this week". Three numbered blocks. Number badge in DAT Blue, bold action phrase (≤8 words), one-sentence description (≤15 words). If a recommendation ties to a ROLE BLOCK role_success_metric, append a small tag in white (e.g. → cycle time). If it ties to an ORG BLOCK stated_leadership_metric, append a small tag in DAT Yellow (e.g. → engagement).
File 9 — Chart Pack (1600×900px standalone PNGs)
Save chart_progression.png and chart_activity.png at 1600×900px.

fig, ax = plt.subplots(figsize=(10.67, 6), facecolor='#000000')
Matplotlib execution rules
pip install matplotlib --break-system-packages

plt.rcParams['font.family'] = ['Inter', 'DejaVu Sans', 'sans-serif']

fig.savefig(path, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())

# Always format scores as
f'{score:.1f}'   # preserves trailing zero
# NEVER: str(round(score, 1))

# letterspacing is NOT a valid matplotlib Text property.
# Simulate: 'A D V A N C E D'

# For text >40pt, anchor with va='center'.
# Keep adjacent elements at least fontsize_pts/50 grid units apart in a 10-unit figure.

# For chart slides (03, 04) and standalone charts:
# Use fig.add_axes([left, bottom, width, height]) with real data coordinates.
# Do NOT combine ax.axis('off') with manual position calculations.

After generating, list all 9 files with sizes.


SECTION 8 — Inline Dashboard (React artifact)
Save ai_fluency_dashboard.jsx to outputs. Renders inline because .jsx files render automatically.

Font: Inter via Google Fonts injected in useEffect, OR system sans fallback. Font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif.

Number formatting: All scores via score.toFixed(1). Delta badges as integers. Never display 7, always 7.0.
Required panels (scrollable)
PANEL 1 — Hero strip Current score (large, one decimal), tier badge in DAT Blue, role label {{role_title}} · {{function}} (INTERNAL only), date, one-line trajectory. Black background.

PANEL 2 — Score bars Five horizontal bars in canonical order (PQ, OD, WI, CSC, EoI). Metric palette colors. Current scores (one decimal) and +N delta badges (integer). Panel label: "How I score across 5 dimensions · Current state". No composite summary row.

PANEL 3 — Progression line chart Recharts LineChart. One line per metric in hex color. Composite dashed in #FFFFFF. Black background. Muted grid #2A2A2A. Y-axis ticks at integers (2, 4, 6, 8, 10). Tooltip with exact values.

PANEL 4 — Weekly activity bar chart Recharts BarChart. Bars in DAT Blue #0056FF. Dashed average ReferenceLine in #FFFFFF with avg labeled (one decimal). Monthly labels on x-axis.

PANEL 5 — Usage KPIs Grid of stat cards: total pulled, role-relevant, excluded, avg per week (one decimal), workstreams, tools used, documents produced, multi-session arcs, meta-prompts built. Card surface #1A1A1A, border #2A2A2A, rounded corners.

PANEL 6 — Strengths Two cards side by side. Behavior label in DAT Blue, 2–3 sentence description in body text #CCCCCC.

PANEL 7 — Biggest gap Metric name and score in its hex color (large, one decimal). Behavior description in body text, phrased in terms of the person's role. "THE FIX" label in DAT Blue. One action sentence in white. Optional DAT Red #E10600 accent for the gap callout, used sparingly.

PANEL 8 — Three recommendations Three numbered cards. Number in DAT Blue, bold action phrase, one-sentence why, one-sentence verification. Tags: role-metric tags in white, org-metric tags in DAT Yellow #FFD700.

PANEL 9 — Priority Alignment (two sub-panels) Sub-panel A (Role): One row per role_success_metric from ROLE BLOCK. Columns: metric name, Touched / Adjacent / Not touched status chip, one-line description. Sub-panel B (Org): One row per stated_leadership_metric from ORG BLOCK. Same column structure. Self-authored metrics show as n/a (self-authored, excluded) in a muted chip.

PANEL 10 — Honest observations Two to four paragraphs. Label "Honest Observations" above. Body text #CCCCCC. If off-role sophisticated AI work exists, note it here, not in Panel 6 or 7.
Design rules
Background #000000 throughout
Card surfaces #111111 or #1A1A1A with #2A2A2A borders
Text: white #FFFFFF, body #CCCCCC, muted #8A8D8F
Font: Inter via Google Fonts, fallback system sans
No external CSS libraries beyond Recharts and Inter
Scrollable
Default export, no required props
Touch targets ≥44px
Tooltips with exact values on all charts

Data embedding: All scores, KPIs, text, strengths, gap description, recommendations, observations, priority alignment rows, and ROLE BLOCK metadata must be embedded as JavaScript constants at the top of the file. Zero external dependencies beyond Recharts and Inter font link.


FINAL PRESENTATION
Call present_files once at the end with ALL artifacts in this order:

ai_fluency_dashboard.jsx
ai_fluency_report.md
slide_01_hero.png through slide_07_recommendations.png
chart_progression.png
chart_activity.png

One call, all 11 files, correct order. Do not skip present_files.


FINAL INSTRUCTION
Score strictly. Default is 5.0. Do not move up without evidence. Do not soften findings. Use decimal precision to encode real within-band differences, not to dress up integer intuitions.

Apply the ROLE-RELEVANCE FILTER before any evidence counts. Apply the SELF-AUTHORED METRIC RULE. Apply foundation-building weight. Apply mode-appropriate privacy handling.

Lead with current state, not average. The progression chart tells the trajectory story. The current score tells where the person is today in the context of their actual DAT job. A cross-month average tells neither.


APPENDIX A — Example ROLE BLOCKs across DAT functions
Use these as templates. Adapt the specifics to the actual person.
Example 1 — Engineering IC (Staff level)
name: [full name]
role_title: Staff Software Engineer
function: Engineering
level: IC
scope: Platform services and back-end infrastructure for DAT One
reports_to: [EM name], Engineering Manager
direct_reports: none
team_shape: 6-person platform team (5 engineers + EM)

recurring_workflows:
  - code review (own PRs + peer PRs)
  - RFC and tech spec authoring for new services
  - incident response and post-mortems
  - sprint planning and estimation
  - pairing on complex debugging

role_success_metrics:
  - PR cycle time (time from open to merge)
  - incident MTTR on owned services
  - uptime / SLO adherence on owned services
  - sprint commit accuracy

role_stakeholders:
  - peer engineers — technical, direct, specific
  - Engineering Manager — status-focused, risk-aware
  - PM partner — trade-off framing, shipping cadence
  - on-call engineers — clear runbook language

role_systems_of_record:
  - GitHub (PRs, issues, actions)
  - Jira (tickets, sprint boards)
  - DataDog (metrics, alerts)
  - AWS console (infrastructure)
  - Confluence (docs)

role_deliverable_types:
  - merged pull requests
  - RFCs and tech specs
  - runbooks
  - incident reports
  - code review comments

self_authored_org_initiatives: none
Example 2 — Product Manager (Sr)
name: [full name]
role_title: Senior Product Manager
function: Product
level: Manager (IC)
scope: DAT iQ analytics product line
reports_to: [Director name], Director of Product
direct_reports: none
team_shape: pod of 2 designers, 4 engineers, 1 analyst

recurring_workflows:
  - PRD authoring and iteration
  - customer discovery calls and synthesis
  - roadmap planning and trade-off decisions
  - pricing and packaging analysis
  - launch planning with Marketing and Sales

role_success_metrics:
  - feature adoption rate
  - NPS / CSAT on owned product
  - roadmap hit rate
  - time-to-ship from PRD to GA

role_stakeholders:
  - Engineering pod — clear specs, rationale-forward
  - Design — problem framing, not solution prescribing
  - Sales — enablement-focused, plain language
  - customers — DAT Pathfinder voice, problem-first

role_systems_of_record:
  - Jira / Linear
  - Figma
  - Gong or Chorus
  - Amplitude or Mixpanel
  - Confluence

role_deliverable_types:
  - PRDs
  - roadmap docs
  - launch briefs
  - customer research summaries
  - pricing proposals

self_authored_org_initiatives: none
Example 3 — Sales AE (mid-market)
name: [full name]
role_title: Account Executive, Mid-Market
function: Sales
level: IC
scope: Mid-market brokerage accounts, freight brokerage segment
reports_to: [Manager name], Regional Sales Manager
direct_reports: none
team_shape: 8-person regional AE team + 2 SDRs

recurring_workflows:
  - prospecting and cold outreach
  - discovery calls and qualification
  - demo prep and delivery
  - proposal and contract authoring
  - forecast and pipeline reviews

role_success_metrics:
  - quota attainment
  - pipeline coverage (3x rule)
  - win rate
  - average deal size
  - sales cycle length

role_stakeholders:
  - prospects — DAT Pathfinder voice, outcomes-focused
  - Sales Manager — forecast-accurate, pipeline-honest
  - SE/solution partner — technical collaboration
  - CS handoff — clean account briefs

role_systems_of_record:
  - Salesforce (opportunities, accounts, contacts)
  - Outreach or Salesloft (sequences)
  - Gong (call recordings)
  - Slack (deal rooms)
  - Google Workspace (proposals, email)

role_deliverable_types:
  - prospecting emails and sequences
  - discovery and demo scripts
  - proposals and contracts
  - account briefs
  - forecast submissions

self_authored_org_initiatives: none
Example 4 — Finance IC (Sr Analyst / FP&A)
name: [full name]
role_title: Sr Financial Analyst, FP&A
function: Finance
level: IC
scope: Revenue forecasting and GTM finance partnership
reports_to: [Manager name], Manager of FP&A
direct_reports: none
team_shape: 4-person FP&A team + CFO

recurring_workflows:
  - monthly close support and variance analysis
  - quarterly forecast build
  - GTM spend analysis
  - board deck prep
  - ad hoc modeling for strategic decisions

role_success_metrics:
  - forecast accuracy (actual vs. forecast delta)
  - close timeline adherence
  - board deck turnaround
  - variance explanations accepted by leadership first-pass

role_stakeholders:
  - FP&A Manager — precise, model-backed
  - CFO / CEO — exec-calibrated, outcomes-forward
  - GTM leaders — plain-language financial guidance
  - Accounting — reconciliation-focused, tie-out ready

role_systems_of_record:
  - NetSuite or Sage Intacct
  - Adaptive or Pigment
  - Excel / Google Sheets (models)
  - Snowflake or Looker (data)
  - Confluence (analysis writeups)

role_deliverable_types:
  - financial models
  - variance analyses
  - board and exec deck pages
  - forecasts
  - scenario analyses

self_authored_org_initiatives: none
Example 5 — People Team Director (reference: Ben's own, current role)
name: Ben Krupp
role_title: Director, Talent Operations
function: People
level: Director
scope: Talent Acquisition, Talent Operations & Analytics, Workplace Experience
reports_to: Jana Galbraith, CPO
direct_reports: Nathalia Migliorato (Sr Mgr, Talent Ops), 3 recruiters, 3 workplace managers
team_shape: 7 direct reports across TA, Ops, Workplace

recurring_workflows:
  - requisition intake and approval routing
  - recruiting pipeline reviews
  - annual merit cycle
  - annual engagement survey (Gallup)
  - office transitions and workplace operations
  - hiring manager coaching
  - XLT and ELT People Team updates

role_success_metrics:
  - time to fill
  - quality of hire
  - recruiting cost per hire
  - engagement (Gallup grand mean, participation)
  - teammate belonging scores

role_stakeholders:
  - CPO (Jana) — problem + solution, direct
  - XLT — exec-calibrated, structured, data-backed
  - hiring managers — clear, warm, coaching tone
  - teammates (org-wide) — inclusive, calm, purposeful
  - recruiters (direct reports) — warm, clear, coaching tone

role_systems_of_record:
  - Greenhouse (ATS)
  - UKG (HRIS)
  - Gallup (engagement)
  - 15Five (performance)
  - Radford (comp)
  - Confluence, Google Drive, Slack

role_deliverable_types:
  - offer letters and comp recommendations
  - XLT / ELT decks
  - Gallup dashboards and action plans
  - merit cycle files
  - org-wide comms
  - hiring manager playbooks

self_authored_org_initiatives:
  - AI Fluency initiative (tied to: ai_fluency) → EXCLUDED from personal ai_fluency scoring


APPENDIX B — Operator notes
If running this assessment against someone else's history, the role_stakeholders and internal names are inherently sensitive. Stay in INTERNAL mode and do not export.
If running against your own history, memory should auto-populate most of the ROLE BLOCK. Confirm before scoring so errors don't propagate.
The ROLE-RELEVANCE FILTER will exclude meaningful off-role AI work (side projects, learning, personal tooling). This is by design. If the person wants a "whole life AI fluency" view, run a second assessment with the filter disabled and label it distinctly.
Swap the ORG BLOCK to repoint this entire prompt at a different company. The rubric, scoring rules, and file specs are portable. Only ORG and ROLE blocks are DAT-specific.
