import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = await readFile(
  join(process.cwd(), "assets/Unbounded-SemiBold.ttf"),
);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0b0b0b",
          color: "#ffffff",
          fontFamily: "Unbounded",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 520,
            height: 520,
            background:
              "radial-gradient(circle at 70% 30%, rgba(227,24,55,0.35), transparent 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 36,
            height: 36,
            borderTop: "3px solid #e31837",
            borderLeft: "3px solid #e31837",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 40,
            width: 36,
            height: 36,
            borderBottom: "3px solid #e31837",
            borderRight: "3px solid #e31837",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: 72,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: -1.5,
            }}
          >
            {SITE.name}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              maxWidth: 900,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.05,
              }}
            >
              {SITE.tagline}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.35,
              }}
            >
              {SITE.subtitle}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontSize: 22,
                color: "#e31837",
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {SITE.host}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Unbounded",
          data: font,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
