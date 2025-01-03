import Link from 'next/link'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary p-4 text-primary-foreground">
      <nav className="absolute top-0 right-0 m-4">
        <ThemeSwitcher />
      </nav>
      <h1 className="mb-8 text-4xl font-bold">Welcome to AquaWallet</h1>
      <p className="mb-8 text-center text-xl">
        Secure investment management for fish farm investors
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  )
}
