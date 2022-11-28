import type { Game } from '@/types'
import { Link } from 'react-router-dom'

export interface IMostPopularGamesProps {
  games: Game[]
}

export const MostPopularGames = ({ games }: IMostPopularGamesProps) => {
  return (
    <article className="flex flex-col gap-4">
      <h1 className="pl-2 text-2xl">Most Popular Games</h1>
      <ul className="flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
        {games.map((game) => (
          <li key={game.idGame}>
            <Link
              to={`/games/${game.idGame}`}
              className="flex gap-2 px-3 py-3 hover:bg-red-300/70 dark:hover:bg-red-300/40"
            >
              <img
                src={game.coverPage}
                alt={game.nameGame}
                className="w-36 h-36 object-cover object-top"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-medium">{game.nameGame}</h2>
                <p className="text-xl font-light">by {game.brand}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
