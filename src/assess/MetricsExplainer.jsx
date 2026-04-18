import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { C, METRIC_COLORS, METRIC_LABELS, METRIC_ORDER, TIER_SCALE } from "../components/DATokens";

const METRIC_COPY = {
  PQ: {
    question: "Do you give the model enough structure, context, and constraints to produce a useful first response?",
    good: [
      "Front-loads audience, deliverable format, and constraints before asking the model to generate, so the first draft is 80%+ usable without follow-up rounds.",
      "Loads source data directly (from your ATS, CRM, codebase, financial model, or analytics platform) rather than paraphrasing from memory, so the model works from real inputs.",
      "Names specific failure modes upfront (\"don't fabricate data points,\" \"don't use jargon from our exclusion list,\" \"don't assume access to systems you're not connected to\") so the model avoids predictable mistakes.",
    ],
  },
  OD: {
    question: "Do you consistently evaluate, challenge, and refine what the model produces before using it?",
    good: [
      "Treats first drafts as raw material for anything consequential. Checks claims against source data, validates tone for the target audience, and rejects structurally weak responses even when they sound plausible.",
      "Catches domain-specific fabrications: invented data points, hallucinated system names, made-up API endpoints, nonexistent vendor names, or metrics that don't match your source of truth.",
      "Pushes back when output drifts from the brief. If the audience expects problem-first framing or a specific brand voice, the output gets rejected or reworked until it matches.",
    ],
  },
  WI: {
    question: "Is AI structurally embedded in how you work, or a place you occasionally visit?",
    good: [
      "Claude is a default step in multiple recurring workflows. Standing instructions, memory, or saved configurations mean the model already knows your role context when you start.",
      "Connected tools are aligned to your actual systems of record (CRM, ATS, code repos, project management, data warehouse, email, calendar) rather than relying on generic web search or manual copy-paste.",
      "At least one process runs with some automation: a scheduled trigger, a scripted pipeline, or an integration that feeds data to Claude without manual intervention each time.",
    ],
  },
  CSC: {
    question: "Does your Claude usage compound over time, or does each interaction start from zero?",
    good: [
      "Recurring work cycles (quarterly planning, annual reviews, product launches, financial close) build on prior rounds rather than re-explaining the same context each time.",
      "Work on one priority informs adjacent work. Insights from a pipeline review surface in a hiring conversation. Data from a financial model feeds a board deck. Cross-pollination is visible.",
      "Your Claude environment could be handed to someone else in your role and they'd be productive within a session. The accumulated context is transferable, not locked in your head.",
    ],
  },
  EoI: {
    question: "Do you act on what AI produces, or does analysis accumulate without driving decisions?",
    good: [
      "AI output regularly ships into production: merged code, sent communications, published dashboards, completed deliverables, updated systems of record. The gap between draft and live is hours, not days.",
      "AI-accelerated work visibly moves your success metrics (cycle time, win rate, time to fill, forecast accuracy, deployment velocity). Impact is attributable, not speculative.",
      "If an insight is worth generating, it's worth acting on. The \"good idea that goes nowhere\" pattern is the exception, not the norm.",
    ],
  },
};

function MetricCard({ k, expanded, onToggle }) {
  const color = METRIC_COLORS[k];
  const copy = METRIC_COPY[k];
  return (
    <div
      style={{
        background: C.card,
        borderRadius: 12,
        border: `1px solid ${expanded ? color + "66" : C.border}`,
        borderLeft: `4px solid ${color}`,
        overflow: "hidden",
        transition: "all 0.25s",
        boxShadow: expanded ? `0 6px 20px ${color}14` : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "'Inter',system-ui,sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: color + "18",
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
          >
            {k}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary }}>
              {METRIC_LABELS[k]}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, lineHeight: 1.4 }}>
              {copy.question}
            </div>
          </div>
        </div>
        <ChevronDown
          size={18}
          color={C.textMuted}
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.25s",
            flexShrink: 0,
          }}
        />
      </button>
      {expanded && (
        <div style={{ padding: "0 20px 18px 20px", borderTop: `1px solid ${C.borderLight}` }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: color,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 14,
              marginBottom: 8,
            }}
          >
            What good looks like
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {copy.good.map((g, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <CheckCircle2 size={14} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.55 }}>{g}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MetricsExplainer() {
  const [expanded, setExpanded] = useState("PQ");

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {METRIC_ORDER.map((k) => (
          <MetricCard
            key={k}
            k={k}
            expanded={expanded === k}
            onToggle={() => setExpanded(expanded === k ? null : k)}
          />
        ))}
      </div>

      <div
        style={{
          background: C.card,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: C.greyDark,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Score Scale
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TIER_SCALE.map((t) => (
            <div
              key={t.label}
              style={{
                flex: "1 1 100px",
                minWidth: 100,
                padding: "10px 12px",
                borderRadius: 8,
                background: C.bgAlt,
                borderLeft: `3px solid ${t.color}`,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: t.color }}>{t.range}</div>
              <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
