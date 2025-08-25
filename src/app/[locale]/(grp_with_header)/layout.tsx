/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
// import CssBaseline from "@mui/material/CssBaseline"
// import AOSInit from "@/components/common/AOSInit"
import "../globals.css"
import Header from "@/components/UI/Header/Header"
import Footer from "@/components/UI/Footer/Footer"
import TourComponents from "@/components/A_GUIDE/TourComponents"
// dynanamic tourContainer
// import dynamic from "next/dynamic"
// const TourComponents = dynamic(() => import("@/components/A_GUIDE/TourComponents"), {
//   ssr: true
// })

import { TourProviderClient } from "@/components/A_GUIDE/TourProviderClient"

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
      {/* <NextIntlClientProvider messages={messages}>
        <CssBaseline />
        <AOSInit /> */}
      <TourProviderClient>
        <TourComponents />
        <header>
          <Header />
        </header>
        <div>{children}</div>
        <footer>
          <Footer />
        </footer>
      </TourProviderClient>
      {/* </NextIntlClientProvider> */}
    </>
  )
}
