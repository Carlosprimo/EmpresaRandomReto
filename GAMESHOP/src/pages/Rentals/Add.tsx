import type { Rental } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { generateUUID } from '@/utils'
import { createRental } from '@/api/rentals'
import { FIELDS } from '@/utils/rentals'

import { Form } from '@/components/Form'
import { LoadingView } from '@/components/Loading'
import { ErrorView } from '@/components/Error'

export const AddRental = () => {
  const navigate = useNavigate()
  const { mutate, isLoading, isError, error } = useMutation(createRental, {
    onSuccess: () => {
      navigate('/rentals')
    }
  })

  function handleSubmit(rental: Rental) {
    rental.idRent = generateUUID()
    mutate(rental)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <h1 className="text-4xl font-medium">Add Rental</h1>
      <Form fields={FIELDS} onSubmit={handleSubmit} buttonLabel="Add Game" />
    </section>
  )
}
