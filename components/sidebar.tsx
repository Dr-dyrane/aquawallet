'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Wallet, BarChart2, User, LogOut, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/authStore'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Wallet, label: 'Wallet', href: '/dashboard/wallet' },
  { icon: BarChart2, label: 'Investments', href: '/dashboard/investments' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className={cn("w-64 bg-card text-card-foreground border-r flex flex-col", className)}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">AquaWallet</h1>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-6 py-3 text-sm font-medium transition-colors hover:bg-muted",
                  pathname === item.href ? "bg-muted" : "transparent"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name} />
            <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => router.push('/dashboard/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}
