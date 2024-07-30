import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('Stock')
    const collection = db.collection('priceData')

    const data = await collection
      .find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while fetching price data' }, { status: 500 })
  }
}