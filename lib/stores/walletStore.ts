import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Transaction {
  id: string
  amount: number
  type: 'deposit' | 'withdrawal' | 'investment' | 'return'
  date: string
  description: string
}

interface WalletState {
  balance: number
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}

const mockTransactions: Transaction[] = [
  { id: '1', amount: 5000, type: 'deposit', date: '2023-05-01', description: 'Initial deposit' },
  { id: '2', amount: 1000, type: 'withdrawal', date: '2023-05-15', description: 'ATM withdrawal' },
  { id: '3', amount: 3000, type: 'investment', date: '2023-05-20', description: 'Investment in Salmon Farm A' },
  { id: '4', amount: 500, type: 'return', date: '2023-06-01', description: 'Return from Trout Farm B' },
  { id: '5', amount: 2000, type: 'deposit', date: '2023-06-10', description: 'Salary deposit' },
]

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 3500, // Initial balance after mock transactions
      transactions: mockTransactions,
      addTransaction: (transaction) =>
        set((state) => {
          const newBalance = state.balance + (
            transaction.type === 'deposit' || transaction.type === 'return' ? transaction.amount : -transaction.amount
          )
          return {
            balance: newBalance,
            transactions: [transaction, ...state.transactions],
          }
        }),
    }),
    {
      name: 'wallet-storage',
    }
  )
)
