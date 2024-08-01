'use client'
export const dynamic = 'force-dynamic'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentSymbol, selectPriceData, updatePriceData } from '@/store/priceDataSlice'

const PriceDataTable: React.FC = () => {
  const dispatch = useDispatch()
  const currentSymbol = useSelector(selectCurrentSymbol)
  const priceData = useSelector(selectPriceData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (currentSymbol) {
        setIsLoading(true)
        try {
          const response = await fetch(`${window.location.origin}/api/getPriceData?symbol=${currentSymbol}`)
          const data = await response.json()
          console.log('Received data:', data)
          if (Array.isArray(data)) {
            dispatch(updatePriceData(data))
          } else {
            console.error('Received non-array data:', data)
            dispatch(updatePriceData([]))
          }
        } catch (error) {
          console.error('Error fetching data:', error)
          dispatch(updatePriceData([]))
        } finally {
          setIsLoading(false)
        }
      }
    }

    const fetchAndStoreData = async () => {
      try {
        const response = await fetch('/api/fetchData')
        const data = await response.json()
        console.log('Data fetched and stored:', data)
      } catch (error) {
        console.error('Error fetching and storing data:', error)
      }
    }

    const fetchAllData = async () => {
      await fetchData()
      await fetchAndStoreData()
    }

    // Initial fetch when component mounts or symbol changes
    fetchAllData()

    // Set up interval for periodic fetches
    const interval = setInterval(fetchAllData, 10000)

    return () => clearInterval(interval)
  }, [currentSymbol, dispatch])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!currentSymbol) {
    return <div className="flex items-center flex-col mt-6"><p>Please select a cryptocurrency symbol.</p></div>
  }

  if (!Array.isArray(priceData) || priceData.length === 0) {
    return <div className="flex items-center flex-col mt-6"><p>Sorry! No data available for<span className='text-red-500 font-medium'> {currentSymbol}</span></p></div>
  }

  return (
    <div className="flex items-center flex-col mt-6">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="lg:w-[90rem] md:w-full sm:w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope='col' className='px-9 py-3'>Id</th>
              <th scope="col" className="px-9 py-3">Cryptocurrency</th>
              <th scope="col" className="px-9 py-3">Price (USD)</th>
              <th scope="col" className="px-9 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {priceData.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className='px-9 py-3'>{index+1}</td>
                <td className="px-9 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">{item.symbol}</td>
                <td className="px-9 py-3">$ {item.price.toFixed(2)}</td>
                <td className="px-9 py-3">{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PriceDataTable