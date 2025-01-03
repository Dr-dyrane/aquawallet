'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWalletStore } from '@/lib/stores/walletStore'
import { ArrowUpCircle, ArrowDownCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TransactionsPage() {
  const { transactions } = useWalletStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || transaction.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ul className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="flex items-center border-b pb-4">
                <div className={`rounded-full p-2 ${
                  transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                } mr-3`}>
                  {transaction.type === 'deposit' ? (
                    <ArrowUpCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleString()}</p>
                </div>
                <div className={`text-sm font-medium ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
