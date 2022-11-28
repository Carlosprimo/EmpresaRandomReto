import type { Price } from '@/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getPrice, updatePrice } from '@/api/prices'
import { FIELDS } from '@/utils/prices'

import { Form } from '@/components/Form'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'

export const EditPrice = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useQuery(['price', id], () =>
    getPrice(id as string)
  )
  const { mutate } = useMutation(updatePrice, {
    onSuccess: () => {
      navigate('/prices')
    }
  })

  function handleSubmit(price: Price) {
    mutate(price)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <h1 className="text-4xl font-medium">Edit Price</h1>
      <Form
        fields={FIELDS}
        values={data}
        onSubmit={handleSubmit}
        buttonLabel="Update Price"
      />
    </section>
  )
}
