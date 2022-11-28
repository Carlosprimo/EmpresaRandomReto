import { Customer } from '@/types'
import { API_URL} from './utils'

export async function getuCstomers() {
  const res = await fetch(`${API_URL}/UsersDatum`)
  return await res.json()
}

export async function getCustomer(id: string) {
  const res = await fetch(`${API_URL}/UsersDatum/${id}`)
  return await res.json()
}

export async function createCustomer(customer: Customer) {
  const res = await fetch(`${API_URL}/UsersDatum`, {
    method: 'POST',
    body: JSON.stringify(customer)
  })
  return await res.json()
}

export async function updateCustomer(customer: Customer) {
  const res = await fetch(`${API_URL}/UsersDatum/${customer.idUser}`, {
    method: 'PUT',
    body: JSON.stringify(customer)
  })
  return await res.json()
}

export async function deleteCustomer(id: string) {
  const res = await fetch(`${API_URL}/UsersDatum/${id}`, {
    method: 'DELETE'
  })
  return await res.json()
}
