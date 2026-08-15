import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Ali — Full-Stack Developer & AI Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Warm paper card, matching the site. Deliberately light — it stands out in a
 * feed of dark preview cards, and it carries the same palette sampled from the
 * portrait: page #F0EAE1, ink #1A1A18, band #B8A68F, gold #875C2C.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F0EAE1",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* The band, as a full-height block on the right edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "232px",
            background: "#B8A68F",
          }}
        />

        {/* Top row: MK mark + handle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "21px",
            color: "#6B6155",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#1A1A18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FDFBF7",
              fontWeight: 800,
              fontSize: "24px",
              letterSpacing: "-0.04em",
            }}
          >
            MK
          </div>
          @get_Muham
        </div>

        {/* Main stack */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              fontSize: "104px",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "#1A1A18",
            }}
          >
            Muhammad Ali
          </div>

          {/* Gold rule, echoing the heading underline on the site */}
          <div style={{ display: "flex", width: "160px", height: "3px", background: "#A8763C" }} />

          <div
            style={{
              fontSize: "40px",
              fontWeight: 600,
              color: "#4A423A",
              letterSpacing: "-0.01em",
            }}
          >
            Full-Stack Developer &amp; AI Specialist
          </div>
          <div
            style={{
              fontSize: "25px",
              color: "#875C2C",
              fontWeight: 600,
              display: "flex",
              gap: "12px",
            }}
          >
            <span>AI Agents</span>
            <span style={{ color: "#A89C8A" }}>·</span>
            <span>MCP Servers</span>
            <span style={{ color: "#A89C8A" }}>·</span>
            <span>Modern Web Apps</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
