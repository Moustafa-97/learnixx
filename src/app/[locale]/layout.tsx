/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import CssBaseline from "@mui/material/CssBaseline"
import AOSInit from "@/components/common/AOSInit"
import "./globals.css"
import Header from "@/components/UI/Header/Header"
import Footer from "@/components/UI/Footer/Footer"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages(locale as any)

  if (!messages) {
    notFound()
  }

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <CssBaseline />
        <AOSInit />
        <header>
          <Header />
        </header>
        <body lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
          {children}
        </body>
        <footer>
          <Footer />
        </footer>
      </NextIntlClientProvider>
    </>
  )
}
