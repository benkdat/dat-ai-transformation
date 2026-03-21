import { useState, useEffect, useRef } from "react";
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from "recharts";

// ── DAT Brand Tokens ──
const C = {
  blue: "#0046DD",
  blueOnBlack: "#0056FF",
  black: "#000000",
  white: "#FFFFFF",
  grey: "#8A8D8F",
  greyMed: "#6E6B68",
  greyDark: "#565657",
  red: "#E10600",
  yellow: "#FFD700",
  bg: "#0A0A0C",
  card: "#111114",
  cardHover: "#18181C",
  blueMuted: "rgba(0,70,221,0.12)",
  blueGlow: "rgba(0,86,255,0.25)",
  textPrimary: "#F0F0F2",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
};

// ── Slide Data ──
const slides = [
  { id: "title", label: "Title" },
  { id: "why-now", label: "Why Now" },
  { id: "one-dat", label: "One DAT" },
  { id: "landscape", label: "Landscape" },
  { id: "framework", label: "Framework" },
  { id: "proof", label: "Already Built" },
  { id: "roadmap", label: "Roadmap" },
  { id: "fluency", label: "AI Fluency" },
  { id: "governance", label: "Governance" },
  { id: "metrics", label: "Metrics" },
  { id: "close", label: "The Ask" },
];

// ── Animations ──
const fadeUp = (delay = 0) => ({
  opacity: 0,
  transform: "translateY(24px)",
  animation: `fadeUp 0.6s ease-out ${delay}s forwards`,
});

const keyframes = `
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0,70,221,0.15); }
  50% { box-shadow: 0 0 40px rgba(0,70,221,0.35); }
}
@keyframes countUp {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dotGrid {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.06; }
}
`;

// ── Components ──

function DotGrid() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ animation: "dotGrid 8s ease-in-out infinite" }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill={C.blueOnBlack} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

function GlowOrb({ top, left, size = 300, color = C.blueGlow }) {
  return (
    <div style={{
      position: "absolute", top, left, width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
    }} />
  );
}

function StatCard({ value, label, delay = 0, accent = C.blue }) {
  return (
    <div style={{
      ...fadeUp(delay),
      background: C.card,
      border: `1px solid ${accent}22`,
      borderRadius: 12,
      padding: "28px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accent }} />
      <div style={{ fontSize: 42, fontWeight: 900, color: accent, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 10, lineHeight: 1.4, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function PillarCard({ icon, title, items, delay = 0, accent = C.blue }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...fadeUp(delay),
        background: hovered ? C.cardHover : C.card,
        border: `1px solid ${hovered ? accent + "44" : accent + "18"}`,
        borderRadius: 14,
        padding: "28px 24px",
        transition: "all 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: C.textPrimary, marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 6, paddingLeft: 14, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, color: accent, fontWeight: 700 }}>›</span>
          {item}
        </div>
      ))}
    </div>
  );
}

function PhaseCard({ phase, title, quarter, items, delay = 0, active = false }) {
  const [expanded, setExpanded] = useState(active);
  const accent = phase === 1 ? C.blue : phase === 2 ? C.yellow : "#22C55E";
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        ...fadeUp(delay),
        background: expanded ? C.cardHover : C.card,
        border: `1px solid ${expanded ? accent + "55" : accent + "18"}`,
        borderRadius: 14,
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        animation: expanded ? "glowPulse 3s ease-in-out infinite" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expanded ? 16 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: accent + "18", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: accent,
          }}>
            {phase}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary }}>{title}</div>
            <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, marginTop: 2 }}>{quarter}</div>
          </div>
        </div>
        <div style={{ color: C.textMuted, fontSize: 20, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▾</div>
      </div>
      {expanded && (
        <div style={{ paddingTop: 8, borderTop: `1px solid ${accent}15` }}>
          {items.map((item, i) => (
            <div key={i} style={{
              fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8, paddingLeft: 16, position: "relative",
              opacity: 0, animation: `slideIn 0.4s ease-out ${i * 0.08}s forwards`,
            }}>
              <span style={{ position: "absolute", left: 0, color: accent }}>→</span>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── SLIDES ──

function TitleSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100%", textAlign: "center", position: "relative" }}>
      <DotGrid />
      <GlowOrb top="-10%" left="30%" size={500} />
      <GlowOrb top="60%" left="60%" size={350} color="rgba(0,70,221,0.15)" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 24 }}>
          DAT Freight & Analytics · People Team
        </div>
        <h1 style={{ ...fadeUp(0.15), fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, color: C.white, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0 }}>
          Everyone Has the<br />Same Tools.
        </h1>
        <h1 style={{ ...fadeUp(0.3), fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, color: C.blueOnBlack, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "4px 0 0 0" }}>
          The Edge Goes to<br />Whoever Builds Fastest.
        </h1>
        <p style={{ ...fadeUp(0.5), fontSize: 17, color: C.textSecondary, marginTop: 28, lineHeight: 1.7, maxWidth: 580, margin: "28px auto 0" }}>
          How DAT is building AI fluency, redesigning work, and accelerating the One DAT mission across every function, location, and team.
        </p>
        <div style={{ ...fadeUp(0.7), display: "flex", gap: 12, justifyContent: "center", marginTop: 36 }}>
          <div style={{ padding: "10px 20px", background: C.blue, borderRadius: 8, fontSize: 13, fontWeight: 700, color: C.white }}>Presented by Talent Operations</div>
          <div style={{ padding: "10px 20px", background: C.card, border: `1px solid ${C.blue}33`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: C.textSecondary }}>March 2026</div>
        </div>
      </div>
    </div>
  );
}

function WhyNowSlide() {
  const data = [
    { year: "2022", value: 12 },
    { year: "2023", value: 28 },
    { year: "2024", value: 55 },
    { year: "2025", value: 78 },
    { year: "2026", value: 95 },
  ];
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="-5%" left="70%" size={350} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>The Burning Platform</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Why Now. Why Us.</h2>
        <p style={{ ...fadeUp(0.2), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 32 }}>
          AI adoption in HR has gone from experimental to existential. The organizations that build fluency first don't just keep pace — they define the new standard. DAT has the foundation. This is about acceleration.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          <StatCard value="39%" label="of core skills expected to change by 2030" delay={0.2} />
          <StatCard value="78%" label="of companies have deployed AI in at least one function" delay={0.3} accent={C.yellow} />
          <StatCard value="95%" label="of AI pilots fail to move beyond prototype" delay={0.4} accent={C.red} />
          <StatCard value="120+" label="hours per teammate per year freed by AI" delay={0.5} accent="#22C55E" />
        </div>
        <div style={{ ...fadeUp(0.6), background: C.card, borderRadius: 14, padding: "24px 28px", border: `1px solid ${C.blue}15` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textSecondary, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Enterprise AI Adoption Curve — HR Function</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" tick={{ fill: C.textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ background: C.card, border: `1px solid ${C.blue}33`, borderRadius: 8, fontSize: 12, color: C.textPrimary }}
                formatter={(v) => [`${v}% adoption`, "HR AI Maturity"]}
              />
              <Area type="monotone" dataKey="value" stroke={C.blue} strokeWidth={2.5} fill="url(#blueGrad)" dot={{ fill: C.blue, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>Sources: Gartner CHRO Survey 2026, Deloitte Global Human Capital Trends, AIHR Priorities Report</div>
        </div>
      </div>
    </div>
  );
}

function OneDATSlide() {
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="20%" left="-5%" size={400} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Strategic Anchor</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>One DAT. One Capability.</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
          Four acquisitions. Six offices. 700 teammates. The One DAT mission is about building a single, unified culture and operating system. AI transformation is how we get there — not a parallel initiative, but the engine that makes One DAT real.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: "28px 24px", border: `1px solid ${C.blue}18` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.blue, marginBottom: 16 }}>Without AI Fluency</div>
            {["Siloed processes from 4 legacy orgs", "Manual work that doesn't scale", "Knowledge trapped in individual heads", "Six offices, six different ways of working", "Slow decision cycles on workforce data"].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 6, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: C.red }}>✕</span>{item}
              </div>
            ))}
          </div>
          <div style={{ ...fadeUp(0.3), background: C.card, borderRadius: 14, padding: "28px 24px", border: `1px solid #22C55E18` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#22C55E", marginBottom: 16 }}>With AI Fluency</div>
            {["Unified processes powered by shared AI tools", "Automation that scales across all locations", "Institutional knowledge embedded in systems", "Consistent experience: Seattle = Denver = Bangalore", "Real-time workforce intelligence for leadership"].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 6, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#22C55E" }}>✓</span>{item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...fadeUp(0.45), background: `linear-gradient(135deg, ${C.blue}12, ${C.blue}06)`, borderRadius: 12, padding: "20px 24px", border: `1px solid ${C.blue}25`, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 32 }}>⚡</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.blueOnBlack }}>The Multiplier Effect</div>
            <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginTop: 4 }}>
              Every AI capability we build in People Team becomes a template for every other function. We're not just transforming HR — we're establishing the operating pattern for how DAT adopts AI company-wide.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandscapeSlide() {
  const radarData = [
    { subject: "Self-Service", DAT: 65, Industry: 45 },
    { subject: "Predictive\nAnalytics", DAT: 55, Industry: 35 },
    { subject: "Process\nAutomation", DAT: 70, Industry: 50 },
    { subject: "AI Routing\n& Triage", DAT: 75, Industry: 25 },
    { subject: "Workforce\nIntelligence", DAT: 60, Industry: 40 },
    { subject: "Teammate\nExperience", DAT: 50, Industry: 45 },
  ];
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="40%" left="75%" size={300} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Industry Context</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Where We Stand</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
          Gartner, Deloitte, and Bersin all converge on the same conclusion: 2026 is when HR moves from AI experimentation to AI-as-infrastructure. Only 21% of CHROs are closely involved in AI strategy. DAT's People Team is already building.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.blue}15` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>DAT vs. Industry AI Maturity</div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={C.greyDark + "33"} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: C.textMuted, fontSize: 10 }} />
                <PolarRadiusAxis tick={false} domain={[0, 100]} axisLine={false} />
                <Radar name="DAT" dataKey="DAT" stroke={C.blue} fill={C.blue} fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Industry Avg" dataKey="Industry" stroke={C.grey} fill={C.grey} fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 4" />
                <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.blue}33`, borderRadius: 8, fontSize: 12, color: C.textPrimary }} />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 3, background: C.blue, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: C.textMuted }}>DAT Today</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 3, background: C.grey, borderRadius: 2, borderStyle: "dashed" }} />
                <span style={{ fontSize: 11, color: C.textMuted }}>Industry Avg</span>
              </div>
            </div>
          </div>
          <div style={{ ...fadeUp(0.3), display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { source: "Gartner", insight: "Shape work in the human-machine era. Mobilize leaders to make change routine.", color: C.blue },
              { source: "Deloitte", insight: "The S-curve is compressing. Organizations must leap to the next curve faster to stay competitive.", color: C.yellow },
              { source: "Josh Bersin", insight: "2026 marks the shift from record-keeping to agentic action. HR is becoming 'full-stack.'", color: "#22C55E" },
              { source: "Ethan Mollick", insight: "Nobody knows anything — including the labs. The people in this room get to decide what this looks like.", color: C.blueOnBlack },
            ].map((item, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 10, padding: "16px 18px", borderLeft: `3px solid ${item.color}`, border: `1px solid ${item.color}15`, borderLeftWidth: 3 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.source}</div>
                <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5 }}>{item.insight}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameworkSlide() {
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="-10%" left="50%" size={400} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Strategic Framework</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Three Pillars of AI Transformation</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
          We're not chasing AI for AI's sake. Every initiative maps to one of three pillars — each directly connected to how we accelerate the One DAT mission and make teammates' work better.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          <PillarCard
            icon="🤖" title="Automate the Yester-Work" delay={0.2} accent={C.blue}
            items={[
              "Eliminate manual processes designed for a pre-AI world",
              "AI-powered self-service for 80% of common teammate questions",
              "Intelligent routing via #ask-people-team Slack bot",
              "Automated comp verification, offer generation, onboarding flows",
              "Target: 75% of repetitive People Ops work automated by EOY",
            ]}
          />
          <PillarCard
            icon="📊" title="Build Workforce Intelligence" delay={0.3} accent={C.yellow}
            items={[
              "Real-time dashboards replacing quarterly static reports",
              "Predictive retention and engagement modeling",
              "Skills inventory and capability mapping across all 6 locations",
              "Workforce planning integrated with Finance forecasting",
              "Target: People data rivals financial data in strategic importance",
            ]}
          />
          <PillarCard
            icon="🧠" title="Develop AI Fluency" delay={0.4} accent="#22C55E"
            items={[
              "Every teammate confident using AI in their daily work",
              "Rebuild the apprenticeship model for an AI-augmented world",
              "Leader training: manage AI-augmented teams, not just people",
              "Cross-functional 'impossible task' teams to drive experimentation",
              "Target: 75% of teammates actively using AI tools by Q4 2026",
            ]}
          />
        </div>
        <div style={{ ...fadeUp(0.55), marginTop: 20, background: `linear-gradient(90deg, ${C.blue}08, ${C.blue}15, ${C.blue}08)`, borderRadius: 10, padding: "14px 20px", textAlign: "center" }}>
          <span style={{ fontSize: 13, color: C.textSecondary }}>Each pillar feeds the others. Automation frees capacity for intelligence work. Intelligence identifies where fluency is needed. Fluency accelerates adoption of automation. </span>
          <span style={{ fontSize: 13, color: C.blueOnBlack, fontWeight: 700 }}>This is a flywheel, not a checklist.</span>
        </div>
      </div>
    </div>
  );
}

function ProofSlide() {
  const proofs = [
    { name: "Engagement Dashboard", desc: "Real-time Gallup Q12 analytics. 6 tabs. 97% survey participation. Deployed on Render. Replaced quarterly static PDF with living intelligence.", status: "Live", accent: "#22C55E" },
    { name: "#ask-people-team Bot", desc: "n8n + Claude Sonnet routing bot. Auto-classifies questions and routes to the right owner. V2 adds self-training loop.", status: "Live", accent: "#22C55E" },
    { name: "PBP Coaching Framework", desc: "Interactive tool for HRBPs to facilitate structured leader conversations around engagement data. Deployed on Vercel.", status: "Live", accent: "#22C55E" },
    { name: "Comp Verification Engine", desc: "Automated matching of hiring requests to Radford codes, salary ranges, bonus targets, and exempt status.", status: "Prototype", accent: C.yellow },
    { name: "Merit Cycle App", desc: "React app with role-based views (XLT/ELT/Admin) for managing annual merit decisions. Replaced 14-tab spreadsheet.", status: "Prototype", accent: C.yellow },
    { name: "Manager Action Framework", desc: "Interactive HTML covering all 12 Q12 items with specific action recommendations per engagement driver.", status: "Live", accent: "#22C55E" },
  ];
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="50%" left="80%" size={300} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Credibility</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>We're Not Pitching. We've Already Built.</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 28 }}>
          These aren't concepts on a slide. They're live tools teammates and leaders use today — built by Talent Operations as proof-of-concept for what AI-enabled People Team operations look like.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {proofs.map((p, i) => (
            <div key={i} style={{
              ...fadeUp(0.2 + i * 0.08),
              background: C.card, borderRadius: 12, padding: "20px 18px",
              border: `1px solid ${p.accent}18`, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 12, right: 12, background: p.accent + "18", color: p.accent, fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.status}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary, marginBottom: 8, paddingRight: 60 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ ...fadeUp(0.7), marginTop: 18, padding: "14px 20px", background: `${C.blue}08`, borderRadius: 10, border: `1px solid ${C.blue}15`, textAlign: "center" }}>
          <span style={{ fontSize: 13, color: C.textSecondary }}>Total investment so far: </span>
          <span style={{ fontSize: 13, color: C.blueOnBlack, fontWeight: 800 }}>~$0 in external tooling. </span>
          <span style={{ fontSize: 13, color: C.textSecondary }}>Built with AI, open-source frameworks, and existing platform licenses.</span>
        </div>
      </div>
    </div>
  );
}

function RoadmapSlide() {
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="30%" left="-5%" size={350} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Implementation</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>12-Month Roadmap</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>
          Click each phase to expand. We sequence quick wins first to build organizational trust, then scale.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <PhaseCard phase={1} title="Foundation & Quick Wins" quarter="Q2 2026 (Now → June)" active={true} delay={0.2} items={[
            "AI usage policy published to People Hub — what's approved, what's not, use case examples",
            "Formalize existing tools: Engagement Dashboard, #ask-people-team bot, PBP Framework",
            "Launch 'AI at DAT' page on People Hub — approved tools, training resources, success stories",
            "Pilot Slack-native Q&A bot self-training loop (V2) with weekly prompt refinement",
            "First cross-functional AI sprint: pick one impossible task, resource a small team, 6-week timebox",
            "Milestone: 3 visible wins celebrated at All Hands. Trust established.",
          ]} />
          <PhaseCard phase={2} title="Scale & Integrate" quarter="Q3 2026 (July → September)" delay={0.35} items={[
            "Comp verification engine live — automated Radford matching for all new hire requests",
            "Workforce intelligence dashboard V2 — real-time headcount, retention, hiring velocity for ELT",
            "AI fluency training program launched: tiered (Foundations → Practitioner → Builder)",
            "Automated onboarding flows for all 6 locations — consistent One DAT experience",
            "Recognition platform evaluation completed with AI-generated insight layer",
            "Milestone: 50% of repetitive People Ops processes automated. Training at scale.",
          ]} />
          <PhaseCard phase={3} title="Optimize & Extend" quarter="Q4 2026 (October → December)" delay={0.5} items={[
            "Predictive retention modeling live — flight risk signals surfaced to managers proactively",
            "Skills inventory and capability mapping across all locations and post-acquisition populations",
            "Manager AI toolkit — structured prompts for coaching, performance writing, team analysis",
            "People data integrated with Finance forecasting for workforce planning",
            "AI transformation playbook published — template for every function to adopt",
            "Milestone: 75% automation target. AI fluency embedded. Model exported to other functions.",
          ]} />
        </div>
      </div>
    </div>
  );
}

function FluencySlide() {
  const tiers = [
    { level: "Foundations", who: "All 700 teammates", hours: "2–4 hrs", color: C.blue, items: ["What AI can and can't do", "Approved tools at DAT", "Basic prompting skills", "Data privacy essentials"] },
    { level: "Practitioner", who: "Managers + ICs in knowledge roles", hours: "8–12 hrs", color: C.yellow, items: ["Advanced prompting & workflows", "AI-assisted writing, analysis, code", "Building personal automations", "Evaluating AI outputs critically"] },
    { level: "Builder", who: "Power users + Talent Ops", hours: "20+ hrs", color: "#22C55E", items: ["Prototyping tools and workflows", "n8n / automation platforms", "Data pipeline + dashboard creation", "Teaching others — internal multiplier"] },
  ];
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="10%" left="60%" size={350} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Capability Building</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>AI Fluency Program</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 8 }}>
          Ethan Mollick said it clearly: the expertise of how to use AI is already in your teams. The locus of innovation has to be inside the organization. Our program builds on that principle — meet people where they are, develop fluency through practice not slides.
        </p>
        <p style={{ ...fadeUp(0.2), fontSize: 13, color: C.yellow, fontWeight: 600, marginBottom: 28 }}>
          "The apprenticeship model broke last summer. It's on us to rebuild it." — Ethan Mollick, Unleash 2026
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              ...fadeUp(0.25 + i * 0.1),
              background: C.card, borderRadius: 14, padding: "24px 20px",
              border: `1px solid ${t.color}20`, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.color}, transparent)` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: t.color }}>{t.level}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{t.who}</div>
                </div>
                <div style={{ background: t.color + "15", color: t.color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6 }}>{t.hours}</div>
              </div>
              {t.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 5, paddingLeft: 14, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: t.color, fontSize: 10, top: 3 }}>●</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ ...fadeUp(0.6), marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { label: "Delivery Method", value: "Hands-on workshops + async practice. Not slide decks." },
            { label: "Reinforcement", value: "AI tip of the week in Slack. Monthly use case showcases." },
            { label: "Measurement", value: "Quarterly AI fluency pulse. Track tool adoption rates." },
          ].map((item, i) => (
            <div key={i} style={{ background: `${C.blue}08`, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.blue}12` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
              <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GovernanceSlide() {
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="50%" left="20%" size={300} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Responsible AI</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Governance & Trust</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
          Speed without trust is reckless. We build fast and responsibly. The AI usage policy is the foundation — clear guardrails that enable experimentation without exposing the organization to unnecessary risk.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 20 }}>
          <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: "24px 22px", border: `1px solid ${C.blue}18` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, marginBottom: 14 }}>AI Usage Policy — Core Principles</div>
            {[
              "No proprietary or teammate data entered into public AI tools",
              "All AI outputs reviewed by a human before external use",
              "Approved tool list maintained on People Hub (Claude, Copilot, DAT-specific)",
              "Bias testing required before any AI tool touches hiring or promotion decisions",
              "Transparent with teammates about where and how AI is used in People processes",
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: C.blue }}>◆</span>{item}
              </div>
            ))}
          </div>
          <div style={{ ...fadeUp(0.3), background: C.card, borderRadius: 14, padding: "24px 22px", border: `1px solid ${C.yellow}18` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, marginBottom: 14 }}>Roper Alignment</div>
            {[
              "Align with Roper IT security and data classification requirements",
              "Work with Legal on AI-specific terms in vendor contracts",
              "Coordinate with IT on approved integrations (UKG, Greenhouse, 15Five)",
              "Lobby for expanded UKG module access — onboarding, integrations, reporting",
              "Document all AI tools in use for audit readiness",
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: C.yellow }}>◆</span>{item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...fadeUp(0.4), background: `linear-gradient(135deg, ${C.red}08, transparent)`, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.red}18`, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 28 }}>⚠️</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>The UKG Bottleneck</div>
            <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5, marginTop: 2 }}>
              UKG confirmed at Unleash that every capability we want already exists on the platform. The constraint is Roper-side administration and access controls. Nat is building stronger lines of communication. This is a known dependency — not a technology gap.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricsSlide() {
  const barData = [
    { name: "Process\nAutomation", current: 20, target: 75 },
    { name: "Self-Service\nAdoption", current: 35, target: 80 },
    { name: "AI Fluency\nRate", current: 15, target: 75 },
    { name: "Dashboard\nCoverage", current: 40, target: 90 },
    { name: "HRBP Admin\nReduction", current: 10, target: 40 },
  ];
  return (
    <div style={{ position: "relative" }}>
      <DotGrid />
      <GlowOrb top="-5%" left="40%" size={350} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>Measurement</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 36, fontWeight: 900, color: C.white, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>How We'll Know It's Working</h2>
        <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 28 }}>
          We measure outcomes, not activity. Every metric maps to a business impact that leadership cares about.
        </p>
        <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: "24px 28px", border: `1px solid ${C.blue}15`, marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textSecondary, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>Current State → EOY 2026 Target</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barGap={4}>
              <XAxis dataKey="name" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.blue}33`, borderRadius: 8, fontSize: 12, color: C.textPrimary }} formatter={(v) => [`${v}%`]} />
              <Bar dataKey="current" name="Current" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {barData.map((_, i) => <Cell key={i} fill={C.greyDark} />)}
              </Bar>
              <Bar dataKey="target" name="EOY Target" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {barData.map((_, i) => <Cell key={i} fill={C.blue} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.greyDark, borderRadius: 3 }} /><span style={{ fontSize: 11, color: C.textMuted }}>Current</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.blue, borderRadius: 3 }} /><span style={{ fontSize: 11, color: C.textMuted }}>EOY 2026 Target</span></div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          <StatCard value="30%" label="reduction in People Team ticket volume via self-service" delay={0.3} accent={C.blue} />
          <StatCard value="$0" label="external tooling cost — built with AI + existing licenses" delay={0.4} accent="#22C55E" />
          <StatCard value="1→N" label="every tool built becomes a template for other functions" delay={0.5} accent={C.yellow} />
        </div>
      </div>
    </div>
  );
}

function CloseSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100%", textAlign: "center", position: "relative" }}>
      <DotGrid />
      <GlowOrb top="20%" left="25%" size={450} />
      <GlowOrb top="50%" left="65%" size={300} color="rgba(0,70,221,0.12)" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
        <div style={{ ...fadeUp(0), fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.blue, marginBottom: 20 }}>The Ask</div>
        <h2 style={{ ...fadeUp(0.1), fontSize: 42, fontWeight: 900, color: C.white, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 16px 0" }}>
          We don't need permission<br />to keep building.
        </h2>
        <h2 style={{ ...fadeUp(0.2), fontSize: 42, fontWeight: 900, color: C.blueOnBlack, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 24px 0" }}>
          We need alignment.
        </h2>
        <p style={{ ...fadeUp(0.35), fontSize: 15, color: C.textSecondary, lineHeight: 1.8, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px auto" }}>
          The People Team is ready to lead DAT's AI transformation — not as a side project, but as the operational backbone of the One DAT mission. We've proven the model works. Now we need executive sponsorship, cross-functional partnership, and the organizational will to make AI fluency everyone's job.
        </p>
        <div style={{ ...fadeUp(0.5), display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { ask: "Executive Sponsorship", detail: "Jeff + Jana champion AI fluency publicly. Set the tone from the top." },
            { ask: "Cross-Functional Access", detail: "Roper IT partnership. UKG module access. Data governance framework." },
            { ask: "Organizational Will", detail: "AI fluency as a performance expectation. Experiment fast, learn publicly." },
          ].map((item, i) => (
            <div key={i} style={{ background: C.card, borderRadius: 12, padding: "20px 18px", border: `1px solid ${C.blue}20`, textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.blueOnBlack, marginBottom: 8 }}>{item.ask}</div>
              <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{item.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ ...fadeUp(0.65), padding: "18px 28px", background: `linear-gradient(135deg, ${C.blue}15, ${C.blue}08)`, borderRadius: 12, border: `1px solid ${C.blue}25` }}>
          <div style={{ fontSize: 15, color: C.white, fontWeight: 700, lineHeight: 1.5 }}>
            "The most successful teams I see implementing AI are when you give a small cross-functional team an impossible task and see how hard they get."
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>— Ethan Mollick, Wharton · Unleash America 2026</div>
        </div>
        <div style={{ ...fadeUp(0.8), marginTop: 32, fontSize: 12, color: C.textMuted }}>
          DAT Freight & Analytics · People Team · Talent Operations · Confidential
        </div>
      </div>
    </div>
  );
}

// ── Main App ──

const slideComponents = {
  "title": TitleSlide,
  "why-now": WhyNowSlide,
  "one-dat": OneDATSlide,
  "landscape": LandscapeSlide,
  "framework": FrameworkSlide,
  "proof": ProofSlide,
  "roadmap": RoadmapSlide,
  "fluency": FluencySlide,
  "governance": GovernanceSlide,
  "metrics": MetricsSlide,
  "close": CloseSlide,
};

export default function DATAITransformation() {
  const [current, setCurrent] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const containerRef = useRef(null);

  const goTo = (idx) => {
    if (idx >= 0 && idx < slides.length) {
      setCurrent(idx);
      setSlideKey(k => k + 1);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  const SlideComponent = slideComponents[slides[current].id];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: C.bg, color: C.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{keyframes}</style>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ── Top Nav ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: `1px solid ${C.greyDark}22`, flexShrink: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: C.blue, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: C.white }}>D</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.textSecondary }}>AI Transformation Strategy</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 600 }}>{current + 1} / {slides.length}</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* ── Sidebar ── */}
        <div style={{ width: 200, borderRight: `1px solid ${C.greyDark}22`, padding: "16px 0", overflowY: "auto", flexShrink: 0, background: C.bg }}>
          {slides.map((s, i) => (
            <div
              key={s.id}
              onClick={() => goTo(i)}
              style={{
                padding: "9px 20px",
                fontSize: 13,
                fontWeight: i === current ? 700 : 500,
                color: i === current ? C.blueOnBlack : C.textMuted,
                background: i === current ? C.blueMuted : "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                borderLeft: i === current ? `3px solid ${C.blue}` : "3px solid transparent",
              }}
            >
              <span style={{ opacity: 0.5, marginRight: 8, fontSize: 11 }}>{String(i + 1).padStart(2, "0")}</span>
              {s.label}
            </div>
          ))}
        </div>

        {/* ── Slide Content ── */}
        <div ref={containerRef} style={{ flex: 1, overflowY: "auto", padding: "32px 40px 48px 40px" }}>
          <div key={slideKey} style={{ maxWidth: 1000, margin: "0 auto", animation: "scaleIn 0.35s ease-out forwards" }}>
            <SlideComponent />
          </div>
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", borderTop: `1px solid ${C.greyDark}22`, flexShrink: 0, background: C.bg }}>
        <button onClick={() => goTo(current - 1)} disabled={current === 0} style={{
          padding: "7px 18px", borderRadius: 8, border: `1px solid ${C.greyDark}44`, background: "transparent",
          color: current === 0 ? C.textMuted : C.textSecondary, fontSize: 13, fontWeight: 600, cursor: current === 0 ? "default" : "pointer",
          opacity: current === 0 ? 0.4 : 1, transition: "all 0.2s",
        }}>← Previous</button>
        <div style={{ display: "flex", gap: 4 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{
              width: i === current ? 24 : 8, height: 4, borderRadius: 2,
              background: i === current ? C.blue : C.greyDark + "55",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
        <button onClick={() => goTo(current + 1)} disabled={current === slides.length - 1} style={{
          padding: "7px 18px", borderRadius: 8, border: "none", background: current === slides.length - 1 ? C.greyDark + "33" : C.blue,
          color: C.white, fontSize: 13, fontWeight: 600, cursor: current === slides.length - 1 ? "default" : "pointer",
          opacity: current === slides.length - 1 ? 0.4 : 1, transition: "all 0.2s",
        }}>Next →</button>
      </div>
    </div>
  );
}
