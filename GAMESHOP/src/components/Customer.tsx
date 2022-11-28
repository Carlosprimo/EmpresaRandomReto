import type { Customer } from '@/types'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { ReactComponent as ViewIcon } from '@/assets/view.svg'
import { ReactComponent as TrashIcon } from '@/assets/trash.svg'
import { ReactComponent as EditIcon } from '@/assets/edit.svg'

export interface ICustomerProps {
  customer: Customer
  onDelete: (id: string) => void
}

export const CustomerItem = ({ customer, onDelete }: ICustomerProps) => {
  const navigate = useNavigate()

  return (
    <article className="flex flex-col gap-4 py-3 pb-4 px-4 w-full bg-white dark:bg-inherit border-2 dark:border-white/20 rounded-md shadow-lg shadow-gray-300 dark:shadow-none">
      <div className="flex flex-col gap-2">
        <h1 className="mb-3 text-2xl text-center font-medium">
          {customer.fullName}
        </h1>
        <Button
          className="border-blue-500 text-blue-500 hover:bg-blue-500"
          action={() => navigate(`/customers/${customer.idUser}`)}
        >
          <ViewIcon className="w-6 h-6" />
          View Customer
        </Button>
        <Button
            className="border-purple-500 text-purple-500 hover:bg-purple-500"
            action={() => navigate(`/customers/edit/${customer.idUser}`)}
          >
            <EditIcon className="w-6 h-6" />
            Edit Customer
          </Button>
        <Button
          className="border-orange-600 text-orange-600 hover:bg-orange-600"
          action={() => onDelete(customer.idUser)}
        >
          <TrashIcon className="w-6 h-6" />
          Remove Customer
        </Button>
      </div>
      <div className="text-lg">
        <p className="text-gray-500 dark:text-white/50">
          <span className="font-medium">Email:</span> {customer.email}
        </p>
        <p className="text-gray-500 dark:text-white/50">
          <span className="font-medium">Phone:</span> {customer.gender}
        </p>
        <p className="text-gray-500 dark:text-white/50">
          <span className="font-medium">Address:</span> {customer.address}
        </p>
        <p className="text-gray-500 dark:text-white/50">
          <span className="font-medium">City:</span> {customer.city}
        </p>
      </div>
    </article>
  )
}
