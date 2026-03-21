import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area,
} from "recharts";
import {
  Zap, BarChart3, Brain, Bot, Target, Shield, ChevronRight, ChevronDown,
  ArrowRight, Play, Minimize2, Clock, CheckCircle2, Wrench,
  TrendingUp, Users, Building2, Layers, AlertTriangle, Sparkles, GitBranch,
  ChevronLeft, Monitor, BookOpen, Search, CalendarCheck, Award, ArrowLeftRight,
  DollarSign, AlertCircle, UserX, Database, Cpu
} from "lucide-react";

const C = {
  blue: "#0046DD", blueLight: "#E8EEFF", blueMuted: "rgba(0,70,221,0.08)",
  black: "#000000", white: "#FFFFFF", bg: "#F8F9FA", bgAlt: "#F0F2F5",
  card: "#FFFFFF", border: "#E2E5EA", borderLight: "#ECEEF1",
  grey: "#8A8D8F", greyMed: "#6E6B68", greyDark: "#565657",
  red: "#E10600", yellow: "#FFD700", yellowDark: "#C7A500",
  green: "#059669", greenLight: "#ECFDF5",
  textPrimary: "#111827", textSecondary: "#4B5563", textMuted: "#9CA3AF",
};

const slides = [
  { id: "title", label: "Title" },
  { id: "cost", label: "The Cost Today" },
  { id: "flywheel", label: "The Flywheel" },
  { id: "landscape", label: "Landscape" },
  { id: "framework", label: "Framework" },
  { id: "proof", label: "Built & Planned" },
  { id: "roadmap", label: "Roadmap" },
  { id: "fluency", label: "AI Fluency" },
  { id: "governance", label: "Governance" },
  { id: "metrics", label: "Metrics" },
  { id: "risks", label: "Risks" },
  { id: "close", label: "The Ask" },
];

const fadeUp = (delay = 0) => ({
  opacity: 0, transform: "translateY(20px)",
  animation: `fadeUp 0.5s ease-out ${delay}s forwards`,
});

const keyframes = `
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
@keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes drawCircle { from { stroke-dashoffset: 565; } to { stroke-dashoffset: 0; } }
@keyframes fadeInScale { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
`;

// ── Animated Counter ──
function AnimNum({ value, suffix = "", prefix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(value) || 0;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / 1200, 1);
          setDisplay(Math.round(num * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function SectionLabel({ children, delay = 0 }) {
  return (
    <div style={{ ...fadeUp(delay), display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.blue, marginBottom: 8 }}>
      <div style={{ width: 16, height: 2, background: C.blue, borderRadius: 1 }} />
      {children}
    </div>
  );
}

function BigStat({ value, suffix = "", prefix = "", label, sub, delay = 0, accent = C.blue }) {
  const [hovered, setHovered] = useState(false);
  const accentBg = accent === C.blue ? C.blueLight : accent === C.green ? C.greenLight : accent === C.red ? "#FEF2F2" : "#FFFBEB";
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      ...fadeUp(delay), background: C.card, border: `1px solid ${hovered ? accent + "44" : C.border}`,
      borderRadius: 16, padding: "28px 24px", textAlign: "center", transition: "all 0.25s",
      boxShadow: hovered ? `0 8px 30px ${accent}12` : "0 1px 3px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accent, transform: hovered ? "scaleX(1)" : "scaleX(0.3)", transition: "transform 0.4s ease" }} />
      <div style={{ fontSize: 48, fontWeight: 900, color: accent, letterSpacing: "-0.03em", lineHeight: 1 }}>
        <AnimNum value={parseInt(String(value).replace(/\D/g, ""))} suffix={suffix} prefix={prefix} />
      </div>
      <div style={{ fontSize: 14, color: C.textPrimary, marginTop: 10, fontWeight: 700, lineHeight: 1.3 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

// ── Flywheel SVG ──
function FlywheelVisual() {
  const [activeSegment, setActiveSegment] = useState(null);
  const segments = [
    { id: "engage", label: "Engagement", sub: "Gallup Q12, coaching frameworks, manager action plans", color: C.blue, angle: 0 },
    { id: "enable", label: "Enablement", sub: "AI fluency training, tooling, self-service platforms", color: C.green, angle: 120 },
    { id: "output", label: "Output", sub: "Automation, intelligence dashboards, 10x quality + speed", color: C.yellowDark, angle: 240 },
  ];
  const r = 120, cx = 180, cy = 180;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <svg width="360" height="360" viewBox="0 0 360 360" style={{ flexShrink: 0 }}>
        {/* Outer ring segments */}
        {segments.map((seg, i) => {
          const startAngle = (seg.angle - 55) * Math.PI / 180;
          const endAngle = (seg.angle + 55) * Math.PI / 180;
          const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
          const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle);
          const isActive = activeSegment === seg.id;
          const outerR = isActive ? 140 : 130;
          const ox1 = cx + outerR * Math.cos(startAngle), oy1 = cy + outerR * Math.sin(startAngle);
          const ox2 = cx + outerR * Math.cos(endAngle), oy2 = cy + outerR * Math.sin(endAngle);
          return (
            <g key={seg.id} style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveSegment(seg.id)} onMouseLeave={() => setActiveSegment(null)}>
              <path
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${ox2} ${oy2} A ${outerR} ${outerR} 0 0 0 ${ox1} ${oy1} Z`}
                fill={isActive ? seg.color : seg.color + "22"}
                stroke={seg.color} strokeWidth={isActive ? 2.5 : 1.5}
                style={{ transition: "all 0.3s ease" }}
              />
            </g>
          );
        })}
        {/* Arrows between segments */}
        {segments.map((seg, i) => {
          const midAngle = (seg.angle + 60) * Math.PI / 180;
          const ax = cx + (r + 8) * Math.cos(midAngle), ay = cy + (r + 8) * Math.sin(midAngle);
          return (
            <text key={`arr-${i}`} x={ax} y={ay} textAnchor="middle" dominantBaseline="middle"
              fill={C.textMuted} fontSize="14" style={{ animation: "spinSlow 20s linear infinite", transformOrigin: `${cx}px ${cy}px` }}>
              →
            </text>
          );
        })}
        {/* Labels on segments */}
        {segments.map((seg) => {
          const labelAngle = seg.angle * Math.PI / 180;
          const labelR = r + 16;
          const lx = cx + labelR * Math.cos(labelAngle), ly = cy + labelR * Math.sin(labelAngle);
          return (
            <text key={`lbl-${seg.id}`} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fill={activeSegment === seg.id ? seg.color : C.textSecondary}
              fontSize="12" fontWeight="700" fontFamily="Inter, system-ui"
              style={{ transition: "fill 0.3s" }}>
              {seg.label}
            </text>
          );
        })}
        {/* Center */}
        <circle cx={cx} cy={cy} r="55" fill={C.blue} opacity="0.06" />
        <circle cx={cx} cy={cy} r="45" fill={C.card} stroke={C.blue} strokeWidth="2" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill={C.blue} fontSize="13" fontWeight="900" fontFamily="Inter, system-ui">ONE</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill={C.blue} fontSize="13" fontWeight="900" fontFamily="Inter, system-ui">DAT</text>
        {/* Spinning ring */}
        <circle cx={cx} cy={cy} r="90" fill="none" stroke={C.blue} strokeWidth="1" strokeDasharray="4 8" opacity="0.2"
          style={{ animation: "spinSlow 30s linear infinite", transformOrigin: `${cx}px ${cy}px` }} />
      </svg>
      <div style={{ flex: 1 }}>
        {segments.map((seg, i) => (
          <div key={seg.id}
            data-clickable="true"
            onMouseEnter={() => setActiveSegment(seg.id)} onMouseLeave={() => setActiveSegment(null)}
            style={{
              padding: "14px 18px", borderRadius: 10, marginBottom: 10, cursor: "pointer",
              background: activeSegment === seg.id ? seg.color + "08" : C.card,
              border: `1px solid ${activeSegment === seg.id ? seg.color + "33" : C.border}`,
              borderLeft: `3px solid ${seg.color}`, transition: "all 0.25s",
            }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: seg.color }}>{seg.label}</div>
            <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5, marginTop: 2 }}>{seg.sub}</div>
          </div>
        ))}
      </div>
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
      <div data-clickable="true" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        style={{ background: C.card, border: `1px solid ${expanded ? accent + "44" : C.border}`, borderRadius: 14, padding: "20px 24px", cursor: "pointer", transition: "all 0.3s ease", boxShadow: expanded ? `0 4px 16px ${accent}10` : "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expanded ? 16 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PhaseIcon size={20} color={accent} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary }}>{title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {quarter}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: accentBg, color: accent, fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>Phase {phase}</div>
            <div style={{ color: C.textMuted, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}><ChevronDown size={18} /></div>
          </div>
        </div>
        {expanded && (
          <div style={{ paddingTop: 12, borderTop: `1px solid ${C.borderLight}` }}>
            {items.map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8, paddingLeft: 20, position: "relative", opacity: 0, animation: `slideIn 0.35s ease-out ${i * 0.06}s forwards` }}>
                <span style={{ position: "absolute", left: 0, top: 2, color: accent }}>{i === items.length - 1 ? <CheckCircle2 size={14} /> : <ArrowRight size={14} />}</span>
                <span style={{ fontWeight: i === items.length - 1 ? 600 : 400 }}>{item}</span>
              </div>
            ))}
          </div>
        )}
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
          An AI transformation strategy grounded in what we've already built, what it's already saving, and where we go next.
        </p>
        <div style={{ ...fadeUp(0.7), display: "flex", gap: 12, justifyContent: "center", marginTop: 36 }}>
          <div style={{ padding: "10px 20px", background: C.blue, borderRadius: 8, fontSize: 13, fontWeight: 700, color: C.white, display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={14} /> Talent Operations
          </div>
          <div style={{ padding: "10px 20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: C.textSecondary, display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={14} /> March 2026
          </div>
        </div>
      </div>
    </div>
  );
}

function CostSlide() {
  return (
    <div>
      <SectionLabel>The Burning Platform</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>What It's Costing Us Today</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 24 }}>
        These aren't industry benchmarks. These are DAT numbers, right now.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <BigStat value="80" suffix=" hrs" label="Admin work per week" sub="Across all People pillars: comp verification, routing, scheduling, reporting" delay={0.2} accent={C.red} />
        <BigStat value="110" prefix="$" suffix="K" label="Annual tool spend at risk" sub="TalentWall, Crosschq, scheduling, recognition, onboarding, reporting software" delay={0.3} accent={C.yellowDark} />
        <BigStat value="40" suffix=" reqs" label="Supported by 3 recruiters" sub="Full-lifecycle. Scheduling, sourcing, and admin eat capacity that should go to candidates" delay={0.4} accent={C.blue} />
      </div>
      {/* Visual: where the hours go */}
      <div style={{ ...fadeUp(0.5), background: C.card, borderRadius: 14, padding: "24px", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>Where the 80 Hours Go</div>
        {[
          { label: "Comp verification & offer matching", hours: 25, color: C.blue },
          { label: "Recruiter scheduling & coordination", hours: 20, color: C.yellowDark },
          { label: "Manual reporting & data pulls", hours: 15, color: C.green },
          { label: "Routing questions to the right person", hours: 12, color: C.grey },
          { label: "Onboarding process management", hours: 8, color: C.greyDark },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <div style={{ width: 100, fontSize: 12, color: C.textMuted, textAlign: "right", flexShrink: 0 }}>{item.hours} hrs/wk</div>
            <div style={{ flex: 1, height: 28, background: C.bgAlt, borderRadius: 6, overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", background: item.color + "22", borderLeft: `3px solid ${item.color}`,
                width: `${(item.hours / 25) * 100}%`, borderRadius: 6,
                display: "flex", alignItems: "center", paddingLeft: 10,
                opacity: 0, animation: `slideIn 0.6s ease-out ${0.5 + i * 0.1}s forwards`,
              }}>
                <span style={{ fontSize: 12, color: C.textPrimary, fontWeight: 500 }}>{item.label}</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: "12px 16px", background: C.red + "06", borderRadius: 8, border: `1px solid ${C.red}15`, fontSize: 13, color: C.textSecondary }}>
          <span style={{ fontWeight: 700, color: C.red }}>80 hours/week = 2 full-time teammates</span> doing work that AI can handle. That's capacity we're burning on process instead of investing in people.
        </div>
      </div>
    </div>
  );
}

function FlywheelSlide() {
  return (
    <div>
      <SectionLabel>Strategic Model</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>The One DAT Flywheel</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 24 }}>
        One DAT is the destination. We get there through engagement and enablement. High engagement drives high output. AI fluency is the multiplier that 10x's both quality and speed.
      </p>
      <div style={{ ...fadeUp(0.25) }}>
        <FlywheelVisual />
      </div>
      <div style={{ ...fadeUp(0.5), marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { from: "Engagement", to: "Enablement", how: "Gallup data reveals capability gaps → shapes AI training priorities" },
          { from: "Enablement", to: "Output", how: "AI-fluent teammates automate admin → build dashboards → ship faster" },
          { from: "Output", to: "Engagement", how: "Less busywork + better tools → teammates feel empowered → engagement rises" },
        ].map((link, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>{link.from} <ArrowRight size={10} /> {link.to}</div>
            <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5 }}>{link.how}</div>
          </div>
        ))}
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
    { source: "Gartner", insight: "Only 21% of CHROs are closely involved in AI strategy. The People function that builds fluency first defines the new standard.", color: C.blue },
    { source: "Deloitte", insight: "The S-curve is compressing. The gap between 'early mover' and 'too late' is shrinking from years to quarters.", color: C.yellowDark },
    { source: "DAT Signal", insight: "The Claude access backlog tells the story. Teammates are hungry for AI enablement. Demand is outpacing our ability to train.", color: C.green },
  ];
  return (
    <div>
      <SectionLabel>Industry Context</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Where We Stand</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 24 }}>
        Self-assessed maturity against industry benchmarks. We're ahead in areas where we've built tools. Behind where we haven't invested yet.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>DAT vs. Industry Avg (Self-Assessed)</div>
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
            <div key={i} data-clickable="true" onClick={() => setActiveInsight(i)} style={{
              background: i === activeInsight ? item.color + "08" : C.card, borderRadius: 10, padding: "16px 18px",
              border: `1px solid ${i === activeInsight ? item.color + "33" : C.border}`, borderLeft: `3px solid ${item.color}`,
              cursor: "pointer", transition: "all 0.25s", boxShadow: i === activeInsight ? `0 2px 8px ${item.color}10` : "none",
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.source}</div>
              <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5, maxHeight: i === activeInsight ? 100 : 20, overflow: "hidden", transition: "max-height 0.4s ease" }}>{item.insight}</div>
            </div>
          ))}
          <div style={{ marginTop: "auto", padding: "14px 16px", background: C.blueLight, borderRadius: 10, border: `1px solid ${C.blue}15` }}>
            <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, color: C.blue }}>The gap in our chart</span> — Teammate Experience and Predictive Analytics — is where the planned tools (recognition, retention modeling, TA dashboards) close the distance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameworkSlide() {
  const [active, setActive] = useState(null);
  const pillars = [
    { id: "auto", icon: Bot, title: "Automate the Yester-Work", accent: C.blue, target: "75% of repetitive People Ops automated by EOY",
      items: ["Comp verification → from 25 hrs/wk manual to automated Radford matching", "#ask-people-team bot → 90% reduction in PBP admin routing", "Onboarding flows → consistent across all 6 locations", "Scheduling agent → reclaim 20 hrs/wk of recruiter capacity"] },
    { id: "intel", icon: BarChart3, title: "Build Workforce Intelligence", accent: C.yellowDark, target: "People data rivals financial data for leadership decisions",
      items: ["Real-time engagement dashboard (live, 6 tabs, deployed)", "TA analytics: pipeline health, hiring velocity, source-of-hire", "Predictive retention modeling for proactive manager alerts", "Workforce planning integrated with Finance forecasting"] },
    { id: "fluency", icon: Brain, title: "Develop AI Fluency", accent: C.green, target: "75% of teammates actively using AI tools by Q4 2026",
      items: ["Tiered program: Foundations → Practitioner → Builder", "Claude access backlog proves demand already exists", "Manager training: lead AI-augmented teams", "Cross-functional 'impossible task' sprints"] },
  ];
  return (
    <div>
      <SectionLabel>Strategic Framework</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Three Pillars</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>
        Every initiative maps to a pillar. Every pillar connects to DAT-specific pain we're solving today.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
        {pillars.map((p, i) => {
          const Icon = p.icon;
          const isActive = active === p.id;
          const accentBg = p.accent === C.blue ? C.blueLight : p.accent === C.yellowDark ? "#FFFBEB" : C.greenLight;
          return (
            <div key={p.id} data-clickable="true" onClick={() => setActive(isActive ? null : p.id)}
              style={{
                ...fadeUp(0.2 + i * 0.1), background: C.card, borderRadius: 14, padding: "22px 20px", cursor: "pointer",
                border: `1px solid ${isActive ? p.accent + "44" : C.border}`, transition: "all 0.3s",
                boxShadow: isActive ? `0 6px 24px ${p.accent}12` : "0 1px 3px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden",
              }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.accent}, ${p.accent}44)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isActive ? 14 : 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color={p.accent} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary }}>{p.title}</div>
              </div>
              {!isActive && (
                <div style={{ fontSize: 12, color: p.accent, fontWeight: 700, padding: "6px 10px", background: accentBg, borderRadius: 6, textAlign: "center" }}>
                  Target: {p.target}
                </div>
              )}
              {isActive && (
                <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 10 }}>
                  {p.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, marginBottom: 6, paddingLeft: 16, position: "relative", opacity: 0, animation: `slideIn 0.3s ease-out ${j * 0.06}s forwards` }}>
                      <span style={{ position: "absolute", left: 0, color: p.accent }}><ChevronRight size={12} style={{ marginTop: 3 }} /></span>{item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ ...fadeUp(0.55), background: C.card, borderRadius: 12, padding: "14px 20px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "spinSlow 12s linear infinite" }}>
          <GitBranch size={14} color={C.blue} />
        </div>
        <div style={{ fontSize: 13, color: C.textSecondary }}>
          These aren't independent. Automation frees capacity → Intelligence shows where to focus → Fluency accelerates everything.
          <span style={{ color: C.blue, fontWeight: 700 }}> The flywheel.</span>
        </div>
      </div>
    </div>
  );
}

function ProofSlide() {
  const [filter, setFilter] = useState("all");
  const proofs = [
    { name: "Engagement Intelligence Suite", desc: "Gallup Q12 dashboard (6 tabs, 97% participation) + PBP Coaching Framework + Manager Action Framework. A connected ecosystem.", status: "Live", accent: C.green, icon: BarChart3 },
    { name: "#ask-people-team Bot", desc: "n8n + Claude Sonnet routing. Auto-classifies and routes to the right owner. V2 adds self-training.", status: "Live", accent: C.green, icon: Bot },
    { name: "Comp Verification Engine", desc: "Automated Radford matching for hiring requests. Targets 25 hrs/wk of manual process.", status: "Prototype", accent: C.yellowDark, icon: Target },
    { name: "Merit Cycle App", desc: "React app with role-based views (XLT/ELT/Admin). Replaced a 14-tab spreadsheet.", status: "Prototype", accent: C.yellowDark, icon: Monitor },
    { name: "TA Sourcing Agent", desc: "AI-powered pipeline building. Could replace or augment TalentWall/Crosschq ($30K/yr).", status: "Planned", accent: C.blue, icon: Search },
    { name: "TA Scheduling Agent", desc: "Automated interview coordination. Targets 20 hrs/wk of recruiter scheduling.", status: "Planned", accent: C.blue, icon: CalendarCheck },
    { name: "TA Analytics Dashboards", desc: "Real-time hiring velocity, pipeline health, source-of-hire. Replaces static weekly pulls.", status: "Planned", accent: C.blue, icon: TrendingUp },
    { name: "Recognition Platform", desc: "AI-assisted teammate recognition for Workplace Experience. Connected to engagement data.", status: "Planned", accent: C.blue, icon: Award },
    { name: "Integration Builder", desc: "Custom Greenhouse → UKG integrations. Vendor quotes: $50K+ per integration.", status: "Planned", accent: C.blue, icon: ArrowLeftRight },
  ];
  const filtered = filter === "all" ? proofs : proofs.filter(p => p.status.toLowerCase() === filter);
  const statusBg = (p) => p.accent === C.green ? C.greenLight : p.accent === C.yellowDark ? "#FFFBEB" : C.blueLight;
  const statusIcon = (p) => p.status === "Live" ? <CheckCircle2 size={10} /> : p.status === "Prototype" ? <Clock size={10} /> : <Sparkles size={10} />;
  return (
    <div>
      <SectionLabel>Proof + Pipeline</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Built, Proven, and Growing</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 20 }}>
        Live tools are in use today. Planned tools target specific cost and capacity problems on the previous slide.
      </p>
      <div style={{ ...fadeUp(0.2), display: "flex", gap: 8, marginBottom: 18 }}>
        {["all", "live", "prototype", "planned"].map(f => (
          <button key={f} data-clickable="true" onClick={() => setFilter(f)} style={{
            padding: "6px 16px", borderRadius: 20, border: "none", background: filter === f ? C.blue : C.bgAlt, color: filter === f ? C.white : C.textMuted,
            fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "'Inter', system-ui", textTransform: "capitalize",
          }}>{f === "all" ? `All (${proofs.length})` : `${f} (${proofs.filter(p => p.status.toLowerCase() === f).length})`}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {filtered.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.name} style={{ ...fadeUp(0.2 + i * 0.05), background: C.card, borderRadius: 12, padding: "20px 18px", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ position: "absolute", top: 12, right: 12, background: statusBg(p), color: p.accent, fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 12, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 3 }}>{statusIcon(p)}{p.status}</div>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: p.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}><Icon size={18} color={p.accent} /></div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.textPrimary, marginBottom: 4, paddingRight: 60 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.textSecondary, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          );
        })}
      </div>
      <div style={{ ...fadeUp(0.6), marginTop: 14, padding: "12px 18px", background: C.greenLight, borderRadius: 10, border: `1px solid ${C.green}20`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <DollarSign size={16} color={C.green} />
        <span style={{ fontSize: 12, color: C.textSecondary }}>Current tool spend addressable by AI-built alternatives: </span>
        <span style={{ fontSize: 12, color: C.green, fontWeight: 800 }}>$110K/year</span>
      </div>
    </div>
  );
}

function RoadmapSlide() {
  return (
    <div>
      <SectionLabel>Implementation</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>12-Month Roadmap</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 20 }}>Quick wins first to build trust. Then scale.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PhaseCard phase={1} title="Foundation & Quick Wins" quarter="Q2 2026 (Now → June)" active={true} delay={0.2} items={["Publish AI usage policy to People Hub", "Formalize live tools: Engagement Suite, routing bot", "Launch 'AI at DAT' resource page", "Pilot bot self-training loop (V2)", "First cross-functional AI sprint: one impossible task, 6-week timebox", "Milestone: 3 visible wins at All Hands. Trust established."]} />
        <PhaseCard phase={2} title="Scale & Integrate" quarter="Q3 2026 (July → September)" delay={0.35} items={["Comp verification engine live — targeting 25 hrs/wk savings", "TA dashboards V1 — pipeline health and hiring velocity", "AI fluency program launches (Foundations → Practitioner → Builder)", "Automated onboarding across all 6 locations", "Milestone: 50% of repetitive processes automated."]} />
        <PhaseCard phase={3} title="Optimize & Extend" quarter="Q4 2026 (October → December)" delay={0.5} items={["Predictive retention modeling → proactive manager alerts", "Skills inventory across all locations and acquired populations", "Manager AI toolkit: coaching prompts, performance writing, team analysis", "People data integrated with Finance forecasting", "Milestone: 75% automation. Fluency embedded. Playbook published for other functions."]} />
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
        Meet people where they are. Develop fluency through practice, not slide decks.
      </p>
      <div style={{ ...fadeUp(0.2), background: C.green + "08", borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: `1px solid ${C.green}15`, display: "flex", alignItems: "center", gap: 12 }}>
        <Cpu size={18} color={C.green} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: 13, color: C.textSecondary }}>
          <span style={{ fontWeight: 700, color: C.green }}>The demand is real.</span> The Claude access backlog keeps growing. Teammates aren't waiting for a program — they're asking for enablement now.
        </div>
      </div>
      <div style={{ ...fadeUp(0.25), display: "flex", gap: 0, marginBottom: 20, background: C.bgAlt, borderRadius: 12, padding: 3 }}>
        {tiers.map((t, i) => {
          const TierIcon = t.icon;
          return (
            <button key={i} data-clickable="true" onClick={() => setActiveTier(i)} style={{
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
          <div style={{ background: tiers[activeTier].color + "12", color: tiers[activeTier].color, fontSize: 13, fontWeight: 700, padding: "6px 14px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {tiers[activeTier].hours}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {tiers[activeTier].items.map((item, j) => (
            <div key={`${activeTier}-${j}`} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, padding: "10px 14px", background: C.bgAlt, borderRadius: 8, display: "flex", alignItems: "center", gap: 8, opacity: 0, animation: `slideIn 0.3s ease-out ${j * 0.06}s forwards` }}>
              <CheckCircle2 size={14} color={tiers[activeTier].color} style={{ flexShrink: 0 }} />{item}
            </div>
          ))}
        </div>
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
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 640, lineHeight: 1.7, marginBottom: 20 }}>Speed without trust is reckless. Clear guardrails that enable experimentation.</p>
      <div style={{ ...fadeUp(0.2), display: "flex", gap: 0, marginBottom: 18, background: C.bgAlt, borderRadius: 10, padding: 3 }}>
        {[{ key: "policy", label: "AI Usage Policy", icon: Shield }, { key: "roper", label: "Roper Alignment", icon: Building2 }].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button key={tab.key} data-clickable="true" onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, padding: "10px 16px", borderRadius: 8, border: "none", background: activeTab === tab.key ? C.card : "transparent", color: activeTab === tab.key ? C.blue : C.textMuted,
              fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all 0.25s", fontFamily: "'Inter', system-ui", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}><TabIcon size={14} /> {tab.label}</button>
          );
        })}
      </div>
      <div style={{ background: C.card, borderRadius: 14, padding: "24px 22px", border: `1px solid ${C.border}`, marginBottom: 18 }}>
        {activeTab === "policy" ? (
          <>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, marginBottom: 14 }}>Core Principles</div>
            {["No proprietary or teammate data in public AI tools", "Human review before any external use of AI outputs", "Approved tool list on People Hub (Claude, Copilot, DAT-specific)", "Bias testing required before AI touches hiring or promotion decisions", "Transparency with teammates about where AI is used"].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8, paddingLeft: 24, position: "relative", opacity: 0, animation: `slideIn 0.3s ease-out ${i * 0.06}s forwards` }}>
                <span style={{ position: "absolute", left: 0, top: 1 }}><Shield size={14} color={C.blue} /></span>{item}
              </div>
            ))}
          </>
        ) : (
          <>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, marginBottom: 14 }}>IT & Legal Coordination</div>
            {["Align with Roper IT security and data classification", "AI-specific terms in vendor contracts with Legal", "Approved integrations: UKG, Greenhouse, 15Five", "UKG modules needed: Onboarding, Merit Planning, Performance, Reporting, Integrations", "All AI tools documented for audit readiness"].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8, paddingLeft: 24, position: "relative", opacity: 0, animation: `slideIn 0.3s ease-out ${i * 0.06}s forwards` }}>
                <span style={{ position: "absolute", left: 0, top: 1 }}><Building2 size={14} color={C.yellowDark} /></span>{item}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function MetricsSlide() {
  const barData = [
    { name: "Process Automation", current: 20, target: 75 }, { name: "Self-Service", current: 35, target: 80 },
    { name: "AI Fluency Rate", current: 15, target: 75 }, { name: "Dashboard Coverage", current: 40, target: 90 },
    { name: "Admin Hours Reclaimed", current: 10, target: 60 },
  ];
  return (
    <div>
      <SectionLabel>Measurement</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>How We'll Know</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>Outcomes, not activity. Every metric maps to a business impact.</p>
      <div style={{ ...fadeUp(0.2), background: C.card, borderRadius: 14, padding: "24px 28px", border: `1px solid ${C.border}`, marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6 }}>
          <TrendingUp size={14} /> Current → EOY 2026 Target
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barGap={4}>
            <XAxis dataKey="name" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.textPrimary }} formatter={(v) => [`${v}%`]} />
            <Bar dataKey="current" name="Current" radius={[4, 4, 0, 0]} maxBarSize={28}>{barData.map((_, i) => <Cell key={i} fill={C.border} />)}</Bar>
            <Bar dataKey="target" name="EOY Target" radius={[4, 4, 0, 0]} maxBarSize={28}>{barData.map((_, i) => <Cell key={i} fill={C.blue} />)}</Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.border, borderRadius: 3 }} /><span style={{ fontSize: 11, color: C.textMuted }}>Current</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.blue, borderRadius: 3 }} /><span style={{ fontSize: 11, color: C.textMuted }}>EOY 2026</span></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        <BigStat value="80" suffix="→0" label="Admin hours reclaimed weekly" delay={0.3} accent={C.blue} />
        <BigStat value="110" prefix="$" suffix="K" label="Tool spend reduced or replaced" delay={0.4} accent={C.green} />
        <BigStat value="1" suffix="→N" label="Every tool becomes a template" sub="People Team builds it. Every function inherits it." delay={0.5} accent={C.yellowDark} />
      </div>
    </div>
  );
}

function RisksSlide() {
  const risks = [
    { icon: UserX, title: "Concentration Risk", desc: "Most of this has been built by one person. If that person is unavailable, velocity drops to zero. Mitigation: Nat's team assumes operational ownership of deployed tools in Phase 2. Documentation and handoff built into every project.", color: C.red },
    { icon: Building2, title: "Roper IT Access", desc: "UKG confirmed every capability we need exists on the platform. The bottleneck is Roper-side administration and access controls. This is a hard blocker for onboarding, merit planning, and integrations. Mitigation: Nat is building direct communication lines. Specific modules named in our ask.", color: C.yellowDark },
    { icon: Database, title: "Data Quality", desc: "Four acquisitions left us with inconsistent job codes, salary bands, and teammate records across populations. AI tools are only as good as the data underneath. Mitigation: Data cleanup is built into Phase 1 and 2 roadmap milestones.", color: C.blue },
    { icon: TrendingUp, title: "Sustainability", desc: "This pace of building requires dedicated capacity. Without team growth, we'll ship Phase 1 and stall on Phase 2-3. Mitigation: We're not asking for headcount now, but the planned Talent Ops Analyst and WX Manager roles are prerequisites for Phase 3 targets.", color: C.green },
  ];
  return (
    <div>
      <SectionLabel>Honest Assessment</SectionLabel>
      <h2 style={{ ...fadeUp(0.1), fontSize: 34, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>What Could Go Wrong</h2>
      <p style={{ ...fadeUp(0.15), fontSize: 14, color: C.textSecondary, maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>
        Naming risks isn't hedging. It's how we build trust and plan around reality.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {risks.map((risk, i) => {
          const Icon = risk.icon;
          return (
            <div key={i} style={{
              ...fadeUp(0.2 + i * 0.08), background: C.card, borderRadius: 14, padding: "22px 20px",
              border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              borderLeft: `3px solid ${risk.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: risk.color + "10", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={risk.color} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary }}>{risk.title}</div>
              </div>
              <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{risk.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CloseSlide() {
  const asks = [
    { ask: "Jana champions AI fluency at All Hands and ELT", detail: "Set the tone from the top. Signal that this is a DAT priority, not a People Team experiment.", icon: Users },
    { ask: "UKG module access approved", detail: "Specific modules: Onboarding, Merit Planning, Performance, Reporting, Integrations. Named. Scoped.", icon: Monitor },
    { ask: "Standing AI review in XLT or ELT cadence", detail: "Monthly 15-minute slot. Progress, blockers, decisions needed. Keeps momentum and accountability.", icon: Clock },
    { ask: "AI fluency in performance criteria", detail: "Not a checkbox. An expectation that teammates and managers are building this capability into their work.", icon: Brain },
    { ask: "Fund one cross-functional AI sprint", detail: "Small team. One impossible task. 6-week timebox. This is how we prove the model scales beyond People Team.", icon: Zap },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100%", textAlign: "center" }}>
      <div style={{ maxWidth: 750 }}>
        <SectionLabel delay={0}>The Ask</SectionLabel>
        <h2 style={{ ...fadeUp(0.1), fontSize: 38, fontWeight: 900, color: C.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "8px 0 0 0" }}>We don't need permission.</h2>
        <h2 style={{ ...fadeUp(0.2), fontSize: 38, fontWeight: 900, color: C.blue, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "4px 0 0 0" }}>We need five yes-or-no decisions.</h2>
        <div style={{ ...fadeUp(0.35), marginTop: 28, display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
          {asks.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div key={i} style={{
                background: C.card, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}`,
                display: "flex", alignItems: "flex-start", gap: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <ItemIcon size={18} color={C.blue} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary }}>{item.ask}</div>
                  <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5, marginTop: 2 }}>{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ ...fadeUp(0.65), marginTop: 24, fontSize: 12, color: C.textMuted }}>
          DAT Freight & Analytics · People Team · Talent Operations · Confidential
        </div>
      </div>
    </div>
  );
}

// ── Main App ──
const slideComponents = {
  "title": TitleSlide, "cost": CostSlide, "flywheel": FlywheelSlide,
  "landscape": LandscapeSlide, "framework": FrameworkSlide, "proof": ProofSlide,
  "roadmap": RoadmapSlide, "fluency": FluencySlide, "governance": GovernanceSlide,
  "metrics": MetricsSlide, "risks": RisksSlide, "close": CloseSlide,
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

  const goTo = (idx) => { if (idx >= 0 && idx < slides.length) { setCurrent(idx); setSlideKey(k => k + 1); if (containerRef.current) containerRef.current.scrollTop = 0; } };
  const enterPresentation = () => { setPresenting(true); setCursorIdle(false); if (presRef.current?.requestFullscreen) presRef.current.requestFullscreen().catch(() => {}); else if (presRef.current?.webkitRequestFullscreen) presRef.current.webkitRequestFullscreen(); };
  const exitPresentation = () => { setPresenting(false); setCursorIdle(false); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); else if (document.webkitFullscreenElement) document.webkitExitFullscreen?.(); };

  useEffect(() => {
    const h = () => { if (!document.fullscreenElement && !document.webkitFullscreenElement) { setPresenting(false); setCursorIdle(false); } };
    document.addEventListener("fullscreenchange", h); document.addEventListener("webkitfullscreenchange", h);
    return () => { document.removeEventListener("fullscreenchange", h); document.removeEventListener("webkitfullscreenchange", h); };
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || (presenting && e.key === " ")) { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goTo(current - 1); }
      if (e.key === "Escape" && presenting) exitPresentation();
      if ((e.key === "f" || e.key === "F") && !presenting) enterPresentation();
    };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [current, presenting]);

  const handlePresClick = (e) => {
    if (!presenting) return;
    if (e.target.closest("button") || e.target.closest("a") || e.target.closest("input") || e.target.closest("select") || e.target.closest("[data-clickable]")) return;
    const rect = e.currentTarget.getBoundingClientRect(); const x = e.clientX - rect.left;
    if (x < rect.width * 0.25) goTo(current - 1); else goTo(current + 1);
  };

  useEffect(() => {
    if (!presenting) { setCursorIdle(false); return; }
    const h = () => { setCursorIdle(false); setHudVisible(true); clearTimeout(cursorTimer.current); clearTimeout(hudTimer.current); cursorTimer.current = setTimeout(() => setCursorIdle(true), 3000); hudTimer.current = setTimeout(() => setHudVisible(false), 3000); };
    window.addEventListener("mousemove", h); cursorTimer.current = setTimeout(() => setCursorIdle(true), 3000); hudTimer.current = setTimeout(() => setHudVisible(false), 3000);
    return () => { window.removeEventListener("mousemove", h); clearTimeout(cursorTimer.current); clearTimeout(hudTimer.current); };
  }, [presenting]);

  const SlideComponent = slideComponents[slides[current].id];

  if (presenting) {
    return (
      <div ref={presRef} onClick={handlePresClick} style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: C.bg, color: C.textPrimary, width: "100vw", height: "100vh", display: "flex", flexDirection: "column", cursor: cursorIdle ? "none" : "default", overflow: "hidden", position: "relative" }}>
        <style>{keyframes}</style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <div ref={containerRef} style={{ flex: 1, overflowY: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 64px 64px 64px" }}>
          <div key={slideKey} style={{ width: "100%", maxWidth: 1200, margin: "auto 0", animation: "scaleIn 0.3s ease-out forwards" }}><SlideComponent /></div>
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 3, background: C.border, zIndex: 100 }}><div style={{ height: "100%", background: C.blue, width: `${((current + 1) / slides.length) * 100}%`, transition: "width 0.4s ease" }} /></div>
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
          <button onClick={enterPresentation} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: C.blue, color: C.white, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter', system-ui" }}><Play size={12} fill="white" /> Present</button>
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
        <button onClick={() => goTo(current - 1)} disabled={current === 0} style={{ padding: "7px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: current === 0 ? C.textMuted : C.textSecondary, fontSize: 13, fontWeight: 600, cursor: current === 0 ? "default" : "pointer", opacity: current === 0 ? 0.4 : 1, fontFamily: "'Inter', system-ui", display: "flex", alignItems: "center", gap: 4 }}><ChevronLeft size={14} /> Previous</button>
        <div style={{ display: "flex", gap: 4 }}>
          {slides.map((_, i) => (<div key={i} onClick={() => goTo(i)} style={{ width: i === current ? 24 : 8, height: 4, borderRadius: 2, background: i === current ? C.blue : C.border, cursor: "pointer", transition: "all 0.3s" }} />))}
        </div>
        <button onClick={() => goTo(current + 1)} disabled={current === slides.length - 1} style={{ padding: "7px 18px", borderRadius: 8, border: "none", background: current === slides.length - 1 ? C.border : C.blue, color: C.white, fontSize: 13, fontWeight: 600, cursor: current === slides.length - 1 ? "default" : "pointer", opacity: current === slides.length - 1 ? 0.4 : 1, fontFamily: "'Inter', system-ui", display: "flex", alignItems: "center", gap: 4 }}>Next <ChevronRight size={14} /></button>
      </div>
    </div>
  );
}
