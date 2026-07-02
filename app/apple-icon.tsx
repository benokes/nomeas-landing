import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function AppleIcon() {
  const ramData = await readFile(join(process.cwd(), "public/ram.png"));
  const ramSrc = `data:image/png;base64,${ramData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#344854",
          borderRadius: 36,
        }}
      >
        <img src={ramSrc} width={130} height={130} alt="" />
      </div>
    ),
    { ...size }
  );
}
