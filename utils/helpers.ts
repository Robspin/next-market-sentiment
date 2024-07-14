import { Sentiment } from '@/utils/types'

export const calculateAverageScore = (sentiments: Sentiment[]) => {
    const { sum, count } = sentiments.reduce((acc, item) => {
        acc.sum += item.sentimentScore
        acc.count += 1
        return acc
    }, { sum: 0, count: 0 })

    return Math.round(sum / count)
}

export const getMarketMood = (sentiments: Sentiment[]) => {
    const averageScore = calculateAverageScore(sentiments)

    if (averageScore < 0) return 'Bearish'
    if (averageScore === 0) return 'Neutral'
    if (averageScore > 0) return 'Bullish'
}

function capitalizeFirstLetter(str: string): string {
    if (str.length === 0) {
        return str
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}