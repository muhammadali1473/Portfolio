import { ImageResponse } from "next/og";

// 180x180 Apple touch icon — Next.js will auto-serve this at /apple-icon.png
// and wire <link rel="apple-touch-icon"> into <head>.
export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: "84px",
          letterSpacing: "-0.06em",
          borderRadius: "36px",
        }}
      >
        <span>M</span>
        <span style={{ color: "#C9A063" }}>K</span>
      </div>
    ),
    size,
  );
}
