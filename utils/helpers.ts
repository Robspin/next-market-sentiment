import { MinimalSentimentKeys, Sentiment } from '@/utils/types'

export const calculateAverageScore = (sentiments: Sentiment[]) => {
    const { sum, count } = sentiments.reduce((acc, item) => {
        acc.sum += item.sentimentScore
        acc.count += 1
        return acc
    }, { sum: 0, count: 0 })

    return Math.round(sum / count)
}

export const getMarketMood = (sentiments: Sentiment[]): MinimalSentimentKeys => {
    const averageScore = calculateAverageScore(sentiments)

    if (averageScore < 0) return 'bearish'
    if (averageScore === 0) return 'neutral'
    if (averageScore > 0) return 'bullish'
    return 'neutral'
}

export const capitalizeFirstLetter = (str: string): string  => {
    if (str.length === 0) {
        return str
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}