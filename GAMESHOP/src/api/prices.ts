import type { Price } from '@/types'
import { API_URL } from './utils'


export async function getPrices() {
  const res = await fetch(`${API_URL}/PriceDatums`)
  return await res.json() as Price[]
}

export async function getPrice(id: string) {
  const res = await fetch(`${API_URL}/PriceDatums/${id}`)
  return await res.json() as Price
}

export async function createPrice(price: Price) {
  const res = await fetch(`${API_URL}/PriceDatums`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(price)
  })
  return await res.json() as Price
}

export async function updatePrice(price: Price) {
  const res = await fetch(`${API_URL}/PriceDatums`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(price)
  })
  return await res.json() as Price
}
