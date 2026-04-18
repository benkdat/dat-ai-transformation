import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { C } from "../components/DATokens";
import { FLUENCY_PROMPT_V3 } from "./fluencyPromptV3";

function Step({ n, title, children }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: C.blue,
          color: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
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

export default function PromptRunner() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(FLUENCY_PROMPT_V3);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Clipboard API unavailable — leave the text visible for manual copy.
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
        <Step n={1} title="Copy the assessment prompt">
          One click below. The prompt includes the full rubric and instructions.
        </Step>
        <Step n={2} title="Paste it into a new Claude conversation">
          Use claude.ai or Claude Code — anywhere you have your conversation history available.
        </Step>
        <Step n={3} title="Fill in your ROLE BLOCK, then let Claude run">
          The prompt walks you through the rest. Expect a full report with scores, evidence, and recommendations.
        </Step>
      </div>

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
            fluency-prompt-v3
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
            maxHeight: 320,
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
          {FLUENCY_PROMPT_V3}
        </pre>
      </div>

      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: C.textMuted,
        }}
      >
        <ExternalLink size={13} />
        <span>
          Open{" "}
          <a
            href="https://claude.ai/new"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.blue, fontWeight: 700, textDecoration: "none" }}
          >
            claude.ai
          </a>{" "}
          to paste the prompt into a fresh conversation.
        </span>
      </div>
    </div>
  );
}
