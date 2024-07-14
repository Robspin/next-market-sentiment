
export type SentimentKey = 'capitulation' | 'bearish' | 'neutral' | 'bullish' | 'euphoric'

export type MinimalSentimentKeys = 'bearish' | 'neutral' | 'bullish'

export type Sentiment = {
    id: string
    coinName: string
    providerName: string
    sentimentName: MinimalSentimentKeys
    sentimentScore: number
    details: string[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}
