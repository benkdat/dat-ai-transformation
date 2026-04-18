export default function OneDATTruck({ size = 48, style = {} }) {
  return (
    <img
      src="/img/one-dat-truck.svg"
      alt="One DAT"
      style={{
        height: size,
        width: "auto",
        display: "block",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
