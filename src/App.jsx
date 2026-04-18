import { useState, useEffect } from "react";
import StrategyApp from "./strategy/StrategyApp";
import AssessHub from "./assess/AssessHub";

const MODES = { STRATEGY: "strategy", ASSESS: "assess" };

const modeFromHash = () => {
  const h = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
  return h === MODES.ASSESS ? MODES.ASSESS : MODES.STRATEGY;
};

export default function App() {
  const [mode, setMode] = useState(modeFromHash);

  useEffect(() => {
    const onHash = () => setMode(modeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const switchTo = (next) => {
    setMode(next);
    if (typeof window !== "undefined") {
      window.location.hash = next === MODES.ASSESS ? MODES.ASSESS : MODES.STRATEGY;
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  if (mode === MODES.ASSESS) {
    return <AssessHub onSwitchMode={() => switchTo(MODES.STRATEGY)} />;
  }
  return <StrategyApp onSwitchMode={() => switchTo(MODES.ASSESS)} />;
}
