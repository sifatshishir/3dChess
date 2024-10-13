import { ChessRank } from '@/app/types/chess-rank'
import { SquareCell } from './SquareCell'
import { ChessFile } from '@/app/types/chess-file'
import { ChessPosition } from '@/app/types/chess-position'
import { Moves } from '@/app/types/moves'

type GameBoardProps = {
    moves?: Moves
    movePiece: (position: ChessPosition) => void
}

export function GameBoard({ moves, movePiece }: GameBoardProps) {
    const board = Array(8).fill([
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
    ]) as Array<Array<ChessFile>>

    return (
        <>
            {board.map((files, rowIndex) => {
                const rank = (rowIndex + 1) as ChessRank
                return files.map((file, fileIndex) => {
                    const isAvailableMove = (moves?.available ?? []).some(
                        (move) => move.rank === rank && move.file === file
                    )
                    const isCaptureMove = (moves?.captures ?? []).some(
                        (move) => move.rank === rank && move.file === file
                    )

                    function onClick() {
                        if (isAvailableMove || isCaptureMove) {
                            movePiece({ rank, file })
                        }
                    }

                    return (
                        <SquareCell
                            isAvailableMove={isAvailableMove}
                            isCaptureMove={isCaptureMove}
                            key={`${file}-${rank}`}
                            file={file as ChessFile}
                            rank={rank as ChessRank}
                            onClick={onClick}
                        />
                    )
                })
            })}
        </>
    )
}
