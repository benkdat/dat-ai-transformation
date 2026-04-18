import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  Zap, BarChart3, Brain, Bot, Target, Shield, ChevronRight, ChevronDown,
  ArrowRight, Play, Minimize2, Clock, CheckCircle2, Wrench,
  TrendingUp, Users, Building2, Layers, AlertTriangle, Sparkles,
  ChevronLeft, Monitor, BookOpen, Search, CalendarCheck, Award, ArrowLeftRight,
  DollarSign, UserX, Database, Cpu, Hammer, RefreshCcw, HeartPulse, Crosshair,
  Terminal, Trophy, Gauge
} from "lucide-react";
import OneDATTruck from "../components/OneDATTruck";
import OneDATSkyline from "../components/OneDATSkyline";
import ModeToggle from "../components/ModeToggle";
import { METRIC_COLORS, METRIC_LABELS, METRIC_ORDER } from "../components/DATokens";

const C = {
  blue:"#0046DD",blueOnBlack:"#0056FF",blueLight:"#E8EEFF",blueMuted:"rgba(0,70,221,0.06)",
  black:"#000000",white:"#FFFFFF",bg:"#F8F9FA",bgAlt:"#F0F2F5",
  card:"#FFFFFF",border:"#E9ECEF",borderLight:"#F0F2F5",
  grey:"#8A8D8F",greyMed:"#6E6B68",greyDark:"#565657",
  red:"#E10600",yellow:"#FFD700",
  textPrimary:"#000000",textSecondary:"#565657",textMuted:"#8A8D8F",
};
const FW={engage:C.blue,enable:C.greyDark,redesign:C.red,focus:C.black};

const slides=[
  {id:"title",label:"Cover"},{id:"landscape",label:"Landscape"},{id:"cost",label:"Burning Platform"},
  {id:"flywheel",label:"Flywheel"},{id:"proof",label:"What's Built"},{id:"fluency",label:"Fluency"},
  {id:"hackathon",label:"Hackathon"},{id:"roadmap",label:"Roadmap"},{id:"metrics",label:"Metrics"},
  {id:"risks",label:"Risks"},{id:"governance",label:"Governance"},{id:"close",label:"The Ask"},
  {id:"closing",label:"Closing"},
];

const fadeUp=(d=0)=>({opacity:0,transform:"translateY(20px)",animation:`fadeUp 0.5s ease-out ${d}s forwards`});
const keyframes=`
@keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes flowDash{to{stroke-dashoffset:-24}}
@keyframes pulseGlow{0%,100%{opacity:.3}50%{opacity:.7}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes widthGrow{from{width:0}to{width:100%}}
`;

function ImageBanner({src,height=180,children,overlay="rgba(0,0,0,0.55)"}) {
  return (
    <div style={{position:"relative",borderRadius:14,overflow:"hidden",height}}>
      <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
      <div style={{position:"absolute",inset:0,background:overlay}}/>
      {children&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1}}>{children}</div>}
    </div>
  );
}

function AnimNum({value,suffix="",prefix=""}){
  const [d,setD]=useState(0);const ref=useRef(null);const s=useRef(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!s.current){s.current=true;const n=parseInt(value)||0;const t0=Date.now();
    const tick=()=>{const p=Math.min((Date.now()-t0)/1200,1);setD(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}},{threshold:0.3});
    if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[value]);
  return <span ref={ref}>{prefix}{d}{suffix}</span>;
}

function SectionLabel({children,delay=0}){
  return (<div style={{...fadeUp(delay),display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.blue,marginBottom:10}}>
    <div style={{width:20,height:2,background:`linear-gradient(90deg,${C.blue},${C.blue}44)`,borderRadius:1}}/>{children}</div>);
}

function BigStat({value,suffix="",prefix="",label,sub,delay=0,accent=C.blue}){
  const [h,setH]=useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      ...fadeUp(delay),background:C.card,border:`1px solid ${h?accent+"44":C.border}`,borderRadius:14,padding:"24px 20px",textAlign:"center",
      transition:"all 0.25s",boxShadow:h?`0 8px 30px ${accent}12`:"0 1px 3px rgba(0,0,0,0.04)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${accent},${accent}66)`,transform:h?"scaleX(1)":"scaleX(0.3)",transition:"transform 0.4s ease"}}/>
      <div style={{fontSize:42,fontWeight:900,color:accent,letterSpacing:"-0.03em",lineHeight:1}}><AnimNum value={parseInt(String(value).replace(/\D/g,""))} suffix={suffix} prefix={prefix}/></div>
      <div style={{fontSize:13,color:C.textPrimary,marginTop:8,fontWeight:700,lineHeight:1.3}}>{label}</div>
      {sub&&<div style={{fontSize:11,color:C.textMuted,marginTop:3,lineHeight:1.3}}>{sub}</div>}
    </div>);
}

function PhaseCard({phase,title,quarter,items,delay=0,active=false}){
  const [expanded,setExpanded]=useState(active);
  const accent=phase===1?C.blue:phase===2?C.red:C.greyDark;
  const accentBg=phase===1?C.blueLight:phase===2?"#FEF2F2":"#F3F4F6";
  const PI=phase===1?Wrench:phase===2?Layers:Target;
  return (<div style={{...fadeUp(delay)}}>
    <div data-clickable="true" onClick={e=>{e.stopPropagation();setExpanded(!expanded);}}
      style={{background:C.card,border:`1px solid ${expanded?accent+"44":C.border}`,borderRadius:14,padding:"18px 22px",cursor:"pointer",transition:"all 0.3s",boxShadow:expanded?`0 4px 16px ${accent}10`:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:expanded?14:0}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:accentBg,display:"flex",alignItems:"center",justifyContent:"center"}}><PI size={18} color={accent}/></div>
          <div><div style={{fontSize:14,fontWeight:800,color:C.textPrimary}}>{title}</div><div style={{fontSize:11,color:C.textMuted,fontWeight:500,marginTop:2,display:"flex",alignItems:"center",gap:4}}><Clock size={11}/>{quarter}</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{background:accentBg,color:accent,fontSize:11,fontWeight:800,padding:"3px 10px",borderRadius:20}}>Phase {phase}</div>
          <div style={{color:C.textMuted,transform:expanded?"rotate(180deg)":"rotate(0)",transition:"transform 0.3s"}}><ChevronDown size={16}/></div>
        </div>
      </div>
      {expanded&&<div style={{paddingTop:10,borderTop:`1px solid ${C.borderLight}`}}>{items.map((item,i)=>(
        <div key={i} style={{fontSize:12,color:C.textSecondary,lineHeight:1.6,marginBottom:6,paddingLeft:18,position:"relative",opacity:0,animation:`slideIn 0.35s ease-out ${i*0.06}s forwards`}}>
          <span style={{position:"absolute",left:0,top:2,color:accent}}>{i===items.length-1?<CheckCircle2 size={13}/>:<ArrowRight size={13}/>}</span>
          <span style={{fontWeight:i===items.length-1?600:400}}>{item}</span></div>))}</div>}
    </div>
  </div>);
}

// ── Flywheel with motion ──
function FlywheelDiagram({activeStage,setActiveStage}) {
  // 2×2 grid layout: Engage TL, Enable TR, Redesign BR, Focus BL
  const nodes=[
    {id:"engage",  label:"ENGAGE",  sub:"Measure", color:FW.engage,  x:110,y:110},
    {id:"enable",  label:"ENABLE",  sub:"Fluency",  color:FW.enable,  x:290,y:110},
    {id:"redesign",label:"REDESIGN",sub:"Automate", color:FW.redesign,x:290,y:290},
    {id:"focus",   label:"FOCUS",   sub:"Elevate",  color:FW.focus,   x:110,y:290},
  ];
  // Primary sequential edges (clockwise): Engage→Enable→Redesign→Focus→Engage
  const primary=[
    {from:"engage",  to:"enable",   color:FW.engage,  x1:138,y1:110,x2:262,y2:110},
    {from:"enable",  to:"redesign", color:FW.enable,  x1:290,y1:138,x2:290,y2:262},
    {from:"redesign",to:"focus",    color:FW.redesign,x1:262,y1:290,x2:138,y2:290},
    {from:"focus",   to:"engage",   color:FW.focus,   x1:110,y1:262,x2:110,y2:138},
  ];
  const mids=["ah-b","ah-g","ah-r","ah-k"];
  // Cross-connections (diagonal): Engage↔Redesign, Enable↔Focus
  const cross=[
    {ids:["engage","redesign"],x1:132,y1:132,x2:268,y2:268,label:"Measurement drives automation priorities"},
    {ids:["enable","focus"],   x1:268,y1:132,x2:132,y2:268,label:"Fluency makes high-value work possible"},
  ];

  return (
    <svg viewBox="0 0 400 400" style={{width:"100%",maxWidth:380,display:"block",margin:"0 auto"}}>
      <defs>
        {[[FW.engage,"ah-b"],[FW.enable,"ah-g"],[FW.redesign,"ah-r"],[FW.focus,"ah-k"]].map(([c,id])=>(
          <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill={c}/></marker>
        ))}
        <marker id="ah-cross" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill={C.blue} opacity="0.35"/>
        </marker>
        <filter id="ns"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
      </defs>

      {/* Pulse ring behind center */}
      <circle cx="200" cy="200" r="58" fill="none" stroke={C.blue} strokeWidth="0.5" opacity="0.08"
        style={{animation:"pulseGlow 4s ease-in-out infinite"}}/>

      {/* Cross-connections (diagonal, light dashed) */}
      {cross.map((cr,i)=>{
        const isA=cr.ids.some(id=>id===activeStage);
        return <line key={i} x1={cr.x1} y1={cr.y1} x2={cr.x2} y2={cr.y2}
          stroke={C.blue} strokeWidth={isA?1.5:1} strokeDasharray="4 6"
          opacity={isA?0.45:0.18} markerEnd="url(#ah-cross)"
          style={{transition:"all 0.3s"}}/>;
      })}

      {/* Primary sequential edges with flow animation */}
      {primary.map((a,i)=>{
        const isA=activeStage===a.from||activeStage===a.to;
        return <g key={i}>
          <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke={isA?a.color:C.grey+"44"} strokeWidth={isA?2.5:1.5}
            opacity={isA?0.9:0.3} markerEnd={`url(#${mids[i]})`} style={{transition:"all 0.3s"}}/>
          <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke={a.color} strokeWidth="2" strokeDasharray="3 18"
            opacity={isA?0.55:0.07} style={{animation:"flowDash 2s linear infinite"}}/>
        </g>;
      })}

      {/* Center hub */}
      <circle cx="200" cy="200" r="38" fill={C.blue}/>
      <circle cx="200" cy="200" r="38" fill="none" stroke={C.white} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="196" textAnchor="middle" fill={C.white} fontSize="13" fontWeight="900" fontFamily="Inter,system-ui" letterSpacing="0.08em">ONE</text>
      <text x="200" y="212" textAnchor="middle" fill={C.white} fontSize="13" fontWeight="900" fontFamily="Inter,system-ui" letterSpacing="0.08em">DAT</text>

      {/* Nodes */}
      {nodes.map(n=>{
        const isA=activeStage===n.id;
        const nr=isA?30:25;
        return <g key={n.id} style={{cursor:"pointer"}}
          onMouseEnter={()=>setActiveStage(n.id)} onMouseLeave={()=>setActiveStage(null)}>
          {isA&&<circle cx={n.x} cy={n.y} r={nr+14} fill={n.color} opacity="0.07" style={{animation:"pulseGlow 2s ease-in-out infinite"}}/>}
          <circle cx={n.x} cy={n.y} r={nr} fill={C.white} stroke={isA?n.color:C.border} strokeWidth={isA?2.5:1.5} filter="url(#ns)" style={{transition:"all 0.3s"}}/>
          <text x={n.x} y={n.y-2} textAnchor="middle" dominantBaseline="middle" fill={isA?n.color:C.greyDark}
            fontSize={isA?"9":"8"} fontWeight="800" fontFamily="Inter,system-ui" letterSpacing="0.06em" style={{transition:"fill 0.3s"}}>{n.label}</text>
          <text x={n.x} y={n.y+10} textAnchor="middle" dominantBaseline="middle" fill={C.textMuted}
            fontSize="7" fontWeight="500" fontFamily="Inter,system-ui">{n.sub}</text>
        </g>;
      })}
    </svg>
  );
}

// ── SLIDES ──

function TitleSlide() {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100%",textAlign:"center",position:"relative"}}>
      <div style={{position:"absolute",inset:0,overflow:"hidden",borderRadius:14}}>
        <img src="/img/waves.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.12}}/>
      </div>
      <div style={{maxWidth:800,position:"relative",zIndex:1}}>
        <div style={{...fadeUp(0.1),borderRadius:20,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
          <div style={{background:C.black,padding:"40px 48px 36px",position:"relative"}}>
            <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
              <img src="/img/network.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.08}}/>
            </div>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,marginBottom:24}}>
                <img src="/img/dat-logo.png" alt="DAT Freight & Analytics" style={{height:28}}/>
                <div style={{width:1,height:24,background:"rgba(255,255,255,0.15)"}}/>
                <OneDATTruck size={56} style={{filter:"brightness(1.1)"}}/>
              </div>
              <h1 style={{fontSize:"clamp(32px,4.5vw,50px)",fontWeight:900,color:C.white,lineHeight:1.1,letterSpacing:"-0.03em",margin:0}}>AI Fluency as DAT's</h1>
              <h1 style={{fontSize:"clamp(32px,4.5vw,50px)",fontWeight:900,color:"#0056FF",lineHeight:1.1,letterSpacing:"-0.03em",margin:"2px 0 0 0"}}>Competitive Edge</h1>
              <p style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginTop:18,lineHeight:1.6,maxWidth:480,margin:"18px auto 0"}}>How the People Team is challenging the status quo, eliminating yesterwork, and building the AI muscle that makes DAT faster than everyone else.</p>
            </div>
          </div>
          <div style={{position:"relative",height:72,overflow:"hidden"}}>
            <img src="/img/network.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,70,221,0.7),rgba(0,0,0,0.5))"}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1}}>
              <div style={{textAlign:"center",padding:"0 28px"}}>
                <div style={{fontSize:12,fontWeight:900,color:C.white,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:3}}>WE TAKE THE UNCERTAINTY OUT OF FREIGHT</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",lineHeight:1.5}}>Now the People Team is taking the uncertainty out of how we work. <span style={{fontWeight:700,color:C.white}}>Same mission. New frontier.</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:12,left:0,right:0,textAlign:"center",fontSize:11,color:C.textMuted,fontWeight:600,letterSpacing:"0.05em",opacity:0,animation:"fadeUp 0.5s ease-out 0.6s forwards"}}>April 2026</div>
    </div>
  );
}

function CostSlide() {
  return (
    <div>
      <SectionLabel>The Burning Platform</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>80 Hours of Yesterwork</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:16}}>
        Peter Hinssen calls it <span style={{fontWeight:700,color:C.black}}>yesterwork</span>: outdated processes designed before AI existed that silently eat capacity. These are DAT's estimated numbers based on team time studies and operational analysis.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:12}}>
        <BigStat value="80" suffix=" hrs" label="Estimated admin work per week" sub="Across all People pillars" delay={0.2} accent={C.red}/>
        <BigStat value="110" prefix="$" suffix="K" label="Annual tool spend at risk" sub="TalentWall, Crosschq, scheduling, recognition, reporting" delay={0.3} accent={C.yellow}/>
        <BigStat value="40" suffix=" reqs" label="Supported by 3 recruiters" sub="Full-lifecycle. Admin eats capacity meant for candidates" delay={0.4} accent={C.blue}/>
      </div>
      <div style={{...fadeUp(0.45),marginBottom:10}}>
        <ImageBanner src="/img/waves.jpg" height={44} overlay="linear-gradient(90deg,rgba(225,6,0,0.55),rgba(0,0,0,0.5))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>80 hours/week ≈ 2 full-time teammates doing work AI can meaningfully reduce</div>
        </ImageBanner>
      </div>
      <div style={{...fadeUp(0.5),background:C.card,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.border}`}}>
        <div style={{fontSize:10,fontWeight:700,color:C.greyDark,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.12em"}}>Where the 80 Hours Go</div>
        {[{label:"Comp verification & offer matching",hours:25,color:C.blue},{label:"Recruiter scheduling & coordination",hours:20,color:C.red},{label:"Manual reporting & data pulls",hours:15,color:C.yellow},{label:"Routing questions to the right person",hours:12,color:C.grey},{label:"Onboarding process management",hours:8,color:C.greyDark}].map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
            <div style={{width:70,fontSize:11,fontWeight:600,color:C.greyDark,textAlign:"right",flexShrink:0}}>{item.hours} hrs</div>
            <div style={{flex:1,height:24,background:C.bgAlt,borderRadius:6,overflow:"hidden",position:"relative"}}>
              <div style={{height:"100%",background:`linear-gradient(90deg,${item.color}18,${item.color}08)`,borderLeft:`3px solid ${item.color}`,width:`${(item.hours/25)*100}%`,borderRadius:6,display:"flex",alignItems:"center",paddingLeft:10,opacity:0,animation:`slideIn 0.6s ease-out ${0.5+i*0.1}s forwards`}}>
                <span style={{fontSize:11,color:C.textPrimary,fontWeight:500}}>{item.label}</span></div>
            </div>
          </div>
        ))}
        <div style={{marginTop:8,padding:"10px 14px",background:C.card,borderRadius:8,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.black}`}}>
          <div style={{fontSize:12,color:C.textPrimary,lineHeight:1.4,fontStyle:"italic"}}>"Yesterwork is the silent killer of organizations. We all have to become yesterwork hunters."</div>
          <div style={{fontSize:10,color:C.textMuted,marginTop:2}}>— Peter Hinssen, The Uncertainty Principle</div>
        </div>
      </div>
    </div>
  );
}

function FlywheelSlide() {
  const [activeStage,setActiveStage]=useState(null);
  const stages=[
    {id:"engage",icon:HeartPulse,color:FW.engage,label:"Engage",desc:"Measure what matters",detail:"Gallup Q12 tells us where teammates struggle. 70% of engagement variance traces to the manager. We measure so we know where to act.",evidence:"97% participation. Live dashboard. PBP coaching deployed."},
    {id:"enable",icon:Brain,color:FW.enable,label:"Enable",desc:"Build fluency and confidence",detail:"Structured around four competencies — Delegate, Describe, Discern, Diligence — across three modes of interaction. New teammates learn domain knowledge by working through AI, not just alongside senior people. ENABLE rebuilds the learning scaffold the old apprenticeship model provided.",evidence:"Claude access backlog growing. Demand outpacing our ability to train."},
    {id:"redesign",icon:Hammer,color:FW.redesign,label:"Redesign",desc:"Hunt the yesterwork",detail:"Systematically eliminate pre-AI processes. Automated comp verification, intelligent routing, scheduling agents. This is where the 80 hrs/wk gets reclaimed.",evidence:"Targeting 80 hrs/wk. $110K in tool spend addressable."},
    {id:"focus",icon:Crosshair,color:FW.focus,label:"Focus",desc:"Empower through job crafting",detail:"Freed capacity goes to what actually moves the business. Job crafting means teammates proactively redefine their roles around higher-order work — strategic business partnering, advisory support, deeper coaching. AI shifts the narrative from job insecurity to professional empowerment.",evidence:"Every tool built becomes a template for Eng, Product, Finance."},
  ];
  return (
    <div>
      <SectionLabel>Strategic Model</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>The One DAT Flywheel</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:16}}>
        One DAT is the destination. We get there through a cycle that compounds: measure engagement, enable fluency, hunt the yesterwork, and focus freed capacity on work that matters. Each turn makes the next one faster.
      </p>
      <div style={{...fadeUp(0.2),position:"relative",borderRadius:14,overflow:"hidden",marginBottom:14}}>
        <img src="/img/waves.jpg" alt="" style={{width:"100%",height:370,objectFit:"cover",display:"block",borderRadius:14}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(248,249,250,0.92),rgba(248,249,250,0.85))",borderRadius:14}}/>
        <div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"center",padding:"16px 20px",zIndex:1}}>
          <FlywheelDiagram activeStage={activeStage} setActiveStage={setActiveStage}/>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {stages.map(s=>{const Icon=s.icon;const isA=activeStage===s.id;return(
              <div key={s.id} data-clickable="true" onMouseEnter={()=>setActiveStage(s.id)} onMouseLeave={()=>setActiveStage(null)}
                style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",background:isA?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.75)",
                  border:`1px solid ${isA?s.color+"44":C.border}`,borderLeft:`3px solid ${s.color}`,transition:"all 0.25s",
                  boxShadow:isA?`0 2px 12px ${s.color}10`:"none",backdropFilter:"blur(4px)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:isA?5:0}}>
                  <div style={{width:26,height:26,borderRadius:6,background:s.color+"10",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon size={13} color={s.color}/></div>
                  <div><div style={{fontSize:12,fontWeight:800,color:s.color}}>{s.label}</div><div style={{fontSize:10,color:C.textMuted}}>{s.desc}</div></div>
                </div>
                {isA&&<div style={{paddingTop:5,borderTop:`1px solid ${C.borderLight}`,marginTop:2}}>
                  <div style={{fontSize:11,color:C.textSecondary,lineHeight:1.5,marginBottom:2}}>{s.detail}</div>
                  <div style={{fontSize:10,color:s.color,fontWeight:600,display:"flex",alignItems:"center",gap:3}}><CheckCircle2 size={10}/>{s.evidence}</div>
                </div>}
              </div>);})}
          </div>
        </div>
      </div>
      <div style={{...fadeUp(0.5),display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        {[{from:"Engage",to:"Enable",how:"Engagement data surfaces where learning gaps are — training targets those exactly",c:C.blue},
          {from:"Enable",to:"Redesign",how:"Fluent teammates redesign the processes they used to execute — new hires learn by redesigning, not by repeating",c:C.greyDark},
          {from:"Redesign",to:"Focus",how:"Automated work frees every level — new hires included — to do work that builds judgment, not just bandwidth",c:C.red},
          {from:"Focus",to:"Engage",how:"Job crafting → meaningful work → engagement rises → the flywheel fuels itself",c:C.black},
        ].map((l,i)=>(
          <div key={i} style={{background:C.card,borderRadius:8,padding:"10px 12px",border:`1px solid ${C.border}`,borderTop:`2px solid ${l.c}`}}>
            <div style={{fontSize:9,fontWeight:800,color:l.c,marginBottom:2,display:"flex",alignItems:"center",gap:3,letterSpacing:"0.05em"}}>{l.from}<ArrowRight size={8}/>{l.to}</div>
            <div style={{fontSize:10,color:C.textSecondary,lineHeight:1.4}}>{l.how}</div>
          </div>))}
      </div>
    </div>
  );
}

function LandscapeSlide() {
  const [ai,setAi]=useState(0);
  const rd=[{subject:"Self-Service",DAT:65,Industry:45},{subject:"Predictive Analytics",DAT:55,Industry:35},{subject:"Process Automation",DAT:70,Industry:50},{subject:"AI Routing & Triage",DAT:75,Industry:25},{subject:"Workforce Intelligence",DAT:60,Industry:40},{subject:"Teammate Experience",DAT:50,Industry:45}];
  const ins=[
    {source:"Gallup 2025",insight:"Global engagement fell to 21%, costing $8.9 trillion annually. 70% of that variance traces to the manager. Organizations investing in manager development see up to 28% improvement.",color:C.blue},
    {source:"Peter Hinssen",insight:"The People function needs a 'yesterwork hunter' mentality. Not adding new systems. Deciding which processes to drop entirely.",color:C.red},
    {source:"McKinsey 2025",insight:"Only 5% of organizations see measurable AI ROI. The difference: clear strategy, proper training, manager support. Tools without fluency fail.",color:C.greyDark},
    {source:"DAT Signal",insight:"The Claude access backlog tells our story. The GenAI Community of Practice (40+ attendees, bi-weekly) formed organically. Teammates are hungry for AI enablement. Demand is outpacing our ability to train.",color:C.blue},
  ];
  return (
    <div>
      <SectionLabel>Industry Context</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>Where We Stand</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:14}}>Self-assessed maturity vs. estimated industry averages. Ahead where we've built. Behind where we haven't invested yet.</p>
      <div style={{...fadeUp(0.18),marginBottom:14}}>
        <ImageBanner src="/img/waves.jpg" height={40} overlay="linear-gradient(90deg,rgba(0,70,221,0.65),rgba(0,0,0,0.5))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>92% of CHROs accelerating AI. Only 5% seeing ROI. The gap is fluency.</div>
        </ImageBanner>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{...fadeUp(0.2),background:C.card,borderRadius:14,padding:20,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:10,fontWeight:700,color:C.greyDark,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.12em"}}>DAT vs. Est. Industry Avg</div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={rd}><PolarGrid stroke={C.border}/><PolarAngleAxis dataKey="subject" tick={{fill:C.textMuted,fontSize:10}}/><PolarRadiusAxis tick={false} domain={[0,100]} axisLine={false}/>
              <Radar name="DAT" dataKey="DAT" stroke={C.blue} fill={C.blue} fillOpacity={0.12} strokeWidth={2}/>
              <Radar name="Industry" dataKey="Industry" stroke={C.grey} fill={C.grey} fillOpacity={0.04} strokeWidth={1.5} strokeDasharray="4 4"/>
              <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.textPrimary}}/>
            </RadarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:20,justifyContent:"center",marginTop:2}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:3,background:C.blue,borderRadius:2}}/><span style={{fontSize:10,color:C.textMuted}}>DAT</span></div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:3,background:C.grey,borderRadius:2}}/><span style={{fontSize:10,color:C.textMuted}}>Est. Industry Avg</span></div>
          </div>
        </div>
        <div style={{...fadeUp(0.3),display:"flex",flexDirection:"column",gap:7}}>
          {ins.map((item,i)=>(
            <div key={i} data-clickable="true" onClick={()=>setAi(i)} style={{
              background:i===ai?item.color+"05":C.card,borderRadius:10,padding:"12px 14px",
              border:`1px solid ${i===ai?item.color+"33":C.border}`,borderLeft:`3px solid ${item.color}`,
              cursor:"pointer",transition:"all 0.25s"}}>
              <div style={{fontSize:10,fontWeight:800,color:item.color,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:2}}>{item.source}</div>
              <div style={{fontSize:11,color:C.textSecondary,lineHeight:1.5,maxHeight:i===ai?100:18,overflow:"hidden",transition:"max-height 0.4s ease"}}>{item.insight}</div>
            </div>))}
        </div>
      </div>
    </div>
  );
}

function ProofSlide() {
  const [filter,setFilter]=useState("all");
  const proofs=[
    {name:"Engagement Intelligence Suite",desc:"Gallup Q12 dashboard (6 tabs, 97% participation) + PBP Coaching + Manager Actions.",status:"Live",accent:"#059669",icon:BarChart3,age:"Built in 3 weeks"},
    {name:"Comp Verification Engine",desc:"Automated Radford matching. Targets 25 hrs/wk of manual process.",status:"Prototype",accent:C.yellow,icon:Target,age:"First concept < 1 month ago"},
    {name:"Merit Cycle App",desc:"React app with role-based views. Replaced a 14-tab spreadsheet.",status:"Prototype",accent:C.yellow,icon:Monitor,age:"Designed and built in 2 weeks"},
    {name:"#ask-people-team Bot",desc:"n8n + Claude Sonnet routing. Auto-classifies and routes questions. V2 adds self-training.",status:"Prototype",accent:C.yellow,icon:Bot,age:"Concept to working prototype in days"},
    {name:"TA Sourcing Agent",desc:"AI pipeline building. Could replace TalentWall/Crosschq ($30K/yr).",status:"Planned",accent:C.blue,icon:Search,age:""},
    {name:"TA Scheduling Agent",desc:"Automated interview coordination. Targets 20 hrs/wk savings.",status:"Planned",accent:C.blue,icon:CalendarCheck,age:""},
    {name:"TA Analytics Dashboards",desc:"Real-time hiring velocity, pipeline health, source-of-hire.",status:"Planned",accent:C.blue,icon:TrendingUp,age:""},
    {name:"Recognition Platform",desc:"AI-assisted teammate recognition for Workplace Experience.",status:"Planned",accent:C.blue,icon:Award,age:""},
    {name:"Integration Builder",desc:"Custom Greenhouse → UKG integrations. Vendor quotes: $50K+ each.",status:"Planned",accent:C.blue,icon:ArrowLeftRight,age:""},
  ];
  const filtered=filter==="all"?proofs:proofs.filter(p=>p.status.toLowerCase()===filter);
  return (
    <div>
      <SectionLabel>Proof + Pipeline</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>Ideation to Action in Days</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:14}}>Every tool below moved from concept to working artifact in weeks, not quarters. The velocity is the proof.</p>
      <div style={{...fadeUp(0.2),display:"flex",gap:8,marginBottom:14}}>
        {["all","live","prototype","planned"].map(f=>(
          <button key={f} data-clickable="true" onClick={()=>setFilter(f)} style={{padding:"5px 14px",borderRadius:20,border:filter===f?"none":`1px solid ${C.border}`,background:filter===f?C.blue:C.white,color:filter===f?C.white:C.textMuted,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.2s",fontFamily:"'Inter',system-ui",textTransform:"capitalize"}}>{f==="all"?`All (${proofs.length})`:`${f} (${proofs.filter(p=>p.status.toLowerCase()===f).length})`}</button>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {filtered.map((p,i)=>{const Icon=p.icon;const sbg=p.accent==="#059669"?"#ECFDF5":p.accent===C.yellow?"#FFFBEB":C.blueLight;return(
          <div key={p.name} style={{...fadeUp(0.2+i*0.04),background:C.card,borderRadius:12,padding:"16px 14px",border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:8,right:8,background:sbg,color:p.accent,fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:10,textTransform:"uppercase",display:"flex",alignItems:"center",gap:2}}>
              {p.status==="Live"?<CheckCircle2 size={9}/>:p.status==="Prototype"?<Clock size={9}/>:<Sparkles size={9}/>}{p.status}</div>
            <div style={{width:30,height:30,borderRadius:8,background:p.accent+"10",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}}><Icon size={15} color={p.accent}/></div>
            <div style={{fontSize:12,fontWeight:800,color:C.textPrimary,marginBottom:2,paddingRight:50}}>{p.name}</div>
            <div style={{fontSize:10,color:C.textSecondary,lineHeight:1.5}}>{p.desc}</div>
            {p.age&&<div style={{fontSize:9,color:p.accent,fontWeight:700,marginTop:4,display:"flex",alignItems:"center",gap:3}}><Zap size={9}/>{p.age}</div>}
          </div>);})}
      </div>
      <div style={{...fadeUp(0.6),marginTop:10,padding:"8px 14px",background:"#ECFDF5",borderRadius:10,border:"1px solid #05966920",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        <DollarSign size={13} color="#059669"/><span style={{fontSize:11,color:C.textSecondary}}>Tool spend addressable: </span><span style={{fontSize:11,color:"#059669",fontWeight:800}}>$110K/year</span>
      </div>
    </div>
  );
}

function RoadmapSlide() {
  return (
    <div>
      <SectionLabel>Implementation</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>12-Month Roadmap</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:600,lineHeight:1.6,marginBottom:12}}>Quick wins first to build trust. Then scale with velocity.</p>
      <div style={{...fadeUp(0.18),marginBottom:14}}>
        <ImageBanner src="/img/network.jpg" height={40} overlay="linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,70,221,0.5))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>Q2 Foundation → Q3 Scale → Q4 Optimize · Phase 1 already underway</div>
        </ImageBanner>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <PhaseCard phase={1} title="Foundation & Quick Wins" quarter="Q2 2026 (Now → June)" active={true} delay={0.2} items={["Publish AI usage policy to People Hub","Formalize live tools: Engagement Suite + routing bot prototype","Launch 'AI at DAT' resource page","Pilot bot self-training loop (V2)","First cross-functional AI sprint: one impossible task, 6-week timebox","Milestone: 3 visible wins at All Hands. Trust established."]}/>
        <PhaseCard phase={2} title="Scale & Integrate" quarter="Q3 2026 (July → Sept)" delay={0.35} items={["Comp verification engine live — 25 hrs/wk savings target","TA dashboards V1 — pipeline health and hiring velocity","AI fluency program launches: 4Ds curriculum across Foundations → Practitioner → Builder","Automated onboarding across all 6 locations","Milestone: 50% of repetitive processes automated."]}/>
        <PhaseCard phase={3} title="Optimize & Extend" quarter="Q4 2026 (Oct → Dec)" delay={0.5} items={["Predictive retention modeling → proactive manager alerts","Skills inventory across all locations and acquired populations","Manager AI toolkit: coaching prompts, performance writing, team analysis — managers as the translators who embed AI culture into daily workflows","People data integrated with Finance forecasting","Milestone: 75% automation. Fluency embedded. Playbook for other functions."]}/>
      </div>
    </div>
  );
}

function FluencySlide({ onSwitchMode }) {
  const [at,setAt]=useState(0);
  const [view,setView]=useState(0); // 0 = Program, 1 = Hiring Rubric, 2 = Measure It
  const tiers=[
    {level:"Foundations",who:"All 700 teammates (role-specific tracks)",hours:"2-4 hrs",color:C.blue,icon:Users,mode:"Automation",items:["Delegate: identify tasks AI handles vs. humans own","Describe: structured prompting (role, task, constraints)","Discern: spot hallucinations, check outputs before sharing","Diligence: data privacy rules and approved tools at DAT"]},
    {level:"Practitioner",who:"Managers + domain ICs (persona-based pathways)",hours:"8-12 hrs",color:C.greyDark,icon:Wrench,mode:"Augmentation",items:["Delegate: map full workflows for human/AI collaboration","Describe: multi-step instructions and chain-of-thought","Discern: evaluate AI reasoning, catch premature convergence","Diligence: bias testing in hiring, promotion, comp decisions"]},
    {level:"Builder",who:"Power users + Talent Ops (AI orchestrators)",hours:"20+ hrs",color:C.red,icon:Sparkles,mode:"Agency",items:["Delegate: design autonomous agents and multi-step workflows","Describe: system prompts, tool orchestration, API chaining","Discern: quality frameworks for AI-generated artifacts","Diligence: audit trails, governance, teaching others"]},
  ];
  const pillars=[
    {title:"AI Mindset",icon:Brain,color:C.blue,bar:"Curiosity over caution. Experiments over excuses.",items:["Views AI as a thought partner, not just a shortcut — brings it into their core workflow","Actively experiments, learns, and shares what works across the team","Comfortable iterating — doesn't wait for the perfect prompt before trying","Understands the difference between delegation and abdication of judgment"]},
    {title:"Strategy",icon:Target,color:C.greyDark,bar:"Applies AI to what actually moves DAT forward.",items:["Articulates specific, repeatable AI use cases tied to their role at DAT","Thinks beyond personal productivity — connects AI impact to team or customer outcomes","Knows when NOT to use AI: high-stakes decisions, sensitive data, regulated contexts","Understands DAT's freight and data domain well enough to evaluate AI output in context"]},
    {title:"Building",icon:Wrench,color:C.red,bar:"Shows their work. Iterates in real time.",items:["Demonstrates real-time AI usage — strongest candidates show iteration, not polished output","Builds repeatable systems and workflows, not one-off prompts","Uses AI as a thought partner to deepen reasoning, not just to produce faster drafts","Elevates teammates — their fluency raises the floor for everyone around them"]},
    {title:"Accountability",icon:Shield,color:C.black,bar:"You can delegate the work. Not the accountability.",items:["Defines quality standards before prompting — knows what good looks like before the AI runs","Critically evaluates AI output before sharing: catches errors, bias, and hallucinations","Owns the outcome regardless of how much AI contributed to producing it","Follows DAT's responsible AI and data privacy guidelines without exception or shortcut"]},
  ];
  return (
    <div>
      <SectionLabel>Capability Building</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 10px 0"}}>AI Fluency Program</h2>
      <div style={{...fadeUp(0.12),display:"flex",gap:0,marginBottom:14,background:C.bgAlt,borderRadius:10,padding:3}}>
        {["Capability Program","Hiring Rubric","Measure It"].map((label,i)=>(
          <button key={i} data-clickable="true" onClick={()=>setView(i)} style={{flex:1,padding:"9px 14px",borderRadius:8,border:"none",background:i===view?C.card:"transparent",color:i===view?C.blue:C.textMuted,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:i===view?"0 2px 8px rgba(0,0,0,0.06)":"none",transition:"all 0.25s",fontFamily:"'Inter',system-ui"}}>{label}</button>
        ))}
      </div>

      {view===0&&(
        <div>
          <div style={{...fadeUp(0.15),background:C.card,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.blue}`,marginBottom:10}}>
            <div style={{fontSize:13,color:C.textPrimary,fontStyle:"italic",lineHeight:1.6}}>"The apprenticeship model is broken. Junior teammates used to learn by doing repetitive work alongside experienced people. AI compressed that cycle overnight."</div>
            <div style={{fontSize:11,color:C.textMuted,marginTop:6,fontWeight:600}}>&#8212; Ethan Mollick, <em>Co-Intelligence</em> (Wharton)</div>
            <div style={{fontSize:12,color:C.textSecondary,marginTop:8,lineHeight:1.5}}>We can't just name it. The new apprenticeship is structured around four competencies — Delegate, Describe, Discern, Diligence — at three levels of depth. Junior teammates learn domain knowledge <em>through</em> AI, building judgment in the process.</div>
          </div>
          <div style={{...fadeUp(0.16),display:"flex",gap:6,marginBottom:10}}>
            {[{d:"Delegate",desc:"What to hand AI",icon:ArrowLeftRight},{d:"Describe",desc:"How to instruct",icon:BookOpen},{d:"Discern",desc:"How to evaluate",icon:Search},{d:"Diligence",desc:"Ethics & trust",icon:Shield}].map((item,i)=>{const I=item.icon;return(
              <div key={i} style={{flex:1,background:C.bgAlt,borderRadius:8,padding:"8px 10px",textAlign:"center",border:`1px solid ${C.border}`}}>
                <I size={13} color={C.blue} style={{marginBottom:3,display:"inline-block"}}/>
                <div style={{fontSize:11,fontWeight:800,color:C.textPrimary}}>{item.d}</div>
                <div style={{fontSize:9,color:C.textMuted}}>{item.desc}</div>
              </div>);})}
          </div>
          <div style={{...fadeUp(0.18),display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
            <div style={{background:C.blueLight,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.blue}12`,display:"flex",alignItems:"center",gap:10}}>
              <Cpu size={15} color={C.blue} style={{flexShrink:0}}/>
              <div style={{fontSize:11,color:C.textSecondary}}><span style={{fontWeight:700,color:C.blue}}>Demand is real.</span> Claude access backlog keeps growing. GenAI COP has 40+ attendees bi-weekly.</div>
            </div>
            <div style={{background:C.card,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
              <Database size={15} color="#059669" style={{flexShrink:0}}/>
              <div style={{fontSize:11,color:C.textSecondary}}><span style={{fontWeight:700,color:"#059669"}}>Data literacy is the foundation.</span> AI fluency extends data literacy. Can't evaluate output without understanding data quality and bias.</div>
            </div>
            <div style={{background:C.card,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
              <BookOpen size={15} color={C.greyDark} style={{flexShrink:0}}/>
              <div style={{fontSize:11,color:C.textSecondary}}><span style={{fontWeight:700,color:C.greyDark}}>Delivery model.</span> Foundations: async + COP sessions. Practitioner: cohort-based with managers. Builder: hands-on sprints with Talent Ops.</div>
            </div>
          </div>
          <div style={{...fadeUp(0.25),display:"flex",gap:0,marginBottom:14,background:C.bgAlt,borderRadius:10,padding:3}}>
            {tiers.map((t,i)=>{const TI=t.icon;return(
              <button key={i} data-clickable="true" onClick={()=>setAt(i)} style={{flex:1,padding:"9px 14px",borderRadius:8,border:"none",background:i===at?C.card:"transparent",color:i===at?t.color:C.textMuted,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:i===at?"0 2px 8px rgba(0,0,0,0.06)":"none",transition:"all 0.25s",fontFamily:"'Inter',system-ui",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><TI size={13}/>{t.level}</button>);})}
          </div>
          <div style={{background:C.card,borderRadius:14,padding:"20px 18px",border:`1px solid ${tiers[at].color}22`,transition:"all 0.3s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div><div style={{fontSize:20,fontWeight:900,color:tiers[at].color}}>{tiers[at].level}</div><div style={{fontSize:12,color:C.textMuted,marginTop:2}}>{tiers[at].who}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{background:C.blue+"10",color:C.blue,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6}}>{tiers[at].mode}</div>
                <div style={{background:tiers[at].color+"10",color:tiers[at].color,fontSize:12,fontWeight:700,padding:"5px 12px",borderRadius:8,display:"flex",alignItems:"center",gap:4}}><Clock size={12}/>{tiers[at].hours}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {tiers[at].items.map((item,j)=>(
                <div key={`${at}-${j}`} style={{fontSize:12,color:C.textSecondary,lineHeight:1.5,padding:"10px 12px",background:C.bgAlt,borderRadius:8,display:"flex",alignItems:"center",gap:8,opacity:0,animation:`slideIn 0.3s ease-out ${j*0.06}s forwards`}}>
                  <CheckCircle2 size={13} color={tiers[at].color} style={{flexShrink:0}}/>{item}</div>))}
            </div>
          </div>
        </div>
      )}

      {view===1&&(
        <div style={{...fadeUp(0.1)}}>
          <div style={{background:C.black,borderRadius:12,padding:"16px 20px",marginBottom:12,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,right:0,width:120,height:120,background:`radial-gradient(circle,${C.blue}22 0%,transparent 70%)`,pointerEvents:"none"}}/>
            <div style={{fontSize:13,color:C.white,fontStyle:"italic",lineHeight:1.6,marginBottom:8}}>"We don't hire individual AI champions. We hire people who raise the floor for everyone around them."</div>
            <div style={{fontSize:11,color:C.grey,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>One DAT AI Fluency Standard</div>
          </div>

          <div style={{background:C.blueLight,borderRadius:10,padding:"12px 16px",marginBottom:12,border:`1px solid ${C.blue}22`,display:"flex",gap:12,alignItems:"flex-start"}}>
            <TrendingUp size={16} color={C.blue} style={{flexShrink:0,marginTop:2}}/>
            <div>
              <div style={{fontSize:12,fontWeight:800,color:C.blue,marginBottom:4}}>The Minimum Bar Has Moved</div>
              <div style={{fontSize:11,color:C.textSecondary,lineHeight:1.6}}>We're no longer looking for occasional AI use. Candidates must demonstrate AI <em>embedded into their core workflow</em> — repeatable systems, not one-off prompts — with clear impact on quality, efficiency, or outcomes. One-time experiments don't clear the bar.</div>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            {pillars.map((p,i)=>{const PI=p.icon;return(
              <div key={i} style={{background:C.card,borderRadius:12,padding:"14px 16px",border:`1px solid ${C.border}`,borderTop:`3px solid ${p.color}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <div style={{width:28,height:28,borderRadius:8,background:p.color==="#000000"?C.bgAlt:p.color+"12",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <PI size={14} color={p.color==="#000000"?C.greyDark:p.color}/>
                  </div>
                  <div>
                    <div style={{fontSize:12,fontWeight:800,color:C.textPrimary}}>{p.title}</div>
                    <div style={{fontSize:10,color:C.textMuted,lineHeight:1.3,fontStyle:"italic"}}>{p.bar}</div>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {p.items.map((item,j)=>(
                    <div key={j} style={{display:"flex",gap:7,alignItems:"flex-start"}}>
                      <div style={{width:4,height:4,borderRadius:"50%",background:p.color==="#000000"?C.greyDark:p.color,flexShrink:0,marginTop:5}}/>
                      <div style={{fontSize:10,color:C.textSecondary,lineHeight:1.5}}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            );})}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div style={{background:C.card,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
                <TrendingUp size={13} color={C.blue}/>
                <div style={{fontSize:11,fontWeight:800,color:C.textPrimary}}>Growth Trajectory</div>
              </div>
              <div style={{fontSize:10,color:C.textSecondary,lineHeight:1.6,marginBottom:8}}>We assess forward momentum, not just current capability. Where were they six months ago? Is their fluency accelerating? Candidates who plateau early — regardless of current skill level — are a yellow flag.</div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                {["Evidence of experimentation and self-directed learning","Adaptability as tools and models evolve rapidly","Shares learnings — a One DAT multiplier, not a solo operator"].map((item,i)=>(
                  <div key={i} style={{display:"flex",gap:6,alignItems:"flex-start"}}>
                    <ArrowRight size={10} color={C.blue} style={{flexShrink:0,marginTop:3}}/>
                    <div style={{fontSize:10,color:C.textSecondary,lineHeight:1.5}}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:C.card,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
                <Users size={13} color={C.red}/>
                <div style={{fontSize:11,fontWeight:800,color:C.textPrimary}}>Manager Standard</div>
              </div>
              <div style={{fontSize:10,color:C.textSecondary,lineHeight:1.6,marginBottom:8}}>Managers must clear a higher bar. Individual AI fluency is necessary but not sufficient — we assess whether they've actually led their team to adopt AI collectively.</div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                {["Created psychological safety for team experimentation","Redesigned at least one workflow so AI meaningfully changes how work gets done","Can point to team-level outcomes, not just personal productivity gains"].map((item,i)=>(
                  <div key={i} style={{display:"flex",gap:6,alignItems:"flex-start"}}>
                    <ArrowRight size={10} color={C.red} style={{flexShrink:0,marginTop:3}}/>
                    <div style={{fontSize:10,color:C.textSecondary,lineHeight:1.5}}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view===2&&(
        <div style={{...fadeUp(0.1)}}>
          <div style={{background:C.card,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.blue}`,marginBottom:12}}>
            <div style={{fontSize:13,color:C.textPrimary,lineHeight:1.6}}>The program sets the bar. The assessment tells you where you stand. Every teammate can run it against their own Claude history and get a role-specific read on five dimensions of AI fluency.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:14}}>
            {METRIC_ORDER.map((k,i)=>(
              <div key={k} style={{background:C.card,borderRadius:10,padding:"14px 12px",border:`1px solid ${C.border}`,borderTop:`3px solid ${METRIC_COLORS[k]}`,textAlign:"center"}}>
                <div style={{width:28,height:28,borderRadius:8,background:METRIC_COLORS[k]+"18",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:6}}>
                  <Gauge size={14} color={METRIC_COLORS[k]}/>
                </div>
                <div style={{fontSize:10,fontWeight:800,color:METRIC_COLORS[k],letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:3}}>{k}</div>
                <div style={{fontSize:11,fontWeight:700,color:C.textPrimary,lineHeight:1.3}}>{METRIC_LABELS[k]}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            <div style={{background:C.card,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`}}>
              <div style={{fontSize:11,fontWeight:800,color:C.blue,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>How It Works</div>
              <div style={{fontSize:11,color:C.textSecondary,lineHeight:1.6}}>Paste a prompt into Claude, fill in your role, and the model analyzes your conversation history against a DAT-specific rubric. Scores map to the three fluency tiers: <strong>Foundations</strong>, <strong>Practitioner</strong>, <strong>Builder</strong>.</div>
            </div>
            <div style={{background:C.card,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`}}>
              <div style={{fontSize:11,fontWeight:800,color:C.blue,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>What You Get</div>
              <div style={{fontSize:11,color:C.textSecondary,lineHeight:1.6}}>A score (1-10) on each metric, evidence from your own conversations, named strengths and gaps, and three role-specific recommendations to move a tier. Aggregate view informs team and org capability building.</div>
            </div>
          </div>
          <button onClick={()=>onSwitchMode&&onSwitchMode()} data-clickable="true" style={{width:"100%",background:C.black,color:C.white,border:"none",borderRadius:12,padding:"16px 20px",fontSize:13,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"'Inter',system-ui,sans-serif",letterSpacing:"0.01em"}}>
            <Gauge size={16}/>Ready to measure your own fluency? Run the assessment<ArrowRight size={16}/>
          </button>
        </div>
      )}
    </div>
  );
}

function GovernanceSlide() {
  const [tab,setTab]=useState("policy");
  return (
    <div>
      <SectionLabel>Responsible AI</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>Governance & Trust</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:12}}>Speed without trust is reckless. Diligence — the fourth D — means clear guardrails, transparency, and accountability. DAT professionals are the independent assessors of digital environments — our governance has to be as rigorous as what we ask of others.</p>
      <div style={{...fadeUp(0.18),marginBottom:14}}>
        <ImageBanner src="/img/network.jpg" height={40} overlay="linear-gradient(90deg,rgba(0,0,0,0.6),rgba(0,70,221,0.5))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>Build fast. Build responsibly. Build trust.</div>
        </ImageBanner>
      </div>
      <div style={{...fadeUp(0.2),display:"flex",gap:0,marginBottom:14,background:C.bgAlt,borderRadius:10,padding:3}}>
        {[{k:"policy",l:"AI Usage Policy",i:Shield},{k:"roper",l:"Roper Alignment",i:Building2}].map(t=>{const TI=t.i;return(
          <button key={t.k} data-clickable="true" onClick={()=>setTab(t.k)} style={{flex:1,padding:"9px 14px",borderRadius:8,border:"none",background:tab===t.k?C.card:"transparent",color:tab===t.k?C.blue:C.textMuted,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:tab===t.k?"0 1px 3px rgba(0,0,0,0.08)":"none",transition:"all 0.25s",fontFamily:"'Inter',system-ui",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><TI size={13}/>{t.l}</button>);})}
      </div>
      <div style={{background:C.card,borderRadius:14,padding:"20px 18px",border:`1px solid ${C.border}`}}>
        {tab==="policy"?(<>{["No proprietary or teammate data in public AI tools","Human review before external use of AI outputs","Approved tool list on People Hub (Claude, Copilot, DAT-specific)","Bias testing before AI touches hiring or promotion decisions","Transparency with teammates about where AI is used"].map((item,i)=>(
          <div key={i} style={{fontSize:13,color:C.textSecondary,lineHeight:1.6,marginBottom:7,paddingLeft:24,position:"relative",opacity:0,animation:`slideIn 0.3s ease-out ${i*0.06}s forwards`}}><span style={{position:"absolute",left:0,top:1}}><Shield size={13} color={C.blue}/></span>{item}</div>))}</>):
        (<>{["Align with Roper IT security and data classification","AI-specific terms in vendor contracts with Legal","Approved integrations: UKG, Greenhouse, 15Five","UKG modules: Onboarding, Merit Planning, Performance, Reporting, Integrations","All AI tools documented for audit readiness"].map((item,i)=>(
          <div key={i} style={{fontSize:13,color:C.textSecondary,lineHeight:1.6,marginBottom:7,paddingLeft:24,position:"relative",opacity:0,animation:`slideIn 0.3s ease-out ${i*0.06}s forwards`}}><span style={{position:"absolute",left:0,top:1}}><Building2 size={13} color={C.greyDark}/></span>{item}</div>))}</>)}
      </div>
    </div>
  );
}

function MetricsSlide() {
  const bd=[{name:"Process Automation",current:20,target:75},{name:"Self-Service",current:35,target:80},{name:"AI Fluency",current:15,target:75},{name:"Dashboard Coverage",current:40,target:90},{name:"Admin Reclaimed",current:10,target:60}];
  return (
    <div>
      <SectionLabel>Measurement</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>How We'll Know</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:600,lineHeight:1.6,marginBottom:12}}>Outcomes, not activity. Every metric maps to engagement, performance, or capacity.</p>
      <div style={{...fadeUp(0.18),marginBottom:12}}>
        <ImageBanner src="/img/network.jpg" height={38} overlay="linear-gradient(90deg,rgba(0,70,221,0.6),rgba(0,0,0,0.5))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>23% higher profitability in highly engaged orgs · 59% lower turnover · Gallup 2025</div>
        </ImageBanner>
      </div>
      <div style={{...fadeUp(0.2),background:C.card,borderRadius:12,padding:"16px 22px",border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:10,fontWeight:700,color:C.greyDark,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.12em",display:"flex",alignItems:"center",gap:6}}><TrendingUp size={12}/>Current → EOY 2026</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={bd} barGap={4}><XAxis dataKey="name" tick={{fill:C.textMuted,fontSize:10}} axisLine={false} tickLine={false} interval={0}/><YAxis tick={{fill:C.textMuted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,100]} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.textPrimary}} formatter={v=>[`${v}%`]}/>
            <Bar dataKey="current" name="Current" radius={[4,4,0,0]} maxBarSize={26}>{bd.map((_,i)=><Cell key={i} fill={C.border}/>)}</Bar>
            <Bar dataKey="target" name="EOY" radius={[4,4,0,0]} maxBarSize={26}>{bd.map((_,i)=><Cell key={i} fill={C.blue}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:20,justifyContent:"center",marginTop:4}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:10,background:C.border,borderRadius:2}}/><span style={{fontSize:10,color:C.textMuted}}>Current</span></div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:10,background:C.blue,borderRadius:2}}/><span style={{fontSize:10,color:C.textMuted}}>EOY 2026</span></div>
        </div>
      </div>
      <div style={{...fadeUp(0.4),display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {[{l:"Teammate Confidence",m:"75%",d:"Using AI tools by Q4 2026",c:C.blue,i:Brain},{l:"Decision Speed",m:"Real-time",d:"Quarterly PDF → live dashboards",c:C.greyDark,i:TrendingUp},{l:"Function Multiplier",m:"1→N",d:"Every tool becomes a template",c:C.black,i:Layers}].map((item,i)=>{
          const Icon=item.i;return(
          <div key={i} style={{background:C.card,borderRadius:10,padding:"12px 12px",border:`1px solid ${C.border}`,borderTop:`2px solid ${item.c}`}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><Icon size={12} color={item.c}/><span style={{fontSize:9,fontWeight:700,color:item.c,textTransform:"uppercase",letterSpacing:"0.05em"}}>{item.l}</span></div>
            <div style={{fontSize:20,fontWeight:900,color:item.c}}>{item.m}</div>
            <div style={{fontSize:9,color:C.textMuted,marginTop:2}}>{item.d}</div>
          </div>);})}
      </div>
    </div>
  );
}

function RisksSlide() {
  return (
    <div>
      <SectionLabel>Honest Assessment</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>What Could Go Wrong</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:600,lineHeight:1.6,marginBottom:12}}>Naming risks isn't hedging. It's how we build trust and plan around reality.</p>
      <div style={{...fadeUp(0.18),marginBottom:14}}>
        <ImageBanner src="/img/waves.jpg" height={40} overlay="linear-gradient(90deg,rgba(225,6,0,0.4),rgba(0,0,0,0.6))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>Every risk named. Every mitigation planned.</div>
        </ImageBanner>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {[{icon:UserX,title:"Concentration Risk",desc:"Built by one person. If unavailable, velocity drops to zero. Mitigation: Nat's team assumes ownership in Phase 2. Documentation built into every project.",color:C.red},
          {icon:Building2,title:"Roper IT Access",desc:"UKG capabilities exist. Bottleneck is Roper admin. Hard blocker for onboarding, merit, integrations. Mitigation: Specific modules named in our ask.",color:C.yellow},
          {icon:Database,title:"Data Quality",desc:"Four acquisitions left inconsistent job codes, bands, and records. AI is only as good as the data. Mitigation: Cleanup in Phase 1-2 milestones.",color:C.blue},
          {icon:TrendingUp,title:"Sustainability",desc:"This pace needs capacity. Without team growth, Phase 2-3 stalls. Mitigation: Planned Talent Ops Analyst and WX Manager roles are Phase 3 prerequisites.",color:C.greyDark},
        ].map((risk,i)=>{const Icon=risk.icon;return(
          <div key={i} style={{...fadeUp(0.2+i*0.08),background:C.card,borderRadius:14,padding:"18px 16px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${risk.color}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <div style={{width:32,height:32,borderRadius:8,background:risk.color+"08",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={16} color={risk.color}/></div>
              <div style={{fontSize:13,fontWeight:800,color:C.textPrimary}}>{risk.title}</div></div>
            <div style={{fontSize:11,color:C.textSecondary,lineHeight:1.6}}>{risk.desc}</div>
          </div>);})}
      </div>
    </div>
  );
}

function HackathonSlide() {
  const cards=[
    {icon:Users,title:"Cross-Functional Teams",body:"Up to 5 teammates per team. Any function, any level. Intentionally mixed."},
    {icon:Zap,title:"Open Goal",body:"Build something using AI that meaningfully changes how you or your team works. No prescribed output. Ambition is the metric."},
    {icon:Terminal,title:"Claude Code Access",body:"All participating teams receive time-limited access to Claude Code for the duration of the event. No prior coding experience required."},
    {icon:Trophy,title:"Real Reward",body:"Winning team receives a meaningful reward: team experience budget, conference stipend, or professional development investment. This is not symbolic."},
  ];
  return (
    <div>
      <SectionLabel>Activation</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>Build Something Impossible</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,lineHeight:1.6,maxWidth:640,margin:"0 0 10px 0"}}>Reading about AI builds awareness. Building with AI builds fluency. The Hackathon is where the program becomes real. Amy Edmondson calls this <span style={{fontWeight:700,color:C.black}}>intelligent failure</span>: taking smart risks in new territory where the learning justifies the attempt.</p>
      <div style={{...fadeUp(0.2),background:C.card,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.blue}`,marginBottom:14}}>
        <div style={{fontSize:13,color:C.textPrimary,fontStyle:"italic",lineHeight:1.6}}>{"\u201C"}The most successful teams I've seen implement AI are the ones given an impossible task — with no guarantee of success — and trusted to see how far they get.{"\u201D"}</div>
        <div style={{fontSize:11,color:C.textMuted,marginTop:6,fontWeight:600}}>&#8212; Ethan Mollick, Wharton Professor</div>
      </div>
      <div style={{...fadeUp(0.25),display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        {cards.map((c,i)=>{const I=c.icon;return(
          <div key={i} style={{background:C.card,borderRadius:12,padding:"16px 14px",border:`1px solid ${C.border}`,textAlign:"center"}}>
            <div style={{width:36,height:36,borderRadius:8,background:C.blueLight,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:8}}><I size={16} color={C.blue}/></div>
            <div style={{fontSize:13,fontWeight:800,color:C.textPrimary,marginBottom:4}}>{c.title}</div>
            <div style={{fontSize:11,color:C.textSecondary,lineHeight:1.5}}>{c.body}</div>
          </div>);})}
      </div>
      <div style={{...fadeUp(0.3),fontSize:10,color:C.textMuted,textAlign:"center",lineHeight:1.5,fontStyle:"italic"}}>Teams present to a review panel of leaders and technical stakeholders. Judged on creativity, impact potential, and boldness of the attempt.</div>
    </div>
  );
}

function ClosingSlide() {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"calc(100vh - 140px)",textAlign:"center",position:"relative",margin:"-32px -40px -48px -40px",padding:"80px 40px"}}>
      <div style={{position:"absolute",inset:0,background:C.black}}/>
      <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
        <img src="/img/network.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.08}}/>
      </div>
      <div style={{maxWidth:700,position:"relative",zIndex:1}}>
        <h1 style={{...fadeUp(0.1),fontSize:"clamp(36px,5vw,52px)",fontWeight:900,color:C.white,lineHeight:1.1,letterSpacing:"-0.03em",margin:0}}>AI First Does Not Mean People Last.</h1>
        <p style={{...fadeUp(0.3),fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.7,maxWidth:560,margin:"24px auto 0"}}>At DAT, AI fluency isn't about replacing people with tools. It's about giving our teammates more leverage, more capability, and more room to do work that actually matters. The future we're building is one where the technology handles the tedious and the people own the extraordinary.</p>
      </div>
    </div>
  );
}

function CloseSlide() {
  const asks=[
    {ask:"Jana + Jeff: 2-min AI segment at next All Hands",detail:"Name the initiative, show one tool live, signal this is a priority",icon:Users,priority:"Now"},
    {ask:"Approve UKG module access via Roper",detail:"Onboarding, Merit Planning, Performance, Reporting, Integrations",icon:Monitor,priority:"Now"},
    {ask:"Standing 15-min AI review on XLT or ELT agenda",detail:"Monthly. Progress, blockers, decisions needed",icon:Clock,priority:"Q2"},
    {ask:"Sponsor one cross-functional AI sprint",detail:"Small team, impossible task, 6-week timebox. First proof outside People Team",icon:Zap,priority:"Q2"},
    {ask:"AI fluency in performance expectations",detail:"Company-wide capability standard, not a checkbox. Signals long-term commitment",icon:Brain,priority:"Q3"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100%",textAlign:"center"}}>
      <div style={{maxWidth:720}}>
        <SectionLabel delay={0}>Next Steps</SectionLabel>
        <h2 style={{...fadeUp(0.1),fontSize:36,fontWeight:900,color:C.black,letterSpacing:"-0.03em",lineHeight:1.1,margin:"6px 0 0 0"}}>The momentum is here.</h2>
        <h2 style={{...fadeUp(0.2),fontSize:36,fontWeight:900,color:C.blue,letterSpacing:"-0.03em",lineHeight:1.1,margin:"2px 0 0 0"}}>Here's how to accelerate it.</h2>
        <p style={{...fadeUp(0.3),fontSize:13,color:C.textSecondary,lineHeight:1.6,maxWidth:500,margin:"14px auto 0"}}>
          We've proven the model works. Five decisions to scale it across DAT.
        </p>
        <div style={{...fadeUp(0.35),marginTop:16,display:"flex",flexDirection:"column",gap:6,textAlign:"left"}}>
          {asks.map((item,i)=>{const II=item.icon;return(
            <div key={i} style={{background:C.card,borderRadius:10,padding:"10px 14px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:30,height:30,borderRadius:7,background:C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><II size={14} color={C.blue}/></div>
              <div style={{flex:1,display:"flex",alignItems:"baseline",gap:6,flexWrap:"wrap"}}>
                <span style={{fontSize:13,fontWeight:800,color:C.textPrimary}}>{item.ask}</span>
                <span style={{fontSize:11,color:C.textMuted}}>{item.detail}</span>
              </div>
              <div style={{fontSize:9,fontWeight:800,color:item.priority==="Now"?C.red:C.blue,background:item.priority==="Now"?"#FEF2F2":C.blueLight,padding:"2px 8px",borderRadius:10,flexShrink:0}}>{item.priority}</div>
            </div>);})}
        </div>
        <div style={{...fadeUp(0.5),marginTop:16,background:C.white,border:`1px solid ${C.border}`,borderRadius:14,padding:"20px 28px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:900,color:C.blue,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:4}}>WE TAKE THE UNCERTAINTY OUT OF FREIGHT</div>
            <div style={{fontSize:16,fontWeight:800,color:C.black,lineHeight:1.3,letterSpacing:"-0.01em"}}>Now we take the uncertainty out of how we work.</div>
          </div>
          <OneDATSkyline height={88}/>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──
const SC={"title":TitleSlide,"cost":CostSlide,"flywheel":FlywheelSlide,"landscape":LandscapeSlide,"proof":ProofSlide,"roadmap":RoadmapSlide,"fluency":FluencySlide,"hackathon":HackathonSlide,"governance":GovernanceSlide,"metrics":MetricsSlide,"risks":RisksSlide,"close":CloseSlide,"closing":ClosingSlide};

export default function StrategyApp({ onSwitchMode }) {
  const [cur,setCur]=useState(0);const [sk,setSk]=useState(0);const [pres,setPres]=useState(false);const [hud,setHud]=useState(false);const [idle,setIdle]=useState(false);
  const cRef=useRef(null);const pRef=useRef(null);const hT=useRef(null);const iT=useRef(null);
  const go=(i)=>{if(i>=0&&i<slides.length){setCur(i);setSk(k=>k+1);if(cRef.current)cRef.current.scrollTop=0;}};
  const enterP=()=>{setPres(true);setIdle(false);if(pRef.current?.requestFullscreen)pRef.current.requestFullscreen().catch(()=>{});else if(pRef.current?.webkitRequestFullscreen)pRef.current.webkitRequestFullscreen();};
  const exitP=()=>{setPres(false);setIdle(false);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else if(document.webkitFullscreenElement)document.webkitExitFullscreen?.();};
  useEffect(()=>{const h=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement){setPres(false);setIdle(false);}};document.addEventListener("fullscreenchange",h);document.addEventListener("webkitfullscreenchange",h);return()=>{document.removeEventListener("fullscreenchange",h);document.removeEventListener("webkitfullscreenchange",h);};},[]);
  useEffect(()=>{const h=(e)=>{if(e.key==="ArrowRight"||e.key==="ArrowDown"||(pres&&e.key===" ")){e.preventDefault();go(cur+1);}if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();go(cur-1);}if(e.key==="Escape"&&pres)exitP();if((e.key==="f"||e.key==="F")&&!pres)enterP();};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[cur,pres]);
  const hPC=(e)=>{if(!pres)return;if(e.target.closest("button")||e.target.closest("a")||e.target.closest("input")||e.target.closest("select")||e.target.closest("[data-clickable]"))return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX-r.left<r.width*0.25)go(cur-1);else go(cur+1);};
  useEffect(()=>{if(!pres){setIdle(false);return;}const h=()=>{setIdle(false);setHud(true);clearTimeout(iT.current);clearTimeout(hT.current);iT.current=setTimeout(()=>setIdle(true),3000);hT.current=setTimeout(()=>setHud(false),3000);};window.addEventListener("mousemove",h);iT.current=setTimeout(()=>setIdle(true),3000);hT.current=setTimeout(()=>setHud(false),3000);return()=>{window.removeEventListener("mousemove",h);clearTimeout(iT.current);clearTimeout(hT.current);};},[pres]);
  const Slide=SC[slides[cur].id];

  if(pres){return(
    <div ref={pRef} onClick={hPC} style={{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,color:C.textPrimary,width:"100vw",height:"100vh",display:"flex",flexDirection:"column",cursor:idle?"none":"default",overflow:"hidden",position:"relative"}}>
      <style>{keyframes}</style><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <div ref={cRef} style={{flex:1,overflowY:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 64px 64px 64px"}}>
        <div key={sk} style={{width:"100%",maxWidth:1200,margin:"auto 0",animation:"scaleIn 0.3s ease-out forwards"}}><Slide onSwitchMode={onSwitchMode}/></div>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,height:3,background:C.border,zIndex:100}}><div style={{height:"100%",background:C.blue,width:`${((cur+1)/slides.length)*100}%`,transition:"width 0.4s ease"}}/></div>
      <div style={{position:"fixed",bottom:16,left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:12,background:`${C.white}EE`,backdropFilter:"blur(12px)",borderRadius:10,padding:"8px 16px",border:`1px solid ${C.border}`,opacity:hud?1:0,transition:"opacity 0.4s",pointerEvents:hud?"auto":"none",zIndex:101,boxShadow:"0 4px 12px rgba(0,0,0,0.06)"}}>
        <button onClick={(e)=>{e.stopPropagation();go(cur-1);}} disabled={cur===0} style={{background:"none",border:"none",color:cur===0?C.textMuted:C.textPrimary,cursor:cur===0?"default":"pointer",opacity:cur===0?0.3:1,padding:"4px 8px"}}><ChevronLeft size={18}/></button>
        <span style={{fontSize:12,color:C.greyDark,fontWeight:600,minWidth:50,textAlign:"center"}}>{cur+1}/{slides.length}</span>
        <button onClick={(e)=>{e.stopPropagation();go(cur+1);}} disabled={cur===slides.length-1} style={{background:"none",border:"none",color:cur===slides.length-1?C.textMuted:C.textPrimary,cursor:cur===slides.length-1?"default":"pointer",opacity:cur===slides.length-1?0.3:1,padding:"4px 8px"}}><ChevronRight size={18}/></button>
        <div style={{width:1,height:16,background:C.border,margin:"0 4px"}}/>
        <button onClick={(e)=>{e.stopPropagation();exitP();}} style={{background:"none",border:"none",color:C.greyDark,fontSize:11,cursor:"pointer",padding:"4px 8px",fontFamily:"'Inter',system-ui",fontWeight:600,display:"flex",alignItems:"center",gap:4}}><Minimize2 size={12}/>ESC</button>
      </div>
    </div>
  );}

  return(
    <div ref={pRef} style={{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,color:C.textPrimary,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <style>{keyframes}</style><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 24px",borderBottom:`1px solid ${C.border}`,flexShrink:0,background:C.white,zIndex:10,gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <div style={{width:28,height:28,borderRadius:6,background:C.black,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <img src="/img/dat-logo.png" alt="DAT" style={{width:"85%",height:"auto"}}/>
          </div>
          <OneDATTruck size={22}/>
          <span style={{fontSize:13,fontWeight:700,color:C.greyDark}}>AI Fluency</span>
        </div>
        <ModeToggle mode="strategy" onChange={(m)=>{if(m!=="strategy"&&onSwitchMode)onSwitchMode();}}/>
        <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <span style={{fontSize:12,color:C.textMuted,fontWeight:600}}>{cur+1}/{slides.length}</span>
          <button onClick={enterP} style={{padding:"6px 14px",borderRadius:8,border:"none",background:C.blue,color:C.white,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Inter',system-ui"}}><Play size={12} fill="white"/>Present</button>
        </div>
      </div>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{width:200,borderRight:`1px solid ${C.border}`,padding:"16px 0",overflowY:"auto",flexShrink:0,background:C.white}}>
          {slides.map((s,i)=>(<div key={s.id} onClick={()=>go(i)} style={{padding:"9px 20px",fontSize:12,fontWeight:i===cur?700:500,color:i===cur?C.blue:C.textMuted,background:i===cur?C.blueLight:"transparent",cursor:"pointer",transition:"all 0.2s",borderLeft:i===cur?`3px solid ${C.blue}`:"3px solid transparent"}}><span style={{opacity:0.35,marginRight:8,fontSize:10,fontWeight:600}}>{String(i+1).padStart(2,"0")}</span>{s.label}</div>))}
          <div style={{padding:"16px 20px 8px",borderTop:`1px solid ${C.border}`,marginTop:12}}>
            <div style={{fontSize:10,color:C.textMuted,lineHeight:1.6}}><span style={{fontWeight:700,color:C.greyDark}}>Shortcuts</span><br/><span style={{color:C.blue}}>F</span> — Present<br/><span style={{color:C.blue}}>← →</span> — Navigate<br/><span style={{color:C.blue}}>ESC</span> — Exit</div>
          </div>
        </div>
        <div ref={cRef} style={{flex:1,overflowY:"auto",padding:"32px 40px 48px 40px",background:C.bg}}>
          <div key={sk} style={{maxWidth:1000,margin:"0 auto",animation:"scaleIn 0.3s ease-out forwards"}}><Slide onSwitchMode={onSwitchMode}/></div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 24px",borderTop:`1px solid ${C.border}`,flexShrink:0,background:C.white}}>
        <button onClick={()=>go(cur-1)} disabled={cur===0} style={{padding:"7px 18px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:cur===0?C.textMuted:C.greyDark,fontSize:12,fontWeight:600,cursor:cur===0?"default":"pointer",opacity:cur===0?0.4:1,fontFamily:"'Inter',system-ui",display:"flex",alignItems:"center",gap:4}}><ChevronLeft size={14}/>Previous</button>
        <div style={{display:"flex",gap:4}}>{slides.map((_,i)=>(<div key={i} onClick={()=>go(i)} style={{width:i===cur?24:8,height:3,borderRadius:2,background:i===cur?C.blue:C.border,cursor:"pointer",transition:"all 0.3s"}}/>))}</div>
        <button onClick={()=>go(cur+1)} disabled={cur===slides.length-1} style={{padding:"7px 18px",borderRadius:8,border:"none",background:cur===slides.length-1?C.border:C.blue,color:C.white,fontSize:12,fontWeight:600,cursor:cur===slides.length-1?"default":"pointer",opacity:cur===slides.length-1?0.4:1,fontFamily:"'Inter',system-ui",display:"flex",alignItems:"center",gap:4}}>Next<ChevronRight size={14}/></button>
      </div>
    </div>
  );
}
