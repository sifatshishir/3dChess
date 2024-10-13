import { useEffect, useMemo, useState } from 'react';
import { GameStatus } from '../types/game-status';
import { gameUtils } from '../utils/gameUtils';
import { PieceData } from '../types/piece-data';
import { ChessPosition } from '../types/chess-position';
import { pieceMovesUtils } from '../utils/pieceMovesUtils';

export type GameActions = {
    movePiece: (selectedPiece: PieceData, position: ChessPosition) => void;
    startGame: () => void;
    reset: () => void;
};

export function useGame() {
    const [status, setStatus] = useState<GameStatus>(gameUtils.newGame());

    const movePiece = (selectedPiece: PieceData, position: ChessPosition) => {
        setStatus((prevStatus) => {
            const newStatus = pieceMovesUtils.movePiece(selectedPiece, prevStatus, position);
            return newStatus || prevStatus; // Ensure you have a fallback
        });
    };

    const reset = () => {
        setStatus(gameUtils.newGame());
    };

    const startGame = () => {
        setStatus((prevStatus) => ({
            ...gameUtils.newGame(),
            situation: 'active',
        }));
    };

    return [
        status,
        {
            movePiece,
            reset,
            startGame,
        } as GameActions,
    ] as const;
}
