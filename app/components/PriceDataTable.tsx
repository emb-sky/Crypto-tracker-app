'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentSymbol, selectPriceData, updatePriceData } from '@/store/priceDataSlice'

const PriceDataTable: React.FC = () => {
  const dispatch = useDispatch()
  const currentSymbol = useSelector(selectCurrentSymbol)
  const priceData = useSelector(selectPriceData)

  useEffect(() => {
    const fetchData = async () => {
      if (currentSymbol) {
        try {
          const response = await fetch(`/api/getPriceData?symbol=${currentSymbol}`)
          const data = await response.json()
          if (Array.isArray(data)) {
            dispatch(updatePriceData(data))
          } else {
            console.error('Received non-array data:', data)
            dispatch(updatePriceData([]))
          }
        } catch (error) {
          console.error('Error fetching data:', error)
          dispatch(updatePriceData([]))
        }
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [currentSymbol, dispatch])

  if (!Array.isArray(priceData) || priceData.length === 0) {
    return <p>No data available</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price (USD)</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {priceData.map((item, index) => (
          <tr key={index}>
            <td>{item.symbol}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{new Date(item.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PriceDataTable