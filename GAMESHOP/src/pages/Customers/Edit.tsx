import type { Customer } from '@/types'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getCustomer, updateCustomer } from '@/api/customers'
import { FIELDS } from '@/utils/customers'

import { Form } from '@/components/Form'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'

export const EditCustomer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useQuery(['customer', id], () =>
    getCustomer(id as string)
  )
  const { mutate } = useMutation(updateCustomer, {
    onSuccess: () => {
      navigate('/customers')
    }
  })

  function handleSubmit(customer: Customer) {
    mutate(customer)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <h1 className="text-4xl font-medium">Edit Customer</h1>
      <Form
        fields={FIELDS}
        values={data}
        onSubmit={handleSubmit}
        buttonLabel="Update Customer"
      />
    </section>
  )
}
