import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

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
  openGraph: {
    title: "Ethiopian Calendar Converter | የኢትዮጵያ ዘመን አቆጣጠር መቀየሪያ",
    description: "Convert dates between Ethiopian and Gregorian calendars | በኢትዮጵያ እና በግሪጎሪያን ዘመን አቆጣጠር መካከል ቀናትን ይቀይሩ",
    type: "website",
    locale: "en_US",
    siteName: "Ethiopian Calendar Converter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethiopian Calendar Converter",
    description: "Convert dates between Ethiopian and Gregorian calendars",
    creator: "@usmael",
  },
    generator: 'v0.dev'
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
  const siteUrl = "https://ethiopian-calendar-converter.com" // Change to your real domain
  return (
    <html lang={lang} dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="am" href={`${siteUrl}/am`} />
        {/* Favicon and other meta can be added here */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
