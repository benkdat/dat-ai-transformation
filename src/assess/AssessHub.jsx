import { useRef } from "react";
import { Gauge, ArrowRight, BookOpen, Terminal, Sparkles, BarChart3 } from "lucide-react";
import { C } from "../components/DATokens";
import OneDATTruck from "../components/OneDATTruck";
import ModeToggle from "../components/ModeToggle";
import MetricsExplainer from "./MetricsExplainer";
import PromptRunner from "./PromptRunner";
import SampleReport from "./SampleReport";

const keyframes = `
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes driftSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
`;

function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: C.blue,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: 20,
          height: 2,
          background: `linear-gradient(90deg,${C.blue},${C.blue}44)`,
          borderRadius: 1,
        }}
      />
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: 30,
        fontWeight: 900,
        color: C.black,
        letterSpacing: "-0.02em",
        margin: "0 0 10px 0",
        lineHeight: 1.15,
      }}
    >
      {children}
    </h2>
  );
}

function SectionIntro({ children }) {
  return (
    <p
      style={{
        fontSize: 14,
        color: C.textSecondary,
        lineHeight: 1.65,
        maxWidth: 640,
        margin: "0 0 20px 0",
      }}
    >
      {children}
    </p>
  );
}

export default function AssessHub({ onSwitchMode }) {
  const metricsRef = useRef(null);
  const promptRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const TIERS = [
    {
      tier: "Foundations",
      map: "Novice / Functional",
      desc: "Learning to delegate, describe, discern, and apply diligence in AI use.",
    },
    {
      tier: "Practitioner",
      map: "Proficient / Advanced",
      desc: "AI embedded in the workflow. Repeatable systems. Judgment on when not to use AI.",
    },
    {
      tier: "Builder",
      map: "Native",
      desc: "Designs agents, orchestrates tools, and raises the floor for teammates.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Inter',system-ui,sans-serif",
        background: C.bg,
        color: C.textPrimary,
        minHeight: "100vh",
      }}
    >
      <style>{keyframes}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Top Nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 24px",
          borderBottom: `1px solid ${C.border}`,
          background: C.white,
          position: "sticky",
          top: 0,
          zIndex: 20,
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: C.black,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img src="/img/dat-logo.png" alt="DAT" style={{ width: "85%", height: "auto" }} />
          </div>
          <OneDATTruck size={22} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.greyDark }}>AI Fluency</span>
        </div>
        <ModeToggle
          mode="assess"
          onChange={(m) => {
            if (m !== "assess" && onSwitchMode) onSwitchMode();
          }}
        />
        <div style={{ flexShrink: 0, minWidth: 140 }} />
      </div>

      {/* Hero */}
      <section
        style={{
          padding: "72px 24px 56px",
          background: `linear-gradient(180deg, ${C.white} 0%, ${C.bg} 100%)`,
          borderBottom: `1px solid ${C.borderLight}`,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              marginBottom: 24,
              display: "inline-block",
              animation: "driftSlow 6s ease-in-out infinite",
            }}
          >
            <OneDATTruck size={80} />
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: C.blue,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            DAT AI Fluency · Assessment
          </div>
          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              fontWeight: 900,
              color: C.black,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Understand where you are today.
          </h1>
          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              fontWeight: 900,
              color: C.blue,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "4px 0 0 0",
            }}
          >
            See what to work on next.
          </h1>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.65,
              maxWidth: 560,
              margin: "22px auto 30px",
            }}
          >
            A role-specific read on your AI fluency across five dimensions. Your Claude history
            scored against a DAT rubric, with evidence, gaps, and recommendations you can act on.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => scrollTo(metricsRef)}
              style={{
                padding: "12px 22px",
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: C.white,
                color: C.textPrimary,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Inter',system-ui,sans-serif",
              }}
            >
              <BookOpen size={15} />
              Learn the 5 metrics
            </button>
            <button
              onClick={() => scrollTo(promptRef)}
              style={{
                padding: "12px 22px",
                borderRadius: 10,
                border: "none",
                background: C.blue,
                color: C.white,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Inter',system-ui,sans-serif",
              }}
            >
              <Terminal size={15} />
              Run your assessment
            </button>
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section style={{ padding: "56px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel>Why this matters</SectionLabel>
        <SectionTitle>Strategy sets the direction. Assessment measures how we track.</SectionTitle>
        <SectionIntro>
          DAT's AI transformation strategy names fluency as the competitive edge. This assessment
          is the measurement half — it tells individual teammates where they stand and gives the
          org an aggregate read on capability. Gaps surfaced here feed the next quarter's
          priorities.
        </SectionIntro>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginTop: 14,
          }}
        >
          {TIERS.map((t) => (
            <div
              key={t.tier}
              style={{
                background: C.card,
                borderRadius: 12,
                padding: "18px 18px",
                border: `1px solid ${C.border}`,
                borderTop: `3px solid ${C.blue}`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: C.textMuted,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Tier · {t.map}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: C.textPrimary,
                  marginBottom: 6,
                }}
              >
                {t.tier}
              </div>
              <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => onSwitchMode && onSwitchMode()}
          style={{
            marginTop: 20,
            padding: "10px 18px",
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            background: C.white,
            color: C.textPrimary,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Inter',system-ui,sans-serif",
          }}
        >
          View the full strategy
          <ArrowRight size={13} />
        </button>
      </section>

      {/* Metrics Explainer */}
      <section
        ref={metricsRef}
        style={{
          padding: "56px 24px",
          background: C.white,
          borderTop: `1px solid ${C.borderLight}`,
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel>The five metrics</SectionLabel>
          <SectionTitle>What we measure, and why each one matters</SectionTitle>
          <SectionIntro>
            These five dimensions cover the full lifecycle of AI use: how you brief the model, how
            you evaluate its output, how deeply it's embedded in your work, whether context carries
            across sessions, and whether you ship what it produces.
          </SectionIntro>
          <MetricsExplainer />
        </div>
      </section>

      {/* Run your assessment */}
      <section
        ref={promptRef}
        style={{ padding: "56px 24px", maxWidth: 1000, margin: "0 auto" }}
      >
        <SectionLabel>Run your assessment</SectionLabel>
        <SectionTitle>One prompt. Ten minutes. A real read.</SectionTitle>
        <SectionIntro>
          The assessment works by having Claude analyze your conversation history against a
          role-specific rubric. You provide the role context. Claude does the rest.
        </SectionIntro>
        <PromptRunner />
      </section>

      {/* Sample report */}
      <section
        style={{
          padding: "56px 24px",
          background: C.white,
          borderTop: `1px solid ${C.borderLight}`,
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel>What you'll get back</SectionLabel>
          <SectionTitle>A sample report, so you know what to expect</SectionTitle>
          <SectionIntro>
            Numbers are illustrative. Your report pulls evidence directly from your own
            conversations and recommends specific next moves for your role.
          </SectionIntro>
          <SampleReport />
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: "48px 24px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <div
          style={{
            background: C.black,
            borderRadius: 14,
            padding: "32px 32px",
            color: C.white,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 220,
              height: 220,
              background: `radial-gradient(circle, ${C.blueOnBlack}33 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.blueOnBlack,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Same mission. New frontier.
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                We take the uncertainty out of freight.
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                Now we take the uncertainty out of how we work. This assessment is how each of us
                measures progress against that.
              </div>
            </div>
            <OneDATTruck size={72} style={{ filter: "brightness(1.1)" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
