import type { Customer } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getCustomers, deleteCustomer } from '@/api/customers'

import { Button } from '@/components/Button'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'
import { CustomerItem } from '@/components/Customer'
import { ReactComponent as PlusIcon } from '@/assets/plus.svg'

export const ListCustomers = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery(
    ['customers'],
    getCustomers
  )
  const { mutate } = useMutation(deleteCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries(['customers'])
    }
  })

  const handleDelete = (id: string) => mutate(id)

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <div className="flex flex-wrap justify-between items-end gap-5">
        <h1 className="text-4xl font-medium">Customers</h1>
        <Button
          className="border-red-500 text-red-500 hover:bg-red-500"
          action={() => navigate('/customers/add')}
        >
          <PlusIcon className="w-6 h-6" />
          Add Customer
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8 pr-2 max-h-[70vh] overflow-y-auto ">
        {data.map((customer: Customer) => (
          <CustomerItem
            key={customer.idUser}
            customer={customer}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  )
}
