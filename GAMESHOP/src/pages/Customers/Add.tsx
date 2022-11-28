import type { Customer } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { generateUUID } from '@/utils'
import { createCustomer } from '@/api/customers'
import { FIELDS } from '@/utils/customers'

import { Form } from '@/components/Form'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'

export const AddCustomer = () => {
  const navigate = useNavigate()
  const { mutate, isLoading, isError, error } = useMutation(createCustomer, {
    onSuccess: () => {
      navigate('/customers')
    }
  })

  function handleSubmit(customer: Customer) {
    customer.idUser = generateUUID()
    mutate(customer)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <h1 className="text-4xl font-medium">Add Customer</h1>
      <Form
        fields={FIELDS}
        onSubmit={handleSubmit}
        buttonLabel="Add Customer"
      />
    </section>
  )
}
