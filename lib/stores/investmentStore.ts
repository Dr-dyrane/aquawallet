import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Investment {
  id: string
  name: string
  amount: number
  date: string
  roi: number
  type: 'Fish Farm' | 'Equipment' | 'Technology'
}

interface InvestmentState {
  investments: Investment[]
  addInvestment: (investment: Investment) => void
  updateROI: (id: string, roi: number) => void
}

const mockInvestments: Investment[] = [
  { id: '1', name: 'Salmon Farm A', amount: 10000, date: '2023-01-15', roi: 12, type: 'Fish Farm' },
  { id: '2', name: 'Trout Farm B', amount: 15000, date: '2023-02-20', roi: 10, type: 'Fish Farm' },
  { id: '3', name: 'Automated Feeders', amount: 5000, date: '2023-03-10', roi: 15, type: 'Equipment' },
  { id: '4', name: 'Water Quality Sensors', amount: 3000, date: '2023-04-05', roi: 8, type: 'Technology' },
  { id: '5', name: 'Tilapia Farm C', amount: 12000, date: '2023-05-12', roi: 11, type: 'Fish Farm' },
]

export const useInvestmentStore = create<InvestmentState>()(
  persist(
    (set) => ({
      investments: mockInvestments,
      addInvestment: (investment) =>
        set((state) => ({
          investments: [...state.investments, investment],
        })),
      updateROI: (id, roi) =>
        set((state) => ({
          investments: state.investments.map((inv) =>
            inv.id === id ? { ...inv, roi } : inv
          ),
        })),
    }),
    {
      name: 'investment-storage',
    }
  )
)
