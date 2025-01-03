import { Sidebar } from '@/components/sidebar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Fish } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="hidden lg:flex" />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center space-x-4">
            <MobileSidebar />
            <Fish className="h-8 w-8 text-primary lg:hidden" />
            <h1 className="text-2xl font-bold lg:hidden">AquaWallet</h1>
          </div>
          <ThemeSwitcher />
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

