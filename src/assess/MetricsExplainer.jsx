import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { C, METRIC_COLORS, METRIC_LABELS, METRIC_ORDER, TIER_SCALE } from "../components/DATokens";

const METRIC_COPY = {
  PQ: {
    question: "Do you give the model what it needs to produce a useful first response?",
    good: [
      "Names specific audiences (XLT, hiring managers, teammates) rather than writing to the void.",
      "Loads context from Greenhouse, UKG, or Radford instead of paraphrasing from memory.",
      "Writes in Pathfinder voice natively and names likely failure modes upfront.",
    ],
  },
  OD: {
    question: "How often do you catch the model being wrong, and act on it?",
    good: [
      "Rejects output that violates Pathfinder voice or uses banned corporate jargon.",
      "Catches fabricated Radford codes, account names, or stakeholder titles.",
      "Pushes back when AI recommendations bypass stakeholder tone expectations.",
    ],
  },
  WI: {
    question: "Is AI embedded in how you work, or a place you occasionally visit?",
    good: [
      "Custom skills maintained for role-specific work, not reused for unrelated asks.",
      "Memory populated with role context that persists across conversations.",
      "Connected tools aligned to your systems of record (Gmail, Calendar, Drive, Slack, Jira, Snowflake, Greenhouse).",
    ],
  },
  CSC: {
    question: "Do conversations build on each other, or does each one reset?",
    good: [
      "Role-specific cycles accumulate continuity — comp cycle, engagement survey, product launches.",
      "Work on one priority informs adjacent ones without re-briefing from scratch.",
      "Cross-functional arcs are visible: People → Finance → Product threads connect.",
    ],
  },
  EoI: {
    question: "Do you act on what AI produces, or does analysis accumulate without output?",
    good: [
      "Outputs ship into your systems of record — committed code, sent offers, updated dashboards, published comms.",
      "AI-accelerated work visibly moves your success metrics, not just your draft count.",
      "Insights become decisions and artifacts, not bookmarked chats.",
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
            What good looks like at DAT
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
