import { Card } from "@/components/ui/card"
import { SVGProps } from 'react'
import { fetchAllMarketSentiments } from '@/utils/db'
import { Sentiment } from '@/utils/types'
import { getMarketMood } from '@/utils/helpers'

function MarketCard({ item }: { item: Sentiment }) {

    return (
        <Card className="bg-card p-4 flex flex-col items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                    {item.sentimentScore > 0 && <TrendingUpIcon className="w-5 h-5 text-primary"/>}
                    {item.sentimentScore === 0 && <div>-</div>}
                    {item.sentimentScore < 0 && <TrendingDownIcon className="w-5 h-5 text-primary"/>}
                </div>
                <h3 className="text-lg font-medium">{item.coinName}</h3>
            </div>
            <div className="flex items-center gap-2">
                {/*<span className="text-2xl font-bold text-primary">+5.2%</span>*/}
                <span className="text-sm font-medium text-muted-foreground">{item.sentimentName}</span>
            </div>
            {/*<p className="text-muted-foreground text-sm mt-2">*/}
            {/*    Apple Inc. is a leading technology company known for its innovative products and services.*/}
            {/*</p>*/}
        </Card>
    )
}

export default async function Page() {
    const sentiments = await fetchAllMarketSentiments()

  return (
      <div className="flex flex-col items-center min-h-screen bg-background">
        <header className="w-full max-w-4xl px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold text-center">Market Mood - {getMarketMood(sentiments)}</h1>
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


function XIcon(props: SVGProps<any>) {
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
  )
}