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
  DollarSign, UserX, Database, Cpu, Hammer, RefreshCcw, HeartPulse, Crosshair
} from "lucide-react";

const C = {
  blue:"#0046DD",blueOnBlack:"#0056FF",blueLight:"#E8EEFF",blueMuted:"rgba(0,70,221,0.06)",
  black:"#000000",white:"#FFFFFF",bg:"#F8F9FA",bgAlt:"#F0F2F5",
  card:"#FFFFFF",border:"#E2E5EA",borderLight:"#ECEEF1",
  grey:"#8A8D8F",greyMed:"#6E6B68",greyDark:"#565657",
  red:"#E10600",yellow:"#FFD700",yellowDark:"#C7A500",
  textPrimary:"#111827",textSecondary:"#4B5563",textMuted:"#9CA3AF",
};
const FW={engage:C.blue,enable:C.greyDark,redesign:C.red,focus:C.black};

const slides=[
  {id:"title",label:"Title"},{id:"cost",label:"Yesterwork"},{id:"flywheel",label:"The Flywheel"},
  {id:"landscape",label:"Landscape"},{id:"proof",label:"Built & Planned"},{id:"roadmap",label:"Roadmap"},
  {id:"fluency",label:"AI Fluency"},{id:"governance",label:"Governance"},{id:"metrics",label:"Metrics"},
  {id:"risks",label:"Risks"},{id:"close",label:"Next Steps"},
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
  const cx=200,cy=200,R=115;
  const nodes=[
    {id:"engage",label:"ENGAGE",sub:"Measure",color:FW.engage,x:cx,y:cy-R},
    {id:"enable",label:"ENABLE",sub:"Fluency",color:FW.enable,x:cx+R,y:cy},
    {id:"redesign",label:"REDESIGN",sub:"Automate",color:FW.redesign,x:cx,y:cy+R},
    {id:"focus",label:"FOCUS",sub:"Elevate",color:FW.focus,x:cx-R,y:cy},
  ];
  const arrows=[
    {from:"engage",to:"enable",color:FW.engage,d:"M 222 90 Q 315 75, 310 178"},
    {from:"enable",to:"redesign",color:FW.enable,d:"M 310 222 Q 325 315, 222 310"},
    {from:"redesign",to:"focus",color:FW.redesign,d:"M 178 310 Q 75 325, 90 222"},
    {from:"focus",to:"engage",color:FW.focus,d:"M 90 178 Q 75 75, 178 90"},
  ];
  const mids=["ah-b","ah-g","ah-r","ah-k"];

  return (
    <svg viewBox="0 0 400 400" style={{width:"100%",maxWidth:380,display:"block",margin:"0 auto"}}>
      <defs>
        {[[FW.engage,"ah-b"],[FW.enable,"ah-g"],[FW.redesign,"ah-r"],[FW.focus,"ah-k"]].map(([c,id])=>(
          <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill={c}/></marker>
        ))}
        <filter id="ns"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
      </defs>

      {/* Animated outer ring */}
      <circle cx={cx} cy={cy} r={R+48} fill="none" stroke={C.border} strokeWidth="0.5" strokeDasharray="2 8"
        style={{animation:"spinSlow 120s linear infinite",transformOrigin:`${cx}px ${cy}px`}}/>
      {/* Pulse ring */}
      <circle cx={cx} cy={cy} r={R+20} fill="none" stroke={C.blue} strokeWidth="0.5" opacity="0.08"
        style={{animation:"pulseGlow 4s ease-in-out infinite"}}/>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.blue} strokeWidth="1" opacity="0.06"/>

      {/* Arrows with flow animation */}
      {arrows.map((a,i)=>{
        const isA=activeStage===a.from||activeStage===a.to;
        return <g key={i}>
          <path d={a.d} fill="none" stroke={isA?a.color:C.grey+"44"} strokeWidth={isA?3:1.5} strokeLinecap="round"
            opacity={isA?0.9:0.25} markerEnd={`url(#${mids[i]})`} style={{transition:"all 0.3s"}}/>
          <path d={a.d} fill="none" stroke={a.color} strokeWidth="2" strokeDasharray="3 21" strokeLinecap="round"
            opacity={isA?0.6:0.08} style={{animation:"flowDash 2s linear infinite"}}/>
        </g>;
      })}

      {/* Center */}
      <circle cx={cx} cy={cy} r={42} fill={C.blue}/>
      <circle cx={cx} cy={cy} r={42} fill="none" stroke={C.white} strokeWidth="0.5" opacity="0.2"/>
      <text x={cx} y={cy-6} textAnchor="middle" fill={C.white} fontSize="14" fontWeight="900" fontFamily="Inter,system-ui" letterSpacing="0.08em">ONE</text>
      <text x={cx} y={cy+12} textAnchor="middle" fill={C.white} fontSize="14" fontWeight="900" fontFamily="Inter,system-ui" letterSpacing="0.08em">DAT</text>

      {/* Nodes with hover glow */}
      {nodes.map(n=>{
        const isA=activeStage===n.id;
        const nr=isA?28:24;
        return <g key={n.id} style={{cursor:"pointer"}}
          onMouseEnter={()=>setActiveStage(n.id)} onMouseLeave={()=>setActiveStage(null)}>
          {isA&&<circle cx={n.x} cy={n.y} r={nr+12} fill={n.color} opacity="0.08" style={{animation:"pulseGlow 2s ease-in-out infinite"}}/>}
          <circle cx={n.x} cy={n.y} r={nr} fill={C.white} stroke={isA?n.color:C.border} strokeWidth={isA?2.5:1.5} filter="url(#ns)" style={{transition:"all 0.3s"}}/>
          <text x={n.x} y={n.y-2} textAnchor="middle" dominantBaseline="middle" fill={isA?n.color:C.greyDark}
            fontSize={isA?"9":"8"} fontWeight="800" fontFamily="Inter,system-ui" letterSpacing="0.06em" style={{transition:"fill 0.3s"}}>{n.label}</text>
          <text x={n.x} y={n.y+9} textAnchor="middle" dominantBaseline="middle" fill={C.textMuted}
            fontSize="7" fontWeight="500" fontFamily="Inter,system-ui">{n.sub}</text>
        </g>;
      })}
    </svg>
  );
}

// ── People Ops Icon (The Horizon) ──
function PeopleOpsIcon({size=40,variant="dark"}) {
  const bg=variant==="light"?"#F0F2F5":"#000000";
  const fg=variant==="light"?"#0046DD":"#0056FF";
  const txt=variant==="light"?"#111827":"#FFFFFF";
  const dashC=variant==="light"?"#0046DD":"#FFFFFF";
  const dashO=variant==="light"?0.2:0.3;
  const subO=variant==="light"?0.7:0.85;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{display:"block",flexShrink:0}}>
      <rect x="0" y="0" width="200" height="200" rx="28" fill={bg}/>
      <path d="M30 192 L88 55 L112 55 L170 192" fill="none" stroke={fg} strokeWidth="2" opacity="0.35"/>
      <path d="M45 192 L91 55 L109 55 L155 192" fill={fg} opacity="0.03"/>
      <line x1="96" y1="130" x2="102" y2="65" stroke={dashC} strokeWidth="0.8" strokeDasharray="3 5" opacity={dashO}/>
      <circle cx="100" cy="28" r="13" fill={fg}/>
      <path d={`M82 50 Q82 38, 100 38 Q118 38, 118 50`} fill={fg}/>
      <line x1="86" y1="42" x2="48" y2="34" stroke={fg} strokeWidth="0.8" opacity="0.5"/>
      <circle cx="44" cy="33" r="3.5" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.6"/>
      <circle cx="44" cy="33" r="1.2" fill={fg} opacity="0.6"/>
      <line x1="114" y1="42" x2="152" y2="34" stroke={fg} strokeWidth="0.8" opacity="0.5"/>
      <circle cx="156" cy="33" r="3.5" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.6"/>
      <circle cx="156" cy="33" r="1.2" fill={fg} opacity="0.6"/>
      <line x1="82" y1="46" x2="34" y2="62" stroke={fg} strokeWidth="0.6" opacity="0.35"/>
      <circle cx="30" cy="64" r="3" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.45"/>
      <circle cx="30" cy="64" r="1" fill={fg} opacity="0.45"/>
      <line x1="118" y1="46" x2="166" y2="62" stroke={fg} strokeWidth="0.6" opacity="0.35"/>
      <circle cx="170" cy="64" r="3" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.45"/>
      <circle cx="170" cy="64" r="1" fill={fg} opacity="0.45"/>
      <line x1="84" y1="34" x2="56" y2="14" stroke={fg} strokeWidth="0.5" opacity="0.25"/>
      <circle cx="53" cy="12" r="2.5" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.35"/>
      <circle cx="53" cy="12" r="0.8" fill={fg} opacity="0.35"/>
      <line x1="116" y1="34" x2="144" y2="14" stroke={fg} strokeWidth="0.5" opacity="0.25"/>
      <circle cx="147" cy="12" r="2.5" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.35"/>
      <circle cx="147" cy="12" r="0.8" fill={fg} opacity="0.35"/>
      <line x1="100" y1="22" x2="100" y2="10" stroke={fg} strokeWidth="0.5" opacity="0.3"/>
      <circle cx="100" cy="7" r="2.5" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.4"/>
      <circle cx="100" cy="7" r="0.8" fill={fg} opacity="0.4"/>
      <text x="100" y="136" textAnchor="middle" fill={txt} fontFamily="Inter, system-ui" fontSize="16" fontWeight="900" letterSpacing="0.06em">PEOPLE</text>
      <text x="100" y="156" textAnchor="middle" fill={txt} fontFamily="Inter, system-ui" fontSize="16" fontWeight="900" letterSpacing="0.06em">OPS</text>
      <text x="100" y="178" textAnchor="middle" fill={fg} fontFamily="Inter, system-ui" fontSize="10" fontWeight="900" letterSpacing="0.1em" opacity={subO}>DAT FREIGHT &amp; ANALYTICS</text>
    </svg>
  );
}

// ── SLIDES ──

function TitleSlide() {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100%",textAlign:"center",position:"relative"}}>
      {/* Full background image */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",borderRadius:14}}>
        <img src="/img/waves.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.12}}/>
      </div>
      <div style={{maxWidth:800,position:"relative",zIndex:1}}>
        {/* Black hero box with DAT logo + title */}
        <div style={{...fadeUp(0.1),borderRadius:20,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
          <div style={{background:C.black,padding:"40px 48px 36px",position:"relative"}}>
            {/* Subtle image texture inside black box */}
            <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
              <img src="/img/network.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.08}}/>
            </div>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,marginBottom:24}}>
                <img src="/img/dat-logo.png" alt="DAT Freight & Analytics" style={{height:28}}/>
                <div style={{width:1,height:24,background:"rgba(255,255,255,0.15)"}}/>
                <PeopleOpsIcon size={48} variant="light"/>
              </div>
              <h1 style={{fontSize:"clamp(32px,4.5vw,50px)",fontWeight:900,color:C.white,lineHeight:1.1,letterSpacing:"-0.03em",margin:0}}>AI Fluency as DAT's</h1>
              <h1 style={{fontSize:"clamp(32px,4.5vw,50px)",fontWeight:900,color:"#0056FF",lineHeight:1.1,letterSpacing:"-0.03em",margin:"2px 0 0 0"}}>Competitive Edge</h1>
              <p style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginTop:18,lineHeight:1.6,maxWidth:480,margin:"18px auto 0"}}>How the People Team is challenging the status quo, eliminating yesterwork, and building the AI muscle that makes DAT faster than everyone else.</p>
            </div>
          </div>
          {/* Mission banner — attached to bottom of black box */}
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
        <div style={{...fadeUp(0.5),marginTop:20,fontSize:11,color:C.textMuted,fontWeight:600,letterSpacing:"0.05em"}}>March 2026</div>
      </div>
    </div>
  );
}

function CostSlide() {
  return (
    <div>
      <SectionLabel>The Burning Platform</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>80 Hours of Yesterwork</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:16}}>
        Peter Hinssen calls it <span style={{fontWeight:700,color:C.black}}>yesterwork</span>: outdated processes designed before AI existed that silently eat capacity. These are DAT's numbers.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:12}}>
        <BigStat value="80" suffix=" hrs" label="Admin work per week" sub="Across all People pillars" delay={0.2} accent={C.red}/>
        <BigStat value="110" prefix="$" suffix="K" label="Annual tool spend at risk" sub="TalentWall, Crosschq, scheduling, recognition, reporting" delay={0.3} accent={C.yellowDark}/>
        <BigStat value="40" suffix=" reqs" label="Supported by 3 recruiters" sub="Full-lifecycle. Admin eats capacity meant for candidates" delay={0.4} accent={C.blue}/>
      </div>
      <div style={{...fadeUp(0.45),marginBottom:10}}>
        <ImageBanner src="/img/waves.jpg" height={44} overlay="linear-gradient(90deg,rgba(225,6,0,0.55),rgba(0,0,0,0.5))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>80 hours/week = 2 full-time teammates doing work AI can handle</div>
        </ImageBanner>
      </div>
      <div style={{...fadeUp(0.5),background:C.card,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.border}`}}>
        <div style={{fontSize:10,fontWeight:700,color:C.greyDark,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.12em"}}>Where the 80 Hours Go</div>
        {[{label:"Comp verification & offer matching",hours:25,color:C.blue},{label:"Recruiter scheduling & coordination",hours:20,color:C.red},{label:"Manual reporting & data pulls",hours:15,color:C.yellowDark},{label:"Routing questions to the right person",hours:12,color:C.grey},{label:"Onboarding process management",hours:8,color:C.greyDark}].map((item,i)=>(
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
    {id:"enable",icon:Brain,color:FW.enable,label:"Enable",desc:"Build fluency and confidence",detail:"AI training, approved tools, self-service. The apprenticeship model broke. We're rebuilding it by giving teammates the skills to redesign their own work.",evidence:"Claude access backlog growing. Demand outpacing our ability to train."},
    {id:"redesign",icon:Hammer,color:FW.redesign,label:"Redesign",desc:"Hunt the yesterwork",detail:"Systematically eliminate pre-AI processes. Automated comp verification, intelligent routing, scheduling agents. This is where the 80 hrs/wk gets reclaimed.",evidence:"Targeting 80 hrs/wk. $110K in tool spend addressable."},
    {id:"focus",icon:Crosshair,color:FW.focus,label:"Focus",desc:"Redirect to high-value work",detail:"Freed capacity goes to what actually moves the business: better hiring decisions, deeper coaching, strategic workforce planning. 23% higher profitability in highly engaged orgs.",evidence:"Every tool built becomes a template for Eng, Product, Finance."},
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
        {[{from:"Engage",to:"Enable",how:"Gallup data reveals capability gaps → shapes training",c:C.blue},
          {from:"Enable",to:"Redesign",how:"Fluent teammates become yesterwork hunters",c:C.greyDark},
          {from:"Redesign",to:"Focus",how:"Reclaimed hours shift to strategic, high-impact work",c:C.red},
          {from:"Focus",to:"Engage",how:"Meaningful work → engagement rises → cycle accelerates",c:C.black},
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
    {source:"McKinsey 2026",insight:"Only 5% of organizations see measurable AI ROI. The difference: clear strategy, proper training, manager support. Tools without fluency fail.",color:C.greyDark},
    {source:"DAT Signal",insight:"The Claude access backlog tells our story. Teammates are hungry for AI enablement. Demand is outpacing our ability to train.",color:C.blue},
  ];
  return (
    <div>
      <SectionLabel>Industry Context</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>Where We Stand</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:14}}>Self-assessed maturity vs. industry benchmarks. Ahead where we've built. Behind where we haven't invested yet.</p>
      <div style={{...fadeUp(0.18),marginBottom:14}}>
        <ImageBanner src="/img/waves.jpg" height={40} overlay="linear-gradient(90deg,rgba(0,70,221,0.65),rgba(0,0,0,0.5))">
          <div style={{fontSize:10,fontWeight:700,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase"}}>92% of CHROs accelerating AI. Only 5% seeing ROI. The gap is fluency.</div>
        </ImageBanner>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{...fadeUp(0.2),background:C.card,borderRadius:14,padding:20,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:10,fontWeight:700,color:C.greyDark,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.12em"}}>DAT vs. Industry Avg</div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={rd}><PolarGrid stroke={C.border}/><PolarAngleAxis dataKey="subject" tick={{fill:C.textMuted,fontSize:10}}/><PolarRadiusAxis tick={false} domain={[0,100]} axisLine={false}/>
              <Radar name="DAT" dataKey="DAT" stroke={C.blue} fill={C.blue} fillOpacity={0.12} strokeWidth={2}/>
              <Radar name="Industry" dataKey="Industry" stroke={C.grey} fill={C.grey} fillOpacity={0.04} strokeWidth={1.5} strokeDasharray="4 4"/>
              <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.textPrimary}}/>
            </RadarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:20,justifyContent:"center",marginTop:2}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:3,background:C.blue,borderRadius:2}}/><span style={{fontSize:10,color:C.textMuted}}>DAT</span></div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:3,background:C.grey,borderRadius:2}}/><span style={{fontSize:10,color:C.textMuted}}>Industry</span></div>
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
    {name:"Comp Verification Engine",desc:"Automated Radford matching. Targets 25 hrs/wk of manual process.",status:"Prototype",accent:C.yellowDark,icon:Target,age:"First concept < 1 month ago"},
    {name:"Merit Cycle App",desc:"React app with role-based views. Replaced a 14-tab spreadsheet.",status:"Prototype",accent:C.yellowDark,icon:Monitor,age:"Designed and built in 2 weeks"},
    {name:"#ask-people-team Bot",desc:"n8n + Claude Sonnet routing. Auto-classifies and routes questions. V2 adds self-training.",status:"Prototype",accent:C.yellowDark,icon:Bot,age:"Concept to working prototype in days"},
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
        {filtered.map((p,i)=>{const Icon=p.icon;const sbg=p.accent==="#059669"?"#ECFDF5":p.accent===C.yellowDark?"#FFFBEB":C.blueLight;return(
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
        <PhaseCard phase={2} title="Scale & Integrate" quarter="Q3 2026 (July → Sept)" delay={0.35} items={["Comp verification engine live — 25 hrs/wk savings target","TA dashboards V1 — pipeline health and hiring velocity","AI fluency program launches: Foundations → Practitioner → Builder","Automated onboarding across all 6 locations","Milestone: 50% of repetitive processes automated."]}/>
        <PhaseCard phase={3} title="Optimize & Extend" quarter="Q4 2026 (Oct → Dec)" delay={0.5} items={["Predictive retention modeling → proactive manager alerts","Skills inventory across all locations and acquired populations","Manager AI toolkit: coaching prompts, performance writing, team analysis","People data integrated with Finance forecasting","Milestone: 75% automation. Fluency embedded. Playbook for other functions."]}/>
      </div>
    </div>
  );
}

function FluencySlide() {
  const [at,setAt]=useState(0);
  const tiers=[
    {level:"Foundations",who:"All 700 teammates",hours:"2-4 hrs",color:C.blue,icon:Users,items:["What AI can and can't do","Approved tools at DAT","Basic prompting skills","Data privacy essentials"]},
    {level:"Practitioner",who:"Managers + ICs",hours:"8-12 hrs",color:C.greyDark,icon:Wrench,items:["Advanced prompting & workflows","AI-assisted writing, analysis, code","Building personal automations","Evaluating AI outputs critically"]},
    {level:"Builder",who:"Power users + Talent Ops",hours:"20+ hrs",color:C.red,icon:Sparkles,items:["Prototyping tools and workflows","n8n / automation platforms","Data pipeline + dashboard creation","Teaching others — internal multiplier"]},
  ];
  return (
    <div>
      <SectionLabel>Capability Building</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>AI Fluency Program</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:10}}>The apprenticeship model is broken. Junior teammates used to learn by doing repetitive work alongside experienced people. AI compressed that cycle overnight. We can't just talk about it. We have to rebuild how people learn, and we have to do it now.</p>
      <div style={{...fadeUp(0.18),display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <div style={{background:C.blueLight,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.blue}12`,display:"flex",alignItems:"center",gap:10}}>
          <Cpu size={15} color={C.blue} style={{flexShrink:0}}/>
          <div style={{fontSize:11,color:C.textSecondary}}><span style={{fontWeight:700,color:C.blue}}>Demand is real.</span> Claude access backlog keeps growing. Teammates asking for enablement now.</div>
        </div>
        <div style={{background:C.card,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
          <TrendingUp size={15} color="#059669" style={{flexShrink:0}}/>
          <div style={{fontSize:11,color:C.textSecondary}}><span style={{fontWeight:700,color:"#059669"}}>ROI is proven.</span> Orgs with comprehensive training see 218% higher income per teammate. (McKinsey)</div>
        </div>
      </div>
      <div style={{...fadeUp(0.25),display:"flex",gap:0,marginBottom:14,background:C.bgAlt,borderRadius:10,padding:3}}>
        {tiers.map((t,i)=>{const TI=t.icon;return(
          <button key={i} data-clickable="true" onClick={()=>setAt(i)} style={{flex:1,padding:"9px 14px",borderRadius:8,border:"none",background:i===at?C.card:"transparent",color:i===at?t.color:C.textMuted,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:i===at?"0 2px 8px rgba(0,0,0,0.06)":"none",transition:"all 0.25s",fontFamily:"'Inter',system-ui",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><TI size={13}/>{t.level}</button>);})}
      </div>
      <div style={{background:C.card,borderRadius:14,padding:"20px 18px",border:`1px solid ${tiers[at].color}22`,transition:"all 0.3s"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div><div style={{fontSize:20,fontWeight:900,color:tiers[at].color}}>{tiers[at].level}</div><div style={{fontSize:12,color:C.textMuted,marginTop:2}}>{tiers[at].who}</div></div>
          <div style={{background:tiers[at].color+"10",color:tiers[at].color,fontSize:12,fontWeight:700,padding:"5px 12px",borderRadius:8,display:"flex",alignItems:"center",gap:4}}><Clock size={12}/>{tiers[at].hours}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {tiers[at].items.map((item,j)=>(
            <div key={`${at}-${j}`} style={{fontSize:12,color:C.textSecondary,lineHeight:1.5,padding:"10px 12px",background:C.bgAlt,borderRadius:8,display:"flex",alignItems:"center",gap:8,opacity:0,animation:`slideIn 0.3s ease-out ${j*0.06}s forwards`}}>
              <CheckCircle2 size={13} color={tiers[at].color} style={{flexShrink:0}}/>{item}</div>))}
        </div>
      </div>
    </div>
  );
}

function GovernanceSlide() {
  const [tab,setTab]=useState("policy");
  return (
    <div>
      <SectionLabel>Responsible AI</SectionLabel>
      <h2 style={{...fadeUp(0.1),fontSize:34,fontWeight:900,color:C.black,letterSpacing:"-0.02em",margin:"0 0 6px 0"}}>Governance & Trust</h2>
      <p style={{...fadeUp(0.15),fontSize:13,color:C.textSecondary,maxWidth:640,lineHeight:1.6,marginBottom:12}}>Speed without trust is reckless. Clear guardrails that enable experimentation.</p>
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
          {icon:Building2,title:"Roper IT Access",desc:"UKG capabilities exist. Bottleneck is Roper admin. Hard blocker for onboarding, merit, integrations. Mitigation: Specific modules named in our ask.",color:C.yellowDark},
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

function CloseSlide() {
  const asks=[
    {ask:"Champion AI fluency from the top",detail:"Jana + Jeff at All Hands and ELT",icon:Users},
    {ask:"Approve UKG module access",detail:"Onboarding, Merit Planning, Performance, Reporting, Integrations",icon:Monitor},
    {ask:"Add standing AI review to XLT or ELT",detail:"Monthly 15-min slot. Progress, blockers, decisions",icon:Clock},
    {ask:"AI fluency in performance expectations",detail:"Company-wide capability, not a checkbox",icon:Brain},
    {ask:"Sponsor one cross-functional AI sprint",detail:"Small team, impossible task, 6-week timebox",icon:Zap},
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
            </div>);})}
        </div>
        {/* Mission closing */}
        <div style={{...fadeUp(0.5),marginTop:16}}>
          <ImageBanner src="/img/waves.jpg" height={110} overlay="linear-gradient(135deg,rgba(0,70,221,0.75),rgba(0,0,0,0.55))">
            <div style={{textAlign:"center",padding:"0 32px"}}>
              <div style={{fontSize:12,fontWeight:900,color:C.white,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>WE TAKE THE UNCERTAINTY OUT OF FREIGHT</div>
              <div style={{fontSize:18,fontWeight:900,color:C.white,lineHeight:1.3,letterSpacing:"-0.01em",marginBottom:6}}>Now we take the uncertainty out of how we work.</div>
              <div style={{width:40,height:2,background:`linear-gradient(90deg,${C.white},rgba(255,255,255,0.3))`,borderRadius:1,margin:"0 auto 6px"}}/>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",letterSpacing:"0.05em"}}>DAT Freight & Analytics · People Team · March 2026</div>
            </div>
          </ImageBanner>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──
const SC={"title":TitleSlide,"cost":CostSlide,"flywheel":FlywheelSlide,"landscape":LandscapeSlide,"proof":ProofSlide,"roadmap":RoadmapSlide,"fluency":FluencySlide,"governance":GovernanceSlide,"metrics":MetricsSlide,"risks":RisksSlide,"close":CloseSlide};

export default function DATAITransformation() {
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
        <div key={sk} style={{width:"100%",maxWidth:1200,margin:"auto 0",animation:"scaleIn 0.3s ease-out forwards"}}><Slide/></div>
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
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 24px",borderBottom:`1px solid ${C.border}`,flexShrink:0,background:C.white,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:6,background:C.black,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <img src="/img/dat-logo.png" alt="DAT" style={{width:"85%",height:"auto"}}/>
          </div>
          <span style={{fontSize:13,fontWeight:700,color:C.greyDark}}>AI Fluency · The Competitive Talent Edge</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
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
          <div key={sk} style={{maxWidth:1000,margin:"0 auto",animation:"scaleIn 0.3s ease-out forwards"}}><Slide/></div>
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
