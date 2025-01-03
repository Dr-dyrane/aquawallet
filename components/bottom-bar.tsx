'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Wallet, BarChart2, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Wallet, label: 'Wallet', href: '/dashboard/wallet' },
  { icon: BarChart2, label: 'Investments', href: '/dashboard/investments' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
]

export function BottomBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-sm",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
