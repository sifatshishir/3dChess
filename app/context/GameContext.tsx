// context/GameContext.js

import React, { createContext, useContext, useState } from 'react';
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

const GameContext = createContext(null);

const GameProvider = ({ children }) => {
    const [status, setStatus] = useState(gameUtils.newGame());

    const movePiece = (selectedPiece, position) => {
        setStatus((prevStatus) => {
            const newStatus = pieceMovesUtils.movePiece(selectedPiece, prevStatus, position);
            if (!newStatus) {
                console.warn('Move piece failed, reverting to previous status');
            }
            return newStatus || prevStatus;
        });
    };

    const reset = () => setStatus(gameUtils.newGame());

    const startGame = () => {
        setStatus((prevStatus) => ({
            ...gameUtils.newGame(),
            situation: 'active',
        }));
    };

    return (
        <GameContext.Provider value={{ status, gameActions: { movePiece, reset, startGame } }}>
            {children}
        </GameContext.Provider>
    );
};


export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
