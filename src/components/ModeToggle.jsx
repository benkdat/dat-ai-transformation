import { C } from "./DATokens";

export default function ModeToggle({ mode, onChange }) {
  const opts = [
    { k: "strategy", label: "Strategy" },
    { k: "assess", label: "Assess Your Fluency" },
  ];
  return (
    <div
      style={{
        display: "inline-flex",
        background: C.bgAlt,
        borderRadius: 999,
        padding: 3,
        gap: 0,
        border: `1px solid ${C.border}`,
      }}
    >
      {opts.map((o) => {
        const active = mode === o.k;
        return (
          <button
            key={o.k}
            onClick={() => onChange(o.k)}
            style={{
              padding: "6px 16px",
              border: "none",
              background: active ? C.white : "transparent",
              color: active ? C.blue : C.textMuted,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              borderRadius: 999,
              boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.25s",
              fontFamily: "'Inter',system-ui,sans-serif",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
