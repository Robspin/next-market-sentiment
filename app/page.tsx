import { Card } from "@/components/ui/card"
import { SVGProps } from 'react'
import { fetchAllMarketSentiments } from '@/utils/db'
import { MinimalSentimentKeys, Sentiment } from '@/utils/types'
import { capitalizeFirstLetter, getMarketMood } from '@/utils/helpers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const sentimentClasses: { [key in MinimalSentimentKeys]: any } = {
    bearish: {
        card: 'bg-red-100 border-red-400',
        sentiment: 'text-red-600',
    },
    neutral: {
        card: '',
        sentiment: ''
    },
    bullish: {
        card: 'bg-green-100 border-green-400',
        sentiment: 'text-green-600',
    }
}

function MarketCard({ item }: { item: Sentiment }) {

    return (
        <Card className={`bg-card p-4 flex flex-col items-start justify-between ${sentimentClasses[item.sentimentName].card}`}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={`/icons/${item.coinName}.svg`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium">{item.coinName}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`font-semibold text-muted-foreground ${sentimentClasses[item.sentimentName].sentiment}`}>{item.sentimentName}</span>
                    <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                        {item.sentimentScore > 0 && <TrendingUpIcon className={`w-5 h-5 ${sentimentClasses[item.sentimentName].sentiment}`} />}
                        {item.sentimentScore === 0 && <div>-</div>}
                        {item.sentimentScore < 0 && <TrendingDownIcon className={`w-5 h-5 ${sentimentClasses[item.sentimentName].sentiment}`}/>}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default async function Page() {
    const sentiments = await fetchAllMarketSentiments()
    const marketMood = getMarketMood(sentiments)

  return (
      <div className="flex flex-col items-center min-h-screen bg-background">
        <header className="w-full max-w-4xl px-4 md:px-6 pt-24 pb-16">
            <h1 className="text-5xl tracking-tighter font-bold text-center">Market Mood - <span className={sentimentClasses[marketMood]}>{capitalizeFirstLetter(marketMood)}</span></h1>
        </header>
        <main className="w-full max-w-4xl px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sentiments.map(item => <MarketCard item={item} key={item.coinName} />)}
        </main>
      </div>
  )
}

function TrendingDownIcon(props: SVGProps<any>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline points="16 17 22 17 22 11" />
      </svg>
  )
}


function TrendingUpIcon(props: SVGProps<any>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
  )
}
