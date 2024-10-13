import { RivalPieces } from './RivalPieces'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GameStatus } from '@/app/types/game-status'
import { PieceData } from '@/app/types/piece-data'
import { gameUtils } from '@/app/utils/gameUtils'
import { ChessPosition } from '@/app/types/chess-position'
import { pieceUtils } from '@/app/utils/pieceUtils'
import { type } from 'os'
import { useThree } from '@react-three/fiber'
import { Rival } from '@/app/types/rival'
import { useCameraPosition } from '@/app/hooks/useCameraPositon'

type GameProps = {
    status: GameStatus
    onPieceClick: (piece: PieceData) => void
    selectedPiece: PieceData | null
}

export function Game({ status, onPieceClick, selectedPiece }: GameProps) {
    useCameraPosition(status)
    return (
        <>
            <RivalPieces
                onPieceClick={onPieceClick}
                pieces={status.black.pieces}
                rival="black"
                isHisTurn={status.turn === 'black'}
                selectedPiece={selectedPiece}
            />
            <RivalPieces
                onPieceClick={onPieceClick}
                pieces={status.white.pieces}
                rival="white"
                isHisTurn={status.turn === 'white'}
                selectedPiece={selectedPiece}
            />
        </>
    )
}
