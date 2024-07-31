import { NextResponse } from 'next/server'
import axios from 'axios'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  console.log('Starting GET request');
  try {
    const client = await clientPromise
    const db = client.db('Stock')
    const collection = db.collection('priceData')
    console.log('Starting GET request');
    const symbols = ['bitcoin', 'ethereum', 'dogecoin', 'cardano', 'polkadot']
    const response = await axios.get(`${process.env.STOCK_API_URL}?ids=${symbols.join(',')}&vs_currencies=usd&x_cg_demo_api_key=${process.env.CG_API_KEY}`)
    const data = response.data

    console.log('Fetched data:', data);

    const timestamp = new Date()
    for (const symbol of symbols) {
      await collection.insertOne({
        symbol,
        price: data[symbol].usd,
        timestamp
      })
    }

    return NextResponse.json({ message: 'Data fetched and stored successfully' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while fetching and storing data' }, { status: 500 })
  }
}