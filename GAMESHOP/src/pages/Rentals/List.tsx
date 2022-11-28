import type { Rental } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getRentals, getRentalCustomer, getRentalGame } from '@/api/rentals'

import { Button } from '@/components/Button'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'
import { ReactComponent as PlusIcon } from '@/assets/plus.svg'

export const ListRentals = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useQuery(['rentals'], getRentals)

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <div className="flex flex-wrap justify-between items-end gap-5">
        <h1 className="text-4xl font-medium">Rentals</h1>
        <div className="flex flex-wrap gap-4">
          <Button
            className="border-red-500 text-red-500 hover:bg-red-500"
            action={() => navigate('/rentals/add')}
          >
            <PlusIcon className="w-6 h-6" />
            Add Rental
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-8">
        {data.map((rental: Rental) => (
          <div
            key={rental.idRent}
            className="flex items-center justify-between"
          >
            <div className="basis-1/2 flex items-center justify-between">
              <RentalGame id={rental.idVideoGamesRental} />
              <RentalCustomer id={rental.idUserRental} />
            </div>
            <div className="flex gap-2">
              <span>{rental.retalDate}</span>
              <span className="text-2xl leading-6">➞</span>
              <span>{rental.rentalEndDate}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

type RentalProps = { id: string }
const RentalCustomer = ({ id }: RentalProps) => {
  const { data, isLoading, isError, error } = useQuery(['customer', id], () =>
    getRentalCustomer(id)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <>
      <p className="text-lg font-medium">{data.fullName}</p>
    </>
  )
}

const RentalGame = ({ id }: RentalProps) => {
  const { data, isLoading, isError, error } = useQuery(['game', id], () =>
    getRentalGame(id)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <>
      <p className="text-xl font-semibold">{data.nameGame}</p>
    </>
  )
}
