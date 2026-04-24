import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Ali — Full-Stack Developer & AI Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0F",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1200px 600px at 15% -10%, rgba(139,92,246,0.45), transparent 60%), radial-gradient(1000px 500px at 95% 10%, rgba(6,182,212,0.3), transparent 60%), radial-gradient(900px 500px at 50% 110%, rgba(59,130,246,0.3), transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "20px",
            color: "#A1A1AA",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: 0,
            }}
          >
            MA
          </div>
          Muhammad Ali
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#FAFAFA",
              maxWidth: "930px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Building&nbsp;</span>
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              intelligent
            </span>
            <span>&nbsp;products for&nbsp;</span>
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ambitious
            </span>
            <span>&nbsp;businesses.</span>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#A1A1AA",
              maxWidth: "820px",
            }}
          >
            AI agents · MCP servers · Modern web apps · Serving clients globally.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
