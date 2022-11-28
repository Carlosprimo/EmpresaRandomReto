import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { isURL, normalizeKey } from '@/utils'
import { getGame } from '@/api/games'
import { LoadingView } from '@/components/Loading'
import { ErrorView } from '@/components/Error'

export const ViewGame = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery(['game', id], () =>
    getGame(id as string)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  const items = Object.entries(data)
    .map(([key, value]) => {
      if (key === 'idGame' || key === 'platforms') return null
      if (typeof value === 'object') return null
      return { key: normalizeKey(key), value }
    })
    .filter(Boolean)

  const lists = Object.entries(data)
    .map(([key, value]) => {
      if (key === 'platforms')
        return {
          key: normalizeKey(key),
          value: (value as string).split(',')
        }
    })
    .filter(Boolean)

  return (
    <section>
      <h1 className="text-4xl font-medium">Game Info</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8 mt-8">
        {items.map((item: any) => (
          <Item key={item.key} title={item.key} value={item.value} />
        ))}
        {lists.map((list: any) => (
          <ItemList key={list.key} title={list.key} items={list.value} />
        ))}
      </div>
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
  items: string[]
}
const ItemList = ({ title, items }: ItemListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="pr-0.5 w-fit text-xl font-medium border-b-2 border-red-600">
        {title}
      </p>
      <div className="flex items-center flex-wrap gap-4">
        {items.map((item) => (
          <p
            key={item}
            className="px-2 py-1 w-fit bg-red-500 rounded-md text-black font-medium"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}
