'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-4/5 h-full max-w-sm" side="left">
        <Sidebar />
      </DialogContent>
    </Dialog>
  )
}