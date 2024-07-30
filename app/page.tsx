'use client'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PriceDataTable from './components/PriceDataTable'
import SymbolChangeModal from './components/SymbolChangeModal'
import { selectCurrentSymbol } from '@/store/priceDataSlice'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentSymbol = useSelector(selectCurrentSymbol)

  return (
    <div>
      <h1>Real-Time Cryptocurrency Price Data</h1>
      <p>Current Symbol: {currentSymbol}</p>
      <button onClick={() => setIsModalOpen(true)}>Change Symbol</button>
      <PriceDataTable />
      <SymbolChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}