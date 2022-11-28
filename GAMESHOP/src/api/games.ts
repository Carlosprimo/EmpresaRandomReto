import type { Game } from '@/types'
import { API_URL} from './utils'

export async function getGames() {
  const res = await fetch(`${API_URL}/VideoGameDatums`)
  return await res.json()
}

export async function getGame(id: string) {
  const res = await fetch(`${API_URL}/VideoGameDatums/${id}`)
  return await res.json()
}

export async function createGame(game: Game) {
  const res = await fetch(`${API_URL}/VideoGameDatums`, {
    method: 'POST',
    body: JSON.stringify(game)
  })
  return await res.json()
}

export async function updateGame(game: Game) {
  const res = await fetch(`${API_URL}/VideoGameDatums/${game.idGame}`, {
    method: 'PUT',
    body: JSON.stringify(game)
  })
  return await res.json()
}

export async function deleteGame(id: string) {
  const res = await fetch(`${API_URL}/VideoGameDatums/${id}`, {
    method: 'DELETE'
  })
  return await res.json()
}
