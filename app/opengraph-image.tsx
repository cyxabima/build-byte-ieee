import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const geistSans = fetch(
    "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RnOM4nQ.ttf",
    { cache: "force-cache" },
  ).then((res) => res.arrayBuffer())

  const geistBold = fetch(
    "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RNeQ4nQ.ttf",
    { cache: "force-cache" },
  ).then((res) => res.arrayBuffer())

  const [fontData, fontBoldData] = await Promise.all([geistSans, geistBold])

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0f1629 50%, #0a0a0f 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Gradient accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 80px",
            flex: 1,
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#3b82f6",
              }}
            />
            <span
              style={{
                fontFamily: "Geist",
                fontSize: 16,
                color: "#94a3b8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              IEEE NED Student Branch presents
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "GeistBold",
              fontSize: 108,
              fontWeight: 900,
              color: "#f8fafc",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}
          >
            BuildByte
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: "Geist",
              fontSize: 36,
              color: "#64748b",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>Innovate</span>
            <span style={{ color: "#475569" }}>&middot;</span>
            <span>Build</span>
            <span style={{ color: "#475569" }}>&middot;</span>
            <span>Commit</span>
            <span
              style={{
                marginLeft: 16,
                padding: "4px 16px",
                borderRadius: 9999,
                fontSize: 20,
                fontWeight: 600,
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                color: "#f8fafc",
              }}
            >
              24h Hackathon
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              fontFamily: "Geist",
              fontSize: 20,
              color: "#64748b",
              maxWidth: 600,
              lineHeight: 1.5,
            }}
          >
            A virtual 24-hour hackathon for beginners and experienced builders alike. Open to all departments.
          </div>

          {/* URL badge */}
          <div
            style={{
              display: "flex",
              marginTop: 48,
              padding: "12px 24px",
              borderRadius: 8,
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              fontSize: 18,
              fontFamily: "Geist",
              color: "#60a5fa",
              alignSelf: "flex-start",
            }}
          >
            buildbyte.ukashaanwerali.dev
          </div>
        </div>

        {/* Decorative gradient */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          weight: 400,
          style: "normal",
        },
        {
          name: "GeistBold",
          data: fontBoldData,
          weight: 900,
          style: "normal",
        },
      ],
    },
  )
}
