import { useState } from "react";
import { Copy, Check, ExternalLink, MessageSquare, Terminal, ArrowDown } from "lucide-react";
import { C } from "../components/DATokens";
import { FLUENCY_PROMPT_CHAT, FLUENCY_PROMPT_COMPANION } from "./fluencyPromptV3";

function Step({ n, title, children }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: C.blue,
          color: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.textPrimary, marginBottom: 2 }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

function PromptBlock({ label, filename, prompt }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Clipboard API unavailable — leave the text visible for manual copy.
    }
  };

  return (
    <div>
      {label && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: C.textMuted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          background: C.black,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {filename}
          </div>
          <button
            onClick={copy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: copied ? "#06c27e" : "rgba(255,255,255,0.04)",
              color: C.white,
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Inter',system-ui,sans-serif",
              transition: "all 0.2s",
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "16px 20px",
            maxHeight: 300,
            overflow: "auto",
            fontSize: 11.5,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.8)",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {prompt}
        </pre>
      </div>
    </div>
  );
}

function PathTab({ active, onClick, letter, title, subtitle, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "16px 18px",
        border: active ? `1px solid ${C.blue}` : `1px solid ${C.border}`,
        background: active ? C.blueLight : C.white,
        color: active ? C.blue : C.textPrimary,
        borderRadius: 12,
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.2s",
        fontFamily: "'Inter',system-ui,sans-serif",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: active ? C.blue : C.bgAlt,
          color: active ? C.white : C.textMuted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        {Icon ? <Icon size={16} /> : letter}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3, color: active ? C.blue : C.textMuted }}>
          Path {letter}
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: active ? C.blue : C.textPrimary, lineHeight: 1.2, marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: active ? C.blue : C.textMuted, lineHeight: 1.45, fontWeight: 500 }}>
          {subtitle}
        </div>
      </div>
    </button>
  );
}

function Callout({ children }) {
  return (
    <div
      style={{
        background: C.bgAlt,
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 12,
        color: C.textSecondary,
        lineHeight: 1.6,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.blue}`,
      }}
    >
      {children}
    </div>
  );
}

export default function PromptRunner() {
  const [path, setPath] = useState("A");

  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: C.textMuted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Pick your path
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <PathTab
          active={path === "A"}
          onClick={() => setPath("A")}
          letter="A"
          icon={MessageSquare}
          title="Chat-heavy"
          subtitle="Most of your AI work happens in Claude.ai conversations."
        />
        <PathTab
          active={path === "B"}
          onClick={() => setPath("B")}
          letter="B"
          icon={Terminal}
          title="Chat + Claude Code"
          subtitle="You also build in Claude Code — custom skills, MCP servers, shipped repos, scheduled agents."
        />
      </div>

      {path === "A" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Callout>
            <strong>Use Path A</strong> if your AI fluency shows up primarily in Claude.ai conversations. The chat prompt below analyzes your history directly — no local setup needed.
          </Callout>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Step n={1} title="Open a new Claude.ai conversation">
              Go to{" "}
              <a
                href="https://claude.ai/new"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.blue, fontWeight: 700, textDecoration: "none" }}
              >
                claude.ai/new
              </a>
              . Don't type anything yet.
            </Step>
            <Step n={2} title="Copy the Assessment Prompt below">
              One click on the Copy button.
            </Step>
            <Step n={3} title="Paste it into the message box — but don't send">
              You need to edit it first.
            </Step>
            <Step n={4} title="Fill in the ORG BLOCK and ROLE BLOCK">
              Scroll through the pasted prompt. Replace every <code style={{ background: C.bgAlt, padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>{"<<FILL IN: ...>>"}</code> marker with your own details. DAT teammates: copy the populated ORG BLOCK from Appendix C of the prompt.
            </Step>
            <Step n={5} title="Pick a MODE">
              <strong>INTERNAL</strong> for self-review (names and projects allowed).{" "}
              <strong>EXTERNAL</strong> if you plan to share the output on LinkedIn (all identifying names stripped).
            </Step>
            <Step n={6} title="Send">
              Claude pulls your conversation history, applies the rubric, and produces the written report plus 11 output files.
            </Step>
          </div>

          <PromptBlock
            label="Assessment prompt"
            filename="ai-fluency-assessment-v3.md"
            prompt={FLUENCY_PROMPT_CHAT}
          />
        </div>
      )}

      {path === "B" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Callout>
            <strong>Use Path B</strong> if meaningful AI fluency evidence lives outside chat — custom skills in <code style={{ background: C.white, padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>~/.claude/</code>, MCP servers you built, shipped repos tied to your role, scheduled agents, or plan-mode artifacts. You'll run two prompts: one in Claude Code to generate an evidence bundle, then the main assessment in Claude.ai with that bundle attached.
          </Callout>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Step n={1} title="Open Claude Code on your machine">
              Any directory works — the companion inspects <code style={{ background: C.bgAlt, padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>~/.claude/</code> and <code style={{ background: C.bgAlt, padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>~/Projects/</code> regardless of CWD.
            </Step>
            <Step n={2} title="Copy the Claude Code Companion prompt below">
              Paste it into Claude Code and fill in the ORG BLOCK + ROLE BLOCK at the top. Use the same values you'll paste into Claude.ai.
            </Step>
            <Step n={3} title="Send. Claude Code produces an evidence bundle">
              Output starts with <code style={{ background: C.bgAlt, padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>## SUPPLEMENTAL ROLE-RELEVANT EVIDENCE</code>. It takes ~1–2 minutes.
            </Step>
            <Step n={4} title="Copy the entire bundle">
              Select from the <code style={{ background: C.bgAlt, padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>## SUPPLEMENTAL...</code> header through the final "Paste this entire bundle..." line.
            </Step>
            <Step n={5} title="Open a new Claude.ai conversation">
              Go to{" "}
              <a
                href="https://claude.ai/new"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.blue, fontWeight: 700, textDecoration: "none" }}
              >
                claude.ai/new
              </a>
              .
            </Step>
            <Step n={6} title="Paste the Assessment Prompt, THEN the evidence bundle, in one message">
              Order matters: Assessment Prompt first, then a blank line, then your bundle. Fill in the ORG BLOCK and ROLE BLOCK in the Assessment Prompt to match what you used in the companion. Pick a MODE.
            </Step>
            <Step n={7} title="Send">
              Claude reads both: the rubric/role context plus the local infrastructure bundle. Your Metric 3 and Metric 5 scores reflect your full surface area, not just chat.
            </Step>
          </div>

          <PromptBlock
            label="1. Claude Code Companion prompt (run this first, in Claude Code)"
            filename="ai-fluency-companion-v3.md"
            prompt={FLUENCY_PROMPT_COMPANION}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.textMuted,
              fontSize: 12,
              fontWeight: 600,
              gap: 8,
              padding: "4px 0",
            }}
          >
            <ArrowDown size={14} />
            Then run this in Claude.ai, with the bundle pasted after it
            <ArrowDown size={14} />
          </div>

          <PromptBlock
            label="2. Assessment prompt (run this second, in Claude.ai)"
            filename="ai-fluency-assessment-v3.md"
            prompt={FLUENCY_PROMPT_CHAT}
          />
        </div>
      )}

      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: C.textMuted,
        }}
      >
        <ExternalLink size={13} />
        <span>
          Not sure which path fits? Start with Path A — you can always rerun with the bundle later.
        </span>
      </div>
    </div>
  );
}
