import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { isURL, normalizeKey } from '@/utils'

import { getRentalGame } from '@/api/rentals'
import { getCustomer } from '@/api/customers'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'

export const ViewCustomer = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery(['customer', id], () =>
    getCustomer(id as string)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  const items = Object.entries(data)
    .map(([key, value]) => {
      if (key.includes('id')) return null
      if (typeof value === 'object') return null
      return { key: normalizeKey(key), value }
    })
    .filter(Boolean)

  const lists = Object.entries(data)
    .map(([key, value]) => {
      if (typeof value !== 'object') return null
      return { key: normalizeKey(key), value }
    })
    .filter(Boolean)

  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-4xl font-medium">Customer Info</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
        {items.map((item: any) => (
          <Item key={item.key} title={item.key} value={item.value} />
        ))}
      </div>
      {lists.map((list: any) => (
        <ItemList key={list.key} title={list.key} items={list.value} />
      ))}
    </section>
  )
}

// Sub-component
interface ItemProps {
  title: string
  value: any
}
const Item = ({ title, value }: ItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="pr-0.5 w-fit text-xl font-medium border-b-2 border-red-600">
        {title}
      </p>
      {isURL(value) ? (
        <img src={value} alt="game cover" />
      ) : (
        <p className="text-left text-lg break-all">{value}</p>
      )}
    </div>
  )
}

interface ItemListProps {
  title: string
  items: any[]
}
const ItemList = ({ title, items }: ItemListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="pr-0.5 w-fit text-xl font-medium border-b-2 border-red-600">
        {title}
      </p>
      <div className="flex items-center flex-wrap gap-16">
        {items.map((item) => (
          <div key={item.idRent} className="flex flex-col gap-6">
            <RentalGame id={item.idVideoGamesRental} />
            <div className="flex gap-2">
              <span>{item.rentalDate}</span>
              <span className="text-2xl leading-6">➞</span>
              <span>{item.rentalEndDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type RentalProps = { id: string }
const RentalGame = ({ id }: RentalProps) => {
  const { data, isLoading, isError, error } = useQuery(['game', id], () =>
    getRentalGame(id)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-medium">{data.nameGame}</p>
      <img
        className="w-32 h-32 object-cover object-top"
        src={data.coverPage}
        alt={data.nameGame}
      />
    </div>
  )
}
