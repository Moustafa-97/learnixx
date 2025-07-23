/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import CssBaseline from "@mui/material/CssBaseline"
import AOSInit from "@/components/common/AOSInit"
import "./globals.css"

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
    
      <body lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
        <NextIntlClientProvider messages={messages}>
          <CssBaseline />
          <AOSInit />
          {children}
        </NextIntlClientProvider>
      </body>
    
  )
}
