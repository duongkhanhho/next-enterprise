"use client"

// import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { dir } from "i18next"
import "styles/tailwind.css"
import { SessionProvider } from "next-auth/react"
import AppBar from "./AppBar"

// import { Help } from "@/components/help"
// import { TailwindIndicator } from "@/components/tailwind-indicator"
// import { Toaster } from "@/ui/toast"

// import { languages } from "../i18n/settings"

// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false
//     }
//   },
//   queryCache: new QueryCache({
//     onError: (error: unknown) => {
//       console.error(`Something went wrong: ${error}`);
//     }
//   })
// });

export default function RootLayout({
  children,
  session,
  params: { lng },
}: {
  children: React.ReactNode
  session: any
  params: { lng: string }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body className="min-h-screen bg-slate-100">
        <SessionProvider session={session}>
          <AppBar />
          {children}
          {/* <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> */}
          {/* <Help />
          <Toaster position="bottom-right" />
          <TailwindIndicator /> */}
        </SessionProvider>
      </body>
    </html>
  )
}
