'use client'

import { Sidebar } from '@/components/sidebar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { ThemeSwitcher } from '@/components/theme-switcher'
import Image from 'next/image'
import { BottomBar } from '@/components/bottom-bar'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="hidden lg:flex" />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center space-x-4">
            <MobileSidebar />
            <Image src="/logo.png" alt="AquaWallet Logo" width={32} height={32} className="mx-auto lg:hidden"/>
            <h1 className="text-2xl font-bold text-primary lg:hidden">AquaWallet</h1>
          </div>
          <ThemeSwitcher />
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        {isMobile && <BottomBar />}
      </div>
    </div>
  )
}

