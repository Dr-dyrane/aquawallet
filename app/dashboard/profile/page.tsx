'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/stores/authStore'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const { user, login } = useAuthStore()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      login({ ...user, name, email })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>
            <Button variant="outline">Change Avatar</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <form onSubmit={handleUpdateProfile} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Update Profile</Button>
                </form>
              </TabsContent>
              <TabsContent value="security">
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Change Password</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
