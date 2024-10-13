import { OrbitControls } from '@react-three/drei';
import { Lights } from './Lights';
import { GameBoard } from './meshes/board/GameBoard';
import { Game } from './meshes/Game';
import { pieceUtils } from '../utils/pieceUtils';
import { ChessPosition } from '../types/chess-position';
import { GameStatus } from '../types/game-status';
import { gameUtils } from '../utils/gameUtils';
import { PieceData } from '../types/piece-data';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Moves } from '../types/moves';
import { GameActions, useGame } from '../hooks/useGame';
import { useCameraPosition } from '../hooks/useCameraPosition'; // Import the hook

type ExperienceProps = {
    game: GameStatus;
    gameActions: GameActions;
};

export function Experience({ game, gameActions }: ExperienceProps) {
    const [selectedPiece, setSelectedPiece] = useState<PieceData | null>(null);
    const controlsRef = useRef<any>(null); // Create a ref for OrbitControls

    // Use the custom hook
    const { setCameraZoom } = useCameraPosition(game, controlsRef); // Pass the game status and controls ref

    const moves: Moves | undefined = useMemo(() => {
        if (!selectedPiece) return undefined;
        return pieceUtils.getMoves(selectedPiece, game);
    }, [selectedPiece, game]);

    useEffect(() => {
        setSelectedPiece(null);
    }, [game]);

    const toggleSelectedPiece = (pieceData: PieceData) => {
        if (
            selectedPiece &&
            selectedPiece.file === pieceData.file &&
            selectedPiece.rank === pieceData.rank
        ) {
            setSelectedPiece(null);
        } else {
            setSelectedPiece(pieceData);
        }
    };

    const movePiece = useCallback(
        (position: ChessPosition) => {
            if (!selectedPiece) return;
            gameActions.movePiece(selectedPiece, position);
            setSelectedPiece(null);
        },
        [selectedPiece, gameActions]
    );

    return (
        <>
            <OrbitControls
                ref={controlsRef} // Use the controls ref from the hook
                enablePan={true}
                enableZoom={true}
                maxPolarAngle={Math.PI / 2}
                minDistance={1}
                maxDistance={50}
                enableDamping={true}
                dampingFactor={0.25}
            />
            <Lights />
            <GameBoard movePiece={movePiece} moves={moves} />
            <Game
                selectedPiece={selectedPiece}
                status={game}
                onPieceClick={toggleSelectedPiece}
            />
        </>
    );
}
