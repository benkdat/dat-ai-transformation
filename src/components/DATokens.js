// Shared DAT design tokens used across Strategy and Assess modes.
export const C = {
  blue: "#0046DD",
  blueOnBlack: "#0056FF",
  blueLight: "#E8EEFF",
  blueMuted: "rgba(0,70,221,0.06)",
  black: "#000000",
  white: "#FFFFFF",
  bg: "#F8F9FA",
  bgAlt: "#F0F2F5",
  card: "#FFFFFF",
  border: "#E9ECEF",
  borderLight: "#F0F2F5",
  grey: "#8A8D8F",
  greyMed: "#6E6B68",
  greyDark: "#565657",
  red: "#E10600",
  yellow: "#FFD700",
  textPrimary: "#000000",
  textSecondary: "#565657",
  textMuted: "#8A8D8F",
};

export const METRIC_COLORS = {
  PQ: "#0056FF",
  OD: "#4D84FF",
  WI: "#80A8FF",
  CSC: "#B3CCFF",
  EoI: "#E0EBFF",
};

export const METRIC_LABELS = {
  PQ: "Prompt Quality",
  OD: "Output Discipline",
  WI: "Workflow Integration",
  CSC: "Cross-Session Context",
  EoI: "Execution on Insight",
};

export const METRIC_ORDER = ["PQ", "OD", "WI", "CSC", "EoI"];

export const TIER_SCALE = [
  { range: "1-3", label: "Novice", color: "#8A8D8F" },
  { range: "4-5", label: "Functional", color: "#B3CCFF" },
  { range: "6-7", label: "Proficient", color: "#4D84FF" },
  { range: "7-8", label: "Advanced", color: "#0046DD" },
  { range: "8+", label: "Native", color: "#000000" },
];
