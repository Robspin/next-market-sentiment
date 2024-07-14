"use server"
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from "./schema"
import { marketSentiments } from './schema'
import { isNull } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'
import { Sentiment } from '@/utils/types'

const sql = neon(process.env.DB_CONNECTION_STRING!)
const db = drizzle(sql, { schema })

export async function fetchAllMarketSentiments(): Promise<Sentiment[]> {
    noStore()
    try {
        return await db
            .select()
            .from(marketSentiments)
            .where(isNull(marketSentiments.deletedAt))
            .orderBy(marketSentiments.coinName, marketSentiments.providerName) as Sentiment[]
    } catch (error) {
        console.error('Error fetching market sentiments:', error)
        throw error
    }
}