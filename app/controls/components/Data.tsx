import { GameStatus } from '@/app/types/game-status'

type DataProps = {
    game: GameStatus
}

export function Data({ game }: DataProps) {
    return (
        <div className={`data ${game.turn}`}>
            <span className="turn">TURN: {game.turn}</span>
            <div className={`situation ${game.situation}`}>
                {game.situation}
            </div>
        </div>
    )
}
