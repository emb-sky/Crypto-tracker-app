'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentSymbol } from '@/store/priceDataSlice'

interface SymbolChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

const SymbolChangeModal: React.FC<SymbolChangeModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const [newSymbol, setNewSymbol] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setCurrentSymbol(newSymbol))
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Choose Crypto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            placeholder="Enter Crypto of your choice"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="label">
          <span className="label-text">(e.g., bitcoin, ethereum, dogecoin, cardano, polkadot)</span>
        </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Change Crypto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SymbolChangeModal