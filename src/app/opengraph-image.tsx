import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Maggot-Free Rescue Kit — Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          padding: "70px 80px",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #d4a017, #f5c842, #d4a017)",
            display: "flex",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#d4a017",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 18,
              color: "#d4a017",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Bangladesh
          </span>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#d4a017",
              display: "flex",
            }}
          />
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 80,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 28,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Maggot-Free</span>
          <span style={{ color: "#d4a017" }}>Rescue Kit</span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#d4a017",
            borderRadius: 2,
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 26,
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          <span>Safe &amp; effective maggot removal kit for dogs and animals.</span>
          <span>Order online — delivered to your door.</span>
        </div>

        {/* URL pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 40px",
            background: "#d4a017",
            borderRadius: 50,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: "#1a1a2e",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            maggotfreekit.com
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(212,160,23,0.3)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
