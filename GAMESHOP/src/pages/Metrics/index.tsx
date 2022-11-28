import { useQuery } from '@tanstack/react-query'
import { getFrequentCustomers, getPopularGames } from '@/api/metrics'

import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'
import { MostPopularGames } from './PopularGame'
import { MostFrequentCustomers } from './FrequentCustomer'

export const Metrics = () => {
  const {
    data: customers,
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers,
    error: errorCustomers
  } = useQuery(['frequent_customers'], getFrequentCustomers)

  const {
    data: games,
    isLoading: isLoadingGames,
    isError: isErrorGames,
    error: errorGames
  } = useQuery(['popular_games'], getPopularGames)

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-4xl font-medium">Metrics</h1>
      <div className="grid md:grid-cols-[0.6fr_0.02fr_1fr] gap-6">
        {isLoadingCustomers ? (
          <LoadingView />
        ) : isErrorCustomers ? (
          <ErrorView message={(errorCustomers as Error)?.message} />
        ) : (
          <MostFrequentCustomers customers={customers} />
        )}
        <div className="w-full md:w-0 h-0 md:h-full border-2 border-gray-500"></div>
        {isLoadingGames ? (
          <LoadingView />
        ) : isErrorGames ? (
          <ErrorView message={(errorGames as Error)?.message} />
        ) : (
          <MostPopularGames games={games} />
        )}
      </div>
    </section>
  )
}
