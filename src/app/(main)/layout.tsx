import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '../api/uploadthing/core'

const ibm = IBM_Plex_Sans_Thai({
  subsets: ['latin', 'thai'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Law Chulalongkorn QA',
  description: 'Ask and answer law questions for Chula students'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html
        lang="en"
        className={cn('bg-white text-slate-900 antialiased', ibm.className)}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ReactQueryProvider>
          <body className="min-h-screen mx-auto bg-slate-50 antialiased">
            <Navbar />

            <div className="container max-w-7xl mx-auto h-full pt-24">
              {children}
            </div>

            <Toaster />
          </body>
        </ReactQueryProvider>
      </html>
    </SessionProvider>
  )
}
