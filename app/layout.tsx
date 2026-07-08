import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const baseUrl = "https://build-byte-ieee.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "BuildByte | 24h Hackathon by IEEE NED Student Branch",
    template: "%s | BuildByte",
  },
  description:
    "BuildByte is a virtual beginner-friendly 24-hour hackathon by IEEE NED Student Branch. Innovate, build, and commit to your first hackathon experience. Open to all departments, no experience needed.",
  keywords: [
    "hackathon",
    "IEEE",
    "NED",
    "NEDUET",
    "BuildByte",
    "coding competition",
    "beginner hackathon",
    "virtual hackathon",
    "Pakistan",
    "student hackathon",
  ],
  authors: [{ name: "IEEE NED Student Branch" }],
  creator: "IEEE NED Student Branch",
  publisher: "IEEE NED Student Branch",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "BuildByte",
    title: "BuildByte | 24h Hackathon by IEEE NED Student Branch",
    description:
      "A virtual 24-hour hackathon designed to turn beginners into confident first-time participants. Register your team today!",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BuildByte - 24h Virtual Hackathon by IEEE NED Student Branch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildByte | 24h Hackathon by IEEE NED Student Branch",
    description:
      "A virtual 24-hour hackathon designed to turn beginners into confident first-time participants. Register your team today!",
    images: ["/opengraph-image"],
    creator: "@ieee_ned",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
  },
  alternates: {
    canonical: baseUrl,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "BuildByte - 24h Hackathon",
  description:
    "A virtual beginner-friendly 24-hour hackathon by IEEE NED Student Branch. Innovate, build, and commit to your first hackathon experience.",
  url: baseUrl,
  startDate: "2026-07-15T09:00:00+05:00",
  endDate: "2026-07-18T23:59:00+05:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: {
    "@type": "VirtualLocation",
    url: baseUrl,
  },
  organizer: {
    "@type": "Organization",
    name: "IEEE NED Student Branch",
    url: "https://ieee.neduet.edu.pk",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PKR",
    availability: "https://schema.org/InStock",
    url: `${baseUrl}/register`,
  },
  image: `${baseUrl}/opengraph-image`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
