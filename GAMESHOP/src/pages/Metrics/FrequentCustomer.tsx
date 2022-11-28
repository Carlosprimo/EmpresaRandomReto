import type { Customer } from '@/types'
import { Link } from 'react-router-dom'

export interface IMostFrequentCustomersProps {
  customers: Customer[]
}

export const MostFrequentCustomers = ({
  customers
}: IMostFrequentCustomersProps) => {
  return (
    <article className="flex flex-col gap-4">
      <h1 className="pl-2.5 text-2xl">Most Frequent Customer</h1>
      <ul className="flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
        {customers.map((customer) => (
          <li key={customer.idUser}>
            <Link
              to={`/customers/${customer.idUser}`}
              className="flex gap-2 px-3 py-3 hover:bg-red-300/70 dark:hover:bg-red-300/40"
            >
              <div className="flex flex-col gap-1 text-xl">
                <h2 className="text-xl font-medium">{customer.fullName}</h2>
                <p className="text-lg font-light">{customer.gender}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
