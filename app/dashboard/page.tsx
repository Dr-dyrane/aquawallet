'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useInvestmentStore } from '@/lib/stores/investmentStore'
import { useWalletStore } from '@/lib/stores/walletStore'
import { Fish, DollarSign, TrendingUp, CreditCard } from 'lucide-react'
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const { investments } = useInvestmentStore()
  const { balance, transactions } = useWalletStore()

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const averageROI = investments.length > 0
    ? investments.reduce((sum, inv) => sum + inv.roi, 0) / investments.length
    : 0

  const investmentData = investments.map((inv) => ({
    name: inv.name,
    amount: inv.amount,
    roi: inv.roi,
  }))

  const investmentTypeData = investments.reduce((acc, inv) => {
    const existingType = acc.find(item => item.name === inv.type)
    if (existingType) {
      existingType.value += inv.amount
    } else {
      acc.push({ name: inv.type, value: inv.amount })
    }
    return acc
  }, [] as { name: string; value: number }[])

  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalInvestment.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageROI.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+10.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investments.length}</div>
            <p className="text-xs text-muted-foreground">Across various projects</p>
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
              <LineChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Investment Distribution (Donut Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={investmentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {investmentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="flex items-center">
                <div className={`rounded-full p-2 ${transaction.type === 'deposit' || transaction.type === 'return' ? 'bg-green-100' : 'bg-red-100'
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
                <div className={`text-sm font-medium ${transaction.type === 'deposit' || transaction.type === 'return' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {transaction.type === 'deposit' || transaction.type === 'return' ? '+' : '-'}₦{transaction.amount.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
