import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area,
} from "recharts";
import {
  Zap, BarChart3, Brain, Bot, Target, Shield, ChevronRight, ChevronDown,
  ArrowRight, Play, Minimize2, Clock, CheckCircle2, Wrench,
  TrendingUp, Users, Building2, Layers, AlertTriangle, Sparkles, GitBranch,
  ChevronLeft, Monitor, BookOpen
} from "lucide-react";

// ── DAT Brand Tokens — Light Mode ──
const C = {
  blue: "#0046DD",
  blueLight: "#E8EEFF",
  blueMuted: "rgba(0,70,221,0.08)",
  black: "#000000",
  white: "#FFFFFF",
  bg: "#F8F9FA",
  bgAlt: "#F0F2F5",
  card: "#FFFFFF",
  border: "#E2E5EA",
  borderLight: "#ECEEF1",
  grey: "#8A8D8F",
  greyMed: "#6E6B68",
  greyDark: "#565657",
  red: "#E10600",
  yellow: "#FFD700",
  yellowDark: "#C7A500",
  green: "#059669",
  greenLight: "#ECFDF5",
  textPrimary: "#111827",
  textSecondary: "#4B5563",
  textMuted: "#9CA3AF",
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
  transform: "translateY(20px)",
  animation: `fadeUp 0.5s ease-out ${delay}s forwards`,
});

const keyframes = `
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

// ── Animated Counter ──
function AnimatedNumber({ value, suffix = "", prefix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(value) || 0;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 1200, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(num * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ── Components ──

function SectionLabel({ children, delay = 0 }) {
  return (
    <div style={{
      ...fadeUp(delay), display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
      color: C.blue, marginBottom: 8,
    }}>
      <div style={{ width: 16, height: 2, background: C.blue, borderRadius: 1 }} />
      {children}
    </div>
  );
}

function StatCard({ value, suffix = "", prefix = "", label, delay = 0, accent = C.blue, icon: Icon }) {
  const [hovered, setHovered] = useState(false);
  const accentBg = accent === C.blue ? C.blueLight : accent === C.green ? C.greenLight : accent === C.red ? "#FEF2F2" : "#FFFBEB";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...fadeUp(delay), background: C.card,
        border: `1px solid ${hovered ? accent + "44" : C.border}`,
        borderRadius: 12, padding: "24px 20px", textAlign: "center",
        transition: "all 0.25s ease", position: "relative", overflow: "hidden",
        boxShadow: hovered ? `0 4px 20px ${accent}15` : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accent, borderRadius: "12px 12px 0 0",
        transform: hovered ? "scaleX(1)" : "scaleX(0.3)", transition: "transform 0.4s ease",
      }} />
      {Icon && (
        <div style={{ width: 36, height: 36, borderRadius: 8, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <Icon size={18} color={accent} />
        </div>
      )}
      <div style={{ fontSize: 36, fontWeight: 900, color: accent, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        <AnimatedNumber value={parseInt(String(value).replace(/\D/g, ""))} suffix={suffix} prefix={prefix} />
      </div>
      <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 8, lineHeight: 1.4, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function PillarCard({ icon: Icon, title, items, delay = 0, accent = C.blue, tagline }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const accentBg = accent === C.blue ? C.blueLight : accent === "#C7A500" ? "#FFFBEB" : "#ECFDF5";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        ...fadeUp(delay), background: C.card,
        border: `1px solid ${hovered || expanded ? accent + "44" : C.border}`,
        borderRadius: 14, padding: "24px 22px", transition: "all 0.3s ease",
        cursor: "pointer", position: "relative", overflow: "hidden",
        boxShadow: hovered ? `0 6px 24px ${accent}12` : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}44)` }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: expanded ? 16 : 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={20} color={accent} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.textPrimary }}>{title}</div>
        </div>
        <div style={{ color: C.textMuted, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
          <ChevronDown size={18} />
        </div>
      </div>
      {tagline && !expanded && <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5, marginBottom: 4 }}>{tagline}</div>}
      {expanded && (
        <div style={{ paddingTop: 4, borderTop: `1px solid ${C.borderLight}` }}>
          {items.map((item, i) => (
            <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 6, paddingLeft: 16, position: "relative", opacity: 0, animation: `slideIn 0.35s ease-out ${i * 0.06}s forwards` }}>
              <span style={{ position: "absolute", left: 0, color: accent }}><ChevronRight size={12} style={{ marginTop: 4 }} /></span>
              {item}
            </div>
          ))}
        </div>
      )}
      {!expanded && (
        <div style={{ fontSize: 11, color: accent, fontWeight: 600, marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
          Click to expand <ChevronRight size={12} />
        </div>
      )}
    </div>
  );
}

function PhaseCard({ phase, title, quarter, items, delay = 0, active = false }) {
  const [expanded, setExpanded] = useState(active);
  const accent = phase === 1 ? C.blue : phase === 2 ? C.yellowDark : C.green;
  const accentBg = phase === 1 ? C.blueLight : phase === 2 ? "#FFFBEB" : C.greenLight;
  const PhaseIcon = phase === 1 ? Wrench : phase === 2 ? Layers : Target;
  return (
    <div style={{ ...fadeUp(delay) }}>
      <div
        data-clickable="true"
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        style={{
          background: C.card, border: `1px solid ${expanded ? accent + "44" : C.border}`,
          borderRadius: 14, padding: "20px 24px", cursor: "pointer", transition: "all 0.3s ease",
          boxShadow: expanded ? `0 4px 16px ${accent}10` : "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expanded ? 16 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PhaseIcon size={20} color={accent} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary }}>{title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={12} /> {quarter}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: accentBg, color: accent, fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>Phase {phase}</div>
            <div style={{ color: C.textMuted, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
        {expanded && (
          <div style={{ paddingTop: 12, borderTop: `1px solid ${C.borderLight}` }}>
            {items.map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8, paddingLeft: 20, position: "relative", opacity: 0, animation: `slideIn 0.35s ease-out ${i * 0.06}s forwards` }}>
                <span style={{ position: "absolute", left: 0, top: 2, color: accent }}>
                  {i === items.length - 1 ? <CheckCircle2 size={14} /> : <ArrowRight size={14} />}
                </span>
                <span style={{ fontWeight: i === items.length - 1 ? 600 : 400 }}>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ToggleCard({ left, right, delay = 0 }) {
  const [showRight, setShowRight] = useState(false);
  return (
    <div style={{ ...fadeUp(delay) }}>
      <div style={{ display: "flex", marginBottom: 16, background: C.bgAlt, borderRadius: 10, padding: 3 }}>
        <button onClick={() => setShowRight(false)} style={{
          flex: 1, padding: "10px 16px", borderRadius: 8, border: "none",
          background: !showRight ? C.card : "transparent", color: !showRight ? C.red : C.textMuted,
          fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: !showRight ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.25s", fontFamily: "'Inter', system-ui",
        }}>{left.title}</button>
        <button onClick={() => setShowRight(true)} style={{
          flex: 1, padding: "10px 16px", borderRadius: 8, border: "none",
          background: showRight ? C.card : "transparent", color: showRight ? C.green : C.textMuted,
          fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: showRight ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.25s", fontFamily: "'Inter', system-ui",
        }}>{right.title}</button>
      </div>
      <div style={{ background: C.card, borderRadius: 14, padding: "24px", border: `1px solid ${showRight ? C.green + "33" : C.red + "33"}`, transition: "border-color 0.3s" }}>
        {(showRight ? right.items : left.items).map((item, i) => (
          <div key={`${showRight}-${i}`} style={{
            fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 6, paddingLeft: 20, position: "relative",
            opacity: 0, animation: `slideIn 0.3s ease-out ${i * 0.05}s forwards`,
          }}>
            <span style={{ position: "absolute", left: 0, color: showRight ? C.green : C.red, fontWeight: 700 }}>
              {showRight ? <CheckCircle2 size={14} style={{ marginTop: 3 }} /> : "✕"}
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SLIDES ──

function TitleSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100%", textAlign: "center" }}>
      <div style={{ maxWidth: 800 }}>
        <div style={{ ...fadeUp(0), display: "inline-flex", alignItems: "center", gap: 8, background: C.blueLight, padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 28 }}>
          <Building2 size={14} /> DAT Freight & Analytics · People Team
        </div>
        <h1 style={{ ...fadeUp(0.15), fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 900, color: C.textPrimary, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
          Everyone Has the<br />Same Tools.
        </h1>
        <h1 style={{ ...fadeUp(0.3), fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 900, color: C.blue, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "4px 0 0 0" }}>
          The Edge Goes to<br />Whoever Builds Fastest.
        </h1>
        <p style={{ ...fadeUp(0.5), fontSize: 16, color: C.textSecondary, marginTop: 28, lineHeight: 1.7, maxWidth: 560, margin: "28px auto 0" }}>
          How DAT is building AI fluency, redesigning work, and accelerating the One DAT mission across every function, location, and team.
        </p>
        <div style={{ ...fadeUp(0.7), display: "flex", gap: 12, justifyContent: "center", marginTop: 36 }}>
          <div style={{ padding: "10px 20px", background: C.blue, borderRadius: 8, fontSize: 13, fontWeight: 700, color: C.white, display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={14} /> Presented by Talent Operations
          </div>
          <div style={{ padding: "10px 20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: C.textSecondary, display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={14} /> March 2026
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyNowSlide() {
  const data = [
    { year: "2022", value: 12 }, { year: "2023", value: 28 }, { year: "2024", value: 55 }, { year: "2025", value: 78 }, { year: "2026", value: 95 },
  ];
  return (
    <div>
      <SectionLabel>The Burning Platform</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Why Now. Why Us.</h2>
      <p style={{ ...fadeUp(0.2), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 28 }}>
        AI adoption in the People function has gone from experimental to existential. The organizations that build fluency first don't just keep pace — they define the new standard.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        <StatCard value="39" suffix="%" label="of core skills expected to change by 2030" delay={0.2} icon={TrendingUp} />
        <StatCard value="78" suffix="%" label="of companies have deployed AI in at least one function" delay={0.3} accent={C.yellowDark} icon={Building2} />
        <StatCard value="95" suffix="%" label="of AI pilots fail to move beyond prototype" delay={0.4} accent={C.red} icon={AlertTriangle} />
        <StatCard value="120" suffix="+" label="hours per teammate per year freed by AI" delay={0.5} accent={C.green} icon={Clock} />
      </div>
      <div style={{ ...fadeUp(0.6), background: C.card, borderRadius: 14, padding: "24px 28px", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Enterprise AI Adoption Curve — People Function</div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.blue} stopOpacity={0.15} />
                <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" tick={{ fill: C.textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.textPrimary, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} formatter={(v) => [`${v}% adoption`, "AI Maturity"]} />
            <Area type="monotone" dataKey="value" stroke={C.blue} strokeWidth={2.5} fill="url(#blueGrad)" dot={{ fill: C.blue, stroke: C.white, strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: C.blue, stroke: C.white, strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>Sources: Gartner CHRO Survey 2026, Deloitte Global Human Capital Trends, AIHR Priorities Report</div>
      </div>
    </div>
  );
}

function OneDATSlide() {
  return (
    <div>
      <SectionLabel>Strategic Anchor</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>One DAT. One Capability.</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 24 }}>
        Four acquisitions. Six offices. 700 teammates. The One DAT mission is about building a single, unified culture and operating system. AI transformation is the engine that makes One DAT real.
      </p>
      <ToggleCard delay={0.2} left={{ title: "Without AI Fluency", items: ["Siloed processes from 4 legacy orgs", "Manual work that doesn't scale", "Knowledge trapped in individual heads", "Six offices, six different ways of working", "Slow decision cycles on workforce data"] }} right={{ title: "With AI Fluency", items: ["Unified processes powered by shared AI tools", "Automation that scales across all locations", "Institutional knowledge embedded in systems", "Consistent experience: Seattle = Denver = Bangalore", "Real-time workforce intelligence for leadership"] }} />
      <div style={{ ...fadeUp(0.45), marginTop: 20, background: C.blueLight, borderRadius: 12, padding: "18px 22px", border: `1px solid ${C.blue}20`, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: C.blue + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Zap size={22} color={C.blue} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.blue }}>The Multiplier Effect</div>
          <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginTop: 2 }}>
            Every AI capability we build in People Team becomes a template for every other function. We're not just transforming the People function — we're establishing the operating pattern for how DAT adopts AI company-wide.
          </div>
        </div>
      </div>
    </div>
  );
}

function LandscapeSlide() {
  const [activeInsight, setActiveInsight] = useState(0);
  const radarData = [
    { subject: "Self-Service", DAT: 65, Industry: 45 }, { subject: "Predictive Analytics", DAT: 55, Industry: 35 },
    { subject: "Process Automation", DAT: 70, Industry: 50 }, { subject: "AI Routing & Triage", DAT: 75, Industry: 25 },
    { subject: "Workforce Intelligence", DAT: 60, Industry: 40 }, { subject: "Teammate Experience", DAT: 50, Industry: 45 },
  ];
  const insights = [
    { source: "Gartner", insight: "Shape work in the human-machine era. Mobilize leaders to make change routine.", color: C.blue },
    { source: "Deloitte", insight: "The S-curve is compressing. Organizations must leap to the next curve faster to stay competitive.", color: C.yellowDark },
    { source: "Josh Bersin", insight: "2026 marks the shift from record-keeping to agentic action. The People function is becoming 'full-stack.'", color: C.green },
    { source: "Ethan Mollick", insight: "Nobody knows anything — including the labs. The people in this room get to decide what this looks like.", color: C.blue },
  ];
  return (
    <div>
      <SectionLabel>Industry Context</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Where We Stand</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 24 }}>
        Gartner, Deloitte, and Bersin all converge: 2026 is when the People function moves from AI experimentation to AI-as-infrastructure. Only 21% of CHROs are closely involved in AI strategy. DAT's People Team is already building.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>DAT vs. Industry AI Maturity</div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={C.border} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: C.textMuted, fontSize: 10 }} />
              <PolarRadiusAxis tick={false} domain={[0, 100]} axisLine={false} />
              <Radar name="DAT" dataKey="DAT" stroke={C.blue} fill={C.blue} fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Industry Avg" dataKey="Industry" stroke={C.grey} fill={C.grey} fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 4" />
              <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.textPrimary }} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 3, background: C.blue, borderRadius: 2 }} /><span style={{ fontSize: 11, color: C.textMuted }}>DAT Today</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 3, background: C.grey, borderRadius: 2 }} /><span style={{ fontSize: 11, color: C.textMuted }}>Industry Avg</span></div>
          </div>
        </div>
        <div style={{ ...fadeUp(0.3), display: "flex", flexDirection: "column", gap: 10 }}>
          {insights.map((item, i) => (
            <div key={i} onClick={() => setActiveInsight(i)} style={{
              background: i === activeInsight ? item.color + "08" : C.card, borderRadius: 10, padding: "14px 18px",
              border: `1px solid ${i === activeInsight ? item.color + "33" : C.border}`, borderLeft: `3px solid ${item.color}`,
              cursor: "pointer", transition: "all 0.25s", boxShadow: i === activeInsight ? `0 2px 8px ${item.color}10` : "none",
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.source}</div>
              <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5, maxHeight: i === activeInsight ? 100 : 20, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                {item.insight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FrameworkSlide() {
  return (
    <div>
      <SectionLabel>Strategic Framework</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Three Pillars of AI Transformation</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 24 }}>
        Every initiative maps to one of three pillars — each directly connected to how we accelerate the One DAT mission. Click any pillar to see the details.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <PillarCard icon={Bot} title="Automate the Yester-Work" delay={0.2} accent={C.blue} tagline="Eliminate manual processes designed for a pre-AI world" items={["AI-powered self-service for 80% of common teammate questions", "Intelligent routing via #ask-people-team Slack bot", "Automated comp verification, offer generation, onboarding flows", "Target: 75% of repetitive People Ops work automated by EOY"]} />
        <PillarCard icon={BarChart3} title="Build Workforce Intelligence" delay={0.3} accent={C.yellowDark} tagline="Real-time dashboards replacing quarterly static reports" items={["Predictive retention and engagement modeling", "Skills inventory and capability mapping across all 6 locations", "Workforce planning integrated with Finance forecasting", "Target: People data rivals financial data in strategic importance"]} />
        <PillarCard icon={Brain} title="Develop AI Fluency" delay={0.4} accent={C.green} tagline="Every teammate confident using AI in their daily work" items={["Rebuild the apprenticeship model for an AI-augmented world", "Leader training: manage AI-augmented teams, not just people", "Cross-functional 'impossible task' teams to drive experimentation", "Target: 75% of teammates actively using AI tools by Q4 2026"]} />
      </div>
      <div style={{ ...fadeUp(0.55), marginTop: 18, background: C.card, borderRadius: 12, padding: "16px 22px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "spinSlow 12s linear infinite" }}>
          <GitBranch size={16} color={C.blue} />
        </div>
        <div>
          <span style={{ fontSize: 13, color: C.textSecondary }}>Each pillar feeds the others. Automation frees capacity for intelligence work. Intelligence identifies where fluency is needed. Fluency accelerates automation. </span>
          <span style={{ fontSize: 13, color: C.blue, fontWeight: 700 }}>This is a flywheel, not a checklist.</span>
        </div>
      </div>
    </div>
  );
}

function ProofSlide() {
  const [filter, setFilter] = useState("all");
  const proofs = [
    { name: "Engagement Dashboard", desc: "Real-time Gallup Q12 analytics. 6 tabs. 97% survey participation. Deployed on Render.", status: "Live", accent: C.green, icon: BarChart3 },
    { name: "#ask-people-team Bot", desc: "n8n + Claude Sonnet routing bot. Auto-classifies questions and routes to the right owner.", status: "Live", accent: C.green, icon: Bot },
    { name: "PBP Coaching Framework", desc: "Interactive tool for HRBPs to facilitate structured leader conversations around engagement data.", status: "Live", accent: C.green, icon: Users },
    { name: "Comp Verification Engine", desc: "Automated matching of hiring requests to Radford codes, salary ranges, bonus targets, and exempt status.", status: "Prototype", accent: C.yellowDark, icon: Target },
    { name: "Merit Cycle App", desc: "React app with role-based views (XLT/ELT/Admin) for managing annual merit decisions.", status: "Prototype", accent: C.yellowDark, icon: Monitor },
    { name: "Manager Action Framework", desc: "Interactive HTML covering all 12 Q12 items with specific action recommendations per engagement driver.", status: "Live", accent: C.green, icon: BookOpen },
  ];
  const filtered = filter === "all" ? proofs : proofs.filter(p => p.status.toLowerCase() === filter);
  return (
    <div>
      <SectionLabel>Credibility</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>We're Not Pitching. We've Already Built.</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 20 }}>
        These aren't concepts on a slide. They're live tools teammates and leaders use today — built by Talent Operations as proof of what AI-enabled People Team operations look like.
      </p>
      <div style={{ ...fadeUp(0.2), display: "flex", gap: 8, marginBottom: 18 }}>
        {["all", "live", "prototype"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "6px 16px", borderRadius: 20, border: "none",
            background: filter === f ? C.blue : C.bgAlt, color: filter === f ? C.white : C.textMuted,
            fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "'Inter', system-ui", textTransform: "capitalize",
          }}>{f === "all" ? `All (${proofs.length})` : `${f} (${proofs.filter(p => p.status.toLowerCase() === f).length})`}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {filtered.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.name} style={{ ...fadeUp(0.2 + i * 0.06), background: C.card, borderRadius: 12, padding: "20px 18px", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ position: "absolute", top: 12, right: 12, background: p.accent === C.green ? C.greenLight : "#FFFBEB", color: p.accent, fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 12, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 3 }}>
                {p.status === "Live" ? <CheckCircle2 size={10} /> : <Clock size={10} />}{p.status}
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: p.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon size={18} color={p.accent} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary, marginBottom: 6, paddingRight: 60 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          );
        })}
      </div>
      <div style={{ ...fadeUp(0.6), marginTop: 16, padding: "14px 20px", background: C.greenLight, borderRadius: 10, border: `1px solid ${C.green}20`, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Sparkles size={16} color={C.green} />
        <span style={{ fontSize: 13, color: C.textSecondary }}>Total investment: </span>
        <span style={{ fontSize: 13, color: C.green, fontWeight: 800 }}>~$0 in external tooling. </span>
        <span style={{ fontSize: 13, color: C.textSecondary }}>Built with AI, open-source frameworks, and existing licenses.</span>
      </div>
    </div>
  );
}

function RoadmapSlide() {
  return (
    <div>
      <SectionLabel>Implementation</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>12-Month Roadmap</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 20 }}>
        Click each phase to expand. We sequence quick wins first to build organizational trust, then scale.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PhaseCard phase={1} title="Foundation & Quick Wins" quarter="Q2 2026 (Now → June)" active={true} delay={0.2} items={["AI usage policy published to People Hub — what's approved, what's not, use case examples", "Formalize existing tools: Engagement Dashboard, #ask-people-team bot, PBP Framework", "Launch 'AI at DAT' page on People Hub — approved tools, training resources, success stories", "Pilot Slack-native Q&A bot self-training loop (V2) with weekly prompt refinement", "First cross-functional AI sprint: pick one impossible task, resource a small team, 6-week timebox", "Milestone: 3 visible wins celebrated at All Hands. Trust established."]} />
        <PhaseCard phase={2} title="Scale & Integrate" quarter="Q3 2026 (July → September)" delay={0.35} items={["Comp verification engine live — automated Radford matching for all new hire requests", "Workforce intelligence dashboard V2 — real-time headcount, retention, hiring velocity for ELT", "AI fluency training program launched: tiered (Foundations → Practitioner → Builder)", "Automated onboarding flows for all 6 locations — consistent One DAT experience", "Recognition platform evaluation completed with AI-generated insight layer", "Milestone: 50% of repetitive People Ops processes automated. Training at scale."]} />
        <PhaseCard phase={3} title="Optimize & Extend" quarter="Q4 2026 (October → December)" delay={0.5} items={["Predictive retention modeling live — flight risk signals surfaced to managers proactively", "Skills inventory and capability mapping across all locations and post-acquisition populations", "Manager AI toolkit — structured prompts for coaching, performance writing, team analysis", "People data integrated with Finance forecasting for workforce planning", "AI transformation playbook published — template for every function to adopt", "Milestone: 75% automation target. AI fluency embedded. Model exported to other functions."]} />
      </div>
    </div>
  );
}

function FluencySlide() {
  const [activeTier, setActiveTier] = useState(0);
  const tiers = [
    { level: "Foundations", who: "All 700 teammates", hours: "2-4 hrs", color: C.blue, icon: Users, items: ["What AI can and can't do", "Approved tools at DAT", "Basic prompting skills", "Data privacy essentials"] },
    { level: "Practitioner", who: "Managers + ICs in knowledge roles", hours: "8-12 hrs", color: C.yellowDark, icon: Wrench, items: ["Advanced prompting & workflows", "AI-assisted writing, analysis, code", "Building personal automations", "Evaluating AI outputs critically"] },
    { level: "Builder", who: "Power users + Talent Ops", hours: "20+ hrs", color: C.green, icon: Sparkles, items: ["Prototyping tools and workflows", "n8n / automation platforms", "Data pipeline + dashboard creation", "Teaching others — internal multiplier"] },
  ];
  return (
    <div>
      <SectionLabel>Capability Building</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>AI Fluency Program</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 8 }}>
        The expertise of how to use AI is already in your teams. Our program builds on that principle — meet people where they are, develop fluency through practice.
      </p>
      <div style={{ ...fadeUp(0.2), background: C.yellowDark + "08", borderRadius: 10, padding: "12px 18px", marginBottom: 24, border: `1px solid ${C.yellowDark}15`, fontSize: 13, color: C.textSecondary }}>
        <span style={{ fontWeight: 700, color: C.yellowDark }}>"The apprenticeship model broke last summer. It's on us to rebuild it."</span>
        <span style={{ color: C.textMuted }}> — Ethan Mollick, Unleash 2026</span>
      </div>
      <div style={{ ...fadeUp(0.25), display: "flex", gap: 0, marginBottom: 20, background: C.bgAlt, borderRadius: 12, padding: 3 }}>
        {tiers.map((t, i) => {
          const TierIcon = t.icon;
          return (
            <button key={i} onClick={() => setActiveTier(i)} style={{
              flex: 1, padding: "12px 16px", borderRadius: 10, border: "none",
              background: i === activeTier ? C.card : "transparent", color: i === activeTier ? t.color : C.textMuted,
              fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: i === activeTier ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.25s", fontFamily: "'Inter', system-ui", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}><TierIcon size={14} /> {t.level}</button>
          );
        })}
      </div>
      <div style={{ background: C.card, borderRadius: 14, padding: "28px 24px", border: `1px solid ${tiers[activeTier].color}25`, boxShadow: `0 2px 12px ${tiers[activeTier].color}08`, transition: "all 0.3s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: tiers[activeTier].color }}>{tiers[activeTier].level}</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{tiers[activeTier].who}</div>
          </div>
          <div style={{ background: tiers[activeTier].color + "12", color: tiers[activeTier].color, fontSize: 13, fontWeight: 700, padding: "6px 14px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={14} /> {tiers[activeTier].hours}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {tiers[activeTier].items.map((item, j) => (
            <div key={`${activeTier}-${j}`} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, padding: "10px 14px", background: C.bgAlt, borderRadius: 8, display: "flex", alignItems: "center", gap: 8, opacity: 0, animation: `slideIn 0.3s ease-out ${j * 0.06}s forwards` }}>
              <CheckCircle2 size={14} color={tiers[activeTier].color} style={{ flexShrink: 0 }} />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...fadeUp(0.5), marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { label: "Delivery", value: "Hands-on workshops + async practice", icon: Wrench },
          { label: "Reinforcement", value: "AI tip of the week. Monthly showcases.", icon: Sparkles },
          { label: "Measurement", value: "Quarterly AI fluency pulse. Adoption rates.", icon: BarChart3 },
        ].map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <div key={i} style={{ background: C.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <ItemIcon size={16} color={C.blue} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.4 }}>{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GovernanceSlide() {
  const [activeTab, setActiveTab] = useState("policy");
  return (
    <div>
      <SectionLabel>Responsible AI</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Governance & Trust</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 20 }}>
        Speed without trust is reckless. We build fast and responsibly. Clear guardrails that enable experimentation without exposing the organization to unnecessary risk.
      </p>
      <div style={{ ...fadeUp(0.2), display: "flex", gap: 0, marginBottom: 18, background: C.bgAlt, borderRadius: 10, padding: 3 }}>
        {[{ key: "policy", label: "AI Usage Policy", icon: Shield }, { key: "roper", label: "Roper Alignment", icon: Building2 }].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, padding: "10px 16px", borderRadius: 8, border: "none",
              background: activeTab === tab.key ? C.card : "transparent", color: activeTab === tab.key ? C.blue : C.textMuted,
              fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.25s", fontFamily: "'Inter', system-ui", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}><TabIcon size={14} /> {tab.label}</button>
          );
        })}
      </div>
      <div style={{ background: C.card, borderRadius: 14, padding: "24px 22px", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 18 }}>
        {activeTab === "policy" ? (
          <>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, marginBottom: 16 }}>Core Principles</div>
            {["No proprietary or teammate data entered into public AI tools", "All AI outputs reviewed by a human before external use", "Approved tool list maintained on People Hub (Claude, Copilot, DAT-specific)", "Bias testing required before any AI tool touches hiring or promotion decisions", "Transparent with teammates about where and how AI is used in People processes"].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 10, paddingLeft: 28, position: "relative", opacity: 0, animation: `slideIn 0.3s ease-out ${i * 0.06}s forwards` }}>
                <span style={{ position: "absolute", left: 0, top: 1 }}><Shield size={14} color={C.blue} /></span>{item}
              </div>
            ))}
          </>
        ) : (
          <>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, marginBottom: 16 }}>IT & Legal Coordination</div>
            {["Align with Roper IT security and data classification requirements", "Work with Legal on AI-specific terms in vendor contracts", "Coordinate with IT on approved integrations (UKG, Greenhouse, 15Five)", "Lobby for expanded UKG module access — onboarding, integrations, reporting", "Document all AI tools in use for audit readiness"].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 10, paddingLeft: 28, position: "relative", opacity: 0, animation: `slideIn 0.3s ease-out ${i * 0.06}s forwards` }}>
                <span style={{ position: "absolute", left: 0, top: 1 }}><Building2 size={14} color={C.yellowDark} /></span>{item}
              </div>
            ))}
          </>
        )}
      </div>
      <div style={{ ...fadeUp(0.4), background: C.red + "06", borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.red}15`, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <AlertTriangle size={20} color={C.red} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>The UKG Bottleneck</div>
          <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5, marginTop: 2 }}>
            UKG confirmed at Unleash that every capability we want already exists on the platform. The constraint is Roper-side administration and access controls. Nat is building stronger lines of communication. This is a known dependency — not a technology gap.
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricsSlide() {
  const barData = [
    { name: "Process Automation", current: 20, target: 75 }, { name: "Self-Service", current: 35, target: 80 },
    { name: "AI Fluency Rate", current: 15, target: 75 }, { name: "Dashboard Coverage", current: 40, target: 90 },
    { name: "HRBP Admin Reduction", current: 10, target: 40 },
  ];
  return (
    <div>
      <SectionLabel>Measurement</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>How We'll Know It's Working</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>
        We measure outcomes, not activity. Every metric maps to a business impact that leadership cares about.
      </p>
      <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: "24px 28px", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6 }}>
          <TrendingUp size={14} /> Current State → EOY 2026 Target
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} barGap={4}>
            <XAxis dataKey="name" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.textPrimary, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} formatter={(v) => [`${v}%`]} />
            <Bar dataKey="current" name="Current" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {barData.map((_, i) => <Cell key={i} fill={C.border} />)}
            </Bar>
            <Bar dataKey="target" name="EOY Target" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {barData.map((_, i) => <Cell key={i} fill={C.blue} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.border, borderRadius: 3 }} /><span style={{ fontSize: 11, color: C.textMuted }}>Current</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.blue, borderRadius: 3 }} /><span style={{ fontSize: 11, color: C.textMuted }}>EOY 2026 Target</span></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        <StatCard value="30" suffix="%" label="reduction in People Team ticket volume via self-service" delay={0.3} accent={C.blue} icon={TrendingUp} />
        <StatCard value="0" prefix="$" label="external tooling cost — built with AI + existing licenses" delay={0.4} accent={C.green} icon={CheckCircle2} />
        <StatCard value="1" suffix="→N" label="every tool built becomes a template for other functions" delay={0.5} accent={C.yellowDark} icon={Layers} />
      </div>
    </div>
  );
}

function CloseSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100%", textAlign: "center" }}>
      <div style={{ maxWidth: 700 }}>
        <SectionLabel delay={0}>The Ask</SectionLabel>
        <h2 style={{ ...fadeUp(0.1), fontSize: 40, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "8px 0 0 0" }}>We don't need permission<br />to keep building.</h2>
        <h2 style={{ ...fadeUp(0.2), fontSize: 40, fontWeight: 900, color: C.blue, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "4px 0 0 0" }}>We need alignment.</h2>
        <p style={{ ...fadeUp(0.35), fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 560, margin: "24px auto 32px auto" }}>
          The People Team is ready to lead DAT's AI transformation — not as a side project, but as the operational backbone of the One DAT mission. We've proven the model works. Now we need executive sponsorship, cross-functional partnership, and the organizational will to make AI fluency everyone's job.
        </p>
        <div style={{ ...fadeUp(0.5), display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
          {[
            { ask: "Executive Sponsorship", detail: "Jeff + Jana champion AI fluency publicly. Set the tone from the top.", icon: Users },
            { ask: "Cross-Functional Access", detail: "Roper IT partnership. UKG module access. Data governance framework.", icon: Building2 },
            { ask: "Organizational Will", detail: "AI fluency as a performance expectation. Experiment fast, learn publicly.", icon: Zap },
          ].map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div key={i} style={{ background: C.card, borderRadius: 12, padding: "20px 18px", border: `1px solid ${C.border}`, textAlign: "left", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <ItemIcon size={18} color={C.blue} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.blue, marginBottom: 6 }}>{item.ask}</div>
                <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            );
          })}
        </div>
        <div style={{ ...fadeUp(0.65), padding: "18px 24px", background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 15, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5, fontStyle: "italic" }}>
            "The most successful teams I see implementing AI are when you give a small cross-functional team an impossible task and see how far they get."
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 8 }}>— Ethan Mollick, Wharton · Unleash America 2026</div>
        </div>
        <div style={{ ...fadeUp(0.8), marginTop: 28, fontSize: 12, color: C.textMuted }}>
          DAT Freight & Analytics · People Team · Talent Operations · Confidential
        </div>
      </div>
    </div>
  );
}

// ── Main App ──
const slideComponents = {
  "title": TitleSlide, "why-now": WhyNowSlide, "one-dat": OneDATSlide,
  "landscape": LandscapeSlide, "framework": FrameworkSlide, "proof": ProofSlide,
  "roadmap": RoadmapSlide, "fluency": FluencySlide, "governance": GovernanceSlide,
  "metrics": MetricsSlide, "close": CloseSlide,
};

export default function DATAITransformation() {
  const [current, setCurrent] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [hudVisible, setHudVisible] = useState(false);
  const [cursorIdle, setCursorIdle] = useState(false);
  const containerRef = useRef(null);
  const presRef = useRef(null);
  const hudTimer = useRef(null);
  const cursorTimer = useRef(null);

  const goTo = (idx) => {
    if (idx >= 0 && idx < slides.length) {
      setCurrent(idx); setSlideKey(k => k + 1);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }
  };

  const enterPresentation = () => {
    setPresenting(true); setCursorIdle(false);
    if (presRef.current?.requestFullscreen) presRef.current.requestFullscreen().catch(() => {});
    else if (presRef.current?.webkitRequestFullscreen) presRef.current.webkitRequestFullscreen();
  };

  const exitPresentation = () => {
    setPresenting(false); setCursorIdle(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (document.webkitFullscreenElement) document.webkitExitFullscreen?.();
  };

  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement && !document.webkitFullscreenElement) { setPresenting(false); setCursorIdle(false); } };
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => { document.removeEventListener("fullscreenchange", handler); document.removeEventListener("webkitfullscreenchange", handler); };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || (presenting && e.key === " ")) { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goTo(current - 1); }
      if (e.key === "Escape" && presenting) exitPresentation();
      if ((e.key === "f" || e.key === "F") && !presenting) enterPresentation();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, presenting]);

  const handlePresClick = (e) => {
    if (!presenting) return;
    const tag = e.target.tagName?.toLowerCase();
    if (tag === "button" || tag === "a" || tag === "input" || tag === "select" || e.target.closest("[data-clickable]")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.25) goTo(current - 1); else goTo(current + 1);
  };

  useEffect(() => {
    if (!presenting) { setCursorIdle(false); return; }
    const handleMove = () => {
      setCursorIdle(false); setHudVisible(true);
      clearTimeout(cursorTimer.current); clearTimeout(hudTimer.current);
      cursorTimer.current = setTimeout(() => setCursorIdle(true), 3000);
      hudTimer.current = setTimeout(() => setHudVisible(false), 3000);
    };
    window.addEventListener("mousemove", handleMove);
    cursorTimer.current = setTimeout(() => setCursorIdle(true), 3000);
    hudTimer.current = setTimeout(() => setHudVisible(false), 3000);
    return () => { window.removeEventListener("mousemove", handleMove); clearTimeout(cursorTimer.current); clearTimeout(hudTimer.current); };
  }, [presenting]);

  const SlideComponent = slideComponents[slides[current].id];

  if (presenting) {
    return (
      <div ref={presRef} onClick={handlePresClick} style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: C.bg, color: C.textPrimary, width: "100vw", height: "100vh", display: "flex", flexDirection: "column", cursor: cursorIdle ? "none" : "default", overflow: "hidden", position: "relative" }}>
        <style>{keyframes}</style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <div ref={containerRef} style={{ flex: 1, overflowY: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 64px 64px 64px" }}>
          <div key={slideKey} style={{ width: "100%", maxWidth: 1200, animation: "scaleIn 0.3s ease-out forwards" }}><SlideComponent /></div>
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 3, background: C.border, zIndex: 100 }}>
          <div style={{ height: "100%", background: C.blue, width: `${((current + 1) / slides.length) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 12, background: `${C.white}EE`, backdropFilter: "blur(12px)", borderRadius: 12, padding: "8px 16px", border: `1px solid ${C.border}`, opacity: hudVisible ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: hudVisible ? "auto" : "none", zIndex: 101, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <button onClick={(e) => { e.stopPropagation(); goTo(current - 1); }} disabled={current === 0} style={{ background: "none", border: "none", color: current === 0 ? C.textMuted : C.textPrimary, cursor: current === 0 ? "default" : "pointer", opacity: current === 0 ? 0.3 : 1, padding: "4px 8px" }}><ChevronLeft size={18} /></button>
          <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 600, minWidth: 50, textAlign: "center" }}>{current + 1} / {slides.length}</span>
          <button onClick={(e) => { e.stopPropagation(); goTo(current + 1); }} disabled={current === slides.length - 1} style={{ background: "none", border: "none", color: current === slides.length - 1 ? C.textMuted : C.textPrimary, cursor: current === slides.length - 1 ? "default" : "pointer", opacity: current === slides.length - 1 ? 0.3 : 1, padding: "4px 8px" }}><ChevronRight size={18} /></button>
          <div style={{ width: 1, height: 16, background: C.border, margin: "0 4px" }} />
          <button onClick={(e) => { e.stopPropagation(); exitPresentation(); }} style={{ background: "none", border: "none", color: C.textSecondary, fontSize: 11, cursor: "pointer", padding: "4px 8px", fontFamily: "'Inter', system-ui", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Minimize2 size={12} /> ESC</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={presRef} style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: C.bg, color: C.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{keyframes}</style>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.white, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: C.blue, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: C.white }}>D</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.textSecondary }}>AI Transformation Strategy</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 600 }}>{current + 1} / {slides.length}</span>
          <button onClick={enterPresentation} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: C.blue, color: C.white, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter', system-ui" }}>
            <Play size={12} fill="white" /> Present
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 200, borderRight: `1px solid ${C.border}`, padding: "16px 0", overflowY: "auto", flexShrink: 0, background: C.white }}>
          {slides.map((s, i) => (
            <div key={s.id} onClick={() => goTo(i)} style={{ padding: "9px 20px", fontSize: 13, fontWeight: i === current ? 700 : 500, color: i === current ? C.blue : C.textMuted, background: i === current ? C.blueLight : "transparent", cursor: "pointer", transition: "all 0.2s", borderLeft: i === current ? `3px solid ${C.blue}` : "3px solid transparent" }}>
              <span style={{ opacity: 0.4, marginRight: 8, fontSize: 11 }}>{String(i + 1).padStart(2, "0")}</span>{s.label}
            </div>
          ))}
          <div style={{ padding: "16px 20px 8px", borderTop: `1px solid ${C.border}`, marginTop: 12 }}>
            <div style={{ fontSize: 10, color: C.textMuted, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: C.textSecondary }}>Shortcuts</span><br />
              <span style={{ color: C.blue }}>F</span> — Present<br />
              <span style={{ color: C.blue }}>← →</span> — Navigate<br />
              <span style={{ color: C.blue }}>ESC</span> — Exit
            </div>
          </div>
        </div>
        <div ref={containerRef} style={{ flex: 1, overflowY: "auto", padding: "32px 40px 48px 40px", background: C.bg }}>
          <div key={slideKey} style={{ maxWidth: 1000, margin: "0 auto", animation: "scaleIn 0.3s ease-out forwards" }}><SlideComponent /></div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", borderTop: `1px solid ${C.border}`, flexShrink: 0, background: C.white }}>
        <button onClick={() => goTo(current - 1)} disabled={current === 0} style={{ padding: "7px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: current === 0 ? C.textMuted : C.textSecondary, fontSize: 13, fontWeight: 600, cursor: current === 0 ? "default" : "pointer", opacity: current === 0 ? 0.4 : 1, fontFamily: "'Inter', system-ui", display: "flex", alignItems: "center", gap: 4 }}>
          <ChevronLeft size={14} /> Previous
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{ width: i === current ? 24 : 8, height: 4, borderRadius: 2, background: i === current ? C.blue : C.border, cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <button onClick={() => goTo(current + 1)} disabled={current === slides.length - 1} style={{ padding: "7px 18px", borderRadius: 8, border: "none", background: current === slides.length - 1 ? C.border : C.blue, color: C.white, fontSize: 13, fontWeight: 600, cursor: current === slides.length - 1 ? "default" : "pointer", opacity: current === slides.length - 1 ? 0.4 : 1, fontFamily: "'Inter', system-ui", display: "flex", alignItems: "center", gap: 4 }}>
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
