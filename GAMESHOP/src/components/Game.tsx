import type { Game } from '@/types'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { ReactComponent as ViewIcon } from '@/assets/view.svg'
import { ReactComponent as TrashIcon } from '@/assets/trash.svg'
import { ReactComponent as EditIcon } from '@/assets/edit.svg'

export interface IGameProps {
  game: Game
  onDelete: (id: string) => void
}

export const GameItem = ({ game, onDelete }: IGameProps) => {
  const navigate = useNavigate()

  return (
    <article className="flex flex-col gap-4 py-3 pb-3 px-4 w-full dark:bg-inherit border-2 dark:border-white/20 rounded-md shadow-lg shadow-gray-300 dark:shadow-none">
      <div className="flex flex-wrap justify-between items-end">
        <div className="basis-[53%]">
          <h1 className="text-xl font-medium">{game.nameGame}</h1>
          <img
            className="mt-2 w-36 aspect-square object-cover object-top rounded"
            src={game.coverPage}
            alt={game.nameGame}
          />
        </div>
        <div className="flex flex-col gap-2 mt-9">
          <Button
            className="border-blue-500 text-blue-500 hover:bg-blue-500"
            action={() => navigate(`/games/${game.idGame}`)}
          >
            <ViewIcon className="w-6 h-6" />
            View Game
          </Button>
          <Button
            className="border-purple-500 text-purple-500 hover:bg-purple-500"
            action={() => navigate(`/games/edit/${game.idGame}`)}
          >
            <EditIcon className="w-6 h-6" />
            Edit Game
          </Button>
          <Button
            className="border-orange-600 text-orange-600 hover:bg-orange-600"
            action={() => onDelete(game.idGame)}
          >
            <TrashIcon className="w-6 h-6" />
            Remove Game
          </Button>
        </div>
      </div>
      <div className="text-lg">
        <p>
          <strong>Main Character:</strong> {game.mainCharacter}
        </p>
        <p>
          <strong>Director:</strong> {game.director}
        </p>
        <p>
          <strong>Producer:</strong> {game.producer}
        </p>
        <p>
          <strong>Brand:</strong> {game.brand}
        </p>
      </div>
    </article>
  )
}
