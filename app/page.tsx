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
      <h1 className='text-6xl font-bold mt-9 mb-3  text-center'>Real-Time Cryptocurrency Price Data</h1>
      <p className='bg-blue-500 text-black mt-6 mb-6 text-center font-bold text-2xl'>Currently Choosen Cryptocurrency : <span className='capitalize  text-fuchsia-50'> {currentSymbol} </span></p>
      <div className='text-center mt-3'>
      <button onClick={() => setIsModalOpen(true)} className="font-medium px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center">
            Click here to change Cryptocurrency
      </button></div>
        <SymbolChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PriceDataTable />
    </div>
  )
}