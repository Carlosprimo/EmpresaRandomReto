import type { Game } from '@/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getGame, updateGame } from '@/api/games'
import { FIELDS } from '@/utils/games'

import { Form } from '@/components/Form'
import { ErrorView } from '@/components/Error'
import { LoadingView } from '@/components/Loading'

export const EditGame = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useQuery(['game', id], () =>
    getGame(id as string)
  )
  const { mutate } = useMutation(updateGame, {
    onSuccess: () => {
      navigate('/games')
    }
  })

  function handleSubmit(game: Game) {
    mutate(game)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <section>
      <h1 className="text-4xl font-medium">Edit Game</h1>
      <Form
        fields={FIELDS}
        values={data}
        onSubmit={handleSubmit}
        buttonLabel="Update Game"
      />
    </section>
  )
}
