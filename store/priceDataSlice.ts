import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

interface PriceData {
  symbol: string
  price: number
  timestamp: string
}

interface PriceDataState {
  currentSymbol: string
  data: PriceData[]
}

const initialState: PriceDataState = {
  currentSymbol: 'bitcoin',
  data: [],
}

export const priceDataSlice = createSlice({
  name: 'priceData',
  initialState,
  reducers: {
    setCurrentSymbol: (state, action: PayloadAction<string>) => {
      state.currentSymbol = action.payload
    },
    updatePriceData: (state, action: PayloadAction<PriceData[]>) => {
      state.data = action.payload
    },
  },
})

export const { setCurrentSymbol, updatePriceData } = priceDataSlice.actions

export const selectCurrentSymbol = (state: RootState) => state.priceData.currentSymbol
export const selectPriceData = (state: RootState) => state.priceData.data

export default priceDataSlice.reducer