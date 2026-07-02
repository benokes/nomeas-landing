import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Nomeas · For the people who care for newborns at night";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image() {
  const ramData = await readFile(join(process.cwd(), "public/ram.png"));
  const ramSrc = `data:image/png;base64,${ramData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 72px",
          backgroundColor: "#FAF7F2",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              backgroundColor: "#344854",
            }}
          >
            <img src={ramSrc} width={52} height={52} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Georgia, serif",
                fontSize: 36,
                fontWeight: 500,
                color: "#344854",
              }}
            >
              nomeas
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#8B9499",
                marginTop: 4,
              }}
            >
              est. 2026
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Georgia, serif",
            fontSize: 56,
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#344854",
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          <span>For the people who care for newborns </span>
          <span style={{ fontStyle: "italic", color: "#2E7547" }}>at night.</span>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "system-ui, sans-serif",
            fontSize: 24,
            lineHeight: 1.5,
            color: "#5A6C76",
            maxWidth: 820,
          }}
        >
          Hearth is a private ledger for night nurses. Log shifts, track what&apos;s
          owed, get paid faster. Free. Join the first 100.
        </div>
      </div>
    ),
    { ...size }
  );
}
