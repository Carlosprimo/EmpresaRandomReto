import type { Price } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { generateUUID } from '@/utils'
import { createPrice } from '@/api/prices'
import { FIELDS } from '@/utils/prices'

import { Form } from '@/components/Form'
import { LoadingView } from '@/components/Loading'
import { ErrorView } from '@/components/Error'

export const AddPrice = () => {
  const navigate = useNavigate()
  const { mutate, isLoading, isError, error } = useMutation(createPrice, {
    onSuccess: () => {
      navigate('/prices')
    }
  })

  function handleSubmit(price: Price) {
    price.idPrice = generateUUID()
    mutate(price)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <h1 className="text-4xl font-medium">Add Price</h1>
      <Form fields={FIELDS} onSubmit={handleSubmit} buttonLabel="Add Price" />
    </section>
  )
}
