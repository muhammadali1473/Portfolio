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
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Gradient glow background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1100px 600px at 15% 0%, rgba(139,92,246,0.45), transparent 55%), radial-gradient(900px 500px at 95% 10%, rgba(6,182,212,0.35), transparent 60%), radial-gradient(900px 500px at 50% 110%, rgba(59,130,246,0.3), transparent 60%)",
          }}
        />

        {/* Bottom-right accent glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-80px",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
            opacity: 0.45,
            filter: "blur(90px)",
          }}
        />

        {/* Top row: MA mark + handle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            color: "#A1A1AA",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "24px",
              letterSpacing: 0,
            }}
          >
            MA
          </div>
          @get_Muham
        </div>

        {/* Main stack */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "108px",
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FAFAFA",
            }}
          >
            Muhammad Ali
          </div>
          <div
            style={{
              fontSize: "42px",
              fontWeight: 600,
              color: "#E5E7EB",
              letterSpacing: "-0.01em",
            }}
          >
            Full-Stack Developer &amp; AI Specialist
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#A1A1AA",
              display: "flex",
              gap: "10px",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
                backgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
              }}
            >
              AI Agents
            </span>
            <span>·</span>
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
                backgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
              }}
            >
              MCP Servers
            </span>
            <span>·</span>
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)",
                backgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
              }}
            >
              Modern Web Apps
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
