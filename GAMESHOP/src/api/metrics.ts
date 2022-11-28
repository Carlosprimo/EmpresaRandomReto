import { API_URL } from './utils'
import { getGame } from './games'
import { getCustomer } from './customers'

export async function getFrequentCustomers() {
  const res = await fetch(`${API_URL}/RentalDatums/get_customer_freq`)
  const customersIds = await res.json()
  
  return await Promise.all(customersIds.map((id:any) => getCustomer(id)))
}

export async function getPopularGames() {
  const res = await fetch(`${API_URL}/RentalDatums/most_popular_videogames`)
  const popularGames = await res.json()
  return await Promise.all(popularGames.map((id:any) => getGame(id)))
}
