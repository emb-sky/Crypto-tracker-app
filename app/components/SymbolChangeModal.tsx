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
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Enter new symbol (e.g., bitcoin, ethereum)"
          required
        />
        <button type="submit">Change Symbol</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default SymbolChangeModal