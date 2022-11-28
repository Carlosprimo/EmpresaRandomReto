import type { Price } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFormattedPrice } from '@/utils'
import { getPrices } from '@/api/prices'
import { getGame } from '@/api/games'

import { Button } from '@/components/Button'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'
import { ReactComponent as PlusIcon } from '@/assets/plus.svg'
import { ReactComponent as EditIcon } from '@/assets/edit.svg'

export const ListPrices = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useQuery(['prices'], getPrices)

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <div className="flex flex-wrap justify-between items-end gap-5">
        <h1 className="text-4xl font-medium">Prices</h1>
        <div className="flex flex-wrap gap-4">
          <Button
            className="border-red-500 text-red-500 hover:bg-red-500"
            action={() => navigate('/prices/add')}
          >
            <PlusIcon className="w-6 h-6" />
            Add Price
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-12 mt-10">
        {data.map((price: Price) => (
          <div key={price.idPrice} className="grid grid-cols-4 items-end gap-10">
            <Game id={price.idVideoGames} />
            <div>
              <span>Price</span>
              <p className="text-xl font-medium">
                {getFormattedPrice(price.price)}
              </p>
            </div>
            <div>
              <span>Penalty</span>
              <p className="text-xl font-medium">
                {getFormattedPrice(price.pricePenalty)}
              </p>
            </div>
            <div>
              <Button
                className="border-violet-500 text-violet-500 hover:bg-violet-500"
                action={() => navigate(`/prices/edit/${price.idPrice}`)}
              >
                <EditIcon className="w-6 h-6" />
                Edit Price
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const Game = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error } = useQuery(['game', id], () =>
    getGame(id)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <div>
      <p className="text-xl font-medium">{data.nameGame}</p>
      <p className="font-light">{data.releaseDate}</p>
    </div>
  )
}
