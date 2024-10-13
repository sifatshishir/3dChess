import React from 'react';
import { GameActions } from '@/app/hooks/useGame';

type OptionsProps = {
    gameActions: GameActions;
};

export const Options: React.FC<OptionsProps> = ({ gameActions }) => {
    return (
        <div className="options">
            <button onClick={gameActions.reset}>Reset</button>
            <button onClick={gameActions.startGame}>Start</button>
            {/* Add more options as needed */}
        </div>
    );
};
