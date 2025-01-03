'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvestmentStore } from '@/lib/stores/investmentStore'
import { v4 as uuidv4 } from 'uuid'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Fish, DollarSign, PlusCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InvestmentPage() {
  const { investments, addInvestment } = useInvestmentStore()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [roi, setRoi] = useState('')
  const [type, setType] = useState<'fish' | 'equipment' | 'infrastructure' | 'other'>('fish')


  const handleAddInvestment = () => {
      if (name && amount && roi && type && !isNaN(parseFloat(amount)) && !isNaN(parseFloat(roi))) {
          addInvestment({
              id: uuidv4(),
              name,
              amount: parseFloat(amount),
              roi: parseFloat(roi),
              type,
          })
      setName('')
      setAmount('')
      setRoi('')
    }
  }

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)

  const chartData = investments.map(inv => ({
    name: inv.name,
    amount: inv.amount
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Investments</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalInvestment.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investments.length}</div>
            <p className="text-xs text-muted-foreground">Active Investments</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
          <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Add Investment</CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Investment Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter investment name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Investment Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="roi">Expected ROI</Label>
                        <Input
                            id="roi"
                            type="number"
                            placeholder="Enter Expected ROI"
                            value={roi}
                            onChange={(e) => setRoi(e.target.value)}
                        />
                    </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Investment Type</Label>
                            <Select onValueChange={(value) => setType(value as 'fish' | 'equipment' | 'infrastructure' | 'other' )}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fish">Fish</SelectItem>
                                    <SelectItem value="equipment">Equipment</SelectItem>
                                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    <Button onClick={handleAddInvestment} className="w-full">
                        Add Investment
                    </Button>
                    </div>
              </CardContent>
          </Card>
      </div>
        <Card>
          <CardHeader>
            <CardTitle>Current Investments</CardTitle>
            <CardDescription>A summary of all current investments.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {investments.map((investment) => (
                <li key={investment.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{investment.name}</p>
                    <p className="text-xs text-muted-foreground">
                        Type: {investment.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        ROI: {investment.roi}%
                    </p>
                  </div>
                  <div className="text-sm font-medium">₦{investment.amount.toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    </div>
  )
}