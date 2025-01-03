'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useWalletStore } from '@/lib/stores/walletStore'
import { v4 as uuidv4 } from 'uuid'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CreditCard, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'

export default function WalletPage() {
  const [amount, setAmount] = useState('')
  const { balance, transactions, addTransaction } = useWalletStore()

  const handleTransaction = (type: 'deposit' | 'withdrawal') => {
    if (amount && !isNaN(parseFloat(amount))) {
      const transactionAmount = parseFloat(amount)
      if (type === 'withdrawal' && transactionAmount > balance) {
        alert('Insufficient funds')
        return
      }
      addTransaction({
        id: uuidv4(),
        amount: transactionAmount,
        type,
        date: new Date().toISOString(),
        description: `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} of $${transactionAmount}`
      })
      setAmount('')
    }
  }

  const recentTransactions = transactions.slice(0, 5)

  const chartData = transactions
    .slice(0, 10)
    .reverse()
    .map(t => ({
      date: new Date(t.date).toLocaleDateString(),
      amount: t.type === 'deposit' ? t.amount : -t.amount
    }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Wallet</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <CreditCard className="h-12 w-12 text-primary" />
              <div>
                <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Available funds</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
              />
              <Button onClick={() => handleTransaction('deposit')} className="flex-shrink-0">
                <ArrowUpCircle className="mr-2 h-4 w-4" /> Deposit
              </Button>
              <Button onClick={() => handleTransaction('withdrawal')} variant="outline" className="flex-shrink-0">
                <ArrowDownCircle className="mr-2 h-4 w-4" /> Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="flex items-center">
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
