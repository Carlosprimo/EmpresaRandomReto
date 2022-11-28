import type { Game, Option } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { fuzzySearch } from '@/utils/fuzzySearch'
import { getGames, deleteGame } from '@/api/games'

import { Button } from '@/components/Button'
import { GameItem } from '@/components/Game'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'
import { SingleSelect } from '@/components/SingleSelect'
import { ReactComponent as PlusIcon } from '@/assets/plus.svg'

const searchKeys = ['director', 'producer', 'mainCharacter', 'brand'] as const
type SearchKey = typeof searchKeys[number]
export const ListGames = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchKey, setSearchKey] = useState('')
  const [records, setRecords] = useState<Game[]>([])

  const { data, isLoading, isError, error } = useQuery(['games'], getGames)
  const { mutate } = useMutation(deleteGame, {
    onSuccess: () => {
      queryClient.invalidateQueries(['games'])
    }
  })

  useEffect(() => {
    if (data) setRecords(data)
  }, [data])

  const handleDelete = (id: string) => mutate(id)

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  function handleSearch(event: React.FormEvent<HTMLInputElement>) {
    const search = event.currentTarget.value.toLowerCase()
    const filteredRecords = data?.filter((record:any) =>
      fuzzySearch(search, record[searchKey as SearchKey].toLowerCase())
    )
    setRecords(search ? (filteredRecords as Game[]) : (data as Game[]))
  }

  function handleChange(value: Option) {
    setSearchKey(value.value)
  }

  function setOption(value: string) {
    return { label: value, value }
  }

  return (
    <section>
      <div className="flex flex-wrap justify-between items-end gap-5">
        <h1 className="text-4xl font-medium">Games</h1>
        <div className="flex flex-wrap gap-4">
          <input
            type="search"
            name="game-search"
            className="w-72 h-12 px-2 py-1 rounded border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-transparent"
            placeholder="Search by director, producer, main character, brand"
            onInput={handleSearch}
          />
          <SingleSelect
            name="search-key"
            className="w-44"
            placeholder="Search by"
            options={searchKeys.map(setOption)}
            onChange={handleChange}
          />
          <Button
            className="border-red-500 text-red-500 hover:bg-red-500"
            action={() => navigate('/games/add')}
          >
            <PlusIcon className="w-6 h-6" />
            Add Game
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8 pr-2 max-h-[70vh] overflow-y-auto ">
        {records.map((game: Game) => (
          <GameItem key={game.idGame} game={game} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  )
}
