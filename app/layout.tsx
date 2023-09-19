'use client'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Loading from './loading'
import SupabaseProvider from '../providers/SupabaseProvider'
import UserProvider from '../providers/UserProvider'
import NavigationBar from './components/NavigationBar'
import ModalProvider from '../providers/ModelProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SupabaseProvider>
          <UserProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Suspense fallback={<Loading />}>
                <div className='mx-auto max-w-7xl h-screen bg-background'>
                  <ModalProvider />
                  <NavigationBar />
                  {children}
                </div>
              </Suspense>
            </ThemeProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
