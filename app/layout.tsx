import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk, Press_Start_2P, JetBrains_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { NoiseOverlay } from "@/components/noise-overlay"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] })
const pressStart = Press_Start_2P({ variable: "--font-press-start", subsets: ["latin"], weight: "400" })
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] })

const baseUrl = "https://buildbyte.vercel.app/"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "BuildByte | 3-day webinar + 24h Hackathon by IEEE NED Student Branch",
    template: "%s | BuildByte",
  },
  description:
    "A 3-day webinar bootcamp that turns beginners into confident first-time hackathon builders then puts it to the test in one 24-hour build.",
  keywords: [
    "hackathon", "IEEE", "NED", "NEDUET", "BuildByte",
    "coding competition", "beginner hackathon", "virtual hackathon",
    "Pakistan", "student hackathon", "webinar", "bootcamp",
  ],
  authors: [{ name: "IEEE NED Student Branch" }],
  creator: "IEEE NED Student Branch",
  publisher: "IEEE NED Student Branch",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", locale: "en_US", url: baseUrl, siteName: "BuildByte",
    title: "BuildByte |  3-day webinar + 24h Hackathon by IEEE NED Student Branch",
    description: "A 3-day webinar bootcamp + 24-hour hackathon. From zero to shipped.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildByte | 3-day webinar + 24h Hackathon by IEEE NED Student Branch",
    description: "A 3-day webinar bootcamp + 24-hour hackathon. From zero to shipped.",
    creator: "@ieee_ned",
  },
  icons: { icon: [{ url: "/favicon.ico" }] },
  alternates: { canonical: baseUrl },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "BuildByte - 24h Hackathon",
  description: "A 3-day webinar bootcamp that turns beginners into confident first-time hackathon builders then puts it to the test in one 24-hour build.",
  url: baseUrl,
  startDate: "2026-07-15T09:00:00+05:00",
  endDate: "2026-07-18T23:59:00+05:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: { "@type": "VirtualLocation", url: baseUrl },
  organizer: { "@type": "Organization", name: "IEEE NED Student Branch", url: "https://ieee.neduet.edu.pk" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "PKR", availability: "https://schema.org/InStock", url: `${baseUrl}/register` },
  image: `${baseUrl}/opengraph-image`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${pressStart.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <NoiseOverlay />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
