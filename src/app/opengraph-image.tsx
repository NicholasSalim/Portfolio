import { ImageResponse } from "next/og";
import { pipeline } from "@/content/pipeline";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1a1511",
          color: "#f2eadf",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#7edcc0" }}>{site.availability}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, letterSpacing: -2, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#a8998a", marginTop: 18 }}>{site.role}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {pipeline.map((s, i) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 12,
                fontSize: 22,
                border: `1.5px solid ${i === pipeline.length - 1 ? "#7edcc0" : "#3a2f27"}`,
                background: i === pipeline.length - 1 ? "#24312b" : "#231c17",
                color: i === pipeline.length - 1 ? "#f2eadf" : "#a8998a",
              }}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
