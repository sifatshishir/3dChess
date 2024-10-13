import { OrbitControls } from '@react-three/drei'
import { Lights } from './Lights'
import { GameBoard } from './meshes/board/GameBoard'
import { Game } from './meshes/Game'
import { pieceUtils } from '../utils/pieceUtils'
import { ChessPosition } from '../types/chess-position'
import { GameStatus } from '../types/game-status'
import { gameUtils } from '../utils/gameUtils'
import { PieceData } from '../types/piece-data'
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { Moves } from '../types/moves'
import { GameActions, useGame } from '../hooks/useGame'

type ExperienceProps = {
    game: GameStatus
    gameActions: GameActions
}

export function Experience({ game, gameActions }: ExperienceProps) {
    const [selectedPiece, setSelectedPiece] = useState<PieceData | null>(null)
    const controlsRef = useRef<any>(null) // Create a ref for OrbitControls

    const moves: Moves | undefined = useMemo(() => {
        if (!selectedPiece) return undefined
        return pieceUtils.getMoves(selectedPiece, game)
    }, [selectedPiece, game])

    useEffect(() => {
        setSelectedPiece(null)
    }, [game])

    const toggleSelectedPiece = (pieceData: PieceData) => {
        if (
            selectedPiece &&
            selectedPiece.file === pieceData.file &&
            selectedPiece.rank === pieceData.rank
        ) {
            setSelectedPiece(null)
        } else {
            setSelectedPiece(pieceData)
        }
    }

    const movePiece = useCallback(
        (position: ChessPosition) => {
            if (!selectedPiece) return
            gameActions.movePiece(selectedPiece, position)
            setSelectedPiece(null)
        },
        [selectedPiece, gameActions]
    )

    return (
        <>
            <OrbitControls
                ref={controlsRef} // Assign the ref here
                enablePan={true} // Allow panning
                enableZoom={true} // Allow zooming
                maxPolarAngle={Math.PI / 2} // Limit vertical rotation
                minDistance={1} // Minimum distance to the board
                maxDistance={50} // Maximum distance to the board
                enableDamping={true} // Smooth movement
                dampingFactor={0.25} // Damping factor for smoother controls
            />
            <Lights />
            <GameBoard movePiece={movePiece} moves={moves} />
            <Game
                selectedPiece={selectedPiece}
                status={game}
                onPieceClick={toggleSelectedPiece}
            />
        </>
    )
}
