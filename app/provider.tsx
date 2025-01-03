'use client'

import { ThemeProvider } from 'next-themes'
import { useAuthStore } from '@/lib/stores/authStore'
import { useWalletStore } from '@/lib/stores/walletStore'
import { useInvestmentStore } from '@/lib/stores/investmentStore'

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize stores
  useAuthStore()
  useWalletStore()
  useInvestmentStore()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
