import { Piece } from '@/app/types/piece'
import { pieceMovesUtils } from './pieceMovesUtils'

export const pieceUtils = {
    getPieceStats,
    getMoves: pieceMovesUtils.getPieceMoves,
}

const stats = {
    rook: {
        positionY: -0.42,
        scale: 0.25,
    },
    knight: {
        positionY: -0.3,
        scale: 0.28,
    },
    bishop: {
        positionY: -0.4,
        scale: 0.35,
    },
    queen: {
        positionY: -0.25,
        scale: 0.4,
    },
    king: {
        positionY: 0.2,
        scale: 0.8,
    },
    pawn: {
        positionY: -0.7,
        scale: 0.2,
    },
}

function getPieceStats(piece: Piece) {
    return stats[piece]
}
