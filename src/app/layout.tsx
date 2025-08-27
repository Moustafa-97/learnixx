import type { Metadata } from "next"
import "./globals.css"
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  style: ["normal"],
  display: "swap",
  fallback: ["system-ui", "sans-serif", "arial"],
  variable: "--monta",
})

export const metadata: Metadata = {
  title: "YALLA | LEARNEX",
  description: "YALLA | LEARNEX",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      
      {children}
    </html>
  )
}
