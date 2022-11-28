import type { Game } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { generateUUID } from '@/utils'
import { createGame } from '@/api/games'
import { FIELDS } from '@/utils/games'

import { Form } from '@/components/Form'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'

export const AddGame = () => {
  const navigate = useNavigate()
  const { mutate, isLoading, isError, error } = useMutation(createGame, {
    onSuccess: () => {
      navigate('/games')
    }
  })

  function handleSubmit(game: Game) {
    game.idGame = generateUUID()
    mutate(game)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <h1 className="text-4xl font-medium">Add Game</h1>
      <Form fields={FIELDS} onSubmit={handleSubmit} buttonLabel="Add Game" />
    </section>
  )
}
