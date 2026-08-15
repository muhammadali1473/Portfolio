import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A18",
          color: "#FDFBF7",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 800,
          fontSize: "17px",
          letterSpacing: "-0.06em",
          borderRadius: "6px",
        }}
      >
        <span>M</span>
        <span style={{ color: "#C9A063" }}>K</span>
      </div>
    ),
    size,
  );
}
