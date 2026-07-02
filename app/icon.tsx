import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Icon() {
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
          borderRadius: 8,
        }}
      >
        <img src={ramSrc} width={23} height={23} alt="" />
      </div>
    ),
    { ...size }
  );
}
