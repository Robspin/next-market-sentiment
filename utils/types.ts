
export type SentimentKey = 'capitulation' | 'bearish' | 'neutral' | 'bullish' | 'euphoric'

export type Sentiment = {
    id: string
    coinName: string
    providerName: string
    sentimentName: string
    sentimentScore: number
    details: string[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}
