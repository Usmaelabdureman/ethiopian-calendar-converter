import React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://ethiopian-calendar-converter.com"

export const metadata: Metadata = {
  title: "Ethiopian Calendar Converter | የኢትዮጵያ ዘመን አቆጣጠር መቀየሪያ",
  description:
    "Free online tool to convert dates between the Ethiopian Calendar and Gregorian Calendar. በኢትዮጵያ ዘመን አቆጣጠር እና በግሪጎሪያን ዘመን አቆጣጠር መካከል ቀናትን ለመቀየር ነፃ የመስመር ላይ መሳሪያ።",
  keywords: [
    "Ethiopian calendar",
    "Gregorian calendar",
    "date converter",
    "Ethiopian date",
    "calendar conversion",
    "Ethiopia",
    "date calculator",
    "የኢትዮጵያ ዘመን አቆጣጠር",
    "የግሪጎሪያን ዘመን አቆጣጠር",
    "ቀን መቀየሪያ",
    "የኢትዮጵያ ቀን",
    "ዘመን አቆጣጠር መቀየሪያ",
    "ኢትዮጵያ",
    "ቀን ማስሊያ",
  ],
  authors: [{ name: "Usmael Abdurhaman", url: "https://github.com/usmael" }],
  creator: "Usmael Abdurhaman",
  publisher: "Usmael Abdurhaman",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Ethiopian Calendar Converter | የኢትዮጵያ ዘመን አቆጣጠር መቀየሪያ",
    description:
      "Convert dates between Ethiopian and Gregorian calendars | በኢትዮጵያ እና በግሪጎሪያን ዘመን አቆጣጠር መካከል ቀናትን ይቀይሩ",
    type: "website",
    locale: "en_US",
    siteName: "Ethiopian Calendar Converter",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        alt: "Ethiopian Calendar Converter preview",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethiopian Calendar Converter",
    description: "Convert dates between Ethiopian and Gregorian calendars",
    creator: "@usmael",
    images: [`${siteUrl}/og-image.png`],
  },
  generator: "v0.dev",
}

// Accepts lang prop for dynamic language switching
export default function RootLayout({
  children,
  lang = "en",
}: {
  children: React.ReactNode
  lang?: "en" | "am"
}) {
  // Amharic is LTR, so always use ltr for direction
  const dir = "ltr"
  const siteUrl = "https://ethiopian-calendar-converter.vercel.app" 
  return (
    <html lang={lang} dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="am" href={`${siteUrl}/am`} />

        {/* Primary SEO tags */}
        <title>{`Ethiopian Calendar Converter | የኢትዮጵያ ዘመን አቆጣጠር`}</title>
        <meta name="description" content={
          "Convert dates between the Ethiopian and Gregorian calendars. Free online Ethiopian date converter, holiday lookup, and date calculator. የኢትዮጵያ እና የግሪጎሪያን ዘመን መቀየሪያ"
        } />
        <meta name="author" content="Usmael Abdurhaman" />
        <meta name="publisher" content="Usmael Abdurhaman" />
        <meta name="keywords" content={
          "Ethiopian calendar, Ethiopian calendar converter, Gregorian calendar, date converter, Ethiopian holidays, Ethiopian date, date conversion, የኢትዮጵያ ዘመን, ቀን መቀየሪያ"
        } />

        {/* Open Graph / Facebook, LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Ethiopian Calendar Converter | የኢትዮጵያ ዘመን አቆጣጠር`} />
        <meta property="og:description" content={
          "Convert dates between the Ethiopian and Gregorian calendars. Free online converter and holiday lookup."
        } />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Ethiopian Calendar Converter" />
        <meta property="og:locale" content={lang === "am" ? "am_ET" : "en_US"} />
        <meta property="og:image" content={`${siteUrl}/og-image.svg`} />
        <meta property="og:image:alt" content="Ethiopian Calendar Converter preview" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@usmael" />
        <meta name="twitter:creator" content="@usmael" />
        <meta name="twitter:title" content={`Ethiopian Calendar Converter | የኢትዮጵያ ዘመን አቆጣጠር`} />
        <meta name="twitter:description" content={
          "Convert dates between the Ethiopian and Gregorian calendars. Free online converter and holiday lookup."
        } />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />

        {/* Fallback favicon - user can replace with their icon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Structured data (JSON-LD) for Website and Author */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ethiopian Calendar Converter",
              url: siteUrl,
              description:
                "Free online tool to convert dates between the Ethiopian Calendar and Gregorian Calendar.",
              publisher: {
                "@type": "Person",
                name: "Usmael Abdurhaman",
                url: "https://github.com/usmael"
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Usmael Abdurhaman",
              url: "https://github.com/usmael",
              sameAs: ["https://github.com/usmael", "https://twitter.com/usmael"]
            })
          }}
        />

        {/* Favicon and other meta can be added here */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
