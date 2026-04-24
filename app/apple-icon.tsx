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
          background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 800,
          fontSize: "96px",
          letterSpacing: "-0.04em",
          borderRadius: "36px",
        }}
      >
        MA
      </div>
    ),
    size,
  );
}
