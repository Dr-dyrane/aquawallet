import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AquaWallet',
  description: 'Secure investment management for fish farm investors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
