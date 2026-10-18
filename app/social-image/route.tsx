import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export async function GET() {
  const logo = await readFile(join(process.cwd(), "public", "logo-2.png"));
  const data = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#e9e7e0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#111d2f",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data}
        width={310}
        height={232}
        alt=""
        style={{ objectFit: "contain", objectPosition: "left top" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span
          style={{ fontSize: 58, fontWeight: 700, letterSpacing: "-.05em" }}
        >
          From complexity to clarity.
        </span>
        <span style={{ fontSize: 25, color: "#435571" }}>
          Data · AI · Decisions
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
