"use server"
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from "./schema"
import { marketSentiments } from './schema'
import { isNull } from 'drizzle-orm'

const sql = neon(process.env.DB_CONNECTION_STRING!)
const db = drizzle(sql, { schema })

export async function fetchAllMarketSentiments() {
    try {
        return await db
            .select()
            .from(marketSentiments)
            .where(isNull(marketSentiments.deletedAt))
            .orderBy(marketSentiments.coinName, marketSentiments.providerName)
    } catch (error) {
        console.error('Error fetching market sentiments:', error)
        throw error
    }
}