Claude Code Companion — AI Fluency Evidence Bundle (v3)

You are running in Claude Code. Your job is to inspect this local machine and produce a SUPPLEMENTAL ROLE-RELEVANT EVIDENCE bundle for the AI Fluency Assessment v3. The main assessment runs in Claude.ai against conversation history. This bundle captures the evidence Claude.ai cannot see: custom skills, MCP servers, shipped role-relevant repos, plan-mode artifacts, memory entries, scheduled tasks, permission grooming, and connected-tool activity.

The user will paste your output into their Claude.ai assessment directly after the main prompt, in the same message, before sending. Without this bundle, Metric 3 (Workflow Integration) and Metric 5 (Execution on Insight) under-represent actual fluency whenever real infrastructure lives outside chat.


HOW TO USE THIS PROMPT (quick reference)
1. Open Claude Code (in any directory on your machine — it does not need to be a specific repo).
2. Fill in the ORG BLOCK and ROLE BLOCK below. Use the same populated values you plan to use in Claude.ai so the two sides match. If Claude Code memory already has this context, ask Claude Code to read it and confirm before running.
3. Send. Claude Code inspects ~/.claude/, ~/Projects/, connected MCP servers, and scheduled tasks, then outputs a single markdown block starting with "## SUPPLEMENTAL ROLE-RELEVANT EVIDENCE".
4. Copy the entire output. Paste it into your Claude.ai conversation directly after the main assessment prompt, in the same message.


─── ORG BLOCK (fill in before running) ─────────────────────────

org: <<FILL IN: organization name>>
industry: <<FILL IN: industry or primary domain>>
org_stage: <<FILL IN: e.g., "early startup", "foundation-building post-acquisition", "mature public company">>
office_footprint: <<FILL IN: cities or "remote-first">>

stated_leadership_metrics:
  - <<FILL IN: leadership metric 1>>
  - <<FILL IN: leadership metric 2>>
  - <<FILL IN: 3–7 total>>

voice: <<FILL IN: your org's brand voice descriptors>>

internal_language:
  - <<FILL IN: internal terms, or "none">>

common_exec_audiences:
  <<FILL IN: audience>>: <<FILL IN: tone expectation>>

org_mandate_phrases_to_avoid:
  - <<FILL IN: banned jargon, or "none">>

brand_system_reference: <<FILL IN: pointer to brand guidelines, or "none">>


─── ROLE BLOCK (fill in before running) ────────────────────────

name: <<FILL IN>>
role_title: <<FILL IN>>
function: <<FILL IN>>
level: <<FILL IN: IC | Manager | Director | VP>>
scope: <<FILL IN: one-sentence description of what you own>>
reports_to: <<FILL IN>>
direct_reports: <<FILL IN: count + composition, or "none">>
team_shape: <<FILL IN: team size + peer context>>

recurring_workflows:
  - <<FILL IN: 5–10 items>>

role_success_metrics:
  - <<FILL IN: 3–7 items — these drive what counts as "moved a metric" in Section B / Provisional Scores>>

role_stakeholders:
  - <<FILL IN: 4–8 items with tone expectations>>

role_systems_of_record:
  - <<FILL IN: 4–10 items — this is the CRITICAL field for deciding what counts as role-relevant infrastructure and shipped artifacts>>

role_deliverable_types:
  - <<FILL IN: 4–8 items>>

self_authored_org_initiatives:
  - <<FILL IN: any org-level initiative you personally lead, formatted as "Initiative name (tied to: metric_name) → EXCLUDED from personal metric_name scoring", or "none">>


MODE: INTERNAL — the bundle will be pasted into the user's own Claude.ai conversation, where names are allowed.


─── INSPECTION STEPS ────────────────────────────────────────────

1. Persistent AI Infrastructure (~/.claude/)
   - Custom Skills (~/.claude/skills/): list each skill with name, approximate line count, install date, and which ROLE BLOCK item it ties to. Mark "generic" if no direct tie.
   - Slash Commands (~/.claude/commands/): list each with name and role tie.
   - Plan Mode Artifacts (~/.claude/plans/): list recent plans with name, creation date, and the project or workstream each one designs. Flag role-relevant vs. off-role.
   - Memory Entries (~/.claude/projects/*/memory/): list with brief description. Flag any that encode ROLE BLOCK or ORG BLOCK context.
   - Hooks & Permissions: read ~/.claude/settings.json and ~/.claude/settings.local.json.
     * Identify custom MCP server configs (cite server name and role tie).
     * Count allowed-bash entries in settings.local.json. >20 = strong deliberate permission-list curation — call that out explicitly.
   - Custom MCP Servers: for each custom MCP referenced in settings, locate its source directory (usually ~/Projects/<name>). For each, report: path, language/framework, what it wraps, role tie, commit count + recency.
   - Installed MCP Servers (connected): list standard connected servers (Google Drive, Gmail, Calendar, Slack, Atlassian, GitHub, Jira, Snowflake, Salesforce, Neon, etc.). Note which ROLE BLOCK role_systems_of_record each aligns to.
   - Session volume (proxy): count session files across Claude Code project directories (e.g., ~/.claude/projects/*/). Report the total.
   - Command history depth: count lines in ~/.claude/history.jsonl and report.
   - Plugins: list installed plugin marketplaces (~/.claude/plugins/marketplaces/) and count.

2. Shipped Role-Relevant Artifacts
   Inspect ~/Projects/ (and ~/Documents/ if code lives there). For each git-tracked or deployed project whose purpose maps to a ROLE BLOCK role_system_of_record or role_deliverable_type, record:
   - Project name
   - Stack (framework, language)
   - System-of-record tie (map to ROLE BLOCK explicitly)
   - Status (deployed, prototype, local-only) + commit count + last commit date
   - Role success metric the artifact could plausibly move
   - Self-authored flag (true if part of a self_authored_org_initiatives entry)
   Projects with zero tie to the ROLE BLOCK move to Section F instead of Section B.

3. Cross-Tool Activity (past 90 days, role-relevant)
   If Drive, Gmail, Calendar, Slack, Confluence, or Atlassian MCP servers are connected, sample recent activity and describe at the behavior level. Do NOT dump raw content or verbatim messages. Focus on:
   - Recently-authored or recently-edited documents in role_systems_of_record matching role_deliverable_types
   - Pages authored in role-relevant Confluence spaces
   - Active Slack channels tied to role_stakeholders
   - Database activity via connected data-tool MCPs

4. AI-Assisted Documents (past 60 days, role-relevant)
   From Drive or the local filesystem, list documents that appear to be AI-assisted outputs tied to role work. Flag self-authored org initiative documents separately.

5. Scheduled / Autonomous AI Work
   Look in:
   - ~/.claude/scheduled-tasks/ or equivalent MCP configs
   - ~/Documents/Claude/Scheduled/
   - .github/workflows/ inside each role-relevant repo
   - Apps Script triggers, cron jobs, Render/Vercel scheduled deployments (render.yaml, vercel.json cron entries, triggers.json)
   For each: trigger cadence and role tie. Apply FOUNDATION-BUILDING STAGE WEIGHT if ORG BLOCK org_stage warrants — scheduled/autonomous workflows score heavily for M3 and M5.

6. Off-Role Sophisticated AI Work (context only)
   Note technically sophisticated AI projects that are NOT role-relevant. Mark explicitly as "does not score per ROLE-RELEVANCE FILTER" — this section exists for narrative context in Section 6 of the main assessment, not for scoring.

7. Provisional Scores (Claude Code pass)
   Score to one decimal per the DECIMAL PRECISION RULES in the main assessment:
   - Metric 3 (Workflow Integration): rationale + the one observable change that would push it to the next band
   - Metric 5 (Execution on Insight): rationale + which shipped artifacts moved role/org metrics vs. sat idle
   Mark PENDING on Metric 1 (Prompt Quality), Metric 2 (Output Discipline), Metric 4 (Cross-Session Context) — they require the Claude.ai chat-history pass. Optional: give a floor indicator for any of these three if infrastructure-level evidence visibly supports it (e.g., reusable meta-prompts for M1, plan-mode multi-session arcs for M4).

8. Self-Authored Exclusions
   List artifacts tied to self_authored_org_initiatives from the ROLE BLOCK. These count for Metric 3 (infrastructure) and Metric 5 (shipping) generally, BUT are excluded from that initiative's corresponding ORG BLOCK metric in Section 6.5b of the main report.


─── OUTPUT FORMAT (exact) ───────────────────────────────────────

Produce one markdown block using these exact headers and order:

## SUPPLEMENTAL ROLE-RELEVANT EVIDENCE (Claude Code pass, YYYY-MM-DD)

The following artifacts were observed in the user's local AI infrastructure and connected tools. Treat them as first-class role-relevant evidence alongside any conversation sample. Apply the ROLE-RELEVANCE FILTER and SELF-AUTHORED METRIC RULE from the main prompt.

**Mode:** INTERNAL
**ORG BLOCK:** [one-line summary — org name, industry, stage]
**ROLE BLOCK:** [one-line summary — name, role_title, function, level]
**Self-authored initiatives:** [list, or "none"]

---

### A. Persistent AI Infrastructure

**Custom Skills** (`~/.claude/skills/`)
- [name] — [line count], [install date]. Role tie: [description].

**Slash Commands** (`~/.claude/commands/`)
- [name].md — [one-line description]. Role tie: [description].

**Plan Mode Artifacts** (`~/.claude/plans/`)
- [plan-name].md ([date]) — [what it designs]. [role-relevant | off-role]

**Memory Entries** (`~/.claude/projects/*/memory/`)
- [name].md — [description]. [persistence note]

**Hooks & Permissions** (`~/.claude/settings.json`, `settings.local.json`)
- settings.json: [custom MCP configs observed]
- settings.local.json: [N] allowed-bash entries [grooming qualitative note]

**Custom MCP Servers**
- [name] (`[path]`, [size], [N] commits [date range]). [Language/framework] wrapping [what]. **Role tie: [what it enables for the ROLE BLOCK].**

**Installed MCP Servers** (connected)
- [list, with "(custom, above)" marker for any custom ones]

**Session volume (proxy):** ~[N] session files across [N] Claude Code project directories.

**Command history depth:** [N] lines in `~/.claude/history.jsonl`.

**Plugins:** [N] marketplaces installed plus blocklist curation [if applicable].

---

### B. Shipped Role-Relevant Artifacts

| Project | Stack | System-of-Record Tie | Status | Metric Touched | Self-Authored |
|---|---|---|---|---|---|
| [name] | [stack] | [role_system_of_record match] | [deployed / prototype / local] ([N] commits, [date]) | [role_success_metric] | [true/false] |

---

### C. Cross-Tool Activity (past 90 days, role-relevant)

- **[Tool name]:** [behavior-level description of relevant activity]
- [...]

---

### D. AI-Assisted Documents (Drive, past 60 days)

- [doc name] — [size/type], [date] — [brief description] [— **self_authored** marker if applicable]

---

### E. Scheduled / Autonomous AI Work

- **[name]** — [trigger cadence]. [What it does]. [Role tie]. [Status]

Foundation-building weight note: [if ORG BLOCK org_stage warrants, explain how these score heavily under M3 and M5].

---

### F. Off-Role Sophisticated AI Work (context only, does not score)

- [project] — [brief description]. Does not contribute to scoring per ROLE-RELEVANCE FILTER.

---

### Provisional Scores (Claude Code pass)

- **Metric 3 — Workflow Integration: X.X / 10**
  Rationale: [evidence-based reasoning referencing Sections A, E]. Foundation-building weight applied [if warranted]. [What would move the score to the next band.]

- **Metric 5 — Execution on Insight: X.X / 10**
  Rationale: [evidence-based reasoning referencing Section B shipped artifacts and Section E scheduled work]. [Which artifacts moved metrics; which reserved a higher score.]

- **Metric 1 (Prompt Quality):** PENDING — Claude.ai chat-history pass required. *Floor indicator (optional):* [if meta-prompting evidence is visible in skills/plans, cite it; else omit]

- **Metric 2 (Output Discipline):** PENDING — Claude.ai chat-history pass required.

- **Metric 4 (Cross-Session Context):** PARTIAL — [plan-mode artifacts and memory persistence suggest a floor of X.X; full determination requires chat-history pass on multi-session arcs.]

---

### Self-Authored Exclusions

The following are excluded from scoring of Section 6.5b's [relevant org-level metric] per the SELF-AUTHORED METRIC RULE:

- [artifact name] — excluded from [metric_name] credit

All above still count for M3 (persistent infrastructure) and M5 (shipped artifacts) *generally*, but do NOT credit toward the [metric_name] org-level metric alignment in Section 6.5b.


─── FINAL INSTRUCTION ───────────────────────────────────────────

End your output with this exact line, on its own, separated from the sections above by a blank line:

"Paste this entire bundle into your Claude.ai conversation immediately after the main AI Fluency Report v3 prompt, in the same message, before sending."
