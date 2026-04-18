export default function OneDATSkyline({ height = 120, style = {} }) {
  return (
    <img
      src="/img/one-dat-skyline.svg"
      alt="One DAT skyline"
      style={{
        height,
        width: "auto",
        maxWidth: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}
