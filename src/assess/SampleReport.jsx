import { TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { C, METRIC_COLORS, METRIC_LABELS, METRIC_ORDER } from "../components/DATokens";

const SAMPLE_SCORES = { PQ: 7.5, OD: 6.8, WI: 8.2, CSC: 5.4, EoI: 7.1 };

const TIER_BY_SCORE = (s) => {
  if (s >= 8) return { label: "Native", color: "#000000" };
  if (s >= 7) return { label: "Advanced", color: "#0046DD" };
  if (s >= 6) return { label: "Proficient", color: "#4D84FF" };
  if (s >= 4) return { label: "Functional", color: "#80A8FF" };
  return { label: "Novice", color: "#8A8D8F" };
};

function ScoreBar({ k }) {
  const score = SAMPLE_SCORES[k];
  const color = METRIC_COLORS[k];
  const tier = TIER_BY_SCORE(score);
  const pct = (score / 10) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 44,
          fontSize: 11,
          fontWeight: 800,
          color: color,
          letterSpacing: "0.05em",
          flexShrink: 0,
        }}
      >
        {k}
      </div>
      <div style={{ flex: 1, fontSize: 12, color: C.textPrimary, fontWeight: 600 }}>
        {METRIC_LABELS[k]}
      </div>
      <div
        style={{
          width: 180,
          height: 10,
          background: C.bgAlt,
          borderRadius: 6,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: `linear-gradient(90deg,${color}dd,${color})`,
            borderRadius: 6,
          }}
        />
      </div>
      <div
        style={{
          width: 40,
          fontSize: 14,
          fontWeight: 900,
          color: C.textPrimary,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {score.toFixed(1)}
      </div>
      <div
        style={{
          width: 90,
          fontSize: 10,
          fontWeight: 800,
          color: tier.color,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {tier.label}
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, label, color, title, body }) {
  return (
    <div
      style={{
        background: C.card,
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${color}`,
        padding: "14px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <Icon size={14} color={color} />
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: color,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 11.5, color: C.textSecondary, lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

export default function SampleReport() {
  return (
    <div>
      <div
        style={{
          background: C.card,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          padding: "20px 24px",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: C.textMuted,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Sample Report — illustrative only
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.textPrimary }}>
              Senior People Business Partner
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
              Overall tier: <span style={{ color: C.blue, fontWeight: 800 }}>Proficient</span>{" "}
              trending <span style={{ color: C.blue, fontWeight: 800 }}>Advanced</span>
            </div>
          </div>
          <div
            style={{
              background: C.blueLight,
              color: C.blue,
              fontSize: 11,
              fontWeight: 800,
              padding: "6px 12px",
              borderRadius: 20,
              letterSpacing: "0.05em",
            }}
          >
            Overall 7.0 / 10
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {METRIC_ORDER.map((k) => (
            <ScoreBar key={k} k={k} />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <InsightCard
          icon={TrendingUp}
          label="Strength"
          color="#059669"
          title="Workflow Integration is strong"
          body="Custom skills for comp cycles, engagement survey analysis, and stakeholder comms. Memory carries PBP context across conversations. Connected tools include Greenhouse and Google Drive."
        />
        <InsightCard
          icon={AlertCircle}
          label="Gap"
          color={C.red}
          title="Cross-Session Context resets too often"
          body="New chats for each PBP check-in. Recent engagement work doesn't inform related retention planning. Each conversation starts from zero instead of building on the last."
        />
        <InsightCard
          icon={Lightbulb}
          label="Recommendation"
          color={C.blue}
          title="Run your PBP work as one continuous thread per stakeholder group"
          body="Instead of one chat per task, maintain a running project per client group (e.g., Eng leadership). Reference prior discussions by date. Expect CSC to move from 5.4 to 7+ within a cycle."
        />
      </div>

      <div
        style={{
          marginTop: 14,
          padding: "12px 16px",
          background: C.bgAlt,
          borderRadius: 10,
          fontSize: 11.5,
          color: C.textMuted,
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        Your actual report will include evidence pulled directly from your own conversations, a
        named growth trajectory, and three recommendations tailored to your role and current tier.
      </div>
    </div>
  );
}
