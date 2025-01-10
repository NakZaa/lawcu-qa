import { auth } from '@/auth'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { IBM_Plex_Sans } from 'next/font/google'
import '@/styles/globals.css'

const IBM = IBM_Plex_Sans({ subsets: ['latin'], weight: '400' })

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
        className={cn('bg-white text-slate-900 antialiased', IBM.className)}
      >
        <body className="min-h-screen mx-auto bg-slate-50 antialiased">
          <div className="container max-w-7xl mx-auto h-full">{children}</div>
        </body>
      </html>
    </SessionProvider>
  )
}
